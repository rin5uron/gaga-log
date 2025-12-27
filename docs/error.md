# エラーログ

## 2025年12月27日

### 1. Vercelデプロイエラー（Next.js 15のparams型エラー）

**エラー内容：**
```
Type error: Type '{ params: { slug: string; }; }' does not satisfy the constraint 'PageProps'.
Types of property 'params' are incompatible.
Type '{ slug: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally
```

**原因：**
- Next.js 15では、動的ルートの`params`が`Promise`を返すように変更された
- `generateStaticParams`の戻り値の型が明示的に指定されていなかった

**解決方法：**
- `app/posts/[slug]/page.tsx`の`params`を`Promise<{ slug: string }>`に変更
- `const { slug } = await params;`で`params`を`await`するように修正
- `generateStaticParams`の戻り値の型を`Promise<Array<{ slug: string }>>`に明示的に指定

**修正後のコード：**
```typescript
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  // ...
}
```

**コミット：** `31934cd エラー改善`

---

### 2. ローカルで内容が表示されない問題

**症状：**
- ブラウザで`http://localhost:3000`や`http://localhost:3001`にアクセスしても記事の本文が表示されない
- タイトルと日付のみ表示される

**原因：**
- 開発サーバーが正常に起動していない可能性
- ブラウザのキャッシュの問題
- `remark-html`の処理に問題がある可能性

**解決方法：**
- 開発サーバーを再起動
- ブラウザのハードリロード（`Cmd + Shift + R`）
- ブラウザのキャッシュをクリア

**確認方法：**
- 開発サーバーのターミナルでエラーメッセージを確認
- ブラウザの開発者ツール（F12）のコンソールでエラーを確認

---

### 3. ディスクリプションが反映されない問題

**症状：**
- `app/layout.tsx`でディスクリプションを「「ある言葉に、なぜ惹かれたか」を残す記録 = 私の愛のログ」に変更したが、Vercelで反映されない

**原因：**
- Vercelのビルドが古いバージョンを使用している可能性
- ブラウザのキャッシュの問題

**解決方法：**
- Vercelで再デプロイ
- ブラウザのキャッシュをクリア
- メタタグが正しく生成されているか確認（ページのソースを表示）

**確認方法：**
- ローカルでは正しく表示されている（`<meta name="description" content="「ある言葉に、なぜ惹かれたか」を残す記録 = 私の愛のログ"/>`）

---

### 4. 本文が消えている問題

**症状：**
- 記事ページ（`/posts/hey-girl`）で本文が表示されない

**原因：**
- `remark-html`の処理に問題がある可能性
- Markdownのコンテンツが正しく取得できていない可能性

**確認方法：**
- `content/posts/hey-girl.md`に内容が存在することを確認
- 開発サーバーのターミナルで「Processing markdown, content length:」と「HTML generated, length:」のログを確認

**解決方法：**
- 開発サーバーを再起動
- ブラウザのハードリロード
- エラーハンドリングでフォールバック処理が動作しているか確認

---

### 5. ポート3001の問題

**症状：**
- 開発サーバーがポート3001で起動している
- ポート3000が使用されているため、自動的に3001に切り替わっている

**原因：**
- ポート3000が既に使用されている（他のプロセスや以前の開発サーバー）

**解決方法：**
- ポート3000を使用しているプロセスを終了
- または、ポート3001でアクセスする（`http://localhost:3001`）

**確認方法：**
```bash
lsof -ti:3000,3001
```

**注意：**
- ポート3001でアクセスする場合は、ブラウザのURLを`http://localhost:3001`に変更する必要がある

---

## 今後の対策

1. **Next.js 15の変更点を確認**
   - `params`が`Promise`を返すようになった
   - `generateStaticParams`の型を明示的に指定する

2. **デプロイ前の確認**
   - ローカルで`npm run build`を実行してエラーがないか確認
   - 型エラーがないか確認

3. **キャッシュの問題**
   - デプロイ後はブラウザのキャッシュをクリア
   - Vercelで再デプロイが必要な場合がある

4. **ポートの問題**
   - 開発サーバーを起動する前に、使用中のポートを確認
   - 必要に応じてポートを変更

