'use client';

import { useState, useEffect } from 'react';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading and set demo data
    const timer = setTimeout(() => {
      setVideos([
        {
          id: 1,
          title: 'Military Leadership Basics',
          description: 'Essential leadership techniques for military personnel and veterans.',
          creator: 'Sergeant Johnson',
          views: 1250,
          playback_id: 'demo-video-1'
        },
        {
          id: 2,
          title: 'Combat Readiness Protocol',
          description: 'Advanced combat preparation strategies and mental resilience training.',
          creator: 'Captain Smith',
          views: 890,
          playback_id: 'demo-video-2'
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎬 Content Library
          </h1>
          <p className="text-xl text-gray-600">
            Discover podcasts, audiobooks, and exclusive military content
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Video Thumbnail */}
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🎥</div>
                  <p>Video Player</p>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {video.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {video.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {video.creator}</span>
                  <span>{video.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Want to Upload Your Content?</h2>
          <p className="mb-6">
            Join our creator program and start sharing your podcasts with our community.
          </p>
          <a
            href="/upload"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            🎙️ View Hosting Plans
          </a>
        </div>
      </div>
    </div>
  );
}