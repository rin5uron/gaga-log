# Next.js学習ログ: 検索機能の実装

**実装日:** 2026年1月16日
**学習内容:** クライアントサイド検索機能の実装

---

## 今日実装した機能

### 1. 検索バーの追加
- トップページに検索入力欄を追加
- 検索アイコン付きのUI

### 2. 検索機能
- **検索対象:**
  - タイトル（例: "Bad Romance"）
  - アーティスト名（例: "Lady Gaga"）
  - 曲名（例: "Poker Face"）
- **特徴:**
  - 大文字・小文字を区別しない
  - リアルタイム検索（入力と同時に結果更新）

### 3. フィルタとの連携
- アーティストフィルタと検索を同時使用可能
- 例: "Lady Gaga"を選択 + "romance"で検索 → "Bad Romance"のみ表示

---

## Next.jsの基礎知識

### クライアントサイド vs サーバーサイド

| 方式 | 実行場所 | 用途 | 今回の選択 |
|------|---------|------|----------|
| **クライアントサイド** | ブラウザ | インタラクティブなUI | ✅ 採用 |
| **サーバーサイド** | サーバー | 大量データ処理 | ❌ 不要 |

**今回クライアントサイドを選んだ理由:**
- 記事数が少ない（28記事）→ ブラウザで十分高速
- リアルタイム検索が欲しい → サーバーリクエスト不要
- 実装が簡単

---

## コードの仕組み解説

### ファイル: `components/PostList.tsx`

#### 1. "use client" の意味

```tsx
"use client";  // ← この1行が重要
```

**役割:**
- Next.jsに「このコンポーネントはブラウザで動く」と伝える
- `useState`、`onClick`などのインタラクティブ機能を使える

**ルール:**
- ファイルの一番上に書く
- サーバーでは動かない（ブラウザ専用）

---

#### 2. useState でキーワードを管理

```tsx
const [searchQuery, setSearchQuery] = useState<string>("");
```

**意味:**
- `searchQuery`: 検索キーワードを保存する変数
- `setSearchQuery`: キーワードを更新する関数
- `useState("")`: 初期値は空文字

**動作:**
1. ユーザーが入力: "romance"
2. `setSearchQuery("romance")` が呼ばれる
3. `searchQuery` が "romance" になる
4. 画面が自動で再レンダリング（再描画）
5. 検索結果が更新される

---

#### 3. 検索処理のロジック

```tsx
const filteredPosts = posts.filter((post) => {
  // ステップ1: アーティストフィルタ
  const artistMatch = !selectedArtist || post.artist === selectedArtist;

  // ステップ2: 検索キーワードが空なら、アーティストフィルタだけで終了
  if (!searchQuery.trim()) {
    return artistMatch;
  }

  // ステップ3: 検索キーワードを小文字化
  const query = searchQuery.toLowerCase();

  // ステップ4: タイトル、アーティスト、曲名のいずれかに一致するかチェック
  const titleMatch = post.title?.toLowerCase().includes(query) || false;
  const artistMatchQuery = post.artist?.toLowerCase().includes(query) || false;
  const songMatch = post.song?.toLowerCase().includes(query) || false;

  // ステップ5: アーティストフィルタ AND (タイトル OR アーティスト OR 曲名)
  return artistMatch && (titleMatch || artistMatchQuery || songMatch);
});
```

**処理の流れ（例）:**

**入力:**
- selectedArtist: "Lady Gaga"
- searchQuery: "romance"

**処理:**
1. 全記事をループ
2. 各記事で:
   - アーティストが"Lady Gaga"か? → Yes
   - タイトルに"romance"含む? → "Bad Romance" → Yes
   - 両方Yesなら表示

**結果:** "Bad Romance"だけ表示

---

#### 4. 検索バーのUI

```tsx
<input
  type="text"
  placeholder="記事を検索（タイトル、アーティスト、曲名）"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="..."
/>
```

**仕組み:**
- `value={searchQuery}`: 入力欄に`searchQuery`の値を表示
- `onChange={(e) => setSearchQuery(e.target.value)}`:
  - ユーザーが入力するたびに実行
  - `e.target.value`: 入力欄の現在の値
  - `setSearchQuery(...)`: 状態を更新 → 再レンダリング

**例:**
1. ユーザーが "r" と入力
2. `onChange` 発火 → `setSearchQuery("r")`
3. `searchQuery` が "r" になる
4. `filteredPosts` が再計算される
5. "r"を含む記事だけ表示

---

## Next.jsの重要な概念

### 1. コンポーネント
- UI部品の単位
- 今回: `PostList`コンポーネント

### 2. 状態（State）
- コンポーネントが持つデータ
- 今回: `searchQuery`, `selectedArtist`

### 3. 再レンダリング
- 状態が変わると自動で画面更新
- 今回: 検索キーワードが変わる → 結果が更新

### 4. Props（プロップス）
- 親から子へデータを渡す
- 今回: `posts`, `artists` を `PostList` に渡す

---

## 今後の学習ポイント

### 次のステップ

**1. サーバーサイド検索を学ぶ**
- 記事が100件以上になったら検討
- `app/api/search/route.ts` でAPI作成
- データベース検索（将来的に）

**2. 検索パフォーマンス最適化**
```tsx
// デバウンス: 入力が止まってから検索
import { useDeb ounce } from "use-debounce";
const [debouncedQuery] = useDebounce(searchQuery, 300);
```

**3. 検索履歴の保存**
```tsx
// localStorage を使う
localStorage.setItem("searchHistory", JSON.stringify(history));
```

---

## 参考リンク

### Next.js公式ドキュメント
- [Client Components（"use client"）](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [State Management（useState）](https://react.dev/reference/react/useState)

### 今回使った技術
- **React Hooks**: `useState`
- **Array Methods**: `filter()`, `includes()`, `toLowerCase()`
- **Tailwind CSS**: スタイリング

---

## よくある質問

**Q1: なぜ "use client" が必要？**
A: Next.jsはデフォルトでサーバーコンポーネント。`useState`などブラウザ専用機能を使うには明示的に指定が必要。

**Q2: filterとmapの違いは？**
- `filter()`: 条件に合う要素だけ残す（今回使用）
- `map()`: 全要素を変換する

**Q3: `?.` の意味は？**
```tsx
post.title?.toLowerCase()
```
- Optional Chaining（オプショナルチェイニング）
- `post.title` が `null` や `undefined` でもエラーにならない

---

## 次回やること

1. **検索ハイライト機能**
   - 検索キーワードを黄色でハイライト

2. **検索結果の並び替え**
   - 関連度順、日付順など

3. **URLに検索キーワードを反映**
   - `?q=romance` のようなURL
   - ブックマーク・共有が可能に

---

**作成日:** 2026年1月16日
**学習時間:** 約1時間
**難易度:** ⭐⭐☆☆☆（初級〜中級）
