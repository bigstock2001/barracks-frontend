'use client';

import { useState, useEffect } from 'react';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [viewStats, setViewStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroesDiscount, setHeroesDiscount] = useState(false);

  // Stripe price IDs (replace with your actual price IDs)
  const pricingPlans = {
    starter: {
      priceId: 'price_starter_monthly',
      name: 'Starter Creator',
      price: 9.99,
      features: ['Up to 1GB uploads', '10 videos/month', 'Basic analytics', 'Community support']
    },
    pro: {
      priceId: 'price_pro_monthly', 
      name: 'Pro Creator',
      price: 19.99,
      features: ['Up to 3GB uploads', '50 videos/month', 'Advanced analytics', 'Priority support', 'Custom thumbnails']
    },
    premium: {
      priceId: 'price_premium_monthly',
      name: 'Premium Creator', 
      price: 29.99,
      features: ['Unlimited uploads', 'Unlimited videos', 'Full analytics suite', 'Priority support', 'Custom branding', 'API access']
    }
  };

  // Mock user data - in real app, this would come from your auth system
  useEffect(() => {
    // Load Stripe.js
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    document.body.appendChild(script);

    // Simulate loading user data
    setTimeout(() => {
      setUser({
        name: 'John Creator',
        email: 'john@example.com',
        joinDate: '2024-01-15',
        tier: 'free' // Changed to free to show upgrade options
      });

      setSubscription({
        status: 'inactive',
        plan: 'Free Tier',
        price: 0,
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

    return () => {
      const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const handleSubscribe = async (planKey) => {
    try {
      const plan = pricingPlans[planKey];
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          customerEmail: user.email,
          heroesDiscount,
        }),
      });

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };

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
                    {subscription.status === 'active' ? '✅ Active' : '🆓 Free Tier'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold text-gray-900">{subscription.plan}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-gray-900">
                    {subscription.price === 0 ? 'Free' : `$${subscription.price}/month`}
                  </span>
                </div>
                
                {subscription.status === 'active' && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Next Billing</span>
                    <span className="text-gray-900">
                      {new Date(subscription.nextBilling).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {subscription.status === 'active' ? (
                <button
                  onClick={handleManageSubscription}
                  className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Manage Subscription
                </button>
              ) : (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-yellow-800 font-medium">Free Tier Limitations</p>
                  </div>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• 2GB max file size</li>
                    <li>• 1 video upload only</li>
                    <li>• No profit sharing</li>
                    <li>• Basic support</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Upgrade Plan Section - Only show for free tier users */}
            {user.tier === 'free' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Upgrade Your Plan</h2>
                <p className="text-gray-600 mb-6">
                  Unlock unlimited uploads, profit sharing, and premium features!
                </p>
                
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="heroesDiscountAccount"
                    checked={heroesDiscount}
                    onChange={(e) => setHeroesDiscount(e.target.checked)}
                    className="mr-3"
                  />
                  <label htmlFor="heroesDiscountAccount" className="text-sm text-gray-700">
                    I am a veteran, teacher, or first responder (30% discount)
                  </label>
                </div>

                <div className="grid gap-4">
                  {Object.entries(pricingPlans).map(([key, plan]) => (
                    <div key={key} className={`border-2 rounded-lg p-4 ${key === 'pro' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      {key === 'pro' && (
                        <div className="text-center mb-2">
                          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                          <div className="text-sm text-gray-600">
                            <span className="text-2xl font-bold text-gray-900">
                              ${heroesDiscount ? (plan.price * 0.7).toFixed(2) : plan.price}
                            </span>
                            /month
                            {heroesDiscount && (
                              <span className="ml-2 text-green-600 font-medium text-xs">
                                30% OFF!
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {plan.features.slice(0, 2).join(' • ')}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleSubscribe(key)}
                          className={`px-4 py-2 rounded-md font-medium transition-colors ${
                            key === 'pro'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          Upgrade
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <div>
                      <p className="text-green-800 font-medium">Start Earning with Profit Sharing!</p>
                      <p className="text-green-700 text-sm">Paid subscribers earn 30% of platform revenue based on performance.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

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