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
    <nav className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="text-[11px] font-semibold mb-3 text-gray-600 uppercase tracking-wide">
        この記事でわかること
      </h2>
      <ul className="space-y-1.5 pl-0 list-none">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "ml-4" : ""}
          >
            {heading.level === 2 ? (
              // h2はリンクなし、ただのテキスト
              <div className="py-1 text-[11px] text-gray-900 font-semibold">
                {heading.text}
              </div>
            ) : (
              // h3のみリンク化
              <a
                href={`#${heading.id}`}
                className={`block py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors ${
                  activeId === heading.id ? "font-semibold" : ""
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
    </nav>
  );
}
