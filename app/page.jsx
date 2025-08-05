export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-8 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Join the <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Elite</span> Podcast Network
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Professional podcast hosting with done-for-you editing services. From DIY hosting to full-service production, 
              we've got the perfect plan for your podcast journey.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a
              href="/upload"
              className="group relative px-8 py-4 text-lg font-semibold text-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">🚀 Start Creating Now</span>
            </a>
            
            <a
              href="/directory"
              className="group relative px-8 py-4 text-lg font-semibold text-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-green-400"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-green-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">🎤 Guest Directory</span>
            </a>
            
            <a
              href="#profit-sharing"
              className="group relative px-8 py-4 text-lg font-semibold text-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-yellow-400"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">💰 Learn About Profit Sharing</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <div className="text-3xl font-bold text-yellow-400 mb-2">🎙️</div>
              <div className="text-gray-200">Guest Directory</div>
            </div>
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <div className="text-3xl font-bold text-blue-400 mb-2">7</div>
              <div className="text-gray-200">Hosting Plans</div>
            </div>
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-200">Podcast Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Sharing Section */}
      <section id="profit-sharing" className="px-8 py-20 bg-black bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              🎙️ How Our Podcast Plans Work
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From DIY hosting to full-service production, we offer comprehensive podcast solutions 
              for every stage of your podcasting journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Explanation */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-900 to-green-800 p-6 rounded-lg border border-green-600">
                <h3 className="text-2xl font-bold text-green-300 mb-4">🎧 Hosting Only Plans</h3>
                <p className="text-green-100 mb-4">
                  Perfect for DIY podcasters who handle their own recording and editing but need professional hosting.
                </p>
                <ul className="space-y-2 text-green-200">
                  <li>• RSS feed setup & management</li>
                  <li>• Directory submissions</li>
                  <li>• Basic to advanced analytics</li>
                  <li>• White-labeled options</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-600">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">🛠️ Done-For-You Editing</h3>
                <p className="text-blue-100">
                  Professional editing services included with hosting. From audio cleanup to full video production 
                  with social media content creation.
                </p>
              </div>
            </div>

            {/* Right Side - Tiers Comparison */}
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-xl font-bold text-gray-300 mb-4">🆓 Free Trial</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• 2GB upload limit</li>
                  <li>• 1 podcast upload</li>
                  <li>• Basic hosting</li>
                  <li>• ❌ No RSS feed</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 rounded-lg border border-purple-500">
                <h3 className="text-xl font-bold text-purple-300 mb-4">💎 Hosting Plans ($19.99 - $69.99)</h3>
                <ul className="space-y-2 text-purple-100">
                  <li>• 10GB - 100GB storage</li>
                  <li>• 1-5 active podcasts</li>
                  <li>• RSS feed & directory submission</li>
                  <li>• ✅ Analytics dashboard</li>
                  <li>• ✅ Priority support</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-red-900 to-orange-900 p-6 rounded-lg border border-red-500">
                <h3 className="text-xl font-bold text-red-300 mb-4">🎬 Full Service ($149 - $699)</h3>
                <ul className="space-y-2 text-red-100">
                  <li>• Professional editing included</li>
                  <li>• 4-8 episodes per month</li>
                  <li>• Audio + Video production</li>
                  <li>• ✅ Social media content</li>
                  <li>• ✅ YouTube optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              🚀 How to Start Your Podcast
            </h2>
            <p className="text-xl text-gray-300">
              Join podcasters who trust Barracks Media for their hosting and production needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Choose Your Plan</h3>
              <p className="text-gray-300">
                Select a hosting plan that fits your podcast goals and production needs.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Create Content</h3>
              <p className="text-gray-300">
                Record your podcast episodes or let our team handle the full production process.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-yellow-600 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Grow Your Audience</h3>
              <p className="text-gray-300">
                We handle distribution to all major platforms while you focus on creating great content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-8 py-20 bg-black bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              🌟 Creator Success Stories
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-lg border border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">John Doe</h4>
                  <p className="text-gray-400">Military Content Creator</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Barracks Media's profit sharing has allowed me to turn my passion into a sustainable income. 
                The platform truly supports creators who put in the work."
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-lg border border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">SM</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">Sarah Miller</h4>
                  <p className="text-gray-400">Veteran Storyteller</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "The performance-based revenue model motivates me to create better content. 
                My monthly earnings have grown consistently with my audience."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Podcasting?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join the podcast network today and start building your audience with professional hosting and production.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/upload"
              className="group relative px-10 py-5 text-xl font-bold text-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">🎙️ Start Your Podcast</span>
            </a>
            
            <a
              href="/content"
              className="group relative px-10 py-5 text-xl font-bold text-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-yellow-400"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">👀 Browse Content</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}