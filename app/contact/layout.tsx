import { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | How Sound Feels",
  description: "How Sound Feelsへのお問い合わせフォーム。サイトに関するご質問、ご意見、著作権に関するお問い合わせはこちらから。",
  keywords: ["お問い合わせ", "コンタクト", "contact"],
  openGraph: {
    title: "お問い合わせ | How Sound Feels",
    description: "How Sound Feelsへのお問い合わせフォーム。",
    url: "https://sound-feels.com/contact",
    siteName: "How Sound Feels",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: "https://sound-feels.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
