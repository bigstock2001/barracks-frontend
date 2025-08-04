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
          <VideoPlayer key={video.id} playbackId={video.playback_id} />
        ))}
      </div>
    </div>
  );
}
