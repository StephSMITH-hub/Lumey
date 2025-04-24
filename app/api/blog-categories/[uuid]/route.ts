import mongoose from "mongoose";
import { NextResponse } from "next/server";
import BlogCategory from "@/model/blog_category";
import dbConnect from "@/lib/dbConnect";

async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await dbConnect();
}

/**
 * @swagger
 * /api/blog-categories/{uuid}:
 *   get:
 *     summary: Get a single blog category by UUID
 *     tags: [BlogCategory]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *       400:
 *         description: UUID is required
 *       404:
 *         description: Category not found
 *       500:
 *         description: Failed to fetch category
 */

export async function GET(_: Request, { params }: { params: { uuid: string } }) {
    await connectDB();

    try {
        const category = await BlogCategory.findOne({ uuid: params.uuid });

        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (err) {
        console.error("Error fetching category by UUID:", err);
        return NextResponse.json({ message: "Failed to fetch category" }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/blog-categories/{uuid}:
 *   put:
 *     summary: Update a blog category by UUID
 *     tags: [BlogCategory]
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
 *         description: Category updated successfully
 *       400:
 *         description: UUID is required
 *       404:
 *         description: Category not found
 *       500:
 *         description: Failed to update category
 */

export async function PUT(req: Request, { params }: { params: { uuid: string } }) {
    await connectDB();

    const uuid = params.uuid;

    if (!uuid) {
        return NextResponse.json({ message: "UUID is required" }, { status: 400 });
    }

    const { name, slug } = await req.json();

    try {
        const updatedCategory = await BlogCategory.findOneAndUpdate(
            { uuid },
            { name, slug },
            { new: true }
        );

        if (!updatedCategory) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(updatedCategory);
    } catch (err) {
        console.error("Error updating category:", err);
        return NextResponse.json({ message: "Failed to update category" }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/blog-categories/{uuid}:
 *   delete:
 *     summary: Delete a blog category by UUID
 *     tags: [BlogCategory]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: UUID is required
 *       404:
 *         description: Category not found
 *       500:
 *         description: Failed to delete category
 */

export async function DELETE(req: Request, { params }: { params: { uuid: string } }) {
    await connectDB();

    const uuid = params.uuid;

    if (!uuid) {
        return NextResponse.json({ message: "UUID is required" }, { status: 400 });
    }

    try {
        const deletedCategory = await BlogCategory.findOneAndDelete({ uuid });

        if (!deletedCategory) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("Error deleting category:", err);
        return NextResponse.json({ message: "Failed to delete category" }, { status: 500 });
    }
}
