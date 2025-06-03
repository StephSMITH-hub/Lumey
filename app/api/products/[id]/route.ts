import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/model/product';

function getIdFromUrl(url: string) {
  const segments = url.split('/');
  return segments[segments.length - 1];
}

export async function GET(request: NextRequest) {
  try {
    const id = getIdFromUrl(request.url);
    await connectToDatabase();
    const product = await Product.findById(id);

    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromUrl(request.url);
    const body = await request.json();
    await connectToDatabase();

    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name: body.name,
          description: body.description,
          price: body.price,
          image: body.image,
          category: body.category,
          features: body.features
        }
      },
      { new: true }
    );

    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromUrl(request.url);
    await connectToDatabase();
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 