'use client';

import { useEffect, useState } from 'react';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos'); // now correctly hits your working API
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Watch Exclusive Content
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            {video.thumbnail_url && (
              <img
                src={video.thumbnail_url}
                alt={video.title.rendered}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-black">
                {video.title.rendered}
              </h2>

              {video.playback_id ? (
                <mux-player
                  playback-id={video.playback_id}
                  stream-type="on-demand"
                  metadata-video-title={video.title.rendered}
                  class="w-full h-60 rounded"
                  primary-color="#c62828"
                  accent-color="#222"
                ></mux-player>
              ) : (
                <p className="text-red-500">No video available.</p>
              )}

              <div
                className="mt-2 text-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: video.content?.rendered || '<p>No description.</p>',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
