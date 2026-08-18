import sqlite3
import shutil
import os
from pathlib import Path
import json

# MS Edge cookies location
edge_user_data = Path.home() / "AppData" / "Local" / "Microsoft" / "Edge" / "User Data"
cookies_db = edge_user_data / "Default" / "Network" / "Cookies"

if not cookies_db.exists():
    print(f"❌ Cookies database not found at: {cookies_db}")
    exit(1)

# Copy to temp location (Edge locks the file while running)
temp_cookies = Path.home() / "AppData" / "Local" / "Temp" / "edge_cookies_temp"
shutil.copy2(cookies_db, temp_cookies)
print(f"✓ Copied cookies database to temp: {temp_cookies}")

try:
    conn = sqlite3.connect(str(temp_cookies))
    cursor = conn.cursor()
    
    # First check table schema
    cursor.execute("PRAGMA table_info(cookies)")
    columns = cursor.fetchall()
    print("Cookie table columns:")
    for col in columns:
        print(f"  - {col[1]} ({col[2]})")
    print()
    
    # Query cookies with correct columns
    cursor.execute("SELECT host_key, name, value, is_secure, path FROM cookies")
    cookies = cursor.fetchall()
    
    print(f"\n✓ Found {len(cookies)} total cookies\n")
    
    # Look for Google/Gemini related cookies
    google_cookies = {}
    for host, name, value, secure, path in cookies:
        if 'google' in host.lower() or 'gemini' in host.lower():
            if host not in google_cookies:
                google_cookies[host] = {}
            google_cookies[host][name] = {
                'value': value[:100] if len(value) > 100 else value,  # Truncate long values
                'secure': bool(secure),
                'path': path
            }
    
    if google_cookies:
        print("=" * 80)
        print("GOOGLE/GEMINI COOKIES FOUND:")
        print("=" * 80)
        for host in sorted(google_cookies.keys()):
            print(f"\n📍 Host: {host}")
            for name, data in google_cookies[host].items():
                print(f"   • {name}")
                print(f"     Value: {data['value']}")
                print(f"     Secure: {data['secure']}")
                print(f"     Path: {data['path']}")
    else:
        print("⚠ No Google/Gemini cookies found")
    
    # Export all cookies to JSON
    all_cookies = []
    cursor.execute("SELECT host_key, name, value, expires_utc, is_secure, path FROM cookies")
    for host, name, value, expires, secure, path in cursor.fetchall():
        all_cookies.append({
            'host': host,
            'name': name,
            'value': value,
            'expires': expires,
            'secure': bool(secure),
            'path': path
        })
    
    with open('all_cookies.json', 'w', encoding='utf-8') as f:
        json.dump(all_cookies, f, indent=2)
    print(f"\n✓ Exported all cookies to all_cookies.json ({len(all_cookies)} cookies)")
    
    conn.close()
    
finally:
    # Cleanup
    if temp_cookies.exists():
        os.remove(temp_cookies)
        print(f"✓ Cleaned up temp file")
