# How This Song Feels - 仕様書

## プロジェクト概要

「歌詞の意味を解説する」のではなく、**「なぜその言葉に惹かれたのか」を記録する**音楽ブログサイト。

- 他人に向けて"売る"のではなく、自分のために"残す"
- 正解を提示するのではなく、個人的な感覚を言語化する
- 結果として、同じ温度の人が読む

## 技術スタック

- **フレームワーク**: Next.js (App Router)
- **スタイリング**: Tailwind CSS
- **コンテンツ管理**: Markdown + gray-matter
- **ホスティング**: Vercel
- **フォーム**: Formspree (ID: maqyjzae)
- **バージョン管理**: GitHub
- **AI補助**: Claude Code (記事作成ワークフロー)

## ディレクトリ構成

```
gaga-log/
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ（記事一覧）
│   ├── posts/[slug]/      # 記事詳細ページ
│   ├── about/             # 運営者情報
│   ├── contact/           # お問い合わせフォーム
│   └── privacy/           # プライバシーポリシー
├── components/            # Reactコンポーネント
│   ├── Header.tsx         # サイト共通ヘッダー
│   └── Footer.tsx         # サイト共通フッター
├── content/posts/         # 記事（Markdown）
│   ├── template.md        # 記事テンプレート
│   ├── shallow.md         # 記事例1
│   └── hey-girl.md        # 記事例2
├── public/                # 静的ファイル
│   ├── icons/             # ストリーミングサービスアイコン
│   └── images/            # 画像
├── docs/                  # ドキュメント
│   ├── SEO-STRATEGY.md    # SEO戦略
│   └── spec.md            # 本ファイル
└── .claude/               # Claude Code設定
    └── article-workflow.md # 記事作成ワークフロー

```

## 主要機能

### 1. 記事管理システム
- Markdownベースの記事作成
- フロントマターで曲情報を管理（title, artist, date, type）
- ストリーミングサービスへのリンク（Apple Music, Spotify）
- YouTube動画埋め込み対応

### 2. 記事作成ワークフロー（AI補助）
`.claude/article-workflow.md` に定義された6つの質問に基づいて記事を生成：
1. この曲との出会い・きっかけ
2. 一番心に残ったフレーズや歌詞
3. そのフレーズがなぜ刺さったのか
4. 覚えたい・歌いたい部分
5. 今のあなたとこの曲の関係
6. 曲全体の印象やテーマ

### 3. SEO対策
- 長尾キーワード戦略（「意味」「どんな曲」「なぜ」「解釈」）
- 公式和訳とは競合しない
- 個人ブログの弱点を突く

### 4. AdSense準備
- プライバシーポリシーページ
- お問い合わせフォーム（Formspree）
- 運営者情報ページ
- 目標: 30記事達成

## 実装履歴

### 2025-12-27

#### プロジェクト初期設定
- Next.jsプロジェクト作成
- 記事テンプレート作成（`content/posts/template.md`）
- Claude Code記事作成ワークフロー設定（`.claude/article-workflow.md`）

#### 記事作成
- `shallow.md` - Lady Gaga & Bradley Cooper
- `hey-girl.md` - Lady Gaga

#### デザイン調整
- ストリーミングアイコンのデザイン改善
  - 初期: Simple Iconsの歪んだSVG → UXWingの高品質SVGに変更
  - アイコンのみ表示（テキストラベル削除）
- セクション間の余白調整
  - `---` 区切り線は維持
  - `##` 見出しの前に2行の空行を追加

#### SEO戦略
- `docs/SEO-STRATEGY.md` 作成
- 競合分析と差別化戦略の策定

#### AdSense準備
- `/privacy` - プライバシーポリシーページ作成
- `/contact` - お問い合わせフォーム作成（Formspree統合）
- `/about` - 運営者情報ページ作成

#### サイト構造改善
- `Header.tsx` コンポーネント作成（サイト全体のナビゲーション）
- `Footer.tsx` コンポーネント作成
- `app/layout.tsx` にヘッダー・フッター追加

#### GitHub設定
- Issue テンプレート作成（content, adsense, security, design）
- ラベル作成
- 4つのIssue登録:
  1. [記事] 30記事達成
  2. [AdSense] 申請準備
  3. [フォーム] お問い合わせフォーム実装
  4. [デザイン] 歌いたいポイントセクション改善

### 2025-12-28

#### UX改善
- ストリーミングアイコンにツールチップ追加
  - Apple Music: "Apple Musicで聴く"
  - Spotify: "Spotifyで聴く"
  - `title` 属性を全記事に適用

#### ドキュメント整備
- `docs/spec.md` 作成（本ファイル）

## 今後の予定

### Phase 1: コンテンツ充実（進行中）
- [ ] 30記事達成（現在: 2記事）
- [ ] デザイン改善: 「覚えたい、歌いたいポイント」セクション（Issue #4）

### Phase 2: AdSense申請
- [ ] 30記事達成後にAdSense申請
- [ ] 審査通過後、広告配置の最適化

### Phase 3: 独自ドメイン
- [ ] ドメイン取得
- [ ] Vercelでカスタムドメイン設定

### Phase 4: 機能拡張（検討中）
- [ ] タグ・カテゴリー機能
- [ ] 検索機能
- [ ] RSS/Atom フィード
- [ ] OGP画像の自動生成

## 運営情報

- **運営者**: Studio Jinsei
- **サイトURL**: https://gaga-log.vercel.app/
- **会社サイト**: https://studiojinsei.com
- **お問い合わせ**: お問い合わせフォーム経由（メール非公開）

---

**作成日**: 2025-12-28
**最終更新**: 2025-12-28
