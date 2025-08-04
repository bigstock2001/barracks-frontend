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

    const rawText = await res.text();

    console.log("✅ Raw response from WordPress:");
    console.log(rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error("❌ JSON parse failed", e);
      return NextResponse.json({ error: "Invalid JSON from backend" }, { status: 500 });
    }

    if (!Array.isArray(data)) {
      console.error("❌ Expected an array but got:", typeof data, data);
      return NextResponse.json({ error: "Expected array from backend" }, { status: 500 });
    }

    console.log("✅ Parsed video data count:", data.length);
    return NextResponse.json(data);
  } catch (err) {
    console.error('🔥 Error in /api/videos route:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}