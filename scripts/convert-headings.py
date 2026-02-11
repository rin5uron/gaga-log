#!/usr/bin/env python3
"""
全記事の見出し構造を一括変換するスクリプト

変換ルール:
1. ## XXX <span class="section-subtitle">YYY</span>
   → <div class="section-label">XXX <span class="label-subtitle">YYY</span></div>

2. ### テキスト（References セクション外）
   → ## テキスト

3. ### <span class="section-subtitle">テキスト</span>（References セクション外）
   → ## テキスト

zoo.md と zootopia-2.md はスキップ（変換済み）
"""

import re
import os
import glob

POSTS_DIR = "/Users/rin5uron/github-local/personal/gaga-log/content/posts"
SKIP_FILES = {"zoo.md", "zootopia-2.md"}

def convert_file(filepath):
    filename = os.path.basename(filepath)
    if filename in SKIP_FILES:
        print(f"  SKIP: {filename}")
        return

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # 1. ## XXX <span class="section-subtitle">YYY</span>
    #    → <div class="section-label">XXX <span class="label-subtitle">YYY</span></div>
    content = re.sub(
        r'^## (.+?) <span class="section-subtitle">(.+?)</span>',
        r'<div class="section-label">\1 <span class="label-subtitle">\2</span></div>',
        content,
        flags=re.MULTILINE
    )

    # 2. References セクション以降の ### は変換しない
    #    → References の div.references-section 内、または section-label References 以降を検出
    #    実装：行ごとに処理して References 以降はスキップ
    lines = content.split("\n")
    new_lines = []
    in_references = False

    for line in lines:
        # References section-label に入ったら以降はスキップ
        if re.search(r'class="section-label".*References', line):
            in_references = True

        if not in_references:
            # ### <span class="section-subtitle">テキスト</span> → ## テキスト
            m = re.match(r'^### <span class="section-subtitle">(.+?)</span>', line)
            if m:
                line = f"## {m.group(1)}"
            # ### 通常テキスト → ## テキスト
            elif re.match(r'^### ', line):
                line = re.sub(r'^### ', '## ', line)

        new_lines.append(line)

    content = "\n".join(new_lines)

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  CONVERTED: {filename}")
    else:
        print(f"  NO CHANGE: {filename}")

def main():
    files = sorted(glob.glob(os.path.join(POSTS_DIR, "*.md")))
    print(f"対象: {len(files)} ファイル\n")
    for filepath in files:
        convert_file(filepath)
    print("\n完了")

if __name__ == "__main__":
    main()
