# Michael Savage

Live at [michaelsavage.ie](https://michaelsavage.ie)

Personal site built with React, Typescript, Vite, and @emotion, using eslint for linting. Blog posts written locally with MDX.

## Running locally

To run this application:

```bash
pnpm install
pnpm run start
```

# Building For Production

To build this application for production:

- `pnpm run build`

generate a manifest for SEO: https://realfavicongenerator.net/

## Testing

Integrations tests with Playwright. First setup the hedaless browsers:

- `pnpm exec playwright install`
  `pnpm test`

## Styling

- Styling with Emotion CSS.

## Linting & Formatting

Linting and formatting with Eslint and prettier. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
pnpm run lint
pnpm run format
pnpm run check
```

## Audio waveform generation

- https://github.com/bbc/audiowaveform?tab=readme-ov-file#installation

To generate peaks of an audio waveform, you need to:

1. install podman - https://podman.io/
2. create an alias in powershell / cmd / zshrc
3. move to working directory where the wav/mp3 mix exists and run the following:

```
awf -i [FILENAME_HERE] -o waveform.json --pixels-per-second 20
```

### Creating an alias in Powershell

Need to add a function to the profile file. CHeck if it exists: `Test-Path $PROFILE`  
If it returns False, create it with: `New-Item -Path $PROFILE -ItemType File -Force`

Open the profile in your editor: `notepad $PROFILE`

Add the function at the end of the file:

```
function awf {
    podman run --rm -v "${PWD}:/tmp" -w /tmp realies/audiowaveform @Args
}
```

Save and close Notepad then either reload the profile or restart PowerShell.
