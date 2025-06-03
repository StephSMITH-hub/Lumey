import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/model/blog';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return Response.json(blogs);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const blog = await Blog.create({
      title: body.title,
      excerpt: body.excerpt,
      author: body.author,
      readTime: body.readTime || 5,
      image: body.image,
      category: body.category,
      content: body.content
    });

    return Response.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
