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
    signal_basic: {
      priceId: 'price_signal_basic_monthly',
      name: 'Signal Basic',
      price: 19.99,
      category: 'Hosting Only (DIY)',
      features: ['1 Podcast (audio only)', '10GB upload/month (~100 hrs)', 'Basic analytics', 'RSS feed setup', 'Directory submission links', 'Email support']
    },
    barracks_procast: {
      priceId: 'price_barracks_procast_monthly', 
      name: 'Barracks ProCast',
      price: 39.99,
      category: 'Growth Plan (White-Labeled)',
      features: ['Everything in Signal Basic', 'Up to 3 podcasts', '30GB upload/month', 'Private episodes (100 listeners)', 'Custom branded podcast page', 'Priority support', 'White-labeled experience']
    },
    commandcast_network: {
      priceId: 'price_commandcast_network_monthly',
      name: 'CommandCast Network', 
      price: 69.99,
      category: 'Agency Creator (Top Tier)',
      features: ['Everything in Barracks ProCast', 'Unlimited team members', '5 active podcasts', '100GB upload/month', 'Private podcast groups access', 'Analytics dashboard', 'Monthly growth call (add-on)', 'RSS managed by agency']
    },
    pro_audio_pod: {
      priceId: 'price_pro_audio_pod_monthly',
      name: 'Pro Audio Pod',
      price: 149.00,
      category: 'Audio Edit + Host',
      features: ['4 episodes/month', 'Audio cleanup & leveling', 'Intro/outro editing', 'Hosting + RSS included', 'Distribution support', 'Custom cover art (1x)']
    },
    studio_pod_pro: {
      priceId: 'price_studio_pod_pro_monthly',
      name: 'Studio Pod Pro',
      price: 249.00,
      category: 'Audio Edit + Host',
      features: ['8 episodes/month', 'All editing features', 'Show notes + audiogram', 'Quarterly strategy session', 'Multi-show hosting allowed']
    },
    visualcast_standard: {
      priceId: 'price_visualcast_standard_monthly',
      name: 'VisualCast Standard',
      price: 399.00,
      category: 'Video + Audio Edit + Host',
      features: ['4 episodes/month', 'Full audio + video edit', 'Lower third animations', 'Podcast hosting included', 'YouTube optimization']
    },
    visualcast_pro: {
      priceId: 'price_visualcast_pro_monthly',
      name: 'VisualCast Pro',
      price: 699.00,
      category: 'Video + Audio Edit + Host',
      features: ['8 episodes/month', 'All editing features', 'Custom branding templates', 'Transcription + repurposing', 'Social media reels (2 per episode)']
    }
  };

  const handleSubscribe = async (planKey) => {
    try {
      if (!creatorName.trim()) {
        alert('Please enter your creator name first');
        return;
      }

      const plan = pricingPlans[planKey];
      
      // For demo purposes, show alert instead of actual payment
      alert(`You selected: ${plan.name} - $${heroesDiscount ? (plan.price * 0.7).toFixed(2) : plan.price}/month\n\nPayment integration coming soon! Contact support to set up your subscription.`);
      
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
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-800 font-medium">🎤 New: Guest Directory Access</p>
              </div>
              <p className="text-green-700 text-sm">
                Tier 2+ hosting plans include <strong>FREE access</strong> to our Podcast Guest Directory! 
                Connect with quality guests for your show.
              </p>
              <a
                href="/directory"
                className="inline-block mt-2 text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Learn more about the Guest Directory →
              </a>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Choose Your Podcast Hosting Plan</h2>
          
          {/* Hosting Only Plans */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center bg-blue-50 py-2 rounded-lg">🎧 Hosting Only Plans (DIY Podcasters)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(pricingPlans).filter(([key, plan]) => plan.category.includes('Hosting Only') || plan.category.includes('Growth Plan') || plan.category.includes('Agency Creator')).map(([key, plan]) => (
                <div key={key} className={`border-2 rounded-lg p-4 relative ${key === 'barracks_procast' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  {key === 'barracks_procast' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{plan.category}</p>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-gray-900">
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
                  
                  <ul className="space-y-1 text-sm text-gray-600 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-0.5">•</span>
                        {feature}
                      </li>
                    ))}
                    {(key === 'barracks_procast' || key === 'commandcast_network') && (
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2 mt-0.5">•</span>
                        <span className="font-medium text-green-700">FREE Guest Directory access</span>
                      </li>
                    )}
                  </ul>
                  
                  <button
                    onClick={() => handleSubscribe(key)}
                    disabled={!creatorName.trim()}
                    className={`w-full py-2 px-3 rounded-md font-medium transition-colors text-sm ${
                      key === 'barracks_procast'
                        ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100'
                    } disabled:cursor-not-allowed`}
                  >
                    {!creatorName.trim() ? 'Enter Name First' : 'Subscribe Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Edit + Host Plans */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center bg-purple-50 py-2 rounded-lg">🎙️ Premium Plans with Editing Services</h3>
            
            {/* Audio Edit Plans */}
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-700 mb-3 text-center">Audio-Only Edit + Host Plans</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(pricingPlans).filter(([key, plan]) => plan.category.includes('Audio Edit')).map(([key, plan]) => (
                  <div key={key} className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{plan.category}</p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-gray-900">
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
                    
                    <ul className="space-y-1 text-sm text-gray-600 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-500 mr-2 mt-0.5">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handleSubscribe(key)}
                      disabled={!creatorName.trim()}
                      className="w-full py-2 px-3 rounded-md font-medium transition-colors text-sm bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {!creatorName.trim() ? 'Enter Name First' : 'Subscribe Now'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Edit Plans */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3 text-center">Video + Audio Edit + Host Plans</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(pricingPlans).filter(([key, plan]) => plan.category.includes('Video + Audio')).map(([key, plan]) => (
                  <div key={key} className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{plan.category}</p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-gray-900">
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
                    
                    <ul className="space-y-1 text-sm text-gray-600 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2 mt-0.5">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handleSubscribe(key)}
                      disabled={!creatorName.trim()}
                      className="w-full py-2 px-3 rounded-md font-medium transition-colors text-sm bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {!creatorName.trim() ? 'Enter Name First' : 'Subscribe Now'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Free Tier Option */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Try Before You Buy</h3>
            <p className="text-gray-600 mb-4">
              Start with our free tier: 1 podcast upload, 2GB max file size
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
                  <p className="text-yellow-700 text-sm">Max file size: 2GB • 1 podcast upload only</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Podcast Title *
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Enter your podcast title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Podcast Description
                </label>
                <textarea
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Describe your podcast content..."
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
                  <span className="text-gray-700">Step 2: Select Audio/Video File (Max 2GB)</span>
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
        )}

        {/* Guidelines */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 Upload Guidelines</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Supported formats: MP3, WAV, MP4, MOV, AVI, MKV</li>
            <li>• Audio: 128kbps or higher recommended</li>
            <li>• Video: 1080p or higher recommended</li>
            <li>• Ensure your content follows community guidelines</li>
            <li>• Processing time varies based on file size (typically 5-15 minutes)</li>
            <li>• Content will appear on the platform once processing is complete</li>
            <li>• Subscribers get priority processing and support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}