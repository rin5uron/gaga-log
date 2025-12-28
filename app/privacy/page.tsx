export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">プライバシーポリシー</h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4">個人情報の利用目的</h2>
            <p>
              当サイトでは、お問い合わせの際に氏名・メールアドレス等の個人情報をご入力いただく場合がございます。
              取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メール等でご連絡する場合に利用させていただくものであり、
              これらの目的以外では利用いたしません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">広告について</h2>
            <p>
              当サイトでは、第三者配信の広告サービス（Google AdSense）を利用しています。
              このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、
              当サイトや他サイトへのアクセスに関する情報「Cookie」（氏名、住所、メールアドレス、電話番号は含まれません）を使用することがあります。
            </p>
            <p className="mt-4">
              Googleによるデータの使用については、
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                ポリシーと規約
              </a>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">アクセス解析ツールについて</h2>
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。
              このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。
              このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">免責事項</h2>
            <p>
              当サイトに掲載されている情報の正確性には万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について、
              当サイトは一切の責任を負いません。
            </p>
            <p className="mt-4">
              当サイトは、利用者が当サイトを利用したことにより生じた利用者の損害及び利用者が第三者に与えた損害について、
              一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">著作権・肖像権について</h2>
            <p>
              当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。
              当サイトは著作権や肖像権の侵害を目的としたものではありません。
              著作権や肖像権に関して問題がございましたら、お問い合わせフォームよりご連絡ください。迅速に対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">リンクについて</h2>
            <p>
              当サイトは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。
              ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">プライバシーポリシーの変更について</h2>
            <p>
              当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、
              本ポリシーの内容を適宜見直しその改善に努めます。
              修正された最新のプライバシーポリシーは常に本ページにて開示されます。
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            制定日：2025年12月27日<br />
            最終更新日：2025年12月27日
          </p>
        </div>
      </main>
    </div>
  );
}
