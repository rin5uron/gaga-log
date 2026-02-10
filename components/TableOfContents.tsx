"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number; // 0 = ラベル, 2 = H2, 3 = H3
  isLabel?: boolean;
}

export default function TableOfContents({
  html,
  includeH2Links = false,
  variant = "default",
}: {
  html: string;
  includeH2Links?: boolean;
  variant?: "default" | "card" | "minimal" | "kakejiku";
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // HTMLから見出しとラベルを抽出
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // .section-label と h2, h3 を順番通りに取得
    const allElements = tempDiv.querySelectorAll(".section-label, h2, h3");
    const extractedHeadings: Heading[] = [];
    let referencesReached = false;
    let headingIndex = 0; // h2, h3のみに使うインデックス
    let labelIndex = 0; // ラベル用のインデックス

    allElements.forEach((element) => {
      const text = element.textContent || "";

      // .section-label の場合
      if (element.classList.contains("section-label")) {
        // label-subtitle のspanがあればその内容を取得
        const spanElement = element.querySelector(".label-subtitle");
        const displayText = spanElement?.textContent?.trim() || text.trim();
        
        // 参考情報ラベルに到達したら終了
        if (displayText === "参考情報" || text.includes("参考情報") || text.includes("References")) {
          referencesReached = true;
          return;
        }
        if (referencesReached) return;

        extractedHeadings.push({
          id: `label-${labelIndex}`,
          text: displayText,
          level: 0, // ラベル
          isLabel: true,
        });
        labelIndex++;
        return;
      }

      // h2, h3 の場合
      const heading = element as HTMLElement;
      
      // section-subtitleのspan要素があれば、その内容だけを抽出
      const spanElement = heading.querySelector(".section-subtitle");
      let displayText = text.trim();

      if (spanElement && spanElement.textContent) {
        displayText = spanElement.textContent.trim();
      }

      // 「目次」見出しは目次リストに含めない
      if (displayText === "目次") return;
      // 参考情報セクション以降は目次に含めない
      if (displayText === "参考情報" || text.includes("参考情報") || text.includes("References")) {
        referencesReached = true;
        return;
      }
      if (referencesReached) return;

      // H3の除外リスト
      const excludedH3Texts = [
        "MAYHEMを体現した世界ツアー",
      ];
      if (parseInt(heading.tagName[1]) === 3 && excludedH3Texts.some(excluded => text.includes(excluded))) {
        return;
      }

      const id = `heading-${headingIndex}`;

      extractedHeadings.push({
        id,
        text: displayText,
        level: parseInt(heading.tagName[1]),
        isLabel: false,
      });
      headingIndex++;
    });

    setHeadings(extractedHeadings);

    // 実際のDOMに見出しIDを適用（ラベルは除く、h2とh3のみ）
    const actualHeadings = document.querySelectorAll(".post-content h2, .post-content h3");
    let actualIndex = 0;
    actualHeadings.forEach((heading) => {
      // .references-section 内の見出しはスキップ
      if (heading.closest(".references-section")) return;
      heading.id = `heading-${actualIndex}`;
      actualIndex++;
    });

    // スクロール時のアクティブな見出しを追跡
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
      }
    );

    actualHeadings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      actualHeadings.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, [html]);

  if (headings.length === 0) {
    return null;
  }

  const content = (
    <nav className={
      variant === "card" ? "toc-card-nav" : 
      variant === "minimal" ? "toc-minimal-nav" :
      variant === "kakejiku" ? "toc-kakejiku-nav" :
      "mb-4"
    }>
      <ul className={`pt-0.5 sm:pt-1 pb-0 space-y-0 list-none mb-0 ${
        variant === "card" ? "pl-0 px-0" : 
        variant === "minimal" ? "pl-0 px-0" :
        variant === "kakejiku" ? "pl-0 px-0" :
        "px-2 pl-0"
      }`}>
          {headings.map((heading) => {
            // ラベル（level 0）の場合
            if (heading.isLabel) {
              return (
                <li key={heading.id} className={
                  variant === "kakejiku" ? "" : "mt-1 first:mt-0 sm:mt-1.5"
                }>
                  <div className={variant === "kakejiku" ? "toc-label py-0.5" : "toc-heading-h2 py-0.5"}>
                    {heading.text}
                  </div>
                </li>
              );
            }
            
            // H2の場合（以前のH3のようにインデント表示）
            if (heading.level === 2) {
              return (
                <li key={heading.id} className={
                  variant === "kakejiku" ? "" : "ml-2 sm:ml-4"
                }>
                  <a
                    href={`#${heading.id}`}
                    className={`block py-0.5 pr-2 ${variant === "kakejiku" ? "toc-heading-h2" : "toc-heading-h3"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            }
            
            // H3の場合（さらにインデント）
            return (
              <li key={heading.id} className={
                variant === "kakejiku" ? "" : "ml-4 sm:ml-8"
              }>
                <a
                  href={`#${heading.id}`}
                  className="block py-0.5 pr-2 toc-heading-h3"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );

  if (variant === "card") {
    return <div className="toc-card">{content}</div>;
  }
  
  if (variant === "minimal") {
    return (
      <div className="toc-minimal">
        <div className="toc-title">目次</div>
        {content}
      </div>
    );
  }
  
  if (variant === "kakejiku") {
    return (
      <div className="toc-kakejiku">
        <div className="toc-kakejiku-header">目次</div>
        <div className="toc-kakejiku-body">
          {content}
        </div>
      </div>
    );
  }
  
  return content;
}
