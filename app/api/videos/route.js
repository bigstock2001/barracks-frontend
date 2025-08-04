export async function GET() {
  try {
    console.log('=== API ROUTE START ===');
    console.log('Fetching videos from WordPress API...');
    
    const wpUrl = 'https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100';
    console.log('WordPress URL:', wpUrl);
    
    const response = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'BarracksMedia-Frontend/1.0',
      },
      next: { revalidate: 3600 }, // Optional: Enables ISR on Vercel
    });

    console.log('WordPress API response status:', response.status);
    console.log('WordPress API response ok:', response.ok);
    console.log('WordPress API response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('WordPress API error response:', errorText);
      return new Response(JSON.stringify({ 
        error: `WordPress API error: ${response.status} ${response.statusText}`,
        details: errorText 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const responseText = await response.text();
    console.log('WordPress API raw response length:', responseText.length);
    console.log('WordPress API raw response preview:', responseText.substring(0, 500));
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse WordPress response as JSON:', parseError);
      return new Response(JSON.stringify({ 
        error: 'Invalid JSON from WordPress API',
        rawResponse: responseText.substring(0, 1000)
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    console.log('WordPress API data type:', typeof data);
    console.log('WordPress API data length:', Array.isArray(data) ? data.length : 'not an array');
    console.log('WordPress API first item:', Array.isArray(data) && data.length > 0 ? data[0] : 'no items');
    console.log('WordPress API full response:', JSON.stringify(data, null, 2));
    console.log('=== API ROUTE END ===');
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API route error:', error);
    console.error('API route error stack:', error.stack);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
