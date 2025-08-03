'use client';

import { MuxPlayer } from '@mux/mux-player-react';

export default function VideoPlayer({ playbackId }) {
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
        autoPlay
        style={{
          width: '100%',
