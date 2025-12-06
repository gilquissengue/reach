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
      res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').end(`
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Build Error</title></head>
          <body>
            <h1>Build Error</h1>
            <p>Static files not found. Please ensure the build completed successfully.</p>
          </body>
        </html>
      `);
    });
    return;
  }

  // CRITICAL: Middleware to BLOCK Content-Disposition and force HTML for root paths
  app.use((req, res, next) => {
    const isHtmlRequest = !req.path || req.path === '/' || req.path === '/index.html' || 
      (!req.path.includes('.') && !req.path.startsWith('/api') && !req.path.startsWith('/assets'));
    
    // Store original methods
    const originalSetHeader = res.setHeader.bind(res);
    const originalWriteHead = res.writeHead.bind(res);
    const originalEnd = res.end.bind(res);
    
    // Block Content-Disposition header completely
    res.setHeader = function(name: string, value: any) {
      if (name.toLowerCase() === 'content-disposition') {
        return this; // Block it completely
      }
      
      // Force HTML content type for HTML requests
      if (isHtmlRequest && name.toLowerCase() === 'content-type' && typeof value === 'string') {
        if (!value.includes('text/html')) {
          value = 'text/html; charset=utf-8';
        }
      }
      
      return originalSetHeader(name, value);
    };
    
    // Intercept writeHead
    res.writeHead = function(statusCode: number, statusMessage?: any, headers?: any) {
      let finalHeaders = headers;
      
      if (typeof statusMessage === 'object' && !headers) {
        finalHeaders = statusMessage;
        statusMessage = undefined;
      }
      
      if (!finalHeaders) finalHeaders = {};
      
      // Remove Content-Disposition
      delete finalHeaders['Content-Disposition'];
      delete finalHeaders['content-disposition'];
      
      // Force HTML for HTML requests
      if (isHtmlRequest) {
        finalHeaders['Content-Type'] = 'text/html; charset=utf-8';
        finalHeaders['X-Content-Type-Options'] = 'nosniff';
      }
      
      return originalWriteHead.call(this, statusCode, statusMessage, finalHeaders);
    };
    
    // Intercept end to ensure headers are set
    res.end = function(chunk?: any, encoding?: any) {
      if (!res.headersSent && isHtmlRequest) {
        originalSetHeader('Content-Type', 'text/html; charset=utf-8');
        originalSetHeader('X-Content-Type-Options', 'nosniff');
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
      return originalEnd.call(this, chunk, encoding);
    };
    
    // Force HTML headers for HTML requests BEFORE static middleware
    if (isHtmlRequest) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
    }
    
    next();
  });

  // Serve static files with proper headers
  app.use(express.static(staticPath, {
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      
      // Set proper Content-Type based on file extension
      if (ext === '.html' || ext === '.htm') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Content-Type-Options', 'nosniff');
      } else if (ext === '.js') {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (ext === '.css') {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (ext === '.json') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      } else if (ext === '.png') {
        res.setHeader('Content-Type', 'image/png');
      } else if (ext === '.jpg' || ext === '.jpeg') {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (ext === '.svg') {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
      
      // CRITICAL: Remove Content-Disposition - NEVER allow downloads
      try {
        res.removeHeader('Content-Disposition');
      } catch (e) {}
    },
    index: 'index.html',
    dotfiles: 'ignore'
  }));

  // Fall through to index.html for SPA routing (MUST be last)
  app.use("*", (req, res) => {
    // Skip API routes and static assets
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    // Skip if it's a static asset request
    if (req.path.includes('.') && !req.path.endsWith('.html')) {
      return res.status(404).end();
    }
    
    const indexPath = path.resolve(staticPath, "index.html");
    
    if (!fs.existsSync(indexPath)) {
      // Remove Content-Disposition before setting headers
      try {
        res.removeHeader('Content-Disposition');
      } catch (e) {}
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.status(404).end(`
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Not Found</title></head>
          <body><h1>404 Not Found</h1></body>
        </html>
      `);
    }
    
    // CRITICAL: Read file and send with GUARANTEED HTML headers
    try {
      const htmlContent = fs.readFileSync(indexPath, 'utf-8');
      
      // ABSOLUTE FIRST: Remove Content-Disposition if it exists
      try {
        res.removeHeader('Content-Disposition');
      } catch (e) {}
      
      // Set headers EXPLICITLY in the correct order
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      
      // Remove Content-Disposition one more time before sending
      try {
        res.removeHeader('Content-Disposition');
      } catch (e) {}
      
      // Use end() to send HTML directly - this gives us full control
      res.status(200).end(htmlContent);
    } catch (err) {
      console.error('Error reading index.html:', err);
      try {
        res.removeHeader('Content-Disposition');
      } catch (e) {}
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.status(500).end(`
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Server Error</title></head>
          <body><h1>Internal Server Error</h1></body>
        </html>
      `);
    }
  });
}
