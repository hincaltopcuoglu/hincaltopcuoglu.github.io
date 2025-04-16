
--- 
layout: default 
title: "Maximum Entropy with Lagrange Multipliers" 
math: true 
permalink: /maximum-entropy/ 
---

## 📘 Maximum Entropy with Lagrange Multipliers

We want to find the discrete probability distribution \( \{p_i\}_{i=1}^n \) that maximizes Shannon entropy:

$$
H(p) = -\sum_{i=1}^n p_i \log p_i
$$

Subject to:

- **Normalization:**

$$
\sum_{i=1}^n p_i = 1
$$

- **Expectation constraint:**

$$
\sum_{i=1}^n p_i x_i = M
$$

---

### 🪮 Step 1: Lagrangian Formulation

We define the Lagrangian with multipliers \( \lambda \) and \( \theta \):

$$
\mathcal{L}(p_1, \dots, p_n, \lambda, \theta) =
-\sum_{i=1}^n p_i \log p_i
- \lambda \left( \sum_{i=1}^n p_i - 1 \right)
- \theta \left( \sum_{i=1}^n p_i x_i - M \right)
$$

---

### 🧠 Step 2: Take Derivatives

With respect to \( p_i \):

$$
\frac{\partial \mathcal{L}}{\partial p_i} = -\log p_i - 1 - \lambda - \theta x_i = 0
$$

Solving:

$$
p_i = \exp(-1 - \lambda - \theta x_i)
$$

Use the partition function:

$$
Z = \sum_{j=1}^n \exp(-\theta x_j)
\Rightarrow
p_i = \frac{1}{Z} \exp(-\theta x_i)
$$

---

### ✅ Final Result

$$
\boxed{
  p_i = \frac{1}{Z} \exp(-\theta x_i)
}
\quad \text{where} \quad
Z = \sum_{j=1}^n \exp(-\theta x_j)
$$

We solve for \( \theta \) using:

$$
\sum_{i=1}^n p_i x_i = M
$$

---

## 👉 Python Code Implementation

```python
import numpy as np
from scipy.optimize import root_scalar

def max_entropy_vs_random(n=10, M_target=5.5):
    x = np.arange(1, n + 1)

    # Random distribution
    rand_vals = np.random.rand(n)
    p_random = rand_vals / np.sum(rand_vals)
    entropy_random = -np.sum(p_random * np.log(p_random))
    expected_random = np.sum(p_random * x)

    print("🎲 Random Distribution:")
    for i, pi in enumerate(p_random, start=1):
        print(f"  p{i} = {pi:.6f}")
    print(f"  ∑p_i = {np.sum(p_random):.6f}")
    print(f"  ∑p_i * x_i = {expected_random:.6f}")
    print(f"  Entropy H(p_random) = {entropy_random:.6f}\n")

    # Max entropy distribution
    def constraint(theta):
        exp_terms = np.exp(-theta * x)
        Z = np.sum(exp_terms)
        p = exp_terms / Z
        return np.sum(p * x) - M_target

    sol = root_scalar(constraint, bracket=[-10, 10], method='brentq')
    if not sol.converged:
        raise RuntimeError("Failed to solve for θ")
    theta = sol.root

    exp_terms = np.exp(-theta * x)
    Z = np.sum(exp_terms)
    p_opt = exp_terms / Z
    entropy_opt = -np.sum(p_opt * np.log(p_opt))
    expected_opt = np.sum(p_opt * x)
    C = 1 / Z
    lambda_val = -1 - np.log(C)

    print("📈 Maximum Entropy Distribution:")
    for i, pi in enumerate(p_opt, start=1):
        print(f"  p{i} = {pi:.6f}")
    print(f"  θ = {theta:.6f}")
    print(f"  λ = {lambda_val:.6f}")
    print(f"  ∑p_i = {np.sum(p_opt):.6f}")
    print(f"  ∑p_i * x_i = {expected_opt:.6f} (target M = {M_target})")
    print(f"  Entropy H(p_opt) = {entropy_opt:.6f}")

    print("\n📊 Entropy Comparison:")
    print(f"  Random Entropy       = {entropy_random:.6f}")
    print(f"  Maximum Entropy      = {entropy_opt:.6f}")
    print(f"  Difference           = {entropy_opt - entropy_random:.6f}")
```

---

## 📌 What Did We Do?

- ✅ Defined and formulated the entropy maximization problem
- ✅ Used Lagrange multipliers to impose constraints
- ✅ Derived:
  $$
  p_i = \frac{1}{Z} \exp(-\theta x_i)
  $$
- ✅ Solved for \( \theta \) numerically
- ✅ Compared entropy of random vs optimal distribution

---

## 💡 Why Maximum Entropy Matters

Maximum entropy gives us the **least biased** distribution under known information:

- It respects known constraints (like the mean)
- It assumes nothing more
- It avoids hidden bias and overfitting

### 🧠 Applications

- **Physics**: Boltzmann distribution
- **Machine Learning**: Logistic regression, MaxEnt models
- **Statistics**: Uninformative Bayesian priors
- **NLP & Signal Processing**: Text and image restoration

> Maximum entropy is how we model uncertainty **honestly**, using only what we know.
