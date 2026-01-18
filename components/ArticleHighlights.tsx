"use client";

interface ArticleHighlightsProps {
  highlights: string[];
}

export default function ArticleHighlights({ highlights }: ArticleHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        この記事でわかること
      </h2>
      <ul className="space-y-2.5 pl-0 list-none">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span className="text-gray-400 text-base mt-0.5 flex-shrink-0">•</span>
            <span className="text-gray-800 text-sm leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
