import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Blog from '@/model/blog';

function getSlugFromUrl(url: string) {
  const segments = url.split('/');
  return segments[segments.length - 1];
}

export async function GET(request: NextRequest) {
  try {
    const slug = getSlugFromUrl(request.url);
    await connectToDatabase();
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return Response.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return Response.json(blog);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const slug = getSlugFromUrl(request.url);
    const body = await request.json();
    await connectToDatabase();

    const blog = await Blog.findOneAndUpdate(
      { slug },
      {
        $set: {
          title: body.title,
          excerpt: body.excerpt,
          author: body.author,
          readTime: body.readTime || 5,
          image: body.image,
          category: body.category,
          content: body.content
        }
      },
      { new: true }
    );

    if (!blog) {
      return Response.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return Response.json(blog);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const slug = getSlugFromUrl(request.url);
    await connectToDatabase();
    const blog = await Blog.findOneAndDelete({ slug });

    if (!blog) {
      return Response.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
