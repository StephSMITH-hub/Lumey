import mongoose from "mongoose";
import { NextResponse } from "next/server";
import BlogCategory from "@/model/blog_category";
import { connectToDatabase } from "@/lib/mongodb";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await connectToDatabase();
}

/**
 * @swagger
 * /api/blog-categories:
 *   post:
 *     summary: Create a new blog category
 *     tags: [BlogCategory]
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
 *         description: Category created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Failed to create category
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
    const newCategory = new BlogCategory({ name, slug });
    await newCategory.save();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (err) {
    console.error("Error creating category:", err);
    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/blog-categories:
 *   get:
 *     summary: Get all blog categories
 *     tags: [BlogCategory]
 *     responses:
 *       200:
 *         description: List of all blog categories
 *       500:
 *         description: Failed to fetch categories
 */

export async function GET() {
  await connectDB();

  try {
    const categories = await BlogCategory.find();
    return NextResponse.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
