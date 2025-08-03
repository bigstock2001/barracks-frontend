// app/api/videos/route.js

export async function GET() {
  const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100&_embed', {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  const videos = data.map(video => ({
    id: video.id,
    title: video.title.rendered,
    description: video.acf?.description || 'No description provided.',
    genre: video.acf?.genre || '',
    playbackId: video.acf?.playback_id || '',
    thumbnail: video._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
  }));

  return new Response(JSON.stringify(videos), {
    headers: { 'Content-Type': 'application/json' },
  });
}
