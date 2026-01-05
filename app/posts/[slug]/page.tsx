import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  getPostBySlug,
  getAllPosts,
  getAllArtists,
} from "@/lib/posts";
import { getArtistSlug } from "@/lib/utils";
import { remark } from "remark";
import remarkHtml from "remark-html";
import RelatedPosts from "@/components/RelatedPosts";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  // 記事の種類に応じたタイトルとdescriptionを生成
  const isMovie = post.type === "movie";
  const isSong = post.type === "song";

  let title = "";
  let description = "";

  if (isMovie) {
    // 映画・ドキュメンタリーの場合
    title = `${post.title} - 映画・ドキュメンタリー解説 | How Sound Feels`;
    description = `${post.artist ? post.artist + "の" : ""}「${post.title}」の魅力を深掘り。音楽を通して感じる世界を解説。`;
  } else if (isSong) {
    // 楽曲の場合
    title = `${post.title} - ${post.artist} | 歌詞の意味と解説 | How Sound Feels`;
    description = `${post.artist}の「${post.title}」の歌詞の意味を解説。音を慈しみ、声を愛する。その言葉、音、雰囲気を記録する。`;
  } else {
    // その他
    title = `${post.title} | How Sound Feels`;
    description = `${post.title}について。音を慈しむ。声を愛する。`;
  }

  // キーワード生成
  const keywords = [
    post.artist || "",
    post.title,
    "歌詞",
    "意味",
    "解説",
    "音楽",
    "レビュー",
    post.album || "",
  ].filter(Boolean);

  const baseUrl = "https://sound-feels.com";

  return {
    title,
    description,
    keywords,
    authors: [{ name: "STUDIO Jinsei" }],
    openGraph: {
      title,
      description,
      url: `${baseUrl}/posts/${slug}`,
      siteName: "How Sound Feels",
      locale: "ja_JP",
      type: "article",
      publishedTime: post.date,
      authors: ["STUDIO Jinsei"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@sound_feels", // TwitterアカウントIDがあれば設定
    },
    alternates: {
      canonical: `${baseUrl}/posts/${slug}`,
    },
  };
}

function extractYouTubeEmbed(content: string): {
  youtubeEmbed: string | null;
  contentWithoutYouTube: string;
} {
  // より柔軟な正規表現：改行や属性の順序に対応
  const iframeRegex = /<iframe[\s\S]*?src=["']https:\/\/www\.youtube\.com\/embed\/[^"']*["'][\s\S]*?<\/iframe>/gi;
  const match = content.match(iframeRegex);

  if (match && match.length > 0) {
    const youtubeEmbed = match[0];
    const contentWithoutYouTube = content.replace(youtubeEmbed, "").trim();
    return { youtubeEmbed, contentWithoutYouTube };
  }

  return { youtubeEmbed: null, contentWithoutYouTube: content };
}

