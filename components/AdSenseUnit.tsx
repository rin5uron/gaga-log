"use client";

import Script from "next/script";
import { useEffect } from "react";

interface AdSenseUnitProps {
  /**
   * 広告スロットID（AdSense管理画面で取得）
   * 例: "1234567890"
   */
  adSlot: string;
  /**
   * 広告のスタイル
   * "display" または "in-article" など
   */
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  /**
   * レスポンシブ対応
   */
  responsive?: boolean;
  /**
   * 広告のサイズ（adFormat="auto"の場合は不要）
   */
  adStyle?: React.CSSProperties;
}

/**
 * AdSense広告ユニットコンポーネント
 * 
 * 使い方:
 * 1. AdSense管理画面で広告ユニットを作成
 * 2. 広告スロットIDを取得
 * 3. このコンポーネントにadSlotプロパティを渡す
 * 
 * 例:
 * <AdSenseUnit adSlot="1234567890" />
 */
export default function AdSenseUnit({
  adSlot,
  adFormat = "auto",
  responsive = true,
  adStyle,
}: AdSenseUnitProps) {
  useEffect(() => {
    try {
      // 広告を初期化
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense initialization error:", err);
    }
  }, []);

  return (
    <div className="adsense-wrapper my-8">
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...adStyle,
        }}
        data-ad-client="ca-pub-6439411211038936"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
      <Script
        id={`adsbygoogle-init-${adSlot}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({});
          `,
        }}
      />
    </div>
  );
}


