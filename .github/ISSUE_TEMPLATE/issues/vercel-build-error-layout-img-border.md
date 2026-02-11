# [エラー修正] Vercelビルド失敗 - img border 属性（同一事象で複数回）

同一原因（`<img>` の `border` 属性による TypeScript 型エラー）で複数回発生。**ファイルを増やさずこの1本に追記する。**

---

## 1回目: layout.tsx

### 実施日
2026年2月11日

### エラー概要
Vercel でデプロイした際、ビルドが失敗し「Error・グッズ入れた」と表示された。原因は `app/layout.tsx` 内の楽天A8用 `<img>` タグに指定した `border={0}` 属性による TypeScript 型エラー。

### 原因
- `<img>` に **`border={0}`** を指定していた
- `border` は HTML5 で非推奨の属性であり、React の `ImgHTMLAttributes` 型定義に含まれていない
- そのため TypeScript が「Property 'border' does not exist」とエラーを出し、ビルドが失敗していた

### 修正内容
- **対象ファイル**: `app/layout.tsx`
- 楽天バナー用 `<img>` の `border={0}` を **`style={{ border: 0 }}`** に変更
- 計測用 1x1 ピクセル `<img>` の `border={0}` を **`style={{ border: 0 }}`** に変更

### 実装チェックリスト
- [x] 原因特定（ローカルで `npm run build` で再現）
- [x] 修正実装（`border={0}` → `style={{ border: 0 }}`）
- [x] ビルド成功確認（ローカル）
- [ ] デプロイ（Vercel で再デプロイ後の確認）

---

## 2回目: RakutenWidget.tsx

### 実施日
2026年2月11日

### エラー概要
Vercel でデプロイした際、ビルドが失敗し「Error・ズートピア商品と楽天ばなー」と表示された。原因は `components/RakutenWidget.tsx` 内の楽天A8計測用 `<img>` タグに指定した `border={0}` 属性による TypeScript 型エラー。

### 原因
- トラッキング用 1x1 ピクセル `<img>` に **`border={0}`** を指定していた
- 上記と同様に `border` が React の型定義に含まれていない
- エラーメッセージ: 「Property 'border' does not exist on type 'DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>'」

### 修正内容
- **対象ファイル**: `components/RakutenWidget.tsx`
- 計測用 1x1 ピクセル `<img>` の `border={0}` を削除し、**`style={{ border: 0 }}`** に変更

### 実装チェックリスト
- [x] 原因特定（ローカルで `npm run build` で再現）
- [x] 修正実装（`border={0}` → `style={{ border: 0 }}`）
- [x] ビルド成功確認（ローカル）
- [ ] デプロイ（Vercel で再デプロイ後の確認）

---

## 学び・メモ（共通）
- HTML の古い属性（`border` など）は React/TypeScript の型に含まれないことがある
- 枠線なしにしたい場合は `style={{ border: 0 }}` や CSS で指定する
- 今後 `<img>` を書くときは `border` 属性は使わず、最初から `style={{ border: 0 }}` にする

## 参考
- Next.js 15 / React 18 の型定義では `border` は `<img>` に存在しない
