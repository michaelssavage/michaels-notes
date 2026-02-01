import fs from "fs";
import path from "path";

const filePath = path.resolve("src/content/guide/barcelona.ts");
const fileContent = fs.readFileSync(filePath, "utf-8");

// Match the array contents between = [ and ];
const arrayMatch = fileContent.match(
  /export const items: GuideTableItem\[] = (\[.*\]);/s
);

if (!arrayMatch) {
  console.error("Could not find items array in file.");
  // eslint-disable-next-line no-undef
  process.exit(1);
}

const arrayText = arrayMatch[1];

const items = eval(arrayText);

// Sort by title
items.sort((a, b) => a.title.localeCompare(b.title, "en"));

// Rebuild the file
const newArrayText = JSON.stringify(items, null, 2)
  // JSON.stringify uses double quotes, convert back to TypeScript-style
  .replace(/"([^"]+)":/g, "$1:")
  .replace(/"/g, '"'); // keep quotes around strings

const newFileContent = fileContent.replace(
  arrayMatch[0],
  `export const items: GuideTableItem[] = ${newArrayText};`
);

fs.writeFileSync(filePath, newFileContent, "utf-8");
console.log("Sorted guide items by title.");
