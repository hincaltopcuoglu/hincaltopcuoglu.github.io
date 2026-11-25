#!/usr/bin/env python3
"""
Migrate legacy RStudio/Jupyter-exported HTML posts into real Jekyll posts.

Legacy posts live in blog/ as standalone .html files with no front matter.
Jekyll therefore cannot see them: they get no layout, no analytics, no
navigation, and they never appear in site.posts or the Atom feed.

This script:
  1. Splits each legacy file into <head> content and <body> content.
  2. Hoists the large duplicated <style>/<script> blocks out of the
     bootstrap-flavoured and Jupyter-flavoured exports into shared assets
     under assets/css/legacy/ and assets/js/legacy/.
  3. Writes a front-matter block into each file and moves it into _posts/
     with a date-prefixed filename, preserving the original URL via
     `permalink:`.
  4. Leaves markdown posts untouched (they already have front matter).

Run from the repository root:  python3 tools/migrate_posts.py
"""

import hashlib
import os
import re
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, "blog")
POSTS = os.path.join(ROOT, "_posts")
LEGACY_CSS = os.path.join(ROOT, "assets", "css", "legacy")
LEGACY_JS = os.path.join(ROOT, "assets", "js", "legacy")

# Export flavours and the shared assets they need.
FLAVOURS = {
    "bootstrap": {
        "css": ["assets/css/legacy/rstudio-bootstrap.css"],
        "js": ["assets/js/legacy/rstudio-hl.js"],
    },
    "jupyter": {
        "css": ["assets/css/legacy/jupyter.css"],
        "js": ["assets/js/legacy/jupyter.js"],
    },
    "plain": {"css": [], "js": []},
}

# The front matter for each post: filename -> (date, title)
POSTS_META = {
    "Binomial_Calculation_and_Distribution_Example.html": ("2019-11-25", "Binomial Calculation and Distribution Example"),
    "KernelDensityEstimation_LinReg_XgBoost.html": ("2025-06-10", "Kernel Density Estimation, Linear Regression & XGBoost"),
    "Predicting_Blog_Post_Views_with_Empirical_Bayes_and_Jaccard_Similarity.html": ("2026-10-01", "Predicting Blog Post Views with Empirical Bayes and Jaccard Similarity"),
    "Symbolic_Derivative_Blog.html": ("2025-06-10", "Enhancing Analytical Computations with the Symbolic Derivative Tool"),
    "Two_Clustering_Approaches_for_Analyzing_Promotions.html": ("2025-06-19", "Two Clustering Approaches for Analyzing Promotions"),
    "asymptotic_feature_of_shannon_entropy.html": ("2025-11-01", "Asymptotic Feature of Shannon Entropy"),
    "attention_mechanism_explained.html": ("2025-11-01", "Understanding the Attention Mechanism"),
    "beta_distribution.html": ("2019-12-23", "Beta Distribution"),
    "beta_prior.html": ("2019-12-26", "Beta Prior for Binomial Data"),
    "connection_between_different_entropies.html": ("2020-02-20", "Connection Between Different Entropies"),
    "gamma_distribution.html": ("2019-12-23", "Gamma Distribution"),
    "hypergeometric_distribution.html": ("2019-11-25", "Hypergeometric Distribution"),
    "jackknife_method.html": ("2019-05-12", "Overview of Jackknife Method"),
    "maximum-entropy.html": ("2025-11-01", "Maximum Entropy with Lagrange Multipliers"),
    "normal_distribution.html": ("2019-12-23", "Normal Distribution"),
    "poisson_regression.html": ("2025-11-17", "Poisson Regression Analysis"),
    "proof_of_maximum_entropy.html": ("2025-11-01", "Proof of the Maximum Entropy Principle"),
    "proof_of_the_joint_entropy_using_conditonal_entropy.html": ("2025-11-01", "Proof of the Joint Entropy Formula using Conditional Entropy"),
    "reaching_best_entropy.html": ("2020-02-19", "Reaching Best Entropy"),
    "shannon_entropy.html": ("2025-12-01", "Shannon Entropy"),
}

