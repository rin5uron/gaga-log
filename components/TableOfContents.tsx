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
  variant?: "default" | "card";
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  /** 目次の開閉。true=開いている / false=閉じている。スライダーの表示・非表示に使う */
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    <nav className={variant === "card" ? "toc-card-nav" : "mb-4 overflow-hidden"}>
      {/* スライダー用：開閉トグルボタン。クリックで isOpen を反転 → 下の toc-list-inner が開く/閉じる */}
      {/* justify-start：左寄せ　justify-end：右寄せ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center transition-colors ${
          variant === "card"
            ? "w-full justify-end px-0 py-1 hover:opacity-80"
            : "w-fit justify-end gap-2 px-2 py-2 hover:bg-gray-100"
        }`}
      >
        {/* <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
          目次
        </h2> */}
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* スライダー本体：開いているときは表示（opacity-100）、閉じているときは高さ0＋透明（max-h-0 opacity-0）。
          transition-all duration-300 で約300msかけて開閉アニメーションする。globals.css の .toc-list-inner で max-height も指定されている場合あり。 */}
      <div
        className={`toc-list-inner transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <ul className={`pt-1 pb-0 space-y-0 list-none mb-0 ${
          variant === "card" ? "pl-0 px-0" : "px-2 pl-0"
        }`}>
          {headings.map((heading) => {
            // ラベル（level 0）の場合
            if (heading.isLabel) {
              return (
                <li key={heading.id} className="mt-1.5 first:mt-0">
                  <div className="toc-heading-h2 py-0.5">
                    {heading.text}
                  </div>
                </li>
              );
            }
            
            // H2の場合（以前のH3のようにインデント表示）
            if (heading.level === 2) {
              return (
                <li key={heading.id} className="ml-4">
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
            }
            
            // H3の場合（さらにインデント）
            return (
              <li key={heading.id} className="ml-8">
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
      </div>
    </nav>
  );

  if (variant === "card") {
    return <div className="toc-card">{content}</div>;
  }
  return content;
}
