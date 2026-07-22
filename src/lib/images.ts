/**
 * src/lib/images.ts
 * 
 * Handles mapping local recipe and external image paths to Vercel Blob storage.
 * - On Vercel builds (Web production/preview): Serves from Vercel Blob CDN.
 * - On local/Capacitor builds (Android app): Serves from local assets path.
 */

const BLOB_BASE_URL = process.env.NEXT_PUBLIC_BLOB_BASE_URL || "";

/**
 * Returns the Vercel Blob URL for web deployments, or the local path for Android/Capacitor.
 */
export function getImageUrl(src: string | null | undefined): string {
  if (!src) return "";
  // Only route uploaded recipe images and external images to Blob storage
  if (!src.startsWith("/img/ext/") && !src.startsWith("/img/uploads/")) {
    return src;
  }
  
  if (BLOB_BASE_URL) {
    return `${BLOB_BASE_URL}${src}`;
  }
  return src;
}

/**
 * Patches img src and a href paths inside rich HTML content blocks (like recipe execution)
 * to point to Vercel Blob store when running on Web.
 */
export function patchHtmlImageSources(html: string | null | undefined): string {
  if (!html) return "";
  
  if (BLOB_BASE_URL) {
    // Replaces src="/img/ext/..." or src="/img/uploads/..." (and href= equivalents)
    return html.replace(
      /(src|href)="(\/img\/(?:ext|uploads)\/[^"]+)"/g, 
      `$1="${BLOB_BASE_URL}$2"`
    );
  }
  return html;
}
