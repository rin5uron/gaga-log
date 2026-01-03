import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllArtists,
  getPostsByArtist,
} from "@/lib/posts";
import { getArtistBySlug, getAllArtistProfiles } from "@/lib/artists";
import { getArtistSlug } from "@/lib/utils";
import { remark } from "remark";
import remarkHtml from "remark-html";

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

  // アーティストプロフィールページがあるか確認
  const artistProfile = getArtistBySlug(name);

  // プロフィールページがない場合は、曲一覧から推測
  const artists = getAllArtists();
  const artist = artists.find((a) => getArtistSlug(a) === name);

  if (!artistProfile && !artist) {
    notFound();
  }

  const artistName = artistProfile?.name || artist || "";
  const posts = getPostsByArtist(artistName);

  // マークダウンをHTMLに変換
  let contentHtml = "";
  if (artistProfile) {
    try {
      const processedContent = await remark()
        .use(remarkHtml, { sanitize: false })
        .process(artistProfile.content);
      contentHtml = processedContent.toString();
    } catch (error) {
      console.error("Error processing markdown:", error);
    }
  }

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
          <h1 className="text-5xl font-bold mb-4 leading-tight">{artistName}</h1>

          {/* 基本情報 */}
          {artistProfile && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="space-y-2 text-sm text-gray-700">
                {artistProfile.birthDate && (
                  <li>
                    <span className="font-semibold">生年月日：</span>
                    {artistProfile.birthDate}
                  </li>
                )}
                {artistProfile.nationality && (
                  <li>
                    <span className="font-semibold">国籍：</span>
                    {artistProfile.nationality}
                  </li>
                )}
                {artistProfile.genres && artistProfile.genres.length > 0 && (
                  <li>
                    <span className="font-semibold">ジャンル：</span>
                    {artistProfile.genres.join(", ")}
                  </li>
                )}
              </ul>
            </div>
          )}
        </header>

        {/* アーティストの紹介文 */}
        {contentHtml && (
          <article className="prose prose-lg max-w-none mb-16">
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </article>
        )}

        {/* 関連記事 */}
        <section>
          <h2 className="text-3xl font-bold mb-8 pb-4 border-b">
            関連記事 ({posts.length}件)
          </h2>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-8">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block hover:opacity-70 transition-opacity"
                >
                  <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                  {post.type && (
                    <p className="text-xs text-gray-500 mb-1">
                      {post.type === "movie" ? "🎬 映像作品" : "🎵 楽曲"}
                    </p>
                  )}
                  {post.date && (
                    <p className="text-sm text-gray-400">{post.date}</p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
