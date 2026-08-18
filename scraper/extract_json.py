import re
import json

path = r"C:\Users\dell\.gemini\antigravity-cli\brain\ba2d1e5c-5821-49e5-b116-43e3d265c359\.system_generated\steps\761\content.md"
content = open(path, "r", encoding="utf-8").read()

# Look for any long string that contains "Enu Food House"
idx = content.lower().find("enu food house")
if idx != -1:
    print(f"Found at {idx}")
    print(content[max(0, idx-500):idx+500])
else:
    print("Not found by simple substring search!")

# Dump all strings longer than 100 chars that have spaces
strs = re.findall(r'"([^"]{100,})"', content)
for s in strs:
    if "Enu" in s or "enu" in s:
        print("FOUND ENU:", s)

# How about single quotes?
strs = re.findall(r"'([^']{100,})'", content)
for s in strs:
    if "Enu" in s or "enu" in s:
        print("FOUND ENU in single quotes:", s)
        
# Maybe it's html encoded?
idx = content.lower().find("enu")
if idx != -1:
    print(f"Found 'enu' at {idx}")
    print(content[max(0, idx-100):idx+100])
