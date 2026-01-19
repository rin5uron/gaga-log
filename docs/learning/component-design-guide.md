# コンポーネントデザイン改善ガイド

## はじめに

このガイドでは、「この記事でわかること」と「目次」のコンポーネントをカード風デザインに改善する方法を学びます。

## 対象ファイル

- `components/ArticleHighlights.tsx` - 「この記事でわかること」コンポーネント
- `components/TableOfContents.tsx` - 目次コンポーネント

---

## 1. ArticleHighlights.tsx の改善

### 現在のコード（13行目）

```tsx
<div className="mb-4 p-5 bg-gray-50 rounded-lg">
```

### 改善のヒント

#### カード風デザインにするための変更

1. **背景色を白に変更**
   - `bg-gray-50` → `bg-white`
   - よりカードらしい見た目になります

2. **角をより丸く**
   - `rounded-lg` → `rounded-xl`
   - より柔らかい印象になります

3. **影を追加**
   - `shadow-md` を追加
   - カードが浮いているような見た目になります

4. **ボーダーを追加**
   - `border border-gray-200` を追加
   - カードの境界がはっきりします

5. **ホバーエフェクトを追加**
   - `hover:shadow-lg` を追加
   - マウスを乗せた時に影が大きくなります

6. **トランジションを追加**
   - `transition-shadow duration-200` を追加
   - 影の変化がスムーズになります

### 改善後の例

```tsx
<div className="mb-6 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
```

### 箇条書きのアイコンを変更する

現在のコード（20行目）:
```tsx
<span className="text-gray-400 text-base mt-0.5 flex-shrink-0">•</span>
```

#### チェックマークアイコンに変更する場合

```tsx
<svg
  className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5 13l4 4L19 7"
  />
</svg>
```

#### または、シンプルに記号を使う場合

```tsx
<span className="text-blue-500 text-base mt-0.5 flex-shrink-0">✓</span>
```

### タイトル部分にアクセントラインを追加

タイトル部分（14-16行目）に左側にアクセントラインを追加する場合:

```tsx
<div className="flex items-center gap-2 mb-4">
  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
  <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
    この記事でわかること
  </h2>
</div>
```

---

## 2. TableOfContents.tsx の改善

### 現在のコード（92行目）

```tsx
<nav className="mb-0 rounded-lg bg-gray-50 overflow-hidden shadow-sm">
```

### 改善のヒント

#### カード風デザインにするための変更

1. **背景色を白に変更**
   - `bg-gray-50` → `bg-white`

2. **角をより丸く**
   - `rounded-lg` → `rounded-xl`

3. **影を大きく**
   - `shadow-sm` → `shadow-md`

4. **ボーダーを追加**
   - `border border-gray-200` を追加

5. **ホバーエフェクトを追加**
   - `hover:shadow-lg` を追加

6. **トランジションを追加**
   - `transition-shadow duration-200` を追加

### 改善後の例

```tsx
<nav className="mb-6 rounded-xl bg-white overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
```

### ボタン部分の改善（95行目）

現在のコード:
```tsx
<button
  onClick={() => setIsOpen(!isOpen)}
  className="w-full px-4 py-3 bg-gray-100 flex items-center justify-between hover:bg-gray-200 transition-colors border-b border-gray-300"
>
```

#### グラデーション背景を追加する場合

```tsx
<button
  onClick={() => setIsOpen(!isOpen)}
  className="w-full px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between hover:from-gray-100 hover:to-gray-200 transition-all border-b border-gray-200"
>
```

#### タイトル部分にアクセントラインを追加

```tsx
<div className="flex items-center gap-2">
  <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
  <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
    目次
  </h2>
</div>
```

### 見出しのボーダーを太くする（130行目、137行目）

現在のコード:
```tsx
border-l border-gray-300
```

改善後:
```tsx
border-l-2 border-gray-300
```

`border-l-2` は2pxの太いボーダーを意味します。

---

## 3. Tailwind CSSのクラス説明

### 影（Shadow）

- `shadow-sm` = 小さい影（1px程度）
- `shadow-md` = 中くらいの影（4px程度）
- `shadow-lg` = 大きい影（10px程度）
- `shadow-xl` = とても大きい影（20px程度）

