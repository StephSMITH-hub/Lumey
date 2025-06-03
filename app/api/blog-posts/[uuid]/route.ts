import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import BlogPost from "@/model/blog_post";
import { connectToDatabase } from "@/lib/mongodb";

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

interface BlogPostParams {
  params: {
    uuid: string;
  };
}

// GET /api/blog-posts/[uuid]
export async function GET(req: Request, { params }: BlogPostParams) {
  try {
    await connectToDatabase();
    const post = await BlogPost.findOne({
      where: {
        uuid: params.uuid,
      },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
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

// PUT /api/blog-posts/[uuid]
export async function PUT(req: Request, { params }: BlogPostParams) {
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

    // Update the blog post
    const post = await BlogPost.updateOne({
      where: {
        uuid: params.uuid,
      },
      data: {
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
        tags: tags
          ? {
              set: [], // Clear existing tags
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
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
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

// DELETE /api/blog-posts/[uuid]
export async function DELETE(req: Request, { params }: BlogPostParams) {
  try {
    await connectToDatabase();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await BlogPost.deleteOne({
      where: {
        uuid: params.uuid,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
