---
title: "6.4 - Gaussian Mixture Models and EM"
course: ml
---

## Gaussian mixture models and EM

The Gaussian mixture model (GMM) is the probabilistic, **soft**-assignment
version of K-means: each point belongs to all groups, with probabilities.
Fitting it by maximum likelihood leads to the **EM** algorithm, the standard
method for models with latent variables.

### Contents

- Latent variable models
- Likelihood and complete likelihood
- Expectation-Maximization
- Local maxima
- Mixture models

### The Gaussian mixture model

The density is a weighted sum of $$K$$ Gaussians:

$$
p(x)=\sum_{k=1}^{K}\pi_k\,\mathcal{N}(x\mid\mu_k,\Sigma_k),
\qquad
\pi_k\ge 0,\quad \sum_{k}\pi_k=1.
$$

Each observation has a **latent** label $$z_i\in\{1,\ldots,K\}$$ with
$$P(z_i=k)=\pi_k$$ and $$x_i\mid z_i=k\sim\mathcal{N}(\mu_k,\Sigma_k)$$. The
$$z_i$$ are not observed.

### Responsibilities

The posterior probability that point $$i$$ belongs to group $$k$$ is the
**responsibility**

$$
\gamma_{ik}=P(z_i=k\mid x_i)
=
\frac{\pi_k\,\mathcal{N}(x_i\mid\mu_k,\Sigma_k)}{\sum_{l=1}^{K}\pi_l\,\mathcal{N}(x_i\mid\mu_l,\Sigma_l)}.
$$

It is the soft assignment: $$\gamma_{ik}\in[0,1]$$ and
$$\sum_k\gamma_{ik}=1$$.

### Why the likelihood is hard

The data log-likelihood is

$$
\ell(\theta)=\sum_{i=1}^{n}\log\sum_{k=1}^{K}\pi_k\,\mathcal{N}(x_i\mid\mu_k,\Sigma_k).
$$

The logarithm of a sum does not separate, and $$\ell$$ is not concave. If the
labels $$z_i$$ were known, the **complete likelihood**
$$\log p(X,Z\mid\theta)$$ would separate into simple Gaussian terms, one per
group, with a closed-form solution. EM exploits exactly this.

### Expectation-Maximization

EM maximizes a lower bound on $$\ell(\theta)$$. For any distribution $$q(z)$$
over the labels,

$$
\ell(\theta)\ \ge\ \mathbb{E}_{q}\big[\log p(X,Z\mid\theta)\big]+H(q),
$$

and equality holds when $$q(z)=p(z\mid X,\theta)$$. The algorithm alternates:

**E step** (fixing $$\theta^{\mathrm{old}}$$): compute
$$q(z)=p(z\mid X,\theta^{\mathrm{old}})$$, that is, the responsibilities
$$\gamma_{ik}$$. This makes the bound tight.

**M step** (fixing $$q$$): maximize the expected value of the complete
likelihood,

$$
\theta^{\mathrm{new}}=\arg\max_{\theta}\ \mathbb{E}_{q}\big[\log p(X,Z\mid\theta)\big],
$$

which for the GMM has closed form, a Gaussian MLE weighted by the
responsibilities:

$$
\pi_k=\frac{1}{n}\sum_{i}\gamma_{ik},
\qquad
\mu_k=\frac{\sum_i\gamma_{ik}\,x_i}{\sum_i\gamma_{ik}},
\qquad
\Sigma_k=\frac{\sum_i\gamma_{ik}\,(x_i-\mu_k)(x_i-\mu_k)^{\top}}{\sum_i\gamma_{ik}}.
$$

### Convergence and local maxima

Each EM iteration **does not decrease** $$\ell(\theta)$$, and the algorithm
converges to a local maximum or saddle point. As in K-means, the result depends
on the initialization (it is common to initialize with K-means itself). K-means
is the limit of EM for a GMM with $$\Sigma_k=\varepsilon I$$,
$$\varepsilon\to 0$$, and responsibilities that become hard assignments.

### Practical care

- **Singularities**: a component can collapse onto a single point,
  $$\Sigma_k\to 0$$ and $$\ell\to\infty$$. This is regularized by adding a small
  value to the diagonal of $$\Sigma_k$$.
- **Choice of $$K$$** by BIC, AIC or validation.
- **Label switching**: the groups do not have a fixed identity across runs.

EM is general: the same E-M scheme fits PPCA, hidden Markov models and any
latent variable model with a tractable complete likelihood.
