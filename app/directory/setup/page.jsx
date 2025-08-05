'use client';

import { useState, useEffect } from 'react';
import { authService } from '../../../lib/auth';

export default function GuestSetupPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    email: '',
    publicDisplayName: '',
    profilePicture: null,
    location: '',
    
    // Professional Bio
    headline: '',
    bio: '',
    speakingTopics: [],
    industries: [],
    
    // Availability & Preferences
    preferredLength: '',
    timeZone: '',
    availableDays: [],
    interviewFormat: [],
    languages: [],
    
    // Promotion & Socials
    website: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      instagram: '',
      youtube: '',
      tiktok: ''
    },
    promoMedia: [],
    bookingLink: '',
    
    // Guest Preferences
    controversialTopics: '',
    minAudience: '',
    compensationRequired: '',
    
    // Testimonials
    previousPodcasts: '',
    testimonials: ''
  });

  const totalSteps = 6;
  const completionPercentage = Math.round((currentStep / totalSteps) * 100);

  // Available options for dropdowns
  const speakingTopicsOptions = [
    'Military Leadership', 'Veteran Transition', 'Mental Health', 'Entrepreneurship',
    'Combat Experience', 'Team Building', 'Resilience', 'Public Speaking',
    'Book Writing', 'Fitness & Wellness', 'Technology', 'Education',
    'Women in Military', 'Military History', 'Career Development', 'Motivation'
  ];

  const industriesOptions = [
    'Military & Defense', 'Healthcare', 'Technology', 'Education', 'Finance',
    'Media & Entertainment', 'Nonprofit', 'Government', 'Consulting', 'Real Estate',
    'Manufacturing', 'Retail', 'Sports & Recreation', 'Travel & Hospitality'
  ];

  const timeZoneOptions = [
    'Eastern (ET)', 'Central (CT)', 'Mountain (MT)', 'Pacific (PT)',
    'Alaska (AKT)', 'Hawaii (HST)', 'GMT', 'Other'
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
        fullName: currentUser.user_metadata?.name || '',
        email: currentUser.email
      }));
    }
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would save to your database
    console.log('Guest profile data:', formData);
    alert('🎉 Guest profile created successfully!\n\nYour profile is now live in the Guest Directory. Podcasters can discover and contact you for interviews.');
    
    // Redirect to directory
    window.location.href = '/directory';
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.profilePicture;
      case 2:
        return formData.headline && formData.bio && formData.speakingTopics.length > 0;
      case 3:
        return formData.preferredLength && formData.interviewFormat.length > 0;
      case 4:
      case 5:
      case 6:
        return true; // Optional sections
      default:
        return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading setup...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to create a guest profile.</p>
          <a
            href="/directory"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Directory
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
            🎤 Create Your Guest Profile
          </h1>
          <p className="text-gray-600">
            Build a professional profile that helps podcasters discover and book you as a guest
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Profile Completion</span>
            <span className="text-sm font-medium text-blue-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
              style={{width: `${completionPercentage}%`}}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Basic Info</span>
            <span>Bio</span>
            <span>Availability</span>
            <span>Socials</span>
            <span>Preferences</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">📋 Basic Information</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email is private and not shown on your profile</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Public Display Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.publicDisplayName}
                    onChange={(e) => handleInputChange('publicDisplayName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Leave blank to use full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('profilePicture', e.target.files[0])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Professional headshot recommended for best results</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Bio */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">💼 Professional Bio</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Headline/Tagline * (140 characters max)
                  </label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => handleInputChange('headline', e.target.value)}
                    maxLength={140}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., Retired Navy SEAL & Leadership Coach"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.headline.length}/140 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Me / Bio *
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Tell podcasters about your background, experience, and what makes you a great guest..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speaking Topics / Expertise * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-3">
                    {speakingTopicsOptions.map((topic) => (
                      <label key={topic} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.speakingTopics.includes(topic)}
                          onChange={() => handleMultiSelect('speakingTopics', topic)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{topic}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Select at least one topic</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industries (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-3">
                    {industriesOptions.map((industry) => (
                      <label key={industry} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.industries.includes(industry)}
                          onChange={() => handleMultiSelect('industries', industry)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Availability & Preferences */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">⏰ Availability & Preferences</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Interview Length *
                    </label>
                    <select
                      value={formData.preferredLength}
                      onChange={(e) => handleInputChange('preferredLength', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      required
                    >
                      <option value="">Select length</option>
                      <option value="15-30 min">15-30 minutes</option>
                      <option value="30-60 min">30-60 minutes</option>
                      <option value="1+ hour">1+ hour</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone (Optional)
                    </label>
                    <select
                      value={formData.timeZone}
                      onChange={(e) => handleInputChange('timeZone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="">Select time zone</option>
                      {timeZoneOptions.map((tz) => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Format * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['In Person', 'Remote', 'Audio Only', 'Video + Audio'].map((format) => (
                      <label key={format} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.interviewFormat.includes(format)}
                          onChange={() => handleMultiSelect('interviewFormat', format)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{format}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken (Optional)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['English', 'Spanish', 'French', 'German', 'Italian', 'Other'].map((lang) => (
                      <label key={lang} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(lang)}
                          onChange={() => handleMultiSelect('languages', lang)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Promotion & Socials */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">🌐 Promotion & Social Links</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website/Portfolio (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Social Media Links (Optional)
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.socialLinks.linkedin}
                        onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Twitter/X</label>
                      <input
                        type="url"
                        value={formData.socialLinks.twitter}
                        onChange={(e) => handleInputChange('socialLinks.twitter', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="https://twitter.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Instagram</label>
                      <input
                        type="url"
                        value={formData.socialLinks.instagram}
                        onChange={(e) => handleInputChange('socialLinks.instagram', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="https://instagram.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">YouTube</label>
                      <input
                        type="url"
                        value={formData.socialLinks.youtube}
                        onChange={(e) => handleInputChange('socialLinks.youtube', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="https://youtube.com/c/yourchannel"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Public Booking Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.bookingLink}
                    onChange={(e) => handleInputChange('bookingLink', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="https://calendly.com/yourlink"
                  />
                  <p className="text-xs text-gray-500 mt-1">Calendly, Acuity, or other booking platform link</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Guest Preferences */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">⚙️ Guest Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Willing to Discuss Controversial Topics?
                  </label>
                  <div className="flex gap-4">
                    {['Yes', 'No', 'Depends on Topic'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="controversialTopics"
                          value={option}
                          checked={formData.controversialTopics === option}
                          onChange={(e) => handleInputChange('controversialTopics', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Show Size (Minimum Audience)
                  </label>
                  <select
                    value={formData.minAudience}
                    onChange={(e) => handleInputChange('minAudience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Any Size</option>
                    <option value="1K+">1,000+ listeners</option>
                    <option value="10K+">10,000+ listeners</option>
                    <option value="100K+">100,000+ listeners</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compensation Required?
                  </label>
                  <div className="flex gap-4">
                    {['No', 'Optional', 'Yes'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="compensationRequired"
                          value={option}
                          checked={formData.compensationRequired === option}
                          onChange={(e) => handleInputChange('compensationRequired', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Testimonials */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">⭐ Testimonials & Past Appearances</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Podcasts (Optional)
                  </label>
                  <textarea
                    value={formData.previousPodcasts}
                    onChange={(e) => handleInputChange('previousPodcasts', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="List previous podcast appearances, including show names and episode links if available..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guest Testimonials (Optional)
                  </label>
                  <textarea
                    value={formData.testimonials}
                    onChange={(e) => handleInputChange('testimonials', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Include any testimonials or reviews from podcast hosts you've worked with..."
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">🎉 Ready to Go Live!</h3>
                  <p className="text-green-800 mb-4">
                    Your guest profile is complete and ready to be published to the Guest Directory. 
                    Podcasters will be able to discover and contact you for interviews.
                  </p>
                  <div className="text-sm text-green-700">
                    <p><strong>What happens next:</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Your profile goes live immediately</li>
                      <li>Podcasters can search and find you</li>
                      <li>You'll receive email notifications for booking requests</li>
                      <li>You can edit your profile anytime from your account</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </span>
            </div>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                🚀 Publish Profile
              </button>
            )}
          </div>
        </div>

        {/* Preview Profile Button */}
        <div className="text-center mt-6">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            👀 Preview Profile
          </button>
        </div>
      </div>
    </div>
  );
}