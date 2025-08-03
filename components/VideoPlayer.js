'use client';

export default function VideoPlayer({ playbackId }) {
  if (!playbackId) return <p>No video found.</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <mux-player
        playback-id={playbackId}
        stream-type="on-demand"
        metadata-video-id={playbackId}
        metadata-video-title="Barracks Media Video"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      ></mux-player>
    </div>
  );
}
