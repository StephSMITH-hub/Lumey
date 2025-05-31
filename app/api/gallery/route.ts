import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Gallery from '@/model/gallery';

export async function GET() {
  try {
    await connectToDatabase();
    const gallery = await Gallery.find({}).sort({ order: 1 });
    
    return NextResponse.json({
      success: true,
      gallery
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const galleryItem = new Gallery({
      title: body.title,
      description: body.description,
      image: body.image,
      category: body.category,
      tags: body.tags,
      featured: body.featured,
      order: body.order
    });

    await galleryItem.save();

    return NextResponse.json({
      success: true,
      galleryItem
    });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
} 