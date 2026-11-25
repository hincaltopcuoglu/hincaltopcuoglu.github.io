#!/usr/bin/env python3
"""
Verify every internal link in the built site resolves.

Mimics GitHub Pages' URL resolution:
  - /path/file.html      -> the file
  - /path/file           -> the file, if it exists
  - /path/file/          -> /path/file/index.html
  - /path/               -> /path/index.html

Run from the repository root:
    jekyll build -d _site
    python3 tools/check_links.py _site
"""

import os
import re
import sys

LINK_RE = re.compile(r'(?:href|src)="([^"]+)"')
SKIP_PREFIXES = ("http://", "https://", "mailto:", "tel:", "#", "data:", "javascript:")


def resolve(root, url):
    """Return the on-disk path a URL maps to, or None if it cannot."""
    path = url.split("#")[0].split("?")[0]
    if not path:
        return None

    if path.startswith("/"):
        path = path[1:]

    candidate = os.path.join(root, path)

    if os.path.isfile(candidate):
        return candidate

    if path.endswith("/"):
        idx = os.path.join(candidate, "index.html")
        return idx if os.path.isfile(idx) else None

    # Extensionless URL: GitHub Pages serves the .html file.
    if os.path.isfile(candidate + ".html"):
        return candidate + ".html"

    idx = os.path.join(candidate, "index.html")
    if os.path.isfile(idx):
        return idx

    return None


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else "_site"
    if not os.path.isdir(root):
        print(f"build directory not found: {root}")
        return 1

    checked = 0
    broken = []

    for dirpath, _dirs, files in os.walk(root):
        for name in files:
            if not name.endswith(".html"):
                continue
            page = os.path.join(dirpath, name)
            with open(page, encoding="utf-8", errors="replace") as fh:
                text = fh.read()

            for m in LINK_RE.finditer(text):
                url = m.group(1)
                if url.startswith(SKIP_PREFIXES):
                    continue
                checked += 1
                if resolve(root, url) is None:
                    broken.append((os.path.relpath(page, root), url))

    print(f"checked {checked} internal links across the built site")
    if not broken:
        print("OK - no broken internal links")
        return 0

    print(f"\nBROKEN: {len(broken)}")
    seen = set()
    for page, url in broken:
        if (page, url) in seen:
            continue
        seen.add((page, url))
        print(f"   {page}: {url}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
