'use client';

import { useEffect, useState } from 'react';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=10&_embed');
        const data = await res.json();
        console.log("✅ Fetched videos:", data);
        setVideos(data);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Content Page Diagnostic</h1>
      <p className="mb-6">If you're seeing this text, the component is working.</p>

      <div className="grid grid-cols-1 gap-4">
        {videos.map((video) => {
          console.log("📺 Video title:", video.title?.rendered);
          return (
            <div key={video.id} className="p-4 border rounded bg-gray-100">
              <h2 dangerouslySetInnerHTML={{ __html: video.title.rendered }} />
              <p>Playback ID: {video.playback_id || '❌ Not found'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
