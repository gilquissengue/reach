// Vercel serverless function handler for Express app
// The server exports a handler function that ensures the app is set up

let handler;

try {
  // Import the built server module
  // The server exports a handler function when VERCEL env is set
  const serverModule = require('../dist/index.cjs');
  
  // Get the handler function (default export or module.exports)
  handler = serverModule.default || serverModule;
  
  if (typeof handler !== 'function') {
    console.error('Server module does not export a function');
    handler = null;
  }
} catch (error) {
  console.error('Error loading server module:', error);
  handler = null;
}

// Vercel serverless function handler
module.exports = async (req, res) => {
  try {
    if (!handler) {
      return res.status(500).json({ 
        error: 'Server not initialized',
        message: 'The server module could not be loaded'
      });
    }
    
    // Call the handler function from the server
    return await handler(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
};
