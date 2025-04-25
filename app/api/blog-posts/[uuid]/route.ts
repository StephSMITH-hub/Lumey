import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import BlogPost from '@/model/blog_post';
import dbConnect from '@/lib/dbConnect';

/**
 * @swagger
 * /api/blog-posts/{uuid}:
 *   get:
 *     summary: Get a blog post by UUID
 *     tags: [BlogPost]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           description: UUID of the blog post
 *     responses:
 *       200:
 *         description: Successfully fetched blog post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   description: UUID of the blog post
 *                 title:
 *                   type: string
 *                   description: Title of the blog post
 *                 excerpt:
 *                   type: string
 *                   description: Excerpt of the blog post
 *                 content:
 *                   type: string
 *                   description: Content of the blog post
 *                 author_id:
 *                   type: string
 *                   description: UUID of the author
 *                 category_id:
 *                   type: string
 *                   description: UUID of the category
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await dbConnect();
}

export async function GET(req: Request, { params }: { params: { uuid: string } }) {
    await connectDB();

    try {
        const blogPost = await BlogPost.findOne({ uuid: params.uuid })
            .populate('author_id', 'uuid name')
            .populate('category_id', 'uuid name');

        if (!blogPost) {
            return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        return NextResponse.json(blogPost, { status: 200 });
    } catch (err) {
        console.error('Error fetching blog post by UUID:', err);
        return NextResponse.json({ message: 'Failed to fetch blog post' }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/blog-posts/{uuid}:
 *   put:
 *     summary: Update a blog post by UUID
 *     tags: [BlogPost]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           description: UUID of the blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *                 description: Slug of the blog post
 *               title:
 *                 type: string
 *                 description: Title of the blog post
 *               excerpt:
 *                 type: string
 *                 description: Excerpt of the blog post
 *               content:
 *                 type: string
 *                 description: Content of the blog post
 *               category_id:
 *                 type: string
 *                 description: UUID of the category
 *               status:
 *                 type: string
 *                 description: Status of the blog post (draft, published, archived)
 *               is_featured:
 *                 type: boolean
 *                 description: Whether the post is featured
 *               read_time:
 *                 type: integer
 *                 description: Read time in minutes
 *               published_at:
 *                 type: string
 *                 description: Date when the blog post was published
 *     responses:
 *       200:
 *         description: Successfully updated the blog post
 *       400:
 *         description: Bad request, missing required fields
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
export async function PUT(req: Request, { params }: { params: { uuid: string } }) {
    await connectDB();
    const { slug, title, excerpt, content, category_id, status, is_featured, read_time, published_at } = await req.json();

    try {
        const blogPost = await BlogPost.findOne({ uuid: params.uuid });
        if (!blogPost) {
            return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        // Update fields
        blogPost.slug = slug || blogPost.slug;
        blogPost.title = title || blogPost.title;
        blogPost.excerpt = excerpt || blogPost.excerpt;
        blogPost.content = content || blogPost.content;
        blogPost.category_id = category_id || blogPost.category_id;
        blogPost.status = status || blogPost.status;
        blogPost.is_featured = is_featured || blogPost.is_featured;
        blogPost.read_time = read_time || blogPost.read_time;
        blogPost.published_at = published_at || blogPost.published_at;

        await blogPost.save();

        return NextResponse.json(blogPost, { status: 200 });
    } catch (err) {
        console.error('Error updating blog post:', err);
        return NextResponse.json({ message: 'Failed to update blog post' }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/blog-posts/{uuid}:
 *   delete:
 *     summary: Delete a blog post by UUID
 *     tags: [BlogPost]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           description: UUID of the blog post
 *     responses:
 *       200:
 *         description: Successfully deleted the blog post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
export async function DELETE(req: Request, { params }: { params: { uuid: string } }) {
    await connectDB();

    try {
        const blogPost = await BlogPost.findOneAndDelete({ uuid: params.uuid });
        if (!blogPost) {
            return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog post deleted successfully' }, { status: 200 });
    } catch (err) {
        console.error('Error deleting blog post:', err);
        return NextResponse.json({ message: 'Failed to delete blog post' }, { status: 500 });
    }
}
