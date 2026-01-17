"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/lib/posts";
import { getArtistSlug } from "@/lib/utils";

interface PostListProps {
  posts: Post[];
  artists: string[];
}

export default function PostList({ posts, artists }: PostListProps) {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 検索機能：タイトル、アーティスト名、曲名で検索
  const filteredPosts = posts.filter((post) => {
    // アーティストフィルタ
    const artistMatch = !selectedArtist || post.artist === selectedArtist;
    
    // 検索キーワードフィルタ
    if (!searchQuery.trim()) {
      return artistMatch;
    }
    
    const query = searchQuery.toLowerCase();
    const titleMatch = post.title?.toLowerCase().includes(query) || false;
    const artistMatchQuery = post.artist?.toLowerCase().includes(query) || false;
    const songMatch = post.song?.toLowerCase().includes(query) || false;
    
    return artistMatch && (titleMatch || artistMatchQuery || songMatch);
  });

  return (
    <>
      {/* 検索バー */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="記事を検索（タイトル、アーティスト、曲名）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

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
              <Link
                key={artist}
                href={`/artists/${getArtistSlug(artist)}`}
                className={`px-4 py-2 rounded-full text-sm transition-colors inline-block ${
                  selectedArtist === artist
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {artist}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-8">
        {filteredPosts.length === 0 ? (
          <p className="text-gray-500">
            {searchQuery || selectedArtist
              ? "検索条件に一致する記事が見つかりませんでした。"
              : "まだ記事がありません。"}
          </p>
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
