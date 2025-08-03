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

    fetchVideos();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">Video Content</h1>
      <p className="mb-6">Browse exclusive videos available to subscribers.</p>
      <div className="space-y-8">
        {videos.map((video) => (
          <div key={video.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{video.title.rendered}</h2>

            {video.thumbnail_url && (
              <img
                src={video.thumbnail_url}
                alt={video.title.rendered}
                className="mb-4 w-full max-w-lg rounded"
              />
            )}

            {video.playback_id ? (
              <mux-player
                playback-id={video.playback_id}
                stream-type="on-demand"
                metadata-video-title={video.title.rendered}
                class="w-full max-w-3xl h-[400px] rounded mb-4"
              ></mux-player>
            ) : (
              <p className="text-red-500">No playback ID provided.</p>
            )}

            <div
              dangerouslySetInnerHTML={{ __html: video.content?.rendered || '<p>No description provided.</p>' }}
              className="prose"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
