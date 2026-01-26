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
import remarkGfm from "remark-gfm";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import ArticleHighlights from "@/components/ArticleHighlights";
import AdSenseUnit from "@/components/AdSenseUnit";
import DateInfo from "@/components/DateInfo";

// カタカナ変換マッピングテーブル
const katakanaMap: Record<string, string> = {
  // アーティスト名
  "Lady Gaga": "レディー・ガガ",
  "Ed Sheeran": "エド・シーラン",
  "Shakira": "シャキーラ",
  "Ariana Grande": "アリアナ・グランデ",
  "ABBA": "アバ",
  "Florence + The Machine": "フローレンス・アンド・ザ・マシーン",
  "Beyoncé": "ビヨンセ",
  "Wyclef Jean": "ワイクリフ・ジーン",
  "Bradley Cooper": "ブラッドリー・クーパー",
  "Chris Moukarbel": "クリス・ムーカーベル",
  // 曲名
  "Bad Romance": "バッドロマンス",
  "Poker Face": "ポーカーフェイス",
  "Just Dance": "ジャスト・ダンス",
  "Born This Way": "ボーン・ディス・ウェイ",
  "Telephone": "テレフォン",
  "Alejandro": "アレハンドロ",
  "Judas": "ジューダス",
  "Bloody Mary": "ブラッディ・マリー",
  "Aura": "オーラ",
  "Joanne": "ジョアン",
  "Shallow": "シャロウ",
  "Rain on Me": "レイン・オン・ミー",
  "Replay": "リプレイ",
  "Hey Girl": "ヘイ・ガール",
  "LoveDrug": "ラブドラッグ",
  "Perfect": "パーフェクト",
  "Sing": "シング",
  "Happier": "ハッピアー",
  "The A Team": "ジ・エー・チーム",
  "Thinking Out Loud": "シンキング・アウト・ラウド",
  "One Shot": "ワン・ショット",
  "Zoo": "ズー",
  "Try Everything": "トライ・エブリシング",
  "Hips Don't Lie": "ヒップス・ドント・ライ",
  "Thank U, Next": "サンキュー・ネクスト",
  "Fernando": "フェルナンド",
  "Gaga: Five Foot Two": "ガガ: ファイブ・フット・トゥー",
};

// アーティスト名をカタカナに変換（複数アーティストに対応）
function getKatakanaArtist(artist: string | undefined): string[] {
  if (!artist) return [];
  
  const result: string[] = [];
  // /, &, feat., with などで分割
  const separators = /[&/×]|feat\.|with|,/i;
  const parts = artist.split(separators);
  
  parts.forEach((part) => {
    const trimmed = part.trim();
    if (trimmed) {
      const katakana = katakanaMap[trimmed] || trimmed;
      if (katakana !== trimmed) {
        result.push(katakana);
      }
    }
  });
  
  return result;
}

// 曲名をカタカナに変換
function getKatakanaTitle(title: string | undefined): string | undefined {
  if (!title) return undefined;
  return katakanaMap[title] || undefined;
}

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
  // frontmatterにkeywordsがある場合はそれを使用、ない場合は自動生成
  let keywords: string[] = [];
  
  if (post.keywords && post.keywords.length > 0) {
    // frontmatterにkeywordsがある場合はそれを使用
    keywords = [...post.keywords];
  } else {
    // 自動生成：英語表記 + カタカナ表記 + 基本キーワード
    keywords = [
      post.artist || "",
      post.title,
      "歌詞",
      "意味",
      "解説",
      "音楽",
      "レビュー",
      post.album || "",
    ].filter(Boolean);
    
    // カタカナ表記を追加
    const katakanaArtists = getKatakanaArtist(post.artist);
    const katakanaTitle = getKatakanaTitle(post.title);
    
    keywords.push(...katakanaArtists);
    if (katakanaTitle) {
      keywords.push(katakanaTitle);
    }
  }

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

function extractTourPoster(content: string): {
  tourPoster: string | null;
  contentWithoutPoster: string;
} {
  // ツアーポスター画像と出典リンクを抽出（コメントから</div>まで、改行も含む）
  const posterRegex = /<!-- ▶️ 公式ツアー情報[^>]*>[\s\S]*?<\/div>/gi;
  const match = content.match(posterRegex);

  if (match && match.length > 0) {
    const tourPoster = match[0];
    const contentWithoutPoster = content.replace(tourPoster, "").trim();
    return { tourPoster, contentWithoutPoster };
  }

  return { tourPoster: null, contentWithoutPoster: content };
}

