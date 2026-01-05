import { MetadataRoute } from 'next';
import { getAllPosts, getAllArtists, getArtistSlug } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sound-feels.com';

  // 静的ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2025-12-27'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2025-12-27'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2025-12-27'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // 記事ページ
  const posts = getAllPosts();
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // アーティストページ
  const artists = getAllArtists();
  const artistPages = artists.map((artist) => ({
    url: `${baseUrl}/artists/${getArtistSlug(artist)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...artistPages];
}
