// pages/content.js
import React, { useEffect, useState } from 'react';

export default function Content() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch('/api/videos');
      const data = await res.json();
      setVideos(data);
    }
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Featured Content</h1>
      {videos.map((video) => (
        <div key={video.id} style={{ marginBottom: '2rem' }}>
          <mux-player
            playback-id={video.playback_id}
            stream-type="on-demand"
            controls
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          ></mux-player>
          <div style={{ padding: '0.75rem' }}>
            <strong>{video.title}</strong>
            <p style={{ fontSize: '0.85rem', color: '#888888' }}>{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
