import { copyFile, mkdir, writeFile } from 'node:fs/promises';

// GitHub Pages serves this copy for direct visits to invitation-specific paths.
await copyFile('dist/index.html', 'dist/404.html');

// These folders make known invitation routes resolve as HTTP 200 pages instead
// of depending on GitHub Pages' HTTP 404 fallback behavior.
const invitationRoutes = ['v1', 'VAMHS', 'VAH', 'VAHS', 'VAS', 'VA', 'VSHS', 'VSH'];
for (const route of invitationRoutes) {
  const routeDirectory = `dist/${route}`;
  await mkdir(routeDirectory, { recursive: true });
  await copyFile('dist/index.html', `${routeDirectory}/index.html`);
}

// Keep previously shared links working after the route rename.
await mkdir('dist/VAMH', { recursive: true });
await writeFile('dist/VAMH/index.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0;url=../VAH/"><title>Invitation moved</title></head><body><a href="../VAH/">Open the invitation</a><script>location.replace('../VAH/'+location.search+location.hash)</script></body></html>`);
