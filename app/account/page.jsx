'use client';

import { useState, useEffect } from 'react';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [viewStats, setViewStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user data - in real app, this would come from your auth system
  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setUser({
        name: 'John Creator',
        email: 'john@example.com',
        joinDate: '2024-01-15',
        tier: 'premium'
      });

      setSubscription({
        status: 'active',
        plan: 'Premium Creator',
        price: 29.99,
        nextBilling: '2024-02-15',
        customerId: 'cus_example123'
      });

      setViewStats({
        totalViews: 15420,
        monthlyViews: 3240,
        weeklyViews: 890,
        dailyViews: 127,
        uniqueViewers: 8930,
        topVideo: {
          title: 'Military Training Basics',
          views: 4520
        },
        recentViews: [
          { date: '2024-01-20', views: 127 },
          { date: '2024-01-19', views: 156 },
          { date: '2024-01-18', views: 143 },
          { date: '2024-01-17', views: 189 },
          { date: '2024-01-16', views: 201 },
          { date: '2024-01-15', views: 178 },
          { date: '2024-01-14', views: 165 }
        ]
      });

      setLoading(false);
    }, 1000);
  }, []);

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: subscription.customerId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to open billing portal. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading account information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Error loading account</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Member since</div>
              <div className="font-semibold text-gray-900">
                {new Date(user.joinDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Account Info & Subscription */}
          <div className="lg:col-span-1 space-y-6">
            {/* Account Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Creator Tier</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                    {user.tier}
                  </span>
                </div>
              </div>
            </div>

            {/* Subscription Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription Status</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    subscription.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {subscription.status === 'active' ? '✅ Active' : '❌ Inactive'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold text-gray-900">{subscription.plan}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-gray-900">${subscription.price}/month</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Billing</span>
                  <span className="text-gray-900">
                    {new Date(subscription.nextBilling).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleManageSubscription}
                className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Manage Subscription
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/upload"
                  className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  🎬 Upload New Video
                </a>
                <a
                  href="/content"
                  className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                >
                  👀 Browse Content
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Analytics & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* View Statistics Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">📊 View Statistics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{viewStats.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-blue-800">Total Views</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{viewStats.monthlyViews.toLocaleString()}</div>
                  <div className="text-sm text-green-800">This Month</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{viewStats.weeklyViews.toLocaleString()}</div>
                  <div className="text-sm text-purple-800">This Week</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{viewStats.dailyViews}</div>
                  <div className="text-sm text-orange-800">Today</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">👥 Unique Viewers</h3>
                  <div className="text-2xl font-bold text-gray-700">{viewStats.uniqueViewers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">IP-based tracking</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">🏆 Top Performing Video</h3>
                  <div className="font-medium text-gray-900">{viewStats.topVideo.title}</div>
                  <div className="text-lg font-bold text-gray-700">{viewStats.topVideo.views.toLocaleString()} views</div>
                </div>
              </div>
            </div>

            {/* Recent Views Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">📈 Recent Views (Last 7 Days)</h2>
              
              <div className="space-y-3">
                {viewStats.recentViews.map((day, index) => {
                  const maxViews = Math.max(...viewStats.recentViews.map(d => d.views));
                  const percentage = (day.views / maxViews) * 100;
                  
                  return (
                    <div key={index} className="flex items-center">
                      <div className="w-20 text-sm text-gray-600">
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-4 relative">
                          <div 
                            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-16 text-right text-sm font-medium text-gray-900">
                        {day.views}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Earnings Overview (for paid tiers) */}
            {user.tier !== 'free' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">💰 Earnings Overview</h2>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">$127.45</div>
                    <div className="text-sm text-green-800">This Month</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">$892.30</div>
                    <div className="text-sm text-blue-800">Total Earned</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">$45.20</div>
                    <div className="text-sm text-purple-800">Pending</div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-yellow-800 font-medium">Profit Sharing Info</p>
                      <p className="text-yellow-700 text-sm">Earnings are calculated based on your content performance and distributed monthly.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}