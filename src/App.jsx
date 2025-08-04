import React from 'react'

function App() {
  console.log('App component rendering...');
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        🎖 Barracks Media - Creator Platform
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">
            Join the Elite Creator Program
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Turn your content into consistent revenue with our 30% profit sharing model.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-red-400 mb-3">🆓 Free Tier</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• 100MB upload limit</li>
                <li>• 1 video per month</li>
                <li>• Basic hosting</li>
                <li>• ❌ No profit sharing</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-blue-800 to-purple-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-300 mb-3">💎 Paid Tiers ($9.99 - $29.99)</h3>
              <ul className="text-blue-100 space-y-2">
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
        
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors">
            🚀 Start Creating Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default App