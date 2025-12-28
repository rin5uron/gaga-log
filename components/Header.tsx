import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link href="/" className="inline-block hover:opacity-70 transition-opacity">
          <h1 className="text-2xl font-bold">How This Song Feels</h1>
        </Link>
      </div>
    </header>
  );
}
