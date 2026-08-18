import re

def extract():
    path = r"C:\Users\dell\.gemini\antigravity-cli\brain\ba2d1e5c-5821-49e5-b116-43e3d265c359\scratch\fetcher\raw_response.html"
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        print("Error reading raw_response.html:", e)
        return

    # Find the prompt and print context around it
    idx = content.find("Enat wubet Bacha")
    if idx != -1:
        start = max(0, idx - 500)
        end = min(len(content), idx + 5000) # grab 5000 chars after, should contain the AI response
        print("--- CONTEXT AROUND PROMPT ---")
        print(content[start:end])
    else:
        print("Prompt not found in raw_response.html!")
        
if __name__ == "__main__":
    extract()
