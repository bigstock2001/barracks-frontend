import { useState } from 'react';

export default function UploadForm() {
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  async function getUploadUrl() {
    try {
      const res = await fetch('/api/mux-upload', { method: 'POST' });
      const data = await res.json();
      if (data.uploadUrl) {
        setUploadUrl(data.uploadUrl);
        setStatus('Upload URL ready');
      } else {
        setStatus('Failed to get upload URL: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      setStatus('Error getting upload URL: ' + error.message);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!uploadUrl || !file) return;

    setStatus('Uploading...');

    try {
      const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (res.ok) {
        setStatus('✅ Upload successful! Processing video...');
        setFile(null);
        setUploadUrl('');
      } else {
        setStatus('❌ Upload failed: ' + res.statusText);
      }
    } catch (error) {
      setStatus('❌ Upload error: ' + error.message);
    }
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-black">Upload a Video</h2>

      <button
        onClick={getUploadUrl}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition-colors"
      >
        Get Upload URL
      </button>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button
          type="submit"
          disabled={!uploadUrl || !file}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
        >
          Upload Video
        </button>
      </form>

      {status && (
        <div className="mt-4 p-3 bg-gray-50 rounded border">
          <p className="text-sm text-gray-700">{status}</p>
        </div>
      )}
    </div>
  );
}