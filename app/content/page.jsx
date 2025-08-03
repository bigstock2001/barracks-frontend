'use client';

import { useEffect, useState } from 'react';
import VideoPlayer from '../../components/VideoPlayer';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=10&_embed');
      const data = await res.json();
      console.log("Fetched videos:", data); // Debug all data
      setVideos(data);
    }
    fetchVideos();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Video Content</h1>
      <p className="mb-6">Browse exclusive videos available to subscribers.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => {
          console.log("Playback ID:", video.playback_id); // ✅ Log each playbackId
