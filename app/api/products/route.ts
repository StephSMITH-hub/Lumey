import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/model/product';

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      products: products.map(product => ({
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
      }))
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const product = new Product({
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
    });

    await product.save();

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
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    );
  }
} 