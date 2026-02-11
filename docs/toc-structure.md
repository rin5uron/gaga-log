# 目次（Table of Contents）の構造メモ

「どこに何が書いてあるか」をまとめたメモです。

---

## 1. 画面で見ているもの（上から）

```
┌─────────────────────────────┐
│  目次（帯・ヘッダー）         │  ← グレーの細いバー
├─────────────────────────────┤
│  この曲について（ラベル）     │  ← 太字の見出し
│    ・ズートピア2の劇中歌…    │  ← H2（リンク）
│    ・エド・シーランが…       │  ← H2（リンク）
│                             │
│  歌詞のポイント（ラベル）     │
│    ・Try Everythingとの…    │
│    ・「Zoo」というタイトル…  │
│  …                          │
└─────────────────────────────┘
```

- **帯** = 「目次」と書いてある上のバー
- **ラベル** = 「この曲について」「歌詞のポイント」など、まとまりの名前
- **H2** = ラベルの下にある、クリックできる行（記事の見出しへのリンク）

---

## 2. コードの「入れ子」の形（kakejiku のとき）

```
.toc-kakejiku
├── .toc-kakejiku-header    「目次」の帯
└── .toc-kakejiku-body
    └── nav.toc-kakejiku-nav
        └── ul
            ├── li  ← 1つ目（ラベル）
            │   └── div.toc-label  「この曲について」
            ├── li  ← 2つ目（H2）
            │   └── a.toc-heading-h2  「ズートピア2の…」
            ├── li  ← 3つ目（H2）
            │   └── a.toc-heading-h2  「エド・シーランが…」
            ├── li  ← 4つ目（ラベル）
            │   └── div.toc-label  「歌詞のポイント」
            └── …
```

- **ラベル** = `li` の中の `div.toc-label`
- **H2** = `li` の中の `a.toc-heading-h2`

---

## 3. 「上の余白」は2種類ある

### ① 帯の下と、最初のラベルのあいだ

- **どこで指定**: `globals.css` の **`.toc-kakejiku-nav ul`**
- **何をしている**: リスト全体の「上」に余白 → **帯と最初のラベルの間**が開く

```
  目次（帯）
  ← ここが開く（0.5rem）
  この曲について
```

### ② 2番目以降のラベルの上（セクションとセクションの間）

- **どこで指定**: `globals.css` の **`.toc-kakejiku .toc-label`** の `margin-top: 3rem`
- **何をしている**: 各ラベルの「上」に余白 → **前のグループと次のラベルの間**が開く

```
  …エド・シーランが…
  ← ここが開く（3rem）
  歌詞のポイント
  ← ここが開く（3rem）
  口ずさみたいフレーズ
```

- **一番上のラベルだけ**: `.toc-kakejiku-nav ul > li:first-child .toc-label` で `margin-top: 0` にして、上を詰めている

---

## 4. いじるときの対応表（kakejiku）

| 変えたいこと | ファイル | クラス名（場所） |
|-------------|----------|------------------|
| 帯の下と最初のラベルの間 | globals.css | `.toc-kakejiku-nav ul` の `margin-top` |
| ラベルとラベルの間（セクション間） | globals.css | `.toc-kakejiku .toc-label` の `margin-top` |
| ラベルとその下のH2の間 | globals.css | `.toc-kakejiku .toc-label` の `margin-bottom` |
| H2とH2の間 | globals.css | `.toc-kakejiku .toc-heading-h2` の `margin-top` |
| ラベルの字の大きさ・色 | globals.css | `.toc-kakejiku .toc-label` |
| H2の字の大きさ・色 | globals.css | `.toc-kakejiku .toc-heading-h2` |

---

## 5. ファイルの場所

| 役割 | ファイル |
|------|---------|
| 目次の部品（ラベル・H2の並び） | `components/TableOfContents.tsx` |
| 見た目・余白・色・フォント | `app/globals.css`（`.toc-kakejiku` や `.toc-label` など） |

---

## 6. 用語の対応

| 言い方 | コード上の名前 |
|--------|----------------|
| ラベル（この曲について、など） | `.toc-label` |
| H2（ラベルの下のリンク） | `.toc-heading-h2` |
| 帯（「目次」のバー） | `.toc-kakejiku-header` |
| 目次全体の箱 | `.toc-kakejiku` |

このファイルは「理解用」のメモなので、仕様が変わったらこの中身も一緒に直すと分かりやすいです。
