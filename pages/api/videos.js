// pages/api/videos.js
export default async function handler(req, res) {
  const response = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/videos');
  const data = await response.json();

  const formatted = data.map((item) => ({
    id: item.id,
    title: item.title.rendered,
    description: item.excerpt.rendered.replace(/<[^>]+>/g, ''),
    playback_id: item.meta?.mux_playback_id || '',
  }));

  res.status(200).json(formatted);
}
