import { NextResponse } from "next/server";
import mongoose from "mongoose";
import BlogTag from "@/model/blog_tags";
import { connectToDatabase } from "@/lib/mongodb";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await connectToDatabase();
}

/**
 * @swagger
 * /api/blog-tags/{uuid}:
 *   get:
 *     summary: Get a blog tag by UUID
 *     tags: [BlogTag]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog Tag found
 *       404:
 *         description: Blog Tag not found
 *       500:
 *         description: Failed to fetch blog tag
 */

export async function GET(req: Request) {
  await connectDB();

  try {
    const blogTag = await BlogTag.findOne({
      uuid: req.url.split("api/blog-tags")[1],
    });

    if (!blogTag) {
      return NextResponse.json(
        { message: "Blog Tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blogTag);
  } catch (err) {
    console.error("Error fetching blog tag by UUID:", err);
    return NextResponse.json(
      { message: "Failed to fetch blog tag" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/blog-tags/{uuid}:
 *   put:
 *     summary: Update a blog tag by UUID
 *     tags: [BlogTag]
 *     parameters:
 *       - in: path
 *         name: uuid
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
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog Tag updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Blog Tag not found
 *       500:
 *         description: Failed to update blog tag
 */

export async function PUT(req: Request) {
  await connectDB();

  const { name, slug } = await req.json();

  if (!name || !slug) {
    return NextResponse.json(
      { message: "Name and slug are required" },
      { status: 400 }
    );
  }

  try {
    const updatedBlogTag = await BlogTag.findOneAndUpdate(
      { uuid: req.url.split("api/blog-tags")[1] },
      { name, slug, updated_at: new Date() },
      { new: true }
    );

    if (!updatedBlogTag) {
      return NextResponse.json(
        { message: "Blog Tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBlogTag);
  } catch (err) {
    console.error("Error updating blog tag:", err);
    return NextResponse.json(
      { message: "Failed to update blog tag" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/blog-tags/{uuid}:
 *   delete:
 *     summary: Delete a blog tag by UUID
 *     tags: [BlogTag]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog Tag deleted successfully
 *       404:
 *         description: Blog Tag not found
 *       500:
 *         description: Failed to delete blog tag
 */

export async function DELETE(req: Request) {
  await connectDB();

  try {
    const deletedBlogTag = await BlogTag.findOneAndDelete({
      uuid: req.url.split("api/blog-tags")[1],
    });

    if (!deletedBlogTag) {
      return NextResponse.json(
        { message: "Blog Tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Blog Tag deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog tag:", err);
    return NextResponse.json(
      { message: "Failed to delete blog tag" },
      { status: 500 }
    );
  }
}
