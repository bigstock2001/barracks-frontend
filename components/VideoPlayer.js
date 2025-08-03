'use client';

import MuxPlayer from '@mux/mux-player-react';

export default function VideoPlayer({ playbackId }) {
  if (!playbackId) return <p>No playback ID provided</p>;

  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      autoPlay={false}
      muted
      style={{ width: '100%', maxWidth: '800px', borderRadius: '12px' }}
    />
  );
}
