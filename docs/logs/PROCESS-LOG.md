# プロセスログ - How Sound Feels

このドキュメントは、プロジェクトの進行状況、フェーズ管理、実装記録をまとめたものです。

---

## 📋 プロジェクト概要

### 目標
- **アーカイブとして完成している状態を目指す**
- Lady Gagaライブまでに30記事作成
- Google AdSense申請＆収益化

### サイト情報
- **ドメイン**: sound-feels.com
- **サイト名**: How Sound Feels
- **コンセプト**: 音を慈しむ。声を愛する。
- **運営**: STUDIO Jinsei（個人事業）

---

## 🎯 フェーズ管理

### 現在のフェーズ: フェーズ1 - ライブ予習 + AdSense準備

**期間**: 2024年12月27日 〜 ライブ当日（約1ヶ月後）

**目的**:
- Lady Gagaライブに向けて、曲の背景やワンフレーズを理解し、ライブを最大限楽しむ
- AdSense申請に必要な土台を整える

**達成状況**:
- ✅ 独自ドメイン開通: sound-feels.com
- ✅ サイトタイトル変更: "How Sound Feels"
- ✅ サイトコンセプト確定
- ✅ 運営体制確定: STUDIO Jinsei
- ✅ プライバシーポリシーページ作成
- ✅ お問い合わせページ作成
- ✅ 運営者情報（About）ページ作成
- ✅ Google Search Console登録
- ✅ サイトマップ送信
- ✅ Google Analytics設置
- 🚧 記事作成: 24記事 / 目標30記事

### AdSense申請チェックリスト

| 項目 | 状態 | 備考 |
|------|------|------|
| 独自ドメイン | ✅ 取得済 | sound-feels.com |
| 記事数 | 24/30 | 最低10〜20、目標30 |
| プライバシーポリシー | ✅ 作成済 | 必須 |
| お問い合わせ | ✅ 作成済 | あると良い |
| 運営者情報 | ✅ 作成済 | あると良い |
| オリジナルコンテンツ | ✅ OK | 自分の言葉で書いている |
| Google Search Console | ✅ 登録済 | サイトマップ送信済み |
| Google Analytics | ✅ 設置済 | G-9JL8S192TL |

### 今後のフェーズ

**フェーズ2: AdSense申請（ライブ後〜）**
- 30記事達成を確認
- AdSense申請
- 審査結果を待つ（通常1〜2週間）
- 不承認の場合は改善して再申請

**フェーズ3: アーカイブ構築（継続）**
- 書きたい時だけ書く（ノルマは作らない）
- 自分が読み返して嬉しい記事を書く
- 検索流入を期待（記事が溜まってから）

---

## 🚀 実装記録

以下、時系列で実装・修正内容を記録します。

---

## 2026年1月20日：曲ページ（Paparazzi / Telephone）改善

### 一目でわかる変更一覧

| 種別 | ファイル | 主な変更 |
|------|----------|----------|
| テンプレ | `templates/template-song.md` | 考察の締め（私の感想2〜4行）、Referencesルール（本文リンク＋一覧・控えめCSS） |
| マニュアル | `ARTICLE_TEMPLATE.md` | **引用ルール**（歌詞は帯なし・インデントのみ）。**リンクルール**（外部=該当文言に直リンク、参考文献=出典一覧、内部=文脈で必要なだけ）。**「この記事でわかること」**（2点・抽象語禁止・曲名入り・一文で通じる）。**可読性**（太字だけ追っても意味が通じる）。まとめ枠 .summary-box は一旦見送り |
| 目次 | `components/TableOfContents.tsx` | **山型削除**（`rounded-lg` 削除）。**帯なし**（ボタンの bg・border-b、項目の左边框を削除）。**ボタン幅** `w-full`→`w-fit`。**下余白** リスト `py-2`→`pt-2 pb-0`。h3 は全文表示（クォート歌詞もそのまま）。参考情報セクション以降は目次から除外 |
| スタイル | `app/globals.css` | **リンク色** `.prose a` を青→`text-gray-800 underline decoration-gray-300 hover:decoration-gray-800`。**引用** blockquote は帯・背景・角丸を削除、左 padding＋イタリックのみ。見出しトークン、.toc-heading-h2 / .toc-heading-h3（左边框なし）、.article-title、参考文献控えめ |
| 記事ページ | `app/posts/[slug]/page.tsx` | `.article-title`、AdSense `my-0`。linkify とヘッダー Artist のリンク色を青→グレー下線 |
| 関連 | `components/RelatedPosts.tsx` | **参考文献〜関連の余白** `mt-6 pt-4`→`mt-0 pt-2` |
| 記事 | `paparazzi.md` | `relatedPosts: ["telephone"]`。**highlights**「『Paparazzi』というタイトルに隠された意図」「衝撃のMVが描く、名声とメディアの関係」。**IMDb**「ガガと共にコンセプトを手掛けた」に直リンク、（IMDb）の括弧リンク削除。**.summary-box 削除**（一旦やめ） |
| 記事 | `telephone.md` | `relatedPosts: ["paparazzi"]` のみに。**highlights**「ガガとビヨンセの共演背景」「Paparazziから続く"超大作MV"の考察」。比較ボックス `.comparison-box` / `.comparison-item`。**.summary-box 削除** |

