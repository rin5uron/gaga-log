# How Sound Feels - gaga-log

**AIと人間が協働し、ミニマムな仕組みの中で最大の力を発揮するためのプロジェクトガイド**

---

## 目次

### Part 1: 概要
- [このサイトについて](#このサイトについて)

### Part 2: クイックスタート & ドキュメントの使い方
- [Skills & コマンド & Agent](#skills--コマンド--agent)
- [毎日の作業フロー](#毎日の作業フロー)
- [Issue管理](#issue管理)
- [ドキュメント構成](#ドキュメント構成)

---

## Part 1: 概要

### このサイトについて

**音を慈しむ。声を愛する。音楽と言葉の記録サイト**

歌を知ること、アーティストを知ること、その人と良い距離でいること——
それが、心地よく愛するための方法。

このサイトは、歌詞の意味を解説するだけでなく、**その言葉、音、雰囲気、そうしたものを記録する場所**。

愛しさを追求するために、残す。

| 観点 | 内容 |
|------|------|
| **Will** | 音楽を深掘りすることで、豊かな人生を送る。自分の好きな音楽をもっと深く愛せるようになる |
| **Need** | 音楽を深掘りして、ライブや生活を豊かにしたい人がいる。「読んで、もっと好きになる」体験が不足 |
| **Can** | 音楽への愛を言葉で記録し、共有できる。深掘りした内容を書ける |
| **Skill** | SEO・Next.js・デザインを学びながら、技術で届ける |

#### 記事のスタンス

**やらないこと**:
- ❌ 和訳・意訳はしない（歌詞の意味を説明する場所ではない）
- ❌ 逐語訳で解説しない（言葉の正確な翻訳ではなく、音と雰囲気を記録）
- ❌ 正解を押し付けない（「この歌詞の意味はこうです」という断定的な説明はしない）

**やること**:
- ✅ 原文（英語など）を引用する（原文の響きを大切に）
- ✅ 音と雰囲気を記録する（その曲を聴いたときの感覚、空気感を言葉に）
- ✅ 自分の感じたことを書く（「私にはこう聞こえた」「こう感じた」という主観）
- ✅ 流し読みできる構成（見出しだけで価値が伝わる）

---

## Part 2: クイックスタート & ドキュメントの使い方

### Skills & コマンド & Agent

#### Skills

Claude Code Skills を使ってアイデア出し・タスク分解・デバッグを実行できます。

| Skill | 何をする |
|-------|----------|
| `brainstorming` | アイデア出し（記事テーマ、デザイン案）複数案を提示して設計を固める |
| `writing-plans` | 複雑なタスクを小タスクに分割（2-5分単位の実装計画） |
| `systematic-debugging` | バグの根本原因を体系的に調査（4フェーズ：根本原因→パターン分析→仮説→実装） |

**使い方**:
```
skill: brainstorming
skill: writing-plans
skill: systematic-debugging
```

#### コマンド

| コマンド | 何をする |
|----------|----------|
| `/new-article` | 新規記事を作成（テンプレート準拠・Front Matter設定まで） |
| `/seo-check` | SEO最適化チェック（Search Consoleデータを元に改善提案） |
| `/seo-update` | 追加SEO改善（効果測定後の再改善） |

**詳細**: [ワークフロー](./docs/WORKFLOW.md)

#### Agent（推奨活用）

Claude Code Agent を使って複雑な探索・計画タスクを自動化できます。

| Agent | 使うタイミング |
|-------|---------------|
| `Explore` | 全記事のSEO状況を一括調査、類似パターンを分析 |
| `Plan` | AdSense対応など複雑な実装計画を作成 |
| `General-purpose` | 複数ステップのリサーチ・実装タスク |

**使い方**:
```
Task tool で subagent_type を指定
例: subagent_type="Explore", prompt="全記事のSEOメタデータをチェック"
```

---

### 毎日の作業フロー

#### 推奨ワークフロー（30分）

1. **データ分析（5分）** - Search Console/Analytics確認、Issue提案
2. **記事改善（10分）** - SEO最適化、内部リンク追加
3. **新規記事執筆（10分）** - `/new-article` で執筆（完成度60%でOK）
4. **Next.js課題（5分）** - 学習項目を1つ実装

#### ポイント
- Skills でアイデア出し・タスク分解
- Agent で全体調査・計画作成
- コマンドで定型作業を高速化
- 完了したら Issue をクローズ

---

### Issue管理

**原則: アイデア・作業履歴・進捗は全てIssueで管理**

#### ラベル体系

| ラベル | 用途 | 検索方法 |
|--------|------|----------|
| `article` | 記事執筆・編集 | [label:article](https://github.com/rin5uron/gaga-log/labels/article) |
| `seo` | 検索エンジン最適化 | [label:seo](https://github.com/rin5uron/gaga-log/labels/seo) |
| `adsense` | AdSense収益化対応 | [label:adsense](https://github.com/rin5uron/gaga-log/labels/adsense) |
| `design` | UI/UXデザイン | [label:design](https://github.com/rin5uron/gaga-log/labels/design) |
| `infrastructure` | サイト構造・技術実装 | [label:infrastructure](https://github.com/rin5uron/gaga-log/labels/infrastructure) |
| `learning` | Next.js/Tailwind学習 | [label:learning](https://github.com/rin5uron/gaga-log/labels/learning) |
| `bug` | 不具合 | [label:bug](https://github.com/rin5uron/gaga-log/labels/bug) |

#### Issue作成ルール

- **タイトル**: `[記事名/カテゴリ] - [作業内容]`
  - 例: `Die With A Smile - SEO最適化`
  - 例: `全記事 - AdSense配置調整`
- **ラベル**: 必ず1つ以上付ける（複数可）
- **本文**: 具体的な改善内容、完了条件を記載
- **コメント**: 作業履歴は Issue コメントで記録（時系列で自動的に並ぶ）

**詳細**: [作業進捗管理](./docs/ISSUE-MANAGEMENT.md)

#### 重要Issue一覧

| カテゴリ | Issue | 状態 |
|---------|-------|------|
| AdSense | [#22 2回目不承認対応](https://github.com/rin5uron/gaga-log/issues/22) | 進行中 |
| 記事SEO | [#19 Alejandro - SEO最適化](https://github.com/rin5uron/gaga-log/issues/19) | 進行中 |
| 記事SEO | [#18 Hey Girl - SEO最適化](https://github.com/rin5uron/gaga-log/issues/18) | 進行中 |
| 記事SEO | [#17 LoveDrug - SEO最適化](https://github.com/rin5uron/gaga-log/issues/17) | 進行中 |
| ライブ | [#16 MAYHEM Ball - SEO最適化](https://github.com/rin5uron/gaga-log/issues/16) | 進行中 |
| UI実装 | [#15 カテゴリ分けタブUI](https://github.com/rin5uron/gaga-log/issues/15) | 進行中 |
| SEO全体 | [#13 CTR 2.7% → 6-10%改善](https://github.com/rin5uron/gaga-log/issues/13) | 進行中 |
| 学習 | [#11 初心者向けコンポーネントデザイン](https://github.com/rin5uron/gaga-log/issues/11) | 進行中 |
| 学習 | [#10 Tailwind CSS基礎ガイド](https://github.com/rin5uron/gaga-log/issues/10) | 進行中 |
| 学習 | [#9 コンポーネントデザイン改善](https://github.com/rin5uron/gaga-log/issues/9) | 進行中 |
| AdSense | [#7 有用性の低いコンテンツ改善](https://github.com/rin5uron/gaga-log/issues/7) | 進行中 |
| デザイン | [#4 歌いたいポイントセクション改善](https://github.com/rin5uron/gaga-log/issues/4) | 進行中 |

---

### ドキュメント構成

**原則: ドキュメントは `docs/` に集約。これ以上増やさない。それ以外は Issue で管理。**

#### docs/ 構成

```
docs/
├── WORKFLOW.md          # 記事作成・SEO・コマンド詳細
├── ISSUE-MANAGEMENT.md  # Issue運用ルール
├── PRINCIPLES.md        # サイトコンセプト・設計思想
└── templates/           # 記事テンプレート
    ├── article-template.md
    ├── live-report-template.md
    └── artist-page-template.md
```

#### ドキュメント vs Issue の使い分け

| 項目 | 管理場所 |
|------|----------|
| **ワークフロー・ルール** | `docs/` の3ファイル（WORKFLOW.md, ISSUE-MANAGEMENT.md, PRINCIPLES.md） |
| **テンプレート** | `docs/templates/` |
| **アイデア・改善案** | GitHub Issue |
| **作業履歴・進捗** | GitHub Issue のコメント |

#### ドキュメント一覧

**運用・ルール（必読）**
- [ワークフロー](./docs/WORKFLOW.md) - 記事作成・SEO・コマンド詳細
- [作業進捗管理](./docs/ISSUE-MANAGEMENT.md) - Issueタイトル・ラベル・状態管理・作業の流れ
- [基本原則・プロジェクト構造](./docs/PRINCIPLES.md) - サイトコンセプト・設計思想・技術スタック

**テンプレート（記事作成時に使用）**
- [記事テンプレート](./docs/templates/) - 新規記事作成時の雛形

---

**最終更新**: 2026-02-07
