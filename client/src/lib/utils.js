export function getStrapiMedia(url) {
  if (url == null) return null;

  // Return the full URL if it's already an absolute path (e.g., from a CDN)
  if (url.startsWith("http") || url.startsWith("//")) return url;

  // Otherwise, prepend the correct environment URL
  // Use NEXT_PUBLIC variables if calling from a client component
  const baseUrl = 
    process.env.NEXT_PUBLIC_STRAPI_CLOUD_URL || 
    process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL || 
    "http://localhost:1337";

  return `${baseUrl}${url}`;
}
