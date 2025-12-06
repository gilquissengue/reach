import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Initialize app setup
let appSetupPromise: Promise<void> | null = null;

const setupApp = async () => {
  if (appSetupPromise) {
    return appSetupPromise;
  }

  appSetupPromise = (async () => {
    await registerRoutes(httpServer, app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      throw err;
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else if (!process.env.VERCEL) {
      // Only setup Vite in development when not on Vercel
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }
  })();

  return appSetupPromise;
};

// For Vercel: export a function that ensures app is setup
if (process.env.VERCEL) {
  // Export a function that waits for setup
  const vercelHandler = async (req: any, res: any) => {
    await setupApp();
    return app(req, res);
  };
  
  // @ts-ignore - CommonJS export for Vercel
  if (typeof module !== 'undefined' && module.exports) {
    // @ts-ignore
    module.exports = vercelHandler;
  }
} else {
  // Normal server startup
  setupApp().then(() => {
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(
      port,
      "0.0.0.0",
      () => {
        log(`serving on port ${port}`);
      },
    );
  }).catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
  });
}

// Export app for ES modules
export { app };
