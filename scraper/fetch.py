import urllib.request
import re

url = "https://share.gemini.google/FHDWfH0eK0De"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=30) as res:
        content = res.read().decode('utf-8', errors='ignore')
        
        with open('share_raw.html', 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Downloaded {len(content)} bytes")
        
        strs = re.findall(r'"([^"]{30,})"', content)
        found = False
        for s in strs:
            s_lower = s.lower()
            if 'loor' in s_lower or 'uice' in s_lower or 'thiopian' in s_lower or 'enu' in s_lower:
                try:
                    decoded = s.encode('utf-8').decode('unicode_escape')
                    print("MATCH:", decoded[:500])
                    found = True
                except:
                    pass
        if not found:
            print("No matches found in strings.")
            
        # also check for single quotes
        strs2 = re.findall(r"'([^']{30,})'", content)
        for s in strs2:
            s_lower = s.lower()
            if 'loor' in s_lower or 'uice' in s_lower or 'thiopian' in s_lower or 'enu' in s_lower:
                print("MATCH (single quote):", s[:500])
except Exception as e:
    print("Error:", e)
