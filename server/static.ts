import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // In production build, static files are in dist/public
  // __dirname will be dist/ when built
  const distPath = path.resolve(__dirname, "public");
  
  // Fallback: try relative to process.cwd() for Vercel
  const staticPath = fs.existsSync(distPath) 
    ? distPath 
    : path.resolve(process.cwd(), "dist", "public");
    
  if (!fs.existsSync(staticPath)) {
    console.warn(
      `Could not find the build directory: ${staticPath}, falling back to dist/public`
    );
    // Don't throw error, just log warning for Vercel
    return;
  }

  app.use(express.static(staticPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(staticPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Not found");
    }
  });
}
