# Michael Savage

Live at [michaelsavage.ie](https://michaelsavage.ie)

Personal site built with React, Typescript, Vite, and @emotion, using eslint for linting. Blog posts written locally with MDX.

## Running locally

Running:

```bash
pnpm install
pnpm dev
```

Wrangler type generation for env typing. 📣 Remember to rerun 'wrangler types' after you change your wrangler.jsonc file.

```bash
pnpm cf-typegen
```

# Building For Production

To build this application for production:

```bash
pnpm run build
```

generate a manifest for SEO: https://realfavicongenerator.net/

## Testing

Integrations tests with Playwright:

```bash
pnpm exec playwright install
pnpm test
```

## Styling

Styling with Emotion CSS.

## Linting & Formatting

Linting and formatting with Eslint and prettier. Eslint is configured using tanstack/eslint-config. The following scripts are available:

```bash
pnpm run lint
pnpm run format
pnpm run check
```

## Running scripts

Import dotenv into the top of the file to get access to env vars. If a ts file, run:

```bash
npx tsx scripts/build-mdx.ts
```

otherwise run with node:

```bash
node scripts/build-mdx.ts
```
