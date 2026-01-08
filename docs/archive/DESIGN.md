# デザイン設定

このドキュメントは、gaga-logのデザインとスタイリングの設定をまとめています。

## タイポグラフィ（文字サイズ）

### デスクトップ
- **ページタイトル (h1)**: `text-5xl` (3rem / 48px) - 記事の曲名タイトル
- **セクションタイトル (h2)**: `text-2xl` (1.5rem / 24px) - About, Lyrics, Favorite Lines など
- **セクションサブタイトル (h2 span.section-subtitle)**: `0.95rem` (約15px) - 歌詞のポイント、口ずさみたいフレーズ など
- **本文サブタイトル (h3)**: `text-lg` (1.125rem / 18px) - セクション内のサブ見出し
- **本文**: デフォルト (1rem / 16px)
- **引用 (blockquote)**: `1.25rem` (20px), `font-weight: 600`

### スマホ (768px以下)
- **ページタイトル (h1)**: `2rem` (32px)
- **セクションタイトル (h2)**: `1.5rem` (24px)
- **セクションサブタイトル**: `0.75rem` (12px), 改行なし
- **引用 (blockquote)**: `1.1rem` (約17.6px), `font-weight: 400`, イタリック体

## 余白（スペーシング）

### セクション間
- **h2セクション間**: `margin-top: 6rem` (96px) + `padding-top: 1.5rem` (24px)
- **最初のh2**: `margin-top: 4rem` (64px)
- **h3サブタイトル**: `margin-top: 3rem` (48px)

### ページ構成
- **一覧に戻る → ページタイトル**: `mb-4` (16px)
- **ページタイトル → YouTube**: `mb-3` (12px)
- **YouTube → アーティスト情報**: `mb-3` (12px)
- **アーティスト情報 → サブスクアイコン**: `mb-2` (8px)
- **サブスクアイコン → 本文**: `mb-4` (16px)
- **ヘッダー全体の下**: `mb-6` (24px)

### 引用
- **上マージン**: `1.5rem` (24px)
- **下マージン**: `0`
- **左右パディング**: `1.5rem` (24px)
- **上下パディング**: `0`

## カラー

### 引用 (blockquote)
- **ボーダー**: `#9ca3af` (gray-400)
- **背景**: `#f3f4f6` (gray-100)
- **テキスト**: `#111827` (gray-900)

### セクションサブタイトル
- **テキスト**: `#6b7280` (gray-500)

### 本文サブタイトル (h3)
- **テキスト**: `#374151` (gray-700)

### セクション区切り線
- **ボーダー**: `#e5e7eb` (gray-200)

## レイアウト

### YouTube動画
- **最大幅**: `672px` (max-w-2xl)
- **アスペクト比**: `16 / 9`
- **角丸**: `8px`

### 記事全体
- **最大幅**: `max-w-7xl`
- **パディング**: `px-4`

## 特殊なスタイリング

### 引用ボックス
```css
.prose blockquote {
  border-left: 8px solid #9ca3af;
  background-color: #f3f4f6;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  color: #111827;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  font-style: normal;
  border-radius: 0 8px 8px 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 1.5rem;
  margin-bottom: 0;
}
```

スマホ版:
```css
@media (max-width: 768px) {
  .prose blockquote {
    font-size: 1.1rem;
    font-weight: 400;
    font-style: italic;
  }
}
```

### セクションタイトル
```css
.post-content h2 {
  margin-top: 6rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.post-content h2:first-of-type {
  margin-top: 4rem;
}
```

### セクションサブタイトル
```css
.prose h2 .section-subtitle {
  font-size: 0.95rem;
  font-weight: 400;
  color: #6b7280;
  margin-left: 1rem;
  letter-spacing: 0.025em;
  vertical-align: middle;
}
```

## デザイン変更時の注意

- 基本的なスタイリングは `/app/globals.css` で一括管理
- 変更する場合は、このドキュメントも合わせて更新すること
- レスポンシブ対応は `@media (max-width: 768px)` で定義
