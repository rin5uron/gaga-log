# How Sound Feels - ドキュメント索引

このディレクトリには、プロジェクトの全ドキュメントが格納されています。

---

## 📚 目次

### 🎯 記事執筆ガイド（最重要）

**新しい記事を書く時は、まずこれを読んでください。**

- **[WRITING-GUIDE.md](WRITING-GUIDE.md)** ⭐ - 記事執筆完全ガイド
  - 記事作成のルール、テンプレート、意図を一元管理
  - highlights、目次、引用、日付などの全ルール
  - AdSense対策、チェックリスト完備

---

### 📝 テンプレート

記事作成時に使用するテンプレートです。

- [template-song.md](../templates/template-song.md) - 曲記事のテンプレート
- [template-artist.md](../templates/template-artist.md) - アーティストページのテンプレート
- [template-movie.md](../templates/template-movie.md) - 映画・ドキュメンタリー記事のテンプレート

---

### 📊 プロジェクト管理

プロジェクトの進行状況やフェーズ管理を記録しています。

- **[logs/PROCESS-LOG.md](logs/PROCESS-LOG.md)** - プロセスログ（時系列の実装記録）
  - 実装内容の詳細な記録
  - 技術的な変更履歴
  - 現在のフェーズと達成状況

- [project/PHASES.md](project/PHASES.md) - フェーズ管理
- [project/ORIGIN.md](project/ORIGIN.md) - プロジェクトの起源
- [project/ANALYSIS.md](project/ANALYSIS.md) - プロジェクト分析
- [DAILY-ROUTINE.md](DAILY-ROUTINE.md) - 日々のルーティン

---

### 🎨 デザイン・戦略

サイトのデザインやコンテンツ戦略に関するドキュメント。

- [strategy/ARTIST-STRATEGY.md](strategy/ARTIST-STRATEGY.md) - アーティストページ戦略
- [strategy/ALBUM-COVER-STRATEGY.md](strategy/ALBUM-COVER-STRATEGY.md) - アルバムカバー戦略

---

### 💰 AdSense関連

Google AdSense申請・改善に関するドキュメント。

**重要度順に並んでいます。**

1. **[strategy/ADSENSE-STRATEGY.md](strategy/ADSENSE-STRATEGY.md)** - AdSense総合戦略
2. **[strategy/ADSENSE-REJECTION-ANALYSIS.md](strategy/ADSENSE-REJECTION-ANALYSIS.md)** - 不承認分析
3. [strategy/ADSENSE-CONTENT-IMPROVEMENT.md](strategy/ADSENSE-CONTENT-IMPROVEMENT.md) - コンテンツ改善
4. [strategy/ADSENSE-CHECKLIST.md](strategy/ADSENSE-CHECKLIST.md) - 申請前チェックリスト
5. [strategy/ADSENSE-AD-UNIT-SETUP.md](strategy/ADSENSE-AD-UNIT-SETUP.md) - 広告ユニット設定
6. [strategy/ADSENSE-IMPLEMENTATION-GUIDE.md](strategy/ADSENSE-IMPLEMENTATION-GUIDE.md) - 実装ガイド

---

### 🔍 SEO関連

SEO最適化に関するドキュメント。

- **[seo/SEO-STRATEGY.md](seo/SEO-STRATEGY.md)** - SEO総合戦略
- **[seo/SEO_MANUAL.md](seo/SEO_MANUAL.md)** ⭐ - SEO改善の完全マニュアル
- [seo/SEO_IMPROVEMENT_LOG.md](seo/SEO_IMPROVEMENT_LOG.md) - SEO改善ログ
- [seo/SEO-METADATA-IMPLEMENTATION.md](seo/SEO-METADATA-IMPLEMENTATION.md) - メタデータ実装

**SEO改善コマンド**:
```bash
# 新規SEO改善
/seo-check

# 追加修正・効果測定後の再改善
/seo-update
```

---

### 📚 学習リソース（参考）

Next.jsやTailwind CSSの学習記録。技術的な理解を深めたい時に参照。

- [learning/nextjs-progress.md](learning/nextjs-progress.md) - Next.js学習進捗
- [learning/nextjs-search-implementation.md](learning/nextjs-search-implementation.md) - 検索機能実装
- [learning/tailwind-css-basics.md](learning/tailwind-css-basics.md) - Tailwind CSS基礎
- [learning/component-design-guide.md](learning/component-design-guide.md) - コンポーネント設計
- [learning/beginner-friendly-guide.md](learning/beginner-friendly-guide.md) - 初心者向けガイド

---

### 📦 アーカイブ

過去のドキュメント。現在は使用していませんが、参考として保管。

- [archive/DESIGN.md](archive/DESIGN.md) - 旧デザイン仕様
- [archive/spec.md](archive/spec.md) - 旧仕様書
- [archive/study.md](archive/study.md) - 学習メモ

---

## 🚀 クイックスタート

### 新しい記事を書きたい
1. [WRITING-GUIDE.md](WRITING-GUIDE.md) ⭐ を読む
2. [template-song.md](../templates/template-song.md) をコピー
3. ガイドに従って執筆

### AdSense申請前の確認
1. [strategy/ADSENSE-CHECKLIST.md](strategy/ADSENSE-CHECKLIST.md) をチェック
2. [WRITING-GUIDE.md](WRITING-GUIDE.md) のAdSense対策セクションを確認

### プロジェクトの現状を知りたい
1. [logs/PROCESS-LOG.md](logs/PROCESS-LOG.md) を見る
2. [project/PHASES.md](project/PHASES.md) で現在のフェーズを確認

---

## 📝 ドキュメント管理ルール

### 更新時のルール
- 大きな変更は [logs/PROCESS-LOG.md](logs/PROCESS-LOG.md) に記録
- 古いルールは削除し、最新のルールに統合
- ファイルが増えすぎないように定期的に整理

### ファイル命名規則
- 大文字＋ハイフン: `WRITING-GUIDE.md`
- ディレクトリで分類: `strategy/`, `seo/`, `logs/`

---

## 📚 関連ドキュメント

プロジェクトルートの README.md も参照してください:
- [プロジェクトREADME](../README.md) - プロジェクト全体の概要

---

**最終更新**: 2026年1月20日
