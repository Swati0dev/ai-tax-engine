import os
import re

wiki_dir = r"d:\agent\ai-tax-engine\wiki"
index_file = os.path.join(wiki_dir, "index.md")

with open(index_file, "r", encoding="utf-8") as f:
    index_content = f.read()

# Find all linked files in index.md
linked_files = set(re.findall(r'\]\(([^)]+\.md)\)', index_content))

# Add known system files
linked_files.add("index.md")
linked_files.add("log.md")

# Get all actual .md files in the wiki directory
actual_files = set()
for f in os.listdir(wiki_dir):
    if f.endswith(".md"):
        actual_files.add(f)

orphan_files = actual_files - linked_files
print("ORPHAN WIKI FILES:", orphan_files)
