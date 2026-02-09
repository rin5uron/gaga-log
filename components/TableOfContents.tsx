"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
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
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    // HTMLから見出しを抽出
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const headingElements = tempDiv.querySelectorAll("h2, h3");
    const extractedHeadings: Heading[] = [];
    let referencesReached = false;

    headingElements.forEach((heading, index) => {
      const text = heading.textContent || "";

      // section-subtitleのspan要素があれば、その内容だけを抽出
      const spanElement = heading.querySelector(".section-subtitle");
      let displayText = text.trim();

      if (spanElement && spanElement.textContent) {
        // h2のサブタイトル（例：この曲について）はspanの文言だけ使う
        displayText = spanElement.textContent.trim();
      }
      // h3やspanがないh2は本文の見出し全文を使う（"I'm your biggest fan"——ファンか、ストーカーか 等の歌詞入りもそのまま表示）

      // 「目次」見出しは目次リストに含めない
      if (displayText === "目次") return;
      // 参考情報セクション以降は目次に含めない（h2 とその下の h3 すべて）
      if (displayText === "参考情報" || text.includes("参考情報") || text.includes("References")) {
        referencesReached = true;
        return;
      }
      // .references-section 内の見出し（公式MV、その他 等）は目次に含めない
      if (heading.closest(".references-section")) return;
      if (referencesReached) return;

      // H3の除外リスト（目次に出さないH3）
      const excludedH3Texts = [
        "MAYHEMを体現した世界ツアー",
        "MAYHEMを体現した世界ツアー",
      ];
      if (parseInt(heading.tagName[1]) === 3 && excludedH3Texts.some(excluded => text.includes(excluded))) {
        return;
      }

      const id = `heading-${index}`;
      heading.id = id;

      extractedHeadings.push({
        id,
        text: displayText,
        level: parseInt(heading.tagName[1]),
      });
    });

    setHeadings(extractedHeadings);

    // 実際のDOMに見出しIDを適用
    const actualHeadings = document.querySelectorAll(".post-content h2, .post-content h3");
    actualHeadings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
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
        <ul className={`pt-2 pb-0 space-y-0.5 list-none mb-0 ${
          variant === "card" ? "pl-0 px-0" : "px-2 pl-0"
        }`}>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? "ml-4" : ""}
            >
              {heading.level === 2 && !includeH2Links ? (
                <div className="toc-heading-h2 py-1.5 mt-2 first:mt-0">
                  {heading.text}
                </div>
              ) : (
                <a
                  href={`#${heading.id}`}
                  className={`block py-1 pr-2 transition-all ${
                    heading.level === 2 ? "toc-heading-h2 py-1.5 mt-2 first:mt-0 " : "toc-heading-h3 "
                  }${
                    activeId === heading.id
                      ? "font-medium text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
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
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );

  if (variant === "card") {
    return <div className="toc-card">{content}</div>;
  }
  return content;
}
