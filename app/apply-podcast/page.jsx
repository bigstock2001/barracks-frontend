'use client';

import { useState, useEffect } from 'react';
import { authService } from '../../lib/auth';

export default function ApplyPodcastPage() {
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('');
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
  const [step, setStep] = useState(1); // 1: Plan Selection, 2: Form, 3: Payment

  // Pricing plans
  const plans = [
    {
      id: 'starter',
      name: 'Essentials',
      price: 39.99,
      priceId: 'price_starter_podcast', // Replace with actual Stripe price ID
      features: [
        'Unlimited Podcasts and Episodes',
        'Unlimited Downloads',
        'Up to 10 Transcript Credits per month',
        'In-Depth Listener Analytics',
        'Automatic distribution to all podcast directories',
        'Up to 100 Private Subscribers',
        'RSS feed & directory submission',
        'Free Guest Directory access'
      ]
    },
    {
      id: 'pro',
      name: 'Growth',
      price: 69.99,
      priceId: 'price_pro_podcast', // Replace with actual Stripe price ID
      features: [
        'Video Republishing to YouTube',
        'Advanced Analytics with Customizable Reports',
        'Headliner Audiogram Integration',
        'Up to 25 Transcript Credits per month',
        'Add up to 5 Team Members',
        'Mobile App for Private Subscribers',
        'Personalized Migration Assistance From Your Current Host',
        'Up to 250 Private Subscribers',
        'Free Guest Directory access'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Pro',
      price: 119.99,
      priceId: 'price_premium_podcast', // Replace with actual Stripe price ID
      features: [
        'Video File Hosting',
        'Up to 100 Transcript Credits per month',
        'Add up to 10 Team Members',
        'White-labeled Podcast Players',
        '1:1 Onboarding Call With Our Team',
        'Up to 500 Private Subscribers',
        '(Add 500 extra for $50/month)',
        'Free Guest Directory access'
      ]
    }
  ];

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { user: currentUser } = await authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData(prev => ({
        ...prev,
        applicantName: currentUser.user_metadata?.name || '',
        applicantEmail: currentUser.email
      }));
    }
  };

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('❌ Please fix the errors above');
      return;
    }
    
    setLoading(true);
    setStatus('💳 Processing payment...');
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plans.find(p => p.id === selectedPlan)?.priceId,
          customerEmail: formData.applicantEmail,
          podcastData: formData // Pass podcast data to be stored in session metadata
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Redirect to Stripe Checkout
        if (result.url) {
          window.location.href = result.url;
        } else {
          setStatus('🎉 Payment processed! Creating your podcast...');
          // For demo mode, create podcast directly
          await createPodcast();
        }
        
      } else {
        setStatus(`❌ Error: ${result.error || 'Payment failed'}`);
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      setStatus('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createPodcast = async () => {
    try {
      const response = await fetch('/api/create-podcast-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedPlan
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setStatus('🎉 Success! Your podcast has been created successfully!');
        setTimeout(() => {
          window.location.href = '/upload/success';
        }, 3000);
      } else {
        setStatus(`❌ Error: ${result.error || 'Failed to create podcast'}`);
      }
    } catch (error) {
      console.error('Podcast creation error:', error);
      setStatus('❌ Failed to create podcast. Please contact support.');
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

        {/* Step 1: Plan Selection */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Choose Your Podcast Hosting Plan
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  } ${plan.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">${plan.price}</div>
                    <div className="text-gray-500">per month</div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <div className={`w-4 h-4 rounded-full border-2 mx-auto ${
                      selectedPlan === plan.id
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPlan === plan.id && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedPlan}
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Continue with {selectedPlan ? plans.find(p => p.id === selectedPlan)?.name : 'Selected'} Plan
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Application Form */}
        {step === 2 && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Podcast Details
            </h2>
            <button
              onClick={() => setStep(1)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Change Plan
            </button>
          </div>
          
          {/* Selected Plan Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">
                  {plans.find(p => p.id === selectedPlan)?.name} Plan
                </h3>
                <p className="text-blue-700 text-sm">
                  ${plans.find(p => p.id === selectedPlan)?.price}/month
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
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
              {loading ? '💳 Processing Payment...' : '💳 Proceed to Payment'}
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
        )}

        {/* Information Section */}
        {step === 2 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📋 What Happens Next?
          </h3>
          <div className="text-blue-800 space-y-2">
            <p>1. <strong>Secure Payment:</strong> Complete payment via Stripe checkout</p>
            <p>2. <strong>Instant Setup:</strong> Your podcast is automatically created upon payment</p>
            <p>3. <strong>RSS Feed:</strong> We'll handle RSS feed setup or transfer immediately</p>
            <p>4. <strong>Welcome Email:</strong> You'll receive login credentials and next steps</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}