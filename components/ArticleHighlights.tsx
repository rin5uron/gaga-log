"use client";

interface ArticleHighlightsProps {
  highlights: string[];
}

export default function ArticleHighlights({ highlights }: ArticleHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📌</span>
        <h2 className="text-lg font-bold text-gray-800">この記事でわかること</h2>
      </div>
      <ul className="space-y-3 pl-0 list-none">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-blue-600 text-lg mt-0.5 flex-shrink-0">✓</span>
            <span className="text-gray-700 leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
