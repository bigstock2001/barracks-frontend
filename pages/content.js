import VideoPlayer from "../components/VideoPlayer";

const mockVideo = {
  title: "Operation Deep Dive",
  description: "An inside look at veteran-led missions and stories.",
  playbackId: "YOUR_PLAYBACK_ID" // Replace this with a real Mux Playback ID
};

export default function ContentPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{mockVideo.title}</h1>
      <VideoPlayer playbackId={mockVideo.playbackId} />
      <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#444" }}>
        {mockVideo.description}
      </p>
    </div>
  );
}
