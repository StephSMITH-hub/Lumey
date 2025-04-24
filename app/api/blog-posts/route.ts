import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import BlogPost, { IBlogPost } from '@/model/blog_post';
import BlogCategory from '@/model/blog_category';
import BlogTags from '@/model/blog_tags';
import BlogPostTag from '@/model/blog_post_tags';
import { v4 as uuidv4 } from 'uuid';
import BlogAuthor from '@/model/blog_author';
import slugify from 'slugify';

/**
 * @swagger
 * /api/blog-posts:
 *   post:
 *     summary: Create a new blog post with category, tags, and author validation.
 *     tags: [BlogPost]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *               title:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               content:
 *                 type: string
 *               author_id:
 *                 type: string
 *               category_name:
 *                 type: string
 *               status:
 *                 type: string
 *               is_featured:
 *                 type: boolean
 *               read_time:
 *                 type: integer
 *               published_at:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Invalid input or validation error
 *       500:
 *         description: Failed to create blog post
 */

export async function POST(req: Request) {
    await connectDB();
    const {
        slug,
        title,
        excerpt,
        content,
        author_id,
        category_name,
        status,
        is_featured,
        read_time,
        published_at,
        tags
    } = await req.json();

    if (!slug || !title || !excerpt || !content || !author_id || !category_name) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const authorExists = await BlogAuthor.findOne({ uuid: author_id });
    if (!authorExists) {
        return NextResponse.json({ message: 'Invalid author_id. Author not found.' }, { status: 400 });
    }

    try {
        let category = await BlogCategory.findOne({ name: category_name });
        if (!category) {
            const categorySlug = slugify(category_name, { lower: true }); 
            category = new BlogCategory({
                uuid: uuidv4(),
                name: category_name,
                slug: categorySlug, 
            });
            await category.save();
        }

        const newPost = new BlogPost({
            uuid: uuidv4(),
            slug,
            title,
            excerpt,
            content,
            author_id,
            category_id: category.uuid, 
            status: status || 'draft',
            is_featured: is_featured || false,
            read_time,
            published_at,
        });

        await newPost.save();

        if (tags && tags.length > 0) {
            const tagIds: string[] = [];

            for (const tagName of tags) {
                let tag = await BlogTags.findOne({ name: tagName });
                if (!tag) {
                    const tagSlug = slugify(tagName, { lower: true }); 
                    tag = new BlogTags({
                        uuid: uuidv4(),
                        name: tagName,
                        slug: tagSlug, 
                    });
                    await tag.save();
                }
                tagIds.push(tag.uuid);
            }

            for (const tagId of tagIds) {
                await BlogPostTag.create({ blog_post_id: newPost.uuid, blog_tag_id: tagId });
            }
        }

        return NextResponse.json(newPost, { status: 201 });
    } catch (err) {
        console.error('Error creating blog post:', err);
        return NextResponse.json({ message: 'Failed to create blog post' }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/blog-posts:
 *   get:
 *     summary: Get all blog posts
 *     tags: [BlogPost]
 *     responses:
 *       200:
 *         description: List of blog posts
 *       500:
 *         description: Failed to fetch blog posts
 */

export async function GET() {
    await connectDB();

    try {
        const posts: IBlogPost[] = await BlogPost.find();

        const populatedPosts = await Promise.all(
            posts.map(async (post) => {
                const author = await BlogAuthor.findOne({ uuid: post.author_id });
                const category = await BlogCategory.findOne({ uuid: post.category_id });

                return {
                    ...post.toObject(),
                    author,
                    category,
                };
            })
        );

        return NextResponse.json(populatedPosts);
    } catch (err) {
        console.error('Error fetching blog posts:', err);
        return NextResponse.json({ message: 'Failed to fetch blog posts' }, { status: 500 });
    }
}
