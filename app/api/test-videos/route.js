import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Fetching videos from WordPress API...');
    
    const response = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Barracks-Media-Frontend/1.0',
        'Cache-Control': 'no-cache',
      },
    });
    
    console.log('WordPress response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('WordPress API error:', errorText);
      return NextResponse.json({ 
        error: `WordPress API error: ${response.status}`, 
        details: errorText 
      }, { status: 500 });
    }
    
    const data = await response.json();
    console.log('Successfully fetched', data.length, 'videos');
    
    // Add mock playback IDs for demo purposes
    const videosWithPlayback = data.map(video => ({
      ...video,
      playback_id: video.playback_id || 'demo-playback-id-' + video.id
    }));
    
    return NextResponse.json(videosWithPlayback);
    
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch videos', 
      details: error.message 
    }, { status: 500 });
  }
}