import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-8">記事が見つかりませんでした</p>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          一覧に戻る
        </Link>
      </div>
    </div>
  );
}

