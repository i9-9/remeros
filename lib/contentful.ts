import { createClient } from 'contentful';
import { ContentfulAsset, ProjectImages } from '@/types/contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export function getOptimizedImageUrl(asset: ContentfulAsset, width?: number): string {
  const baseUrl = `https:${asset.fields.file.url}`
  const params = new URLSearchParams({
    w: width?.toString() || '1920',
    f: 'webp',
    q: '80',
    fit: 'fill'
  })
  return `${baseUrl}?${params.toString()}`
}

export async function getProjectImages(): Promise<ProjectImages | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'remerosProjectImages',
      limit: 1,
    });

    if (entries.items.length > 0) {
      return entries.items[0] as unknown as ProjectImages;
    }

    return null;
  } catch (error) {
    console.error('Error fetching project images:', error);
    return null;
  }
}

// Fallback images for development/demo
export const fallbackImages = {
  heroImage: '/images/hero-fallback.jpg',
  locationImage: '/images/location-fallback.jpg',
  environmentImage: '/images/environment-fallback.jpg',
  amenitiesImage: '/images/amenities-fallback.jpg',
  projectImage: '/images/project-fallback.jpg',
  interiorImages: [
    '/images/interior-1-fallback.jpg',
    '/images/interior-2-fallback.jpg',
    '/images/interior-3-fallback.jpg',
    '/images/interior-4-fallback.jpg',
    '/images/interior-5-fallback.jpg',
    '/images/interior-6-fallback.jpg',
    '/images/interior-7-fallback.jpg',
    '/images/interior-8-fallback.jpg',
  ],
  constructionVideo: '/images/construction-video-fallback.mp4',
}; 