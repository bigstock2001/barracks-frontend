export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💬 Messages & Connections
          </h1>
          <p className="text-gray-600">
            Manage your podcast guest and host connections
          </p>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-6">📬</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Messaging System Coming Soon!
          </h2>
          <p className="text-gray-600 mb-8">
            Connect with podcasters and guests through our secure messaging platform.
          </p>
          
          <a
            href="/directory"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            🎤 Browse Guest Directory
          </a>
        </div>
      </div>
    </div>
  );
}