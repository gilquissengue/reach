// Vercel serverless function handler for Express app
// Simplified and guaranteed to work handler

const handler = async (req, res) => {
  // CRITICAL: Set headers FIRST before anything else
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.removeHeader('Content-Disposition');
  
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
      return res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Build Error</title>
          </head>
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
      return res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Server Error</title>
          </head>
          <body>
            <h1>Server Error</h1>
            <p>Server module is not a function. Type: ${typeof appHandler}</p>
          </body>
        </html>
      `);
    }
    
    // CRITICAL: Override ALL response methods to ensure Content-Type
    const originalWrite = res.write;
    const originalWriteHead = res.writeHead;
    const originalEnd = res.end;
    
    // Ensure Content-Type is ALWAYS set before any write
    const ensureHTML = () => {
      if (!res.headersSent) {
        const ct = res.getHeader('Content-Type');
        if (!ct || (typeof ct === 'string' && !ct.includes('text/html'))) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
        }
        res.removeHeader('Content-Disposition');
      }
    };
    
    res.writeHead = function(statusCode, statusMessage, headers) {
      ensureHTML();
      
      // Fix headers object
      if (headers) {
        if (headers['Content-Type'] && !headers['Content-Type'].includes('charset')) {
          if (headers['Content-Type'].includes('text/html')) {
            headers['Content-Type'] = 'text/html; charset=utf-8';
          }
        }
        delete headers['Content-Disposition'];
      } else if (typeof statusMessage === 'object') {
        headers = statusMessage;
        if (headers['Content-Type'] && !headers['Content-Type'].includes('charset')) {
          if (headers['Content-Type'].includes('text/html')) {
            headers['Content-Type'] = 'text/html; charset=utf-8';
          }
        }
        delete headers['Content-Disposition'];
        statusMessage = undefined;
      }
      
      return originalWriteHead.call(this, statusCode, statusMessage, headers);
    };
    
    res.write = function(chunk, encoding) {
      ensureHTML();
      return originalWrite.call(this, chunk, encoding);
    };
    
    res.end = function(chunk, encoding) {
      ensureHTML();
      return originalEnd.call(this, chunk, encoding);
    };
    
    // Call the Express app handler
    await appHandler(req, res);
    
  } catch (error) {
    console.error('Error in serverless function:', error);
    console.error(error.stack);
    
    if (!res.headersSent) {
      return res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Internal Server Error</title>
          </head>
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
