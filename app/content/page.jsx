'use client';

import { useEffect, useState } from 'react';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video');
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      }
    }

    fetchVideos(); // <-- This was missing its closing brace
  }, []); // <-- This line was cut off in your error

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">Video Content</h1>
      <p className="mb-6">Browse exclusive videos available to subscribers.</p>
      <div className="space-y-6">
        {videos.map((video) => (
          <div key={video.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{video.title.rendered}</h2>
            <img src={video.thumbnail_url} alt={video.title.rendered} className="mb-2 w-full max-w-md rounded" />
            <p>{video.content?.rendered?.replace(/<[^>]+>/g, '') || 'No description provided.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
