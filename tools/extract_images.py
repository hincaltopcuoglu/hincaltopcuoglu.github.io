#!/usr/bin/env python3
"""
Extract inline base64 images out of the migrated posts.

The legacy RStudio/Jupyter exports embed every plot as a base64 data URI
inside the HTML. Across the 20 migrated posts that is ~5 MB of markup
that must be parsed by the browser on every page view.

This script:
  1. Finds every <img src="data:image/...;base64,..."> in _posts/.
  2. Decodes it to a real PNG under assets/images/posts/.
  3. Replaces the data URI with a normal <img src="/assets/images/posts/...">
     carrying width, height, loading="lazy" and decoding="async".

The result is smaller HTML, real cacheable image files, and lazy loading.

Run from the repository root:  python3 tools/extract_images.py
"""

import base64
import os
import re
import struct

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS = os.path.join(ROOT, "_posts")
OUT_DIR = os.path.join(ROOT, "assets", "images", "posts")

IMG_RE = re.compile(
    r'<img\b(?P<attrs>[^>]*?)\bsrc="data:image/(?P<fmt>png|jpe?g|gif);base64,'
    r'(?P<b64>[A-Za-z0-9+/=\s]+?)"(?P<rest>[^>]*?)/?>',
    re.S,
)


def png_size(data):
    """Read width/height from a PNG's IHDR chunk."""
    if len(data) < 24 or data[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    w, h = struct.unpack(">II", data[16:24])
    return w, h


def jpeg_size(data):
    """Read width/height from a JPEG's SOF marker."""
    i = 2
    while i < len(data) - 9:
        if data[i] != 0xFF:
            i += 1
            continue
        marker = data[i + 1]
        if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7,
                      0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
            h, w = struct.unpack(">HH", data[i + 5:i + 9])
            return w, h
        seg_len = struct.unpack(">H", data[i + 2:i + 4])[0]
        i += 2 + seg_len
    return None


def size_of(fmt, data):
    if fmt == "png":
        return png_size(data)
    if fmt in ("jpeg", "jpg"):
        return jpeg_size(data)
    return None


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    total_saved = 0
    total_images = 0
    files_touched = 0

    for name in sorted(os.listdir(POSTS)):
        if not name.endswith((".html", ".md")):
            continue
        path = os.path.join(POSTS, name)
        with open(path, "r", encoding="utf-8") as fh:
            text = fh.read()

        if "data:image" not in text:
            continue

        counter = [0]

        def replace(m):
            fmt = m.group("fmt")
            ext = "jpg" if fmt in ("jpeg", "jpg") else fmt

            b64 = re.sub(r"\s+", "", m.group("b64"))
            try:
                data = base64.b64decode(b64)
            except Exception:
                return m.group(0)

            counter[0] += 1
            stem = os.path.splitext(name)[0]
            fname = f"{stem}-{counter[0]:02d}.{ext}"
            out_path = os.path.join(OUT_DIR, fname)
            with open(out_path, "wb") as out:
                out.write(data)

            dims = size_of(fmt, data)
            # Keep the original attributes (alt, class, …) and swap the src.
            keep = (m.group("attrs") or "").strip()
            keep = re.sub(r'\bsrc\s*=\s*"[^"]*"', '', keep).strip()
            # Drop any pre-existing width/height/loading/decoding so we
            # set the correct ones.
            for attr in ("width", "height", "loading", "decoding"):
                keep = re.sub(rf'\b{attr}\s*=\s*"[^"]*"', '', keep).strip()
            keep = " ".join(keep.split())

            src = 'src="{{ site.baseurl }}/assets/images/posts/' + fname + '"'
            parts = [src]
            if dims:
                parts.append(f'width="{dims[0]}"')
                parts.append(f'height="{dims[1]}"')
            parts.append('loading="lazy"')
            parts.append('decoding="async"')
            if keep:
                parts.append(keep)
            return "<img " + " ".join(parts) + " />"

        new_text = IMG_RE.sub(replace, text)

        if new_text != text:
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(new_text)
            files_touched += 1
            total_images += counter[0]
            before = len(text.encode())
            after = len(new_text.encode())
            total_saved += before - after
            print(f"  {name}: {counter[0]} image(s), "
                  f"{before//1024} KB -> {after//1024} KB")

    print(f"\nExtracted {total_images} inline images from {files_touched} posts.")
    print(f"HTML reduced by {total_saved/1024:.0f} KB; images now live in "
          f"assets/images/posts/ and load lazily.")


if __name__ == "__main__":
    main()