---

### テンプレ・ARTICLE_TEMPLATE に決めたルール

- **考察の締め**：最後の h3 のあと、私の感想を 2〜4 行。
- **参考文献**：本文中に該当文言でリンク。一覧は References に。セクションは控えめスタイル。
- **引用**：歌詞は帯なし。左余白＋イタリックのみ。.summary-box は一旦使わない。
- **リンク**：外部=該当文言に直リンク。内部=文脈で「次に読むと自然なもの」だけ。relatedPosts は出しすぎない。
- **「この記事でわかること」**：2点まで。抽象語禁止。曲名・固有名詞を入れる。一文で分かる。
- **可読性**：太字だけ追っても内容が理解できる。見出し＋太字で流し読み可能に。

---

### 目次

- **h3 全文表示**：`"I'm your biggest fan"——ファンか、ストーカーか` など、`textContent` をそのまま表示（日本語だけ抜く正規表現を廃止）。
- **参考情報**：h2「参考情報」以降は目次に含めない。
- **見た目**：山型（rounded）削除、ボタン・項目の帯（左边框・背景）削除、ボタン幅 `w-fit`、下余白 `pb-0`。h2 は見出し・h3 はリンクで H2/H3 両方表示。

---

### 余白

- AdSense（目次下・記事下）：`my-0`。
- 関連ページ：`mt-6 pt-4`→`mt-0 pt-2`。参考文献との間を詰める。

---

### アーティストページ整備（1/20・ガガ＆共通）

**やること①で対応したこと**

| 項目 | 対応 |
|------|------|
| 更新日・作成日 | ガガの frontmatter に `date`, `updatedDate` を追加 |
| 参考文献 | Career / Works の「**参考:**」と Notes の「### 公式リンク」を削除し、記事末に **## References 参考情報** を追加（### 公式・メディア、### SNS）。h2 に `references-section` を付与して控えめスタイル適用 |
| お気に入りの他アーティスト | ビヨンセ→`[Beyoncé](/artists/beyonce)`、フローレンス→`[Florence + The Machine](/artists/florence-and-the-machine)` を追加 |
| 国籍に国旗 | `app/artists/[name]/page.tsx` で 国籍の横に 国旗 emoji（アメリカ🇺🇸、イギリス🇬🇧、コロンビア🇨🇴、スウェーデン🇸🇪、ジャマイカ🇯🇲 等）を表示 |
| ガガのアルバム | The Fame Monster (2009)、ARTPOP (2013)、Chromatica (2020) を追加 |

**変更ファイル**: `content/artists/lady-gaga.md`、`app/artists/[name]/page.tsx`

**今後の予定**: ガガのスタイルに合わせて◎全てのアーティストページを整える、◎全てのページの関連リンクを整理する。

---

### アーティストページ 検討メモ（2）（3）

- **シャキーラのプロフテーブル**：見やすいが Wikipedia に近い → 差別化を検討
- **写真**：著作権に配慮。公式サイトのフレーム等の利用可否を要検討
- **Wikipedia のアコーディオン**：全体をアコーディオンにして見やすくする案
- **「私にとっての」→「このアーティストの一押しポイント！」**：note 風ではなく、箇条書きの一押しポイントにする案
- **Wikipedia との差別化**：どう差をつけるか要検討

---

## 2026年1月10日：SEOキーワード強化実装

### 概要
全ページ（記事ページ・アーティストページ）にカタカナ表記のキーワードを自動追加する仕組みを実装しました。これにより、日本語での検索に対応したSEO強化を実現。

### 実装内容

#### 1. 記事ページ（`/posts/[slug]`）へのカタカナキーワード追加

