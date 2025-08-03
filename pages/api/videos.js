'use client';
import '@mux/mux-player';

export default function VideoPlayer({ playbackId }) {
  return (
    <mux-player
      playback-id={playbackId}
      stream-type="on-demand"
      primary-color="#fbbf24"
      metadata-video-title="Barracks Media"
      style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: '12px' }}
    />
  );
}
