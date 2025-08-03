'use client';

import { useEffect, useState } from 'react';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=100&_fields=title.rendered,content.rendered,thumbnail_url,playback_id');
        const data = await res.json();

        const formatted = data.map(post => ({
          title: post.title.rendered,
          description: post.content?.rendered || '',
          thumbnail: post.thumbnail_url,
          playbackId: post.playback_id,
        }));

        setVideos(formatted);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {videos.map((video, index) => (
        <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden">
          <mux-player
            playback-id={video.playbackId}
            stream-type="on-demand"
            controls
            style={{ width: '100%', aspectRatio: '16 / 9' }}
          ></mux-player>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">{video.title}</h3>
            <div
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: video.description }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
