useEffect(() => {
  async function fetchVideos() {
    try {
      const res = await fetch('/api/videos');
      const data = await res.json();

      // Defensive check to avoid crashing on bad data
      if (Array.isArray(data)) {
        setVideos(data);
      } else {
        console.error('Expected an array but got:', data);
        setVideos([]); // fallback to empty array to avoid .map() crash
      }
    } catch (err) {
      console.error('Failed to fetch videos:', err);
      setVideos([]); // fallback in case of network or parsing errors
    }
  }

  fetchVideos();
}, []);
