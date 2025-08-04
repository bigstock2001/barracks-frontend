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
        color: #ffffff;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        margin-bottom: 2rem;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        background: rgba(30,58,138,0.9);
        padding: 1rem 2rem;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(59,130,246,0.3);
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
      .form-group textarea,
      .form-group select {
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
      
      .form-group select option {
        background: #333;
        color: white;
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
              <li><a href="#apply">Apply</a></li>
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
              <a href="#apply" class="btn btn-primary">🚀 Apply to Create</a>
              <a href="#profit-sharing" class="btn btn-secondary">💰 Learn About Profit Sharing</a>
            </div>
            
            <div class="stats">
              <div class="stat-card">
                <div class="stat-number yellow">30%</div>
                <div>Revenue Share</div>
              </div>
              <div class="stat-card">
                <div class="stat-number blue">∞</div>
                <div>Upload Limit (Free)</div>
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
            <p style="text-align: center; font-size: 1.2rem; color: #ffffff; margin-bottom: 3rem; background: rgba(30,58,138,0.9); padding: 1rem 2rem; border-radius: 8px; backdrop-filter: blur(10px); border: 1px solid rgba(59,130,246,0.3);">
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
                <p><strong>Free Tier:</strong> Unlimited uploads, videos deleted after 3 months</p>
                <p><strong>Paid Tiers ($9.99-$29.99):</strong> Permanent hosting, 30% profit sharing, analytics dashboard, archived content access</p>
              </div>
              
              <div class="feature-card">
                <h3>🗄️ Premium Archive Access</h3>
                <p>Free tier videos are automatically deleted after 3 months. Paid subscribers get access to our complete archive of premium content, including all previously deleted videos.</p>
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

        <!-- Application Section -->
        <section id="apply" class="section">
          <div class="container">
            <h2>📝 Apply for Creator Program</h2>
            <div class="upload-form">
              <h3 style="margin-bottom: 1.5rem;">Join the Elite Creator Program</h3>
              <p style="color: #e0e0e0; margin-bottom: 2rem;">
                Apply to become an approved creator. Most applications are reviewed and approved within 24 hours.
              </p>
              <div class="form-group">
                <label>Name *</label>
                <input type="text" placeholder="Your full name" id="applicantName" required>
              </div>
              <div class="form-group">
                <label>Title of the Podcast *</label>
                <input type="text" placeholder="Name of your podcast" id="podcastTitle" required>
              </div>
              <div class="form-group">
                <label>Genre *</label>
                <select id="genre" required>
                  <option value="">Select a genre</option>
                  <option value="military">Military & Veterans</option>
                  <option value="true-crime">True Crime</option>
                  <option value="comedy">Comedy</option>
                  <option value="news">News & Politics</option>
                  <option value="business">Business</option>
                  <option value="health">Health & Fitness</option>
                  <option value="technology">Technology</option>
                  <option value="education">Education</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="sports">Sports</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label>RSS Feed *</label>
                <select id="rssOption" onchange="toggleRssField()" required>
                  <option value="">Choose an option</option>
                  <option value="transfer">Will you be transferring your RSS feed</option>
                  <option value="new">Want a new RSS feed</option>
                </select>
              </div>
              <div class="form-group" id="rssUrlGroup" style="display: none;">
                <label>Current RSS Feed URL</label>
                <input type="url" placeholder="https://your-current-rss-feed.com/feed.xml" id="rssUrl">
              </div>
              <div class="form-group">
                <label>Email *</label>
                <input type="email" placeholder="your.email@example.com" id="applicantEmail" required>
              </div>
              <button class="btn btn-primary" onclick="submitApplication()">
                📧 Submit Application
              </button>
              <div id="applicationStatus" style="margin-top: 1rem; padding: 1rem; border-radius: 6px; display: none;"></div>
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

        // Handle RSS field toggle
        function toggleRssField() {
          const rssOption = document.getElementById('rssOption').value;
          const rssUrlGroup = document.getElementById('rssUrlGroup');
          
          if (rssOption === 'transfer') {
            rssUrlGroup.style.display = 'block';
            document.getElementById('rssUrl').required = true;
          } else {
            rssUrlGroup.style.display = 'none';
            document.getElementById('rssUrl').required = false;
          }
        }

        function submitApplication() {
          const name = document.getElementById('applicantName').value;
          const podcastTitle = document.getElementById('podcastTitle').value;
          const genre = document.getElementById('genre').value;
          const rssOption = document.getElementById('rssOption').value;
          const rssUrl = document.getElementById('rssUrl').value;
          const email = document.getElementById('applicantEmail').value;
          
          // Validate required fields
          if (!name || !podcastTitle || !genre || !rssOption || !email) {
            alert('Please fill in all required fields (marked with *)');
            return;
          }
          
          if (rssOption === 'transfer' && !rssUrl) {
            alert('Please provide your current RSS feed URL');
            return;
          }
          
          // Create email body
          const emailBody = \`
New Podcast Creator Application

Name: \${name}
Title of the Podcast: \${podcastTitle}
Genre: \${genre}
RSS Feed: \${rssOption === 'transfer' ? 'Will be transferring RSS feed' : 'Wants a new RSS feed'}
\${rssOption === 'transfer' ? 'Current RSS URL: ' + rssUrl : ''}
Email: \${email}

Submitted: \${new Date().toLocaleString()}
          \`.trim();
          
          // Create mailto link
          const mailtoLink = \`mailto:support@barracksmedia.com?subject=Podcast Creator Application - \${podcastTitle}&body=\${encodeURIComponent(emailBody)}\`;
          
          // Open email client
          window.location.href = mailtoLink;
          
          // Show success message
          const statusDiv = document.getElementById('applicationStatus');
          statusDiv.style.display = 'block';
          statusDiv.style.background = 'rgba(34, 197, 94, 0.2)';
          statusDiv.style.border = '1px solid #22c55e';
          statusDiv.style.color = '#22c55e';
          statusDiv.innerHTML = \`
            <strong>✅ Application Submitted!</strong><br>
            Your application has been sent to support@barracksmedia.com<br>
            <em>Most applications are approved within 24 hours.</em>
          \`;
          
          // Clear form
          document.getElementById('applicantName').value = '';
          document.getElementById('podcastTitle').value = '';
          document.getElementById('genre').value = '';
          document.getElementById('rssOption').value = '';
          document.getElementById('rssUrl').value = '';
          document.getElementById('applicantEmail').value = '';
          document.getElementById('rssUrlGroup').style.display = 'none';
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