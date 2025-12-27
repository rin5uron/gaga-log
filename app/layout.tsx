import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "音楽と言葉の記録サイト",
  description: "「ある言葉に、なぜ惹かれたか」を残す記録",
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

