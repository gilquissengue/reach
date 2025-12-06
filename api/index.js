// Vercel serverless function handler for Express app
// CRITICAL: Prevent file downloads - force HTML rendering

const handler = async (req, res) => {
  // ABSOLUTE FIRST: Block Content-Disposition IMMEDIATELY before anything else
  const originalSetHeader = res.setHeader.bind(res);
  const originalWriteHead = res.writeHead.bind(res);
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);
  const originalSend = res.send ? res.send.bind(res) : null;
  const originalSendFile = res.sendFile ? res.sendFile.bind(res) : null;
  
  // Helper to get request path reliably (works with Express req and Vercel req)
  const getRequestPath = () => {
    if (req.path) return req.path;
    if (req.url) {
      try {
        // Try to parse as full URL first
        if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
          const url = new URL(req.url);
          return url.pathname;
        }
        // Otherwise, try to construct URL
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        return url.pathname;
      } catch {
        // Fallback: extract pathname from req.url manually
        const pathname = req.url.split('?')[0].split('#')[0];
        return pathname || '/';
      }
    }
    return '/';
  };
  
  const requestPath = getRequestPath();
  
  // Track if this is an HTML page request (not API, not static assets)
  const isHtmlRequest = requestPath === '/' || requestPath === '/index.html' || 
    (!requestPath.includes('.') && !requestPath.startsWith('/api') && !requestPath.startsWith('/assets'));
  
  // CRITICAL: Intercept setHeader FIRST - BLOCK Content-Disposition completely
  res.setHeader = function(name, value) {
    const lowerName = name.toLowerCase();
    
    // ABSOLUTELY BLOCK Content-Disposition - NEVER allow it
    if (lowerName === 'content-disposition') {
      console.warn('Blocked Content-Disposition header attempt');
      return this; // Block it completely - don't set it
    }
    
    // Force HTML content type for HTML requests
    if (isHtmlRequest && lowerName === 'content-type' && typeof value === 'string') {
      if (!value.includes('text/html')) {
        console.log(`Forcing HTML content type for: ${requestPath}`);
        value = 'text/html; charset=utf-8';
      }
    }
    
    return originalSetHeader(name, value);
  };
  
  // Intercept writeHead - REMOVE Content-Disposition from headers
  res.writeHead = function(statusCode, statusMessage, headers) {
    let finalHeaders = headers;
    
    if (typeof statusMessage === 'object' && !headers) {
      finalHeaders = statusMessage;
      statusMessage = undefined;
    }
    
    if (!finalHeaders) finalHeaders = {};
    
    // REMOVE Content-Disposition completely
    delete finalHeaders['Content-Disposition'];
    delete finalHeaders['content-disposition'];
    
    // Force HTML for HTML requests
    if (isHtmlRequest) {
      finalHeaders['Content-Type'] = 'text/html; charset=utf-8';
      finalHeaders['X-Content-Type-Options'] = 'nosniff';
    }
    
    return originalWriteHead.call(this, statusCode, statusMessage, finalHeaders);
  };
  
  // Intercept write - ensure headers are set correctly
  res.write = function(chunk, encoding) {
    if (!res.headersSent && isHtmlRequest) {
      originalSetHeader('Content-Type', 'text/html; charset=utf-8');
      originalSetHeader('X-Content-Type-Options', 'nosniff');
      // Try multiple times to remove Content-Disposition
      for (let i = 0; i < 3; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
    }
    return originalWrite.call(this, chunk, encoding);
  };
  
  // Intercept end - FINAL check before sending
  res.end = function(chunk, encoding) {
    if (!res.headersSent) {
      if (isHtmlRequest) {
        originalSetHeader('Content-Type', 'text/html; charset=utf-8');
        originalSetHeader('X-Content-Type-Options', 'nosniff');
      }
      // Try multiple times to remove Content-Disposition
      for (let i = 0; i < 5; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
    }
    return originalEnd.call(this, chunk, encoding);
  };
  
  // Intercept send
  if (originalSend) {
    res.send = function(body) {
      if (isHtmlRequest) {
        originalSetHeader('Content-Type', 'text/html; charset=utf-8');
        originalSetHeader('X-Content-Type-Options', 'nosniff');
        // Try multiple times to remove Content-Disposition
        for (let i = 0; i < 5; i++) {
          try {
            res.removeHeader('Content-Disposition');
          } catch (e) {}
        }
      }
      return originalSend.call(this, body);
    };
  }
  
  // Intercept sendFile
  if (originalSendFile) {
    res.sendFile = function(filePath, options, callback) {
      if (isHtmlRequest) {
        originalSetHeader('Content-Type', 'text/html; charset=utf-8');
        originalSetHeader('X-Content-Type-Options', 'nosniff');
        // Try multiple times to remove Content-Disposition
        for (let i = 0; i < 5; i++) {
          try {
            res.removeHeader('Content-Disposition');
          } catch (e) {}
        }
      }
      return originalSendFile.call(this, filePath, options, callback);
    };
  }
  
  try {
    // Set environment variables
    process.env.VERCEL = '1';
    process.env.NODE_ENV = process.env.NODE_ENV || 'production';
    
    // Import the server module
    let serverModule;
    try {
      serverModule = require('../dist/index.cjs');
    } catch (error) {
      console.error('Failed to require server module:', error);
      if (!res.headersSent) {
        originalSetHeader('Content-Type', 'text/html; charset=utf-8');
        // Remove Content-Disposition
        for (let i = 0; i < 5; i++) {
          try {
            res.removeHeader('Content-Disposition');
          } catch (e) {}
        }
        return originalEnd(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Build Error</title>
            </head>
            <body>
              <h1>Build Error</h1>
              <p>Server module not found.</p>
            </body>
          </html>
        `);
      }
      return;
    }
    
    // Get the handler function
    const appHandler = serverModule.default || serverModule;
    
    if (typeof appHandler !== 'function') {
      console.error('Server module does not export a function');
      if (!res.headersSent) {
        originalSetHeader('Content-Type', 'text/html; charset=utf-8');
        // Remove Content-Disposition
        for (let i = 0; i < 5; i++) {
          try {
            res.removeHeader('Content-Disposition');
          } catch (e) {}
        }
        return originalEnd(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Server Error</title>
            </head>
            <body>
              <h1>Server Error</h1>
            </body>
          </html>
        `);
      }
      return;
    }
    
    // Call the Express app handler
    await appHandler(req, res);
    
    // FINAL SAFETY CHECK: After handler completes, ensure no Content-Disposition
    if (!res.headersSent) {
      for (let i = 0; i < 5; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
    }
    
  } catch (error) {
    console.error('Error in serverless function:', error);
    console.error(error.stack);
    
    if (!res.headersSent) {
      originalSetHeader('Content-Type', 'text/html; charset=utf-8');
      // Remove Content-Disposition
      for (let i = 0; i < 5; i++) {
        try {
          res.removeHeader('Content-Disposition');
        } catch (e) {}
      }
      return originalEnd(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Internal Server Error</title>
          </head>
          <body>
            <h1>Internal Server Error</h1>
            <p>${String(error.message).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </body>
        </html>
      `);
    }
  }
};

module.exports = handler;