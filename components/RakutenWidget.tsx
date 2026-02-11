"use client";

import { useEffect, useRef } from "react";

/**
 * 楽天アフィリエイト（フッター直上・全ページ共通）
 * ウィジェット用スクリプトは別の小さな要素にだけ差し込み、フォールバックはスクリプトの外で常に表示。
 */
export default function RakutenWidget() {
  const scriptContainerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    const win = typeof window === "undefined" ? null : (window as unknown as { rakuten_widget_loaded?: boolean });
    if (win?.rakuten_widget_loaded) return;
    loadedRef.current = true;

    (window as unknown as Record<string, string>).rakuten_affiliateId = "0ea62065.34400275.0ea62066.204f04c0";
    (window as unknown as Record<string, string>).rakuten_items = "ranking";
    (window as unknown as Record<string, string>).rakuten_genreId = "0";
    (window as unknown as Record<string, string>).rakuten_recommend = "on";
    (window as unknown as Record<string, string>).rakuten_design = "slide";
    (window as unknown as Record<string, string>).rakuten_size = "728x90";
    (window as unknown as Record<string, string>).rakuten_target = "_blank";
    (window as unknown as Record<string, string>).rakuten_border = "on";
    (window as unknown as Record<string, string>).rakuten_auto_mode = "on";
    (window as unknown as Record<string, string>).rakuten_adNetworkId = "a8Net";
    (window as unknown as Record<string, string>).rakuten_adNetworkUrl = "https%3A%2F%2Frpx.a8.net%2Fsvt%2Fejp%3Fa8mat%3D4AX6CG%2BBUAEOQ%2B2HOM%2BBS629%26rakuten%3Dy%26a8ejpredirect%3D";
    (window as unknown as Record<string, string>).rakuten_pointbackId = "a26020876785_4AX6CG_BUAEOQ_2HOM_BS629";
    (window as unknown as Record<string, string>).rakuten_mediaId = "20011816";

    const script = document.createElement("script");
    script.src = "https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js";
    script.async = false;
    script.onload = () => {
      (window as unknown as { rakuten_widget_loaded?: boolean }).rakuten_widget_loaded = true;
    };
    scriptContainerRef.current?.appendChild(script);
  }, []);

  return (
    <>
      {/* フォールバックだけの div（スクリプトの親にしない＝上書きされない） */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center">
        <a
          href="https://rpx.a8.net/svt/ejp?a8mat=4AX6CG+BUAEOQ+2HOM+BS629&rakuten=y&a8ejpredirect="
          rel="nofollow"
          target="_blank"
          className="block"
        >
          <img
            src="https://hbb.afl.rakuten.co.jp/hsb/0eb4bbbd.6b1108be.0eb4bbaa.95151395/"
            alt="楽天市場"
            width={728}
            height={90}
            style={{ border: 0 }}
          />
        </a>
        <img
          width={1}
          height={1}
          src="https://www19.a8.net/0.gif?a8mat=4AX6CG+BUAEOQ+2HOM+BS629"
          alt=""
          style={{ border: 0 }}
        />
      </div>
      {/* ウィジェット用スクリプトだけの div（ここが上書きされてもフォールバックは別要素なので残る） */}
      <div ref={scriptContainerRef} id="rakuten-widget-container" className="max-w-4xl mx-auto px-4 w-full flex justify-center" />
    </>
  );
}
