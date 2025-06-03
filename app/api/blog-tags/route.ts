import mongoose from "mongoose";
import { NextResponse } from "next/server";
import BlogTag from "@/model/blog_tags";
import { connectToDatabase } from "@/lib/mongodb";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await connectToDatabase();
}

/**
 * @swagger
 * /api/blog-tags:
 *   post:
 *     summary: Create a new blog tag
 *     tags: [BlogTag]
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
 *       201:
 *         description: Tag created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Failed to create tag
 */

export async function POST(req: Request) {
  await connectDB();

  const { name, slug } = await req.json();

  if (!name || !slug) {
    return NextResponse.json(
      { message: "Name and slug are required" },
      { status: 400 }
    );
  }

  try {
    const newTag = new BlogTag({ name, slug });
    await newTag.save();

    return NextResponse.json(newTag, { status: 201 });
  } catch (err) {
    console.error("Error creating tag:", err);
    return NextResponse.json(
      { message: "Failed to create tag" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/blog-tags:
 *   get:
 *     summary: Get all blog tags
 *     tags: [BlogTag]
 *     responses:
 *       200:
 *         description: List of all blog tags
 *       500:
 *         description: Failed to fetch tags
 */

export async function GET() {
  await connectDB();

  try {
    const tags = await BlogTag.find();
    return NextResponse.json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    return NextResponse.json(
      { message: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
