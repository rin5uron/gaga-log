import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getArtistSlug } from "./utils";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  song?: string;
  work?: string;
  artist?: string;
  album?: string;
  year?: string;
  date: string;
  type?: string;
  description?: string;
  relatedPosts?: string[];
  keywords?: string[];
  highlights?: string[];
  content: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") && !file.startsWith("template"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      song: data.song,
      work: data.work,
      artist: data.artist,
      album: data.album,
      year: data.year,
      date: data.date || "",
      type: data.type,
      description: data.description,
      relatedPosts: data.relatedPosts,
      keywords: data.keywords,
      highlights: data.highlights,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  return posts;
}

// アーティスト名を分割する関数（&, /, feat., with などで区切る）
function splitArtists(artistString: string): string[] {
  if (!artistString) return [];
  
  // &, /, feat., with, × などで分割
  const separators = /[&/×]|feat\.|with|,/i;
  return artistString
    .split(separators)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}

export function getAllArtists(): string[] {
  const posts = getAllPosts();
  const artists = new Set<string>();
  posts.forEach((post) => {
    if (post.artist) {
      // 個別のアーティスト名を抽出
      const individualArtists = splitArtists(post.artist);
      individualArtists.forEach((artist) => {
        artists.add(artist);
      });
    }
  });
  return Array.from(artists).sort();
}

export function getPostsByArtist(artist: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => {
    if (!post.artist) return false;
    
    // 完全一致の場合
    if (post.artist === artist) return true;
    
    // 複数アーティストが含まれている場合、いずれかが一致するかチェック
    const individualArtists = splitArtists(post.artist);
    return individualArtists.some((a) => a === artist);
  });
}

export { getArtistSlug } from "./utils";

