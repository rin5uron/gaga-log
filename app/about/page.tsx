import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">運営者情報</h1>

        <div className="space-y-12">
          <section className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <Image
                src="/images/profile.png"
                alt="運営者プロフィール写真"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-4">屋号</h2>
              <p className="text-gray-700 text-lg mb-6">
                Studio Jinsei
              </p>

              <h2 className="text-2xl font-semibold mb-4">サイト名</h2>
              <p className="text-gray-700 text-lg mb-6">
                How This Song Feels
              </p>

              <h2 className="text-2xl font-semibold mb-4">URL</h2>
              <p className="text-gray-700 mb-6">
                <a
                  href="https://studiojinsei.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://studiojinsei.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">サイトについて</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              このサイトは、歌詞の意味を解説するのではなく、
              <strong>「なぜその言葉に惹かれたのか」を記録する</strong>場所です。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              他人に向けて"売る"のではなく、自分のために"残す"。
              正解を提示するのではなく、個人的な感覚を言語化する。
              結果として、同じ温度の人が読む。
            </p>
            <p className="text-gray-700 leading-relaxed">
              そんなアーカイブを目指しています。
            </p>
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
            <p className="text-gray-700">
              メール：
              <a href="mailto:contact@studiojinsei.com" className="text-blue-600 hover:underline ml-1">
                contact@studiojinsei.com
              </a>
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
          <p className="text-gray-600">
            最終更新日：2025年12月27日
          </p>
        </div>
      </main>
    </div>
  );
}
