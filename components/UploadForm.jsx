import { useState } from 'react';

export default function UploadForm() {
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  async function getUploadUrl() {
    const res = await fetch('/api/mux-upload', { method: 'POST' });
    const data = await res.json();
    if (data.uploadUrl) {
      setUploadUrl(data.uploadUrl);
    } else {
      setStatus('Failed to get upload URL');
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!uploadUrl || !file) return;

    setStatus('Uploading...');

    const res = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (res.ok) {
      setStatus('✅ Upload successful! Processing video...');
    } else {
      setStatus('❌ Upload failed');
    }
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload a Video</h2>

      <button
        onClick={getUploadUrl}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Get Upload URL
      </button>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />
        <button
          type="submit"
          disabled={!uploadUrl || !file}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
