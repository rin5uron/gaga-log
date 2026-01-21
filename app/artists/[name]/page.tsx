import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  getAllArtists,
  getPostsByArtist,
} from "@/lib/posts";
import { getArtistBySlug, getAllArtistProfiles } from "@/lib/artists";
import { getArtistSlug } from "@/lib/utils";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import DateInfo from "@/components/DateInfo";
import AdSenseUnit from "@/components/AdSenseUnit";

// アーティスト名の別表記マッピングテーブル
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

// アーティスト名の別表記を取得
function getArtistAliases(artistName: string): string[] {
  return artistAliasMap[artistName] || [];
}

export async function generateStaticParams(): Promise<Array<{ name: string }>> {
  const artists = getAllArtists();
  return artists.map((artist) => ({
    name: getArtistSlug(artist),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;

  // アーティストプロフィールページがあるか確認
  const artistProfile = getArtistBySlug(name);

  // プロフィールページがない場合は、曲一覧から推測
  const artists = getAllArtists();
  const artist = artists.find((a) => getArtistSlug(a) === name);

  if (!artistProfile && !artist) {
    return {
      title: "アーティストが見つかりません",
    };
  }

  const artistName = artistProfile?.name || artist || "";
  const posts = getPostsByArtist(artistName);

  // 日本語表記を取得（別名の最初の要素、なければ英語名のまま）
  const aliases = getArtistAliases(artistName);
  const japaneseName = aliases.length > 0 ? aliases[0] : artistName;

  const title = `${artistName}（${japaneseName}）代表曲・おすすめ名曲｜歌詞の意味解説`;
  const nationalityText = artistProfile?.nationality ? `国籍：${artistProfile.nationality}。` : '';
  const description = `${artistName}の代表曲・おすすめ楽曲${posts.length}曲を解説。歌詞の意味、和訳、曲の背景まで徹底解説。${nationalityText}`;

  // キーワード生成
  const keywords: string[] = [
    artistName, // 英語表記
    "歌詞",
    "解説",
    "音楽",
    "楽曲一覧",
    "代表曲",
    "おすすめ",
    "名曲",
    "和訳",
    "意味",
  ];

  // アーティスト名の別表記を追加
  keywords.push(...aliases);

  // 国籍と出身を追加
  if (artistProfile?.nationality) {
    keywords.push(artistProfile.nationality); // 国籍（例: "アメリカ"）
    keywords.push("国籍");
    keywords.push("出身");
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
      url: `${baseUrl}/artists/${name}`,
      siteName: "How Sound Feels",
      locale: "ja_JP",
      type: "profile",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/artists/${name}`,
    },
  };
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
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(artistProfile.content);
      contentHtml = processedContent.toString();
      // References セクションに class を付与（控えめスタイル適用）
      contentHtml = contentHtml.replace(
        /<h2([^>]*)>([^<]*<span[^>]*class="section-subtitle"[^>]*>参考情報<\/span>[^<]*)<\/h2>/gi,
        '<h2$1 class="references-section">$2</h2>'
      );
    } catch (error) {
      console.error("Error processing markdown:", error);
    }
  }

  // 国籍→国旗（国籍ワード検索用）
  const countryFlagMap: Record<string, string> = {
    アメリカ: "🇺🇸",
    アメリカ合衆国: "🇺🇸",
    イギリス: "🇬🇧",
    コロンビア: "🇨🇴",
    スウェーデン: "🇸🇪",
    ジャマイカ: "🇯🇲",
  };
  const flag = artistProfile?.nationality
    ? countryFlagMap[artistProfile.nationality] || ""
    : "";

  return (
    <div className="min-h-screen bg-white">
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
            <li className="text-gray-900">{artistName}</li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{artistName}</h1>

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
                    {flag && <span className="mr-1" aria-hidden>{flag}</span>}
                    {artistProfile.nationality}
                  </li>
                )}
                {artistProfile.musicStyle && (
                  <li>
                    <span className="font-semibold">音楽スタイル：</span>
                    {artistProfile.musicStyle}
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* ストリーミングリンク */}
          {artistProfile && (artistProfile.appleMusicUrl || artistProfile.spotifyUrl) && (
            <div className="mb-6">
              {artistProfile.appleMusicUrl && (
                <a
                  href={artistProfile.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mr-3"
                  title="Apple Musicで聴く"
                >
                  <img src="/icons/apple-music.svg" alt="Apple Music" width="32" height="32" />
                </a>
              )}
              {artistProfile.spotifyUrl && (
                <a
                  href={artistProfile.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  title="Spotifyで聴く"
                >
                  <img src="/icons/spotify.svg" alt="Spotify" width="32" height="32" />
                </a>
              )}
            </div>
          )}

          {/* 作成日・最終更新日（控えめに表示） */}
          {artistProfile && (
            <DateInfo
              date={artistProfile.date}
              updatedDate={artistProfile.updatedDate}
              className="text-xs text-gray-400 mb-4"
            />
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

        {/* アーティストページ下部の広告（横長） */}
        <div className="my-0">
          <AdSenseUnit 
            adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM || "2979910109"}
            adFormat="auto"
            adStyle={{ width: "100%", minHeight: "100px" }}
          />
        </div>

        {/* 関連ページ */}
        <section>
          <h2 className="text-2xl font-bold mb-8 pb-4 border-b">
            関連ページ ({posts.length}件)
          </h2>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-8">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block hover:opacity-70 transition-opacity"
                >
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
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
