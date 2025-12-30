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
  relatedPosts?: string[];
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
      relatedPosts: data.relatedPosts,
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

export function getAllArtists(): string[] {
  const posts = getAllPosts();
  const artists = new Set<string>();
  posts.forEach((post) => {
    if (post.artist) {
      artists.add(post.artist);
    }
  });
  return Array.from(artists).sort();
}

export function getPostsByArtist(artist: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.artist === artist);
}

export { getArtistSlug } from "./utils";