function extractMovieImage(content: string): {
  movieImage: string | null;
  contentWithoutImage: string;
} {
  // 映像作品用の画像リンクを抽出（Netflixやその他のリンク付き画像）
  const imageRegex = /<!-- 🎬[^>]*>[\s\S]*?<a[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?<\/a>/gi;
  const match = content.match(imageRegex);

  if (match && match.length > 0) {
    const movieImage = match[0];
    const contentWithoutImage = content.replace(movieImage, "").trim();
    return { movieImage, contentWithoutImage };
  }

  return { movieImage: null, contentWithoutImage: content };
}

function linkifyContent(
  html: string,
  allPosts: ReturnType<typeof getAllPosts>,
  currentSlug: string
): string {
  let result = html;
  const linkedTerms = new Set<string>(); // 既にリンク化した用語を追跡

  // 見出しタグ内のテキストを一時的に保護
  const headingPlaceholders: { [key: string]: string } = {};
  let placeholderIndex = 0;

  result = result.replace(/(<h[2-6][^>]*>)(.*?)(<\/h[2-6]>)/gi, (match, openTag, content, closeTag) => {
    const placeholder = `__HEADING_PLACEHOLDER_${placeholderIndex}__`;
    headingPlaceholders[placeholder] = match;
    placeholderIndex++;
    return placeholder;
  });

  // アーティスト名をリンク化（1回のみ）
  const artists = getAllArtists();
  artists.forEach((artist) => {
    if (!linkedTerms.has(artist.toLowerCase())) {
      const regex = new RegExp(`(?<!<[^>]*)(${artist})(?![^<]*>)`, "i");
      if (regex.test(result)) {
        result = result.replace(
          regex,
          `<a href="/artists/${getArtistSlug(artist)}" class="underline decoration-gray-300 hover:decoration-gray-800">${artist}</a>`
        );
        linkedTerms.add(artist.toLowerCase());
      }
    }
  });

  // 曲名をリンク化（現在のページは除外、1回のみ）
  allPosts.forEach((post) => {
    if (post.song && post.slug !== currentSlug && !linkedTerms.has(post.song.toLowerCase())) {
      const regex = new RegExp(`(?<!<[^>]*)(${post.song})(?![^<]*>)`, "i");
      if (regex.test(result)) {
        result = result.replace(
          regex,
          `<a href="/posts/${post.slug}" class="underline decoration-gray-300 hover:decoration-gray-800">${post.song}</a>`
        );
        linkedTerms.add(post.song.toLowerCase());
      }
    }
  });

  // アルバム名をリンク化（現在のページは除外、1回のみ）
  allPosts.forEach((post) => {
    if (post.album && post.slug !== currentSlug && !linkedTerms.has(post.album.toLowerCase())) {
      const regex = new RegExp(`(?<!<[^>]*)(${post.album})(?![^<]*>)`, "i");
      if (regex.test(result)) {
        result = result.replace(
          regex,
          `<a href="/posts/${post.slug}" class="underline decoration-gray-300 hover:decoration-gray-800">${post.album}</a>`
        );
        linkedTerms.add(post.album.toLowerCase());
      }
    }
  });

  // 見出しを復元
  Object.keys(headingPlaceholders).forEach((placeholder) => {
    result = result.replace(placeholder, headingPlaceholders[placeholder]);
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

  // ツアーポスター画像を抽出
  const { tourPoster, contentWithoutPoster } = extractTourPoster(post.content);

  // 映像作品の画像を抽出
  const { movieImage, contentWithoutImage } = extractMovieImage(contentWithoutPoster);

  // YouTube埋め込みとストリーミングリンクを抽出
  const { youtubeEmbed, contentWithoutYouTube } = extractYouTubeEmbed(
    contentWithoutImage
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
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(contentWithoutStreaming);
    contentHtml = processedContent.toString();

    // 本文中の曲名・アーティスト名・アルバム名をリンク化（現在のページは除外）
    contentHtml = linkifyContent(contentHtml, allPosts, slug);

    // Referencesセクションにクラスを追加
    contentHtml = contentHtml.replace(
      /<h2([^>]*)>([^<]*<span[^>]*class="section-subtitle"[^>]*>参考情報<\/span>[^<]*)<\/h2>/gi,
      '<h2$1 class="references-section">$2</h2>'
    );

    // 参考リンクセクションにもクラスを追加
    contentHtml = contentHtml.replace(
      /<h2([^>]*)>参考リンク<\/h2>/gi,
      '<h2$1 class="references-section">参考リンク</h2>'
    );

    // まとめセクションのスタイル無効化
    contentHtml = contentHtml.replace(
      /<h2([^>]*)>まとめ<\/h2>/gi,
      '<h2$1 class="no-heading-style">まとめ</h2>'
    );

    console.log("HTML generated, length:", contentHtml.length);
  } catch (error) {
    console.error("Error processing markdown:", error);
    // フォールバック: プレーンテキストとして表示
    contentHtml = contentWithoutStreaming
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("\n");
  }

  // 構造化データ（JSON-LD）を生成
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Article schema
      {
        "@type": "Article",
        headline: post.title,
        author: {
          "@type": "Organization",
          name: "STUDIO Jinsei",
          url: "https://sound-feels.com",
        },
        datePublished: post.date,
        dateModified: post.updatedDate || post.date,
        publisher: {
          "@type": "Organization",
          name: "How Sound Feels",
          url: "https://sound-feels.com",
        },
        description: post.description || `${post.artist}の「${post.title}」について。音を慈しむ。声を愛する。`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://sound-feels.com/posts/${slug}`,
        },
        ...(post.type === "song" && post.song && {
          about: {
            "@type": "MusicRecording",
            name: post.song,
            ...(post.artist && {
              byArtist: {
                "@type": "MusicGroup",
                name: post.artist,
              },
            }),
            ...(post.album && {
              inAlbum: {
                "@type": "MusicAlbum",
                name: post.album,
              },
            }),
          },
        }),
      },
      // BreadcrumbList schema
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: "https://sound-feels.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: post.title,
            item: `https://sound-feels.com/posts/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 構造化データの挿入 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        {/* パンくずリスト */}
        <nav className="mb-4 text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-gray-900">
                ホーム
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">{post.title}</li>
          </ol>
        </nav>

        <article className="prose prose-lg max-w-none">
          <header className="mb-4 not-prose">
            <h1 className="article-title text-3xl sm:text-4xl font-bold mb-3 leading-tight">
              {post.title.includes("2025-2026") || post.title.includes("2025–2026") ? (
                <>
                  {post.title.replace(/\s*2025[–-]2026\s*/, "")}
                  <br />
                  <span className="text-2xl sm:text-3xl">2025–2026</span>
                </>
              ) : (
                post.title
              )}
            </h1>

            {/* 映像作品の画像 */}
            {movieImage && (
              <div
                id="movie-image"
                className="movie-image-wrapper mb-4 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: movieImage }}
              />
            )}

            {/* YouTube埋め込み */}
            {youtubeEmbed && (
              <div
                id="youtube-embed"
                className="youtube-embed-wrapper mb-3 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: youtubeEmbed }}
              />
            )}

            {/* アーティスト情報 */}
            <div className="text-sm text-gray-600 mb-4 max-w-2xl">
              {post.artist && (
                <>
                  <span className="font-semibold">Artist: </span>
                  {(() => {
                    // アーティスト名を分割してリンク化（/、&、feat. などに対応）
                    const parts = post.artist.split(/(\s*\/\s*|\s+&\s+|\s+feat\.\s+|\s+featuring\s+)/i);
                    const allArtists = getAllArtists();

                    return (
                      <>
                        {parts.map((part, index) => {
                          // feat. や & や / はリンクなしで表示
                          if (part.match(/\s*\/\s*|\s+&\s+|\s+feat\.\s+|\s+featuring\s+/i)) {
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
                                className="underline decoration-gray-300 hover:decoration-gray-800"
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

            {/* 作成日・最終更新日（控えめに表示） */}
            <DateInfo
              date={post.date}
              updatedDate={post.updatedDate}
              className="text-xs text-gray-400 mb-4 max-w-2xl"
            />

            {/* ツアーポスター画像（日付の下に配置） */}
            {tourPoster && (
              <div
                className="tour-poster-wrapper mb-4 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: tourPoster }}
              />
            )}

            {/* ストリーミングリンク（画像の下に配置） */}
            {streamingLinks && (
              <div
                className="streaming-links mb-4 max-w-2xl flex gap-3"
                dangerouslySetInnerHTML={{ __html: streamingLinks }}
              />
            )}
          </header>

          {/* 「この記事でわかること」を画像・サブスクの下に配置 */}
          {post.highlights && post.highlights.length > 0 && (
            <div className="mt-0 mb-6">
              <ArticleHighlights highlights={post.highlights} />
            </div>
          )}

          {/* 目次 */}
          {slug !== "mayhem-ball-tour-tokyo-report" && (
            <TableOfContents html={contentHtml} />
          )}

          {/* 記事中間の広告（目次の後・横長） */}
          {slug !== "mayhem-ball-tour-tokyo-report" && (
            <div className="my-0">
              <AdSenseUnit 
                adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MIDDLE || "6660134815"}
                adFormat="auto"
                adStyle={{ width: "100%", minHeight: "100px" }}
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none post-content mb-0"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* 記事下部の広告（横長） */}
        <div className="my-0">
          <AdSenseUnit 
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM || "2979910109"}
            adFormat="auto"
            adStyle={{ width: "100%", minHeight: "100px" }}
          />
        </div>

        <RelatedPosts currentPost={post} allPosts={allPosts} />
      </main>
    </div>
  );
}

