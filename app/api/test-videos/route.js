export async function GET() {
  console.log('=== TEST API ROUTE CALLED ===');
  
  try {
    console.log('Fetching from WordPress...');
    const response = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100');
    
    console.log('WordPress response status:', response.status);
    
    if (!response.ok) {
      console.log('WordPress response not ok');
      return Response.json({ error: `WordPress API error: ${response.status}` }, { status: 500 });
    }
    
    const data = await response.json();
    console.log('WordPress data received:', data.length, 'videos');
    
    return Response.json(data);
    
  } catch (error) {
    console.log('API route error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}