// app/api/videos/route.js

export async function GET() {
  const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100&_embed', {
    next: { revalidate: 60 },
  });

  const rawData = await res.json();
  const data = Array.isArray(rawData) ? rawData : [rawData]; // Always wrap in array

  const videos = data.map(video => ({
    id: video.id,
    title: video.title.rendered,
    description: video.acf?.description || 'No description provided.',
    genre: video.acf?.genre || '',
    playbackId: video.playback_id || '',
    thumbnail: video.thumbnail_url || '',
  }));

  return new Response(JSON.stringify(videos), {
    headers: { 'Content-Type': 'application/json' },
  });
}
