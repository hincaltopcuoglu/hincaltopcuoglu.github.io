---
layout: home
title: Home
---

<style>
body {
  font-family: Arial, sans-serif;
  max-width: 980px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  line-height: 1.7;
  color: #333;
  text-align: left;
}

.hero {
  margin: 2rem 0 3rem 0;
}

.hero h1 {
  font-size: 2.4rem;
  margin-bottom: 0.5rem;
}

.hero p {
  font-size: 1.1rem;
  max-width: 760px;
}

.section-block {
  margin: 3rem 0;
}

.section-block h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #111;
}

.section-block p {
  margin-bottom: 1rem;
}

.highlight-box {
  background: #f7fbff;
  border-left: 4px solid #007acc;
  padding: 1rem 1.2rem;
  border-radius: 6px;
  margin: 1.2rem 0;
}

.highlight-box-dark {
  background: #fff8f0;
  border-left: 4px solid #e07b00;
  padding: 1rem 1.2rem;
  border-radius: 6px;
  margin: 1.2rem 0;
}

.case-study-card {
  border: 1px solid #dde8f5;
  border-radius: 10px;
  padding: 1.4rem 1.6rem;
  background: #f7fbff;
  margin: 1.2rem 0;
}

.case-study-card h3 {
  margin-top: 0;
  font-size: 1.2rem;
  color: #007acc;
}

.case-study-card .metrics {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 0.8rem 0;
}

.case-study-card .metric {
  text-align: center;
}

.case-study-card .metric .value {
  font-size: 1.6rem;
  font-weight: bold;
  color: #007acc;
}

.case-study-card .metric .label {
  font-size: 0.85rem;
  color: #555;
}

.metrics-list,
.focus-list,
.link-list {
  padding-left: 1.2rem;
}

.metrics-list li,
.focus-list li,
.link-list li {
  margin-bottom: 0.6rem;
}

.cta-row {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 1.1rem;
  background: #007acc;
  color: #fff !important;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.2s ease;
}

.cta-button:hover {
  background: #005f99;
}

.cta-button.secondary {
  background: #f2f2f2;
  color: #222 !important;
}

.cta-button.secondary:hover {
  background: #e5e5e5;
}

.small-note {
  color: #666;
  font-size: 0.95rem;
}

footer {
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #666;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  text-align: center;
}
</style>

<section id="hero" class="hero">
  <h1>Hincal Topcuoglu</h1>
  <p>
    Data Scientist with 14+ years of experience in statistics, machine learning, and large-scale analytics.
    I help e-commerce, SaaS, and growth teams answer one question:
    <strong>"Which users are worth acting on — and when?"</strong>
  </p>

  <div class="highlight-box-dark">
    <strong>The problem I specialize in:</strong> Most companies wait for "enough data" before making decisions.
    I use behavioral analytics, Bayesian modeling, and predictive scoring to find actionable signals
    even in <strong>cold-start environments</strong> — when traffic is low, data is thin, and traditional A/B testing fails.
  </div>

  <div class="cta-row">
    <a class="cta-button" href="{{ '/cv/' | relative_url }}">View CV</a>
    <a class="cta-button secondary" href="{{ '/blog/' | relative_url }}">Read Blog</a>
    <a class="cta-button secondary" href="https://www.linkedin.com/in/hincal-topcuoglu/">LinkedIn</a>
    <a class="cta-button secondary" href="https://github.com/hincaltopcuoglu">GitHub</a>
  </div>
</section>

<section id="cold-start" class="section-block">
  <h2>The Cold Start Problem in Analytics</h2>
  <p>
    Every new website, product, or campaign starts with the same challenge: <strong>zero data.</strong>
    Classic analytics tools tell you what happened after the fact.
    Traditional models need thousands of conversions before they become useful.
  </p>
  <p>
    But decisions cannot wait. Marketing budgets are burning. Users are leaving.
    And the question — <em>"who should I target right now?"</em> — still has no answer.
  </p>

  <div class="highlight-box">
    <strong>My approach:</strong> Instead of waiting for data to accumulate, I use behavioral signals,
    semantic site analysis, and statistical priors to build predictive systems that work
    from day one — even with X visitors and 0 conversions.
  </div>

  <p>
    This is not a theoretical exercise. It is the exact problem I am solving right now,
    in public, using my own site as the laboratory.
  </p>
</section>

