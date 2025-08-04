'use client';

import { useEffect, useState } from 'react';
import UploadForm from '@/components/UploadForm';
import VideoPlayer from '@/components/VideoPlayer';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos');
        const data = await res.json();

        // Ensure the API returns an array
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error('Expected an array but got:', data);
          setVideos([]);
        }
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setVideos([]);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <UploadForm />
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id} className="border p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
            <VideoPlayer playbackId={video.playback_id} />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No videos found.</p>
      )}
    </div>
  );
}
