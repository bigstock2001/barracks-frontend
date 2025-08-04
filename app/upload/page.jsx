'use client';

import { useState, useEffect } from 'react';

export default function UploadPage() {
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [creatorTier, setCreatorTier] = useState('free');
  const [creatorName, setCreatorName] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [heroesDiscount, setHeroesDiscount] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

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

  const handleSubscribe = async (planKey) => {
    try {
      if (!creatorName.trim()) {
        alert('Please enter your creator name first');
        return;
      }

      const plan = pricingPlans[planKey];
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          customerEmail: `${creatorName.toLowerCase().replace(/\s+/g, '')}@example.com`, // In real app, use actual email
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

  useEffect(() => {
    // Load Stripe.js
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  async function getUploadUrl() {
    if (!videoTitle.trim()) {
      setStatus('❌ Please enter a video title');
      return;
    }

    if (!creatorName.trim()) {
      setStatus('❌ Please enter your creator name');
      return;
    }

    try {
      setStatus('Getting upload URL...');
      const res = await fetch('/api/mux-upload', { method: 'POST' });
      const data = await res.json();
      
      if (data.uploadUrl) {
        setUploadUrl(data.uploadUrl);
        setStatus('✅ Upload URL ready - Now select your video file');
      } else {
        setStatus('❌ Failed to get upload URL: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      setStatus('❌ Error getting upload URL: ' + error.message);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    
    if (!uploadUrl || !file) {
      setStatus('❌ Please get upload URL and select a file first');
      return;
    }

    if (!videoTitle.trim() || !creatorName.trim()) {
      setStatus('❌ Please fill in all required fields');
      return;
    }

    setUploading(true);
    setStatus('📤 Uploading video... This may take a few minutes');

    try {
      // Upload to Mux
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (uploadRes.ok) {
        setStatus('✅ Upload successful! Processing video and saving to WordPress...');
        
        // Here you could add logic to save video metadata to WordPress
        // For now, we'll just show success
        setTimeout(() => {
          setStatus('🎉 Video uploaded successfully! It will appear on the site once processing is complete.');
          
          // Reset form
          setFile(null);
          setUploadUrl('');
          setVideoTitle('');
          setVideoDescription('');
          setCreatorName('');
          
          // Reset file input
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
  }

  const tierLimits = {
    free: {
      maxFileSize: '2GB',
      maxVideos: '5 videos per month',
      features: ['Basic video hosting', 'Standard quality', 'Community support']
    },
    paid: {
      maxFileSize: '5GB',
      maxVideos: 'Unlimited',
      features: ['HD video hosting', 'Premium quality', 'Priority support', 'Analytics dashboard']
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎬 Content Creator Upload
          </h1>
          <p className="text-lg text-gray-600">
            Choose your creator tier and start uploading to Barracks Media
          </p>
        </div>

        {/* Creator Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Creator Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Creator Name *
              </label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="Your creator name"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="heroesDiscount"
                checked={heroesDiscount}
                onChange={(e) => setHeroesDiscount(e.target.checked)}
                className="mr-3"
              />
              <label htmlFor="heroesDiscount" className="text-sm text-gray-700">
                I am a veteran, teacher, or first responder (30% discount)
              </label>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Choose Your Creator Plan</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(pricingPlans).map(([key, plan]) => (
              <div key={key} className="border-2 border-gray-200 rounded-lg p-6 relative">
                {key === 'pro' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${heroesDiscount ? (plan.price * 0.7).toFixed(2) : plan.price}
                    </span>
                    <span className="text-gray-600">/month</span>
                    {heroesDiscount && (
                      <div className="text-sm text-green-600 font-medium">
                        30% Heroes Discount Applied!
                      </div>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-2 text-gray-600 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSubscribe(key)}
                  disabled={!creatorName.trim()}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    key === 'pro'
                      ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100'
                  } disabled:cursor-not-allowed`}
                >
                  {!creatorName.trim() ? 'Enter Name First' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
          
          {/* Free Tier Option */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Try Before You Buy</h3>
            <p className="text-gray-600 mb-4">
              Start with our free tier: 1 video upload, 2GB max file size
            </p>
            <button
              onClick={() => setCreatorTier('free')}
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Continue with Free Tier
            </button>
          </div>
        </div>

        {/* Upload Form - Only show if free tier selected or user has subscription */}
        {creatorTier === 'free' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Your Video (Free Tier)</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-yellow-800 font-medium">Free Tier Limitations</p>
                  <p className="text-yellow-700 text-sm">Max file size: 2GB • 1 video upload only</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Enter your video title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Description
                </label>
                <textarea
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Describe your video content..."
                />
              </div>

              {/* Upload Steps */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Step 1: Get Upload URL</span>
                  <button
                    type="button"
                    onClick={getUploadUrl}
                    disabled={!videoTitle.trim() || !creatorName.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Get Upload URL
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Step 2: Select Video File (Max 2GB)</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    disabled={!uploadUrl}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Step 3: Upload Video</span>
                  <button
                    type="submit"
                    disabled={!uploadUrl || !file || uploading}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {uploading ? 'Uploading...' : 'Upload Video'}
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
        )}

        {/* Guidelines */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 Upload Guidelines</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Supported formats: MP4, MOV, AVI, MKV</li>
            <li>• Recommended resolution: 1080p or higher</li>
            <li>• Ensure your content follows community guidelines</li>
            <li>• Processing time varies based on file size (typically 5-15 minutes)</li>
            <li>• Videos will appear on the platform once processing is complete</li>
            <li>• Subscribers get priority processing and support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}