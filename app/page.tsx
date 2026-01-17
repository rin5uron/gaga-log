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
          <h2 className="text-2xl font-bold mb-6">このサイトについて</h2>
          {/* このサイトの独自性 */}
          <div className="bg-gray-50 border-l-4 border-gray-800 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              このサイトが他の歌詞サイトと違うこと
            </h3>
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

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              歌を知ること、アーティストを知ること、その人と良い距離でいること——
              それが、心地よく愛するための方法だと思っています。
            </p>
            <p>
              このサイトは、<strong className="text-gray-900">歌詞を「翻訳」するのではなく、「なぜその音楽を愛するのか」を言語化する</strong>場所です。
              ライブで聴いた時の感動、カラオケで歌った時の発見、友人と語り合った時の気づき——
              そうした個人的な体験を通して、音楽への愛を深めていきます。
            </p>
            <p>
              他の歌詞解説サイトは「正確な和訳」を提供します。
              でも、このサイトは違います。<strong className="text-gray-900">「その曲が、私にとってどんな意味を持つのか」</strong>を記録します。
            </p>
          
          </div>
        </section>

        {/* トップページの広告 */}
        {/* TODO: AdSense管理画面で広告ユニットを作成し、スロットIDを取得して設定してください */}
        {/* <AdSenseUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || "YOUR_SLOT_ID_HERE"} /> */}
      </main>
    </div>
  );
}

