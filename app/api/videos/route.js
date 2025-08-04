// app/api/videos/route.js

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const response = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100', {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
      console.error('Fetch error:', response.statusText);
      return NextResponse.json({ error: `Upstream error: ${response.status}` }, { status: 500 });
    }

    const data = await response.json();

    // Validate data is an array
    if (!Array.isArray(data)) {
      return NextResponse.json({ error: 'Expected an array of videos' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('API error:', err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
