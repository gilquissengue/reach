// Vercel serverless function handler for Express app
// The server exports a handler function that ensures the app is set up

let handler;
let handlerPromise;

// Initialize handler on first load
async function initializeHandler() {
  if (handler) return handler;
  
  if (!handlerPromise) {
    handlerPromise = (async () => {
      try {
        // Set VERCEL env before requiring (Vercel sets this automatically)
        process.env.VERCEL = process.env.VERCEL || '1';
        process.env.NODE_ENV = process.env.NODE_ENV || 'production';
        
        // Import the built server module
        // The server exports a handler function when VERCEL env is set
        const serverModule = require('../dist/index.cjs');
        
        // Get the handler function (default export or module.exports)
        const potentialHandler = serverModule.default || serverModule;
        
        if (typeof potentialHandler === 'function') {
          handler = potentialHandler;
          return handler;
        } else {
          console.error('Server module does not export a function:', typeof potentialHandler);
          return null;
        }
      } catch (error) {
        console.error('Error loading server module:', error);
        console.error(error.stack);
        return null;
      }
    })();
  }
  
  return handlerPromise;
}

// Vercel serverless function handler
module.exports = async (req, res) => {
  try {
    // Ensure handler is initialized
    const appHandler = await initializeHandler();
    
    if (!appHandler) {
      if (!res.headersSent) {
        res.status(500).setHeader('Content-Type', 'text/html').send(`
          <html>
            <body>
              <h1>Server Error</h1>
              <p>Server not initialized. Please check the logs.</p>
            </body>
          </html>
        `);
      }
      return;
    }
    
    // Middleware to ensure proper Content-Type headers
    const originalSetHeader = res.setHeader;
    res.setHeader = function(name, value) {
      // If Content-Type is being set, ensure it's correct
      if (name.toLowerCase() === 'content-type' && typeof value === 'string') {
        if (value.includes('text/html') && !value.includes('charset')) {
          value = 'text/html; charset=utf-8';
        }
      }
      return originalSetHeader.call(this, name, value);
    };
    
    // Ensure Content-Type is set for HTML responses if not already set
    const originalEnd = res.end;
    res.end = function(chunk, encoding) {
      if (!res.headersSent) {
        const contentType = res.getHeader('Content-Type');
        if (!contentType) {
          // Default to HTML if no Content-Type is set
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
        } else if (typeof contentType === 'string' && contentType.includes('text/html') && !contentType.includes('charset')) {
          // Ensure charset is set for HTML
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
        }
        // Remove any Content-Disposition header that might cause downloads
        res.removeHeader('Content-Disposition');
      }
      return originalEnd.call(this, chunk, encoding);
    };
    
    // Call the handler function from the server
    return await appHandler(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    console.error(error.stack);
    if (!res.headersSent) {
      res.status(500).setHeader('Content-Type', 'text/html').send(`
        <html>
          <body>
            <h1>Internal Server Error</h1>
            <p>${error.message}</p>
          </body>
        </html>
      `);
    }
  }
};
