import { notFound } from "next/navigation";
import Link from "next/link";
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

function extractYouTubeEmbed(content: string): {
  youtubeEmbed: string | null;
  contentWithoutYouTube: string;
} {
  const iframeRegex = /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/[^"]*"[^>]*><\/iframe>/;
  const match = content.match(iframeRegex);

  if (match) {
    const youtubeEmbed = match[0];
    const contentWithoutYouTube = content.replace(iframeRegex, "").trim();
    return { youtubeEmbed, contentWithoutYouTube };
  }

  return { youtubeEmbed: null, contentWithoutYouTube: content };
}

function linkifyContent(html: string, allPosts: ReturnType<typeof getAllPosts>): string {
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

  // 曲名をリンク化
  allPosts.forEach((post) => {
    if (post.song) {
      const regex = new RegExp(`(?<!<[^>]*)(${post.song})(?![^<]*>)`, "g");
      result = result.replace(
        regex,
        `<a href="/posts/${post.slug}" class="text-blue-600 hover:underline">${post.song}</a>`
      );
    }
  });

  // アルバム名をリンク化（同じアルバムの他の投稿があれば）
  allPosts.forEach((post) => {
    if (post.album) {
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

  // YouTube埋め込みを抽出
  const { youtubeEmbed, contentWithoutYouTube } = extractYouTubeEmbed(
    post.content
  );

  let contentHtml = "";
  try {
    console.log("Processing markdown, content length:", contentWithoutYouTube.length);
    const processedContent = await remark()
      .use(remarkHtml, { sanitize: false })
      .process(contentWithoutYouTube);
    contentHtml = processedContent.toString();

    // 本文中の曲名・アーティスト名・アルバム名をリンク化
    contentHtml = linkifyContent(contentHtml, allPosts);

    console.log("HTML generated, length:", contentHtml.length);
  } catch (error) {
    console.error("Error processing markdown:", error);
    // フォールバック: プレーンテキストとして表示
    contentHtml = contentWithoutYouTube
      .split("\n")
      .map((line) => `<p>${line}</p>`)
      .join("\n");
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 mb-8 inline-block"
        >
          ← 一覧に戻る
        </Link>

        <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-8">
          {/* メインコンテンツ */}
          <article className="prose prose-lg max-w-none">
            <header className="mb-8 not-prose">
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>

              {/* 基本情報を箇条書きで表示 */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ul className="space-y-2 text-sm text-gray-700">
                  {post.artist && (
                    <li>
                      <span className="font-semibold">アーティスト：</span>
                      <Link
                        href={`/artists/${getArtistSlug(post.artist)}`}
                        className="text-blue-600 hover:underline"
                      >
                        {post.artist}
                      </Link>
                    </li>
                  )}
                  {post.album && (
                    <li>
                      <span className="font-semibold">アルバム：</span>
                      {post.album}
                    </li>
                  )}
                  {post.year && (
                    <li>
                      <span className="font-semibold">制作年：</span>
                      {post.year}
                    </li>
                  )}
                  {post.date && (
                    <li>
                      <span className="font-semibold">公開日：</span>
                      {post.date}
                    </li>
                  )}
                </ul>
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none post-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </article>

          {/* YouTube固定表示 */}
          {youtubeEmbed && (
            <aside className="lg:sticky lg:top-6 lg:self-start mt-8 lg:mt-0">
              <div
                className="youtube-embed-wrapper"
                dangerouslySetInnerHTML={{ __html: youtubeEmbed }}
              />
            </aside>
          )}
        </div>

        <RelatedPosts currentPost={post} allPosts={allPosts} />
      </main>
    </div>
  );
}

