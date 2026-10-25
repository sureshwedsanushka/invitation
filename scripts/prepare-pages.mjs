import { copyFile, mkdir } from 'node:fs/promises';

// GitHub Pages serves this copy for direct visits to invitation-specific paths.
await copyFile('dist/index.html', 'dist/404.html');

// These folders make known invitation routes resolve as HTTP 200 pages instead
// of depending on GitHub Pages' HTTP 404 fallback behavior.
const invitationRoutes = ['v1', 'VAMHS', 'VAMH', 'VAHS', 'VAS', 'VA', 'VSHS', 'VSH'];
for (const route of invitationRoutes) {
  const routeDirectory = `dist/${route}`;
  await mkdir(routeDirectory, { recursive: true });
  await copyFile('dist/index.html', `${routeDirectory}/index.html`);
}
