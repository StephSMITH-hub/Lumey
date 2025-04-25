import { NextResponse } from "next/server";
import mongoose from "mongoose";
import BlogAuthor from "@/model/blog_author";
import dbConnect from "@/lib/dbConnect";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await dbConnect();
}

/**
 * @swagger
 * /api/blog-authors/{uuid}:
 *   get:
 *     summary: Get a single blog author by UUID
 *     tags: [BlogAuthor]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found
 *       400:
 *         description: UUID is required
 *       404:
 *         description: Author not found
 *       500:
 *         description: Failed to fetch author
 */

export async function GET(req: Request) {
  await connectDB();

  const uuid = req.url.split("api/blog-authors")[1];

  try {
    const author = await BlogAuthor.findOne({ uuid });

    if (!author) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(author);
  } catch (err) {
    console.error("Error fetching author by UUID:", err);
    return NextResponse.json(
      { message: "Failed to fetch author" },
      { status: 500 }
    );
  }
}
/**
 * @swagger
 * /api/blog-authors/{uuid}:
 *   put:
 *     summary: Update a blog author by UUID
 *     tags: [BlogAuthor]
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
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: UUID is required
 *       404:
 *         description: Author not found
 *       500:
 *         description: Failed to update author
 */

export async function PUT(req: Request) {
  await connectDB();

  const uuid = req.url.split("api/blog-authors")[1];

  if (!uuid) {
    return NextResponse.json({ message: "UUID is required" }, { status: 400 });
  }

  const { name, email, bio, avatar_url } = await req.json();

  try {
    const updatedAuthor = await BlogAuthor.findOneAndUpdate(
      { uuid },
      { name, email, bio, avatar_url },
      { new: true }
    );

    if (!updatedAuthor) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedAuthor);
  } catch (err) {
    console.error("Error updating author:", err);
    return NextResponse.json(
      { message: "Failed to update author" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/blog-authors/{uuid}:
 *   delete:
 *     summary: Delete a blog author by UUID
 *     tags: [BlogAuthor]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       400:
 *         description: UUID is required
 *       404:
 *         description: Author not found
 *       500:
 *         description: Failed to delete author
 */

export async function DELETE(req: Request) {
  await connectDB();

  const uuid = req.url.split("api/blog-authors")[1];

  if (!uuid) {
    return NextResponse.json({ message: "UUID is required" }, { status: 400 });
  }

  try {
    const deletedAuthor = await BlogAuthor.findOneAndDelete({ uuid });

    if (!deletedAuthor) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Author deleted successfully" });
  } catch (err) {
    console.error("Error deleting author:", err);
    return NextResponse.json(
      { message: "Failed to delete author" },
      { status: 500 }
    );
  }
}
