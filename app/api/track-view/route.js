import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { videoId, userId } = await request.json();
    
    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    // For demo purposes, just return success without database operations
    console.log('View tracked:', { videoId, userId, ip });
    
    return NextResponse.json({ 
      success: true, 
      message: 'View counted successfully',
      totalViews: Math.floor(Math.random() * 1000) + 100,
      uniqueViews: Math.floor(Math.random() * 500) + 50
    });
    
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json(
      { error: 'Failed to track view' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');
    
    // Return mock stats for demo
    return NextResponse.json({
      totalViews: Math.floor(Math.random() * 1000) + 100,
      uniqueViews: Math.floor(Math.random() * 500) + 50,
      videoStats: [
        { videoId: '1', totalViews: 450 },
        { videoId: '2', totalViews: 320 }
      ]
    });
    
  } catch (error) {
    console.error('Error getting view stats:', error);
    return NextResponse.json(
      { error: 'Failed to get view stats' },
      { status: 500 }
    );
  }
}