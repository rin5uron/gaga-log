"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/lib/posts";

interface PostListProps {
  posts: Post[];
  artists: string[];
}

export default function PostList({ posts, artists }: PostListProps) {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const filteredPosts = selectedArtist
    ? posts.filter((post) => post.artist === selectedArtist)
    : posts;

  return (
    <>
      {artists.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            アーティスト別
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedArtist(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedArtist === null
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              すべて
            </button>
            {artists.map((artist) => (
              <button
                key={artist}
                onClick={() => setSelectedArtist(artist)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedArtist === artist
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {artist}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-8">
        {filteredPosts.length === 0 ? (
          <p className="text-gray-500">まだ記事がありません。</p>
        ) : (
          filteredPosts.map((post) => (
            <article key={post.slug} className="pb-6 mb-6 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0">
              <Link
                href={`/posts/${post.slug}`}
                className="block hover:opacity-70 transition-opacity"
              >
                <h2 className="text-2xl font-semibold mb-2">
                  {post.title}
                  {post.artist && (
                    <span className="text-base font-normal text-gray-600"> / {post.artist}</span>
                  )}
                </h2>
                {post.date && (
                  <p className="text-sm text-gray-400">{post.date}</p>
                )}
              </Link>
            </article>
          ))
        )}
      </div>
    </>
  );
}
