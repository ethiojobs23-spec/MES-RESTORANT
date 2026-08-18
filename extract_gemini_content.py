import re
import json
import urllib.parse
import html

with open("raw_gzip.html", "r", encoding="utf-8") as f:
    content = f.read()

# Try to find the TSDtV block or any large JSON array that contains our text
# Often the response is embedded in AF_initDataCallback
scripts = re.findall(r'AF_initDataCallback\(\{key:\s*\'ds:1\',.*?data:([\s\S]*?)\}\);', content)
if not scripts:
    scripts = re.findall(r'AF_initDataCallback\(\{key:\s*\'ds:0\',.*?data:([\s\S]*?)\}\);', content)
    
if not scripts:
    scripts = re.findall(r'AF_initDataCallback\(\{key:\s*\'ds:2\',.*?data:([\s\S]*?)\}\);', content)

with open("extracted_data.txt", "w", encoding="utf-8") as f:
    for s in scripts:
        try:
            # Look for strings that might be the response
            matches = re.findall(r'"([^"]*Enat wubet Bacha[^"]*)"', s)
            for m in matches:
                f.write("PROMPT:\n" + m + "\n\n")
                
            # Look for a large text block around it, maybe the AI's response
            f.write("RAW CHUNK:\n")
            f.write(s[:50000]) # just dump the first 50k to see the structure
        except Exception as e:
            f.write(f"Error: {e}\n")

# Alternatively, search the whole file for the pattern
idx = content.find("Enat wubet Bacha")
if idx != -1:
    with open("extracted_around_target.txt", "w", encoding="utf-8") as f:
        f.write(content[max(0, idx-1000):idx+10000])
