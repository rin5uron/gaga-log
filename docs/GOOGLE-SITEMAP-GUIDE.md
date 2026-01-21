# Googleにサイトマップを認識させる方法

## 📋 実装したこと

### サイトマップの自動生成
- `app/sitemap.ts` を更新し、以下のページを自動的に含むようにしました：
  - ✅ 静的ページ（ホーム、About、Contact、Privacy）
  - ✅ 全記事ページ（`content/posts/` 内の全 `.md` ファイル）
  - ✅ 全アーティストページ（`content/artists/` 内の全 `.md` ファイル + 記事から抽出したアーティスト名）

### 新しく追加されたページ
- ✅ `/artists/taylor-swift` - テイラースウィフトのアーティストページ
- ✅ `/posts/all-too-well` - All Too Well の曲ページ

これらのページは、ビルド時に自動的にサイトマップに追加されます。

---

## 🚀 Googleに認識させる手順

### 1. サイトマップのURLを確認

デプロイ後、以下のURLでサイトマップが公開されます：
```
https://sound-feels.com/sitemap.xml
```

**確認方法**：
1. ブラウザで `https://sound-feels.com/sitemap.xml` にアクセス
2. XML形式でサイトマップが表示されることを確認
3. `taylor-swift` や `all-too-well` が含まれているか確認

---

### 2. Google Search Console に登録（初回のみ）

#### 2-1. Google Search Console にアクセス
- URL: https://search.google.com/search-console
- Googleアカウントでログイン

#### 2-2. プロパティを追加
1. 「プロパティを追加」をクリック
2. 「URLプレフィックス」を選択
3. `https://sound-feels.com` を入力
4. 「続行」をクリック

#### 2-3. 所有権の確認
- **推奨方法：HTMLファイル**
  1. 「HTMLファイル」タブを選択
  2. ダウンロードされたHTMLファイルを、プロジェクトの `public/` フォルダに配置
  3. デプロイ後、「確認」をクリック

- **代替方法：HTMLタグ**
  1. 「HTMLタグ」タブを選択
  2. 表示された `<meta>` タグをコピー
  3. `app/layout.tsx` の `<head>` セクションに追加
  4. デプロイ後、「確認」をクリック

---

### 3. サイトマップを送信

#### 3-1. サイトマップ送信画面を開く
1. Google Search Console の左メニューから「サイトマップ」を選択
2. 「新しいサイトマップの追加」をクリック

#### 3-2. サイトマップURLを入力
```
sitemap.xml
```
または
```
https://sound-feels.com/sitemap.xml
```

#### 3-3. 送信
1. 「送信」をクリック
2. 数分〜数時間で「成功」と表示されます

---

### 4. インデックス登録の確認

#### 4-1. インデックス登録状況を確認
1. Google Search Console の左メニューから「ページ」を選択
2. 「インデックス登録済み」タブで、登録されたページ数を確認

#### 4-2. 個別ページのインデックス状況を確認
1. 「URL検査」ツールを使用
2. 例：`https://sound-feels.com/posts/all-too-well` を入力
3. 「インデックス登録をリクエスト」をクリック（必要に応じて）

---

## ⚙️ 今後の運用

### 新しいページを追加したとき

**自動対応**：
- 新しい記事（`content/posts/` に `.md` ファイルを追加）→ 自動的にサイトマップに追加
- 新しいアーティストページ（`content/artists/` に `.md` ファイルを追加）→ 自動的にサイトマップに追加

**手動でインデックス登録を促す場合**：
1. Google Search Console の「URL検査」ツールを使用
2. 新しいページのURLを入力
3. 「インデックス登録をリクエスト」をクリック

---

### サイトマップの更新頻度

**現在の設定**：
- 記事ページ：`changeFrequency: 'weekly'`（週次更新）
- アーティストページ：`changeFrequency: 'weekly'`（週次更新）
- 静的ページ：`changeFrequency: 'monthly'` または `'yearly'`（月次/年次更新）

**`lastModified` の更新**：
- 記事ページ：`updatedDate` または `date` を使用
- アーティストページ：`updatedDate` または `date` を使用（プロファイルページがある場合）

---

## 🔍 トラブルシューティング

### サイトマップが認識されない場合

1. **サイトマップのURLが正しいか確認**
   - `https://sound-feels.com/sitemap.xml` にアクセスして、XMLが表示されるか確認

2. **robots.txt を確認**
   - `public/robots.txt` に `Sitemap: https://sound-feels.com/sitemap.xml` が記載されているか確認

3. **ビルドエラーがないか確認**
   - `npm run build` を実行して、エラーがないか確認

4. **Google Search Console のエラーを確認**
   - 「サイトマップ」画面で、エラーメッセージがないか確認

---

### ページがインデックスされない場合

1. **URL検査ツールで確認**
   - Google Search Console の「URL検査」ツールで、ページがクロール可能か確認

2. **robots.txt を確認**
   - ページが `robots.txt` でブロックされていないか確認

3. **noindex タグがないか確認**
   - ページの `<head>` に `<meta name="robots" content="noindex">` がないか確認

4. **手動でインデックス登録をリクエスト**
   - 「URL検査」ツールで「インデックス登録をリクエスト」をクリック

---

## 📚 参考リンク

- [Google Search Console ヘルプ](https://support.google.com/webmasters)
- [サイトマップの作成方法](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Next.js サイトマップのドキュメント](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

---

**最終更新**: 2026年1月20日
