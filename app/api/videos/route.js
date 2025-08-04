// app/api/videos/route.js
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100', {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error('🚨 Not an array:', data);
      throw new Error('Expected an array of videos');
    }

    return NextResponse.json(data);
    
  } catch (err) {
    console.error('🔥 Error in /api/videos:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
