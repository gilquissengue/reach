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

  // Middleware to ensure Content-Type is set for all responses
  app.use((req, res, next) => {
    // Store original sendFile
    const originalSendFile = res.sendFile;
    
    // Override sendFile to always set Content-Type for HTML
    res.sendFile = function(filePath: string, options?: any, callback?: any) {
      if (filePath.endsWith('.html') || filePath.endsWith('.htm')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      }
      return originalSendFile.call(this, filePath, options, callback);
    };
    
    next();
  });

  // Serve static files with proper headers
  app.use(express.static(staticPath, {
    setHeaders: (res, filePath) => {
      // Set Content-Type for various file types
      if (filePath.endsWith('.html') || filePath.endsWith('.htm')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      } else if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (filePath.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      // Prevent download - ensure no Content-Disposition header
      res.removeHeader('Content-Disposition');
    }
  }));

  // fall through to index.html if the file doesn't exist (SPA routing)
  app.use("*", (req, res) => {
    const indexPath = path.resolve(staticPath, "index.html");
    if (fs.existsSync(indexPath)) {
      // Explicitly set all necessary headers
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      // Ensure no download header
      res.removeHeader('Content-Disposition');
      
      res.sendFile(indexPath, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      }, (err) => {
        if (err) {
          console.error('Error sending index.html:', err);
          if (!res.headersSent) {
            res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').send('Internal Server Error');
          }
        }
      });
    } else {
      res.status(404).setHeader('Content-Type', 'text/html; charset=utf-8').send("Not found");
    }
  });
}
