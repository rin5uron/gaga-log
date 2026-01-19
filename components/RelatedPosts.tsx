import Link from "next/link";
import { Post, getAllArtists } from "@/lib/posts";
import { getArtistSlug } from "@/lib/utils";

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
}

export default function RelatedPosts({
  currentPost,
  allPosts,
}: RelatedPostsProps) {
  // 手動指定された関連記事を取得（直接関連する曲のみ）
  const manuallyRelated = currentPost.relatedPosts
    ? allPosts.filter((post) => currentPost.relatedPosts?.includes(post.slug))
    : [];

  // アーティスト名を分割（feat., &, / などに対応）
  const splitArtists = (artistString: string): string[] => {
    if (!artistString) return [];
    const separators = /[&/×]|feat\.|featuring|with|,/i;
    return artistString
      .split(separators)
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
  };

  // アーティストページへのリンクを生成（すべてのアーティスト）
  const artists = currentPost.artist ? splitArtists(currentPost.artist) : [];
  const allArtists = getAllArtists();
  
  // アーティストページが存在するアーティストのみをフィルタ
  const artistLinks = artists
    .filter((artist) => allArtists.some((a) => a.toLowerCase() === artist.toLowerCase()))
    .map((artist) => ({
      name: artist,
      link: `/artists/${getArtistSlug(artist)}`,
    }));

  // 関連記事もアーティストリンクもない場合は表示しない
  if (manuallyRelated.length === 0 && artistLinks.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 pt-4 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-4">関連情報</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {artistLinks.map((artist) => (
          <Link
            key={artist.name}
            href={artist.link}
            className="block p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all bg-gray-50"
          >
            <h3 className="text-lg font-semibold mb-1">
              {artist.name}
            </h3>
            <p className="text-xs text-gray-500">
              アーティスト
            </p>
          </Link>
        ))}
        {manuallyRelated.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
            {post.artist && (
              <p className="text-sm text-gray-600 mb-2">{post.artist}</p>
            )}
            {post.type && (
              <p className="text-xs text-gray-500 mb-2">
                {post.type === "movie" ? "🎬 映像作品" : "🎵 楽曲"}
              </p>
            )}
            {post.date && (
              <p className="text-xs text-gray-400">{post.date}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
