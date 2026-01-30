#!/bin/bash

# SEO 7セクション構造チェックスクリプト

echo "=== SEO構造チェック ==="
echo ""

for file in content/posts/*.md; do
  filename=$(basename "$file" .md)

  # 各セクションの存在チェック
  has_streaming=$(grep -q "Apple Music\|Spotify" "$file" && echo "✓" || echo "✗")
  has_youtube=$(grep -q "youtube.com/embed\|youtu.be" "$file" && echo "✓" || echo "✗")
  has_about=$(grep -q "## About\|## この曲について" "$file" && echo "✓" || echo "✗")
  has_lyrics=$(grep -q "## Lyrics\|## 歌詞\|何について歌っている" "$file" && echo "✓" || echo "✗")
  has_phrase=$(grep -q "印象に残る\|フレーズ" "$file" && echo "✓" || echo "✗")
  has_sing=$(grep -q "口ずさみ\|歌いたい\|Sing" "$file" && echo "✓" || echo "✗")
  has_me=$(grep -q "今の私\|Me and" "$file" && echo "✓" || echo "✗")

  # カウント
  count=0
  [[ "$has_streaming" == "✓" ]] && ((count++))
  [[ "$has_youtube" == "✓" ]] && ((count++))
  [[ "$has_about" == "✓" ]] && ((count++))
  [[ "$has_lyrics" == "✓" ]] && ((count++))
  [[ "$has_phrase" == "✓" ]] && ((count++))
  [[ "$has_sing" == "✓" ]] && ((count++))
  [[ "$has_me" == "✓" ]] && ((count++))

  # 結果表示
  if [[ $count -eq 7 ]]; then
    echo "✅ $filename ($count/7)"
  elif [[ $count -ge 5 ]]; then
    echo "⚠️  $filename ($count/7) - 微修正"
  else
    echo "❌ $filename ($count/7) - 大幅修正"
  fi
done

echo ""
echo "=== 集計 ==="
echo "✅ 完璧: $(grep -c "✅" <<< "$(bash $0 2>/dev/null)" || echo "0")"
echo "⚠️  微修正: $(grep -c "⚠️" <<< "$(bash $0 2>/dev/null)" || echo "0")"
echo "❌ 大幅修正: $(grep -c "❌" <<< "$(bash $0 2>/dev/null)" || echo "0")"
