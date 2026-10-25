/** Resolve a public asset under Vite's configured deployment base path. */
export const assetUrl = (path: string): string => {
  const basePath = import.meta.env.BASE_URL;
  // Some generated page layers already contain BASE_URL. Keep resolution
  // idempotent so passing those layers through assetUrl again does not repeat
  // the GitHub Pages repository path.
  if (path.startsWith(basePath)) return path;
  return `${basePath}${path.replace(/^\/+/, '')}`;
};
