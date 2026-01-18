"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import type { Post } from "@/lib/posts";
import { getArtistSlug } from "@/lib/utils";

interface PostListProps {
  posts: Post[];
  artists: string[];
}

// アーティスト名の別表記マッピング（カタカナ対応）
const artistAliasMap: Record<string, string[]> = {
  "Lady Gaga": ["レディー・ガガ", "レディーガガ", "ガガ"],
  "Ed Sheeran": ["エド・シーラン", "エドシーラン", "エド"],
  "Ariana Grande": ["アリアナ・グランデ", "アリアナグランデ", "アリアナ"],
  "Shakira": ["シャキーラ"],
  "ABBA": ["アバ"],
  "Florence + The Machine": ["フローレンス・アンド・ザ・マシーン", "フローレンス"],
  "Beyoncé": ["ビヨンセ"],
  "Wyclef Jean": ["ワイクリフ・ジーン", "ワイクリフ"],
  "Bradley Cooper": ["ブラッドリー・クーパー", "ブラッドリー"],
  "Chris Moukarbel": ["クリス・ムーカーベル", "クリス"],
};

// アーティスト名の別表記を取得（英語名→カタカナ表記の配列）
function getArtistAliases(artistName: string): string[] {
  return artistAliasMap[artistName] || [];
}

// カタカナ→ひらがな変換
function toHiragana(str: string): string {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

// 全角英数→半角英数変換
function toHalfWidth(str: string): string {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}

// 検索用の正規化関数（大文字小文字、全角半角、カタカナひらがなを統一）
function normalizeForSearch(str: string): string {
  return toHiragana(toHalfWidth(str.toLowerCase()));
}

// アーティスト名を検索用文字列に変換（英語名 + カタカナ別表記）
function getArtistSearchText(artistName: string): string {
  const aliases = getArtistAliases(artistName);
  return [artistName, ...aliases].join(" ");
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

export default function PostList({ posts, artists }: PostListProps) {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // 検索機能：タイトル、アーティスト名、曲名で検索
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // アーティストフィルタ（コラボ曲にも対応）
      let artistMatch = true;
      if (selectedArtist && post.artist) {
        const individualArtists = splitArtists(post.artist);
        artistMatch = individualArtists.includes(selectedArtist);
      } else if (selectedArtist) {
        artistMatch = false;
      }

      // 検索キーワードフィルタ
      if (!searchQuery.trim()) {
        return artistMatch;
      }

      const normalizedQuery = normalizeForSearch(searchQuery);
      const titleMatch = normalizeForSearch(post.title || "").includes(normalizedQuery);
      
      // アーティスト名検索（英語名 + カタカナ別表記に対応）
      let artistMatchQuery = false;
      if (post.artist) {
        const individualArtists = splitArtists(post.artist);
        artistMatchQuery = individualArtists.some((artist) => {
          const searchText = getArtistSearchText(artist);
          return normalizeForSearch(searchText).includes(normalizedQuery);
        });
      }
      
      const songMatch = normalizeForSearch(post.song || "").includes(normalizedQuery);

      return artistMatch && (titleMatch || artistMatchQuery || songMatch);
    });
  }, [posts, selectedArtist, searchQuery]);

  // サジェスト候補（検索クエリがある場合、上位5件を表示）
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || !showSuggestions) return [];
    return filteredPosts.slice(0, 5);
  }, [filteredPosts, searchQuery, showSuggestions]);

  return (
    <>
      {/* 検索バー */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="タイトル / アーティスト / 曲名で検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
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

          {/* サジェスト */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              {suggestions.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="block px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900">{post.title}</div>
                  {post.artist && (
                    <div className="text-sm text-gray-600">{post.artist}</div>
                  )}
                </Link>
              ))}
            </div>
          )}
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
              <div key={artist} className="flex items-center gap-1">
                <Link
                  href={`/artists/${getArtistSlug(artist)}`}
                  className="px-4 py-2 rounded-full text-sm transition-colors bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                  title={`${artist}のプロフィールページへ`}
                >
                  {artist}
                </Link>
                <button
                  onClick={() => setSelectedArtist(artist)}
                  className={`px-3 py-2 rounded-full text-sm transition-colors ${
                    selectedArtist === artist
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title={`${artist}の曲一覧を表示`}
                >
                  📀
                </button>
              </div>
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
