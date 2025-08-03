'use client';

export default function ContentPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Test Mux Player</h1>
      <mux-player
        playback-id="2Qrum02mOJs4lr6Xhou9NfU2atZSAEeGKNPW02502zcATo"
        stream-type="on-demand"
        metadata-video-title="Test Video"
        class="w-full max-w-3xl h-[400px] rounded shadow-lg"
      ></mux-player>
    </div>
  );
}
