---
layout: default
title: Home
permalink: /
---

{%- assign posts = site.posts | sort: "date" | reverse -%}
{%- assign featured = posts | where: "featured", true | first -%}
{%- assign stats = site.data.post_meta | size -%}

<div class="home-page">

  <!-- ============ HERO ============ -->
  <section class="hero">
    <div class="hero-content">
      <p class="hero-eyebrow">
        <span class="hero-dot" aria-hidden="true"></span>
        Data Scientist · Istanbul
      </p>

      <h1 class="hero-title">
        Finding signal<br />
        <span class="hero-accent">before the data arrives.</span>
      </h1>

      <p class="hero-lead">
        I'm <strong>Hincal Topcuoglu</strong> — a data scientist with 14 years of experience in
        statistics, machine learning and large-scale analytics. I help e-commerce, SaaS and
        growth teams answer one question:
        <em>which users are worth acting on, and when?</em>
      </p>

      <div class="hero-actions">
        <a class="cta-button" href="{{ '/blog/' | relative_url }}">
          Read the blog <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </a>
        <a class="cta-button secondary" href="{{ '/cv/' | relative_url }}">View CV</a>
        <a class="cta-button ghost" href="https://www.linkedin.com/in/hincal-topcuoglu/">
          <i class="fab fa-linkedin" aria-hidden="true"></i> LinkedIn
        </a>
      </div>

      <ul class="hero-metrics">
        <li>
          <span class="hero-metric-value" data-count-to="14" data-suffix="+">0</span>
          <span class="hero-metric-label">Years in data science</span>
        </li>
        <li>
          <span class="hero-metric-value" data-count-to="{{ stats }}">0</span>
          <span class="hero-metric-label">Published posts</span>
        </li>
        <li>
          <span class="hero-metric-value" data-count-to="6" data-suffix="">0</span>
          <span class="hero-metric-label">Sectors shipped in</span>
        </li>
      </ul>
    </div>

    <div class="hero-visual" aria-hidden="true">
      <div class="hero-card hero-card-main">
        <div class="hero-card-head">
          <span class="hero-card-dot" style="background:#ef4444"></span>
          <span class="hero-card-dot" style="background:#f59e0b"></span>
          <span class="hero-card-dot" style="background:#10b981"></span>
          <span class="hero-card-title">propensity_model.py</span>
        </div>
        <pre class="hero-code"><code><span class="c-kw">from</span> sklearn.ensemble <span class="c-kw">import</span> RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=<span class="c-num">200</span>,
    max_depth=<span class="c-num">8</span>,
    class_weight=<span class="c-str">"balanced"</span>
)

<span class="c-cm"># Score every session, cold-start included</span>
model.fit(X_train, y_train)
scores = model.predict_proba(X_all)[:, <span class="c-num">1</span>]

