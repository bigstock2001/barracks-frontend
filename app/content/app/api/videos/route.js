import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100');
    
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Confirm the data is an array — otherwise `map` will fail
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error in /api/videos:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
