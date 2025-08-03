// app/content/page.js or app/content/page.tsx

'use client';

import { useEffect, useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';

export default function ContentPage() {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=1');
        const data = await res.json();
        const post = data[0];

        // Extract playback_id from post
        const playbackId = post.playback_id;

        setVideo({
          title: post.title.rendered,
          description: post.content.rendered,
          thumbnail: post.thumbnail_url,
          playbackId: playbackId,
        });
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    }

    fetchVideo();
  }, []);

  if (!video) return <p>Loading video...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      {video.thumbnail && (
        <img src={video.thumbnail} alt={video.title} style={{ width: '300px', borderRadius: '8px' }} />
      )}

      <h2 style={{ marginTop: '1rem', fontWeight: 'bold' }}>{video.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: video.description }}
        style={{ marginTop: '0.5rem', marginBottom: '1rem' }}
      />

      {video.playbackId ? (
        <VideoPlayer playbackId={video.playbackId} />
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
}
