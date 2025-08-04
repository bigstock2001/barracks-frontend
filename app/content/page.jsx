'use client';

import { useEffect, useState } from 'react';
import VideoPlayer from '../../components/VideoPlayer';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewCounts, setViewCounts] = useState({});

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch('/api/test-videos');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();

        if (Array.isArray(data)) {
          setVideos(data);
        } else if (data && data.error) {
          setError(`API Error: ${data.error}`);
          setVideos([]);
        } else {
          setVideos([]);
          setError(`Invalid data format: Expected array, got ${typeof data}`);
        }
      } catch (err) {
        setVideos([]);
        setError('Failed to load videos: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const handleViewTracked = (videoId, newViewCount) => {
    setViewCounts(prev => ({
      ...prev,
      [videoId]: newViewCount
    }));
  };
  if (loading) {
    return (
      <div className="p-6 space-y-10">
        <div className="text-center text-gray-600">
          <p>Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-10">
        <div className="text-center text-red-600 bg-red-50 p-4 rounded">
          <p className="font-semibold">Error loading videos:</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      {videos.length === 0 ? (
        <div className="text-center text-gray-600 bg-gray-50 p-8 rounded">
          <p className="text-lg font-semibold">No videos available</p>
          <p className="text-sm mt-2">Check back later for new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">{video.title?.rendered || 'Untitled'}</h3>
              <VideoPlayer 
                playbackId={video.playback_id} 
                videoId={video.id}
                onViewTracked={(newCount) => handleViewTracked(video.id, newCount)}
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  👁️ {viewCounts[video.id] || 0} views
                </span>
                <span className="text-xs text-gray-400">
                  Unique IP tracking enabled
                </span>
              </div>
              {video.content?.rendered && (
                <div 
                  className="mt-2 text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: video.content.rendered }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
