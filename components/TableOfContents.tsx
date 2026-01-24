"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ html }: { html: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
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

      // 参考情報セクション以降は目次に含めない（h2 とその下の h3 すべて）
      if (displayText === "参考情報" || text.includes("参考情報") || text.includes("References")) {
        referencesReached = true;
        return;
      }
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

  return (
    <nav className="mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-fit px-2 py-2 flex items-center justify-between gap-2 hover:bg-gray-100 transition-colors"
      >
        <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
          目次
        </h2>
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

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <ul className="px-2 pt-2 pb-0 space-y-0.5 pl-0 list-none mb-0">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? "ml-4" : ""}
            >
              {heading.level === 2 ? (
                <div className="toc-heading-h2 py-1.5 mt-2 first:mt-0">
                  {heading.text}
                </div>
              ) : (
                <a
                  href={`#${heading.id}`}
                  className={`block py-1 pr-2 transition-all toc-heading-h3 ${
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
}
