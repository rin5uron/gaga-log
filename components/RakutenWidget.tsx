"use client";

import { useEffect, useRef } from "react";

/**
 * 楽天モーションウィジェット（A8.net版）
 * グローバル変数をセットしてからスクリプトを読み込む。
 * スクリプトが自分でウィジェットをDOMに挿入する。
 */
export default function RakutenWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    const win = window as unknown as Record<string, unknown>;
    win.rakuten_affiliateId = "0ea62065.34400275.0ea62066.204f04c0";
    win.rakuten_items = "ranking";
    win.rakuten_genreId = "0";
    win.rakuten_recommend = "on";
    win.rakuten_design = "slide";
    win.rakuten_size = "728x90";
    win.rakuten_target = "_blank";
    win.rakuten_border = "off";
    win.rakuten_auto_mode = "off";
    win.rakuten_adNetworkId = "a8Net";
    win.rakuten_adNetworkUrl = "https%3A%2F%2Frpx.a8.net%2Fsvt%2Fejp%3Fa8mat%3D4AX6CG%2BBUAEOQ%2B2HOM%2BBS629%26rakuten%3Dy%26a8ejpredirect%3D";
    win.rakuten_pointbackId = "a26020876785_4AX6CG_BUAEOQ_2HOM_BS629";
    win.rakuten_mediaId = "20011816";

    const script = document.createElement("script");
    script.src = "https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js";
    script.async = false;
    containerRef.current.appendChild(script);

    // トラッキングピクセル
    const pixel = document.createElement("img");
    pixel.src = "https://www10.a8.net/0.gif?a8mat=4AX6CG+BUAEOQ+2HOM+BS629";
    pixel.width = 1;
    pixel.height = 1;
    pixel.style.border = "0";
    pixel.alt = "";
    containerRef.current.appendChild(pixel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto px-4 py-4 flex justify-center"
    />
  );
}
