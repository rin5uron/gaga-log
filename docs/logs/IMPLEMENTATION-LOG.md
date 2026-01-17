# 実装ログ - How Sound Feels

このドキュメントは、サイトに加えた全ての実装・修正の記録です。

---

## 2026年1月16日：サイト全体の可読性向上・AdSense対策

### 概要
ZOO記事の改善をきっかけに、サイト全体の可読性向上とコンセプトの明文化を実施。AdSense承認に向けた和訳削除も完了。

### 実装内容

#### 1. ZOO記事の見出し改善
- 見出しだけで内容が分かる構造に変更
- 海外翻訳されても意味が破綻しない表現に統一
- 疑問形・感情的表現を避け、中立的で具体的な見出しに

#### 2. タイトルの簡潔化
対象記事: ZOO, LoveDrug, Aura
- シンプルに曲名のみ
- 詳細情報はdescriptionで補足

#### 3. 見出しに視覚的区切り（帯）を実装
- h2: 青い縦線 4px
- h3: グレーの縦線 3px
- 階層が一目で分かり、流し読みしやすく

#### 4. 余白・引用デザイン改善
- 見出しの余白を増やす（h2: margin-top 5rem, h3: margin-top 4rem）
- 引用デザインを見出しと差別化

#### 5. READMEに記事執筆の基本ルールを追加
やらないこと:
- ❌ 和訳・意訳はしない
- ❌ 逐語訳で解説しない
- ❌ 正解を押し付けない

やること:
- ✅ 原文を引用する
- ✅ 音と雰囲気を記録する
- ✅ 自分の感じたことを書く
- ✅ 流し読みできる構成

#### 6. AdSense対策：8記事の和訳削除
高リスク記事を特定し、和訳・逐語訳を削除:
- Bad Romance, Born This Way, Sing, Hips Don't Lie
- Poker Face, Just Dance, Perfect, The A Team

**効果:**
- 著作権問題のリスク低減
- オリジナリティ向上
- サイトコンセプトへの準拠

### まとめ
- ✅ サイト全体の可読性向上
- ✅ コンセプトの明文化
- ✅ AdSense承認準備完了（8記事の和訳削除）
- ✅ 十分な文字数（全記事2600文字以上）

---

## 2026年1月8日：サイト改善・Google Analytics実装

### 実施内容

#### 1. Google Analytics（GA4）の実装
- **測定ID**: `G-9JL8S192TL`
- **実装場所**: `app/layout.tsx`

**問題点**:
- 最初、`<head>`タグ内に直接`<script>`を記述していたが、Next.js 15では動作しない
- Next.jsが`<head>`を自動管理するため、カスタムスクリプトは`<Script>`コンポーネントを使う必要がある

**解決方法**:
```tsx
import Script from "next/script";

// <body>内に配置
<Script
  strategy="afterInteractive"
  src="https://www.googletagmanager.com/gtag/js?id=G-9JL8S192TL"
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-9JL8S192TL');
    `,
  }}
