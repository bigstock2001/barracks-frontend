export async function GET() {
  console.log('=== NEW API ROUTE CALLED ===');
  
  try {
    console.log('Fetching from WordPress...');
    
    const response = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Cache-Control': 'no-cache',
      },
    });
    
    console.log('WordPress response status:', response.status);
    console.log('WordPress response ok:', response.ok);
    
    if (!response.ok) {
      console.log('WordPress response not ok, status:', response.status);
      const errorText = await response.text();
      console.log('WordPress error response:', errorText);
      return Response.json({ error: `WordPress API error: ${response.status}`, details: errorText }, { status: 500 });
    }
    
    const data = await response.json();
    console.log('WordPress data received, count:', data.length);
    console.log('First video:', data[0]?.title?.rendered || 'No videos');
    
    return Response.json(data);
    
  } catch (error) {
    console.log('API route error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}