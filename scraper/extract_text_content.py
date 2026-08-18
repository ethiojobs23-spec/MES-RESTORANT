#!/usr/bin/env python3
"""
Extract views/sections from Gemini HTML export
"""
import re
import html as html_lib
from pathlib import Path

md_file = 'gemini_enu_food_house.md'
with open(md_file, 'r', encoding='utf-8') as f:
    content = f.read()

print(f'📊 File size: {len(content):,} bytes\n')

# Search for keywords
keywords = ['Home', 'Expense', 'Revenue', 'Food', 'Menu', 'View', 'Dashboard', 'Report']
print('🔍 Searching for keywords:')
for keyword in keywords:
    idx = content.lower().find(keyword.lower())
    if idx != -1:
        context = content[max(0, idx-30):idx+100]
        print(f'  ✓ {keyword:12} at position {idx:8} ')

# Try to extract text content from HTML
print('\n\n📝 Extracting text from HTML...\n')

# Find the main content div or body
body_match = re.search(r'<body[^>]*>(.*)</body>', content, re.DOTALL | re.IGNORECASE)
if body_match:
    body_content = body_match.group(1)
    print(f'✓ Found body tag, content: {len(body_content):,} bytes')
    
    # Remove script/style tags
    clean = re.sub(r'<script[^>]*>.*?</script>', '', body_content, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r'<style[^>]*>.*?</style>', '', clean, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove HTML tags
    clean = re.sub(r'<[^>]+>', '\n', clean)
    
    # Decode HTML entities
    clean = html_lib.unescape(clean)
    
    # Remove excessive whitespace
    clean = '\n'.join(line.strip() for line in clean.split('\n') if line.strip())
    
    # Save
    with open('extracted_text_content.txt', 'w', encoding='utf-8') as f:
        f.write(clean)
    
    print(f'✓ Saved extracted_text_content.txt ({len(clean):,} bytes)')
    
    # Show preview
    lines = clean.split('\n')
    print(f'\n📄 Preview (first 30 lines):\n')
    for i, line in enumerate(lines[:30], 1):
        print(f'{i:2}. {line[:80]}')

else:
    print('⚠️  Could not find body tag')
    # Try alternative extraction
    lines = content.split('\n')
    text_lines = []
    for line in lines:
        # Skip lines with lots of HTML/CSS
        if not re.match(r'^\s*[<{-]', line) and len(line) > 10 and not line.startswith('--'):
            text_lines.append(line.strip())
    
    if text_lines:
        text_content = '\n'.join(text_lines[:500])
        print(f'✓ Extracted {len(text_lines)} text lines')
        print('\nPreview:')
        print(text_content[:1000])
