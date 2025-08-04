export async function GET() {
  try {
    console.log('=== API ROUTE START ===');
    console.log('Fetching videos from WordPress API...');
    
    const wpUrl = 'https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100';
    console.log('WordPress URL:', wpUrl);
    
    const response = await fetch(wpUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'BarracksMedia-Frontend/1.0',
      },
      // Remove next.revalidate as it might cause issues in some environments
    });

    console.log('WordPress API response status:', response.status);
    console.log('WordPress API response ok:', response.ok);
    console.log('WordPress API response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('WordPress API error response:', errorText);
      return new Response(JSON.stringify({ 
        error: `WordPress API returned ${response.status}: ${response.statusText}`,
        details: errorText,
        url: wpUrl
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
        rawResponse: responseText.substring(0, 1000),
        parseError: parseError.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    console.log('WordPress API data type:', typeof data);
    console.log('WordPress API data length:', Array.isArray(data) ? data.length : 'not an array');
    
    // If it's an error object from WordPress, return it as an error
    if (data && data.code && data.message) {
      console.error('WordPress returned an error:', data);
      return new Response(JSON.stringify({ 
        error: `WordPress Error: ${data.message}`,
        code: data.code,
        details: data
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // If it's not an array, something is wrong
    if (!Array.isArray(data)) {
      console.error('WordPress API returned non-array data:', data);
      return new Response(JSON.stringify({ 
        error: 'WordPress API returned unexpected data format',
        dataType: typeof data,
        data: data
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    console.log('WordPress API first item:', data.length > 0 ? data[0] : 'no items');
    console.log('=== API ROUTE END ===');
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API route error:', error);
    console.error('API route error stack:', error.stack);
    return new Response(JSON.stringify({ 
      error: 'Internal server error: ' + error.message,
      stack: error.stack
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
