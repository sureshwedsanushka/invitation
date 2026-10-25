/** Resolve a public asset under Vite's configured deployment base path. */
export const assetUrl = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
