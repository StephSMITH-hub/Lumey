import { NextResponse } from "next/server";
import BlogPostTag from "@/model/blog_post_tags";
import BlogPost from "@/model/blog_post";
import BlogTags from "@/model/blog_tags";
import { connectToDatabase } from "@/lib/mongodb";

// Swagger decorators
/**
 * @swagger
 * /api/blog-post-tags/{uuid}:
 *   get:
 *     summary: Get a blog post-tag link by UUID
 *     tags: [BlogPostTags]
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag link retrieved successfully
 *       404:
 *         description: Tag link not found
 *   patch:
 *     summary: Update a blog post-tag link by UUID
 *     tags: [BlogPostTags]
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blog_post_id:
 *                 type: string
 *               blog_tag_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tag link updated successfully
 *       400:
 *         description: blog_post_id or blog_tag_id invalid
 *       404:
 *         description: Tag link not found
 *   delete:
 *     summary: Delete a blog post-tag link by UUID
 *     tags: [BlogPostTags]
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag link deleted successfully
 *       404:
 *         description: Tag link not found
 */

interface Params {
  params: { uuid: string };
}

export async function GET(req: Request) {
  await connectToDatabase();

  try {
    const tagLink = await BlogPostTag.findOne({
      uuid: req.url.split("api/blog-post-tags")[1],
    });
    if (!tagLink) {
      return NextResponse.json(
        { message: "Tag link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(tagLink, { status: 200 });
  } catch (error) {
    console.error(
      `GET /blog-post-tags/${req.url.split("api/blog-post-tags")[1]} error:`,
      error
    );
    return NextResponse.json(
      { message: "Failed to fetch tag link" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { blog_post_id, blog_tag_id } = body;

    const tagLink = await BlogPostTag.findOne({
      uuid: req.url.split("api/blog-post-tags")[1],
    });
    if (!tagLink) {
      return NextResponse.json(
        { message: "Tag link not found" },
        { status: 404 }
      );
    }

    if (blog_post_id) {
      const postExists = await BlogPost.findOne({ uuid: blog_post_id });
      if (!postExists) {
        return NextResponse.json(
          { message: "Invalid blog_post_id" },
          { status: 400 }
        );
      }
      tagLink.blog_post_id = blog_post_id;
    }

    if (blog_tag_id) {
      const tagExists = await BlogTags.findOne({ uuid: blog_tag_id });
      if (!tagExists) {
        return NextResponse.json(
          { message: "Invalid blog_tag_id" },
          { status: 400 }
        );
      }
      tagLink.blog_tag_id = blog_tag_id;
    }

    await tagLink.save();

    return NextResponse.json(tagLink, { status: 200 });
  } catch (error) {
    console.error(
      `PATCH /blog-post-tags/${req.url.split("api/blog-post-tags")[1]} error:`,
      error
    );
    return NextResponse.json(
      { message: "Failed to update tag link" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await connectToDatabase();

  try {
    const deleted = await BlogPostTag.findOneAndDelete({
      uuid: req.url.split("api/blog-post-tags")[1],
    });

    if (!deleted) {
      return NextResponse.json(
        { message: "Tag link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tag link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `DELETE /blog-post-tags/${req.url.split("api/blog-post-tags")[1]} error:`,
      error
    );
    return NextResponse.json(
      { message: "Failed to delete tag link" },
      { status: 500 }
    );
  }
}
