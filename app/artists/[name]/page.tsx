import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllArtists,
  getPostsByArtist,
} from "@/lib/posts";
import { getArtistSlug } from "@/lib/utils";

export async function generateStaticParams(): Promise<Array<{ name: string }>> {
  const artists = getAllArtists();
  return artists.map((artist) => ({
    name: getArtistSlug(artist),
  }));
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const artists = getAllArtists();
  const artist = artists.find((a) => getArtistSlug(a) === name);

  if (!artist) {
    notFound();
  }

  const posts = getPostsByArtist(artist);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 mb-8 inline-block"
        >
          ← 一覧に戻る
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{artist}</h1>
          <p className="text-gray-600">{posts.length}曲</p>
        </header>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-8">
              <Link
                href={`/posts/${post.slug}`}
                className="block hover:opacity-70 transition-opacity"
              >
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                {post.date && (
                  <p className="text-sm text-gray-400">{post.date}</p>
                )}
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
