import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sendAssessmentHandler from './api/send-assessment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer(async (req, res) => {
  // Global CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  // 1. API Route: /api/send-assessment
  if (pathname === '/api/send-assessment' || pathname === '/api/send-assessment/') {
    let bodyData = '';
    req.on('data', chunk => { bodyData += chunk; });
    req.on('end', async () => {
      // Mock Express/Vercel req/res for handler
      const mockReq = {
        method: req.method,
        headers: req.headers,
        body: bodyData ? JSON.parse(bodyData) : {}
      };

      const mockRes = {
        statusCode: 200,
        headers: {},
        setHeader(name, value) {
          this.headers[name] = value;
          res.setHeader(name, value);
        },
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          res.writeHead(this.statusCode, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(data));
        },
        end() {
          res.writeHead(this.statusCode);
          res.end();
        }
      };

      try {
        console.log(`[${new Date().toISOString()}] Handling /api/send-assessment for:`, mockReq.body?.email || 'unknown');
        await sendAssessmentHandler(mockReq, mockRes);
      } catch (err) {
        console.error('Server error handling /api/send-assessment:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 2. Static File Serving
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.join(__dirname, decodeURIComponent(pathname));

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  Lunar AI Local Server Running at http://localhost:${PORT}`);
  console.log(`  - Landing page:  http://localhost:${PORT}`);
  console.log(`  - Email API:     http://localhost:${PORT}/api/send-assessment`);
  console.log(`=======================================================`);
});
