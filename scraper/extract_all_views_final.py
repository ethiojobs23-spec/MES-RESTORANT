#!/usr/bin/env python3
"""
Extract individual views from Gemini export
"""
import re
import html as html_lib

md_file = 'gemini_enu_food_house.md'
with open(md_file, 'r', encoding='utf-8') as f:
    content = f.read()

print('\n📋 GEMINI VIEWS EXTRACTION\n' + '='*60 + '\n')

# Define views to extract
views = {
    'Home': (5284, 50000),
    'Report': (90584, 50000),
    'Food': (175621, 50000),
    'Menu': (262117, 50000),
    'Expense': None,  # Will search
    'Revenue': None,  # Will search
}

# Find positions
print('🔍 Finding view positions...\n')
found_views = {}
for view_name in list(views.keys()):
    if views[view_name] is None:
        idx = content.lower().find(view_name.lower())
        if idx != -1:
            found_views[view_name] = (idx, 50000)
            print(f'  ✓ {view_name:12} at position {idx:8}')
        else:
            print(f'  ✗ {view_name:12} not found')
    else:
        idx = views[view_name][0]
        print(f'  ✓ {view_name:12} at position {idx:8}')
        found_views[view_name] = views[view_name]

print(f'\n💾 Extracting views...\n')

# Extract views
for view_name, (start_pos, length) in found_views.items():
    end_pos = min(start_pos + length, len(content))
    section = content[start_pos:end_pos]
    
    # Try to extract meaningful text
    # Remove HTML/CSS but keep structure
    lines = section.split('\n')
    text_lines = []
    for line in lines:
        # Skip CSS/HTML-heavy lines
        if not re.match(r'^\s*([<{}]|--)', line):
            stripped = line.strip()
            if stripped and len(stripped) > 5:
                text_lines.append(stripped)
    
    text_content = '\n'.join(text_lines[:100])  # First 100 meaningful lines
    
    # Save
    safe_name = re.sub(r'[^a-zA-Z0-9]', '_', view_name)
    filename = f'view_{safe_name}.txt'
    
    with open(filename, 'w', encoding='utf-8', errors='ignore') as f:
        f.write(f'VIEW: {view_name}\n')
        f.write('='*60 + '\n\n')
        f.write(text_content)
    
    print(f'✓ {view_name:12} -> {filename:30} ({len(text_content):6} chars)')

print(f'\n✅ Extraction complete!\n')

# Also save the complete full text file
print(f'💾 Saving complete text content...')
all_text = re.sub(r'<[^>]+>', '\n', content)
all_text = html_lib.unescape(all_text)
all_text = '\n'.join(line.strip() for line in all_text.split('\n') if line.strip())

with open('gemini_all_text.txt', 'w', encoding='utf-8') as f:
    f.write(all_text)

print(f'✓ Saved: gemini_all_text.txt ({len(all_text):,} bytes)\n')
