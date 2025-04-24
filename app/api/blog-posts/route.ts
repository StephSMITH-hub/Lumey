import { NextResponse } from 'next/server';
import BlogPost from '@/model/blog_post';
import dbConnect from '@/lib/dbConnect';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await dbConnect();
}

/**
 * @swagger
 * /api/blog-posts:
 *   post:
 *     summary: Create a new blog post
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
 *               category_id:
 *                 type: string
 *               status:
 *                 type: string
 *               is_featured:
 *                 type: boolean
 *               read_time:
 *                 type: integer
 *               published_at:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog post created
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Failed to create blog post
 */

export async function POST(req: Request) {
    await connectDB();
    const { slug, title, excerpt, content, author_id, category_id, status, is_featured, read_time, published_at } = await req.json();

    if (!slug || !title || !excerpt || !content || !author_id || !category_id) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    try {
        const newPost = new BlogPost({
            uuid: uuidv4(),
            slug,
            title,
            excerpt,
            content,
            author_id,
            category_id,
            status: status || 'draft',
            is_featured: is_featured || false,
            read_time,
            published_at,
        });

        await newPost.save();

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   title:
 *                     type: string
 *                   excerpt:
 *                     type: string
 *                   content:
 *                     type: string
 *                   featured_image_url:
 *                     type: string
 *                   author_id:
 *                     type: string
 *                   category_id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   is_featured:
 *                     type: boolean
 *                   read_time:
 *                     type: integer
 *                   published_at:
 *                     type: string
 *       500:
 *         description: Failed to fetch blog posts
 */

export async function GET() {
    await connectDB();

    try {
        const posts = await BlogPost.find().populate('author_id category_id');
        return NextResponse.json(posts);
    } catch (err) {
        console.error('Error fetching blog posts:', err);
        return NextResponse.json({ message: 'Failed to fetch blog posts' }, { status: 500 });
    }
}
