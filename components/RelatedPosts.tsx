import Link from "next/link";
import { Post } from "@/lib/posts";

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
}

export default function RelatedPosts({
  currentPost,
  allPosts,
}: RelatedPostsProps) {
  // 同じアーティストの他の曲を取得
  const relatedByArtist = allPosts.filter(
    (post) =>
      post.artist === currentPost.artist && post.slug !== currentPost.slug
  );

  if (relatedByArtist.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">
        {currentPost.artist} の他の曲
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relatedByArtist.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
            {post.song && post.song !== post.title && (
              <p className="text-sm text-gray-600 mb-2">{post.song}</p>
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
