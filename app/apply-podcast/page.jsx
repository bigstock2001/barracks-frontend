'use client';

import { useState } from 'react';

export default function ApplyPodcastPage() {
  const [formData, setFormData] = useState({
    applicantName: '',
    podcastTitle: '',
    genre: '',
    rssOption: '',
    rssUrl: '',
    applicantEmail: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const genres = [
    'military',
    'true-crime',
    'comedy',
    'news',
    'business',
    'health',
    'technology',
    'education',
    'entertainment',
    'sports',
    'other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Name is required';
    }
    
    if (!formData.podcastTitle.trim()) {
      newErrors.podcastTitle = 'Podcast title is required';
    }
    
    if (!formData.genre) {
      newErrors.genre = 'Please select a genre';
    }
    
    if (!formData.rssOption) {
      newErrors.rssOption = 'Please select an RSS option';
    }
    
    if (formData.rssOption === 'transfer' && !formData.rssUrl.trim()) {
      newErrors.rssUrl = 'RSS URL is required when transferring feed';
    }
    
    if (!formData.applicantEmail.trim()) {
      newErrors.applicantEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.applicantEmail)) {
      newErrors.applicantEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('❌ Please fix the errors above');
      return;
    }
    
    setLoading(true);
    setStatus('📝 Creating your podcast...');
    
    try {
      const response = await fetch('/api/create-podcast-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setStatus('🎉 Success! Your podcast has been created successfully!');
        // Reset form
        setFormData({
          applicantName: '',
          podcastTitle: '',
          genre: '',
          rssOption: '',
          rssUrl: '',
          applicantEmail: ''
        });
        
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          window.location.href = '/upload/success';
        }, 3000);
        
      } else {
        setStatus(`❌ Error: ${result.error || 'Failed to create podcast'}`);
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎙️ Apply for Podcast Hosting
          </h1>
          <p className="text-xl text-gray-600">
            Start your podcast journey with professional hosting and support
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Podcast Application Form
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) => handleInputChange('applicantName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.applicantName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your full name"
                disabled={loading}
              />
              {errors.applicantName && (
                <p className="text-red-500 text-sm mt-1">{errors.applicantName}</p>
              )}
            </div>

            {/* Podcast Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title of the Podcast *
              </label>
              <input
                type="text"
                value={formData.podcastTitle}
                onChange={(e) => handleInputChange('podcastTitle', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.podcastTitle ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Name of your podcast"
                disabled={loading}
              />
              {errors.podcastTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.podcastTitle}</p>
              )}
            </div>

            {/* Genre Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre *
              </label>
              <select
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.genre ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              >
                <option value="">Select a genre</option>
                <option value="military">Military & Veterans</option>
                <option value="true-crime">True Crime</option>
                <option value="comedy">Comedy</option>
                <option value="news">News & Politics</option>
                <option value="business">Business</option>
                <option value="health">Health & Fitness</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="other">Other</option>
              </select>
              {errors.genre && (
                <p className="text-red-500 text-sm mt-1">{errors.genre}</p>
              )}
            </div>

            {/* RSS Feed Option */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RSS Feed *
              </label>
              <select
                value={formData.rssOption}
                onChange={(e) => handleInputChange('rssOption', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.rssOption ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={loading}
              >
                <option value="">Choose an option</option>
                <option value="transfer">Will you be transferring your RSS feed</option>
                <option value="new">Want a new RSS feed</option>
              </select>
              {errors.rssOption && (
                <p className="text-red-500 text-sm mt-1">{errors.rssOption}</p>
              )}
            </div>

            {/* RSS URL Field (Conditional) */}
            {formData.rssOption === 'transfer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current RSS Feed URL *
                </label>
                <input
                  type="url"
                  value={formData.rssUrl}
                  onChange={(e) => handleInputChange('rssUrl', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                    errors.rssUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://your-current-rss-feed.com/feed.xml"
                  disabled={loading}
                />
                {errors.rssUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.rssUrl}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.applicantEmail}
                onChange={(e) => handleInputChange('applicantEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                  errors.applicantEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
                disabled={loading}
              />
              {errors.applicantEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.applicantEmail}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {loading ? '📝 Creating Podcast...' : '🚀 Submit Application'}
            </button>

            {/* Status Message */}
            {status && (
              <div className={`p-4 rounded-md ${
                status.includes('Success') || status.includes('🎉') 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : status.includes('Error') || status.includes('❌')
                  ? 'bg-red-50 border border-red-200 text-red-800'
                  : 'bg-blue-50 border border-blue-200 text-blue-800'
              }`}>
                <p className="font-medium">{status}</p>
              </div>
            )}
          </form>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📋 What Happens Next?
          </h3>
          <div className="text-blue-800 space-y-2">
            <p>1. <strong>Application Review:</strong> We'll review your application within 24 hours</p>
            <p>2. <strong>Podcast Setup:</strong> Your podcast will be automatically created in our system</p>
            <p>3. <strong>RSS Feed:</strong> We'll handle RSS feed setup or transfer based on your selection</p>
            <p>4. <strong>Welcome Email:</strong> You'll receive login credentials and next steps via email</p>
          </div>
        </div>
      </div>
    </div>
  );
}