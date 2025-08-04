export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100', {
      headers: { 'Accept': 'application/json' },
    });

    const text = await res.text();

    console.log('Raw response:', text); // 🪵 LOG TO VERCEL

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error('JSON parse error:', err.message);
      throw new Error('Invalid JSON from backend');
    }

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', typeof data);
      throw new Error('Expected an array of videos');
    }

    return NextResponse.json(data);

  } catch (err) {
    console.error('API /api/videos failed:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
