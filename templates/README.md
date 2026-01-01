# テンプレート使い方ガイド

このフォルダには、記事作成用のテンプレートが入っています。

## テンプレート一覧

| ファイル | 用途 |
|---------|------|
| `template-song.md` | 曲の記事 |
| `template-movie.md` | 映画・ドキュメンタリーの記事 |
| `template-artist.md` | アーティスト紹介 |

---

## 記事の書き方

### 1. frontmatter（記事の設定）

各テンプレートの先頭にある `---` で囲まれた部分。

**曲の場合:**
```yaml
---
title: "曲タイトル"
song: "曲タイトル"
artist: "アーティスト名"
date: "YYYY-MM-DD"
order: 1
type: "song"
---
```

**映画の場合:**
```yaml
---
title: "作品タイトル"
work: "作品タイトル"
artist: "監督名 / 出演者名"
date: "YYYY-MM-DD"
order: 1
type: "movie"
---
```

### 2. セクション見出しの書き方

セクション見出しには、サブタイトルを `<span class="section-subtitle">` で追加します。

**曲の記事:**
```markdown
## About <span class="section-subtitle">この曲について</span>
## Lyrics <span class="section-subtitle">歌詞のポイント</span>
## Favorite Lines <span class="section-subtitle">口ずさみたいフレーズ</span>
## Music Video <span class="section-subtitle">MVの見どころ</span>
```

**映画の記事:**
```markdown
## About <span class="section-subtitle">この作品について</span>
## Highlights <span class="section-subtitle">ここだけは見てほしい！</span>
## Thoughts <span class="section-subtitle">この作品の私の感想</span>
## Now <span class="section-subtitle">今の私と、この作品</span>
```

---

## デザイン仕様

文字サイズ・余白・色などの詳細は `docs/DESIGN.md` を参照してください。

主なポイント：
- セクションサブタイトルは `0.95rem`、グレー (`#6b7280`)
- 引用ボックスは左に太いボーダー、背景グレー
- セクション間は `6rem` の余白

---

## アーティストページについて

アーティストページの作成方法、著作権・肖像権の注意事項、情報ソースのリンク付けなどは、`docs/ARTIST-STRATEGY.md` を参照してください。

主なポイント：
- アルバムジャケット画像は使用可能（公式サイト・ストリーミングサービスで公開されているもの）
- 顔写真は個人撮影以外は使用しない
- 事実情報には必ず情報ソースへのリンクを付ける
- 「私のお気に入り曲・作品」セクションでブログ感を出す

---

## 注意事項

- 末尾に日付は書かない（frontmatterの `date` で管理）
- 必ず `type` フィールドを指定する（`"song"` または `"movie"`）
- 既存記事のフォーマットを参考にする場合は `content/posts/zoo.md` を見る
- **参考文献は記事の最後、関連記事の上に小さく記載する**（下記参照）

---

## 参考文献の記載方法

記事の最後、関連記事の上に、小さく邪魔にならないように参考文献を記載します。

```markdown
---

## 参考文献

- [曲名 - 公式サイト](URL)
- [曲名 - Wikipedia](URL)
- [アルバム名 - Apple Music](URL)

### 関連記事

特定の関連楽曲がある場合はその楽曲へのリンク、なければアーティストページへのリンクを記載：

- [関連楽曲1](/posts/記事slug) - 関連楽曲の説明（特定の楽曲がある場合）
- [アーティスト名](/artists/アーティストslug) - このアーティストの他の楽曲
```

**スタイル:**
- 小さなフォントサイズ（`text-sm`）
- グレー系の色（`text-gray-600`）
- 関連記事の上に配置（関連記事コンポーネントの前に表示される）

**関連記事の方針:**
- 特定の関連楽曲がある場合 → その楽曲へのリンクを記載
- 関連楽曲がない場合 → アーティストページへのリンクを記載（アーティストページには全楽曲がまとまっているため）


