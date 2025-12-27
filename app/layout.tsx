import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "How this song feels",
  description: "人生で出会った曲をそっと残す記録",
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

