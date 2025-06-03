import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import BlogPost from '@/model/blog_post';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET /api/blogs
export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find()
      .populate('author')
      .populate('category')
      .populate('tags')
      .sort({ published_at: -1 });

    return NextResponse.json({ blogs: posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blogs
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      author_id,
      category_id,
      status,
      is_featured,
      read_time,
      published_at,
      image,
      tags,
    } = body;

    // Validate required fields
    if (!title || !slug || !content || !author_id || !category_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the blog post
    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      author_id,
      category_id,
      status: status || 'draft',
      is_featured: is_featured || false,
      read_time: read_time || 5,
      published_at: published_at || new Date(),
      image,
      tags,
    });

    // Populate the relationships
    await post.populate('author');
    await post.populate('category');
    await post.populate('tags');

    return NextResponse.json({ blog: post });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
} 