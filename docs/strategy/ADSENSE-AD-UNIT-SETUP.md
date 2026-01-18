# AdSense広告ユニットの作成方法

**作成日**: 2026-01-18

---

## 📋 手順

### ステップ1: AdSense管理画面にログイン

1. [Google AdSense](https://www.google.com/adsense/)にアクセス
2. Googleアカウントでログイン
3. サイトが既にAdSenseアカウントに登録されていることを確認

---

### ステップ2: 広告ユニットを作成

1. **左メニューから「広告」をクリック**（既に選択されている場合はそのまま）
2. **画面上部のタブで「広告ユニットごと」をクリック**
   - 現在「サイトごと」タブが選択されている場合、その隣に「広告ユニットごと」タブがあります
   - このタブをクリックすると、広告ユニットの作成・管理画面が表示されます
3. **「新しい広告ユニット」ボタンをクリック**
   - もしボタンが見当たらない場合は、「広告ユニットごと」タブ内を確認してください

---

### ステップ3: 広告タイプを選択

**推奨: 「表示広告」→「レスポンシブ」**

- **表示広告**: テキスト広告と画像広告の両方を表示
- **レスポンシブ**: 画面サイズに自動で対応（モバイル・PC両対応）

---

### ステップ4: 広告ユニット名を入力

**推奨: 4つの広告ユニットを作成**

1. **記事上部用**
   - 名前: `記事上部` または `Article Top`
   - ✅ 作成済み: スロットID `3743339192`
   
2. **記事中間用（目次の後）**
   - 名前: `記事中間` または `Article Middle`
   
3. **記事下部用**
   - 名前: `記事下部` または `Article Bottom`
   
4. **トップページ用**
   - 名前: `トップページ` または `Home Page`

---

### ステップ5: 広告ユニットを作成

1. **「広告ユニットを作成」ボタンをクリック**
2. **広告スロットIDをコピー**（例: `1234567890`）
   - このIDは後で使うので、必ずメモしておく

---

### ステップ6: 環境変数に設定

#### ローカル環境（`.env.local`）

プロジェクトのルートディレクトリに`.env.local`ファイルを作成（または既存のファイルを編集）：

```env
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP=記事上部のスロットID
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MIDDLE=記事中間のスロットID
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM=記事下部のスロットID
NEXT_PUBLIC_ADSENSE_SLOT_HOME=トップページのスロットID
```

**例:**
```env
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP=3743339192
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MIDDLE=記事中間のスロットID
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM=記事下部のスロットID
NEXT_PUBLIC_ADSENSE_SLOT_HOME=トップページのスロットID
```

#### 本番環境（Vercel）

1. [Vercel Dashboard](https://vercel.com/dashboard)にログイン
2. プロジェクトを選択
3. **「Settings」→「Environment Variables」をクリック**
4. 以下の4つの環境変数を追加：
   - `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP`
   - `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MIDDLE`
   - `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM`
   - `NEXT_PUBLIC_ADSENSE_SLOT_HOME`
5. 各環境変数に、対応する広告スロットIDを入力
6. **「Save」をクリック**
7. **再デプロイ**（環境変数を変更した場合は再デプロイが必要）

---

### ステップ7: コードのコメントアウトを解除

#### 記事ページ（`app/posts/[slug]/page.tsx`）

**記事上部の広告（428行目あたり）:**
```tsx
// この行のコメントアウトを解除
<AdSenseUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_TOP || "YOUR_SLOT_ID_HERE"} />
```

**記事下部の広告（533行目あたり）:**
```tsx
// この行のコメントアウトを解除
<AdSenseUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM || "YOUR_SLOT_ID_HERE"} />
```

#### トップページ（`app/page.tsx`）

**69行目あたり:**
```tsx
// この行のコメントアウトを解除
<AdSenseUnit adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || "YOUR_SLOT_ID_HERE"} />
```

**環境変数を使わない場合:**
- `"YOUR_SLOT_ID_HERE"`の部分を、実際の広告スロットIDに置き換える

---

### ステップ8: 確認

1. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

2. **ブラウザで確認**
   - 記事ページを開く（例: `http://localhost:3000/posts/paparazzi`）
   - トップページを開く（例: `http://localhost:3000`）
   - 右クリック → 「検証」または「開発者ツール」
   - 「Elements」タブで、`<ins class="adsbygoogle">`を検索
   - 広告ユニットが正しく配置されているか確認

3. **AdSense管理画面で確認**
   - AdSense管理画面にログイン
   - 「広告」→「広告ユニット」をクリック
   - 作成した広告ユニットの「ステータス」を確認
   - 「アクティブ」になっているか確認

---

## ⚠️ 注意事項

### 承認前の場合

- 承認されるまでは、実際の広告は表示されません
- テスト広告が表示される場合がありますが、収益は発生しません
- これは正常な動作です

### 承認後の場合

- 広告が自動的に表示されます
- 収益が発生します

---

## 🔍 トラブルシューティング

### 広告が表示されない

**承認前の場合:**
- 正常です。承認されるまでは表示されません

**承認後の場合:**
- 広告スロットIDが正しいか確認
- 環境変数が正しく設定されているか確認
- ブラウザのコンソールでエラーがないか確認
- 再デプロイが必要な場合があります

### エラーが表示される

- ブラウザのコンソール（開発者ツール）でエラーメッセージを確認
- 広告スロットIDが正しいか確認
- AdSenseスクリプトが正しく読み込まれているか確認（`components/AdSense.tsx`）

---

## 📝 メモ

- 広告ユニットは、承認されるまでは表示されません
- 承認後、自動的に実際の広告が表示されます
- 広告を配置しすぎると、ユーザー体験が悪くなるので注意してください
- 記事の内容が広告で隠れないように注意してください

---

最終更新日：2026年1月18日
