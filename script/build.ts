import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });
  await rm("build", { recursive: true, force: true });
  await rm("public", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
  
  // Ensure static files are accessible for Vercel serverless function
  const staticSource = path.resolve("dist", "public");
  if (existsSync(staticSource)) {
    console.log(`✓ Static files built at: ${staticSource}`);
    
    // Create empty 'build' directory to satisfy Vercel's outputDirectory check
    // The actual files are served via serverless function from dist/public
    try {
      await mkdir("build", { recursive: true });
      // Create a .gitkeep file to ensure the directory exists
      const gitkeepPath = path.join("build", ".gitkeep");
      if (!existsSync(gitkeepPath)) {
        await writeFile(gitkeepPath, "");
      }
      console.log("✓ Created build directory for Vercel");
    } catch (err) {
      // Ignore errors - not critical
      console.warn("Could not create build directory:", err);
    }
  }
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});