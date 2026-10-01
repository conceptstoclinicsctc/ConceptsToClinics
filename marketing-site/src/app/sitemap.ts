import { MetadataRoute } from 'next';
import { programs } from '@/data/courses';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://conceptstoclinics.com';

  const staticRoutes = [
    '',
    '/courses',
    '/team',
    '/download',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const courseRoutes = programs.map((program) => ({
    url: `${baseUrl}/courses/${program.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes];
}