### ボーダー（Border）

- `border` = 1pxのボーダー
- `border-2` = 2pxのボーダー
- `border-gray-200` = グレー（薄い）のボーダー
- `border-blue-500` = 青のボーダー

### 角丸（Rounded）

- `rounded` = 4pxの角丸
- `rounded-lg` = 8pxの角丸
- `rounded-xl` = 12pxの角丸
- `rounded-2xl` = 16pxの角丸

### ホバー（Hover）

- `hover:shadow-lg` = マウスを乗せた時に影を大きく
- `hover:bg-gray-200` = マウスを乗せた時に背景色を変更
- `hover:text-gray-900` = マウスを乗せた時に文字色を変更

### トランジション（Transition）

- `transition-shadow` = 影の変化をスムーズに
- `transition-colors` = 色の変化をスムーズに
- `transition-all` = すべての変化をスムーズに
- `duration-200` = 200ミリ秒で変化

### グラデーション（Gradient）

- `bg-gradient-to-r` = 左から右へのグラデーション
- `from-gray-50` = グラデーションの開始色
- `to-gray-100` = グラデーションの終了色

---

## 4. 実践の手順

### ステップ1: ArticleHighlights.tsx を改善

1. `components/ArticleHighlights.tsx` を開く
2. 13行目の `className` を変更してみる
   - 例: `bg-gray-50` → `bg-white`
   - 例: `rounded-lg` → `rounded-xl`
   - 例: `shadow-md` を追加
3. ブラウザで確認（開発サーバーが起動している場合、自動でリロードされます）
4. 気に入ったら次に進む
5. 箇条書きのアイコンも変更してみる

### ステップ2: TableOfContents.tsx を改善

1. `components/TableOfContents.tsx` を開く
2. 92行目の `className` を変更してみる
3. 95行目のボタンの `className` も変更してみる
4. ブラウザで確認
5. 見出しのボーダーも太くしてみる

### ステップ3: 微調整

1. 色を変えてみる（`bg-blue-50` など）
2. パディング（余白）を調整してみる（`p-5` → `p-6` など）
3. マージン（外側の余白）を調整してみる（`mb-4` → `mb-6` など）

---

## 5. よくある質問

### Q: 変更が反映されない

A: 開発サーバーが起動しているか確認してください。Next.jsは通常、ファイルを保存すると自動でリロードされます。

### Q: どのクラスを使えばいいかわからない

A: Tailwind CSSの公式ドキュメントを参考にしてください: https://tailwindcss.com/docs

### Q: 色を変えたい

A: `bg-gray-50` の `gray` の部分を `blue`、`green`、`red` などに変更できます。数字も変更できます（`50`、`100`、`200` など）。

### Q: 影が強すぎる/弱すぎる

A: `shadow-md` → `shadow-sm`（弱く）または `shadow-lg`（強く）に変更してください。

---

## 6. 参考リソース

- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [Tailwind CSS カラー](https://tailwindcss.com/docs/customizing-colors)
- [Tailwind CSS シャドウ](https://tailwindcss.com/docs/box-shadow)

---

## 7. 完成例（参考）

改善後のコードの一例です。参考にしてください。

### ArticleHighlights.tsx の完成例

```tsx
return (
  <div className="mb-6 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
      <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
        この記事でわかること
      </h2>
    </div>
    <ul className="space-y-3 pl-0 list-none">
      {highlights.map((highlight, index) => (
        <li key={index} className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-gray-700 text-sm leading-relaxed flex-1">{highlight}</span>
        </li>
      ))}
    </ul>
  </div>
);
```

### TableOfContents.tsx の完成例（nav部分）

```tsx
return (
  <nav className="mb-6 rounded-xl bg-white overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between hover:from-gray-100 hover:to-gray-200 transition-all border-b border-gray-200"
    >
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
        <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
          目次
        </h2>
      </div>
      <svg
        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    {/* 以下、既存のコード */}
  </nav>
);
```

---

## まとめ

このガイドを参考に、自分でコンポーネントを改善してみてください。最初は少しずつ変更して、ブラウザで確認しながら進めるのがおすすめです。

分からないことがあれば、このガイドを見返したり、Tailwind CSSの公式ドキュメントを確認してください。

頑張ってください！
