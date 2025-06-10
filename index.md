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
</style>

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
    <!-- Your existing topic cards here -->
    <div class="link-card">
      <a href="jackknife_method.html">JackKnife Method</a>
      <p>An in-depth explanation and examples of the JackKnife statistical method.</p>
    </div>
    <div class="link-card">
      <a href="Binomial_Calculation_and_Distribution_Example.html">Binomial Distribution</a>
      <p>Calculations and examples related to the Binomial probability distribution.</p>
    </div>
    <!-- Add other topic cards similarly -->
  </div>
</section>

<section>
  <h2>Blog Posts</h2>
  <div class="links-grid">
    <!-- Blog links from your README -->
    <div class="link-card">
      <a href="Symbolic_Derivative_Blog.html">Symbolic Derivative Tool Blog</a>
      <p>Blog about symbolic derivative tool development.</p>
    </div>
    <div class="link-card">
      <a href="KernelDensityEstimation_LinReg_XgBoost.html">Kernel Density Estimation Work</a>
      <p>Work involving kernel density estimation, linear regression, and XGBoost.</p>
    </div>
    <!-- Add more blog posts here if you have -->
  </div>
</section>
