import { NextResponse } from 'next/server';

// In-memory storage for demo - in production, use a database
let viewData = new Map();
let ipViews = new Map();

export async function POST(request) {
  try {
    const { videoId, userId } = await request.json();
    
    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    // Create unique key for this IP + video combination
    const viewKey = `${ip}-${videoId}`;
    
    // Check if this IP has already viewed this video recently (within 24 hours)
    const now = Date.now();
    const lastView = ipViews.get(viewKey);
    const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    if (lastView && (now - lastView) < cooldownPeriod) {
      return NextResponse.json({ 
        success: false, 
        message: 'View already counted for this IP within 24 hours',
        timeUntilNextView: Math.ceil((cooldownPeriod - (now - lastView)) / (60 * 1000)) // minutes
      });
    }
    
    // Record the view
    ipViews.set(viewKey, now);
    
    // Update video view count
    if (!viewData.has(videoId)) {
      viewData.set(videoId, {
        totalViews: 0,
        uniqueViews: 0,
        viewHistory: []
      });
    }
    
    const videoStats = viewData.get(videoId);
    videoStats.totalViews += 1;
    videoStats.uniqueViews += 1; // Since we're preventing duplicates from same IP
    videoStats.viewHistory.push({
      timestamp: now,
      ip: ip.substring(0, 8) + '***', // Partially mask IP for privacy
      userId: userId || 'anonymous'
    });
    
    // Keep only last 1000 view records to prevent memory issues
    if (videoStats.viewHistory.length > 1000) {
      videoStats.viewHistory = videoStats.viewHistory.slice(-1000);
    }
    
    viewData.set(videoId, videoStats);
    
    return NextResponse.json({ 
      success: true, 
      message: 'View counted successfully',
      totalViews: videoStats.totalViews,
      uniqueViews: videoStats.uniqueViews
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
    
    if (videoId) {
      // Get stats for specific video
      const stats = viewData.get(videoId) || {
        totalViews: 0,
        uniqueViews: 0,
        viewHistory: []
      };
      
      return NextResponse.json(stats);
    } else {
      // Get overall stats
      let totalViews = 0;
      let totalUniqueViews = 0;
      const videoStats = [];
      
      for (const [id, stats] of viewData.entries()) {
        totalViews += stats.totalViews;
        totalUniqueViews += stats.uniqueViews;
        videoStats.push({
          videoId: id,
          ...stats
        });
      }
      
      return NextResponse.json({
        totalViews,
        totalUniqueViews,
        videoCount: viewData.size,
        videoStats: videoStats.sort((a, b) => b.totalViews - a.totalViews)
      });
    }
    
  } catch (error) {
    console.error('Error getting view stats:', error);
    return NextResponse.json(
      { error: 'Failed to get view stats' },
      { status: 500 }
    );
  }
}