export default function contentfulLoader({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) {
  const url = new URL(src, 'https://images.ctfassets.net');
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', (quality || 75).toString());
  url.searchParams.set('f', 'webp');
  url.searchParams.set('fit', 'fill');
  
  return url.href;
} 