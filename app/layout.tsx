import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "How Sound Feels - 音を慈しむ、声を愛する音楽ブログ",
    template: "%s | How Sound Feels",
  },
  description: "音を慈しむ。声を愛する。歌詞の意味を解説するだけでなく、その言葉、音、雰囲気、いろんなものを記録する場所",
  keywords: ["音楽", "歌詞", "解説", "レビュー", "Lady Gaga", "Ariana Grande", "Ed Sheeran"],
  authors: [{ name: "STUDIO Jinsei" }],
  metadataBase: new URL('https://sound-feels.com'),
  openGraph: {
    title: "How Sound Feels - 音を慈しむ、声を愛する音楽ブログ",
    description: "音を慈しむ。声を愛する。歌詞の意味を解説するだけでなく、その言葉、音、雰囲気、いろんなものを記録する場所",
    url: "https://sound-feels.com",
    siteName: "How Sound Feels",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Sound Feels - 音を慈しむ、声を愛する音楽ブログ",
    description: "音を慈しむ。声を愛する。歌詞の意味を解説するだけでなく、その言葉、音、雰囲気、いろんなものを記録する場所",
  },
  alternates: {
    canonical: "https://sound-feels.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9JL8S192TL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9JL8S192TL');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

