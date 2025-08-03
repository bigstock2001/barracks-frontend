'use client';

import { useEffect, useState } from 'react';
import VideoPlayer from '../../components/VideoPlayer';

export default function ContentPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('https://backend.barracksmedia.com/wp-json/wp/v2/video?per_page=10&_embed');
        const data = await res.json();
        console.log("Video Data:", data);
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);

  ret