**実装ファイル**: `app/posts/[slug]/page.tsx`

**機能**:
- カタカナ変換マッピングテーブルを作成
- アーティスト名と曲名をカタカナに自動変換
- frontmatterに`keywords`がある場合はそれを使用、ない場合は自動生成＋カタカナ表記を追加

**カタカナマッピング例**:
- アーティスト名: `"Lady Gaga"` → `"レディー・ガガ"`, `"Ed Sheeran"` → `"エド・シーラン"` など
- 曲名: `"Bad Romance"` → `"バッドロマンス"`, `"Perfect"` → `"パーフェクト"` など

**動作**:
- 既存の記事（`bad-romance.md`、`zoo.md`など）は、frontmatterの`keywords`をそのまま使用
- `keywords`がない記事は、英語表記とカタカナ表記の両方を自動追加

**対象**: 全27記事

#### 2. アーティストページ（`/artists/[name]`）へのキーワード強化

**実装ファイル**: `app/artists/[name]/page.tsx`

**追加されたキーワード**:
- アーティスト名（英語表記）
- アーティスト名の別表記（カタカナ、短縮形）
  - 例: `"Lady Gaga"` → `"レディー・ガガ"`, `"レディーガガ"`, `"ガガ"`
  - 例: `"Ed Sheeran"` → `"エド・シーラン"`, `"エドシーラン"`, `"エド"`
  - 例: `"Ariana Grande"` → `"アリアナ・グランデ"`, `"アリアナグランデ"`, `"アリアナ"`
- 国籍（例: `"アメリカ"`, `"イギリス"`）
- `"国籍"`というキーワード
- `"出身"`というキーワード
- 基本キーワード（`"歌詞"`, `"解説"`, `"音楽"`, `"楽曲一覧"`）

**技術的な実装**:
- アーティスト名の別表記マッピングテーブルを作成
- `generateMetadata()`関数内で、アーティストプロフィールの`nationality`を取得してキーワードに追加

#### 3. Postインターフェースの拡張

**実装ファイル**: `lib/posts.ts`

**変更内容**:
- `Post`インターフェースに`keywords?: string[]`フィールドを追加
- `getPostBySlug()`関数でfrontmatterの`keywords`を読み取るように修正

### SEO効果

#### 検索対応の拡大
- ✅ 英語表記での検索に対応（既存）
- ✅ カタカナ表記での検索に対応（新規）
- ✅ 短縮形での検索に対応（例: "ガガ"、"エド"、"アリアナ"）
- ✅ 国籍・出身地での検索に対応（新規）

#### 対象ページ
- ✅ **記事ページ**: 全27記事
- ✅ **アーティストページ**: 全アーティストページ

### エドシーランとZOOのSEO強化

**実施内容**:
- Ed Sheeran関連記事のキーワード最適化
- "Zoo"記事のSEO強化
- カタカナ表記（エド・シーラン、エドシーラン、エド、ズー）をキーワードに追加

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

## 2026年1月5日：SEOメタデータ実装

### 概要
全ページにSEO最適化されたメタデータを動的生成する仕組みを実装しました。

### 実装済みページ一覧

#### 動的ページ（自動生成）

**1. 記事ページ（`/posts/[slug]`）**
- **実装ファイル**: `app/posts/[slug]/page.tsx`
- **機能**: `generateMetadata()` 関数で各記事ごとに動的生成

生成される内容:
- **title**: `{曲名} - {アーティスト} | 歌詞の意味と解説 | How Sound Feels`
- **description**: `{アーティスト}の「{曲名}」の歌詞の意味を解説...`
- **keywords**: アーティスト名、曲名、「歌詞」、「意味」、「解説」、「音楽」、「レビュー」、アルバム名
- **OGP**: title, description, url, type (article), publishedTime
- **Twitter Card**: summary_large_image
- **Canonical URL**: 重複コンテンツ対策

記事タイプ別の出し分け:
- 🎵 type: "song" → 「歌詞の意味と解説」
- 🎬 type: "movie" → 「映画・ドキュメンタリー解説」

**2. アーティストページ（`/artists/[name]`）**
- **実装ファイル**: `app/artists/[name]/page.tsx`
- **機能**: `generateMetadata()` 関数でアーティストごとに動的生成

生成される内容:
- **title**: `{アーティスト名} - アーティスト情報と楽曲解説 | How Sound Feels`
- **description**: `{アーティスト名}の楽曲解説一覧（{記事数}件）...`
- **OGP**: title, description, url, type (profile)
- **Twitter Card**: summary