/>
```

**重要ポイント**:
- `strategy="afterInteractive"`: ページが操作可能になった後にスクリプトをロード
- `id`属性が必須（インラインスクリプトの場合）
- `<head>`タグは使わず、`<body>`内に配置

#### 2. Bad Romance記事の大幅改善

**a) SEOタイトル最適化**
- 変更前: `"Bad Romance"`
- 変更後: `"Bad Romance MVの意味とは？棺桶シーンから読み解くLady Gagaの世界観"`
- ファイル: `content/posts/bad-romance.md`

**b) 棺桶シーンの詳細解説を追加**
- MVセクションに「棺桶から始まる物語」サブセクションを追加
- 視覚的な描写とメタファーの解説を追加
- 白から赤への色の変化の意味を追加

**c) 意味不明なフレーズを削除・簡潔化**
- 変更前: 矛盾した説明（「恋愛の始まり」→「恋に壊れる」）
- 変更後: シンプルで一貫したメッセージに統一

#### 3. 全記事に目次機能を実装

**新規コンポーネント**: `components/TableOfContents.tsx`

**機能**:
- HTMLからH2/H3見出しを自動抽出
- スクロール位置に応じてアクティブな見出しをハイライト
- クリックでスムーズスクロール
- クライアントサイドで動作（`"use client"`）

**実装場所**: `app/posts/[slug]/page.tsx`
- 記事ヘッダーの直後に配置
- 全記事ページで自動的に表示

#### 4. 読みやすさの大幅改善（スタイル調整）

**ファイル**: `app/globals.css`

**変更内容**:
- **行間**: 1.9に拡大（従来: leading-relaxed）
- **フォントサイズ**: 1.0625rem（17px）
- **段落間の余白**: mb-4 → mb-6
- **段落の最大幅**: 45em（読みやすい行長）
- **H2見出し**:
  - サイズ: 2xl → 3xl
  - 余白: mb-4 → mb-6
  - 行間: 1.3
- **H3見出し**:
  - サイズ: lg → xl
  - 余白: mb-3 → mb-4
  - 行間: 1.4
- **引用ブロック**:
  - 上下余白: 1.5rem/0 → 2rem/2rem
  - 内部padding追加: 1rem
  - 行間: 1.4 → 1.6
- **セクション区切り**:
  - H2上部余白: 6rem → 5rem
  - 上部padding: 1.5rem → 2rem
  - ボーダー: 1px → 2px

#### 5. ホームページのアーティストフィルター改善

**ファイル**: `components/PostList.tsx`

**変更内容**:
- アーティスト名がリンク → フィルターボタンに変更
- クリックでその場でフィルタリング（ページ遷移なし）
- 選択中のアーティストは黒背景で強調
- `getArtistSlug`のインポートを削除（不要になったため）

**メリット**:
- ユーザー体験の向上（ページ遷移なし）
- より直感的なフィルタリング
- 選択状態が視覚的に明確

---

## 2026年1月5日：Google Search Console登録とサイトマップ送信

### 実施内容

#### 1. アドセンス申請準備の完了
- robots.txtをpublicフォルダに追加
- app/sitemap.tsでsitemap.xmlを動的生成する仕組みを実装
- 全記事、アーティストページ、静的ページをサイトマップに含める

#### 2. Google Search Console登録
- 確認用HTMLファイル（google27253ebe796fc299.html）をpublicフォルダに配置
- サイト所有権の確認が完了
- sitemap.xmlをGoogle Search Consoleに送信完了

### 実装詳細

#### robots.txt
```
# robots.txt for sound-feels.com

User-agent: *
Allow: /

# Sitemap
Sitemap: https://sound-feels.com/sitemap.xml
```

配置場所：`/public/robots.txt`

#### sitemap.ts
動的にサイトマップを生成する実装を追加：
- 静的ページ（トップ、About、Contact、Privacy）
- 全記事ページ（24記事）
- アーティストページ（9アーティスト）

配置場所：`/app/sitemap.ts`

主な設定：
- トップページ: priority 1.0, changefreq: daily
- 記事ページ: priority 0.9, changefreq: weekly
- アーティストページ: priority 0.7, changefreq: weekly
- 静的ページ: priority 0.3-0.8

#### Google Search Console確認用ファイル
配置場所：`/public/google27253ebe796fc299.html`

アクセスURL：https://sound-feels.com/google27253ebe796fc299.html

### 結果

✅ サイト所有権の確認：完了
✅ robots.txt：https://sound-feels.com/robots.txt で公開中
✅ sitemap.xml：https://sound-feels.com/sitemap.xml で公開中
✅ サイトマップ送信：完了

### 技術的なポイント

#### Next.js App Routerでのサイトマップ実装
- `app/sitemap.ts`を作成すると、自動的に`/sitemap.xml`エンドポイントが生成される
- `MetadataRoute.Sitemap`型を使用して型安全に実装
- サーバーサイドで動的に記事一覧を取得して生成

#### publicフォルダの使い方
- `public`フォルダ内のファイルは、ルートパス（/）として公開される
- robots.txt、Google確認用HTMLファイルなど、静的ファイルはここに配置
- `.next`フォルダはビルド時に自動生成されるため、ここにファイルを置いても消える

---

## サイトの現在の状態

- **ドメイン**: sound-feels.com
- **ホスティング**: Vercel
- **フレームワーク**: Next.js 15（App Router）
- **デプロイ**: GitHubプッシュで自動デプロイ
- **Google Analytics**: G-9JL8S192TL
- **Google Search Console**: 登録済み、サイトマップ送信済み

---

最終更新日：2026年1月8日
