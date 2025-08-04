'use client';

import React from 'react';

export default function VideoPlayer({ playbackId }) {
  if (!playbackId) {
    return <div className="w-full aspect-video bg-gray-200 rounded shadow flex items-center justify-center">No video available</div>;
  }

  return (
    <mux-player
      playbackId={playbackId}
      stream-type="on-demand"
      metadata-video-title="Mux Video"
      class="w-full aspect-video rounded shadow"
      primary-color="#c62828"
      accent-color="#222"
    ></mux-player>
  );
}
