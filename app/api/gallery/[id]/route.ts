import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Gallery from '@/model/gallery';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const galleryItem = await Gallery.findById(params.id);

    if (!galleryItem) {
      return NextResponse.json(
        { success: false, message: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      galleryItem
    });
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch gallery item' },
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

    const galleryItem = await Gallery.findByIdAndUpdate(
      params.id,
      {
        title: body.title,
        description: body.description,
        image: body.image,
        category: body.category,
        tags: body.tags,
        featured: body.featured,
        order: body.order
      },
      { new: true }
    );

    if (!galleryItem) {
      return NextResponse.json(
        { success: false, message: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      galleryItem
    });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update gallery item' },
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
    const galleryItem = await Gallery.findByIdAndDelete(params.id);

    if (!galleryItem) {
      return NextResponse.json(
        { success: false, message: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
} 