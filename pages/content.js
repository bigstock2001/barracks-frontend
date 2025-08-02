import { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

export default function ContentPage() {
  const [videos, setVideos] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Fetch video metadata
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));

    // Fetch user role from localStorage (set at login)
    const stored = localStorage.getItem("userRole");
    if (stored) setUserRole(stored);
  }, []);

  const isAuthorized = userRole === "subscriber" || userRole === "paid_creator";

  const groupedByGenre = videos.reduce((acc, video) => {
    const genre = video.genre || "Other";
    if (!acc[genre]) acc[genre] = [];
    acc[genre].push(video);
    return acc;
  }, {});

  return (
    <div style={{ padding: "2rem", background: "#000", color: "#fff" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Welcome to Barracks Media</h1>

      {Object.entries(groupedByGenre).map(([genre, vids]) => (
        <div key={genre} style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{genre}</h2>
          <div style={{ display: "flex", overflowX: "auto", gap: "1rem" }}>
            {vids.map((video) => (
              <div
                key={video.id}
                style={{
                  minWidth: "300px",
                  position: "relative",
                  background: "#111",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {isAuthorized && video.playbackId ? (
                  <MuxPlayer
                    playbackId={video.playbackId}
                    streamType="on-demand"
                    style={{ width: "100%", height: "170px" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "300px",
                      height: "170px",
                      backgroundImage: `url(${video.thumbnail || "https://via.placeholder.com/300x170"})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(5px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "2rem",
                    }}
                  >
                    🔒
                  </div>
                )}
                <div style={{ padding: "0.75rem" }}>
                  <strong>{video.title}</strong>
                  <p style={{ fontSize: "0.85rem", color: "#ccc" }}>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
