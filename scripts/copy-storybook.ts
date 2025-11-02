import { cpSync, existsSync } from "fs";
import { join } from "path";

const sourceDir = join(process.cwd(), "dist", "storybook");
const targetDir = join(process.cwd(), "dist", "client", "storybook");

if (!existsSync(sourceDir)) {
  console.warn(
    `Storybook build not found at ${sourceDir}. Run "npm run build:storybook" first.`
  );
  process.exit(0);
}

cpSync(sourceDir, targetDir, { recursive: true });
console.log(`✓ Copied Storybook from ${sourceDir} to ${targetDir}`);
