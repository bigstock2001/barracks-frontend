export async function GET() {
  try {
    const response = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100');
    
    if (!response.ok) {
      return Response.json({ error: `WordPress API error: ${response.status}` }, { status: 500 });
    }
    
    const data = await response.json();
    return Response.json(data);
    
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}