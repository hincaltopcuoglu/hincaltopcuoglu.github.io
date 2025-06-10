---
layout: home
---

<style>
  body {
    font-family: Arial, sans-serif;
    max-width: none;
    margin: 2rem 2rem 2rem 0;
    padding: 0 1rem;
    line-height: 1.6;
    color: #333;
    text-align: left;
  }
  header nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid #ddd;
    margin-bottom: 2rem;
  }
  header nav ul li a {
    text-decoration: none;
    color: #007acc;
    font-weight: bold;
  }
  header nav ul li a:hover {
    text-decoration: underline;
  }
  footer {
    margin-top: 3rem;
    font-size: 0.9rem;
    color: #666;
    border-top: 1px solid #ddd;
    padding-top: 1rem;
    text-align: center;
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  .profile img {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    object-fit: cover;
    border: 2px solid #007acc;
  }
  .social-icons a {
    margin-right: 1rem;
    text-decoration: none;
    font-size: 1.5rem;
    color: #007acc;
  }
  .social-icons a:hover {
    color: #005f99;
  }
</style>

<header>
  <nav>
    <ul>
      <li><a href="{{ '/' | relative_url }}">Home</a></li>
      <li><a href="{{ '/cv/' | relative_url }}">CV</a></li>
      <li><a href="{{ '/code.html' | relative_url }}">Code</a></li>
      <li><a href="{{ '/blog.html' | relative_url }}">Blog</a></li>
      <li><a href="{{ '/contact.html' | relative_url }}">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <div class="profile">
    <img src="/assets/images/Hincal_Photo_GitHub_Ready.jpg" alt="Hincal Topcuoglu Photo" />
    <div>
      <h1>Hincal Topcuoglu</h1>
      <p>Data Scientist with 13 years of experience in statistics, machine learning, and big data across e-commerce, banking, telecommunications, and aviation sectors.</p>
      <div class="social-icons">
        <a href="https://github.com/hincaltopcuoglu" aria-label="GitHub" title="GitHub">&#x1F5C3;</a>
        <a href="https://www.linkedin.com/in/hincal-topcuoglu/" aria-label="LinkedIn" title="LinkedIn">&#x1F465;</a>
        <a href="https://x.com/hincaltoocuogl1" aria-label="Twitter" title="Twitter">&#x1F426;</a>
      </div>
    </div>
  </div>

  <section>
    <h2>Navigation</h2>
    <ul>
      <li><a href="{{ '/cv/' | relative_url }}">CV</a></li>
      <li><a href="{{ '/code.html' | relative_url }}">Code</a></li>
      <li><a href="{{ '/blog.html' | relative_url }}">Blog</a></li>
      <li><a href="{{ '/contact.html' | relative_url }}">Contact</a></li>
    </ul>
  </section>

  <section>
    <h2>Selected Topics</h2>
    <ul>
      <li><a href="jackknife_method.html">JackKnife Method</a></li>
      <li><a href="Binomial_Calculation_and_Distribution_Example.html">Binomial Distribution</a></li>
      <li><a href="shannon_entropy.html">Shannon Entropy</a></li>
      <li><a href="attention_mechanism_explained.html">Attention Mechanism Explained</a></li>
    </ul>
  </section>
</main>

<footer>
  <p>© 2025 Hincal Topcuoglu. Powered by Jekyll.</p>
</footer>
