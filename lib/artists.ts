import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getArtistSlug } from "./utils";

const artistsDirectory = path.join(process.cwd(), "content/artists");

export interface Artist {
  slug: string;
  name: string;
  bio?: string;
  birthDate?: string;
  nationality?: string;
  genres?: string[];
  musicStyle?: string;
  date?: string;
  updatedDate?: string;
  appleMusicUrl?: string;
  spotifyUrl?: string;
  content: string;
}

export function getArtistSlugs(): string[] {
  if (!fs.existsSync(artistsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(artistsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getArtistBySlug(slug: string): Artist | null {
  try {
    const fullPath = path.join(artistsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      name: data.name || slug,
      bio: data.bio,
      birthDate: data.birthDate,
      nationality: data.nationality,
      genres: data.genres,
      musicStyle: data.musicStyle,
      date: data.date,
      updatedDate: data.updatedDate || data.date,
      appleMusicUrl: data.appleMusicUrl,
      spotifyUrl: data.spotifyUrl,
      content,
    };
  } catch (error) {
    console.error(`Error reading artist ${slug}:`, error);
    return null;
  }
}

export function getAllArtistProfiles(): Artist[] {
  const slugs = getArtistSlugs();
  const artists = slugs
    .map((slug) => getArtistBySlug(slug))
    .filter((artist): artist is Artist => artist !== null);
  return artists;
}
