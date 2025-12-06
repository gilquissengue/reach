// Vercel serverless function handler for Express app
// FORCE HTML response - NO DOWNLOADS

const handler = async (req, res) => {
  // ABSOLUTE FIRST: Force HTML content type BEFORE anything else
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Remove ANY download headers immediately
  try {
    res.removeHeader('Content-Disposition');
  } catch (e) {}
  
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
      // Send HTML error page
      return res.status(500).end(`
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
    
    // Get the handler function
    const appHandler = serverModule.default || serverModule;
    
    if (typeof appHandler !== 'function') {
      console.error('Server module does not export a function');
      return res.status(500).end(`
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
    
    // Override response methods to GUARANTEE HTML headers
    const originalWriteHead = res.writeHead;
    const originalEnd = res.end;
    const originalSend = res.send;
    
    // Override writeHead
    res.writeHead = function(statusCode, statusMessage, headers) {
      // Force HTML headers
      if (!headers) headers = {};
      if (typeof statusMessage === 'object') {
        headers = statusMessage;
        statusMessage = undefined;
      }
      
      headers['Content-Type'] = 'text/html; charset=utf-8';
      headers['X-Content-Type-Options'] = 'nosniff';
      delete headers['Content-Disposition'];
      
      return originalWriteHead.call(this, statusCode, statusMessage, headers);
    };
    
    // Override send
    res.send = function(body) {
      this.setHeader('Content-Type', 'text/html; charset=utf-8');
      this.removeHeader('Content-Disposition');
      return originalSend.call(this, body);
    };
    
    // Override end
    res.end = function(chunk, encoding) {
      if (!this.headersSent) {
        this.setHeader('Content-Type', 'text/html; charset=utf-8');
        this.removeHeader('Content-Disposition');
      }
      return originalEnd.call(this, chunk, encoding);
    };
    
    // Call the Express app handler
    await appHandler(req, res);
    
  } catch (error) {
    console.error('Error in serverless function:', error);
    console.error(error.stack);
    
    if (!res.headersSent) {
      return res.status(500).end(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Internal Server Error</title>
          </head>
          <body>
            <h1>Internal Server Error</h1>
            <p>${error.message}</p>
          </body>
        </html>
      `);
    }
  }
};

module.exports = handler;
