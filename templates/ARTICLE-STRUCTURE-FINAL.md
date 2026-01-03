# 記事の最終構成

**作成日**: 2026-01-03

---

## Front Matter（メタデータ）

```yaml
---
title: "曲タイトル"
song: "曲タイトル"
artist: "アーティスト名"  # コラボの場合: "Artist A feat. Artist B"
date: "YYYY-MM-DD"
order: 1
type: "song"  # または "movie"
relatedPosts: ["関連記事のslug1", "関連記事のslug2"]  # 任意
---
```

---

## 記事本文の構成

### 1. YouTube公式動画

```markdown
<!-- ▶️ YouTube公式動画の埋め込み -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---
```

### 2. ストリーミングリンク

```markdown
<!-- 🎧 ストリーミングで聴く -->
<a href="APPLE_MUSIC_URL" target="_blank" style="display: inline-block; margin-right: 12px;" title="Apple Musicで聴く">
  <img src="/icons/apple-music.svg" alt="Apple Music" width="32" height="32">
</a>
<a href="SPOTIFY_URL" target="_blank" style="display: inline-block;" title="Spotifyで聴く">
  <img src="/icons/spotify.svg" alt="Spotify" width="32" height="32">
</a>

---
```

### 3. About（この曲について）

```markdown
## About <span class="section-subtitle">この曲について</span>

[リリース情報](信頼できる音楽メディアへのリンク)や曲の背景を記載。

**リンクの埋め込み例:**
- [2016年10月21日にリリース](Billboard記事)
- [Mark Ronsonがプロデュース](Rolling Stone記事)

---

個人的な第一印象や感想を書く。

---
```

**ルール:**
- 客観的情報には信頼できる音楽メディア（Billboard、Rolling Stone等）へリンク
- Wikipedia以外を優先
- 参考文献セクションは作らない（文章内に埋め込む）

### 4. Lyrics（歌詞のポイント）

```markdown
## Lyrics <span class="section-subtitle">歌詞のポイント</span>

この曲を聴くときに知っておくと深まるポイント。

> 引用したいフレーズ（90文字未満）

フレーズの解説や、なぜ惹かれたかを書く。

---
```

### 5. Favorite Lines（口ずさみたいフレーズ）

```markdown
## Favorite Lines <span class="section-subtitle">口ずさみたいフレーズ</span>

> 覚えたいフレーズ

カラオケで歌う場合のポイントや、覚えておくと楽しめるフレーズ。

---
```

### 6. Music Video（MVの見どころ）

```markdown
## Music Video <span class="section-subtitle">MVの見どころ</span>

MVの説明や印象的なシーン。

---
```

### 7. 任意のセクション

```markdown
## （自由なタイトル）

この曲から感じたこと、学んだことを自由に書く。

---
```

### 8. 関連記事

```markdown
---

## 関連記事

- [関連楽曲1](/posts/slug) - 関連楽曲の説明
- [関連楽曲2](/posts/slug) - 関連楽曲の説明
- [他の楽曲を探す](/artists/artist-slug)
```

**ルール:**
- 現在の記事自身は含めない
- アーティスト名にはリンクを付けない（「他の楽曲を探す」だけにリンク）
- 理由: アーティスト名は記事上部の「Artist:」に既にリンクがある

---

## 重要なルール

### ❌ 参考文献セクションは作らない

```markdown
## 参考文献
- [曲名 - Wikipedia](URL)
- [曲名 - Apple Music](URL)
```

### ✅ 文章内に自然にリンクを埋め込む

```markdown
[2016年10月21日にリリース](https://www.billboard.com/...)されたアルバム「Joanne」の収録曲。
```

### 情報源の優先順位

1. **公式サイト・レーベル**（最優先）
2. **音楽メディア**（Billboard、Rolling Stone、Pitchfork等）
3. **ストリーミングサービス**（Apple Music、Spotify）
4. **音楽データベース**（Discogs、AllMusic）
5. **Wikipedia**（最終手段）

詳細は [参考文献ガイドライン](./REFERENCE-GUIDELINES.md) を参照。

---

## アーティスト名の表記

### コラボ曲の場合

```yaml
artist: "Lady Gaga feat. Florence + The Machine"
```

**表示:**
- `Lady Gaga`（リンク） + ` feat. `（リンクなし） + `Florence + The Machine`（リンク、ページがあれば）

**ルール:**
- `&`, `feat.`, `featuring` はリンクなし
- 各アーティスト名は、アーティストページが存在すればリンク

---

## 関連記事セクションの例

### ✅ 良い例

```markdown
## 関連記事

- [Joanne](/posts/joanne) - 叔母へのトリビュート。
- [Gaga: Five Foot Two](/posts/gaga-five-foot-two) - ガガの制作過程を追ったドキュメンタリー。
- [他の楽曲を探す](/artists/lady-gaga)
```

### ❌ 悪い例

```markdown
## 関連記事

- **Hey Girl** - フローレンス・ウェルチとの共演。← 自分自身は含めない
- [Lady Gaga](/artists/lady-gaga) - Lady Gagaの他の楽曲を探す ← 名前にリンク重複
```

---

## チェックリスト

記事公開前に確認すること:

- [ ] Front Matterが正しく設定されている
- [ ] YouTube動画が埋め込まれている
- [ ] ストリーミングリンクが設定されている
- [ ] 参考文献セクションがない（文章内リンクのみ）
- [ ] 情報源は信頼できる音楽メディア優先
- [ ] 関連記事に自分自身が含まれていない
- [ ] アーティスト名の重複リンクがない
- [ ] 引用は90文字未満

---

## 参考

- [参考文献・情報源のガイドライン](./REFERENCE-GUIDELINES.md)
- [記事テンプレート](./template-song.md)
