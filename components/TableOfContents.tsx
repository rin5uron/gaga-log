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

    headingElements.forEach((heading, index) => {
      const text = heading.textContent || "";

      // section-subtitleのspan要素があれば、その内容だけを抽出
      const spanElement = heading.querySelector(".section-subtitle");
      let displayText = text;

      if (spanElement && spanElement.textContent) {
        displayText = spanElement.textContent.trim();
      } else {
        // spanがない場合、日本語部分を抽出（後方互換性）
        const subtitleMatch = text.match(/[\s\S]*?([ぁ-んァ-ヶー一-龠]+.*)/);
        displayText = subtitleMatch ? subtitleMatch[1].trim() : text;
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
    <nav className="mb-6 rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-white flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          目次
        </h2>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
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
        <ul className="px-4 py-2 space-y-0.5 pl-0 list-none bg-white border-t border-gray-100">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? "ml-4" : ""}
            >
              {heading.level === 2 ? (
                // h2はリンクなし、セクション見出し
                <div className="py-1 text-sm font-bold text-gray-800 border-l-3 border-gray-400 pl-3 mt-2 first:mt-0">
                  {heading.text}
                </div>
              ) : (
                // h3のみリンク化
                <a
                  href={`#${heading.id}`}
                  className={`block py-0.5 pl-3 text-sm transition-all ${
                    activeId === heading.id
                      ? "text-gray-900 font-medium border-l-2 border-gray-600"
                      : "text-gray-600 hover:text-gray-900 border-l-2 border-transparent hover:border-gray-400"
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
