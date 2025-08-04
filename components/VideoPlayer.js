'use client';

import { MuxPlayer } from '@mux/mux-player-react';

export default function VideoPlayer({ playbackId }) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      streamType="on-demand"
      metadata={{ video_title: 'Mux Video' }}
      className="w-full aspect-video rounded shadow"
    />
  );
}
