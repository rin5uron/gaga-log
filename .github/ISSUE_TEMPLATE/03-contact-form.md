---
name: お問い合わせフォーム実装
about: メールアドレス非公開のフォーム実装
title: '[フォーム] お問い合わせフォーム実装'
labels: ['enhancement', 'security']
assignees: ''

---

## 背景
メールアドレス公開によるセキュリティリスク・スパム対策のため、フォーム化する

## 実装方法
**Formspree を使用（推奨）**
- 無料、実装が簡単
- メールアドレス完全非公開
- スパム対策あり
- 月50件まで無料

## 手順
1. https://formspree.io でアカウント作成
2. 新しいフォームを作成
3. 受信メールアドレス： `studiojinsei22@gmail.com`
4. 発行されたフォームIDをコードに差し込む
5. `/contact` ページを更新

## 代替案
- Next.js API Route + Resend
- Google Forms埋め込み

## 参考
- 現在のお問い合わせページ： `app/contact/page.tsx`