function linkifyContent(
  html: string,
  allPosts: ReturnType<typeof getAllPosts>,
  currentSlug: string
): string {
  let result = html;

  // アーティスト名をリンク化
  const artists = getAllArtists();
  artists.forEach((artist) => {
    const regex = new RegExp(`(?<!<[^>]*)(${artist})(?![^<]*>)`, "g");
    result = result.replace(
      regex,
      `<a href="/artists/${getArtistSlug(artist)}" class="text-blue-600 hover:underline">${artist}</a>`
    );
  });

  // 曲名をリンク化（現在のページは除外）
  allPosts.forEach((post) => {
    if (post.song && post.slug !== currentSlug) {
      const regex = new RegExp(`(?<!<[^>]*)(${post.song})(?![^<]*>)`, "g");
      result = result.replace(
        regex,
        `<a href="/posts/${post.slug}" class="text-blue-600 hover:underline">${post.song}</a>`
      );
    }
  });

  // アルバム名をリンク化（現在のページは除外）
  allPosts.forEach((post) => {
    if (post.album && post.slug !== currentSlug) {
      const regex = new RegExp(`(?<!<[^>]*)(${post.album})(?![^<]*>)`, "g");
      result = result.replace(
        regex,
        `<a href="/posts/${post.slug}" class="text-blue-600 hover:underline">${post.album}</a>`
      );
    }
  });

  return result;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();

  // YouTube埋め込みとストリーミングリンクを抽出
  const { youtubeEmbed, contentWithoutYouTube } = extractYouTubeEmbed(
    post.content
  );

  // ストリーミングリンクを抽出
  const streamingLinksRegex = /<!-- 🎧 ストリーミングで聴く -->[\s\S]*?(?=\n\n|##|$)/;
  const streamingMatch = contentWithoutYouTube.match(streamingLinksRegex);
  const streamingLinks = streamingMatch ? streamingMatch[0] : null;
  const contentWithoutStreaming = streamingLinks
    ? contentWithoutYouTube.replace(streamingLinks, "").trim()
    : contentWithoutYouTube;

  let contentHtml = "";
  try {
    console.log("Processing markdown, content length:", contentWithoutStreaming.length);
    const processedContent = await remark()
      .use(remarkHtml, { sanitize: false })
      .process(contentWithoutStreaming);
    contentHtml = processedContent.toString();

    // 本文中の曲名・アーティスト名・アルバム名をリンク化（現在のページは除外）
    contentHtml = linkifyContent(contentHtml, allPosts, slug);

    console.log("HTML generated, length:", contentHtml.length);
  } catch (error) {
    console.error("Error processing markdown:", error);
    // フォールバック: プレーンテキストとして表示
    contentHtml = contentWithoutStreaming
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("\n");
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 mb-4 inline-block"
        >
          ← 一覧に戻る
        </Link>

        <article className="prose prose-lg max-w-none">
          <header className="mb-6 not-prose">
            <h1 className="text-5xl font-bold mb-3 leading-tight">
              {post.title}
            </h1>

            {/* YouTube埋め込み */}
            {youtubeEmbed && (
              <div
                id="youtube-embed"
                className="youtube-embed-wrapper mb-3 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: youtubeEmbed }}
              />
            )}

            {/* ストリーミングリンク */}
            {streamingLinks && (
              <div
                className="streaming-links mb-4 max-w-2xl flex gap-3"
                dangerouslySetInnerHTML={{ __html: streamingLinks }}
              />
            )}

            {/* アーティスト情報 */}
            <div className="text-sm text-gray-600 mb-2 max-w-2xl">
              {post.artist && (
                <>
                  <span className="font-semibold">Artist: </span>
                  {(() => {
                    // アーティスト名を分割してリンク化
                    const parts = post.artist.split(/(\s+&\s+|\s+feat\.\s+|\s+featuring\s+)/i);
                    const allArtists = getAllArtists();

                    return (
                      <>
                        {parts.map((part, index) => {
                          // feat. や & はリンクなしで表示
                          if (part.match(/\s+&\s+|\s+feat\.\s+|\s+featuring\s+/i)) {
                            return <span key={index}>{part}</span>;
                          }

                          // 空白はスキップ
                          const trimmedPart = part.trim();
                          if (!trimmedPart) {
                            return <span key={index}>{part}</span>;
                          }

                          // アーティスト名の場合、リンクを付ける
                          // アーティストページが存在するかチェック
                          const artistExists = allArtists.some(
                            (artist) => artist.toLowerCase() === trimmedPart.toLowerCase()
                          );

                          if (artistExists) {
                            return (
                              <Link
                                key={index}
                                href={`/artists/${getArtistSlug(trimmedPart)}`}
                                className="text-blue-600 hover:underline"
                              >
                                {part}
                              </Link>
                            );
                          }

                          // アーティストページがない場合は通常テキスト
                          return <span key={index}>{part}</span>;
                        })}
                      </>
                    );
                  })()}
                </>
              )}
              {post.album && (
                <>
                  <span className="mx-2">|</span>
                  <span className="font-semibold">Album: </span>
                  <span>{post.album}</span>
                  {post.year && <span> ({post.year})</span>}
                </>
              )}
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none post-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        <RelatedPosts currentPost={post} allPosts={allPosts} />
      </main>
    </div>
  );
}

