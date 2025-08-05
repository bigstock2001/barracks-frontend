export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎙️ Podcast Hosting Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional podcast hosting with done-for-you editing services. Choose the perfect plan for your podcast journey.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Free Trial */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Trial</h3>
              <div className="text-4xl font-bold text-gray-600 mb-2">$0</div>
              <div className="text-gray-500">Try before you buy</div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                2GB upload limit
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1 podcast upload
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Basic hosting
              </li>
              <li className="flex items-center text-red-600">
                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                No RSS feed
              </li>
            </ul>
            
            <button className="w-full bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors font-semibold">
              Start Free Trial
            </button>
          </div>

          {/* Starter Plan */}
          <div className="bg-white rounded-lg shadow-md p-8 border-2 border-blue-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">$19.99</div>
              <div className="text-gray-500">per month</div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                10GB storage
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1 active podcast
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                RSS feed & directory submission
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Basic analytics
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Guest Directory access
              </li>
            </ul>
            
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold">
              Choose Starter
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-purple-600 mb-2">$39.99</div>
              <div className="text-gray-500">per month</div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                50GB storage
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                3 active podcasts
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Advanced analytics
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                White-label options
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
            </ul>
            
            <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors font-semibold">
              Choose Pro
            </button>
          </div>
        </div>

        {/* Done-For-You Editing Plans */}
        <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-lg p-8 mb-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">🎬 Done-For-You Editing Plans</h2>
            <p className="text-red-100 text-lg">
              Professional editing services included with hosting. From audio cleanup to full video production.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Audio Editing */}
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Audio Pro</h3>
              <div className="text-3xl font-bold mb-2">$149/month</div>
              <div className="text-red-100 mb-4">4 episodes per month</div>
              
              <ul className="space-y-2 mb-6">
                <li>• Professional audio editing</li>
                <li>• Intro/outro music</li>
                <li>• Show notes creation</li>
                <li>• RSS feed management</li>
                <li>• Directory submissions</li>
              </ul>
              
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors font-semibold">
                Choose Audio Pro
              </button>
            </div>

            {/* Full Service */}
            <div className="bg-white bg-opacity-10 rounded-lg p-6 border-2 border-yellow-400">
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold">Full Service</h3>
                <span className="ml-3 bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">
                  PREMIUM
                </span>
              </div>
              <div className="text-3xl font-bold mb-2">$699/month</div>
              <div className="text-red-100 mb-4">8 episodes per month</div>
              
              <ul className="space-y-2 mb-6">
                <li>• Full video + audio production</li>
                <li>• Social media content creation</li>
                <li>• YouTube optimization</li>
                <li>• Thumbnail design</li>
                <li>• Complete show management</li>
              </ul>
              
              <button className="w-full bg-yellow-500 text-black py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors font-semibold">
                Choose Full Service
              </button>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Barracks Media Hosting?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600">
                Military-grade reliability and professional-quality hosting infrastructure.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">
                Detailed insights into your audience, downloads, and engagement metrics.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Guest Directory Access</h3>
              <p className="text-gray-600">
                Free access to our exclusive military and veteran guest directory.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Ready to Start Your Podcast?
            </h2>
            <p className="text-blue-800 mb-6">
              Join hundreds of podcasters who trust Barracks Media for their hosting needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold">
                Start Free Trial
              </button>
              <a
                href="/directory"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors font-semibold"
              >
                Browse Guest Directory
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}