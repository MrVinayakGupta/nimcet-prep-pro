import pypdf
import os

pdf_path = r"C:\Users\Vinayak Gupta\.gemini\antigravity\brain\e20423e0-07cc-4209-9bb5-9e273c88d802\.user_uploaded\media_1792089548287.pdf"
out_path = r"server\seed\data\raw_2026.txt"

reader = pypdf.PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")

with open(out_path, "w", encoding="utf-8") as out:
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        out.write(f"=== PAGE {i+1} ===\n")
        out.write(text or "")
        out.write("\n\n")

print(f"Extracted to {out_path}")
