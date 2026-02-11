import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AdSense from "@/components/AdSense";
import RakutenWidget from "@/components/RakutenWidget";

export const metadata: Metadata = {
  title: {
    default: "How Sound Feels - 音を慈しむ、声を愛する音楽ブログ",
    template: "%s | How Sound Feels",
  },
  description: "音を慈しむ。声を愛する。歌詞の意味を解説するだけでなく、その言葉、音、雰囲気、そうしたものを記録する場所",
  keywords: ["音楽", "歌詞", "解説", "レビュー", "Lady Gaga", "Ariana Grande", "Ed Sheeran"],
  authors: [{ name: "STUDIO Jinsei" }],
  metadataBase: new URL('https://sound-feels.com'),
  openGraph: {
    title: "How Sound Feels - 音を慈しむ、声を愛する音楽ブログ",
    description: "音を慈しむ。声を愛する。歌詞の意味を解説するだけでなく、その言葉、音、雰囲気、そうしたものを記録する場所",
    url: "https://sound-feels.com",
    siteName: "How Sound Feels",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Sound Feels - 音を慈しむ、声を愛する音楽ブログ",
    description: "音を慈しむ。声を愛する。歌詞の意味を解説するだけでなく、その言葉、音、雰囲気、そうしたものを記録する場所",
  },
  alternates: {
    canonical: "https://sound-feels.com",
  },
  // AdSenseの所有権確認メタタグ（AdSense管理画面で取得した値に置き換えてください）
  // verification: {
  //   google: "AdSense管理画面で取得した確認コード",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <AdSense />
        <GoogleAnalytics />
        <Header />
        {children}
        {/* 楽天A8バナー（常に表示・スクリプトと別なので消えない） */}
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center">
          <a
            href="https://rpx.a8.net/svt/ejp?a8mat=4AX6CG+BUAEOQ+2HOM+BS629&rakuten=y&a8ejpredirect="
            rel="nofollow"
            target="_blank"
            className="block"
          >
            <img
              src="https://hbb.afl.rakuten.co.jp/hsb/0eb4bbbd.6b1108be.0eb4bbaa.95151395/"
              alt="楽天市場"
              width={728}
              height={90}
              style={{ border: 0 }}
            />
          </a>
          <img
            width={1}
            height={1}
            src="https://www10.a8.net/0.gif?a8mat=4AX6CG+BUAEOQ+2HOM+BS629"
            alt=""
            style={{ border: 0 }}
          />
        </div>
        {/* 楽天ウィジェット用スクリプト（バナーとは別要素） */}
        <RakutenWidget />
        <Footer />
      </body>
    </html>
  );
}

