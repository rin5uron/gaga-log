"use client";

interface ReferencesSectionProps {
  html: string;
}

/**
 * 参考情報セクションの共通コンポーネント。
 * globals.css の .post-content h2.references-section 等のスタイルが効くよう、
 * post-content でラップして表示する。
 */
export default function ReferencesSection({ html }: ReferencesSectionProps) {
  if (!html || !html.trim()) {
    return null;
  }

  return (
    <section
      className="post-content references-section-component mt-0"
      aria-label="参考情報"
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
