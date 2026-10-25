import { copyFile } from 'node:fs/promises';

// GitHub Pages serves this copy for direct visits to invitation-specific paths.
await copyFile('dist/index.html', 'dist/404.html');
