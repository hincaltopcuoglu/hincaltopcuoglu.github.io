# hincaltopcuoglu.github.io

Personal site — statistics, machine learning, information theory and applied analytics.

## Structure

```
_config.yml          Site configuration
_data/
  post_meta.yml      Single source of truth for post titles, descriptions,
                     categories, tags, reading times and accent colours
  expertise.yml      Home page "What I work on" cards
_includes/
  head.html          Shared <head>: meta tags, Open Graph, canonical URLs
  site-header.html   Site navigation (with search + theme toggle)
  site-footer.html   Site footer
  search-modal.html  Search dialog markup
_layouts/
  default.html       Base layout used by every page
  post.html          Post layout: header, table of contents, body, footer
_posts/              All 25 articles (front matter + content)
blog/                Static assets published as-is (5 PDF papers)
assets/
  css/style.css      Design system (light + dark)
  css/legacy/        Stylesheets extracted from the RStudio/Jupyter exports
  js/site.js         Search, filters, theme, reveal, counters, TOC, copy buttons
  images/            Site imagery (WebP) and per-post figures
tools/               Maintenance scripts (see below)
```

## Adding a post

1. Create `assets/images/<name>.webp` if the post needs a cover.
2. Create `_posts/YYYY-MM-DD-<slug>.md` (or `.html` for a raw export) with front matter:

   ```yaml
   ---
   layout: post
   title: "Your Title"
   date: 2026-11-25
   permalink: /blog/your-slug.html
   categories: [Statistics]
   tags: [tag-one, tag-two]
   mathjax: true        # only if the post contains LaTeX
   ---
   ```

3. Add an entry for the post to `_data/post_meta.yml`, keyed by its permalink.
   The title, description, reading time and category shown on the blog
   index and in the post header all come from there.

The blog index, the Atom feed and the sitemap are generated from the
post collection, so a new post appears automatically — no card needs to
be added by hand.

## Maintenance scripts

```bash
# Build the site locally
jekyll build -d _site

# Verify every internal link resolves
python3 tools/check_links.py _site

# Drive the built site with a real browser (needs the local server)
node tools/e2e_test.js _site http://127.0.0.1:8765
```

`tools/migrate_posts.py` and `tools/extract_images.py` are one-off
migration scripts kept for reference: they converted the legacy
RStudio/Jupyter HTML exports into real Jekyll posts and pulled the
inline base64 plots out into separate image files.

## Posts

- JackKnife Method -> https://hincaltopcuoglu.github.io/blog/jackknife_method.html
- Binomial Distribution -> https://hincaltopcuoglu.github.io/blog/Binomial_Calculation_and_Distribution_Example.html
- Hypergeometric Distribution -> https://hincaltopcuoglu.github.io/blog/hypergeometric_distribution.html
- Beta Distribution -> https://hincaltopcuoglu.github.io/blog/beta_distribution.html
- Gamma Distribution -> https://hincaltopcuoglu.github.io/blog/gamma_distribution.html
- Normal Distribution -> https://hincaltopcuoglu.github.io/blog/normal_distribution.html
- Beta Prior Binomial Data -> https://hincaltopcuoglu.github.io/blog/beta_prior.html
- Shannon Entropy -> https://hincaltopcuoglu.github.io/blog/shannon_entropy.html
- Asymptotic Feature of Shannon Entropy -> https://hincaltopcuoglu.github.io/blog/asymptotic_feature_of_shannon_entropy.html
- Reaching Best Entropy -> https://hincaltopcuoglu.github.io/blog/reaching_best_entropy.html
- Connection Between Different Entropies -> https://hincaltopcuoglu.github.io/blog/connection_between_different_entropies.html
- Proof of The Maximum Entropy using basic proofs of derivatives to taylor series expansion -> https://hincaltopcuoglu.github.io/blog/proof_of_maximum_entropy.html
- Understanding Attention Mechanism -> https://hincaltopcuoglu.github.io/blog/attention_mechanism_explained.html
- the Proof of Joint Entropy using Marginal and Conditional Entropy -> https://hincaltopcuoglu.github.io/blog/proof_of_the_joint_entropy_using_conditonal_entropy.html
- the Proof of Maximum Entropy using Lagrange Multipliers and Derivatives with Python code -> https://hincaltopcuoglu.github.io/blog/maximum-entropy.html
- Hilbert Space, Kernel Methods -> https://hincaltopcuoglu.github.io/blog/kernel_works_hilbert_space.pdf
- the Repo Blog of Symbolic Derivative Tool -> https://hincaltopcuoglu.github.io/blog/Symbolic_Derivative_Blog.html
- Kernel Density Estimation Work -> https://hincaltopcuoglu.github.io/blog/KernelDensityEstimation_LinReg_XgBoost.html
- Two Distinct Clustering used, Product, Store based post campaign analysis -> https://hincaltopcuoglu.github.io/blog/Two_Clustering_Approaches_for_Analyzing_Promotions.html
- Poisson Regression Analysis -> https://hincaltopcuoglu.github.io/blog/poisson_regression.html
- RNN from Scratch -> https://hincaltopcuoglu.github.io/blog/RNN_Study_Paper.pdf
- Generalization BG Entropy to Tsallis Entropy -> https://hincaltopcuoglu.github.io/blog/Generalization_BG_Entropy_to_Tsallis.pdf
- another Generalization or Shannon Entropy in Tsallis Entropy form -> https://hincaltopcuoglu.github.io/blog/Shannon_Generalization_in_Tsallis_Form.pdf
- Finding Extremum of Tsallis Entropy -> https://hincaltopcuoglu.github.io/blog/Finding_Extremum_Tsallis_Entropy.pdf
- Statistical Transformations -> https://hincaltopcuoglu.github.io/blog/Statistical_Transformations.html
- Behavioral Predictive Modeling in E-Commerce -> https://hincaltopcuoglu.github.io/blog/beyond-dashboards-behavioral-predictive-modeling.html
- The problem of Cold Start E-Commerce Traffic / Conversion Problem -> https://hincaltopcuoglu.github.io/blog/why-you-can-spend-500-on-google-ads-and-still-get-0-conversions/
- Understanding the diagnosis of your web traffic -> https://hincaltopcuoglu.github.io/blog/the-real-problem-isnt-traffic-its-not-knowing-whats-broken
- Boosting Conversions with Your GA Data — First Improvements in 14 Days -> https://hincaltopcuoglu.github.io/blog/boost-conversions-with-ga4/
- Predicting Blog Post Views with Empirical Bayes -> https://hincaltopcuoglu.github.io/blog/Predicting_Blog_Post_Views_with_Empirical_Bayes_and_Jaccard_Similarity.html
