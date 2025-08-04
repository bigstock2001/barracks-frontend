'use client';

import React from 'react';

export default function VideoPlayer({ playbackId, videoId, onViewTracked }) {
  if (!playbackId) {
    return <div className="w-full aspect-video bg-gray-200 rounded shadow flex items-center justify-center">No video available</div>;
  }

  const handlePlay = async () => {
    if (videoId) {
      try {
        const response = await fetch('/api/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoId: videoId,
            userId: null // Add user ID if you have authentication
          }),
        });
        
        const result = await response.json();
        if (result.success && onViewTracked) {
          onViewTracked(result.totalViews);
        }
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    }
  };

  return (
    <mux-player
      playbackId={playbackId}
      stream-type="on-demand"
      metadata-video-title="Mux Video"
      class="w-full aspect-video rounded shadow"
      primary-color="#c62828"
      accent-color="#222"
      onPlay={handlePlay}
    ></mux-player>
  );
}
