import { getAllPosts, getAllArtists } from "@/lib/posts";
import PostList from "@/components/PostList";
import AdSenseUnit from "@/components/AdSenseUnit";

export default function Home() {
  const posts = getAllPosts();
  const artists = getAllArtists();

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        {/* 検索とフィルター */}
        <div id="search" className="scroll-mt-20">
          <PostList posts={posts} artists={artists} />
        </div>

        {/* サイト説明セクション */}
        <section id="about" className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-8">このサイトについて</h2>

          {/* 1. このサイトの使い方 */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-gray-900">このサイトの使い方</h3>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                このサイトでは、<strong>歌を知ること</strong>、<strong>アーティストを知ること</strong>、そして<strong>その人・その曲と「ちょうどいい距離」でいること</strong>ができます。
              </p>
              <p>
                トップページから気になる曲を選んで読む。アーティストページでその人のことを知る。関連記事から他の曲も見つける。
                そんな風に、<strong>自分にとって一番心地いい距離で音楽と付き合う</strong>——それが、このサイトの使い方です。
              </p>
            </div>
          </div>

          {/* 2. 他の歌詞・和訳サイトとの違い */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-gray-900">他の歌詞・和訳サイトとの違い</h3>
            <div className="bg-gray-50 border-l-4 border-gray-800 p-6 mb-4 rounded-r-lg">
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span>歌詞を日本語に翻訳する</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span>歌詞の意味を正確に解説する</span>
                </p>
                <p className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">✓</span>
                  <span><strong>なぜその言葉に惹かれたのか</strong>を記録する</span>
                </p>
                <p className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">✓</span>
                  <span><strong>音と雰囲気を言葉で残す</strong></span>
                </p>
                <p className="flex items-start">
                  <span className="text-green-600 font-bold mr-2">✓</span>
                  <span><strong>個人的な体験と感覚を大切にする</strong></span>
                </p>
              </div>
            </div>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                このサイトは、<strong>ただ和訳する場所ではありません</strong>。
                歌を知り、考察し、その歌への「愛」を言語化する場所です。
              </p>
              <p>
                ライブで見たときの感動、口ずさむとき、どう歌うと楽しいか、誰かと語ったり、調べたりして得た気づき——
                そうした<strong>個人的な体験を共有する場所</strong>です。
              </p>
            </div>
          </div>

          {/* 3. このサイトの思い（スタンス・価値観） */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-gray-900">このサイトの思い</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                歌を知ること、アーティストを知ること、その人と良い距離でいること——
                それが、<strong>心地よく愛するための方法</strong>だと思っています。
              </p>
              <p>
                このサイトは、歌詞を「翻訳」するのではなく、<strong>「なぜその音楽を愛するのか」を言語化する</strong>場所です。
                ライブで聴いた時の感動、カラオケで歌った時の発見、友人と語り合った時の気づき——
                そうした個人的な体験を通して、音楽への愛を深めていきます。
              </p>
              <p className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <strong className="text-blue-900">音楽を愛する人が増えてほしい。</strong><br />
                アーティストや曲を、もっと深く愛せる人が増えてほしい。<br />
                このサイトが、そのきっかけになればいい——そんな思いで運営しています。
              </p>
            </div>
          </div>
        </section>

        {/* トップページの広告 */}
        {/* TODO: AdSense管理画面で広告ユニットを作成し、スロットIDを取得して設定してください */}
        {/* <AdSenseUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || "YOUR_SLOT_ID_HERE"} /> */}
      </main>
    </div>
  );
}

