'use client';

import { useEffect, useState } from 'react';
import VideoPlayer from '../../components/VideoPlayer';

export default function ContentPage() {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=1');
        const data = await res.json();
        const latest = data[0];

        setVideo({
          title: latest.title.rendered,
          description: latest.content.rendered.replace(/<[^>]*>?/gm, ''), // remove HTML
          playbackId: latest.playback_id,
          thumbnail: latest.thumbnail_url
        });
      } catch (err) {
        console.error('Error fetching video:', err);
      }
    }

    fetchVideo();
  }, []);

  if (!video) {
    return <p style={{ padding: '2rem' }}>Loading video...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{video.title}</h1>
      <VideoPlayer playbackId={video.playbackId} />
      <p style={{ marginTop: '1rem', fontSize: '1rem', color: '#444' }}>{video.description}</p>
    </div>
  );
}
