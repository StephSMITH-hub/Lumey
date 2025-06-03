import { NextResponse } from "next/server";
import BlogPost from "@/model/blog_post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await connectToDatabase();
}

interface BlogPostParams {
  params: {
    slug: string;
  };
}

// GET /api/blogs/[slug]
export async function GET(req: Request, { params }: BlogPostParams) {
  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug: params.slug })
      .populate("author")
      .populate("category")
      .populate("tags");

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ blog: post });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[slug]
export async function PUT(req: Request, { params }: BlogPostParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the blog post
    const post = await BlogPost.findOneAndUpdate(
      { slug: params.slug },
      {
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
      },
      { new: true }
    )
      .populate("author")
      .populate("category")
      .populate("tags");

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ blog: post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[slug]
export async function DELETE(req: Request, { params }: BlogPostParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const post = await BlogPost.findOneAndDelete({ slug: params.slug });

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
