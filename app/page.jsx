export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-8 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Join the <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Elite</span> Creator Program
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Turn your content into consistent revenue. Join Barracks Media's exclusive creator program 
              and earn from every view, download, and subscriber.
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
              <div className="text-3xl font-bold text-yellow-400 mb-2">30%</div>
              <div className="text-gray-200">Revenue Share</div>
            </div>
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-gray-200">Upload Limit (Paid)</div>
            </div>
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-200">Creator Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Sharing Section */}
      <section id="profit-sharing" className="px-8 py-20 bg-black bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              💰 How Profit Sharing Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We believe creators should be rewarded for their success. Our transparent profit-sharing model 
              ensures you earn more as your content performs better.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Explanation */}
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-900 to-green-800 p-6 rounded-lg border border-green-600">
                <h3 className="text-2xl font-bold text-green-300 mb-4">📊 Revenue Distribution</h3>
                <p className="text-green-100 mb-4">
                  30% of all hosting revenue and subscriber fees are distributed among paid creators based on performance metrics.
                </p>
                <ul className="space-y-2 text-green-200">
                  <li>• Downloads & Views</li>
                  <li>• Subscriber Engagement</li>
                  <li>• Content Quality Ratings</li>
                  <li>• Community Interaction</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-600">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">🎯 Performance-Based</h3>
                <p className="text-blue-100">
                  The more your content is downloaded, viewed, and engaged with, the larger your share 
                  of the profit pool becomes. Top performers can earn significant monthly income.
                </p>
              </div>
            </div>

            {/* Right Side - Tiers Comparison */}
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-xl font-bold text-gray-300 mb-4">🆓 Free Tier</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• 100MB upload limit</li>
                  <li>• 1 video per month</li>
                  <li>• Basic hosting</li>
                  <li>• ❌ No profit sharing</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 rounded-lg border border-purple-500">
                <h3 className="text-xl font-bold text-purple-300 mb-4">💎 Paid Tiers ($9.99 - $29.99)</h3>
                <ul className="space-y-2 text-purple-100">
                  <li>• Up to 5GB uploads</li>
                  <li>• Unlimited videos</li>
                  <li>• Premium features</li>
                  <li>• ✅ 30% profit sharing</li>
                  <li>• ✅ Analytics dashboard</li>
                  <li>• ✅ Priority support</li>
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
              🚀 How to Get Started
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of creators already earning with Barracks Media
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Choose Your Tier</h3>
              <p className="text-gray-300">
                Select a paid creator tier that fits your content goals and upload requirements.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Upload Content</h3>
              <p className="text-gray-300">
                Create and upload high-quality videos that engage your audience and drive downloads.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-r from-yellow-600 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Earn Revenue</h3>
              <p className="text-gray-300">
                Watch your earnings grow as your content gains traction and generates more engagement.
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
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join the creator program today and start building your revenue stream with Barracks Media.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/upload"
              className="group relative px-10 py-5 text-xl font-bold text-white rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">🎬 Become a Creator</span>
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