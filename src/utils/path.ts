export const getAssetPath = (path: string): string => {
  const basePath =
    process.env.NODE_ENV === 'production' ? '/llmcapsule_homepage_front' : '';
  return `${basePath}${path}`;
};
