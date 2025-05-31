import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/model/blog';

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      blogs: blogs.map(blog => ({
        _id: blog._id,
        title: blog.title,
        excerpt: blog.excerpt,
        author: blog.author,
        createdAt: blog.createdAt,
        readTime: blog.readTime,
        image: blog.image,
        category: blog.category,
        content: blog.content
      }))
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const blog = new Blog({
      title: body.title,
      excerpt: body.excerpt,
      author: body.author,
      readTime: body.readTime,
      image: body.image,
      category: body.category,
      content: body.content
    });

    await blog.save();

    return NextResponse.json({
      success: true,
      blog: {
        _id: blog._id,
        title: blog.title,
        excerpt: blog.excerpt,
        author: blog.author,
        createdAt: blog.createdAt,
        readTime: blog.readTime,
        image: blog.image,
        category: blog.category,
        content: blog.content
      }
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    );
  }
} 