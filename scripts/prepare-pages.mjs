import { copyFile, mkdir, writeFile } from 'node:fs/promises';

// Removed or unknown paths must not display another invitation.
await writeFile('dist/404.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Invitation not found</title></head><body><h1>Invitation not found</h1><p>Please check the invitation link you received.</p></body></html>');

// These folders make known invitation routes resolve as HTTP 200 pages instead
// of depending on GitHub Pages' HTTP 404 fallback behavior.
const invitationRoutes = ['v1', 'VAMHS', 'VAH', 'VAHS', 'VAS', 'VA', 'VSHS', 'VSH'];
for (const route of invitationRoutes) {
  const routeDirectory = `dist/${route}`;
  await mkdir(routeDirectory, { recursive: true });
  await copyFile('dist/index.html', `${routeDirectory}/index.html`);
}

