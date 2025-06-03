import { NextResponse } from "next/server";
import mongoose from "mongoose";
import BlogAuthor from "@/model/blog_author";
import { connectToDatabase } from "@/lib/mongodb";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await connectToDatabase();
}

/**
 * @swagger
 * /api/blog-authors:
 *   post:
 *     summary: Create a new blog author
 *     tags: [BlogAuthor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created successfully
 *       500:
 *         description: Failed to create author
 */
export async function POST(req: Request) {
  await connectDB();

  const { name, email, bio, avatar_url } = await req.json();

  try {
    const newAuthor = new BlogAuthor({
      name,
      email,
      bio: bio || null,
      avatar_url: avatar_url || null,
    });

    await newAuthor.save();

    return NextResponse.json(newAuthor, { status: 201 });
  } catch (err) {
    console.error("Error creating author:", err);
    return NextResponse.json(
      { message: "Failed to create author" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/blog-authors:
 *   get:
 *     summary: Get all blog authors
 *     tags: [BlogAuthor]
 *     responses:
 *       200:
 *         description: A list of blog authors
 *       500:
 *         description: Failed to fetch authors
 */
export async function GET() {
  await connectDB();

  try {
    const authors = await BlogAuthor.find();
    return NextResponse.json(authors);
  } catch (err) {
    console.error("Error fetching authors:", err);
    return NextResponse.json(
      { message: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}
