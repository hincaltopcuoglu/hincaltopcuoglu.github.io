---
layout: default
title: Blog
permalink: /blog/
---

{%- comment -%}
  The post grid is generated from the Jekyll post collection, so every
  post appears automatically — adding a file to _posts/ is enough.
  Display titles, descriptions, categories and reading times come from
  _data/post_meta.yml.
{%- endcomment -%}

{%- assign posts = site.posts | sort: "date" | reverse -%}

{%- assign featured = posts | where: "featured", true -%}
{%- if featured.size == 0 -%}
  {%- assign featured = posts | slice: 0, 1 -%}
{%- endif -%}
{%- assign featured_post = featured.first -%}

{%- assign rest = posts | where_exp: "p", "p.url != featured_post.url" -%}

{%- assign topic_order = "Applied Data Science,Information Theory,Machine Learning,Statistics" | split: "," -%}

{%- comment -%} The PDF papers live outside the post collection {%- endcomment -%}
{%- assign paper_count = 0 -%}
{%- for item in site.data.post_meta -%}
  {%- if item[0] contains '.pdf' -%}{%- assign paper_count = paper_count | plus: 1 -%}{%- endif -%}
{%- endfor -%}

<div class="blog-page">

  <header class="blog-header">
    <div>
      <p class="blog-eyebrow">Research &amp; Notes</p>
      <h1 class="blog-title">Blog</h1>
      <p class="blog-subtitle">
        {{ posts.size }} posts on statistics, machine learning,
        information theory and applied analytics.
      </p>
    </div>

    <div class="blog-stats">
      <div class="blog-stat">
        <span class="blog-stat-value" data-count-to="{{ posts.size }}">0</span>
        <span class="blog-stat-label">Posts</span>
      </div>
      <div class="blog-stat">
        <span class="blog-stat-value" data-count-to="{{ topic_order.size }}">0</span>
        <span class="blog-stat-label">Topics</span>
      </div>
      <div class="blog-stat">
        <span class="blog-stat-value" data-count-to="{{ posts | group_by_exp: 'p', "p.date | date: '%Y'" | size }}">0</span>
        <span class="blog-stat-label">Years</span>
      </div>
    </div>
  </header>

  <hr class="blog-divider" />

  {%- comment -%} ---- Topic filters ---- {%- endcomment -%}
  <div class="filter-bar">
    <div class="filter-pills" role="tablist" aria-label="Filter posts by topic">
      <button type="button" class="active" role="tab" aria-selected="true" data-filter="All">All</button>
      {%- for topic in topic_order -%}
        {%- assign count = posts | where_exp: "p", "p.categories contains topic" | size -%}
        {%- if count > 0 %}
        <button type="button" role="tab" aria-selected="false" data-filter="{{ topic }}">
          {{ topic }} <span class="filter-count">{{ count }}</span>
        </button>
        {%- endif -%}
      {%- endfor -%}
    </div>

    <label class="filter-search">
      <i class="fas fa-search" aria-hidden="true"></i>
      <input type="search" id="post-filter-input" placeholder="Filter by title…" aria-label="Filter posts by title" />
    </label>
  </div>

  <p class="filter-status" id="filter-status" aria-live="polite"
     data-suffix=" posts ({{ posts.size }} articles, {{ paper_count }} papers)">
    Showing <span id="filter-count">{{ posts.size }}</span> of {{ posts.size }} articles, {{ paper_count }} papers
  </p>

  {%- comment -%} ---- Featured post ---- {%- endcomment -%}
  {%- if featured_post %}
  {%- assign fm = site.data.post_meta[featured_post.url] %}
  <a class="featured-card" href="{{ featured_post.url | relative_url }}" data-post-card
     data-categories="{{ fm.categories | join: '|' }}">
    <div class="featured-content">
      {%- if fm.categories and fm.categories.size > 0 %}
      <span class="post-category">{{ fm.categories | first }}</span>
      {%- endif %}
      <h2 class="featured-title">{{ fm.title | default: featured_post.title }}</h2>
      {%- if fm.description %}
      <p class="featured-description">{{ fm.description }}</p>
      {%- endif %}
      <div class="post-meta">
        <i class="far fa-calendar" aria-hidden="true"></i>
        <span>{{ featured_post.date | date: "%b %-d, %Y" }}</span>
        <span class="dot" aria-hidden="true">•</span>
        <i class="far fa-clock" aria-hidden="true"></i>
        <span>{{ fm.reading_time }} min read</span>
      </div>
      <span class="featured-cta">Read the post <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </div>

    <div class="featured-visual" aria-hidden="true">
      {%- if fm.cover %}
      <img src="{{ fm.cover | relative_url }}" alt="" loading="lazy" decoding="async" />
      {%- else %}
      <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect width="300" height="200" fill="#f3f4f6"/>
        <line x1="22" y1="178" x2="282" y2="178" stroke="#9ca3af" stroke-width="1"/>
        <line x1="22" y1="178" x2="22" y2="22" stroke="#9ca3af" stroke-width="1"/>
        <polygon points="22,178 282,38 282,18 22,158" fill="#3b82f6" fill-opacity="0.12"/>
        <circle cx="34" cy="168" r="3" fill="#3b82f6"/><circle cx="46" cy="160" r="3" fill="#3b82f6"/>
        <circle cx="58" cy="155" r="3" fill="#3b82f6"/><circle cx="71" cy="148" r="3" fill="#3b82f6"/>
        <circle cx="84" cy="142" r="3" fill="#3b82f6"/><circle cx="96" cy="138" r="3" fill="#3b82f6"/>
        <circle cx="108" cy="128" r="3" fill="#3b82f6"/><circle cx="121" cy="122" r="3" fill="#3b82f6"/>
        <circle cx="134" cy="118" r="3" fill="#3b82f6"/><circle cx="146" cy="108" r="3" fill="#3b82f6"/>
        <circle cx="158" cy="100" r="3" fill="#3b82f6"/><circle cx="170" cy="96" r="3" fill="#3b82f6"/>
        <circle cx="183" cy="88" r="3" fill="#3b82f6"/><circle cx="195" cy="82" r="3" fill="#3b82f6"/>
        <circle cx="207" cy="74" r="3" fill="#3b82f6"/><circle cx="220" cy="68" r="3" fill="#3b82f6"/>
        <circle cx="232" cy="62" r="3" fill="#3b82f6"/><circle cx="244" cy="54" r="3" fill="#3b82f6"/>
        <circle cx="256" cy="46" r="3" fill="#3b82f6"/><circle cx="268" cy="40" r="3" fill="#3b82f6"/>
        <circle cx="42" cy="174" r="3" fill="#3b82f6"/><circle cx="80" cy="166" r="3" fill="#3b82f6"/>
        <circle cx="118" cy="148" r="3" fill="#3b82f6"/><circle cx="155" cy="134" r="3" fill="#3b82f6"/>
        <circle cx="190" cy="115" r="3" fill="#3b82f6"/><circle cx="225" cy="92" r="3" fill="#3b82f6"/>
        <line x1="22" y1="170" x2="282" y2="32" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      {%- endif %}
    </div>
  </a>
  {%- endif %}

  {%- comment -%} ---- Post grid, grouped by topic ---- {%- endcomment -%}
  {%- for topic in topic_order %}
  {%- assign topic_posts = rest | where_exp: "p", "p.categories contains topic" %}
  {%- if topic_posts.size > 0 %}
  <section class="blog-section" data-reveal>
    <h2 class="section-heading">
      {{ topic }}
      <span class="section-count">{{ topic_posts.size }}</span>
    </h2>

    <div class="post-grid post-grid-3">
      {%- for post in topic_posts %}
      {%- assign pm = site.data.post_meta[post.url] %}
      <a class="post-card" href="{{ post.url | relative_url }}" data-post-card
         data-categories="{{ pm.categories | join: '|' }}"
         data-title="{{ pm.title | default: post.title | downcase | escape }}">
        {%- if pm.cover %}
        <div class="post-card-cover">
          <img src="{{ pm.cover | relative_url }}" alt="" loading="lazy" decoding="async" />
        </div>
        {%- endif %}

        <div class="post-card-body">
          {%- if pm.categories and pm.categories.size > 0 %}
          <span class="post-category">{{ pm.categories | first }}</span>
          {%- endif %}

          <h3 class="post-title">{{ pm.title | default: post.title }}</h3>

          {%- if pm.description %}
          <p class="post-description">{{ pm.description }}</p>
          {%- endif %}

          <div class="post-meta">
            <i class="far fa-calendar" aria-hidden="true"></i>
            <span>{{ post.date | date: "%b %-d, %Y" }}</span>
            <span class="dot" aria-hidden="true">•</span>
            <i class="far fa-clock" aria-hidden="true"></i>
            <span>{{ pm.reading_time }} min read</span>
          </div>
        </div>
      </a>
      {%- endfor %}
    </div>
  </section>
  {%- endif %}
  {%- endfor %}

  {%- comment -%} ---- Posts without a topic ---- {%- endcomment -%}
  {%- assign ungrouped = rest | where_exp: "p", "p.categories == empty" %}
  {%- if ungrouped.size > 0 %}
  <section class="blog-section" data-reveal>
    <h2 class="section-heading">Other Notes <span class="section-count">{{ ungrouped.size }}</span></h2>
    <div class="post-grid post-grid-3">
      {%- for post in ungrouped %}
      {%- assign pm = site.data.post_meta[post.url] %}
      <a class="post-card" href="{{ post.url | relative_url }}" data-post-card
         data-categories="{{ pm.categories | join: '|' }}"
         data-title="{{ pm.title | default: post.title | downcase | escape }}">
        <div class="post-card-body">
          <span class="post-category">Note</span>
          <h3 class="post-title">{{ pm.title | default: post.title }}</h3>
          {%- if pm.description %}<p class="post-description">{{ pm.description }}</p>{%- endif %}
          <div class="post-meta">
            <i class="far fa-calendar" aria-hidden="true"></i>
            <span>{{ post.date | date: "%b %-d, %Y" }}</span>
          </div>
        </div>
      </a>
      {%- endfor %}
    </div>
  </section>
  {%- endif %}

  {%- comment -%} ---- Papers (PDF) ---- {%- endcomment -%}
  {%- if paper_count > 0 %}
  <section class="blog-section" data-reveal>
    <h2 class="section-heading">
      Papers
      <span class="section-count">{{ paper_keys.size }}</span>
    </h2>

    <div class="post-grid post-grid-3">
      {%- for item in site.data.post_meta %}
      {%- if item[0] contains '.pdf' %}
      {%- assign key = item[0] %}
      {%- assign paper = item[1] %}
      <a class="post-card post-card-paper" href="{{ key | relative_url }}" data-post-card
         data-categories="{{ paper.categories | join: '|' }}"
         data-title="{{ paper.title | downcase | escape }}">
        <div class="post-card-body">
          <span class="post-category">
            <i class="fas fa-file-pdf" aria-hidden="true"></i> Paper
          </span>
          <h3 class="post-title">{{ paper.title }}</h3>
          <p class="post-description">{{ paper.description }}</p>
          <div class="post-meta">
            <i class="far fa-calendar" aria-hidden="true"></i>
            <span>{{ paper.date | date: "%b %-d, %Y" }}</span>
            <span class="dot" aria-hidden="true">•</span>
            <i class="far fa-clock" aria-hidden="true"></i>
            <span>{{ paper.reading_time }} min read</span>
          </div>
        </div>
      </a>
      {%- endif %}
      {%- endfor %}
    </div>
  </section>
  {%- endif %}

  <p class="filter-empty" id="filter-empty" hidden>
    <i class="fas fa-inbox" aria-hidden="true"></i>
    No posts match this filter yet.
    <button type="button" class="filter-reset" onclick="window.__htApplyFilter('All')">Show all posts</button>
  </p>

</div>
