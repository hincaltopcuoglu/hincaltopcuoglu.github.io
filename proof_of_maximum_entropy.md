---
layout: post
title: "Maximum Entropy with Lagrange Multipliers"
math: true
permalink: /maximum-entropy/
---

## 📘 Maximum Entropy with Lagrange Multipliers

We aim to find the discrete probability distribution \( \{p_i\}_{i=1}^n \) that maximizes entropy under known constraints.

---

### 🔢 Shannon Entropy

We start with Shannon entropy:

$$
H(p) = -\sum_{i=1}^n p_i \log p_i
$$

Subject to two constraints:

- **Normalization**:
$$
\sum_{i=1}^n p_i = 1
$$

- **Expectation (moment) constraint**:
$$
\sum_{i=1}^n p_i x_i = M
$$

---

### 🧮 Step 1: Form the Lagrangian

Introduce Lagrange multipliers \( \lambda \) and \( \theta \):

$$
\mathcal{L}(p_1, \dots, p_n, \lambda, \theta) =
-\sum_{i=1}^n p_i \log p_i
- \lambda \left( \sum_{i=1}^n p_i - 1 \right)
- \theta \left( \sum_{i=1}^n p_i x_i - M \right)
$$

---

### 🧠 Step 2: Take the Derivative

With respect to \( p_i \):

$$
\frac{\partial \mathcal{L}}{\partial p_i} = -\log p_i - 1 - \lambda - \theta x_i = 0
$$

Solving:

$$
p_i = \exp(-1 - \lambda - \theta x_i)
$$

Introduce the partition function:

$$
Z = \sum_{j=1}^n \exp(-\theta x_j)
\quad \Rightarrow \quad
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

We numerically solve the moment constraint to determine the correct value of \( \theta \).

---

## 🐍 Python Implementation

```python
import numpy as np
from scipy.optimize import root_scalar

def max_entropy_vs_random(n=10, M_target=5.5):
    """
    Shows maximum entropy (using Lagrange multipliers) vs
    random entropy of a variable under the same support.
    """
    x = np.arange(1, n + 1)

    # 1. Random Distribution (not optimized)
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

    # 2. Solve for θ in max-entropy formulation
    def moment_constraint(theta):
        exp_terms = np.exp(-theta * x)
        Z = np.sum(exp_terms)
        p = exp_terms / Z
        return np.sum(p * x) - M_target

    sol = root_scalar(moment_constraint, bracket=[-10, 10], method='brentq')
    if not sol.converged:
        raise RuntimeError("Could not solve for θ.")
    theta = sol.root

    exp_terms = np.exp(-theta * x)
    Z = np.sum(exp_terms)
    p_opt = exp_terms / Z
    entropy_opt = -np.sum(p_opt * np.log(p_opt))
    expected_opt = np.sum(p_opt * x)
    C = 1 / Z
    lambda_value = -1 - np.log(C)

    print("📈 Maximum Entropy Distribution:")
    for i, pi in enumerate(p_opt, start=1):
        print(f"  p{i} = {pi:.6f}")
    print(f"  θ = {theta:.6f}")
    print(f"  λ = {lambda_value:.6f}")
    print(f"  ∑p_i = {np.sum(p_opt):.6f}")
    print(f"  ∑p_i * x_i = {expected_opt:.6f} (target M = {M_target})")
    print(f"  Entropy H(p_opt) = {entropy_opt:.6f}")

    # 3. Comparison
    print("\n📊 Entropy Comparison:")
    print(f"  Random Entropy       = {entropy_random:.6f}")
    print(f"  Maximum Entropy      = {entropy_opt:.6f}")
    print(f"  Difference           = {entropy_opt - entropy_random:.6f}")



    ---

## 📌 What Did We Do?

In this blog, we:

✅ Defined the problem of maximizing Shannon entropy  
✅ Formulated it as a constrained optimization using Lagrange multipliers  
✅ Derived the optimal distribution:
$$
p_i = \frac{1}{Z} \exp(-\theta x_i)
$$
✅ Solved for \( \theta \) numerically using Python  
✅ Compared this to a random distribution to show the improvement in entropy

---

## 💡 Why Maximum Entropy Matters

The principle of maximum entropy helps us:

- Model what we know — **and nothing more**
- Avoid overfitting when data is scarce
- Make the most neutral assumption under constraints

### 🧠 It’s used in:

- **Physics**: Boltzmann distribution
- **Machine learning**: MaxEnt models, logistic regression
- **Natural language processing**: Probabilistic language modeling
- **Bayesian inference**: Uninformative priors
- **Signal processing**: Image and audio restoration

---

> Maximum entropy is how we **model uncertainty honestly** — respecting the constraints, and maximizing the unknown.


