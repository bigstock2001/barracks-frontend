import React, { useEffect, useState } from "react";

function stripHtml(html) {
  if (typeof window === "undefined") return html;
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("https://backend.barracksmedia.com/wp-json/wp/v2/video")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-gray-100 min-h-screen">
      {videos.map((video) => (
        <div
          key={video.id}
          className="p-4 border rounded shadow-md bg-white max-w-md mx-auto"
        >
          <img
            src={video.thumbnail_url}
            alt={video.title.rendered}
            className="w-full h-auto rounded mb-4"
          />
          <h3
            className="text-lg font-bold mb-2"
            dangerouslySetInnerHTML={{ __html: video.title.rendered }}
          />
          <p className="text-sm mb-2 text-gray-700">
            {video.description
              ? video.description
              : video.content?.rendered
              ? stripHtml(video.content.rendered).substring(0, 200) + "..."
              : "No description provided."}
          </p>

          {video.playback_id ? (
            <mux-player
              playback-id={video.playback_id}
              stream-type="on-demand"
              controls
              className="w-full h-64 mt-2"
            ></mux-player>
          ) : (
            <div className="text-center text-gray-500 italic mt-2">
              No video available
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
