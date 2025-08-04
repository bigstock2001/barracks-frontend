'use client';

import { useEffect, useState } from 'react';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/videos'); // now correctly hits your working API
        const data = await res.json();
        
        console.log('Frontend received data:', data);
        
        // Ensure we always set an array
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error('API returned non-array data:', data);
          setVideos([]);
          setError('Invalid data format received from server');
        }
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setVideos([]);
        setError('Failed to load videos: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Watch Exclusive Content
        </h1>
        <div className="text-center text-white">
          <p>Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Watch Exclusive Content
        </h1>
        <div className="text-center text-red-400">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Watch Exclusive Content
      </h1>

      {videos.length === 0 ? (
        <div className="text-center text-white">
          <p>No videos available at the moment.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
