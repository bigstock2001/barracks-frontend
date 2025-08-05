'use client';

import { useState, useEffect } from 'react';
import { authService } from '../../lib/auth';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isContentCreator, setIsContentCreator] = useState(false);
  
  // Content Creator Portal States
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [creatorStats, setCreatorStats] = useState({
    totalUploads: 0,
    totalViews: 0,
    monthlyEarnings: 0,
    storageUsed: 0,
    storageLimit: 0
  });

  useEffect(() => {
    loadUserData();
    
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadUserProfile(session.user);
      } else {
        setUser(null);
        setUserProfile(null);
        setIsContentCreator(false);
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const loadUserData = async () => {
    const { user: currentUser } = await authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      await loadUserProfile(currentUser);
    }
    setLoading(false);
  };

  const loadUserProfile = async (user) => {
    // Mock user profile data - in real app, this would come from Supabase
    const mockProfile = {
      id: user.id,
      name: user.user_metadata?.name || user.email.split('@')[0],
      email: user.email,
      tier: 'premium', // Mock tier - could be 'free', 'starter', 'pro', 'premium'
      subscription_status: 'active',
      is_content_creator: true, // Mock - this would be set when user subscribes to paid tier
      created_at: user.created_at,
      stripe_customer_id: 'cus_mock123'
    };
    
    setUserProfile(mockProfile);
    setIsContentCreator(mockProfile.is_content_creator && mockProfile.subscription_status === 'active');
    
    // Load creator stats if they're a content creator
    if (mockProfile.is_content_creator) {
      loadCreatorStats();
    }
  };

  const loadCreatorStats = () => {
    // Mock creator statistics
    setCreatorStats({
      totalUploads: 12,
      totalViews: 3450,
      monthlyEarnings: 127.50,
      storageUsed: 2.3, // GB
      storageLimit: 5.0 // GB
    });
  };

  // Content Creator Portal Functions
  const getUploadUrl = async () => {
    if (!videoTitle.trim()) {
      setStatus('❌ Please enter a content title');
      return;
    }

    try {
      setStatus('Getting upload URL...');
      const res = await fetch('/api/mux-upload', { method: 'POST' });
      const data = await res.json();
      
      if (data.uploadUrl) {
        setUploadUrl(data.uploadUrl);
        setStatus('✅ Upload URL ready - Now select your file');
      } else {
        setStatus('❌ Failed to get upload URL: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      setStatus('❌ Error getting upload URL: ' + error.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadUrl || !file) {
      setStatus('❌ Please get upload URL and select a file first');
      return;
    }

    if (!videoTitle.trim()) {
      setStatus('❌ Please fill in the content title');
      return;
    }

    setUploading(true);
    setStatus('📤 Uploading content... This may take a few minutes');

    try {
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (uploadRes.ok) {
        setStatus('✅ Upload successful! Processing content...');
        
        setTimeout(() => {
          setStatus('🎉 Content uploaded successfully! It will appear on the platform once processing is complete.');
          
          // Reset form
          setFile(null);
          setUploadUrl('');
          setVideoTitle('');
          setVideoDescription('');
          
          // Update stats
          setCreatorStats(prev => ({
            ...prev,
            totalUploads: prev.totalUploads + 1,
            storageUsed: prev.storageUsed + (file.size / (1024 * 1024 * 1024)) // Convert to GB
          }));
          
          const fileInput = document.querySelector('input[type="file"]');
          if (fileInput) fileInput.value = '';
        }, 2000);
        
      } else {
        setStatus('❌ Upload failed: ' + uploadRes.statusText);
      }
    } catch (error) {
      setStatus('❌ Upload error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleBecomeCreator = () => {
    alert('To become a content creator, please subscribe to one of our paid hosting plans!\n\nVisit the Services > Podcast Hosting page to choose your plan.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access your account.</p>
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
      <div className="max-w-6xl mx-auto">
        {/* Account Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {userProfile?.name || 'User'}!
              </h1>
              <p className="text-gray-600">
                Account Type: <span className="font-semibold capitalize">{userProfile?.tier || 'Free'}</span>
                {isContentCreator && <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Content Creator</span>}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Member since</p>
              <p className="font-semibold text-gray-900">
                {new Date(user.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Content Creator Portal */}
        {isContentCreator ? (
          <div className="space-y-8">
            {/* Creator Stats Dashboard */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">📊 Creator Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{creatorStats.totalUploads}</div>
                  <div className="text-sm text-blue-800">Total Uploads</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{creatorStats.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-green-800">Total Views</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">${creatorStats.monthlyEarnings}</div>
                  <div className="text-sm text-yellow-800">This Month</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{creatorStats.storageUsed}GB</div>
                  <div className="text-sm text-purple-800">of {creatorStats.storageLimit}GB Used</div>
                </div>
              </div>

              {/* Storage Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Storage Usage</span>
                  <span>{Math.round((creatorStats.storageUsed / creatorStats.storageLimit) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{width: `${(creatorStats.storageUsed / creatorStats.storageLimit) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>

            {/* Upload Content Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">🎬 Upload New Content</h2>
              
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content Title *
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Enter your content title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                      <option>Military & Veterans</option>
                      <option>Leadership</option>
                      <option>Training</option>
                      <option>History</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Description
                  </label>
                  <textarea
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Describe your content..."
                  />
                </div>

                {/* Upload Steps */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Step 1: Get Upload URL</span>
                    <button
                      type="button"
                      onClick={getUploadUrl}
                      disabled={!videoTitle.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Get Upload URL
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Step 2: Select File (Max {creatorStats.storageLimit}GB)</span>
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      disabled={!uploadUrl}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Step 3: Upload Content</span>
                    <button
                      type="submit"
                      disabled={!uploadUrl || !file || uploading}
                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {uploading ? 'Uploading...' : 'Upload Content'}
                    </button>
                  </div>
                </div>
              </form>

              {/* Status Display */}
              {status && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-semibold text-gray-900 mb-2">Upload Status:</h3>
                  <p className="text-gray-700">{status}</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">⚡ Quick Actions</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/content"
                  className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">👀</div>
                  <div className="font-semibold text-blue-900">View My Content</div>
                  <div className="text-sm text-blue-700">See all your uploads</div>
                </a>
                
                <a
                  href="/upload/manage"
                  className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="font-semibold text-green-900">Manage Subscription</div>
                  <div className="text-sm text-green-700">Update billing & plan</div>
                </a>
                
                <a
                  href="/directory"
                  className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">🎤</div>
                  <div className="font-semibold text-purple-900">Guest Directory</div>
                  <div className="text-sm text-purple-700">Find podcast guests</div>
                </a>
                
                <a
                  href="/messages"
                  className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">💬</div>
                  <div className="font-semibold text-yellow-900">Messages</div>
                  <div className="text-sm text-yellow-700">Manage connections</div>
                </a>
                
                <a
                  href="/reviews"
                  className="bg-orange-50 hover:bg-orange-100 p-4 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="font-semibold text-orange-900">My Reviews</div>
                  <div className="text-sm text-orange-700">View ratings & feedback</div>
                </a>
                
                <a
                  href="/reports"
                  className="bg-red-50 hover:bg-red-100 p-4 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">🛡️</div>
                  <div className="font-semibold text-red-900">Safety Center</div>
                  <div className="text-sm text-red-700">Reports & safety tools</div>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Non-Creator Account View */
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-6">🎬</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Become a Content Creator
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Unlock the Content Creator Portal by subscribing to one of our paid hosting plans. 
              Get access to professional upload tools, analytics, and start earning from your content!
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleBecomeCreator}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                🚀 View Hosting Plans
              </button>
              
              <div className="text-sm text-gray-500">
                Plans start at just $19.99/month with unlimited uploads
              </div>
            </div>
          </div>
        )}

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">⚙️ Account Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <div className="font-medium text-gray-900">Email Address</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Change
              </button>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <div className="font-medium text-gray-900">Subscription Plan</div>
                <div className="text-sm text-gray-600">
                  {userProfile?.tier ? `${userProfile.tier.charAt(0).toUpperCase() + userProfile.tier.slice(1)} Plan` : 'Free Plan'}
                </div>
              </div>
              <a
                href="/upload/manage"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Manage
              </a>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-gray-900">Account Security</div>
                <div className="text-sm text-gray-600">Password and security settings</div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}