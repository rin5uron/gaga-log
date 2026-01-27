# Google検索インデックス改善ガイド

## 現状確認方法

### 1. Google Search Consoleで確認

#### 1-1. インデックス状況の確認
1. [Google Search Console](https://search.google.com/search-console)にアクセス
2. 左メニューから「ページ」を選択
3. 「インデックス登録済み」と「インデックス登録されていません」の数を確認

#### 1-2. 特定ページの確認
1. Google Search Consoleの上部検索バーで「URL検査」を選択
2. ページURLを入力（例：`https://sound-feels.com/posts/mayhem-ball-tour-tokyo-report`）
3. 「インデックス登録をリクエスト」ボタンをクリック

#### 1-3. サイトマップの確認
1. 左メニューから「サイトマップ」を選択
2. `sitemap.xml`が送信済みか確認
3. エラーがないか確認

### 2. サイトマップの確認

#### 2-1. サイトマップに含まれているか確認
ブラウザで以下にアクセス：
```
https://sound-feels.com/sitemap.xml
```

`mayhem-ball-tour-tokyo-report`のURLが含まれているか確認

#### 2-2. サイトマップの再送信
1. Google Search Consoleの「サイトマップ」を開く
2. `sitemap.xml`を削除して再送信
3. または「再処理をリクエスト」をクリック

### 3. クローラビリティの確認

#### 3-1. robots.txtの確認
ブラウザで以下にアクセス：
```
https://sound-feels.com/robots.txt
```

ページがブロックされていないか確認

#### 3-2. ページのメタタグ確認
ページのHTMLソースを確認し、以下がないか確認：
```html
<meta name="robots" content="noindex">
```

## 改善案

### 即座に実行すべき対策

#### 1. URL検査ツールでインデックス登録をリクエスト
1. Google Search Consoleの「URL検査」ツールを使用
2. `https://sound-feels.com/posts/mayhem-ball-tour-tokyo-report`を入力
3. 「インデックス登録をリクエスト」をクリック
4. 通常、数時間〜数日でインデックスされる

#### 2. サイトマップの再送信
1. Google Search Consoleの「サイトマップ」を開く
2. `sitemap.xml`を削除
3. `https://sound-feels.com/sitemap.xml`を再送信
4. エラーがないか確認

#### 3. 内部リンクの追加
- ホームページから記事へのリンクを追加
- 関連記事からこの記事へのリンクを追加
- サイトマップページがあればそこにも追加

### 中期的な対策

#### 1. 構造化データの追加
記事ページに構造化データ（JSON-LD）を追加：
- Articleスキーマ
- BreadcrumbListスキーマ
- 既に実装済みの場合は確認

#### 2. ページの最適化
- タイトルタグの最適化（既に実装済み）
- メタディスクリプションの最適化（既に実装済み）
- 見出しタグ（H1, H2, H3）の適切な使用（既に実装済み）

#### 3. ページ速度の最適化
- 画像の最適化（JPEG変換済み）
- 画像の圧縮
- 遅延読み込み（lazy loading）の実装

### 長期的な対策

#### 1. 定期的なコンテンツ更新
- 記事の定期的な更新
- 新しい情報の追加
- 関連記事へのリンク追加

#### 2. ソーシャルシェア
- SNSでのシェア
- 外部サイトからのリンク獲得

#### 3. パフォーマンスの監視
- Google Search Consoleで定期的に確認
- インデックス状況の監視
- エラーの早期発見と修正

## 緊急対応手順（新鮮さが命の場合）

### 1. 即座に実行
1. **URL検査ツールでインデックス登録をリクエスト**
   - Google Search Console → URL検査
   - `https://sound-feels.com/posts/mayhem-ball-tour-tokyo-report`を入力
   - 「インデックス登録をリクエスト」をクリック

2. **サイトマップの再送信**
   - Google Search Console → サイトマップ
   - `sitemap.xml`を削除して再送信

3. **内部リンクの追加**
   - ホームページに最新記事として追加
   - 関連記事（`mayhem-ball-tour.md`など）からリンク追加

### 2. 数時間後
1. Google Search Consoleでインデックス状況を確認
2. エラーがないか確認
3. 必要に応じて再度リクエスト

### 3. 24時間後
1. Google検索で `site:sound-feels.com mayhem-ball-tour-tokyo-report` で検索
2. インデックスされているか確認
3. まだインデックスされていない場合は、再度リクエスト

## LoveGame・Abracadabra を Google に登録する

この2ページは `content/posts/` に存在するため、sitemap（`getAllPosts()`）には含まれており、理論上はクロール対象です。Google にまだインデックスされていない場合は、**URL検査で「インデックス登録をリクエスト」**を行う必要があります。

### 登録手順

1. [Google Search Console](https://search.google.com/search-console) にログインする
2. 上部の **「URL検査」** を開く
3. 次のURLを**1件ずつ**入力し、 **「インデックス登録をリクエスト」** をクリックする  
   - `https://sound-feels.com/posts/lovegame`  
   - `https://sound-feels.com/posts/abracadabra`
4. リクエスト後、数時間〜数日でインデックスされることが多い

### 事前確認（任意）

- ブラウザで `https://sound-feels.com/sitemap.xml` を開き、  
  `<loc>https://sound-feels.com/posts/lovegame</loc>` と  
  `<loc>https://sound-feels.com/posts/abracadabra</loc>` が含まれているか確認する
- mayhem-ball-tour 記事からこれらのページへ内部リンクが張られていれば、クロールの契機になる

---

## 確認チェックリスト

- [ ] Google Search Consoleにログイン
- [ ] URL検査ツールでページを確認
- [ ] インデックス登録をリクエスト
- [ ] サイトマップを再送信
- [ ] robots.txtを確認
- [ ] ページのメタタグを確認（noindexがないか）
- [ ] サイトマップにURLが含まれているか確認
- [ ] 内部リンクを追加
- [ ] 24時間後に検索結果を確認

## 参考リンク

- [Google Search Console](https://search.google.com/search-console)
- [URL検査ツール](https://search.google.com/search-console/inspect)
- [サイトマップの作成方法](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [インデックス登録のリクエスト](https://support.google.com/webmasters/answer/9012289)
