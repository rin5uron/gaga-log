# AdSense広告ユニット実装ガイド

**作成日**: 2026年1月10日

---

## 📋 実装手順

### ステップ1: AdSense管理画面で広告ユニットを作成

1. [AdSense管理画面](https://www.google.com/adsense/)にログイン
2. 「広告」→「広告ユニット」をクリック
3. 「新しい広告ユニット」をクリック
4. 広告タイプを選択（推奨: 「表示広告」→「レスポンシブ」）
5. 広告ユニット名を入力（例: "記事上部"、"記事下部"）
6. 「広告ユニットを作成」をクリック
7. **広告スロットIDをコピー**（例: `1234567890`）

**推奨: 複数の広告ユニットを作成**
- 記事上部用: 1つ
- 記事下部用: 1つ
- トップページ用: 1つ

---

### ステップ2: 環境変数を設定（オプション）

広告スロットIDを環境変数で管理する場合：

1. `.env.local`ファイルを作成（まだない場合）
2. 以下のように設定：

```env
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP=記事上部のスロットID
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM=記事下部のスロットID
NEXT_PUBLIC_ADSENSE_SLOT_HOME=トップページのスロットID
```

**注意**: `NEXT_PUBLIC_`で始まる環境変数は、ブラウザ側でも使えるようになります。

---

### ステップ3: 記事ページに広告ユニットを配置

`app/posts/[slug]/page.tsx`を編集：

```tsx
import AdSenseUnit from "@/components/AdSenseUnit";

// ... 既存のコード ...

// 記事ページのreturn内に追加
<article className="prose prose-lg max-w-none">
  {/* 記事上部の広告 */}
  <AdSenseUnit 
    adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP || "YOUR_SLOT_ID_HERE"}
  />

  <header className="mb-6 not-prose">
    {/* ... 既存のヘッダー ... */}
  </header>

  {/* 目次 */}
  <TableOfContents html={contentHtml} />

  <div
    className="prose prose-lg max-w-none post-content"
    dangerouslySetInnerHTML={{ __html: contentHtml }}
  />
</article>

{/* 記事下部の広告 */}
<AdSenseUnit 
  adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM || "YOUR_SLOT_ID_HERE"}
/>

<RelatedPosts currentPost={post} allPosts={allPosts} />
```

---

### ステップ4: トップページに広告ユニットを配置

`app/page.tsx`を編集：

```tsx
import AdSenseUnit from "@/components/AdSenseUnit";

// ... 既存のコード ...

<section className="mb-12 pb-8 border-b border-gray-200">
  {/* ... 既存のコンテンツ ... */}
</section>

{/* トップページの広告 */}
<AdSenseUnit 
  adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || "YOUR_SLOT_ID_HERE"}
/>

<PostList posts={posts} artists={artists} />
```

---

## ⚠️ 重要な注意点

### 1. 広告スロットIDの取得

- AdSense管理画面で広告ユニットを作成しないと、広告スロットIDは取得できません
- 広告スロットIDは、`data-ad-slot`属性に設定する数値です

### 2. 承認前の動作

- 承認されるまでは、実際の広告は表示されません
- テスト広告が表示される場合がありますが、収益は発生しません
- 承認後、自動的に実際の広告が表示されます

### 3. 広告の配置位置

- 記事の内容を邪魔しない位置に配置してください
- モバイル表示でも適切に表示されるか確認してください
- 広告を配置しすぎると、ユーザー体験が悪くなります

### 4. 環境変数の設定

- `.env.local`ファイルは、`.gitignore`に追加されていることを確認してください
- 本番環境（Vercel）でも環境変数を設定する必要があります

---

## 🔍 確認方法

### 1. ブラウザの開発者ツールで確認

1. ページを開く
2. 右クリック → 「検証」または「開発者ツール」
3. 「Elements」タブで、`<ins class="adsbygoogle">`を検索
4. 広告ユニットが正しく配置されているか確認

### 2. AdSense管理画面で確認

1. AdSense管理画面にログイン
2. 「広告」→「広告ユニット」をクリック
3. 作成した広告ユニットの「ステータス」を確認
4. 「アクティブ」になっているか確認

---

## 📝 実装例

### 環境変数を使わない場合

```tsx
// 記事ページに直接スロットIDを指定
<AdSenseUnit adSlot="1234567890" />
```

### 環境変数を使う場合

```tsx
// 環境変数から取得（フォールバック付き）
<AdSenseUnit 
  adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP || "1234567890"}
/>
```

---

## 🚀 次のステップ

1. AdSense管理画面で広告ユニットを作成
2. 広告スロットIDを取得
3. 記事ページとトップページに広告ユニットを配置
4. ブラウザで確認
5. 1〜2週間後に再申請

---

最終更新日：2026年1月10日

