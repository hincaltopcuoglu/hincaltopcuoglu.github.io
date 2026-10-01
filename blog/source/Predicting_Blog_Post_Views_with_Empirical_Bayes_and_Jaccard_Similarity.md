---
title: "Predicting Blog Post Views with Empirical Bayes and Jaccard Similarity"
date: 2026-10-01
tags: [bayesian, python, empirical-bayes, jaccard, content-strategy, ga4]
description: |
  How to forecast how many page views a new blog post will get *before*
  you hit publish — using conjugate Bayesian models, empirical Bayes over
  your own historical corpus, and Jaccard title similarity as a content prior.
author: Hıncal Topçuoğlu
---

## The problem: writing a post blind

You spend three days writing a post, hit publish, and then... silence.
A week later you check analytics: 14 views, mostly you refreshing the
tab.

What if you could predict view counts *before* writing? Not a guess —
a posterior predictive distribution with credible intervals, computed
from your own historical corpus.

This post walks through the small Bayesian system I built to do exactly
that for my own blog. It uses only **conjugate analytical Bayes** —
no MCMC, no PyMC, just closed-form posteriors.

## The Bayesian framing

Each historical post $i$ has an unobserved "true view rate" $\lambda_i$
and an observed count $X_i$:

$$
X_i \sim \text{Poisson}(\lambda_i), \qquad
\lambda_i \sim \text{Gamma}(\alpha, \beta)
$$

in the rate parameterization where $\mathbb{E}[\lambda] = \alpha / \beta$.

This is the **Poisson-Gamma** conjugate pair. The posterior after seeing
$X$ observations across $T$ periods is itself a Gamma:

$$
\lambda \mid X \sim \text{Gamma}(\alpha + X,\ \beta + T)
$$

For my own GA4 corpus (90 days, 3 unique posts, 430 views), the
**global empirical Bayes** prior comes out to:

$$
\lambda_{\text{global}} \sim \text{Gamma}(\alpha = 0.54,\ \beta = 0.004)
$$

with a mean of $144$ views per period. The mean is dominated by the
homepage's $421$ views; the variance is enormous. Useful as a fallback,
but not great for distinguishing good titles from bad ones.

## Content-aware prior via Jaccard similarity

The naive global prior says every post is like every other post.
That's wrong. A post titled *"Building a Bayesian Forecasting Pipeline
for Google Analytics 4"* shares almost nothing with the homepage.

Tokenize each title to lowercase word-tokens of length $\geq 2$, then
compute set-Jaccard similarity:

$$
\text{sim}(a, b) \;=\; \frac{|T(a) \cap T(b)|}{|T(a) \cup T(b)|}
$$

For my corpus the only words that recur are the personal-name tokens
(*"Hincal"*, *"Topcuoglu"*) and the page-type tokens (*"Home"*, *"Blog"*,
*"CV"*). So a new title matches weakly or not at all — and the model
correctly concludes it has no historical analogue and falls back to
the global prior.

This is **Bayesian shrinkage in the right direction**: a novel topic
inherits the corpus mean; a familiar topic inherits the matching
post's history.

## Method-of-moments Gamma fit

We need $(\alpha, \beta)$ for the empirical rates. The
**method-of-moments** estimator for Gamma under rate parameterization
is closed-form:

$$
\hat{\beta} = \frac{\bar{r}}{s^2_r}, \qquad
\hat{\alpha} = \bar{r} \cdot \hat{\beta}
$$

where $\bar{r}$ and $s^2_r$ are the sample mean and variance of the
empirical rates. No MCMC, no SciPy fitting, no optimization. For my
corpus this gives $\hat{\alpha} = 0.54$, $\hat{\beta} = 0.004$.

```python
from src.models.content_prior import fit_gamma_method_of_moments
import numpy as np

rates = np.array([421.0, 6.0, 3.0])  # + smoothing in practice
prior = fit_gamma_method_of_moments(rates)
# → GammaPosterior(alpha=0.54, beta=0.004)
```

For the **content-aware** prior, weights are similarity-proportional
pseudo-counts: a post at similarity $s$ contributes $\max(\text{round}(20s), 1)$
samples to the rate distribution we fit on.

## Blending content prior with global prior

The two priors get blended by average similarity:

$$
w_{\text{blend}} = \text{clip}(\bar{s}_{\text{top-K}} \cdot 2.5,\ 0,\ 1)
$$

