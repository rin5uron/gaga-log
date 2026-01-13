import Script from "next/script";

/**
 * AdSense自動広告コンポーネント
 * 
 * beforeInteractive戦略を使用して、headセクションにスクリプトを配置します。
 * これにより、AdSenseの自動広告が正しく動作します。
 */
export default function AdSense() {
  return (
    <Script
      id="adsbygoogle-init"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6439411211038936"
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}



