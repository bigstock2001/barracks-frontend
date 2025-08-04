'use client';

import { useEffect, useState } from 'react';
import UploadForm from '../../components/uploadform';
import VideoPlayer from '../../components/videoplayer';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos');
        const data = await res.json();

        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error('Expected array from API, got:', data);
          setVideos([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setVideos([]);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <UploadForm />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            <h3 className="text-lg font-semibold mb-2 text-black">{video.title?.rendered || 'Untitled'}</h3>
            <VideoPlayer playbackId={video.playback_id} />
          </div>
        ))}
      </div>
    </div>
  );
}
