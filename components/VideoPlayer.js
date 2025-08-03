'use client';

import { MuxPlayer } from '@mux/mux-player-react';

export default function VideoPlayer({ playbackId }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        metadata={{
          video_title: "Barracks Media Video",
        }}
        style={{ width: '100%', maxWidth: '800px', aspectRatio: '16/9', borderRadius: '8px' }}
      />
    </div>
  );
}
