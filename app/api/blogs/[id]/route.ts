import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/model/blog';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

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
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const blog = await Blog.findByIdAndUpdate(
      params.id,
      {
        title: body.title,
        excerpt: body.excerpt,
        author: body.author,
        readTime: body.readTime,
        image: body.image,
        category: body.category,
        content: body.content
      },
      { new: true }
    );

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

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
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const blog = await Blog.findByIdAndDelete(params.id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 