# Categories per post (mirrors _data/post_meta.yml)
CATEGORIES = {
    "Binomial_Calculation_and_Distribution_Example.html": "Statistics",
    "KernelDensityEstimation_LinReg_XgBoost.html": "Machine Learning",
    "Predicting_Blog_Post_Views_with_Empirical_Bayes_and_Jaccard_Similarity.html": "Applied Data Science",
    "Symbolic_Derivative_Blog.html": "Machine Learning",
    "Two_Clustering_Approaches_for_Analyzing_Promotions.html": "Machine Learning",
    "asymptotic_feature_of_shannon_entropy.html": "Information Theory",
    "attention_mechanism_explained.html": "Machine Learning",
    "beta_distribution.html": "Statistics",
    "beta_prior.html": "Statistics",
    "connection_between_different_entropies.html": "Information Theory",
    "gamma_distribution.html": "Statistics",
    "hypergeometric_distribution.html": "Statistics",
    "jackknife_method.html": "Statistics",
    "maximum-entropy.html": "Information Theory",
    "normal_distribution.html": "Statistics",
    "poisson_regression.html": "Statistics",
    "proof_of_maximum_entropy.html": "Information Theory",
    "proof_of_the_joint_entropy_using_conditonal_entropy.html": "Information Theory",
    "reaching_best_entropy.html": "Information Theory",
    "shannon_entropy.html": "Information Theory",
}

# Threshold above which a style/script block is hoisted into a shared asset.
HOIST_THRESHOLD = 2000


def slugify(name):
    """Turn a post filename into a Jekyll-safe slug (no date prefix)."""
    stem = os.path.splitext(name)[0]
    stem = re.sub(r"[^A-Za-z0-9]+", "-", stem).strip("-").lower()
    return stem or "post"


def detect_flavour(body):
    if "jp-Notebook" in body:
        return "jupyter"
    if "container-fluid main-container" in body:
        return "bootstrap"
    return "plain"


def write_shared_asset(path, content):
    """Write a shared asset once; return True if newly created."""
    if os.path.exists(path):
        return False
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(content)
    return True


def build_front_matter(title, date, permalink, category, flavour):
    lines = [
        "---",
        f'title: "{title}"',
        f"date: {date}",
        f"permalink: {permalink}",
        "layout: post",
        f"categories: [{category}]",
        f"legacy_flavour: {flavour}",
        "---",
    ]
    return "\n".join(lines) + "\n"


