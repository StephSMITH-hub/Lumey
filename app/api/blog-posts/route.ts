import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPost from "@/model/blog_post";

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
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Invalid input or validation error
 *       500:
 *         description: Failed to create blog post
 */

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    // Create the blog post
    const post = await BlogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        author_id,
        category_id,
        status: status || "draft",
        is_featured: is_featured || false,
        read_time: read_time || 5,
        published_at: published_at || new Date(),
        image,
        tags: tags
          ? {
              connect: tags.map((tagId: string) => ({ uuid: tagId })),
            }
          : undefined,
      },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
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
  try {
    const posts = await BlogPost.find({
      include: {
        author: true,
        category: true,
        tags: true,
      },
      orderBy: {
        published_at: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
