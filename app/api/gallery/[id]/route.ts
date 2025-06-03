import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Gallery from '@/model/gallery';
import { auth } from '@/lib/auth';

function getIdFromUrl(url: string) {
  const segments = url.split('/');
  return segments[segments.length - 1];
}

export async function GET(request: Request) {
  try {
    const id = getIdFromUrl(request.url);
    await connectToDatabase();
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json(
        { error: "Gallery not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const id = getIdFromUrl(request.url);
    await connectToDatabase();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const gallery = await Gallery.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!gallery) {
      return NextResponse.json(
        { error: "Gallery not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error updating gallery:", error);
    return NextResponse.json(
      { error: "Failed to update gallery" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const id = getIdFromUrl(request.url);
    await connectToDatabase();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const gallery = await Gallery.findByIdAndDelete(id);

    if (!gallery) {
      return NextResponse.json(
        { error: "Gallery not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery" },
      { status: 500 }
    );
  }
} 