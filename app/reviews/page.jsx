'use client';

import { useState, useEffect } from 'react';
import { authService } from '../../lib/auth';

export default function ReviewsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('received'); // 'received', 'given'
  
  // Mock data - in real app, this would come from Supabase
  const [receivedReviews, setReceivedReviews] = useState([
    {
      id: 1,
      reviewer: { name: 'Sarah Johnson', type: 'podcaster', show: 'Military Mindset Podcast' },
      rating: 5,
      reviewText: 'Excellent guest! Very professional and provided great insights on leadership. Would definitely have back on the show.',
      reviewType: 'guest_experience',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      reviewer: { name: 'Mike Thompson', type: 'podcaster', show: 'Veteran Stories' },
      rating: 4,
      reviewText: 'Good interview, came prepared with talking points. Audio quality could have been better.',
      reviewType: 'guest_experience',
      createdAt: '2024-01-18T14:15:00Z'
    }
  ]);

  const [givenReviews, setGivenReviews] = useState([
    {
      id: 3,
      reviewed: { name: 'Jennifer Davis', type: 'podcaster', show: 'Leadership Lessons' },
      rating: 5,
      reviewText: 'Great host! Made me feel comfortable and asked thoughtful questions. Professional setup.',
      reviewType: 'podcaster_experience',
      createdAt: '2024-01-19T16:45:00Z'
    }
  ]);

  const [userStats, setUserStats] = useState({
    averageRating: 4.5,
    totalReviews: 2,
    ratingBreakdown: { '5_star': 1, '4_star': 1, '3_star': 0, '2_star': 0, '1_star': 0 }
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { user: currentUser } = await authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view reviews.</p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home Page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ⭐ My Reviews & Ratings
          </h1>
          <p className="text-gray-600">
            View feedback from your podcast connections and content
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.averageRating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
              {renderStars(Math.round(userStats.averageRating))}
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{userStats.totalReviews}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {userStats.ratingBreakdown['5_star']}
              </div>
              <div className="text-sm text-gray-600">5-Star Reviews</div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center mb-2">
                <span className="text-sm text-gray-600 w-8">{star}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${userStats.totalReviews > 0 ? (userStats.ratingBreakdown[`${star}_star`] / userStats.totalReviews) * 100 : 0}%`
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {userStats.ratingBreakdown[`${star}_star`]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('received')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'received'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews I've Received ({receivedReviews.length})
              </button>
              <button
                onClick={() => setActiveTab('given')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'given'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews I've Given ({givenReviews.length})
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Received Reviews Tab */}
            {activeTab === 'received' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews About You</h2>
                
                {receivedReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">⭐</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
                    <p className="text-gray-600">Complete some podcast interviews to start receiving reviews!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {receivedReviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white font-bold">
                                {review.reviewer.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{review.reviewer.name}</h3>
                              <p className="text-sm text-gray-600">
                                {review.reviewer.type === 'podcaster' ? '🎙️ Host' : '🎤 Guest'} • {review.reviewer.show}
                              </p>
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">{review.reviewText}</p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-500 capitalize">
                            {review.reviewType.replace('_', ' ')}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Given Reviews Tab */}
            {activeTab === 'given' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews You've Written</h2>
                
                {givenReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">✍️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews written yet</h3>
                    <p className="text-gray-600">After completing podcast interviews, you can leave reviews for hosts!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {givenReviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white font-bold">
                                {review.reviewed.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{review.reviewed.name}</h3>
                              <p className="text-sm text-gray-600">
                                {review.reviewed.type === 'podcaster' ? '🎙️ Host' : '🎤 Guest'} • {review.reviewed.show}
                              </p>
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="text-xs text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Edit
                            </button>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">{review.reviewText}</p>
                        </div>

                        <div className="mt-4">
                          <span className="text-xs text-gray-500 capitalize">
                            {review.reviewType.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 About Reviews</h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>Guest Reviews:</strong> Podcasters can review your performance as a guest after interviews.</p>
            <p><strong>Host Reviews:</strong> You can review podcast hosts after appearing on their shows.</p>
            <p><strong>Content Reviews:</strong> Users can rate and review your uploaded content (podcasts, audiobooks).</p>
            <p><strong>Quality Control:</strong> All reviews are moderated to ensure they're constructive and appropriate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}