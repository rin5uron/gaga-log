/**
 * 楽天バナー（A8.net・静的画像リンク）
 * モーションウィジェットはNext.js非対応のため静的バナーを使用（issue #28）
 */
export default function RakutenWidget() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 flex justify-center">
      <a
        href="https://rpx.a8.net/svt/ejp?a8mat=4AX6CG+BUAEOQ+2HOM+62ENL&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26020876785_4AX6CG_BUAEOQ_2HOM_62ENL%3Fpc%3Dhttp%253A%252F%252Fwww.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Fm.rakuten.co.jp%252F"
        rel="nofollow"
        target="_blank"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="http://hbb.afl.rakuten.co.jp/hsb/0eb4bbde.06697bd8.0eb4bbaa.95151395/"
          style={{ border: 0 }}
          alt="楽天市場"
        />
      </a>
      {/* トラッキングピクセル */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ border: 0 }}
        width={1}
        height={1}
        src="https://www17.a8.net/0.gif?a8mat=4AX6CG+BUAEOQ+2HOM+62ENL"
        alt=""
      />
    </div>
  );
}
