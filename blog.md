---
layout: home
title: Blog
permalink: /blog/
---

<div class="blog-page">

  <div class="blog-header">
    <h1 class="blog-title">Blog</h1>
    <p class="blog-subtitle">
      Research, statistics &amp; applied<br />
      data science notes
    </p>
  </div>

  <hr class="blog-divider" />

  <div class="filter-pills" role="tablist" aria-label="Filter posts by topic">
    <button type="button" class="active" role="tab" aria-selected="true">All</button>
    <button type="button" role="tab" aria-selected="false">Statistics</button>
    <button type="button" role="tab" aria-selected="false">Information Theory</button>
    <button type="button" role="tab" aria-selected="false">Machine Learning</button>
    <button type="button" role="tab" aria-selected="false">Applied Data Science</button>
  </div>

  <!-- =================== FEATURED =================== -->
  <h2 class="section-heading">Featured</h2>

  <a class="featured-card"
     href="{{ '/blog/Predicting_Blog_Post_Views_with_Empirical_Bayes_and_Jaccard_Similarity.html' | relative_url }}">

    <div class="featured-content">
      <span class="post-category">Applied Data Science</span>
      <h3 class="featured-title">
        Predicting Blog Post Views with<br />
        Empirical Bayes &amp; Jaccard Similarity
      </h3>
      <p class="featured-description">
        Using Bayesian reasoning and similarity measures to model content performance.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>10 min read</span>
        <span class="dot">•</span>
        <span>2026</span>
      </div>
    </div>

    <div class="featured-image" aria-hidden="true">
      <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect width="300" height="200" fill="#f3f4f6"/>

        <!-- Axes -->
        <line x1="22" y1="178" x2="282" y2="178" stroke="#9ca3af" stroke-width="1"/>
        <line x1="22" y1="178" x2="22"  y2="22"  stroke="#9ca3af" stroke-width="1"/>

        <!-- Confidence band (light blue) -->
        <polygon points="22,178 282,38 282,18 22,158" fill="#3b82f6" fill-opacity="0.12"/>

        <!-- Scatter points — main cloud around the regression line -->
        <circle cx="34"  cy="168" r="3" fill="#3b82f6"/>
        <circle cx="46"  cy="160" r="3" fill="#3b82f6"/>
        <circle cx="58"  cy="155" r="3" fill="#3b82f6"/>
        <circle cx="71"  cy="148" r="3" fill="#3b82f6"/>
        <circle cx="84"  cy="142" r="3" fill="#3b82f6"/>
        <circle cx="96"  cy="138" r="3" fill="#3b82f6"/>
        <circle cx="108" cy="128" r="3" fill="#3b82f6"/>
        <circle cx="121" cy="122" r="3" fill="#3b82f6"/>
        <circle cx="134" cy="118" r="3" fill="#3b82f6"/>
        <circle cx="146" cy="108" r="3" fill="#3b82f6"/>
        <circle cx="158" cy="100" r="3" fill="#3b82f6"/>
        <circle cx="170" cy="96"  r="3" fill="#3b82f6"/>
        <circle cx="183" cy="88"  r="3" fill="#3b82f6"/>
        <circle cx="195" cy="82"  r="3" fill="#3b82f6"/>
        <circle cx="207" cy="74"  r="3" fill="#3b82f6"/>
        <circle cx="220" cy="68"  r="3" fill="#3b82f6"/>
        <circle cx="232" cy="62"  r="3" fill="#3b82f6"/>
        <circle cx="244" cy="54"  r="3" fill="#3b82f6"/>
        <circle cx="256" cy="46"  r="3" fill="#3b82f6"/>
        <circle cx="268" cy="40"  r="3" fill="#3b82f6"/>

        <!-- Scatter noise below the line -->
        <circle cx="42"  cy="174" r="3" fill="#3b82f6"/>
        <circle cx="80"  cy="166" r="3" fill="#3b82f6"/>
        <circle cx="118" cy="148" r="3" fill="#3b82f6"/>
        <circle cx="155" cy="134" r="3" fill="#3b82f6"/>
        <circle cx="190" cy="115" r="3" fill="#3b82f6"/>
        <circle cx="225" cy="92"  r="3" fill="#3b82f6"/>

        <!-- Regression line -->
        <line x1="22" y1="170" x2="282" y2="32" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    </div>
  </a>

  <!-- =================== RESEARCH NOTES =================== -->
  <h2 class="section-heading">Research Notes</h2>

  <div class="post-grid post-grid-3">

    <a class="post-card" href="{{ '/blog/shannon_entropy.html' | relative_url }}">
      <span class="post-category">Information Theory</span>
      <h3 class="post-title">Shannon Entropy</h3>
      <p class="post-description">
        Information theory basics and its applications in data science.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>8 min read</span>
        <span class="dot">•</span>
        <span>2026</span>
      </div>
    </a>

    <a class="post-card" href="{{ '/blog/beta_distribution.html' | relative_url }}">
      <span class="post-category">Probability</span>
      <h3 class="post-title">Beta Distribution</h3>
      <p class="post-description">
        Understanding the Beta distribution and its properties.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>6 min read</span>
        <span class="dot">•</span>
        <span>2025</span>
      </div>
    </a>

    <a class="post-card" href="{{ '/blog/jackknife_method.html' | relative_url }}">
      <span class="post-category">Statistics</span>
      <h3 class="post-title">Jackknife Method</h3>
      <p class="post-description">
        An introduction to the jackknife resampling technique.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>7 min read</span>
        <span class="dot">•</span>
        <span>2025</span>
      </div>
    </a>

    <a class="post-card" href="{{ '/blog/connection_between_different_entropies.html' | relative_url }}">
      <span class="post-category">Information Theory</span>
      <h3 class="post-title">Tsallis Entropy</h3>
      <p class="post-description">
        Generalizing Shannon's framework with Tsallis entropy.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>9 min read</span>
        <span class="dot">•</span>
        <span>2025</span>
      </div>
    </a>

    <a class="post-card" href="{{ '/blog/hypergeometric_distribution.html' | relative_url }}">
      <span class="post-category">Probability</span>
      <h3 class="post-title">Hypergeometric Distribution</h3>
      <p class="post-description">
        The hypergeometric distribution and its real-world applications.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>6 min read</span>
        <span class="dot">•</span>
        <span>2025</span>
      </div>
    </a>

    <a class="post-card" href="{{ '/blog/normal_distribution.html' | relative_url }}">
      <span class="post-category">Statistics</span>
      <h3 class="post-title">Normal Distribution</h3>
      <p class="post-description">
        Properties, visualizations and common use cases.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>7 min read</span>
        <span class="dot">•</span>
        <span>2025</span>
      </div>
    </a>

  </div>

  <!-- =================== APPLIED DATA SCIENCE =================== -->
  <h2 class="section-heading">Applied Data Science</h2>

  <div class="post-grid post-grid-2">

    <a class="post-card" href="{{ '/blog/beyond-dashboards-behavioral-predictive-modeling.html' | relative_url }}">
      <span class="post-category">Behavioral Analytics</span>
      <h3 class="post-title">Beyond Dashboards</h3>
      <p class="post-description">
        Behavioral predictive modeling for e-commerce using GA4-style data.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>12 min read</span>
        <span class="dot">•</span>
        <span>2025</span>
      </div>
    </a>

    <a class="post-card" href="{{ '/blog/why-you-can-spend-500-on-google-ads-and-still-get-0-conversions.html' | relative_url }}">
      <span class="post-category">Analytics</span>
      <h3 class="post-title">Why $500 of Google Ads Can Produce 0 Conversions</h3>
      <p class="post-description">
        A closer look at campaign performance and common pitfalls in digital advertising.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>8 min read</span>
        <span class="dot">•</span>
        <span>2025</span>
      </div>
    </a>

    <a class="post-card" href="{{ '/' | relative_url }}#cold-start">
      <span class="post-category">Statistics</span>
      <h3 class="post-title">The Cold Start Problem in Analytics</h3>
      <p class="post-description">
        Challenges and potential solutions for data-scarce scenarios in machine learning.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>10 min read</span>
        <span class="dot">•</span>
        <span>2025</span>
      </div>
    </a>

    <a class="post-card" href="{{ '/blog/Statistical_Transformations.html' | relative_url }}">
      <span class="post-category">Applied Analytics</span>
      <h3 class="post-title">From Data to Decision</h3>
      <p class="post-description">
        How data-driven insights can create real business value in practice.
      </p>
      <div class="post-meta">
        <i class="far fa-clock"></i>
        <span>9 min read</span>
        <span class="dot">•</span>
        <span>2024</span>
      </div>
    </a>

  </div>

</div>
