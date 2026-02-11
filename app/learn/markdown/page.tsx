import { Metadata } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { markdownToHtml } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "マークダウンで1ページ作る",
  description: "マークダウンを書いて、このサイトに実際に1ページ表示させる手順です。説明を読むだけでなく、自分でファイルを作って仕組みを体験できます。",
};

export default async function LearnMarkdownPage() {
  const docPath = path.join(process.cwd(), "docs", "learn", "markdown.md");
  const raw = fs.readFileSync(docPath, "utf8");
  const contentHtml = await markdownToHtml(raw);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            ホーム
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">マークダウンで1ページ作る</span>
        </nav>

        <article
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
    </div>
  );
}
