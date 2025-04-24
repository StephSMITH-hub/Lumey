import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import BlogPostTag from '@/model/blog_post_tags';
import BlogPost from '@/model/blog_post';
import BlogTags from '@/model/blog_tags';

/**
 * @swagger
 * /api/blog-post-tags:
 *   post:
 *     summary: Assign a tag to a blog post
 *     tags:
 *       - BlogPostTags
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blog_post_id
 *               - blog_tag_id
 *             properties:
 *               blog_post_id:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               blog_tag_id:
 *                 type: string
 *                 format: uuid
 *                 example: "789e4567-e89b-12d3-a456-426614174999"
 *     responses:
 *       201:
 *         description: Tag assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPostTag'
 *       400:
 *         description: blog_post_id or blog_tag_id missing
 *       409:
 *         description: Duplicate tag-post link
 *       500:
 *         description: Server error
 */

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const { blog_post_id, blog_tag_id } = body;

        if (!blog_post_id || !blog_tag_id) {
            return NextResponse.json(
                { message: 'blog_post_id and blog_tag_id are required' },
                { status: 400 }
            );
        }

        const postExists = await BlogPost.findOne({ uuid: blog_post_id });
        if (!postExists) {
            return NextResponse.json(
                { message: 'Invalid blog_post_id: blog post not found' },
                { status: 404 }
            );
        }

        const tagExists = await BlogTags.findOne({ uuid: blog_tag_id });
        if (!tagExists) {
            return NextResponse.json(
                { message: 'Invalid blog_tag_id: tag not found' },
                { status: 404 }
            );
        }

        const existing = await BlogPostTag.findOne({ blog_post_id, blog_tag_id });
        if (existing) {
            return NextResponse.json(
                { message: 'This tag is already assigned to the post' },
                { status: 409 }
            );
        }

        const newTagLink = await BlogPostTag.create({ blog_post_id, blog_tag_id });

        return NextResponse.json(newTagLink, { status: 201 });
    } catch (error) {
        console.error('POST /blog-post-tags error:', error);
        return NextResponse.json(
            { message: 'Failed to create blog post tag link' },
            { status: 500 }
        );
    }
}

/**
 * @swagger
 * /api/blog-post-tags:
 *   get:
 *     summary: Get all blog post tags
 *     tags:
 *       - BlogPostTags
 *     responses:
 *       200:
 *         description: List of blog post tag mappings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogPostTag'
 *       500:
 *         description: Failed to fetch tags
 */
export async function GET() {
    await dbConnect();

    try {
        const tags = await BlogPostTag.find().sort({ created_at: -1 });
        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        console.error('GET /blog-post-tags error:', error);
        return NextResponse.json({ message: 'Failed to fetch blog post tags' }, { status: 500 });
    }
}
