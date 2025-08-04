'use client';

import { MuxPlayer } from '@mux/mux-player-react';

type Props = {
  playbackId: string;
};

export default function VideoPlayer({ playbackId }: Props) {
  console.log('Rendering MuxPlayer with ID:', playbackId);

  if (!playbackId) {
    return <p>No video found.</p>;
  }

  return (
    <div
      style={{
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        controls
        autoPlay={false}
        style={{
          width: '100%',
          height: '300px',
          borderRadius: '12px',
        }}
      />
    </div>
  );
}
