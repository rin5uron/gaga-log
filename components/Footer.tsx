import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex flex-wrap gap-6 justify-center text-sm text-gray-600">
          <Link href="/about" className="hover:text-gray-900">
            運営者情報
          </Link>
          <Link href="/contact" className="hover:text-gray-900">
            お問い合わせ
          </Link>
          <Link href="/privacy" className="hover:text-gray-900">
            プライバシーポリシー
          </Link>
        </nav>
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>&copy; 2025 Studio Jinsei. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
