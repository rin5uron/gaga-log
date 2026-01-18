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
    <nav className="mb-8 rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between hover:from-gray-100 hover:to-gray-50 transition-all"
      >
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-xl">📖</span>
          <span>この記事でわかること</span>
        </h2>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform ${
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
        <ul className="px-6 py-4 space-y-1 pl-0 list-none bg-white">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? "ml-6" : ""}
            >
              {heading.level === 2 ? (
                // h2はリンクなし、セクション見出し
                <div className="py-2 text-sm font-bold text-gray-800 border-l-4 border-gray-300 pl-3 mt-3 first:mt-0">
                  {heading.text}
                </div>
              ) : (
                // h3のみリンク化
                <a
                  href={`#${heading.id}`}
                  className={`block py-1.5 pl-3 text-sm transition-all rounded-md ${
                    activeId === heading.id
                      ? "bg-gray-100 text-gray-900 font-semibold border-l-2 border-gray-800"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-l-2 border-transparent"
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
