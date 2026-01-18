# 記事作成マニュアル（完全版）

## 記事作成の流れ

1. **frontmatter設定**（必須項目を漏れなく）
2. **YouTube埋め込み**
3. **ストリーミングリンク**
4. **ハイライト設定**（2つの魅力的なフレーズ）
5. **記事本文**（新構成で執筆）
6. **楽曲情報**（記事末尾）

---

## 1. Frontmatter（必須）

```yaml
---
title: "曲名"
song: "曲名"  # ← 重要！トップページ表示に必須
artist: "アーティスト名"
album: "アルバム名"
year: "リリース年"
date: "YYYY-MM-DD"  # ← 記事作成日
order: 番号
type: "song"
highlights:
  - ハイライト1（SEOキーワード含む、具体的な内容）
  - ハイライト2（読者が知りたい核心）
---
```

### ⚠️ よくある抜け漏れ

- ❌ `song` フィールドがない → トップページに表示されない
- ❌ `date` が未来の日付 → 表示順序がおかしくなる
- ❌ `highlights` がない → ハイライトボックスが表示されない

---

## 2. YouTube埋め込み＋ストリーミングリンク

```markdown
<!-- ▶️ YouTube公式動画の埋め込み -->
<iframe width="560" height="315" src="YouTube埋め込みURL" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

<!-- 🎧 ストリーミングで聴く -->
<a href="Apple Music検索URL" target="_blank" style="display: inline-block; margin-right: 12px;" title="Apple Musicで聴く">
  <img src="/icons/apple-music.svg" alt="Apple Music" width="32" height="32">
</a>
<a href="Spotify検索URL" target="_blank" style="display: inline-block;" title="Spotifyで聴く">
  <img src="/icons/spotify.svg" alt="Spotify" width="32" height="32">
</a>




```

---

## 3. 記事本文（新構成）

### H2: 固定（全記事共通）

```markdown
## About <span class="section-subtitle">この曲について</span>
## Lyrics <span class="section-subtitle">歌詞のポイント</span>
## Music Video <span class="section-subtitle">MV見どころ</span>
## Analysis <span class="section-subtitle">考察</span>
```

### H3: 基本2つずつ（具体的な見出し）

```markdown
## About <span class="section-subtitle">この曲について</span>

### [具体的な状況・疑問]（例：映画のどこで歌われている？）

[事実＋あなたの視点]
- リリース情報
- 映画・アルバムとの関係
- チャート成績

### [アーティスト・背景の切り口]（例：ガガとクーパー、二人の奇跡の共演）

[事実＋意味づけ]
- アーティストの挑戦
- 制作背景

---


## Lyrics <span class="section-subtitle">歌詞のポイント</span>

### [キーワード・テーマの意味]（例："Shallow"という言葉の二重の意味）

[言葉の意味＋曲での使われ方]
※歌詞の直接引用は最小限に

### [繰り返されるフレーズ＋歌詞の構造]（例："In the shallow" と "I'm falling"——繰り返される2つのフレーズ）

[2つのフレーズの意味＋対比・構造＋あなたの印象]
- デュエット曲なら二人のパート比較
- あなたの体験

---


## Music Video <span class="section-subtitle">MV見どころ</span>

### [MVの特徴的なシーン]（例：スター誕生の瞬間を切り取った名シーン）

[シーンの描写＋意味]
- 撮影場所・演出
- 視聴可能な場所のリンク

### [ライブパフォーマンス]（例：アカデミー賞でのライブパフォーマンス）

[パフォーマンスの描写]

---


## Analysis <span class="section-subtitle">考察</span>

### [曲ごとに変える]（例：この曲が今も聞かれ続けている理由 / この曲がヒットした理由 / この曲の本質）

**⚠️ 注意：このタイトルは固定テンプレートではありません。曲に合わせて変えてください。**

例：
- この曲が今も聞かれ続けている理由
- この曲がヒットした理由
- この曲の本質
- なぜこの曲は名作なのか

[客観的事実＋曲の本質＋普遍的テーマ]
- アーティストの挑戦
- 曲の構造・文脈
- 普遍的テーマの解説

### [曲の構造・化学反応]（例：二人だからこそ生まれた化学反応）

[対比・構造の分析＋あなたの体験]

---

### 私の感想

**⚠️ 注意：このセクションは目次に表示されません。H3ですが、余白で視覚的に分離されます。**

[あなたの個人的な思い出・体験]
[この曲があなたに与えたもの]

---
```

---

## ルール

### 必須要素
- [x] frontmatter（`song`, `artist`, `date` 必須）
- [x] YouTube埋め込み
- [x] ストリーミングリンク
- [x] highlights（2つ）
- [x] H2の英語＋日本語サブタイトル
- [x] 区切り線 `---`

### H3の原則
- **基本2つずつ**（必要に応じて3つまで）
- **具体的・状況が浮かぶ見出し**
- **「私の感想」は余白で区切る**（H3だが視覚的に分離）

### highlightsの書き方
- **SEOキーワードを含める**
- **読者の疑問に直結**
- **具体的＋問いかけ**

例：
```yaml
highlights:
  - 「Paparazzi」が描く名声の光と影——愛と執着の境界線
  - MVの衝撃的な殺人シーンに隠されたメッセージ
```

### AdSense対策チェックリスト
- [ ] 文字数2,000文字以上（推奨8,000文字以上）
- [ ] 歌詞の直接引用は最小限
- [ ] 出典明記
- [ ] 独自の視点・感想を含む

---

## トラブルシューティング

### トップページに表示されない
- `song` フィールドがあるか確認
- `date` が未来の日付になっていないか確認
- 開発サーバーを再起動（`rm -rf .next && npm run dev`）

### ハイライトが表示されない
- YAMLの文法エラーがないか確認
- ダブルクォートの中にダブルクォートがないか確認

### アーティスト名が表示されない
- `artist` フィールドがあるか確認
- コラボ曲の場合、`&` または `/` で区切る

---

## 例：完成形

→ `/content/posts/paparazzi.md` を参照
