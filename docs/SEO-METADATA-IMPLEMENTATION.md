# SEOメタデータ実装ガイド

## 実装日
2026年1月5日

## 概要
全ページにSEO最適化されたメタデータを動的生成する仕組みを実装しました。

---

## 実装済みページ一覧

### ✅ 動的ページ（自動生成）

#### 1. 記事ページ（`/posts/[slug]`）
- **実装ファイル**: `app/posts/[slug]/page.tsx`
- **機能**: `generateMetadata()` 関数で各記事ごとに動的生成

**生成される内容:**
- **title**: `{曲名} - {アーティスト} | 歌詞の意味と解説 | How Sound Feels`
- **description**: `{アーティスト}の「{曲名}」の歌詞の意味を解説。音を慈しみ、声を愛する。その言葉、音、雰囲気を記録する。`
- **keywords**: アーティスト名、曲名、「歌詞」、「意味」、「解説」、「音楽」、「レビュー」、アルバム名
- **OGP**: title, description, url, type (article), publishedTime
- **Twitter Card**: summary_large_image
- **Canonical URL**: 重複コンテンツ対策

**記事タイプ別の出し分け:**
- 🎵 type: "song" → 「歌詞の意味と解説」
- 🎬 type: "movie" → 「映画・ドキュメンタリー解説」

#### 2. アーティストページ（`/artists/[name]`）
- **実装ファイル**: `app/artists/[name]/page.tsx`
- **機能**: `generateMetadata()` 関数でアーティストごとに動的生成

**生成される内容:**
- **title**: `{アーティスト名} - アーティスト情報と楽曲解説 | How Sound Feels`
- **description**: `{アーティスト名}の楽曲解説一覧（{記事数}件）。歌詞の意味、音の魅力を深掘り。`
- **keywords**: アーティスト名、「歌詞」、「解説」、「音楽」、「楽曲一覧」
- **OGP**: title, description, url, type (profile)
- **Twitter Card**: summary
- **Canonical URL**

### ✅ 静的ページ

#### 3. トップページ（`/`）
- **実装ファイル**: `app/layout.tsx`
- **title**: `How Sound Feels - 音を慈しむ、声を愛する音楽ブログ`
- **title template**: `%s | How Sound Feels` （子ページで使用）
- **OGP**: ✓
- **Twitter Card**: ✓

#### 4. About（`/about`）
- **実装ファイル**: `app/about/page.tsx`
- **title**: `運営者情報 | How Sound Feels`
- **description**: `How Sound Feelsの運営者情報。STUDIO Jinseiが運営する音楽ブログ。`

#### 5. Contact（`/contact`）
- **実装ファイル**: `app/contact/layout.tsx`
- **注意**: `page.tsx`が`"use client"`のため、`layout.tsx`に分離
- **title**: `お問い合わせ | How Sound Feels`
- **description**: `How Sound Feelsへのお問い合わせフォーム。サイトに関するご質問、ご意見、著作権に関するお問い合わせはこちらから。`

#### 6. Privacy（`/privacy`）
- **実装ファイル**: `app/privacy/page.tsx`
- **title**: `プライバシーポリシー | How Sound Feels`
- **description**: `How Sound Feelsのプライバシーポリシー。個人情報の取り扱い、Cookie、広告、免責事項について。`

---

## メタデータの構成

### 基本メタデータ
```typescript
{
  title: string,
  description: string,
  keywords: string[],
  authors: [{ name: "STUDIO Jinsei" }],
}
```

### OGP（Open Graph Protocol）
**対応サービス**: LINE、Facebook、Slack、Discord、LinkedIn、Pinterest、WhatsApp等

```typescript
openGraph: {
  title: string,
  description: string,
  url: string,
  siteName: "How Sound Feels",
  locale: "ja_JP",
  type: "article" | "profile" | "website",
  publishedTime?: string, // 記事のみ
  authors?: string[],     // 記事のみ
}
```

### Twitter Card
**対応サービス**: Twitter/X

```typescript
twitter: {
  card: "summary_large_image" | "summary",
  title: string,
  description: string,
  site: "@sound_feels", // オプション：Twitterアカウントがある場合
}
```

### Canonical URL
```typescript
alternates: {
  canonical: string,
}
```