<span class="c-fn">print</span>(<span class="c-str">f"Top 10% lift: {lift:.2f}x"</span>)</code></pre>
      </div>

      <div class="hero-card hero-card-stat">
        <span class="hero-card-label">Conversion lift</span>
        <span class="hero-card-value" data-count-to="3.27" data-suffix="x">0</span>
        <span class="hero-card-sub">top-10% propensity group</span>
      </div>

      <div class="hero-card hero-card-stat hero-card-alt">
        <span class="hero-card-label">ROC-AUC</span>
        <span class="hero-card-value" data-count-to="0.87" data-prefix="" data-suffix="">0</span>
        <span class="hero-card-sub">behavioral propensity model</span>
      </div>
    </div>
  </section>

  <!-- ============ COLD START ============ -->
  <section class="home-section" data-reveal>
    <div class="section-intro">
      <span class="section-kicker">The core problem</span>
      <h2 class="section-title">The cold start problem in analytics</h2>
      <p class="section-lead">
        Every new website, product or campaign starts with the same handicap: <strong>zero data.</strong>
        Classic analytics tell you what already happened. Traditional models need thousands of
        conversions before they become useful.
      </p>
    </div>

    <div class="cold-start-grid">
      <div class="cold-start-card">
        <div class="cold-start-icon cold-start-icon-warn">
          <i class="fas fa-hourglass-half" aria-hidden="true"></i>
        </div>
        <h3>Waiting for data</h3>
        <p>Marketing budgets burn while users leave. The question — <em>who should I target right now?</em> — still has no answer.</p>
      </div>

      <div class="cold-start-card cold-start-card-active">
        <div class="cold-start-icon cold-start-icon-ok">
          <i class="fas fa-bolt" aria-hidden="true"></i>
        </div>
        <h3>Predicting anyway</h3>
        <p>Behavioral signals, semantic site analysis and statistical priors build predictive systems that work from day one — even with zero conversions.</p>
      </div>

      <div class="cold-start-card">
        <div class="cold-start-icon cold-start-icon-plain">
          <i class="fas fa-flask" aria-hidden="true"></i>
        </div>
        <h3>Proving it publicly</h3>
        <p>This isn't theoretical. It's the exact problem I'm solving right now, using this site as the laboratory.</p>
      </div>
    </div>
  </section>

  <!-- ============ CASE STUDY ============ -->
  <section class="home-section" data-reveal>
    <div class="section-intro">
      <span class="section-kicker">Featured case study</span>
      <h2 class="section-title">Beyond dashboards</h2>
      <p class="section-lead">
        A complete behavioral analytics pipeline built on a high-fidelity synthetic GA4 dataset
        representing 25,000 sessions from a fashion e-commerce store.
      </p>
    </div>

    <div class="case-study">
      <div class="case-study-metrics">
        <div class="metric">
          <span class="metric-value" data-count-to="3.27" data-suffix="x">0</span>
          <span class="metric-label">Conversion lift (top 10%)</span>
        </div>
        <div class="metric">
          <span class="metric-value" data-count-to="0.87">0</span>
          <span class="metric-label">ROC-AUC score</span>
        </div>
        <div class="metric">
          <span class="metric-value" data-count-to="6">0</span>
          <span class="metric-label">Behavioral segments</span>
        </div>
        <div class="metric">
          <span class="metric-value" data-count-to="46" data-prefix="$" data-suffix="K+">0</span>
          <span class="metric-label">Est. monthly revenue lift</span>
        </div>
      </div>

      <p class="case-study-text">
        Two-model propensity architecture (full-session + pre-checkout), K-Means behavioral
        segmentation, and segment-specific business recommendations.
      </p>

      <a class="cta-button" href="{{ '/blog/beyond-dashboards-behavioral-predictive-modeling.html' | relative_url }}">
        Read the full case study <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>
  </section>

  <!-- ============ EXPERTISE ============ -->
  <section class="home-section" data-reveal>
    <div class="section-intro">
      <span class="section-kicker">What I work on</span>
      <h2 class="section-title">Where I add leverage</h2>
    </div>

    <div class="expertise-grid">
      {%- for area in site.data.expertise %}
      <div class="expertise-card">
        <i class="{{ area.icon }} expertise-icon" aria-hidden="true"></i>
        <h3>{{ area.title }}</h3>
        <p>{{ area.body }}</p>
      </div>
      {%- endfor %}
    </div>
  </section>

  <!-- ============ RECENT POSTS ============ -->
  <section class="home-section" data-reveal>
    <div class="section-intro section-intro-row">
      <div>
        <span class="section-kicker">Latest writing</span>
        <h2 class="section-title">Recent posts</h2>
      </div>
      <a class="text-link" href="{{ '/blog/' | relative_url }}">
        All {{ posts.size }} posts <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>

    <div class="recent-posts">
      {%- for post in posts limit: 6 %}
      {%- assign pm = site.data.post_meta[post.url] %}
      <a class="recent-post" href="{{ post.url | relative_url }}">
        <div class="recent-post-head">
          {%- if pm.categories and pm.categories.size > 0 %}
          <span class="post-category">{{ pm.categories | first }}</span>
          {%- endif %}
          <span class="recent-post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
        </div>
        <h3 class="recent-post-title">{{ pm.title | default: post.title }}</h3>
        {%- if pm.description %}
        <p class="recent-post-desc">{{ pm.description }}</p>
        {%- endif %}
        <span class="recent-post-cta">Read <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
      </a>
      {%- endfor %}
    </div>
  </section>

  <!-- ============ ABOUT ============ -->
  <section class="home-section" data-reveal>
    <div class="about-grid">
      <div class="about-photo">
        <img src="{{ '/assets/images/Hincal_Photo_GitHub_Ready.jpg' | relative_url }}"
             alt="Hincal Topcuoglu" width="400" height="400" loading="lazy" decoding="async" />
      </div>
      <div class="about-content">
        <span class="section-kicker">About</span>
        <h2 class="section-title">Background</h2>
        <p>
          My work is rooted in statistics, machine learning and data-driven decision systems.
          Over the years I've built predictive models, designed analytical frameworks, led teams,
          and developed scalable data solutions across e-commerce, telecommunications, banking,
          travel and aviation.
        </p>
        <p>
          I enjoy solving real problems where data science creates measurable business impact:
          improving conversion, reducing churn, optimizing marketing efficiency, and supporting
          better strategic decisions.
        </p>

        <div class="about-details">
          <div class="about-detail">
            <span class="about-detail-label">Focus</span>
            <span class="about-detail-value">Behavioral modeling &amp; cold start analytics</span>
          </div>
          <div class="about-detail">
            <span class="about-detail-label">Education</span>
            <span class="about-detail-value">PhD Statistics, Yildiz Technical University</span>
          </div>
          <div class="about-detail">
            <span class="about-detail-label">Stack</span>
            <span class="about-detail-value">Python, R, SQL, Spark, Docker, AWS, GCP</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ CTA ============ -->
  <section class="home-section home-cta" data-reveal>
    <div class="home-cta-inner">
      <h2 class="home-cta-title">Working on a conversion, retention or cold-start problem?</h2>
      <p class="home-cta-text">
        Start with the CV for background, the blog for how I think technically,
        or reach out on LinkedIn.
      </p>
      <div class="hero-actions">
        <a class="cta-button" href="https://www.linkedin.com/in/hincal-topcuoglu/">
          <i class="fab fa-linkedin" aria-hidden="true"></i> Connect on LinkedIn
        </a>
        <a class="cta-button secondary" href="mailto:{{ site.email }}">Send an email</a>
      </div>
    </div>
  </section>

</div>
