---
layout: home
---

<style>
  body {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1.5rem;
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
    flex-wrap: wrap;
    overflow-x: auto;
  }
  header nav ul li a {
    text-decoration: none;
    color: #007acc;
    font-weight: bold;
    white-space: nowrap;
  }
  header nav ul li a:hover {
    text-decoration: underline;
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  .profile img {
    border-radius: 50%;
    width: 140px;
    height: 140px;
    object-fit: cover;
    border: 2px solid #007acc;
    flex-shrink: 0;
  }
  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  .link-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background-color: #f9f9f9;
    transition: box-shadow 0.3s ease;
  }
  .link-card:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .link-card a {
    text-decoration: none;
    color: #007acc;
    font-weight: bold;
  }
  .link-card p {
    margin: 0.5rem 0 0 0;
    color: #555;
    font-size: 0.9rem;
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
      <p>
        I am a Data Scientist with over 13 years of experience specializing in statistics, machine learning, and big data technologies. 
        My work spans multiple industries including e-commerce, telecommunications, banking, travel, and aviation. 
        I excel at transforming complex business challenges into actionable data-driven solutions by leveraging advanced analytics and machine learning techniques.
      </p>
      <p>
        Throughout my career, I have led teams, developed predictive models, and implemented scalable data pipelines. 
        I am passionate about continuous learning and applying innovative methods to solve real-world problems.
      </p>
    </div>
  </div>

  <section>
    <h2>Available Topics & Projects</h2>
    <div class="links-grid">
      <div class="link-card">
        <a href="jackknife_method.html">JackKnife Method</a>
        <p>An in-depth explanation and examples of the JackKnife statistical method.</p>
      </div>
      <div class="link-card">
        <a href="Binomial_Calculation_and_Distribution_Example.html">Binomial Distribution</a>
        <p>Calculations and examples related to the Binomial probability distribution.</p>
      </div>
      <div class="link-card">
        <a href="hypergeometric_distribution.html">Hypergeometric Distribution</a>
        <p>Details and applications of the Hypergeometric distribution.</p>
      </div>
      <div class="link-card">
        <a href="beta_distribution.html">Beta Distribution</a>
        <p>Overview and examples of the Beta probability distribution.</p>
      </div>
      <div class="link-card">
        <a href="gamma_distribution.html">Gamma Distribution</a>
        <p>Explanation and use cases of the Gamma distribution.</p>
      </div>
      <div class="link-card">
        <a href="normal_distribution.html">Normal Distribution</a>
        <p>Fundamentals and examples of the Normal (Gaussian) distribution.</p>
      </div>
      <div class="link-card">
        <a href="beta_prior.html">Beta Prior Binomial Data</a>
        <p>Bayesian analysis using Beta prior for Binomial data.</p>
      </div>
      <div class="link-card">
        <a href="shannon_entropy.html">Shannon Entropy</a>
        <p>Concepts and properties of Shannon entropy in information theory.</p>
      </div>
      <div class="link-card">
        <a href="asymptotic_feature_of_shannon_entropy.html">Asymptotic Feature of Shannon Entropy</a>
        <p>Advanced properties and asymptotic behavior of Shannon entropy.</p>
      </div>
      <div class="link-card">
        <a href="reaching_best_entropy.html">Reaching Best Entropy</a>
        <p>Methods and proofs related to maximizing entropy.</p>
      </div>
      <div class="link-card">
        <a href="connection_between_different_entropies.html">Connection Between Different Entropies</a>
        <p>Exploring relationships among various entropy measures.</p>
      </div>
      <div class="link-card">
        <a href="proof_of_maximum_entropy.html">Proof of The Maximum Entropy</a>
        <p>Mathematical proofs using derivatives and Taylor series expansion.</p>
      </div>
      <div class="link-card">
        <a href="attention_mechanism_explained.html">Understanding Attention Mechanism</a>
        <p>Explanation of attention mechanisms in machine learning.</p>
      </div>
      <div class="link-card">
        <a href="proof_of_the_joint_entropy_using_conditonal_entropy.html">Proof of Joint Entropy</a>
        <p>Proofs involving marginal and conditional entropy.</p>
      </div>
      <div class="link-card">
        <a href="maximum-entropy.html">Proof of Maximum Entropy with Python</a>
        <p>Using Lagrange multipliers and derivatives with Python code.</p>
      </div>
      <div class="link-card">
        <a href="Symbolic_Derivative_Blog.html">Symbolic Derivative Tool Blog</a>
        <p>Blog about symbolic derivative tool development.</p>
      </div>
      <div class="link-card">
        <a href="KernelDensityEstimation_LinReg_XgBoost.html">Kernel Density Estimation Work</a>
        <p>Work involving kernel density estimation, linear regression, and XGBoost.</p>
      </div>
    </div>
  </section>
</main>

<footer>
  <p>© 2025 Hincal Topcuoglu. Powered by Jekyll.</p>
</footer>
