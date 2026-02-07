# Issue管理 - gaga-log

## 基本原則

**アイデア・作業履歴・進捗は全てIssueで管理**

- ドキュメントは `docs/` に集約（これ以上増やさない）
- それ以外の情報（アイデア、改善案、作業履歴）は GitHub Issue で管理
- Issue コメントで時系列の記録を残す

---

## ラベル体系

| ラベル | 用途 | 色 | 検索 |
|--------|------|-----|------|
| `article` | 記事執筆・編集 | `#d876e3` | [検索](https://github.com/rin5uron/gaga-log/labels/article) |
| `seo` | 検索エンジン最適化 | `#0366d6` | [検索](https://github.com/rin5uron/gaga-log/labels/seo) |
| `adsense` | AdSense収益化対応 | `#FFA500` | [検索](https://github.com/rin5uron/gaga-log/labels/adsense) |
| `design` | UI/UXデザイン | `#BFD4F2` | [検索](https://github.com/rin5uron/gaga-log/labels/design) |
| `infrastructure` | サイト構造・技術実装 | `#7057ff` | [検索](https://github.com/rin5uron/gaga-log/labels/infrastructure) |
| `learning` | Next.js/Tailwind学習 | `#a2eeef` | [検索](https://github.com/rin5uron/gaga-log/labels/learning) |
| `bug` | 不具合 | `#d73a4a` | [検索](https://github.com/rin5uron/gaga-log/labels/bug) |

---

## Issue作成ルール

### タイトル

**形式**: `[記事名/カテゴリ] - [作業内容]`

**良い例**:
- `Die With A Smile - SEO最適化`
- `Alejandro - テンプレート準拠チェック`
- `全記事 - AdSense配置調整`
- `トップページ - カテゴリ分けタブUI実装`

**悪い例**:
- `[SEO] Die With A Smileの改善` ← タイトルにラベル情報を入れない
- `【最優先】Alejandro修正` ← 優先度はラベルで管理
- `（緊急・SEO）全記事` ← カッコ付き文言は不要

### ラベル

- **必ず1つ以上付ける**（複数可）
- 記事関連: `article` + `seo` など
- サイト全体: `infrastructure` + `design` など

### 本文

- **具体的な改善内容**: 何を、なぜ、どう改善するか
- **完了条件**: チェックリスト形式で記載
- **背景・参考情報**: 必要に応じて追加

**テンプレート**:
```markdown
## 📊 記事の現状
**最終更新**: YYYY-MM-DD

### テンプレート準拠
- [ ] ✅ 完璧（概要・デモ・FAQ・関連用語の順序完璧 + 人間が確認して完璧と判断）
- [ ] 🔁 改善待ち（テンプレート構造の改善が必要）

### SEO状態
- [ ] ✅ 適切（title/description/キーワードが適切）
- [ ] 🔁 改善待ち（SEOチェックで問題発見）

---

## 🔁 課題
[なぜこの作業が必要か、何が問題か]

---

## 💻 実施内容
- [ ] タスク1
- [ ] タスク2
- [ ] タスク3

---

## ✅ 完了条件
- [ ] 条件1
- [ ] 条件2
```

### コメント

- **作業履歴は Issue コメントで記録**（本文に追記しない）
- 時系列で自動的に並ぶ
- 完了時は「完了日: YYYY-MM-DD」を記載

**記録例**:
```
2026-02-07: title/description最適化完了
- title: 「Die With A Smile 歌詞の意味」→「Die With A Smile 歌詞の意味とガガ×ブルーノの奇跡のコラボ背景」
- description: 具体的なハイライトを追加
- 内部リンク: #5, #12, #18を追加

完了日: 2026-02-07
```

---

## Issueクローズのタイミング

**以下の条件を満たしたらクローズ**:
- 作業が完了した（チェックリストがすべて完了）
- 現時点で追加作業の予定がない

**新たな問題が発生したら、新しいIssueを作成**:
- 例: 「Die With A Smile - SEO最適化」が完了 → クローズ
- 後日AdSense問題が発覚 → 新しく「Die With A Smile - AdSense配置調整」Issueを作成

**メリット**:
- Issueが肥大化しない
- 作業履歴が時系列で追いやすい
- 完了したタスクとオープンなタスクが明確

---

## 作業の流れ

### 1. 新規記事作成
1. `/new-article` 実行
2. Issue作成（タイトル: `[記事名] - 初回作成`、ラベル: `article`）
3. 公開後、Issueをクローズ

### 2. SEO改善
1. Search Consoleでデータ確認
2. `/seo-check` 実行
3. Issue作成（タイトル: `[記事名] - SEO最適化`、ラベル: `article,seo`）
4. 修正完了後、Issueコメントに完了日を記録してクローズ

### 3. AdSense対応
1. AdSense審査結果を確認
2. Issue作成（タイトル: `[AdSense] XX回目不承認対応`、ラベル: `adsense,seo`）
3. 改善内容を本文に記載
4. 実装完了後、Issueコメントに完了日を記録してクローズ

### 4. 学習タスク
1. Issue作成（タイトル: `[学習] Next.js - XX機能の実装`、ラベル: `learning,infrastructure`）
2. 学習内容を実装
3. `docs/learning/nextjs-progress.md` を更新
4. Issueをクローズ

---

**最終更新**: 2026-02-07
