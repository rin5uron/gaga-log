import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AdSense from "@/components/AdSense";

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
        {/* 楽天A8広告 - フッター直上・全ページ共通 */}
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-center">
          <a
            href="https://rpx.a8.net/svt/ejp?a8mat=4AX6CG+BUAEOQ+2HOM+67JU9&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26020876785_4AX6CG_BUAEOQ_2HOM_67JU9%3Fpc%3Dhttp%253A%252F%252Fwww.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252F"
            rel="nofollow"
            target="_blank"
          >
            <img
              src="http://hbb.afl.rakuten.co.jp/hsb/0eb4bbbd.6b1108be.0eb4bbaa.95151395/"
              border={0}
              alt="楽天"
            />
          </a>
          <img
            border={0}
            width={1}
            height={1}
            src="https://www12.a8.net/0.gif?a8mat=4AX6CG+BUAEOQ+2HOM+67JU9"
            alt=""
          />
        </div>
        <Footer />
      </body>
    </html>
  );
}

