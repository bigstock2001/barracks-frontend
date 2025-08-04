export async function GET() {
  try {
    console.log('Fetching videos from WordPress API...');
    const response = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100', {
      headers: {
        'Accept': 'application/json',
      },
      // If the server blocks bots, add a User-Agent:
      next: { revalidate: 3600 }, // Optional: Enables ISR on Vercel
    });

    console.log('WordPress API response status:', response.status);
    console.log('WordPress API response headers:', Object.fromEntries(response.headers.entries()));
    if (!response.ok) {
      const errorText = await response.text();
      console.error('WordPress API error response:', errorText);
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('WordPress API data type:', typeof data);
    console.log('WordPress API data length:', Array.isArray(data) ? data.length : 'not an array');
    console.log('WordPress API first item:', Array.isArray(data) && data.length > 0 ? data[0] : 'no items');
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API route error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
