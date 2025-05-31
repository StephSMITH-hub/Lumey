import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/model/product';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: {
        _id: product._id,
        model_id: product.model_id,
        name: product.name,
        capacity: product.capacity,
        base_price: product.base_price,
        with_panel_price: product.with_panel_price,
        category: product.category,
        image_url: product.image_url,
        description: product.description,
        status: product.status,
        power: product.power,
        specifications: product.specifications
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const product = await Product.findByIdAndUpdate(
      params.id,
      {
        model_id: body.model_id,
        name: body.name,
        capacity: body.capacity,
        base_price: body.base_price,
        with_panel_price: body.with_panel_price,
        category: body.category,
        image_url: body.image_url,
        description: body.description,
        status: body.status,
        power: body.power,
        specifications: body.specifications
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: {
        _id: product._id,
        model_id: product.model_id,
        name: product.name,
        capacity: product.capacity,
        base_price: product.base_price,
        with_panel_price: product.with_panel_price,
        category: product.category,
        image_url: product.image_url,
        description: product.description,
        status: product.status,
        power: product.power,
        specifications: product.specifications
      }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 