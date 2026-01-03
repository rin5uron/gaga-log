# How Sound Feels - 音楽と言葉の記録サイト

**音を慈しむ。声を愛する。**

## このサイトのコンセプト

音を慈しむ。声を愛する。

その延長線上に、このサイトはあります。

歌を知ること、アーティストを知ること、その人と良い距離でいること——
それが、心地よく愛するための方法だと思っています。

このサイトは、歌詞の意味を解説するだけでなく、
**その言葉、音、雰囲気、いろんなものを記録する場所**です。

愛しさを追求するために、残す。

## プロジェクトの位置づけ

- 歌詞の意味を説明する場所ではない
- 正解を提示する場所でもない
- **その言葉、音、雰囲気、いろんなものを記録する場所**

他人に向けて"売る"のではなく、自分のために"残す"。結果として、同じ温度の人が読む。

---

## 🤖 AIへの指示（新規記事を作成する場合）

このプロジェクトで新しい記事を作成する場合は、以下のコマンドを実行してください：

```
/new-article
```

このコマンドは `.claude/commands/new-article.md` を実行し、`.claude/article-workflow.md` に記載された完全な手順に従って記事を生成します。

### 記事作成の流れ

1. ユーザーに曲名とアーティスト名を確認
2. 6つの質問（出会い、印象的なフレーズ、刺さった理由、覚えたい部分、今の関係、全体の印象）を聞く
3. Web検索で曲の基本情報を調べる
4. `content/posts/[曲名].md` を作成
5. フォーマットルールに従って記事を生成

**重要**: 詳細な手順は `.claude/article-workflow.md` を必ず参照してください。

---

## 記事テンプレート

新しい記事を作成する際は、以下のテンプレートを使用してください：

- **楽曲の記事**: `content/posts/template-song.md`
- **映像作品の記事**: `content/posts/template-movie.md`

### Front Matter（記事のメタデータ）

記事の冒頭には、以下の形式でメタデータを記載します：

```yaml
---
title: "タイトル"
song: "曲名"  # 楽曲の場合
work: "作品名"  # 映像作品の場合
artist: "アーティスト名"
date: "YYYY-MM-DD"
order: 1  # 表示順序（数字が小さいほど上に表示）
type: "song" または "movie"
relatedPosts: ["関連記事のslug1", "関連記事のslug2"]  # 任意
---
```

### 関連リンク機能

記事同士を関連づけることができます。

#### 使い方

Front Matterに `relatedPosts` フィールドを追加します：

```yaml
relatedPosts: ["joanne", "gaga-five-foot-two"]
```

- **値**: 関連記事のスラッグ（ファイル名から `.md` を除いたもの）の配列
- **効果**: 記事ページの下部に「関連する記事」セクションが表示されます
- **優先順位**:
  1. 手動指定した関連記事（`relatedPosts`）
  2. 同じアーティストの他の記事

#### 例

`content/posts/joanne.md`:
```yaml
---
title: "Joanne"
artist: "Lady Gaga"
type: "song"
relatedPosts: ["gaga-five-foot-two"]
---
```

`content/posts/gaga-five-foot-two.md`:
```yaml
---
title: "Gaga: Five Foot Two"
artist: "Lady Gaga / クリス・モーカーベル"
type: "movie"
relatedPosts: ["joanne"]
---
```

この設定により、「Joanne」の記事には「Gaga: Five Foot Two」へのリンクが、「Gaga: Five Foot Two」の記事には「Joanne」へのリンクが表示されます。

---

## 技術スタック

- **Next.js** - フレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - スタイリング
- **Vercel** - ホスティング
- **Markdown** - 記事管理

## ドキュメント

- [きっかけと今の思い](./docs/ORIGIN.md) - なぜこのプロジェクトを始めたか
- [将来性分析](./docs/ANALYSIS.md) - プロジェクトの将来性を水平思考バイアスに気をつけて分析
- [フェーズ管理](./docs/PHASES.md) - プロジェクトの進行状況と計画
- [SEO戦略](./docs/SEO-STRATEGY.md) - AdSense収益化に向けたSEO対策と方針
- [記事作成ワークフロー](./.claude/article-workflow.md) - AI補助による記事作成の完全手順書
- [参考文献・情報源のガイドライン](./templates/REFERENCE-GUIDELINES.md) - 信頼できる情報源の優先順位とリンクの埋め込み方

## 目標

- **アーカイブとして完成している状態を目指す**
- 1年後、記事が30本あれば、それ自体が価値
- 検索に引っかかるようになるのは、記事が溜まってから

---

**作成日**: 2025年12月27日
**最終更新**: 2025年12月27日

