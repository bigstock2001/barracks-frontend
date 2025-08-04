'use client';

import { useState } from 'react';

export default function TestApiPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testWordPressAPI = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      // Test 1: Check if WordPress site is accessible
      console.log('Testing WordPress site accessibility...');
      const siteResponse = await fetch('https://backend.barracksmedia.com/wp-json/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Site response status:', siteResponse.status);
      
      if (!siteResponse.ok) {
        setResult(`WordPress site not accessible: ${siteResponse.status} ${siteResponse.statusText}`);
        setLoading(false);
        return;
      }
      
      const siteData = await siteResponse.json();
      console.log('WordPress site data:', siteData);
      
      // Test 2: Check available post types
      console.log('Testing available post types...');
      const typesResponse = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/types', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (typesResponse.ok) {
        const typesData = await typesResponse.json();
        console.log('Available post types:', Object.keys(typesData));
        
        if (!typesData.video) {
          setResult(`WordPress site accessible, but 'video' post type not found. Available types: ${Object.keys(typesData).join(', ')}`);
          setLoading(false);
          return;
        }
      }
      
      // Test 3: Try to fetch videos
      console.log('Testing video endpoint...');
      const videoResponse = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=5', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Video response status:', videoResponse.status);
      const videoText = await videoResponse.text();
      console.log('Video response text:', videoText);
      
      if (!videoResponse.ok) {
        setResult(`Video endpoint error: ${videoResponse.status} ${videoResponse.statusText}\nResponse: ${videoText}`);
        setLoading(false);
        return;
      }
      
      const videoData = JSON.parse(videoText);
      setResult(`Success! Found ${videoData.length} videos.\n\nFirst video: ${JSON.stringify(videoData[0], null, 2)}`);
      
    } catch (error) {
      console.error('Test error:', error);
      setResult(`Error: ${error.message}\n\nStack: ${error.stack}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">WordPress API Test</h1>
      
      <button
        onClick={testWordPressAPI}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test WordPress API'}
      </button>
      
      {result && (
        <div className="bg-gray-100 p-4 rounded border">
          <h2 className="font-bold mb-2 text-black">Test Result:</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{result}</pre>
        </div>
      )}
    </div>
  );
}