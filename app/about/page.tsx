import Image from "next/image";
import { Metadata } from "next";
import DateInfo from "@/components/DateInfo";

export const metadata: Metadata = {
  title: "このサイトについて | How Sound Feels",
  description: "How Sound Feelsは、歌詞を「翻訳」するのではなく、「なぜその音楽を愛するのか」を言語化する場所です。音を慈しみ、声を愛する。",
  keywords: ["運営者情報", "STUDIO Jinsei", "How Sound Feels", "音楽ブログ", "このサイトについて"],
  openGraph: {
    title: "このサイトについて | How Sound Feels",
    description: "How Sound Feelsは、歌詞を「翻訳」するのではなく、「なぜその音楽を愛するのか」を言語化する場所です。",
    url: "https://sound-feels.com/about",
    siteName: "How Sound Feels",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://sound-feels.com/about",
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">このサイトについて</h1>

        <div className="space-y-12">
          {/* このサイトの思い */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">このサイトの想い</h2>
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
          </section>

          {/* 他の歌詞・和訳サイトとの違い */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">他の歌詞・和訳サイトとの違い</h2>
            <div className="bg-gray-50 border-l-4 border-gray-800 p-6 mb-4 rounded-r-lg">
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span>歌詞を日本語に翻訳する</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">✗</span>
                  <span>歌詞の意味を辞書的に解説する</span>
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
          </section>

          {/* 運営者情報 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">運営者情報</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="flex-shrink-0">
              <a
                href="https://studiojinsei.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src="/images/logo-studdio-jinsei.png"
                  alt="STUDIO Jinsei"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </a>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm mb-2">運営</p>
              <p className="text-xl font-semibold mb-6">STUDIO Jinsei（個人事業）</p>

              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="text-gray-500 text-sm">サイトURL：</span>
                  <a
                    href="https://sound-feels.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-2"
                  >
                    https://sound-feels.com/
                  </a>
                </p>
                <p className="text-gray-700">
                  <span className="text-gray-500 text-sm">会社サイト：</span>
                  <a
                    href="https://studiojinsei.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-2"
                  >
                    https://studiojinsei.com
                  </a>
                </p>
              </div>
            </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">お問い合わせ</h2>
            <p className="text-gray-700 mb-4">
              サイトに関するご質問、ご意見、著作権に関するお問い合わせは
              <a href="/contact" className="text-blue-600 hover:underline ml-1">
                お問い合わせページ
              </a>
              よりお願いいたします。
            </p>
            
          
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">免責事項</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトに掲載されている情報の正確性には万全を期していますが、
              利用者が当サイトの情報を用いて行う一切の行為について、当サイトは一切の責任を負いません。
              詳しくは
              <a href="/privacy" className="text-blue-600 hover:underline ml-1">
                プライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <DateInfo
            date="2025-12-27"
            updatedDate="2025-12-27"
            className="text-gray-600 text-sm"
            showCreatedLabel={true}
            showUpdatedLabel={true}
            createdLabel="作成日"
            updatedLabel="最終更新日"
          />
        </div>
      </main>
    </div>
  );
}
