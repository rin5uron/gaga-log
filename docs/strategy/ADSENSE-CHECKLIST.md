# AdSense広告ユニット 確認チェックリスト

**作成日**: 2026年1月10日

---

## ✅ 実装済み項目

- [x] 広告ユニットコンポーネント（`components/AdSenseUnit.tsx`）を作成
- [x] 記事ページ（`app/posts/[slug]/page.tsx`）に広告ユニットの配置場所を追加
- [x] トップページ（`app/page.tsx`）に広告ユニットの配置場所を追加
- [x] 実装ガイド（`docs/strategy/ADSENSE-IMPLEMENTATION-GUIDE.md`）を作成

---

## 📋 次にやること（あなたがやる作業）

### ステップ1: AdSense管理画面で広告ユニットを作成

1. [AdSense管理画面](https://www.google.com/adsense/)にログイン
2. 「広告」→「広告ユニット」をクリック
3. 「新しい広告ユニット」をクリック
4. 広告タイプを選択（推奨: 「表示広告」→「レスポンシブ」）
5. 広告ユニット名を入力（例: "記事上部"、"記事下部"、"トップページ"）
6. 「広告ユニットを作成」をクリック
7. **広告スロットIDをコピー**（例: `1234567890`）

**推奨: 3つの広告ユニットを作成**
- 記事上部用: 1つ
- 記事下部用: 1つ
- トップページ用: 1つ

---

### ステップ2: 環境変数を設定（推奨）

1. プロジェクトのルートディレクトリに`.env.local`ファイルを作成（まだない場合）
2. 以下のように設定：

```env
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP=記事上部のスロットID
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM=記事下部のスロットID
NEXT_PUBLIC_ADSENSE_SLOT_HOME=トップページのスロットID
```

**例:**
```env
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM=0987654321
NEXT_PUBLIC_ADSENSE_SLOT_HOME=1122334455
```

**注意**: 
- `.env.local`ファイルは`.gitignore`に追加されていることを確認してください
- 本番環境（Vercel）でも環境変数を設定する必要があります

---

### ステップ3: コードのコメントアウトを解除

#### 記事ページ（`app/posts/[slug]/page.tsx`）

**記事上部の広告:**
```tsx
// この行のコメントアウトを解除
<AdSenseUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP || "YOUR_SLOT_ID_HERE"} />
```

**記事下部の広告:**
```tsx
// この行のコメントアウトを解除
<AdSenseUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM || "YOUR_SLOT_ID_HERE"} />
```

#### トップページ（`app/page.tsx`）

```tsx
// この行のコメントアウトを解除
<AdSenseUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || "YOUR_SLOT_ID_HERE"} />
```

**環境変数を使わない場合:**
- `"YOUR_SLOT_ID_HERE"`の部分を、実際の広告スロットIDに置き換えてください

---

### ステップ4: 確認

1. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

2. **ブラウザで確認**
   - 記事ページを開く
   - トップページを開く
   - 右クリック → 「検証」または「開発者ツール」
   - 「Elements」タブで、`<ins class="adsbygoogle">`を検索
   - 広告ユニットが正しく配置されているか確認

3. **AdSense管理画面で確認**
   - AdSense管理画面にログイン
   - 「広告」→「広告ユニット」をクリック
   - 作成した広告ユニットの「ステータス」を確認
   - 「アクティブ」になっているか確認

---

## 🔍 トラブルシューティング

### 広告が表示されない

**承認前の場合:**
- 承認されるまでは、実際の広告は表示されません
- テスト広告が表示される場合がありますが、収益は発生しません
- これは正常な動作です

**承認後の場合:**
- 広告スロットIDが正しいか確認
- 環境変数が正しく設定されているか確認
- ブラウザのコンソールでエラーがないか確認

### エラーが表示される

- ブラウザのコンソール（開発者ツール）でエラーメッセージを確認
- 広告スロットIDが正しいか確認
- AdSenseスクリプトが正しく読み込まれているか確認

---

## 📝 メモ

- 広告ユニットは、承認されるまでは表示されません
- 承認後、自動的に実際の広告が表示されます
- 広告を配置しすぎると、ユーザー体験が悪くなるので注意してください

---

最終更新日：2026年1月10日