$$
\lambda_{\text{final}} \sim \text{Gamma}(w \alpha_c + (1-w)\alpha_g,\ w \beta_c + (1-w)\beta_g)
$$

A novel title has $\bar{s} \approx 0$, so $w \to 0$ and we get the
global prior. A title identical to a top performer has $\bar{s} \approx 1$,
so $w \to 1$ and we get the content prior.

## Posterior predictive

The predictive distribution is the mixture

$$
X_{\text{new}} \sim \text{Poisson}(\lambda_{\text{new}}), \qquad
\lambda_{\text{new}} \sim \text{Gamma}(\alpha_f, \beta_f)
$$

sampled directly. For a candidate title like *"Hincal Topcuoglu Resume
CV"* on my corpus this comes out to:

```
Posterior λ mean:                  113.25
Posterior λ std:                   180.99
Predictive mean:                   113.17
Predictive median:                  40
50% CI:                            [6, 143]
95% CI:                            [0, 479]
```

with similarity profile

| Title | Sim | Views |
| --- | ---: | ---: |
| CV - Hincal Topcuoglu | 0.750 | 6 |
| Home - Hincal Topcuoglu | 0.400 | 421 |
| Blog - Hincal Topcuoglu | 0.400 | 3 |

So a CV-like title inherits shrinkage toward the CV's low count
(6 views) rather than being inflated by the homepage's 421.

## Real example: predicting this very post

This post was written in two passes. First the system predicted what
views it would get *before* the draft existed:

```bash
$ python scripts/predict_post.py \
    "Predicting Blog Post Views with Empirical Bayes and Jaccard Similarity" \
    --csv data/raw/top_pages.csv
```

The title shares one token — `"blog"` — with the corpus post *"Blog -
Hincal Topcuoglu"*. The blend weight is small (0.21), and the content
prior collapses onto a single weakly-matched post with 3 views:

```
Avg similarity:  0.083   (blend weight: 0.21)
Similar posts used:          1   (Blog - Hincal Topcuoglu)
Posterior λ mean:           3.99
Posterior λ std:            4.32
Predictive mean:            4.00
Predictive median:          2
50% CI:                     [1, 6]
95% CI:                     [0, 13]
```

The 95% interval is `[0, 13]` — narrow enough to be useful, wide
enough to admit the truth. After publication we'll re-run the
pipeline and rescore to see whether the post landed inside the band.

The interesting thing about this prediction is *what it doesn't
include*: the model has no signal about whether this post is well-
written, well-titled, or well-distributed. It only knows that the
title weakly resembles a low-traffic blog page. The point estimate of
**2** is the corpus saying *"you picked a topic we've seen before and
it didn't get many views — but the interval is honest, so don't be
surprised by anything from 0 to 13"*.

This is the system telling you, in calibrated language, **what it
knows and what it doesn't**.

## Limitations

A few things this system *cannot* do yet:

- **Sparse corpus collapse**. With 3 posts, every title falls back to
  the global prior. The system needs ~10 posts before the similarity
  weighting meaningfully moves predictions.
- **Token-level similarity is crude**. "Python tutorial" and "tutorial
  on Python" tokenize identically, but "Bayesian inference primer"
  and "Primer on Bayesian inference" have Jaccard $= 0.4$ despite being
  semantically identical. Embeddings would fix this.
- **No temporal decay**. A post from 2019 is treated the same as one
  from last week. Real blogs have momentum, seasonal traffic, and
  decay.
- **Survivorship bias**. The corpus only includes posts that already
  exist. Titles you *didn't* publish are missing from the training
  set.

## When to upgrade

- **5–10 posts published**: similarity starts to be informative.
  Add per-author and per-tag features.
- **20+ posts**: replace Jaccard with sentence embeddings
  (`all-MiniLM-L6-v2`) and re-fit. The whole module stays the same.
- **50+ posts**: add a hierarchical model over `author × topic ×
  month` with partial pooling. Same content-aware prior idea,
  richer hierarchy.
- **GA4 + Search Console**: pull query-level data so the prior knows
  which topics have actual search demand.

## Why this matters

The point of forecasting views is not to optimize for the algorithm.
It's to **make the publish decision visible**: do you want to write a
post whose 95% credible interval is `[1, 535]`? Probably not — you
should pick a topic the model has seen before, or accept that you
are exploring and write it anyway.

Once you have a few dozen posts, the system will start telling you,
in calibrated probabilistic language, which topics the corpus already
understands and which ones it doesn't. That, more than the point
estimate, is what makes it useful.