// Vercel serverless function handler for Express app
// Simple and robust handler that ensures proper HTML serving

const handler = async (req, res) => {
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
      return res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
        <html>
          <head><title>Server Error</title></head>
          <body>
            <h1>Build Error</h1>
            <p>Server module not found. Please ensure the build completed successfully.</p>
            <pre>${error.message}</pre>
          </body>
        </html>
      `);
    }
    
    // Get the handler function
    const appHandler = serverModule.default || serverModule;
    
    if (typeof appHandler !== 'function') {
      console.error('Server module does not export a function');
      return res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
        <html>
          <head><title>Server Error</title></head>
          <body>
            <h1>Server Error</h1>
            <p>Server module is not a function. Type: ${typeof appHandler}</p>
          </body>
        </html>
      `);
    }
    
    // Wrap response to ensure Content-Type is always set correctly
    const originalWriteHead = res.writeHead;
    const originalSetHeader = res.setHeader;
    const originalEnd = res.end;
    
    let contentTypeSet = false;
    
    res.setHeader = function(name, value) {
      if (name.toLowerCase() === 'content-type') {
        contentTypeSet = true;
        // Ensure charset for HTML
        if (typeof value === 'string' && value.includes('text/html') && !value.includes('charset')) {
          value = 'text/html; charset=utf-8';
        }
      }
      // Remove Content-Disposition to prevent downloads
      if (name.toLowerCase() === 'content-disposition') {
        return this;
      }
      return originalSetHeader.call(this, name, value);
    };
    
    res.writeHead = function(statusCode, statusMessage, headers) {
      if (headers && headers['Content-Type'] && headers['Content-Type'].includes('text/html') && !headers['Content-Type'].includes('charset')) {
        headers['Content-Type'] = 'text/html; charset=utf-8';
      }
      // Remove Content-Disposition
      if (headers && headers['Content-Disposition']) {
        delete headers['Content-Disposition'];
      }
      if (typeof statusMessage === 'object') {
        headers = statusMessage;
        statusMessage = undefined;
      }
      return originalWriteHead.call(this, statusCode, statusMessage, headers);
    };
    
    res.end = function(chunk, encoding) {
      if (!res.headersSent) {
        if (!contentTypeSet) {
          // Default to HTML if no Content-Type was set
          originalSetHeader.call(this, 'Content-Type', 'text/html; charset=utf-8');
        }
        // Ensure no Content-Disposition
        try {
          this.removeHeader('Content-Disposition');
        } catch (e) {
          // Ignore if header doesn't exist
        }
      }
      return originalEnd.call(this, chunk, encoding);
    };
    
    // Call the Express app handler
    return await appHandler(req, res);
    
  } catch (error) {
    console.error('Error in serverless function:', error);
    console.error(error.stack);
    
    if (!res.headersSent) {
      return res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').send(`
        <html>
          <head><title>Internal Server Error</title></head>
          <body>
            <h1>Internal Server Error</h1>
            <p>An unexpected error occurred.</p>
            <pre>${error.message}</pre>
          </body>
        </html>
      `);
    }
  }
};

module.exports = handler;
