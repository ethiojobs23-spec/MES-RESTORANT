#!/usr/bin/env python3
import re
import os
from pathlib import Path

md_file = 'gemini_enu_food_house.md'

print(f'\n📖 Extracting Views from {md_file}\n' + '='*60 + '\n')

with open(md_file, 'r', encoding='utf-8') as f:
    content = f.read()

print(f'📊 Total file size: {len(content):,} bytes\n')

# Look for view markers/sections
# Common patterns in Gemini exports: ## View:, ### Home, ### Expense, etc.
view_patterns = [
    (r'#{1,3}\s*(.*?view.*?)\n', 'Headers with "view"'),
    (r'#{1,3}\s*(Home|Expense|Revenue|Reports|Dashboard|Menu|Analysis)\n', 'Common view names'),
    (r'\*\*(.*?view.*?)\*\*', 'Bold text with "view"'),
]

all_matches = {}

for pattern, desc in view_patterns:
    matches = re.findall(pattern, content, re.IGNORECASE)
    if matches:
        print(f'🔍 Found {len(matches)} items matching: {desc}')
        for m in matches[:5]:
            print(f'   • {m[:60]}')
            all_matches[m] = desc
        print()

# Try to split by common view delimiters
print('\n🔄 Splitting by section markers...\n')

# Split by Markdown headers
sections = re.split(r'\n(?:#{1,6})\s+(.+?)\n', content)

if len(sections) > 1:
    section_names = sections[1::2]  # Odd indices are the headers
    section_contents = sections[2::2]  # Even indices are the content
    
    print(f'Found {len(section_names)} sections:\n')
    
    for i, (name, text) in enumerate(zip(section_names, section_contents)):
        name_clean = name.strip()[:50].replace('/', '_').replace('\\', '_').replace(':', '_')
        print(f'{i+1:2}. {name_clean:40} ({len(text):6} chars)')
        
        # Save each section if it's substantial
        if len(text) > 500:
            filename = f'view_{i+1}_{name_clean}.txt'
            with open(filename, 'w', encoding='utf-8') as out:
                out.write(f'VIEW: {name}\n')
                out.write('='*60 + '\n\n')
                out.write(text)
            print(f'                                            ✓ Saved to {filename}')

else:
    print("⚠️  No markdown headers found. Trying alternative split...\n")
    
    # Try splitting by keywords like "Home", "Expense", etc.
    keywords = ['home', 'expense', 'revenue', 'report', 'dashboard', 'menu', 'summary']
    for kw in keywords:
        pattern = rf'(?:^|\n)(?:\*\*)?{kw}(?:\*\*)?(?:\s|:|$)'
        if re.search(pattern, content, re.IGNORECASE):
            print(f'  ✓ Found "{kw}" in content')

# Extract full text and save
print(f'\n💾 Saving full content...\n')
with open('enu_food_house_full.txt', 'w', encoding='utf-8') as f:
    f.write(content)
print(f'✓ Saved: enu_food_house_full.txt')

# Save a preview
preview_lines = content.split('\n')[:100]
with open('enu_food_house_preview.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(preview_lines))
print(f'✓ Saved: enu_food_house_preview.txt')

print(f'\n✅ Extraction complete!\n')