def migrate():
    os.makedirs(POSTS, exist_ok=True)
    os.makedirs(LEGACY_CSS, exist_ok=True)
    os.makedirs(LEGACY_JS, exist_ok=True)

    created_css = set()
    created_js = set()
    migrated = []

    for name in sorted(POSTS_META):
        src = os.path.join(BLOG, name)
        if not os.path.exists(src):
            print(f"  !! missing {name}", file=sys.stderr)
            continue

        with open(src, "r", encoding="utf-8") as fh:
            text = fh.read()

        body_match = re.search(r"<body[^>]*>", text)
        if not body_match:
            print(f"  !! no <body> in {name}", file=sys.stderr)
            continue
        head = text[: body_match.start()]
        body = text[body_match.end():]
        close = body.lower().find("</body>")
        if close != -1:
            body = body[:close]

        flavour = detect_flavour(body)
        hoisted_css = set()
        hoisted_js = set()

        # ---- hoist large shared style blocks --------------------------
        # A single export can contain several large stylesheets (the
        # Jupyter exports ship a base theme plus per-widget rules).
        # Each distinct block becomes its own shared file so nothing is
        # silently dropped. Only blocks that are actually hoisted are
        # removed from the page afterwards.
        css_index = 0
        for _attrs, css in re.findall(r"<style([^>]*)>(.*?)</style>", head, re.S):
            if len(css) < HOIST_THRESHOLD:
                continue
            css_index += 1
            if flavour == "bootstrap" and ".container-fluid" in css:
                target = os.path.join(LEGACY_CSS, "rstudio-bootstrap.css")
            elif flavour == "jupyter":
                target = os.path.join(LEGACY_CSS, f"jupyter-{css_index}.css")
            else:
                target = os.path.join(
                    LEGACY_CSS, f"{os.path.splitext(name)[0]}-{css_index}.css"
                )
            if write_shared_asset(target, css):
                created_css.add(target)
            hoisted_css.add(target)

        # ---- hoist data: URI stylesheets ------------------------------
        # Some exports embed the very same stylesheet twice: once as a
        # <style> block and once as a percent-encoded <link>. Both are
        # replaced by the single shared stylesheet.
        for m in re.finditer(
            r'<link[^>]*href="data:text/css[^"]*"[^>]*>', head
        ):
            tag = m.group(0)
            if len(tag) < HOIST_THRESHOLD:
                continue
            payload = re.search(r'href="data:text/css[^,]*,([^"]*)"', tag)
            if not payload:
                continue
            css = urllib.parse.unquote(payload.group(1))
            if ".container-fluid" in css:
                target = os.path.join(LEGACY_CSS, "rstudio-bootstrap.css")
            elif flavour == "jupyter":
                target = os.path.join(LEGACY_CSS, "jupyter-1.css")
            else:
                target = os.path.join(
                    LEGACY_CSS, f"{os.path.splitext(name)[0]}-datauri.css"
                )
            if write_shared_asset(target, css):
                created_css.add(target)
            hoisted_css.add(target)

        # ---- hoist large shared script blocks -------------------------
        # Only self-contained library code is hoisted. Bootstrapping
        # code (require.js config, MathJax config, jQuery plugins that
        # depend on globals) stays inline so the notebook still works.
        for _attrs, js in re.findall(r"<script([^>]*)>(.*?)</script>", head, re.S):
            if len(js) < HOIST_THRESHOLD:
                continue
            if "jQuery v" in js[:200]:
                target = os.path.join(LEGACY_JS, "rstudio-jquery.js")
            elif "Bootstrap v3" in js:
                target = os.path.join(LEGACY_JS, "rstudio-bootstrap.js")
            elif "hljs" in js:
                target = os.path.join(LEGACY_JS, "rstudio-hl.js")
            else:
                # Unrecognised large script: keep it inline rather than
                # risk breaking a dependency chain.
                continue
            if write_shared_asset(target, js):
                created_js.add(target)
            hoisted_js.add(target)

        # ---- strip exactly the hoisted blocks from the head -----------
        # Blocks are matched by content so that nothing is removed by
        # accident. <script src="..."> tags (even data: URIs) are always
        # kept: they are the entry points that load the hoisted libraries.
        for path in hoisted_css:
            with open(path, "r", encoding="utf-8") as fh:
                css_text = fh.read()
            head = head.replace(css_text, "")
        for path in hoisted_js:
            with open(path, "r", encoding="utf-8") as fh:
                js_text = fh.read()
            head = head.replace(js_text, "")
        # Remove the now-empty style/script wrappers left behind.
        head = re.sub(r"<style[^>]*>\s*</style>", "", head)
        head = re.sub(r"<script(?![^>]*\bsrc=)[^>]*>\s*</script>", "", head)
        # Large data: URI stylesheets are replaced by the shared file.
        head = re.sub(
            r'<link[^>]*href="data:text/css[^"]*"[^>]*>', "", head
        )
        head = re.sub(r"<head[^>]*>", "", head)
        head = re.sub(r"</head>", "", head)

        # ---- build the new file ---------------------------------------
        date, title = POSTS_META[name]
        permalink = "/blog/" + name
        category = CATEGORIES.get(name, "Statistics")

        front = build_front_matter(title, date, permalink, category, flavour)

        # Remove the export's own title/author/date banner and container
        # wrappers; the shared layout renders those from front matter.
        body = re.sub(
            r'<div class="fluid-row" id="header">.*?</div>', "", body, flags=re.S
        )
        body = body.replace('<div class="container-fluid main-container">', "")

        out_name = f"{date}-{slugify(name)}.html"
        out_path = os.path.join(POSTS, out_name)

        with open(out_path, "w", encoding="utf-8") as fh:
            fh.write(front + body.strip() + "\n")

        os.remove(src)
        migrated.append((name, out_name, flavour))

    print(f"Migrated {len(migrated)} posts into _posts/")
    for old, new, fl in migrated:
        print(f"  {fl:10} {old[:50]:50} -> {new}")
    for p in sorted(created_css):
        print(f"  created CSS {os.path.relpath(p, ROOT)} ({os.path.getsize(p)//1024} KB)")
    for p in sorted(created_js):
        print(f"  created JS  {os.path.relpath(p, ROOT)} ({os.path.getsize(p)//1024} KB)")


if __name__ == "__main__":
    migrate()
