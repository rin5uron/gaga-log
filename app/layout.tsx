import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "How this song feels",
  description: "「ある言葉に、なぜ惹かれたか」を残す記録 = 私の愛のログ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}

