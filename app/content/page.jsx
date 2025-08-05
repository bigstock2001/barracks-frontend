export default function ContentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎬 Content Library
          </h1>
          <p className="text-xl text-gray-600">
            Discover podcasts, audiobooks, and exclusive military content
          </p>
        </div>

        {/* Temporary message while debugging */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-blue-600 text-6xl mb-4">🔧</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Loading...</h3>
          <p className="text-gray-600">We're working on loading the content. Please check back in a moment.</p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Want to Upload Your Content?</h2>
          <p className="text-blue-100 mb-6">
            Join our creator program and start sharing your podcasts and audiobooks with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/upload"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              🎙️ View Hosting Plans
            </a>
            <a
              href="/account"
              className="bg-blue-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              📊 Creator Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}