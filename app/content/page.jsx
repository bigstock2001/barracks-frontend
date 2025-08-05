export default function ContentPage() {
import { useState, useEffect } from 'react';

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to load from WordPress API first
      const response = await fetch('/api/videos');
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setVideos(data || []);
    } catch (err) {
      console.error('Error loading content:', err);
      setError(err.message);
      
      // Fallback to mock data for demo
      setVideos([
        {
          id: 1,
          title: { rendered: 'Military Leadership Basics' },
          content: { rendered: 'Essential leadership techniques for military personnel and veterans transitioning to civilian roles.' },
          acf: {
            creator: 'Sergeant Johnson',
            views: 1250,
            playback_id: 'demo-video-1'
          }
        },
        {
          id: 2,
          title: { rendered: 'Combat Readiness Protocol' },
          content: { rendered: 'Advanced combat preparation strategies and mental resilience training.' },
          acf: {
            creator: 'Captain Smith',
            views: 890,
            playback_id: 'demo-video-2'
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Content...</h3>
            <p className="text-gray-600">Fetching your podcasts and audiobooks...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Loading Error</h3>
            <p className="text-gray-600 mb-4">Error: {error}</p>
            <button
              onClick={loadContent}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Video Player */}
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  {video.acf?.playback_id ? (
                    <mux-player
                      playback-id={video.acf.playback_id}
                      stream-type="on-demand"
                      metadata-video-title={video.title?.rendered || 'Video'}
                      class="w-full h-full"
                      primary-color="#c62828"
                      accent-color="#222"
                    ></mux-player>
                  ) : (
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🎥</div>
                      <p>Video Player</p>
                    </div>
                  )}
                </div>

                {/* Content Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {video.title?.rendered || 'Untitled'}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {video.content?.rendered?.replace(/<[^>]*>/g, '') || 'No description available'}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By {video.acf?.creator || 'Unknown'}</span>
                    <span>{video.acf?.views || 0} views</span>
                  </div>

                  {/* Simple Review Display */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">4.5 (12)</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        ⭐ Review
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        🚨 Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && videos.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Content Yet</h3>
            <p className="text-gray-600">Be the first to upload content to the platform!</p>
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
'use client';
}