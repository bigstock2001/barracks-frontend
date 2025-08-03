// app/api/videos/route.js

export async function GET() {
  try {
    const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100', {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch video data' }), { status: 500 });
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      return new Response(JSON.stringify({ error: 'Invalid video data format' }), { status: 500 });
    }

    const videos = data.map(video => ({
      id: video.id,
      title: video.title.rendered,
      description: video.content.rendered || 'No description provided.',
      genre: video.genre || '',
      playbackId: video.playback_id || '',
      thumbnail: video.thumbnail_url || '',
    }));

    return new Response(JSON.stringify(videos), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Unexpected error in /api/videos:", err);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
}
