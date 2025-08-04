const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Barracks Media Test</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 40px;
          background: #1a1a1a;
          color: white;
        }
        h1 { color: #ffd700; }
      </style>
    </head>
    <body>
      <h1>🎖 Barracks Media - Test Server</h1>
      <p>If you can see this, the server is working!</p>
      <p>Time: ${new Date().toLocaleString()}</p>
    </body>
    </html>
  `);
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access at: http://localhost:${PORT}`);
});