<section id="case-study" class="section-block">
  <h2>Featured Case Study</h2>
  <p>
    A complete behavioral analytics pipeline built on a high-fidelity synthetic GA4 dataset
    representing 25,000 sessions from a fashion e-commerce store.
  </p>

  <div class="case-study-card">
    <h3>Beyond Dashboards: Behavioral Predictive Modeling for E-Commerce</h3>
    <div class="metrics">
      <div class="metric">
        <div class="value">3.27x</div>
        <div class="label">Conversion Lift (Top 10%)</div>
      </div>
      <div class="metric">
        <div class="value">0.87</div>
        <div class="label">ROC-AUC Score</div>
      </div>
      <div class="metric">
        <div class="value">6</div>
        <div class="label">Behavioral Segments</div>
      </div>
      <div class="metric">
        <div class="value">$46K+</div>
        <div class="label">Est. Monthly Revenue Lift</div>
      </div>
    </div>
    <p>
      Two-model propensity architecture (full-session + pre-checkout),
      K-Means behavioral segmentation, and segment-specific business recommendations.
    </p>
    <a class="cta-button" href="{{ '/blog/beyond-dashboards-behavioral-predictive-modeling' | relative_url }}">Read the Full Case Study →</a>
  </div>
</section>

<section id="about" class="section-block">
  <h2>About</h2>
  <p>
    My background is rooted in statistics, machine learning, and data-driven decision systems.
    Over the years, I have built predictive models, designed analytical frameworks, led teams,
    and developed scalable data solutions across e-commerce, telecommunications, banking, travel, and aviation.
  </p>
  <p>
    I enjoy solving real-world problems where data science creates a clear business impact:
    improving conversion, reducing churn, optimizing marketing efficiency, and supporting better strategic decisions.
  </p>
</section>

<section id="expertise" class="section-block">
  <h2>What I Work On</h2>
  <ul class="focus-list">
    <li>Behavioral propensity modeling and real-time session scoring</li>
    <li>Cold start analytics — predictive systems for low-data environments</li>
    <li>Customer segmentation, retention modeling, and churn prediction</li>
    <li>Conversion rate optimization using machine learning</li>
    <li>Marketing analytics, attribution, and performance measurement</li>
    <li>Statistical experimentation and Bayesian inference</li>
    <li>Scalable data pipelines and BigQuery / GA4 analytics workflows</li>
  </ul>
</section>

<section id="impact" class="section-block">
  <h2>How I Think About Impact</h2>
  <p>
    I focus on building solutions that do more than generate dashboards.
    My approach connects statistical rigor with business outcomes:
    identifying what matters, modeling it correctly, and turning results into action.
  </p>

  <div class="highlight-box">
    <strong>Typical questions I like solving:</strong>
    <ul class="metrics-list">
      <li>Which users are most likely to convert — before they reach checkout?</li>
      <li>Which customers are at risk of churn — before they cancel?</li>
      <li>Which campaigns create real value rather than noisy traffic?</li>
      <li>How do you build a predictive model when you have almost no data yet?</li>
    </ul>
  </div>
</section>

<section id="blog-highlights" class="section-block">
  <h2>Writing & Technical Notes</h2>
  <p>
    I write about statistics, machine learning, information theory, and applied analytics.
    Some posts are deeply theoretical. Others are practical walkthroughs with code.
    All of them reflect how I actually think about problems.
  </p>

  <div class="cta-row">
    <a class="cta-button secondary" href="{{ '/blog/' | relative_url }}">Explore All Posts</a>
  </div>

  <p class="small-note">
    Topics include: entropy, probability distributions, kernel methods, regression,
    clustering, LLM internals, behavioral modeling, and conversion analytics.
  </p>
</section>

<section id="profiles" class="section-block">
  <h2>Profiles</h2>
  <ul class="link-list">
    <li><a href="https://github.com/hincaltopcuoglu">GitHub</a></li>
    <li><a href="https://www.linkedin.com/in/hincal-topcuoglu/">LinkedIn</a></li>
    <li><a href="https://x.com/hincaltopcuogl1">X / Twitter</a></li>
  </ul>
</section>

<section id="contact-intent" class="section-block">
  <h2>Start Here</h2>
  <p>
    If you want to understand my background, start with the CV.
    If you want to see how I think technically, explore the blog.
    If you are working on a conversion, retention, or cold start analytics problem
    and want to connect — LinkedIn is the best place to reach me.
  </p>

  <div class="cta-row">
    <a class="cta-button" href="{{ '/cv/' | relative_url }}">Open CV</a>
    <a class="cta-button secondary" href="{{ '/blog/' | relative_url }}">Open Blog</a>
    <a class="cta-button secondary" href="https://www.linkedin.com/in/hincal-topcuoglu/">Connect on LinkedIn</a>
  </div>
</section>
