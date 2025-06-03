import { NextResponse } from "next/server";
import customer from "@/model/customer";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await connectToDatabase();
}

/**
 * @swagger
 * tags:
 *   - Customers
 *
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     description: This endpoint allows you to create a new customer.
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *                 default: "Nigeria"
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     country:
 *                       type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  try {
    if (!body.first_name || !body.last_name || !body.email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCustomer = await customer.create(body);
    return NextResponse.json(
      { success: true, data: newCustomer },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * tags:
 *   - Customers
 *
 * /api/customers:
 *   get:
 *     summary: Retrieve all customers
 *     description: This endpoint retrieves a list of all customers.
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   country:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
export async function GET() {
  await connectDB();

  try {
    const customers = await customer.find().sort({ created_at: -1 });
    return NextResponse.json({ success: true, data: customers });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
