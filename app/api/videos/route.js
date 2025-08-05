export async function GET() {
  console.log('=== Videos API Route Called ===');
  
  try {
    console.log('Fetching from WordPress...');
    
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
      return Response.json({ 
        error: `WordPress API error: ${response.status}`, 
        details: errorText 
      }, { status: 500 });
    }
    
    const data = await response.json();
    console.log('Successfully fetched', data.length, 'videos');
    
    return Response.json(data);
    
  } catch (error) {
    console.error('API route error:', error);
    return Response.json({ 
      error: 'Failed to fetch videos', 
      details: error.message 
    }, { status: 500 });
  }
}