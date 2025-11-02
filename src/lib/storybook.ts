import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { Plugin } from "vite";

export default function storybookPlugin(): Plugin {
  return {
    name: "storybook-static",
    configureServer(server) {
      const storybookDir = join(process.cwd(), "dist", "storybook");

      if (!existsSync(storybookDir)) {
        return;
      }

      server.middlewares.use((req, res, next) => {
        const url = req.url || "/";

        if (!url.startsWith("/storybook")) {
          next();
          return;
        }

        let filePath = url.replace(/^\/storybook/, "") || "/";
        if (filePath === "/") {
          filePath = "/index.html";
        }

        // Remove query strings and hash
        filePath = filePath.split("?")[0].split("#")[0];

        const fullPath = join(storybookDir, filePath);

        try {
          if (existsSync(fullPath)) {
            const content = readFileSync(fullPath);

            const ext = fullPath.split(".").pop()?.toLowerCase() || "";
            const contentType: Record<string, string> = {
              html: "text/html",
              js: "application/javascript",
              css: "text/css",
              json: "application/json",
              png: "image/png",
              jpg: "image/jpeg",
              jpeg: "image/jpeg",
              svg: "image/svg+xml",
              ico: "image/x-icon",
              woff: "font/woff",
              woff2: "font/woff2",
              ttf: "font/ttf",
            };

            res.setHeader(
              "Content-Type",
              contentType[ext] || "application/octet-stream"
            );
            res.end(content);
          } else {
            // Fallback to index.html for SPA routing
            const indexPath = join(storybookDir, "index.html");
            if (existsSync(indexPath)) {
              res.setHeader("Content-Type", "text/html");
              res.end(readFileSync(indexPath));
            } else {
              next();
            }
          }
        } catch (error) {
          console.error(error);
          next();
        }
      });
    },
  };
}
