export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">お問い合わせ</h1>

        <div className="space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed">
              当サイトに関するご質問、ご意見、著作権に関するお問い合わせなどは、以下のメールアドレスまでお願いいたします。
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">メールアドレス</h2>
            <p className="text-gray-700">
              <a href="mailto:contact@studiojinsei.com" className="text-blue-600 hover:underline text-lg">
                contact@studiojinsei.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">お問い合わせについて</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>お問い合わせへの返信には数日かかる場合がございます。</li>
              <li>内容によっては回答できない場合もございますので、予めご了承ください。</li>
              <li>著作権・肖像権に関するお問い合わせには迅速に対応いたします。</li>
            </ul>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">運営者情報</h2>
            <p className="text-gray-700">
              詳しい運営者情報は
              <a href="/about" className="text-blue-600 hover:underline ml-1">
                運営者情報ページ
              </a>
              をご覧ください。
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
