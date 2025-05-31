import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Home from '@/model/home';

export async function GET() {
  try {
    await connectToDatabase();
    const home = await Home.findOne({});
    
    if (!home) {
      return NextResponse.json(
        { success: false, message: 'Home content not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      home
    });
  } catch (error) {
    console.error('Error fetching home content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch home content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const home = await Home.findOneAndUpdate(
      {},
      {
        hero: body.hero,
        features: body.features,
        about: body.about,
        testimonials: body.testimonials,
        cta: body.cta
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      home
    });
  } catch (error) {
    console.error('Error updating home content:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update home content' },
      { status: 500 }
    );
  }
} 