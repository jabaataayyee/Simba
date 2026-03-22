import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API route to proxy book downloads
  app.get("/api/download-book", async (req, res) => {
    const { url, filename } = req.query;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).send("URL is required");
    }

    console.log(`Attempting to proxy download from: ${url}`);

    try {
      let response;
      try {
        response = await axios({
          method: 'get',
          url: url,
          responseType: 'stream',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/pdf,application/octet-stream,*/*',
            'Referer': 'https://www.google.com/'
          },
          timeout: 15000
        });
      } catch (dnsError: any) {
        if (dnsError.code === 'ENOTFOUND' && url.includes('ethiopianteachers.com')) {
          // Try alternative domain if first one fails
          const altUrl = url.replace('ethiopianteachers.com', 'www.ethiopianteachers.com');
          console.log(`DNS failed for ${url}, trying alternative: ${altUrl}`);
          response = await axios({
            method: 'get',
            url: altUrl,
            responseType: 'stream',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'application/pdf,application/octet-stream,*/*',
              'Referer': 'https://www.google.com/'
            },
            timeout: 15000
          });
        } else {
          throw dnsError;
        }
      }

      res.setHeader('Content-Disposition', `attachment; filename="${filename || 'book.pdf'}"`);
      res.setHeader('Content-Type', response.headers['content-type'] || 'application/pdf');
      
      response.data.pipe(res);
    } catch (error: any) {
      console.error("Download proxy error:", error.message);
      if (error.response) {
        console.error("Status:", error.response.status);
        res.status(error.response.status).send(`Failed to download book: Server returned ${error.response.status}`);
      } else if (error.request) {
        res.status(504).send("Failed to download book: No response from the source server. The site might be down or blocking the request.");
      } else {
        res.status(500).send(`Failed to download book: ${error.message}`);
      }
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
