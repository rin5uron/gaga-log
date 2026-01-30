# SEO 7セクション構造統一 実装計画

> **For Claude:** この計画を2-5分タスクで実行します。

**Goal:** 38記事すべてにSEO戦略の7セクション構造を適用し、Google評価を統一する

**Architecture:**
- 微修正グループ（34記事）: 不足している1セクションを追加
- 大幅修正グループ（4記事）: 複数セクションを追加・構造を再編
- ストリーミングボタンを新コンポーネントに統一

**Tech Stack:** Markdown, Next.js, StreamingLinksコンポーネント

---

## Phase 1: 現状分析と検証準備

### Task 1: 分析スクリプト実行（2分）

**Files:**
- 実行: `scripts/check-seo-structure.sh`

**Step 1: スクリプト実行**

```bash
bash scripts/check-seo-structure.sh > docs/seo/structure-check-2026-01-30.txt
```

**Expected:** 38記事の詳細なチェック結果

**Step 2: 結果確認**

```bash
cat docs/seo/structure-check-2026-01-30.txt
```

**Expected:**
- 微修正: 34記事
- 大幅修正: 4記事

---

### Task 2: bad-romance.mdで新ボタン検証（5分）

**Files:**
- Modify: `content/posts/bad-romance.md`

**Step 1: 古いストリーミングリンクを削除**

現在の26-31行目を削除:
```html
<a href="https://music.apple.com/..." ...>
```

**Step 2: 新コンポーネントに置換**

```markdown
<StreamingLinks
  appleMusicUrl="https://music.apple.com/jp/album/bad-romance/1440818588?i=1440818880"
  spotifyUrl="https://open.spotify.com/track/0SiywuOBPcyXaHy6b6yJcF"
/>
```

**Step 3: 開発サーバーで確認**

```bash
npm run dev
```

**Expected:**
- http://localhost:3000/posts/bad-romance でボタン風表示確認
- ホバーで色変化
- クリックでストリーミングサービスへ遷移

**Step 4: ビルド確認**

```bash
npm run build
```

**Expected:** エラーなし

---

## Phase 2: 微修正グループ（34記事）

### Task 3: 不足セクション特定（3分）

**Files:**
- Create: `scripts/find-missing-sections.sh`

**Step 1: スクリプト作成**

```bash
#!/bin/bash

for file in content/posts/*.md; do
  filename=$(basename "$file" .md)

  # 各セクションの詳細チェック
  if ! grep -q "口ずさみ\|歌いたい\|Sing" "$file"; then
    echo "$filename: 「口ずさみポイント」不足"
  fi
done
```

**Step 2: 実行**

```bash
bash scripts/find-missing-sections.sh
```

**Expected:** 各記事で不足しているセクションのリスト

---

### Task 4: テンプレートセクション作成（2分）

**Files:**
- Create: `templates/missing-sections.md`

**Content:**

```markdown
## Sing <span class="section-subtitle">覚えたい、歌いたいポイント</span>

このセクションだけ読めば、この曲が10倍楽しくなる。

### <span class="section-subtitle">サビの「○○○」部分</span>

[具体的なフレーズ]

音程が取りやすく、一度聴けば覚えられる。
ライブで会場全体が歌う、この曲のハイライト。

---

## Me and This Song <span class="section-subtitle">今の私と、この曲</span>

[この曲との個人的なつながり・体験・感想]

この曲を聴くと、[具体的な感情・シーン]を思い出す。
```

---

### Task 5: 1記事目修正（abracadabra.md）（5分）

**Files:**
- Modify: `content/posts/abracadabra.md`

**Step 1: 不足セクションを追加**

テンプレートから「口ずさみポイント」を追加

**Step 2: ストリーミングリンクを新コンポーネントに置換**

**Step 3: 確認**

```bash
npm run dev
# http://localhost:3000/posts/abracadabra で確認
```

**Expected:** 7/7セクション完備

**Step 4: コミット**

```bash
git add content/posts/abracadabra.md
git commit -m "feat: add missing SEO section to abracadabra"
```

---

### Task 6-38: 残り33記事に同様の修正（各5分）

**作業手順（各記事）:**
1. 不足セクションを特定
2. テンプレートから追加
3. ストリーミングリンクを新コンポーネントに置換
4. 確認
5. 5記事ごとにコミット

**コミットメッセージ:**
```bash
git add content/posts/{記事1,記事2,記事3,記事4,記事5}.md
git commit -m "feat: add missing SEO sections (batch 1/7)"
```

**Total Time:** 165分（2時間45分）

---

## Phase 3: 大幅修正グループ（4記事）

### Task 39: gaga-five-foot-two.md 修正（15分）

**Files:**
- Modify: `content/posts/gaga-five-foot-two.md`

**Current Status:** 1/7（ドキュメンタリー記事）

**Step 1: 記事タイプを確認**

```bash
grep "^type:" content/posts/gaga-five-foot-two.md
```

**Expected:** `type: "documentary"` or `type: "movie"`

**Step 2: ドキュメンタリー用の構造に調整**

7セクションをドキュメンタリー向けに変更:
1. 視聴導線（Netflix/Prime Video等）
2. YouTube予告編埋め込み
3. この作品について
4. 何が描かれている？
5. 印象に残るシーン
6. 観るべきポイント
7. 今の私と、この作品

**Step 3: セクション追加**

**Step 4: 確認・コミット**

```bash
npm run dev
git add content/posts/gaga-five-foot-two.md
git commit -m "feat: restructure gaga-five-foot-two for documentary format"
```

---

### Task 40-42: 残り3記事修正（各10分）

- mayhem-ball-tour-tokyo-report.md（ライブレポート形式）
- mayhem-ball-tour.md（ツアー概要）
- one-shot.md（曲記事）

**Total Time:** 45分

---

## Phase 4: 最終確認

### Task 43: 全記事再チェック（3分）

```bash
bash scripts/check-seo-structure.sh
```

**Expected:** 38記事すべて ✅ (7/7)

---

### Task 44: ビルド確認（2分）

```bash
npm run build
```

**Expected:** エラーなし

---

### Task 45: コミット・記録（3分）

```bash
git add .
git commit -m "feat: unify SEO 7-section structure across all 38 articles

- All articles now have consistent structure
- Streaming links converted to StreamingLinks component
- Documentary/live articles adapted to appropriate format

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**記録:**
- `docs/seo/SEO_IMPROVEMENT_LOG.md` に記録

---

## 実装スケジュール

| Phase | タスク数 | 所要時間 | 累計 |
|-------|---------|---------|------|
| Phase 1 | 2 | 7分 | 7分 |
| Phase 2 | 36 | 180分 | 187分 |
| Phase 3 | 4 | 45分 | 232分 |
| Phase 4 | 3 | 8分 | 240分 |
| **合計** | **45** | **4時間** | - |

---

## 実装判断

**今すぐ実装する:**
- Phase 1（分析・検証）: 10分
- Task 5（1記事目）: 5分

**後日実装する:**
- Phase 2-3（残り37記事）: 約4時間

**理由:**
- 1記事で検証し、問題なければ本格展開
- 4時間の作業は別セッションで実行

---

**作成日**: 2026-01-30
**ステータス**: Phase 1実行待ち
