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
        
        console.log('Fetching directly from WordPress...');
        
        // Call WordPress API directly from the client
        const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
        });
        
        console.log('WordPress response status:', res.status);
        
        if (!res.ok) {
          const errorText = await res.text();
          console.log('WordPress error response:', errorText);
          throw new Error(`WordPress API error: ${res.status} - ${errorText}`);
        }
        
        const data = await res.json();
        console.log('WordPress data received:', data.length, 'videos');
        
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error('API returned non-array data:', data);
          setVideos([]);
          setError('Invalid data format received from WordPress');
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
        <div className="text-center text-red-400 bg-red-900 bg-opacity-50 p-6 rounded-lg">
          <p className="font-semibold">Error loading videos:</p>
          <p className="mt-2">{error}</p>
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
        <div className="text-center text-white bg-gray-800 bg-opacity-50 p-8 rounded-lg">
          <p className="text-lg font-semibold">No videos available</p>
          <p className="text-sm mt-2">Check back later for new content.</p>
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
                  <div className="w-full h-60 bg-gray-200 rounded flex items-center justify-center">
                    <p className="text-gray-500">No video available</p>
                  </div>
                )}

                <div
                  className="mt-2 text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: video.content?.rendered || '<p>No description available.</p>',
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