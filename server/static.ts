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
    path.resolve(process.cwd(), "build"),
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
  // This MUST be BEFORE express.static
  app.use((req, res, next) => {
    // Helper to get request path reliably
    const getRequestPath = () => {
      if (req.path) return req.path;
      if (req.url) {
        try {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          return url.pathname;
        } catch {
          // Fallback: extract pathname from req.url manually
          const pathname = req.url.split('?')[0];
          return pathname;
        }
      }
      return '/';
    };
    
    const requestPath = getRequestPath();
    
    // Track if this is an HTML page request (not API, not static assets)
    const isHtmlRequest = requestPath === '/' || requestPath === '/index.html' || 
      (!requestPath.includes('.') && !requestPath.startsWith('/api') && !requestPath.startsWith('/assets'));
    
    // Store original methods
    const originalSetHeader = res.setHeader.bind(res);
    const originalWriteHead = res.writeHead.bind(res);
    const originalEnd = res.end.bind(res);
    
    // Block Content-Disposition header completely
    res.setHeader = function(name: string, value: any) {
      if (name.toLowerCase() === 'content-disposition') {
        console.warn('Blocked Content-Disposition header in static middleware');
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
        // Try multiple times to remove Content-Disposition
        for (let i = 0; i < 5; i++) {
          try {
            res.removeHeader('Content-Disposition');
          } catch (e) {}
        }
      }
      return originalEnd.call(this, chunk, encoding);
    };
    
    // Force HTML headers for HTML requests BEFORE static middleware
    if (isHtmlRequest) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      // Remove Content-Disposition multiple times
      for (let i = 0; i < 5; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
    }
    
    next();
  });

  // Serve index.html explicitly with correct headers (before express.static)
  app.get(['/', '/index.html'], (req, res) => {
    const indexPath = path.resolve(staticPath, "index.html");
    
    if (!fs.existsSync(indexPath)) {
      // Remove Content-Disposition
      for (let i = 0; i < 10; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return res.status(404).end(`
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><title>Not Found</title></head>
          <body><h1>404 Not Found</h1></body>
        </html>
      `);
    }
    
    try {
      const htmlContent = fs.readFileSync(indexPath, 'utf-8');
      
      // ABSOLUTE FIRST: Remove Content-Disposition
      for (let i = 0; i < 10; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
      
      // Set headers EXPLICITLY
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      
      // Remove Content-Disposition one more time
      for (let i = 0; i < 10; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
      
      // Send HTML directly
      res.status(200).end(htmlContent);
    } catch (err) {
      console.error('Error reading index.html:', err);
      // Remove Content-Disposition
      for (let i = 0; i < 10; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
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
      for (let i = 0; i < 10; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
    },
    index: false, // Disable automatic index.html serving - we handle it explicitly above
    dotfiles: 'ignore'
  }));

  // Fall through to index.html for SPA routing (MUST be last)
  app.use("*", (req, res) => {
    // Helper to get request path
    const getRequestPath = () => {
      if (req.path) return req.path;
      if (req.url) {
        try {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          return url.pathname;
        } catch {
          return req.url.split('?')[0];
        }
      }
      return '/';
    };
    
    const requestPath = getRequestPath();
    
    // Skip API routes and static assets
    if (requestPath.startsWith('/api/')) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    // Skip if it's a static asset request (has extension and not HTML)
    if (requestPath.includes('.') && !requestPath.endsWith('.html')) {
      return res.status(404).end();
    }
    
    const indexPath = path.resolve(staticPath, "index.html");
    
    if (!fs.existsSync(indexPath)) {
      // Remove Content-Disposition before setting headers
      for (let i = 0; i < 5; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
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
      
      // ABSOLUTE FIRST: Remove Content-Disposition if it exists (try multiple times)
      for (let i = 0; i < 10; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
      
      // Set headers EXPLICITLY in the correct order
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      
      // Remove Content-Disposition one more time before sending
      for (let i = 0; i < 10; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
      
      // Use end() to send HTML directly - this gives us full control
      res.status(200).end(htmlContent);
    } catch (err) {
      console.error('Error reading index.html:', err);
      // Remove Content-Disposition
      for (let i = 0; i < 10; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
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