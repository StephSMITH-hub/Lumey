import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import customer from "@/model/customer";

/**
 * @swagger
 * tags:
 *   - Customers
 *
 * /api/customers/{uuid}:
 *   get:
 *     summary: Retrieve a customer by UUID
 *     description: This endpoint retrieves a customer based on their UUID.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: The UUID of the customer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved customer data
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
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
export async function GET(req: Request) {
  await dbConnect();

  try {
    const customerData = await customer.findOne({
      uuid: req.url.split("api/customers")[1],
    });
    if (!customerData) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: customerData });
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
 * /api/customers/{uuid}:
 *   put:
 *     summary: Update a customer by UUID
 *     description: This endpoint allows updating a customer's details based on their UUID.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: The UUID of the customer to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *     responses:
 *       200:
 *         description: Successfully updated customer data
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
 *       404:
 *         description: Customer not found
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
export async function PUT(req: Request) {
  await dbConnect();
  const body = await req.json();

  try {
    const updatedCustomer = await customer.findOneAndUpdate(
      { uuid: req.url.split("api/customers")[1] },
      body,
      { new: true }
    );
    if (!updatedCustomer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updatedCustomer });
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
 * /api/customers/{uuid}:
 *   delete:
 *     summary: Delete a customer by UUID
 *     description: This endpoint allows deleting a customer based on their UUID.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: The UUID of the customer to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted customer
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
export async function DELETE(req: Request) {
  await dbConnect();

  try {
    const deletedCustomer = await customer.findOneAndDelete({
      uuid: req.url.split("api/customers")[1],
    });
    if (!deletedCustomer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
