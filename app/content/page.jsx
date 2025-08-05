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
              
              {/* Review System */}
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">⭐ Reviews & Ratings</h4>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">4.5 (12 reviews)</span>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                    ⭐ Write Review
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm">
                    🚨 Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
