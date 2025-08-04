const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Simple in-memory storage for demo
let videos = [
  {
    id: 1,
    title: "Military Training Basics",
    description: "Essential training techniques for new recruits",
    creator: "Sergeant Johnson",
    views: 1250,
    playbackId: "demo-video-1"
  },
  {
    id: 2,
    title: "Combat Readiness Protocol",
    description: "Advanced combat preparation strategies",
    creator: "Captain Smith",
    views: 890,
    playbackId: "demo-video-2"
  }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Routes
  if (pathname === '/api/videos') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(videos));
    return;
  }

  // Serve static files
  if (pathname === '/style.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        color: white;
        min-height: 100vh;
        background-image: url('https://backend.barracksmedia.com/wp-content/uploads/2025/08/Untitled-design-22.png');
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      nav {
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: #ffd700;
      }
      
      .nav-links {
        display: flex;
        gap: 2rem;
        list-style: none;
      }
      
      .nav-links a {
        color: white;
        text-decoration: none;
        transition: color 0.3s;
      }
      
      .nav-links a:hover {
        color: #ffd700;
      }
      
      .hero {
        text-align: center;
        padding: 4rem 0;
      }
      
      .hero h1 {
        font-size: 3.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      
      .gradient-text {
        background: linear-gradient(45deg, #ffd700, #ff6b35, #ff4757);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .hero p {
        font-size: 1.25rem;
        color: #e0e0e0;
        margin-bottom: 2rem;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 3rem;
      }
      
      .btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s;
        cursor: pointer;
      }
      
      .btn-primary {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
      }
      
      .btn-secondary {
        background: linear-gradient(45deg, #ffd700, #ff6b35);
        color: white;
      }
      
      .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
      }
      
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
      }
      
      .stat-card {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .stat-number {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      
      .stat-number.yellow { color: #ffd700; }
      .stat-number.blue { color: #667eea; }
      .stat-number.green { color: #2ed573; }
      
      .section {
        padding: 4rem 0;
        background: rgba(0, 0, 0, 0.5);
        margin: 2rem 0;
        border-radius: 12px;
      }
      
      .section h2 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 2rem;
      }
      
      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      
      .feature-card {
        background: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .feature-card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #ffd700;
      }
      
      .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      
      .video-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .video-thumbnail {
        width: 100%;
        height: 200px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
      }
      
      .video-info {
        padding: 1.5rem;
      }
      
      .video-title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      
      .video-meta {
        color: #ccc;
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }
      
      .upload-form {
        background: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        border-radius: 12px;
        margin: 2rem 0;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .form-group {
        margin-bottom: 1.5rem;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      
      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1rem;
      }
      
      .form-group input::placeholder,
      .form-group textarea::placeholder {
        color: #ccc;
      }
      
      @media (max-width: 768px) {
        .hero h1 {
          font-size: 2.5rem;
        }
        
        .cta-buttons {
          flex-direction: column;
          align-items: center;
        }
        
        .nav-links {
          gap: 1rem;
        }
      }
    `);
    return;
  }

  // Main HTML page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Barracks Media - Elite Creator Platform</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <nav>
        <div class="container">
          <div class="nav-content">
            <div class="logo">🎖 Barracks Media</div>
            <ul class="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#content">Content</a></li>
              <li><a href="#upload">Upload</a></li>
              <li><a href="#profit-sharing">Profit Sharing</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <!-- Hero Section -->
        <section id="home" class="hero">
          <div class="container">
            <h1>
              Join the <span class="gradient-text">Elite</span> Creator Program
            </h1>
            <p>
              Turn your content into consistent revenue. Join Barracks Media's exclusive creator program 
              and earn from every view, download, and subscriber.
            </p>
            
            <div class="cta-buttons">
              <a href="#upload" class="btn btn-primary">🚀 Start Creating Now</a>
              <a href="#profit-sharing" class="btn btn-secondary">💰 Learn About Profit Sharing</a>
            </div>
            
            <div class="stats">
              <div class="stat-card">
                <div class="stat-number yellow">30%</div>
                <div>Revenue Share</div>
              </div>
              <div class="stat-card">
                <div class="stat-number blue">∞</div>
                <div>Upload Limit (Paid)</div>
              </div>
              <div class="stat-card">
                <div class="stat-number green">24/7</div>
                <div>Creator Support</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Profit Sharing Section -->
        <section id="profit-sharing" class="section">
          <div class="container">
            <h2>💰 How Profit Sharing Works</h2>
            <p style="text-align: center; font-size: 1.2rem; color: #e0e0e0; margin-bottom: 3rem;">
              We believe creators should be rewarded for their success. Our transparent profit-sharing model 
              ensures you earn more as your content performs better.
            </p>
            
            <div class="features">
              <div class="feature-card">
                <h3>📊 Revenue Distribution</h3>
                <p>30% of all hosting revenue and subscriber fees are distributed among paid creators based on performance metrics.</p>
                <ul style="margin-top: 1rem; color: #ccc;">
                  <li>• Downloads & Views</li>
                  <li>• Subscriber Engagement</li>
                  <li>• Content Quality Ratings</li>
                  <li>• Community Interaction</li>
                </ul>
              </div>
              
              <div class="feature-card">
                <h3>🎯 Performance-Based</h3>
                <p>The more your content is downloaded, viewed, and engaged with, the larger your share 
                of the profit pool becomes. Top performers can earn significant monthly income.</p>
              </div>
              
              <div class="feature-card">
                <h3>💎 Creator Tiers</h3>
                <p><strong>Free Tier:</strong> 100MB limit, 1 video/month, no profit sharing</p>
                <p><strong>Paid Tiers ($9.99-$29.99):</strong> Up to 5GB uploads, unlimited videos, 30% profit sharing, analytics dashboard</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Content Section -->
        <section id="content" class="section">
          <div class="container">
            <h2>🎬 Featured Content</h2>
            <div class="video-grid" id="videoGrid">
              <!-- Videos will be loaded here -->
            </div>
          </div>
        </section>

        <!-- Upload Section -->
        <section id="upload" class="section">
          <div class="container">
            <h2>📤 Upload Your Content</h2>
            <div class="upload-form">
              <h3 style="margin-bottom: 1.5rem;">Ready to become a creator?</h3>
              <div class="form-group">
                <label>Creator Name</label>
                <input type="text" placeholder="Your creator name" id="creatorName">
              </div>
              <div class="form-group">
                <label>Video Title</label>
                <input type="text" placeholder="Enter your video title" id="videoTitle">
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea rows="4" placeholder="Describe your content..." id="videoDescription"></textarea>
              </div>
              <div class="form-group">
                <label>Choose Your Tier</label>
                <select id="creatorTier" style="width: 100%; padding: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; background: rgba(255, 255, 255, 0.1); color: white;">
                  <option value="free">Free Tier (100MB, 1 video/month)</option>
                  <option value="starter">Starter Creator ($9.99/month)</option>
                  <option value="pro">Pro Creator ($19.99/month)</option>
                  <option value="premium">Premium Creator ($29.99/month)</option>
                </select>
              </div>
              <button class="btn btn-primary" onclick="handleUpload()">
                🎬 Start Upload Process
              </button>
            </div>
          </div>
        </section>
      </main>

      <script>
        // Load videos
        async function loadVideos() {
          try {
            const response = await fetch('/api/videos');
            const videos = await response.json();
            
            const videoGrid = document.getElementById('videoGrid');
            videoGrid.innerHTML = videos.map(video => \`
              <div class="video-card">
                <div class="video-thumbnail">🎥</div>
                <div class="video-info">
                  <div class="video-title">\${video.title}</div>
                  <div class="video-meta">By \${video.creator} • \${video.views} views</div>
                  <p>\${video.description}</p>
                </div>
              </div>
            \`).join('');
          } catch (error) {
            console.error('Error loading videos:', error);
          }
        }

        // Handle upload
        function handleUpload() {
          const creatorName = document.getElementById('creatorName').value;
          const videoTitle = document.getElementById('videoTitle').value;
          const tier = document.getElementById('creatorTier').value;
          
          if (!creatorName || !videoTitle) {
            alert('Please fill in creator name and video title');
            return;
          }
          
          if (tier === 'free') {
            alert('Free tier upload initiated! In a real app, this would connect to Mux for video upload.');
          } else {
            alert(\`\${tier} tier selected! This would redirect to Stripe checkout for subscription.\`);
          }
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
// Simple in-memory storage for demo
let videos = [
  {
    id: 1,
    title: "Military Training Basics",
    description: "Essential training techniques for new recruits",
    creator: "Sergeant Johnson",
    views: 1250,
    playbackId: "demo-video-1"
  },
  {
    id: 2,
    title: "Combat Readiness Protocol",
    description: "Advanced combat preparation strategies",
    creator: "Captain Smith",
    views: 890,
    playbackId: "demo-video-2"
  }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Routes
  if (pathname === '/api/videos') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(videos));
    return;
  }

  // Serve static files
  if (pathname === '/style.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        color: white;
        min-height: 100vh;
        background-image: url('https://backend.barracksmedia.com/wp-content/uploads/2025/08/Untitled-design-22.png');
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      nav {
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: #ffd700;
      }
      
      .nav-links {
        display: flex;
        gap: 2rem;
        list-style: none;
      }
      
      .nav-links a {
        color: white;
        text-decoration: none;
        transition: color 0.3s;
      }
      
      .nav-links a:hover {
        color: #ffd700;
      }
      
      .hero {
        text-align: center;
        padding: 4rem 0;
      }
      
      .hero h1 {
        font-size: 3.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      
      .gradient-text {
        background: linear-gradient(45deg, #ffd700, #ff6b35, #ff4757);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .hero p {
        font-size: 1.25rem;
        color: #e0e0e0;
        margin-bottom: 2rem;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 3rem;
      }
      
      .btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s;
        cursor: pointer;
      }
      
      .btn-primary {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
      }
      
      .btn-secondary {
        background: linear-gradient(45deg, #ffd700, #ff6b35);
        color: white;
      }
      
      .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
      }
      
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
      }
      
      .stat-card {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .stat-number {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      
      .stat-number.yellow { color: #ffd700; }
      .stat-number.blue { color: #667eea; }
      .stat-number.green { color: #2ed573; }
      
      .section {
        padding: 4rem 0;
        background: rgba(0, 0, 0, 0.5);
        margin: 2rem 0;
        border-radius: 12px;
      }
      
      .section h2 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 2rem;
      }
      
      .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      
      .feature-card {
        background: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .feature-card h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #ffd700;
      }
      
      .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      
      .video-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .video-thumbnail {
        width: 100%;
        height: 200px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
      }
      
      .video-info {
        padding: 1.5rem;
      }
      
      .video-title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      
      .video-meta {
        color: #ccc;
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }
      
      .upload-form {
        background: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        border-radius: 12px;
        margin: 2rem 0;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .form-group {
        margin-bottom: 1.5rem;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      
      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1rem;
      }
      
      .form-group input::placeholder,
      .form-group textarea::placeholder {
        color: #ccc;
      }
      
      @media (max-width: 768px) {
        .hero h1 {
          font-size: 2.5rem;
        }
        
        .cta-buttons {
          flex-direction: column;
          align-items: center;
        }
        
        .nav-links {
          gap: 1rem;
        }
      }
    `);
    return;
  }

  // Main HTML page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Barracks Media - Elite Creator Platform</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <nav>
        <div class="container">
          <div class="nav-content">
            <div class="logo">🎖 Barracks Media</div>
            <ul class="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#content">Content</a></li>
              <li><a href="#upload">Upload</a></li>
              <li><a href="#profit-sharing">Profit Sharing</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <!-- Hero Section -->
        <section id="home" class="hero">
          <div class="container">
            <h1>
              Join the <span class="gradient-text">Elite</span> Creator Program
            </h1>
            <p>
              Turn your content into consistent revenue. Join Barracks Media's exclusive creator program 
              and earn from every view, download, and subscriber.
            </p>
            
            <div class="cta-buttons">
              <a href="#upload" class="btn btn-primary">🚀 Start Creating Now</a>
              <a href="#profit-sharing" class="btn btn-secondary">💰 Learn About Profit Sharing</a>
            </div>
            
            <div class="stats">
              <div class="stat-card">
                <div class="stat-number yellow">30%</div>
                <div>Revenue Share</div>
              </div>
              <div class="stat-card">
                <div class="stat-number blue">∞</div>
                <div>Upload Limit (Paid)</div>
              </div>
              <div class="stat-card">
                <div class="stat-number green">24/7</div>
                <div>Creator Support</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Profit Sharing Section -->
        <section id="profit-sharing" class="section">
          <div class="container">
            <h2>💰 How Profit Sharing Works</h2>
            <p style="text-align: center; font-size: 1.2rem; color: #e0e0e0; margin-bottom: 3rem;">
              We believe creators should be rewarded for their success. Our transparent profit-sharing model 
              ensures you earn more as your content performs better.
            </p>
            
            <div class="features">
              <div class="feature-card">
                <h3>📊 Revenue Distribution</h3>
                <p>30% of all hosting revenue and subscriber fees are distributed among paid creators based on performance metrics.</p>
                <ul style="margin-top: 1rem; color: #ccc;">
                  <li>• Downloads & Views</li>
                  <li>• Subscriber Engagement</li>
                  <li>• Content Quality Ratings</li>
                  <li>• Community Interaction</li>
                </ul>
              </div>
              
              <div class="feature-card">
                <h3>🎯 Performance-Based</h3>
                <p>The more your content is downloaded, viewed, and engaged with, the larger your share 
                of the profit pool becomes. Top performers can earn significant monthly income.</p>
              </div>
              
              <div class="feature-card">
                <h3>💎 Creator Tiers</h3>
                <p><strong>Free Tier:</strong> 100MB limit, 1 video/month, no profit sharing</p>
                <p><strong>Paid Tiers ($9.99-$29.99):</strong> Up to 5GB uploads, unlimited videos, 30% profit sharing, analytics dashboard</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Content Section -->
        <section id="content" class="section">
          <div class="container">
            <h2>🎬 Featured Content</h2>
            <div class="video-grid" id="videoGrid">
              <!-- Videos will be loaded here -->
            </div>
          </div>
        </section>

        <!-- Upload Section -->
        <section id="upload" class="section">
          <div class="container">
            <h2>📤 Upload Your Content</h2>
            <div class="upload-form">
              <h3 style="margin-bottom: 1.5rem;">Ready to become a creator?</h3>
              <div class="form-group">
                <label>Creator Name</label>
                <input type="text" placeholder="Your creator name" id="creatorName">
              </div>
              <div class="form-group">
                <label>Video Title</label>
                <input type="text" placeholder="Enter your video title" id="videoTitle">
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea rows="4" placeholder="Describe your content..." id="videoDescription"></textarea>
              </div>
              <div class="form-group">
                <label>Choose Your Tier</label>
                <select id="creatorTier" style="width: 100%; padding: 0.75rem; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; background: rgba(255, 255, 255, 0.1); color: white;">
                  <option value="free">Free Tier (100MB, 1 video/month)</option>
                  <option value="starter">Starter Creator ($9.99/month)</option>
                  <option value="pro">Pro Creator ($19.99/month)</option>
                  <option value="premium">Premium Creator ($29.99/month)</option>
                </select>
              </div>
              <button class="btn btn-primary" onclick="handleUpload()">
                🎬 Start Upload Process
              </button>
            </div>
          </div>
        </section>
      </main>

      <script>
        // Load videos
        async function loadVideos() {
          try {
            const response = await fetch('/api/videos');
            const videos = await response.json();
            
            const videoGrid = document.getElementById('videoGrid');
            videoGrid.innerHTML = videos.map(video => \`
              <div class="video-card">
                <div class="video-thumbnail">🎥</div>
                <div class="video-info">
                  <div class="video-title">\${video.title}</div>
                  <div class="video-meta">By \${video.creator} • \${video.views} views</div>
                  <p>\${video.description}</p>
                </div>
              </div>
            \`).join('');
          } catch (error) {
            console.error('Error loading videos:', error);
          }
        }

        // Handle upload
        function handleUpload() {
          const creatorName = document.getElementById('creatorName').value;
          const videoTitle = document.getElementById('videoTitle').value;
          const tier = document.getElementById('creatorTier').value;
          
          if (!creatorName || !videoTitle) {
            alert('Please fill in creator name and video title');
            return;
          }
          
          if (tier === 'free') {
            alert('Free tier upload initiated! In a real app, this would connect to Mux for video upload.');
          } else {
            alert(\`\${tier} tier selected! This would redirect to Stripe checkout for subscription.\`);
          }
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });

        // Load content on page load
        loadVideos();
      </script>
    </body>
    </html>
  `);
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎖 Barracks Media server running on port ${PORT}`);
  console.log(`Access at: http://localhost:${PORT}`);
});