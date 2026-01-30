# Claude Code Skills 活用検討

**作成日**: 2026-01-30
**ステータス**: 検討中（未導入）

---

## 背景

Claude Code用の公式・コミュニティスキルが存在する。gaga-logプロジェクトで活用できるか検討。

**参考リソース:**
- [anthropics/skills](https://github.com/anthropics/skills) - 公式スキル
- [obra/superpowers](https://github.com/obra/superpowers) - コミュニティスキル（20+）
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) - まとめリポジトリ

---

## 現状の課題認識

### 実際の開発フロー
- ❌ いきなりコード書く傾向
- ❌ 複雑な変更の事前設計が不足
- ✅ テンプレベースの作業は確立されている（記事作成等）

### 既にあるもの
- `.claude/commands/` - カスタムコマンド（`/seo-check`, `/seo-update`等）
- `docs/seo/SEO-STRATEGY.md` - 詳細なSEO戦略
- 記事テンプレート - 記事作成フローは確立済み
- ワークフロー定義 - `article-workflow.md`

### 足りないもの
- 新機能実装前の設計プロセス
- 複数ファイル変更時の計画
- トラブル時の体系的デバッグ

---

## スキルの種類と概要

### 公式スキル（anthropics/skills）

#### ドキュメント系
- **docx** - Word文書の作成・編集
- **pdf** - PDF操作（抽出、結合、フォーム処理）
- **pptx** - PowerPoint作成
- **xlsx** - Excel操作

#### 開発系
- **frontend-design** - 独自性のあるフロントエンド設計
  - 脱・汎用デザイン
  - タイポグラフィ・カラー・モーション戦略
- **artifacts-builder** - React + Tailwind でHTML artifacts作成
- **mcp-builder** - MCP server作成
- **webapp-testing** - Playwright テスト

#### コミュニケーション系
- **brand-guidelines** - ブランドカラー・タイポグラフィの適用
- **internal-comms** - 報告書・ニュースレター・FAQ作成

#### メタ
- **skill-creator** - 新スキルをQ&A形式で作成

---

### コミュニティスキル（obra/superpowers）

#### テスト
- **test-driven-development** - RED-GREEN-REFACTORサイクル
  - アンチパターン参照付き

#### デバッグ
- **systematic-debugging** - 4フェーズ分析
  1. 症状の特定
  2. 仮説の立案
  3. 検証
  4. 修正と確認
- **verification-before-completion** - 修正の完了確認

#### 協働・計画
- **brainstorming** - ソクラテス式の設計精緻化
  - 1メッセージ1質問
  - 複数選択肢の提示
  - YAGNI原則の徹底
- **writing-plans** - 実装計画の作成
  - 2-5分タスクに分割
  - TDDアプローチ
  - ファイルパス・コード例・テストコマンド明記
  - 保存先: `docs/plans/YYYY-MM-DD-<feature>.md`
- **executing-plans** - 計画のバッチ実行
  - ヒューマンチェックポイント付き
- **dispatching-parallel-agents** - 並列サブエージェント実行
- **requesting-code-review** - コードレビュー前チェック
- **receiving-code-review** - フィードバック処理
- **using-git-worktrees** - 並列開発ブランチ管理
- **finishing-a-development-branch** - マージ・PR・クリーンアップ
- **subagent-driven-development** - 2段階レビュー（仕様準拠→コード品質）

#### メタ
- **writing-skills** - 新スキル作成フレームワーク
- **using-superpowers** - スキルシステム入門

---

## gaga-logでの活用案

### 優先度：高

#### 1. brainstorming スキル
**使用シーン:**
- 新機能実装前（例: 構造化データ、お問い合わせフォーム）
- デザイン大幅変更
- SEO戦略見直し

**効果:**
- 「とりあえず実装」の防止
- 複数選択肢の比較検討
- 意思決定のドキュメント化

**具体例:**
```
タスク: 「記事にschema.org/MusicRecordingを追加したい」
↓
/skill brainstorming
↓
質問1: この機能の目的は？
  A. SEOリッチリザルト表示
  B. Google検索結果の視覚強化
  C. その他

質問2: どの記事から？
  A. 全記事に一括適用
  B. 人気記事から段階的
  C. 新規記事のみ

質問3: データソースは？
  A. frontmatterから自動生成
  B. 手動追加
  C. Spotify/Apple Music API連携
↓
設計書: docs/plans/2026-01-30-schema-org-design.md
```

---

#### 2. writing-plans スキル
**使用シーン:**
- 複数ファイル変更（38記事の一括修正等）
- 新ページ追加（プライバシーポリシー、お問い合わせ）
- リファクタリング

**効果:**
- 作業の抜け漏れ防止
- 2-5分タスクで進捗可視化
- 中断からの再開が容易

**具体例:**
```
タスク: 「全記事にストリーミングアイコンを統一フォーマットで追加」
↓
/skill writing-plans
↓
生成される計画（docs/plans/2026-01-30-streaming-icons.md）:

# タスク1: コンポーネント作成（2分）
- ファイル: components/StreamingLinks.tsx
- コード: [完全なコード例]
- テスト: npm run dev で表示確認

# タスク2: bad-romance.mdで検証（3分）
- 既存HTMLを新コンポーネントに置換
- レイアウト確認

# タスク3: 全記事に展開（5分）
- 38ファイルに同じ変更適用
- git commit "Add unified streaming icons"

# タスク4: ビルド確認（2分）
- npm run build
- エラーなし確認
```

---

### 優先度：中

#### 3. systematic-debugging スキル
**使用シーン:**
- ビルドエラー
- SEO改善したのに順位が下がった
- Next.jsの予期しない挙動

**効果:**
- 体系的な問題分析
- 仮説検証の構造化

**具体例:**
```
問題: 「記事一覧ページの読み込みが遅い」
↓
/skill systematic-debugging
↓
1. 症状: app/posts/page.tsx が3秒かかる
2. 仮説:
   - Markdownパース処理？
   - 画像読み込み？
   - SSGの問題？
3. 検証: Next.js Profiler + Network タブ
4. 修正: 原因に応じた対処 + ベンチマーク
```

---

#### 4. frontend-design スキル
**使用シーン:**
- サイトデザインリニューアル
- 記事ページレイアウト変更
- 「note系ページをSEOで上から取る」ための差別化

**効果:**
- 脱・汎用デザイン
- ブランド一貫性の確保

**具体例:**
```
目的: 「note風の柔らかさから、音楽専門サイト感へ」
↓
/skill frontend-design
↓
提案:
- タイポグラフィ: Playfair Display（見出し）+ Inter（本文）
- カラー: ダークモード基調 + ビビッドピンクアクセント
- レイアウト: 左寄せテキスト + 右固定アルバムジャケット
- モーション: スクロールで歌詞引用がフェードイン
```

---

### 優先度：低（現時点では不要）

- **test-driven-development** - テストが必要になったら
- **git-worktrees** - 大規模リファクタ時
- **subagent-driven-development** - チーム開発時
- **docx/pdf/pptx/xlsx** - ドキュメント処理が必要になったら

---

## カスタムスキル案

### seo-article-structure スキル

**目的:** `docs/seo/SEO-STRATEGY.md` に基づく記事構造チェック

**保存先:** `.claude/skills/seo-article-structure/SKILL.md`

**機能:**
1. タイトル評価
   - ❌ 「和訳」含有チェック
   - ✅ 疑問形 or 理由系
   - ✅ 感情ワード含有

2. 冒頭文チェック（最重要）
   - ✅ 最初の3行で「意味ページ」だとわかるか
   - ❌ ポエムで始まっていないか
   - ✅ 読者の疑問を代弁しているか

3. 構造SEO
   - ✅ 7セクション完備
   - ✅ YouTube埋め込み
   - ✅ ストリーミングリンク

4. 禁止ワードチェック
   - ❌ 和訳、日本語訳、歌詞 和訳

**出力:**
```
【合格項目】
✅ タイトルに感情ワードあり
✅ YouTube埋め込み確認

【要改善項目】
❌ 冒頭がポエムで始まっている
❌ H2見出しが5個（7個推奨）

【改善案】
1. 冒頭を以下に変更:
   「この曲を聴いて、『結局、何を歌っているんだろう』と感じた人へ。
    このページでは、歌詞を直訳せず、この曲がどういう気持ちを描いているのかを整理します。」

2. 以下の見出しを追加:
   ## この曲の立ち位置
   ## 印象に残るフレーズと意味
```

---

## 導入ステップ（未実施）

```bash
# 1. スキルディレクトリ作成
mkdir -p .claude/skills

# 2. 公式スキルをクローン（必要なもののみ）
# 手動で skills/brainstorming/SKILL.md を配置

# 3. カスタムスキルを作成
# .claude/skills/seo-article-structure/SKILL.md を作成

# 4. 使用方法
/skill brainstorming
/skill writing-plans
/skill seo-article-structure
```

---

## 既存の仕組みとの統合

### 現在の `/seo-check` コマンド
- 手動プロセス（ステップバイステップ）
- ユーザーに質問しながら改善

### 統合案
```markdown
# .claude/commands/seo-check.md

1. `/skill seo-article-structure` で自動チェック
2. 問題点を抽出
3. ユーザーに改善案を提示
4. 承認後に実装
5. docs/seo/SEO_IMPROVEMENT_LOG.md に記録
```

---

## 判断：導入すべきか？

### YES（推奨）
- ✅ brainstorming - 新機能実装前の設計に有効
- ✅ writing-plans - 38記事の一括修正、リファクタリングで必須
- ✅ seo-article-structureカスタムスキル - 既存戦略の自動化

### MAYBE（様子見）
- ⚠️ systematic-debugging - トラブル頻度次第
- ⚠️ frontend-design - デザイン変更時のみ

### NO（不要）
- ❌ docx/pdf/xlsx - 使用シーンなし
- ❌ test-driven-development - テスト未導入
- ❌ git-worktrees - 個人開発で不要

---

## 次のアクション（保留）

1. **試験導入** - brainstormingスキルで構造化データ実装を設計
2. **カスタムスキル作成** - seo-article-structure
3. **既存コマンド統合** - `/seo-check` にスキルを組み込み

**結論:**
「いきなりコード書く」問題は、brainstorming + writing-plans の2スキルで解決できる可能性が高い。
ただし、現状のテンプレベース作業（記事執筆等）は既に確立されているため、導入は「新機能実装」や「大規模変更」に限定するのが適切。

---

**最終更新**: 2026-01-30
**ステータス**: 検討済み・導入は次回新機能実装時に判断
