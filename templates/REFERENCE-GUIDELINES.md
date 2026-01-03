# 参考文献・情報源のガイドライン

**作成日**: 2026-01-03

---

## 基本方針

- **参考文献セクションは作らない**
- 文章内に自然にリンクを埋め込む
- Wikipedia以外の信頼できる音楽メディアを優先

---

## 情報源の優先順位

### 1. 公式サイト・レーベル（最優先）
- Lady Gaga公式サイト
- Interscope Records
- Universal Music等のレーベルサイト

### 2. 音楽メディア（推奨）
- **Billboard** - 業界標準、チャート・リリース情報
- **Rolling Stone** - アーティストインタビュー、アルバムレビュー
- **Pitchfork** - 音楽批評
- **NME** - 音楽ニュース

### 3. ストリーミングサービス
- **Apple Music** - リリース情報、アルバム詳細
- **Spotify** - 曲情報、プレイリスト

### 4. 音楽データベース
- **Discogs** - レコード情報、クレジット
- **AllMusic** - ディスコグラフィー
- **MusicBrainz** - メタデータ

### 5. Wikipedia（最終手段）
- 情報は豊富だが専門性が低い
- AdSense審査的にも他の情報源の方が有利
- やむを得ない場合のみ使用

---

## リンクの埋め込み方

### ❌ 参考文献セクションを作らない

```markdown
## 参考文献
- [曲名 - Wikipedia](URL)
- [曲名 - Apple Music](URL)
```

### ✅ 文章内に自然に埋め込む

```markdown
## About

[2016年10月21日にリリース](https://www.billboard.com/...)されたアルバム「Joanne」の収録曲。

[Mark Ronsonがプロデュース](https://www.rollingstone.com/...)したこのデュエット曲は...
```

---

## リンクを付ける対象

### リンクを付けるべき情報

- **リリース日・年**
  - 例: [2016年10月21日にリリース](Billboard記事)

- **プロデューサー・制作者**
  - 例: [Mark Ronsonがプロデュース](Rolling Stone記事)

- **チャート順位・セールス**
  - 例: [ビルボードで2位を記録](Billboard記事)

- **アーティストの発言・インタビュー**
  - 例: ガガは[「愛と狂気の間にあるもの」](音楽メディア記事)と語っている

### リンクを付けない情報

- **自分の感想・解釈**（オリジナルコンテンツ）
- **一般的な事実**（例: 「ポップミュージックは〜」）

---

## 関連記事セクションのルール

### ✅ 良い例

```markdown
## 関連記事

- [Joanne](/posts/joanne) - 叔母へのトリビュート。
- [Lady Gaga](/artists/lady-gaga) - Lady Gagaの他の楽曲を探す
```

### ❌ 悪い例

```markdown
## 関連記事

- **Hey Girl** - フローレンス・ウェルチとの共演。← 自分自身へのリンクは不要
```

**ルール**:
- 現在の記事自身は関連記事に含めない
- 他の記事・アーティストページへのリンクのみ

---

## 検索方法のヒント

### Billboard・Rolling Stone等を優先検索

```
"曲名" artist release site:billboard.com OR site:rollingstone.com
```

### 特定の情報を検索

```
"曲名" "Mark Ronson" producer site:billboard.com
```

---

## AdSense審査での評価ポイント

- ✅ **信頼できる情報源へのリンク** → サイトの信頼性向上
- ✅ **自然な文章内リンク** → ユーザー体験の向上
- ✅ **音楽メディアへのリンク** → 専門性の証明
- ❌ **Wikipedia頼み** → 専門性が低いと見なされる可能性

---

## 参考

- Billboard: https://www.billboard.com/
- Rolling Stone: https://www.rollingstone.com/
- Pitchfork: https://pitchfork.com/
- NME: https://www.nme.com/
