import { useEffect, useState } from "react";

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Video Content</h1>
      <p style={{ marginBottom: "1rem" }}>Browse exclusive videos available to subscribers.</p>

      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {videos.map((video) => (
            <div
              key={video.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <h3>{video.title}</h3>
              <p>{video.description || "No description provided."}</p>
              {video.thumbnail && (
                <img src={video.thumbnail} alt={video.title} style={{ width: "100%", borderRadius: "8px" }} />
              )}
              {video.playbackId && (
                <video
                  controls
                  width="100%"
                  style={{ marginTop: "0.5rem", borderRadius: "8px" }}
                  src={`https://stream.mux.com/${video.playbackId}.m3u8`}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
