export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎙️ Podcast Guest Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect high-quality guests with podcasters. Build your network, grow your show, and share your expertise.
          </p>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Guest Directory Coming Soon!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're building an amazing directory to connect podcasters with military and veteran guests.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Coming:</h3>
            <ul className="text-left text-blue-800 space-y-2 max-w-md mx-auto">
              <li>• Verified military and veteran guest profiles</li>
              <li>• Advanced search and filtering</li>
              <li>• Direct booking system</li>
              <li>• Guest ratings and reviews</li>
              <li>• Secure messaging platform</li>
            </ul>
          </div>
          
          <a
            href="/upload"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            🎙️ Start Your Podcast Instead
          </a>
        </div>
      </div>
    </div>
  );
}