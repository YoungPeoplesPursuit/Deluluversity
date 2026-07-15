import json

with open("../data/content.json", "r", encoding="utf-8") as f:
    content = json.load(f)

print(content)