#### 静的ページ

- **トップページ（`/`）**: `app/layout.tsx`で設定
- **About（`/about`）**: `app/about/page.tsx`で設定
- **Contact（`/contact`）**: `app/contact/layout.tsx`で設定（page.tsxが"use client"のため分離）
- **Privacy（`/privacy`）**: `app/privacy/page.tsx`で設定

### 技術的なポイント

#### 1. generateMetadata()の使い方
Next.js App Routerでは、`generateMetadata()`関数をexportすると、サーバーサイドでメタデータが動的生成されます。

#### 2. クライアントコンポーネントでのメタデータ設定
`"use client"`があるコンポーネントでは、`generateMetadata()`が使えません。
その場合、同じディレクトリに`layout.tsx`を作成してメタデータを設定します。

#### 3. Title Template
`layout.tsx`で`title.template`を設定すると、子ページのタイトルに自動的にサイト名が追加されます。

```typescript
export const metadata: Metadata = {
  title: {
    default: "How Sound Feels - 音を慈しむ、声を愛する音楽ブログ",
    template: "%s | How Sound Feels",
  },
};
```

#### 4. metadataBase
`layout.tsx`で`metadataBase`を設定すると、相対URLが絶対URLに自動変換されます。

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://sound-feels.com'),
};
```

### SEO効果

#### 検索エンジン最適化
- ✅ **title**: 検索結果のタイトルに表示
- ✅ **description**: 検索結果の説明文に表示
- ✅ **keywords**: 検索エンジンがページの内容を理解
- ✅ **canonical**: 重複コンテンツ対策

#### SNSシェア最適化
- ✅ **OGP**: LINE、Slack、Facebookなどでシェアした時に綺麗なカード表示
- ✅ **Twitter Card**: Twitter/Xでシェアした時に大きな画像付きカード表示

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

## 2026年1月24日：MAYHEM Ballツアー記事のSEO最適化とLoveDrug記事の改善

### 実施内容

#### 1. MAYHEM Ballツアー記事のSEO最適化と構成改善

**対象ファイル**: `content/posts/mayhem-ball-tour.md`

**SEOキーワード調査**:
- 検索トレンドから主要キーワードを分析
- 「ガガ セトリ」「ガガライブ 予習」「The MAYHEM Ball セトリ」などが検索されていることを確認
- 現状のキーワード設定で主要な検索キーワードはカバー済みと判断

**開演時間の確認と修正**:
- 1月25日: 開場16:00 / 開演18:00（公式サイトで確認）
- 1月26日・29日・30日: 開場17:00 / 開演18:45（メール情報に基づき修正）

**記事構成の改善**:
- セットリストにCSSデザインを追加（`.setlist-container`、`.setlist-act`、`.setlist-song`など）
- セットリストの特徴を明確化（初披露曲・久々の復活曲・構成の流れを箇条書き＋太字で整理）
- 5つのアクトを明確に区切り、短い見出しで整理
- 流し読みできる構成に改善（太字追加、段落を短く、1文1情報）
- 「日本公演の予習プレイリスト」セクションを削除（目次からも自動削除）

**CSS追加**:
- `app/globals.css`にセットリスト用スタイルを追加
- ボックスデザイン、背景色、余白で視認性を向上

#### 2. LoveDrug記事のSEO最適化とテンプレート準拠

**対象ファイル**: `content/posts/lovedrug.md`

**SEOメタデータの追加**:
- `description`: 「歌詞の意味を徹底解説」「80年代アリーナロックとエレクトロポップの融合サウンド」など検索されやすいキーワードを含む説明文を追加
- `keywords`: 配列形式で関連キーワードを追加（LoveDrug、ラブドラッグ、Lady Gaga、MAYHEM、歌詞、意味、解説、依存、中毒など）

**構造の整理（テンプレート準拠）**:
- 「この曲のサウンド」セクションを「Music Video」セクションに統合
- 「私の感想（今の自分と重ねて）」を「Analysis」セクションに統合
- テンプレートに合わせたセクション構造に統一

**流し読みの改善**:
- 太字を追加して要点を強調
- 段落を短くして読みやすく
- 1文1情報の原則に従う

**背景**:
- クリック数があるのにSEO最適化が実装されていなかったため、テンプレートとSEO最適化を実施

---

最終更新日：2026年1月24日
