# Tailwind CSS 基礎ガイド

## はじめに

このガイドでは、Tailwind CSSの基本的な使い方を体系的に学びます。特に、コンポーネントのデザインを改善するために必要な知識を中心に説明します。

---

## 目次

1. [Tailwind CSSとは](#tailwind-cssとは)
2. [角丸（Rounded）の使い方](#角丸roundedの使い方)
3. [影（Shadow）の使い方](#影shadowの使い方)
4. [ボーダー（Border）の使い方](#ボーダーborderの使い方)
5. [色（Color）の使い方](#色colorの使い方)
6. [余白（Spacing）の使い方](#余白spacingの使い方)
7. [ホバー（Hover）の使い方](#ホバーhoverの使い方)
8. [トランジション（Transition）の使い方](#トランジションtransitionの使い方)
9. [組み合わせ方のコツ](#組み合わせ方のコツ)
10. [実践例](#実践例)

---

## Tailwind CSSとは

Tailwind CSSは、**ユーティリティファースト**のCSSフレームワークです。

### 従来のCSSとの違い

**従来のCSS:**
```css
.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
}
```

**Tailwind CSS:**
```tsx
<div className="bg-white rounded-xl shadow-md p-6">
```

### メリット

- **クラス名を覚えるだけで使える** - CSSファイルを書く必要がない
- **一貫性がある** - デザインシステムに沿った値を使える
- **カスタマイズしやすい** - プロジェクトに合わせて調整できる

---

## 角丸（Rounded）の使い方

### 基本的な使い方

角丸は `rounded-{サイズ}` という形式で指定します。

```tsx
<div className="rounded">     {/* 4px */}
<div className="rounded-sm">  {/* 2px */}
<div className="rounded-md">  {/* 6px */}
<div className="rounded-lg">  {/* 8px */}
<div className="rounded-xl">  {/* 12px */}
<div className="rounded-2xl"> {/* 16px */}
<div className="rounded-3xl"> {/* 24px */}
<div className="rounded-full"> {/* 完全な円形 */}
```

### サイズの比較

| クラス | サイズ | 使用例 |
|--------|--------|--------|
| `rounded-sm` | 2px | 小さなボタン |
| `rounded` | 4px | 標準的な要素 |
| `rounded-md` | 6px | 中程度の要素 |
| `rounded-lg` | 8px | カードなど |
| `rounded-xl` | 12px | 大きなカード |
| `rounded-2xl` | 16px | 非常に大きなカード |
| `rounded-3xl` | 24px | 特大のカード |
| `rounded-full` | 50% | 円形のボタン、アバター |

### 特定の角だけを丸くする

```tsx
<div className="rounded-t-lg">    {/* 上だけ */}
<div className="rounded-r-lg">    {/* 右だけ */}
<div className="rounded-b-lg">    {/* 下だけ */}
<div className="rounded-l-lg">    {/* 左だけ */}
<div className="rounded-tl-lg">   {/* 左上だけ */}
<div className="rounded-tr-lg">   {/* 右上だけ */}
<div className="rounded-bl-lg">   {/* 左下だけ */}
<div className="rounded-br-lg">   {/* 右下だけ */}
```

### 実践例

```tsx
// カード風デザイン
<div className="bg-white rounded-xl p-6">
  コンテンツ
</div>

// 円形のボタン
<button className="bg-blue-500 rounded-full w-12 h-12">
  ✓
</button>

// 上だけ丸いタブ
<div className="bg-gray-100 rounded-t-lg p-4">
  タブコンテンツ
</div>
```

---

## 影（Shadow）の使い方

### 基本的な使い方

影は `shadow-{サイズ}` という形式で指定します。

```tsx
<div className="shadow-sm">   {/* 小さい影 */}
<div className="shadow">      {/* 標準の影 */}
<div className="shadow-md">   {/* 中くらいの影 */}
<div className="shadow-lg">   {/* 大きい影 */}
<div className="shadow-xl">   {/* とても大きい影 */}
<div className="shadow-2xl">  {/* 非常に大きい影 */}
<div className="shadow-inner"> {/* 内側の影 */}
<div className="shadow-none"> {/* 影なし */}
```

### サイズの比較

| クラス | 効果 | 使用例 |
|--------|------|--------|
| `shadow-sm` | 1px程度の薄い影 | 控えめな要素 |
| `shadow` | 標準的な影 | 一般的なカード |
| `shadow-md` | 4px程度の影 | カード風デザイン |
| `shadow-lg` | 10px程度の影 | 目立たせたい要素 |
| `shadow-xl` | 20px程度の影 | ポップアップ |
| `shadow-2xl` | 25px程度の影 | モーダル |

### カスタム影（色を指定）

```tsx
<div className="shadow-lg shadow-blue-500/50">  {/* 青い影 */}
<div className="shadow-lg shadow-gray-500/20">  {/* グレーの薄い影 */}
```

### 実践例

```tsx
// カード風デザイン
<div className="bg-white rounded-xl shadow-md">
  コンテンツ
</div>

// ホバー時に影を大きく
<div className="bg-white rounded-xl shadow-md hover:shadow-lg">
  コンテンツ
</div>

// 内側の影（凹んだ感じ）
<div className="bg-gray-100 rounded-lg shadow-inner p-4">
  コンテンツ
</div>
```

---

## ボーダー（Border）の使い方

### 基本的な使い方

```tsx
<div className="border">           {/* 全方向に1px */}
<div className="border-2">          {/* 全方向に2px */}
<div className="border-4">          {/* 全方向に4px */}
<div className="border-8">          {/* 全方向に8px */}
```

### 特定の方向だけにボーダー

```tsx
<div className="border-t">    {/* 上だけ */}
<div className="border-r">    {/* 右だけ */}
<div className="border-b">    {/* 下だけ */}
<div className="border-l">    {/* 左だけ */}
```

### ボーダーの太さ

```tsx
<div className="border">      {/* 1px */}
<div className="border-2">    {/* 2px */}
<div className="border-4">    {/* 4px */}
<div className="border-8">    {/* 8px */}
```

### ボーダーの色

```tsx
<div className="border-gray-200">   {/* 薄いグレー */}
<div className="border-gray-300">   {/* 中程度のグレー */}
<div className="border-gray-400">  {/* 濃いグレー */}
<div className="border-blue-500">  {/* 青 */}
<div className="border-red-500">   {/* 赤 */}
<div className="border-green-500"> {/* 緑 */}
```

### ボーダーのスタイル

```tsx
<div className="border-solid">  {/* 実線（デフォルト） */}
<div className="border-dashed"> {/* 破線 */}
<div className="border-dotted"> {/* 点線 */}
<div className="border-none">   {/* ボーダーなし */}
```

### 実践例

```tsx
// カード風デザイン
<div className="bg-white rounded-xl border border-gray-200">
  コンテンツ
</div>

// 左側にアクセントライン
<div className="border-l-4 border-blue-500 pl-4">
  コンテンツ
</div>

// 下だけにボーダー（区切り線）
<div className="border-b border-gray-200 pb-4">
  コンテンツ
</div>
```

---

## 色（Color）の使い方

### 背景色（Background）

```tsx
<div className="bg-white">      {/* 白 */}
<div className="bg-gray-50">    {/* 薄いグレー */}
<div className="bg-gray-100">   {/* 少し濃いグレー */}
<div className="bg-gray-200">   {/* 中程度のグレー */}
<div className="bg-blue-500">   {/* 青 */}
<div className="bg-red-500">    {/* 赤 */}
<div className="bg-green-500">  {/* 緑 */}
```

### 文字色（Text）

```tsx
<p className="text-gray-700">   {/* 濃いグレー */}
<p className="text-gray-600">   {/* 中程度のグレー */}
<p className="text-gray-500">   {/* 薄いグレー */}
<p className="text-blue-500">   {/* 青 */}
<p className="text-red-500">    {/* 赤 */}
```

### ボーダーの色

```tsx
<div className="border-blue-500">  {/* 青いボーダー */}
<div className="border-gray-200">  {/* グレーのボーダー */}
```

### 色の濃淡

Tailwind CSSでは、色の濃淡を数字で指定します：

- `50` = 最も薄い
- `100` = 薄い
- `200` = 少し薄い
- `300` = 中程度
- `400` = 少し濃い
- `500` = 標準（メインカラー）
- `600` = 濃い
- `700` = とても濃い
- `800` = 非常に濃い
- `900` = 最も濃い

### 実践例

```tsx
// 白背景のカード
<div className="bg-white text-gray-800">
  コンテンツ
</div>

// 青いアクセント
<div className="bg-blue-50 text-blue-900 border-l-4 border-blue-500">
  コンテンツ
</div>

// グレーの背景
<div className="bg-gray-50 text-gray-700">
  コンテンツ
</div>
```

---

## 余白（Spacing）の使い方

### パディング（内側の余白）

```tsx
<div className="p-0">   {/* 0px */}
<div className="p-1">   {/* 4px */}
<div className="p-2">   {/* 8px */}
<div className="p-3">   {/* 12px */}
<div className="p-4">   {/* 16px */}
<div className="p-5">   {/* 20px */}
<div className="p-6">   {/* 24px */}
<div className="p-8">   {/* 32px */}
```

### マージン（外側の余白）

```tsx
<div className="m-0">   {/* 0px */}
<div className="m-1">   {/* 4px */}
<div className="m-2">   {/* 8px */}
<div className="m-4">   {/* 16px */}
<div className="m-6">   {/* 24px */}
<div className="m-8">   {/* 32px */}
```

### 方向指定

```tsx
// パディング
<div className="pt-4">  {/* 上だけ */}
<div className="pr-4">  {/* 右だけ */}
<div className="pb-4">  {/* 下だけ */}
<div className="pl-4">  {/* 左だけ */}
<div className="px-4">  {/* 左右 */}
<div className="py-4">  {/* 上下 */}

// マージン
<div className="mt-4">  {/* 上だけ */}
<div className="mr-4">  {/* 右だけ */}
<div className="mb-4">  {/* 下だけ */}
<div className="ml-4">  {/* 左だけ */}
<div className="mx-4">  {/* 左右 */}
<div className="my-4">  {/* 上下 */}
```

### 実践例

```tsx
// カード風デザイン
<div className="bg-white rounded-xl p-6 mb-6">
  コンテンツ
</div>

// 左右に余白
<div className="px-4 py-2">
  コンテンツ
</div>
```

---

## ホバー（Hover）の使い方

### 基本的な使い方

`hover:` を前に付けると、マウスを乗せた時のスタイルを指定できます。

```tsx
<div className="bg-white hover:bg-gray-50">
  コンテンツ
</div>

<div className="text-gray-600 hover:text-gray-900">
  リンク
</div>

<div className="shadow-md hover:shadow-lg">
  カード
</div>
```

### よく使うホバーエフェクト

```tsx
// 背景色を変える
<div className="bg-white hover:bg-gray-50">

// 文字色を変える
<a className="text-blue-600 hover:text-blue-800">

// 影を大きくする
<div className="shadow-md hover:shadow-lg">

// ボーダーを変える
<div className="border-gray-200 hover:border-gray-400">

// 透明度を変える
<div className="opacity-100 hover:opacity-80">
```

### 実践例

```tsx
// カード風デザイン（ホバーで影が大きくなる）
<div className="bg-white rounded-xl shadow-md hover:shadow-lg">
  コンテンツ
</div>

// リンク（ホバーで色が変わる）
<a className="text-blue-600 hover:text-blue-800 underline">
  リンクテキスト
</a>

// ボタン（ホバーで背景色が変わる）
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  ボタン
</button>
```

---

## トランジション（Transition）の使い方

### 基本的な使い方

トランジションを使うと、スタイルの変化がスムーズになります。

```tsx
<div className="transition-colors">      {/* 色の変化 */}
<div className="transition-shadow">      {/* 影の変化 */}
<div className="transition-all">         {/* すべての変化 */}
```

### 変化の速度

```tsx
<div className="transition-colors duration-75">   {/* 75ms - 速い */}
<div className="transition-colors duration-100">  {/* 100ms */}
<div className="transition-colors duration-150">  {/* 150ms */}
<div className="transition-colors duration-200">   {/* 200ms - 標準 */}
<div className="transition-colors duration-300">  {/* 300ms */}
<div className="transition-colors duration-500">   {/* 500ms - 遅い */}
```

### 実践例

```tsx
// カード風デザイン（ホバーで影がスムーズに変化）
<div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
  コンテンツ
</div>

// ボタン（ホバーで色がスムーズに変化）
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200">
  ボタン
</button>
```

---

## 組み合わせ方のコツ

### 1. カード風デザインの基本パターン

```tsx
// 基本形
<div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
  コンテンツ
</div>

// ホバーエフェクト付き
<div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
  コンテンツ
</div>
```

### 2. よく使う組み合わせ

#### カード風デザイン
```tsx
className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
```

#### ボタン
```tsx
className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
```

#### リンク
```tsx
className="text-blue-600 hover:text-blue-800 underline"
```

#### アクセントライン付きコンテンツ
```tsx
className="border-l-4 border-blue-500 pl-4 bg-blue-50"
```

### 3. クラスの順序

クラスの順序は基本的に自由ですが、読みやすくするために以下の順序が推奨されます：

1. レイアウト（`flex`, `grid`, `block`など）
2. 位置（`absolute`, `relative`など）
3. サイズ（`w-`, `h-`など）
4. 余白（`p-`, `m-`など）
5. 背景色（`bg-`）
6. 文字色（`text-`）
7. ボーダー（`border-`）
8. 角丸（`rounded-`）
9. 影（`shadow-`）
10. ホバー（`hover:`）
11. トランジション（`transition-`）

例：
```tsx
<div className="flex items-center gap-2 p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
```

---

## 実践例

### 例1: シンプルなカード

```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-bold mb-4">タイトル</h2>
  <p className="text-gray-700">コンテンツ</p>
</div>
```

### 例2: ホバーエフェクト付きカード

```tsx
<div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
  <h2 className="text-xl font-bold mb-4">タイトル</h2>
  <p className="text-gray-700">コンテンツ</p>
</div>
```

### 例3: アクセントライン付きカード

```tsx
<div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
    <h2 className="text-xl font-bold">タイトル</h2>
  </div>
  <p className="text-gray-700">コンテンツ</p>
</div>
```

### 例4: グラデーション背景のカード

```tsx
<div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-md border border-gray-200 p-6">
  <h2 className="text-xl font-bold mb-4">タイトル</h2>
  <p className="text-gray-700">コンテンツ</p>
</div>
```

---

## よくある質問

### Q: クラスが長くなりすぎる

A: 複数のクラスを組み合わせる場合は、読みやすくするために改行することができます：

```tsx
<div className={`
  bg-white 
  rounded-xl 
  shadow-md 
  border 
  border-gray-200 
  p-6 
  hover:shadow-lg 
  transition-shadow 
  duration-200
`}>
```

### Q: カスタムの色やサイズを使いたい

A: `tailwind.config.ts` でカスタマイズできます。ただし、基本的にはTailwindの標準値を使うのがおすすめです。

### Q: どのサイズを選べばいいかわからない

A: まずは標準的な値（`rounded-lg`, `shadow-md`, `p-6`など）から始めて、ブラウザで確認しながら調整するのがおすすめです。

---

## まとめ

このガイドで学んだことをまとめると：

1. **角丸**: `rounded-{サイズ}` で指定
2. **影**: `shadow-{サイズ}` で指定
3. **ボーダー**: `border` と `border-{色}` で指定
4. **色**: `bg-{色}`, `text-{色}`, `border-{色}` で指定
5. **余白**: `p-{サイズ}`, `m-{サイズ}` で指定
6. **ホバー**: `hover:` を前に付ける
7. **トランジション**: `transition-{種類}` と `duration-{時間}` で指定

これらを組み合わせることで、様々なデザインを作ることができます。

まずは基本的なパターンを覚えて、実際に使ってみながら慣れていくのがおすすめです！

---

## クイックリファレンス一覧

よく使うTailwind CSSクラスを一覧にまとめました。迷った時に見返してください。

### 角丸（Rounded）

| クラス | サイズ | 使用例 |
|--------|--------|--------|
| `rounded-sm` | 2px | 小さなボタン |
| `rounded` | 4px | 標準的な要素 |
| `rounded-md` | 6px | 中程度の要素 |
| `rounded-lg` | 8px | カードなど |
| `rounded-xl` | 12px | 大きなカード |
| `rounded-2xl` | 16px | 非常に大きなカード |
| `rounded-3xl` | 24px | 特大のカード |
| `rounded-full` | 50% | 円形のボタン、アバター |

### 影（Shadow）

| クラス | 効果 | 使用例 |
|--------|------|--------|
| `shadow-sm` | 1px程度の薄い影 | 控えめな要素 |
| `shadow` | 標準的な影 | 一般的なカード |
| `shadow-md` | 4px程度の影 | カード風デザイン |
| `shadow-lg` | 10px程度の影 | 目立たせたい要素 |
| `shadow-xl` | 20px程度の影 | ポップアップ |
| `shadow-2xl` | 25px程度の影 | モーダル |
| `shadow-inner` | 内側の影 | 凹んだ感じ |
| `shadow-none` | 影なし | 影を消す |

### ボーダー（Border）

| クラス | 効果 |
|--------|------|
| `border` | 全方向に1px |
| `border-2` | 全方向に2px |
| `border-4` | 全方向に4px |
| `border-t` | 上だけ |
| `border-r` | 右だけ |
| `border-b` | 下だけ |
| `border-l` | 左だけ |
| `border-l-2` | 左に2px |
| `border-l-4` | 左に4px |

### 色（Color）

#### 背景色（Background）

| クラス | 色 |
|--------|-----|
| `bg-white` | 白 |
| `bg-gray-50` | 薄いグレー |
| `bg-gray-100` | 少し濃いグレー |
| `bg-gray-200` | 中程度のグレー |
| `bg-blue-500` | 青（標準） |
| `bg-blue-50` | 薄い青 |
| `bg-red-500` | 赤（標準） |
| `bg-green-500` | 緑（標準） |

#### 文字色（Text）

| クラス | 色 |
|--------|-----|
| `text-gray-700` | 濃いグレー |
| `text-gray-600` | 中程度のグレー |
| `text-gray-500` | 薄いグレー |
| `text-blue-500` | 青 |
| `text-red-500` | 赤 |
| `text-green-500` | 緑 |

#### ボーダー色（Border）

| クラス | 色 |
|--------|-----|
| `border-gray-200` | 薄いグレー |
| `border-gray-300` | 中程度のグレー |
| `border-blue-500` | 青 |
| `border-red-500` | 赤 |

### 余白（Spacing）

#### パディング（内側の余白）

| クラス | サイズ |
|--------|--------|
| `p-0` | 0px |
| `p-1` | 4px |
| `p-2` | 8px |
| `p-3` | 12px |
| `p-4` | 16px |
| `p-5` | 20px |
| `p-6` | 24px |
| `p-8` | 32px |

#### マージン（外側の余白）

| クラス | サイズ |
|--------|--------|
| `m-0` | 0px |
| `m-1` | 4px |
| `m-2` | 8px |
| `m-4` | 16px |
| `m-6` | 24px |
| `m-8` | 32px |

#### 方向指定

| クラス | 効果 |
|--------|------|
| `pt-4` | 上だけ（パディング） |
| `pr-4` | 右だけ（パディング） |
| `pb-4` | 下だけ（パディング） |
| `pl-4` | 左だけ（パディング） |
| `px-4` | 左右（パディング） |
| `py-4` | 上下（パディング） |
| `mt-4` | 上だけ（マージン） |
| `mr-4` | 右だけ（マージン） |
| `mb-4` | 下だけ（マージン） |
| `ml-4` | 左だけ（マージン） |
| `mx-4` | 左右（マージン） |
| `my-4` | 上下（マージン） |

### ホバー（Hover）

| クラス | 効果 |
|--------|------|
| `hover:bg-gray-50` | ホバーで背景色を変える |
| `hover:text-gray-900` | ホバーで文字色を変える |
| `hover:shadow-lg` | ホバーで影を大きく |
| `hover:border-gray-400` | ホバーでボーダー色を変える |
| `hover:opacity-80` | ホバーで透明度を変える |

### トランジション（Transition）

| クラス | 効果 |
|--------|------|
| `transition-colors` | 色の変化をスムーズに |
| `transition-shadow` | 影の変化をスムーズに |
| `transition-all` | すべての変化をスムーズに |
| `duration-75` | 75msで変化 |
| `duration-100` | 100msで変化 |
| `duration-150` | 150msで変化 |
| `duration-200` | 200msで変化（標準） |
| `duration-300` | 300msで変化 |
| `duration-500` | 500msで変化 |

### よく使う組み合わせパターン

#### カード風デザイン（基本）
```
bg-white rounded-xl shadow-md border border-gray-200 p-6
```

#### カード風デザイン（ホバー付き）
```
bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200
```

#### ボタン
```
bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200
```

#### リンク
```
text-blue-600 hover:text-blue-800 underline
```

#### アクセントライン付き
```
border-l-4 border-blue-500 pl-4 bg-blue-50
```

---

## よくある問題と解決方法

### Q: 目次の下の余白を消したい

A: `TableOfContents.tsx` の `nav` 要素の `className` を確認してください。

現在（92行目）:
```tsx
<nav className="mb-0 rounded-lg bg-gray-50 overflow-hidden shadow-sm">
```

`mb-0` は既に下の余白を0にしていますが、もし他の要素から余白が来ている場合は：

1. **nav要素の下の余白を確認**
   - `mb-0` が設定されているか確認
   - もし `mb-4` や `mb-6` などがあれば `mb-0` に変更

2. **親要素の余白を確認**
   - 目次を使っているページ（`app/posts/[slug]/page.tsx`）を確認
   - 目次の周りに余白を追加している要素がないか確認

3. **実際の確認方法**
   - ブラウザの開発者ツール（F12）を開く
   - 目次要素を選択
   - 「Computed」タブで `margin-bottom` を確認

### Q: 要素の間の余白を調整したい

A: マージンクラスを使います：

- 余白を消す: `mb-0`（下）、`mt-0`（上）、`m-0`（全方向）
- 余白を小さく: `mb-1`（4px）、`mb-2`（8px）
- 余白を大きく: `mb-4`（16px）、`mb-6`（24px）

### Q: クラスが長すぎて読みにくい

A: 改行して整理できます：

```tsx
<div className={`
  bg-white 
  rounded-xl 
  shadow-md 
  border 
  border-gray-200 
  p-6 
  hover:shadow-lg 
  transition-shadow 
  duration-200
`}>
```

### Q: どのサイズを選べばいいかわからない

A: まずは標準的な値から始めましょう：

- 角丸: `rounded-lg` または `rounded-xl`
- 影: `shadow-md`
- パディング: `p-6`
- マージン: `mb-6`

ブラウザで確認しながら、少しずつ調整するのがおすすめです。