---

## 技術的なポイント

### 1. `generateMetadata()`の使い方
Next.js App Routerでは、`generateMetadata()`関数をexportすると、サーバーサイドでメタデータが動的生成されます。

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: `${post.title} - ${post.artist}`,
    description: `...`,
    // ...
  };
}
```

### 2. クライアントコンポーネントでのメタデータ設定
`"use client"`があるコンポーネントでは、`generateMetadata()`が使えません。
その場合、同じディレクトリに`layout.tsx`を作成してメタデータを設定します。

**例**: `app/contact/layout.tsx`

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | How Sound Feels",
  // ...
};

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
```

### 3. Title Template
`layout.tsx`で`title.template`を設定すると、子ページのタイトルに自動的にサイト名が追加されます。

```typescript
export const metadata: Metadata = {
  title: {
    default: "How Sound Feels - 音を慈しむ、声を愛する音楽ブログ",
    template: "%s | How Sound Feels",
  },
};
```

これにより、子ページで`title: "Bad Romance - Lady Gaga"`と設定すると、
実際には`Bad Romance - Lady Gaga | How Sound Feels`と表示されます。

### 4. metadataBase
`layout.tsx`で`metadataBase`を設定すると、相対URLが絶対URLに自動変換されます。

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://sound-feels.com'),
};
```

---

## SEO効果

### 検索エンジン最適化
- ✅ **title**: 検索結果のタイトルに表示
- ✅ **description**: 検索結果の説明文に表示
- ✅ **keywords**: 検索エンジンがページの内容を理解
- ✅ **canonical**: 重複コンテンツ対策

### SNSシェア最適化
- ✅ **OGP**: LINE、Slack、Facebookなどでシェアした時に綺麗なカード表示
- ✅ **Twitter Card**: Twitter/Xでシェアした時に大きな画像付きカード表示

### 構造化データ
- ✅ **article type**: Googleが記事として認識
- ✅ **publishedTime**: 公開日を正確に伝える
- ✅ **authors**: 著者情報を明示

---

## 確認方法

### 1. ページのソースを表示
ブラウザで右クリック → 「ページのソースを表示」
`<head>`内に以下のようなメタタグが生成されているか確認：

```html
<title>Bad Romance - Lady Gaga | 歌詞の意味と解説 | How Sound Feels</title>
<meta name="description" content="..."/>
<meta name="keywords" content="Lady Gaga,Bad Romance,歌詞,意味,解説,音楽,レビュー"/>
<meta property="og:title" content="..."/>
<meta property="og:type" content="article"/>
<meta name="twitter:card" content="summary_large_image"/>
<link rel="canonical" href="https://sound-feels.com/posts/bad-romance"/>
```

### 2. Google Search Console
- 「URL検査」でページを検査
- インデックス後、検索結果でタイトルと説明文を確認

### 3. SNSプレビューツール
- **Twitter**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **LINE**: 実際にLINEでシェアして確認

---

## 今後の拡張案

### 1. OG画像の自動生成
現在、OG画像（`og:image`）は設定していません。
今後、各記事用のOG画像を自動生成すると、SNSシェア時の見栄えがさらに良くなります。

**実装方法:**
- Next.jsの`@vercel/og`を使用
- 記事のタイトル、アーティスト名、背景画像から動的生成

### 2. JSON-LD構造化データ
Googleにより詳細な情報を伝えるため、JSON-LD形式の構造化データを追加できます。

```typescript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Bad Romance",
  "author": { "@type": "Person", "name": "STUDIO Jinsei" },
  "datePublished": "2025-12-08",
  "keywords": "Lady Gaga, Bad Romance, 歌詞解説"
}
</script>
```

### 3. Breadcrumb（パンくずリスト）
ナビゲーションと構造化データとしてパンくずリストを追加。

---

## まとめ

- ✅ **全ページにメタデータ設定完了**
- ✅ **動的ページは自動生成**
- ✅ **OGP、Twitter Card対応**
- ✅ **Canonical URL設定**
- ✅ **SEO最適化完了**

これにより、Google検索での表示が改善され、SNSシェア時も魅力的なカードが表示されるようになりました。

---

最終更新日：2026年1月5日
