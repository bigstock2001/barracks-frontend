'use client';

import { useState } from 'react';

export default function ManageSubscriptionPage() {
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      // In a real app, you'd get the customer ID from your user session/database
      const customerId = 'cus_example'; // Replace with actual customer ID
      
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to open billing portal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Manage Your Subscription
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Current Plan</h2>
              <p className="text-blue-800">Premium Creator - $29.99/month</p>
              <p className="text-sm text-blue-600 mt-2">Next billing date: January 15, 2024</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What you can manage:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Update payment method</li>
                <li>• Change billing address</li>
                <li>• Download invoices</li>
                <li>• Cancel subscription</li>
                <li>• Update plan</li>
              </ul>
            </div>
            
            <button
              onClick={handleManageSubscription}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Opening...' : 'Open Billing Portal'}
            </button>
            
            <div className="text-center">
              <a
                href="/upload"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Upload
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}