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
    I am a Data Scientist with 13+ years of experience in statistics, machine learning, and large-scale analytics.
    I work across e-commerce, telecommunications, banking, travel, and aviation to turn complex business problems into measurable outcomes.
  </p>

  <div class="highlight-box">
    <strong>Current focus:</strong> conversion modeling, customer analytics, predictive modeling, and applied machine learning for business growth.
  </div>

  <div class="cta-row">
    <a class="cta-button" href="{{ '/cv/' | relative_url }}">View CV</a>
    <a class="cta-button secondary" href="{{ '/blog/' | relative_url }}">Read Blog</a>
    <a class="cta-button secondary" href="https://www.linkedin.com/in/hincal-topcuoglu/">LinkedIn</a>
    <a class="cta-button secondary" href="https://github.com/hincaltopcuoglu">GitHub</a>
  </div>
</section>

<section id="about" class="section-block">
  <h2>About</h2>
  <p>
    My background is rooted in statistics, machine learning, and data-driven decision systems.
    Over the years, I have built predictive models, designed analytical frameworks, led teams, and developed scalable data solutions for multiple industries.
  </p>
  <p>
    I enjoy solving real-world problems where data science can create a clear business impact:
    improving conversion, reducing churn, optimizing marketing efficiency, and supporting better strategic decisions.
  </p>
</section>

<section id="expertise" class="section-block">
  <h2>What I Work On</h2>
  <ul class="focus-list">
    <li>Predictive modeling and machine learning</li>
    <li>Statistical analysis and experimentation</li>
    <li>Customer analytics, segmentation, and retention</li>
    <li>Conversion optimization and behavioral modeling</li>
    <li>Marketing analytics and performance measurement</li>
    <li>Scalable data pipelines and analytics workflows</li>
  </ul>
</section>

<section id="impact" class="section-block">
  <h2>How I Think About Impact</h2>
  <p>
    I focus on building solutions that do more than generate dashboards.
    My approach is to connect statistical rigor with business outcomes:
    identifying what matters, modeling it correctly, and turning results into action.
  </p>

  <div class="highlight-box">
    <strong>Typical questions I like solving:</strong>
    <ul class="metrics-list">
      <li>Which users are most likely to convert?</li>
      <li>Which customers are at risk of churn?</li>
      <li>Which campaigns create real value rather than noisy traffic?</li>
      <li>How can data be turned into measurable business decisions?</li>
    </ul>
  </div>
</section>

<section id="blog-highlights" class="section-block">
  <h2>Writing & Technical Notes</h2>
  <p>
    I regularly write about statistics, probability, machine learning, information theory, and analytical methods.
    These articles reflect both theoretical depth and practical curiosity.
  </p>

  <div class="cta-row">
    <a class="cta-button secondary" href="{{ '/blog/' | relative_url }}">Explore Blog Posts</a>
  </div>

  <p class="small-note">
    The blog includes notes on entropy, distributions, kernel methods, regression, clustering, and machine learning concepts.
  </p>
</section>

<section id="profiles" class="section-block">
  <h2>Profiles</h2>
  <ul class="link-list">
    <li><a href="https://github.com/hincaltopcuoglu">GitHub</a></li>
    <li><a href="https://www.linkedin.com/in/hincal-topcuoglu/">LinkedIn</a></li>
    <li><a href="https://x.com/hincaltopcuogl1">X</a></li>
  </ul>
</section>

<section id="contact-intent" class="section-block">
  <h2>Start Here</h2>
  <p>
    If you want to understand my background, start with the CV.
    If you want to see how I think technically, explore the blog.
    If you want to connect professionally, LinkedIn is the best place to reach me.
  </p>

  <div class="cta-row">
    <a class="cta-button" href="{{ '/cv/' | relative_url }}">Open CV</a>
    <a class="cta-button secondary" href="{{ '/blog/' | relative_url }}">Open Blog</a>
    <a class="cta-button secondary" href="https://www.linkedin.com/in/hincal-topcuoglu/">Connect on LinkedIn</a>
  </div>
</section>
