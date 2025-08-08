export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📝 Barracks Media Blog
          </h1>
          <p className="text-gray-600">
            Updates, insights, and creator stories from the Barracks Media team
          </p>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-6">📰</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Coming Soon!
          </h2>
          <p className="text-gray-600 mb-8">
            Stay tuned for podcasting tips, creator spotlights, and platform updates.
          </p>
          
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            🏠 Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}