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

      // section-subtitleが含まれている場合、サブタイトルのみを抽出
      const subtitleMatch = text.match(/[\s\S]*?([ぁ-んァ-ヶー一-龠]+.*)/);
      const displayText = subtitleMatch ? subtitleMatch[1].trim() : text;

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
      <h2 className="text-lg font-bold mb-4 text-gray-900">
        この記事でわかること
      </h2>
      <ul className="space-y-2.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "ml-6" : ""}
          >
            <a
              href={`#${heading.id}`}
              className={`flex items-start gap-2 py-1 text-gray-700 hover:text-blue-600 transition-colors group ${
                activeId === heading.id ? "text-blue-600 font-semibold" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <span className="text-gray-400 mt-0.5 flex-shrink-0">
                {heading.level === 2 ? "·" : "—"}
              </span>
              <span className="group-hover:underline">{heading.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
