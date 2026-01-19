import Image from "next/image";
import { Metadata } from "next";
import DateInfo from "@/components/DateInfo";

export const metadata: Metadata = {
  title: "運営者情報 | How Sound Feels",
  description: "How Sound Feelsの運営者情報。STUDIO Jinseiが運営する音楽ブログ。音を慈しみ、声を愛する。",
  keywords: ["運営者情報", "STUDIO Jinsei", "How Sound Feels", "音楽ブログ"],
  openGraph: {
    title: "運営者情報 | How Sound Feels",
    description: "How Sound Feelsの運営者情報。STUDIO Jinseiが運営する音楽ブログ。",
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
        <h1 className="text-4xl font-bold mb-8">運営者情報</h1>

        <div className="space-y-12">
          <section className="flex flex-col md:flex-row gap-8 items-center md:items-start">
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
