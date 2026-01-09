import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link href="/" className="inline-block hover:opacity-70 transition-opacity">
            <h1 className="text-2xl font-bold">How Sound Feels</h1>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors sm:ml-4"
          >
            一覧
          </Link>
        </div>
      </div>
    </header>
  );
}
