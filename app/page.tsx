import { getAllPosts, getAllArtists } from "@/lib/posts";
import PostList from "@/components/PostList";

export default function Home() {
  const posts = getAllPosts();
  const artists = getAllArtists();

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold mb-4">How Sound Feels</h1>
          <p className="text-xl text-gray-700 mb-4 font-medium">
            音を慈しむ。声を愛する。
          </p>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              歌を知ること、アーティストを知ること、その人と良い距離でいること——
              それが、心地よく愛するための方法だと思っています。
            </p>
            <p>
              このサイトは、歌詞の意味を解説するだけでなく、
              <strong className="text-gray-900">その言葉、音、雰囲気、いろんなものを記録する</strong>場所です。
            </p>
            <p className="text-gray-600 text-sm mt-6">
              他人に向けて"売る"のではなく、自分のために"残す"。
              正解を提示するのではなく、個人的な感覚を言語化する。
              結果として、同じ温度の人が読む。
            </p>
            <p className="text-gray-600 text-sm">
              愛しさを追求するために、残す。
            </p>
          </div>
        </section>
        <PostList posts={posts} artists={artists} />
      </main>
    </div>
  );
}

