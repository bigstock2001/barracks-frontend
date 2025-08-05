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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-900 mb-2">Error Loading Content</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎬 Content Library
          </h1>
          <p className="text-xl text-gray-600">
            Discover podcasts, audiobooks, and exclusive military content
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📺</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No content available</h3>
            <p className="text-gray-600">Check back later for new podcasts and audiobooks.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Video Player */}
                <div className="aspect-video">
                  <VideoPlayer 
                    playbackId={video.playback_id} 
                    videoId={video.id}
                    onViewTracked={(newCount) => handleViewTracked(video.id, newCount)}
                  />
                </div>

                {/* Content Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {video.title?.rendered || 'Untitled Content'}
                  </h3>
                  
                  {video.content?.rendered && (
                    <div 
                      className="text-gray-600 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: video.content.rendered }}
                    />
                  )}

                  {/* View Count */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {viewCounts[video.id] || Math.floor(Math.random() * 1000) + 100} views
                    </span>
                    <span className="text-xs text-gray-400">
                      Published {new Date().toLocaleDateString()}
                    </span>
                  </div>

                  {/* Simple Review Display */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          4.5 ({Math.floor(Math.random() * 20) + 5} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                        ⭐ Write Review
                      </button>
                      <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm font-medium">
                        🚨 Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Want to Upload Your Content?</h2>
          <p className="text-blue-100 mb-6">
            Join our creator program and start sharing your podcasts and audiobooks with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/upload"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              🎙️ View Hosting Plans
            </a>
            <a
              href="/account"
              className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              📊 Creator Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}