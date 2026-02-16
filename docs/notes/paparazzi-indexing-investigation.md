# Paparazzi 記事がクロールされるがインデックスされない件（調査メモ）

**対象URL**: https://sound-feels.com/posts/paparazzi  
**調査日**: 2026-02-16

---

## 確認した項目（問題なし）

| 項目 | 結果 |
|------|------|
| noindex / robots メタ | なし。記事ページに noindex は付与されていない |
| canonical | `https://sound-feels.com/posts/paparazzi` を正しく指定 |
| sitemap.xml | `getAllPosts()` で全 .md を取得しており、paparazzi も含まれる |
| robots.txt | `Allow: /` のみ。ブロックなし |
| 構造化データ | Article + BreadcrumbList + MusicRecording（楽曲）を出力 |
| 内部リンク | telephone, bad-romance, alejandro, lovegame, lady-gaga からリンクあり |
| コンテンツ量 | 約190行。他記事と同程度で「薄い」とは言えない |

---

## 想定される原因

1. **frontmatter に `theme` がない**
   - コード上、`theme` がある記事は `description` が「〇〇。テーマ文」となり、タイトルも「曲名 - テーマ \| How Sound Feels」になる。
   - `theme` がないと description は汎用の「歌詞の意味を解説。音を慈しみ…」になり、**他記事との差別化が弱く**、Google が「テンプレ量産」と判断する可能性がある。

2. **「Crawled - currently not indexed」の性質**
   - クロールはされているが、インデックス優先度が低いだけのことが多い。
   - 同一サイト内の楽曲記事が多く、差別化シグナル（タイトル・description の独自性）が弱いと、登録が後回しにされやすい。

3. **公開・更新時期**
   - date: 2026-01-18、updatedDate: 2026-01-22。比較的新しいため、まだインデックスキューに載っているだけの可能性もある。

---

## 実施した対応

- **frontmatter に `theme` を追加**  
  記事のテーマ（名声への渇望と執着、SNS時代にも通じる普遍性）を明示し、タイトル・description の差別化を強化した。

---

## 追加で推奨する対応

1. **Search Console で「インデックス登録のリクエスト」**  
   URL 検査 → 「インデックス登録をリクエスト」を実行。
2. **他記事との内部リンク**  
   すでに複数からリンクされているが、必要に応じて「名声」「MV」「Telephone」など関連記事からもう1〜2本リンクを増やす。
3. **経過観察**  
   1〜2週間ほど様子を見て、まだ「クロール済み－未登録」のままなら、上記1を再実行するか、コンテンツの追記・更新を検討。
