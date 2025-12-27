import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            音楽と言葉の記録サイト
          </h1>
          <p className="text-gray-600 text-lg">
            「ある言葉に、なぜ惹かれたか」を残す記録 = 私の愛のログ
          </p>
        </header>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-gray-500">まだ記事がありません。</p>
          ) : (
            posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-8">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block hover:opacity-70 transition-opacity"
                >
                  <h2 className="text-2xl font-semibold mb-2">
                    {post.title}
                    {post.artist && ` / ${post.artist}`}
                  </h2>
                  {post.date && (
                    <p className="text-sm text-gray-400">{post.date}</p>
                  )}
                </Link>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

