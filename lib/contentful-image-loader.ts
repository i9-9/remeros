export default function contentfulLoader({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If the image is already from Contentful, process it
  if (src.includes('ctfassets.net')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', (quality || 75).toString());
    url.searchParams.set('f', 'webp');
    url.searchParams.set('fit', 'fill');
    return url.href;
  }
  
  // If it's a local image (starts with / or relative), return as-is
  // Next.js will handle local images normally
  if (src.startsWith('/') || !src.includes('http')) {
    return src;
  }
  
  // For other external images, create Contentful URL
  const url = new URL(src, 'https://images.ctfassets.net');
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', (quality || 75).toString());
  url.searchParams.set('f', 'webp');
  url.searchParams.set('fit', 'fill');
  
  return url.href;
} 