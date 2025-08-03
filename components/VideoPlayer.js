'use client';

import '@mux/mux-player-react';
import { MuxPlayer } from '@mux/mux-player-react';

export default function VideoPlayer({ playbackId }) {
  if (!playbackId) {
    return <p>No video found.</p>;
  }

  return (
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay={false}
        controls
        primaryColor="#ff4d4d"
        metadata={{
          video_title: 'Barracks Media Video',
          viewer_user_id: 'viewer123',
        }}
        style={{
          width: '100%',
          maxWidth: '800px',
          height: 'auto',
          borderRadius: '10px',
        }}
      />
    </div>
  );
}
