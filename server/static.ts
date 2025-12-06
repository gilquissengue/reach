import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // In production build, static files are in dist/public
  // __dirname will be dist/ when built
  const distPath = path.resolve(__dirname, "public");
  
  // Try multiple possible paths for Vercel
  const possiblePaths = [
    distPath,
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), ".vercel", "output", "static"),
    path.resolve(process.cwd(), "public"),
  ];
  
  let staticPath: string | null = null;
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      staticPath = possiblePath;
      console.log(`Found static files at: ${staticPath}`);
      break;
    }
  }
    
  if (!staticPath || !fs.existsSync(staticPath)) {
    const errorMsg = `Could not find the build directory. Tried: ${possiblePaths.join(', ')}`;
    console.error(errorMsg);
    // Set up a fallback route that returns a helpful error message
    app.use("*", (_req, res) => {
      res.status(500).setHeader('Content-Type', 'text/html').send(`
        <html>
          <body>
            <h1>Build Error</h1>
            <p>Static files not found. Please ensure the build completed successfully.</p>
            <p>Tried paths: ${possiblePaths.join(', ')}</p>
          </body>
        </html>
      `);
    });
    return;
  }

  // CRITICAL: Middleware to ensure HTML Content-Type BEFORE static files
  app.use((req, res, next) => {
    // For HTML requests, set Content-Type immediately
    if (!req.path.includes('.') || req.path.endsWith('.html') || req.path.endsWith('/')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.removeHeader('Content-Disposition');
    }
    next();
  });

  // Serve static files with proper headers
  app.use(express.static(staticPath, {
    setHeaders: (res, filePath) => {
      // Set Content-Type for various file types
      const ext = path.extname(filePath).toLowerCase();
      if (ext === '.html' || ext === '.htm') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      } else if (ext === '.js') {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (ext === '.css') {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (ext === '.json') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      // CRITICAL: Prevent download - remove Content-Disposition if it exists
      try {
        res.removeHeader('Content-Disposition');
      } catch (e) {
        // Ignore if header doesn't exist
      }
    },
    index: 'index.html'
  }));

  // fall through to index.html if the file doesn't exist (SPA routing)
  app.use("*", (req, res, next) => {
    // Skip if it's an API route
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    const indexPath = path.resolve(staticPath, "index.html");
    
    if (!fs.existsSync(indexPath)) {
      // CRITICAL: Set headers BEFORE send
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.removeHeader('Content-Disposition');
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Not Found</title>
          </head>
          <body>
            <h1>404 Not Found</h1>
            <p>The requested page could not be found.</p>
          </body>
        </html>
      `);
    }
    
    // CRITICAL: Set headers BEFORE sendFile
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.removeHeader('Content-Disposition');
    
    // Read file and send with explicit headers
    try {
      const htmlContent = fs.readFileSync(indexPath, 'utf-8');
      res.send(htmlContent);
    } catch (err) {
      console.error('Error reading index.html:', err);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Server Error</title>
          </head>
          <body>
            <h1>Internal Server Error</h1>
            <p>Failed to load page.</p>
          </body>
        </html>
      `);
    }
  });
}
