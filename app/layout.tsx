import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How Sound Feels",
  description: "音を慈しむ。声を愛する。歌詞の意味を解説するだけでなく、その言葉、音、雰囲気、いろんなものを記録する場所",
  metadataBase: new URL('https://sound-feels.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

