# [エラー修正] Vercelビルド失敗 - layout.tsx の img border 属性

## 実施日
2026年2月11日

## エラー概要
Vercel でデプロイした際、ビルドが失敗し「Error・グッズ入れた」と表示された。原因は `app/layout.tsx` 内の楽天A8用 `<img>` タグに指定した `border={0}` 属性による TypeScript 型エラー。

## 原因
- `<img>` に **`border={0}`** を指定していた
- `border` は HTML5 で非推奨の属性であり、React の `ImgHTMLAttributes` 型定義に含まれていない
- そのため TypeScript が「Property 'border' does not exist」とエラーを出し、ビルドが失敗していた

## 修正内容

### 対象ファイル
- `app/layout.tsx`

### 変更内容
- 楽天バナー用 `<img>` の `border={0}` を **`style={{ border: 0 }}`** に変更
- 計測用 1x1 ピクセル `<img>` の `border={0}` を **`style={{ border: 0 }}`** に変更
- 見た目・挙動は同じで、型エラーが解消される

## 実装チェックリスト
- [x] 原因特定（ローカルで `npm run build` で再現）
- [x] 修正実装（`border={0}` → `style={{ border: 0 }}`）
- [x] ビルド成功確認（ローカル）
- [ ] デプロイ（Vercel で再デプロイ後の確認）

## 学び・メモ
- HTML の古い属性（`border` など）は React/TypeScript の型に含まれないことがある
- 枠線なしにしたい場合は `style={{ border: 0 }}` や CSS で指定する

## 参考
- エラー発生デプロイ: コミットメッセージ等で「グッズ入れた」と表示されていたデプロイ
- Next.js 15 / React 18 の型定義では `border` は `<img>` に存在しない
