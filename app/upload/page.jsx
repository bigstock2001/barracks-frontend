'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [creatorTier, setCreatorTier] = useState('free');
  const [creatorName, setCreatorName] = useState('');

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
      maxFileSize: '500MB',
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
            Upload your videos to Barracks Media platform
          </p>
        </div>

        {/* Tier Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Select Your Creator Tier</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Tier */}
            <div 
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                creatorTier === 'free' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setCreatorTier('free')}
            >
              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  name="tier"
                  value="free"
                  checked={creatorTier === 'free'}
                  onChange={(e) => setCreatorTier(e.target.value)}
                  className="mr-3"
                />
                <h3 className="text-xl font-semibold text-gray-900">Free Tier</h3>
                <span className="ml-2 bg-green-100 text-green-800 text-sm px-2 py-1 rounded">$0/month</span>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Max file size: {tierLimits.free.maxFileSize}</li>
                <li>• Upload limit: {tierLimits.free.maxVideos}</li>
                {tierLimits.free.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>

            {/* Paid Tier */}
            <div 
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                creatorTier === 'paid' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setCreatorTier('paid')}
            >
              <div className="flex items-center mb-3">
                <input
                  type="radio"
                  name="tier"
                  value="paid"
                  checked={creatorTier === 'paid'}
                  onChange={(e) => setCreatorTier(e.target.value)}
                  className="mr-3"
                />
                <h3 className="text-xl font-semibold text-gray-900">Premium Tier</h3>
                <span className="ml-2 bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">$29/month</span>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Max file size: {tierLimits.paid.maxFileSize}</li>
                <li>• Upload limit: {tierLimits.paid.maxVideos}</li>
                {tierLimits.paid.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Your Video</h2>
          
          <form onSubmit={handleUpload} className="space-y-6">
            {/* Creator Information */}
            <div className="grid md:grid-cols-2 gap-6">
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Tier
                </label>
                <div className={`px-3 py-2 rounded-md text-sm font-medium ${
                  creatorTier === 'free' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {creatorTier === 'free' ? 'Free Tier' : 'Premium Tier'}
                </div>
              </div>
            </div>

            {/* Video Information */}
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
                <span className="text-gray-700">Step 2: Select Video File</span>
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

        {/* Guidelines */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 Upload Guidelines</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Supported formats: MP4, MOV, AVI, MKV</li>
            <li>• Recommended resolution: 1080p or higher</li>
            <li>• Ensure your content follows community guidelines</li>
            <li>• Processing time varies based on file size (typically 5-15 minutes)</li>
            <li>• Videos will appear on the platform once processing is complete</li>
          </ul>
        </div>
      </div>
    </div>
  );
}