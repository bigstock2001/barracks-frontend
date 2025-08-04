export async function GET() {
  try {
    console.log('=== API ROUTE START ===');
    
    const wpUrl = 'https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100';
    console.log('Fetching from:', wpUrl);
    
    const response = await fetch(wpUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'BarracksMedia-Frontend/1.0',
      },
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error('WordPress API error:', response.status, response.statusText);
      return Response.json({ 
        error: `WordPress API returned ${response.status}: ${response.statusText}` 
      }, { status: 500 });
    }

    const data = await response.json();
    console.log('Successfully fetched', Array.isArray(data) ? data.length : 0, 'videos');
    
    return Response.json(data);
    
  } catch (error) {
    console.error('API route error:', error.message);
    return Response.json({ 
      error: 'Failed to fetch videos: ' + error.message 
    }, { status: 500 });
  }
}