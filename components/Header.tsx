import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-block hover:opacity-70 transition-opacity">
            <h1 className="text-xl font-bold">How Sound Feels</h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/#search"
              className="text-sm text-gray-700 hover:text-black transition-colors font-medium"
            >
              曲を探す
            </Link>
            <Link
              href="/#about"
              className="text-sm text-gray-700 hover:text-black transition-colors font-medium"
            >
              このサイトについて
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
