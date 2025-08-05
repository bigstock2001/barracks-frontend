'use client';

import { useState, useEffect } from 'react';
import { authService } from '../lib/auth';

export default function ReviewSystem({ contentId, contentType = 'content', reviewedUserId = null }) {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reportType, setReportType] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingBreakdown: { '5_star': 0, '4_star': 0, '3_star': 0, '2_star': 0, '1_star': 0 }
  });

  useEffect(() => {
    loadUser();
    loadReviews();
  }, [contentId, reviewedUserId]);

  const loadUser = async () => {
    const { user: currentUser } = await authService.getCurrentUser();
    setUser(currentUser);
  };

  const loadReviews = () => {
    // Mock reviews data - in real app, this would come from Supabase
    const mockReviews = [
      {
        id: 1,
        reviewer: { name: 'John Smith', verified: true },
        rating: 5,
        reviewText: 'Excellent content! Very informative and well-produced.',
        createdAt: '2024-01-20T10:30:00Z'
      },
      {
        id: 2,
        reviewer: { name: 'Sarah Johnson', verified: false },
        rating: 4,
        reviewText: 'Good quality audio and interesting topics covered.',
        createdAt: '2024-01-19T14:15:00Z'
      }
    ];

    setReviews(mockReviews);
    setStats({
      averageRating: 4.5,
      totalReviews: mockReviews.length,
      ratingBreakdown: { '5_star': 1, '4_star': 1, '3_star': 0, '2_star': 0, '1_star': 0 }
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a review');
      return;
    }

    setLoading(true);
    
    // Mock review submission - in real app, this would save to Supabase
    const newReview = {
      id: Date.now(),
      reviewer: { name: user.user_metadata?.name || user.email.split('@')[0], verified: true },
      rating,
      reviewText,
      createdAt: new Date().toISOString()
    };

    setReviews(prev => [newReview, ...prev]);
    setUserReview(newReview);
    setShowReviewForm(false);
    setRating(5);
    setReviewText('');
    setLoading(false);
    
    alert('✅ Review submitted successfully!');
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a report');
      return;
    }

    if (!reportType || !reportReason.trim()) {
      alert('Please fill in all report fields');
      return;
    }

    setLoading(true);
    
    // Mock report submission - in real app, this would save to Supabase
    console.log('Report submitted:', { contentId, reviewedUserId, reportType, reportReason });
    
    setShowReportForm(false);
    setReportType('');
    setReportReason('');
    setLoading(false);
    
    alert('🛡️ Report submitted successfully! Our team will review it within 24 hours.');
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => onRate(star) : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <svg
              className={`w-5 h-5 ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {stats.averageRating.toFixed(1)} ({stats.totalReviews} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Rating Summary */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews & Ratings</h3>
          {renderStars(stats.averageRating)}
        </div>
        
        <div className="flex space-x-3">
          {user && !userReview && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              ⭐ Write Review
            </button>
          )}
          
          <button
            onClick={() => setShowReportForm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
          >
            🚨 Report
          </button>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Rating Breakdown</h4>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center mb-1">
            <span className="text-sm text-gray-600 w-8">{star}★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${stats.totalReviews > 0 ? (stats.ratingBreakdown[`${star}_star`] / stats.totalReviews) * 100 : 0}%`
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-8">
              {stats.ratingBreakdown[`${star}_star`]}
            </span>
          </div>
        ))}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              {renderStars(rating, true, setRating)}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review (Optional)
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Share your thoughts about this content..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Report Form */}
      {showReportForm && (
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">🚨 Report Content/User</h4>
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type *
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                required
              >
                <option value="">Select a reason</option>
                <option value="harassment">Harassment or Bullying</option>
                <option value="inappropriate_content">Inappropriate Content</option>
                <option value="spam">Spam or Misleading</option>
                <option value="fake_profile">Fake Profile</option>
                <option value="copyright">Copyright Violation</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details *
              </label>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                placeholder="Please provide specific details about why you're reporting this..."
                required
              />
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> False reports may result in account restrictions. 
                Our team reviews all reports within 24 hours.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
              <button
                type="button"
                onClick={() => setShowReportForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h4>
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">⭐</div>
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">
                        {review.reviewer.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{review.reviewer.name}</span>
                        {review.reviewer.verified && (
                          <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {review.reviewText && (
                  <p className="text-gray-700 mt-2">{review.reviewText}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}