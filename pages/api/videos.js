// pages/api/videos.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?_embed&status=publish');
    const videos = await response.json();

    const formatted = videos.map(video => ({
      id: video.id,
      title: video.title.rendered,
      description: video.acf?.description || '',
      genre: video.acf?.genre || '',
      playbackId: video.acf?.mux_playback_id || '',
      thumbnail: video.acf?.thumbnail || ''
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch video data' });
  }
}
