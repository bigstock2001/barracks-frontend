'use client';

import { MuxPlayer } from '@mux/mux-player-react';

export default function VideoPlayer({ playbackId }) {
  console.log("Rendering MuxPlayer for playbackId:", playbackId);

  if (!playbackId) return <p>No video found.</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        metadata={{
          video_id: playbackId,
          video_title: 'Barracks Media Video',
        }}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      />
    </div>
  );
}
