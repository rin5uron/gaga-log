import { MetadataRoute } from 'next';
import { getAllPosts, getAllArtists, getArtistSlug } from '@/lib/posts';
import { getAllArtistProfiles } from '@/lib/artists';

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
    lastModified: new Date(post.updatedDate || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // アーティストページ（プロファイルページがある場合はそれを使用、ない場合は記事から抽出）
  const artistProfiles = getAllArtistProfiles();
  const artistPagesFromProfiles = artistProfiles.map((artist) => ({
    url: `${baseUrl}/artists/${artist.slug}`,
    lastModified: new Date(artist.updatedDate || artist.date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 記事から抽出したアーティスト名で、プロファイルページがないものも追加
  const artistsFromPosts = getAllArtists();
  const existingSlugs = new Set(artistProfiles.map((a) => getArtistSlug(a.name)));
  const additionalArtistPages = artistsFromPosts
    .filter((artist) => !existingSlugs.has(getArtistSlug(artist)))
    .map((artist) => ({
      url: `${baseUrl}/artists/${getArtistSlug(artist)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [...staticPages, ...postPages, ...artistPagesFromProfiles, ...additionalArtistPages];
}
