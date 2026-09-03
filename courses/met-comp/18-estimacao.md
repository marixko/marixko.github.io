---
title: "1.18 - Estimation methods"
course: met-comp
---

## Estimation methods

The previous lectures used specific estimators ($$\bar X$$ for the mean,
$$S^{2}$$ for the variance, least squares for regression) without explaining
where they come from. This lecture presents the three general methods that
produce estimators: moments, maximum likelihood and least squares.

### Contents

- Method of moments
- Maximum likelihood method
- Properties of maximum likelihood
- Least squares method
- Comparison between the methods

## Method of moments

The simplest. If the model has $$k$$ parameters, the first $$k$$ theoretical
moments are written as functions of them,

$$
\mu_r'(\theta)=\mathbb{E}_\theta[X^{r}],\qquad r=1,\ldots,k,
$$

set equal to the sample moments $$m_r'=\frac{1}{n}\sum_i X_i^{r}$$ and the
system is solved for $$\theta$$. For example, for
$$X\sim\text{Gamma}(\alpha,\lambda)$$, from $$\mathbb{E}[X]=\alpha/\lambda$$ and
$$\operatorname{Var}(X)=\alpha/\lambda^{2}$$ we get
$$\hat\lambda=\bar X/S^{2}$$ and $$\hat\alpha=\bar X^{2}/S^{2}$$.

The method is easy to apply and the estimators are consistent, but in general
they are **not efficient** and may fall outside the parameter space (for
example, a negative estimated variance).

## Maximum likelihood method

Given the sample $$x_1,\ldots,x_n$$, the **likelihood** is the probability (or
density) of the data seen as a function of $$\theta$$,

$$
\mathcal{L}(\theta)=\prod_{i=1}^{n}f_\theta(x_i),
$$

and the **maximum likelihood estimator** (MLE) is the value that maximizes it:

$$
\hat\theta_{\mathrm{ML}}=\arg\max_{\theta}\ \mathcal{L}(\theta)
=\arg\max_{\theta}\ \ell(\theta),
\qquad
\ell(\theta)=\sum_{i=1}^{n}\log f_\theta(x_i).
$$

We work with the **log-likelihood** $$\ell$$ because it turns the product into
a sum. When $$\ell$$ is differentiable, $$\hat\theta_{\mathrm{ML}}$$ solves the
score equation $$\ell'(\theta)=0$$.

Examples: for $$X_i\sim\mathcal{N}(\mu,\sigma^{2})$$,
$$\hat\mu_{\mathrm{ML}}=\bar X$$ and
$$\hat\sigma^{2}_{\mathrm{ML}}=\frac{1}{n}\sum_i(X_i-\bar X)^{2}$$ (with divisor
$$n$$, hence biased). For $$X_i\sim\text{Bernoulli}(p)$$,
$$\hat p_{\mathrm{ML}}=\bar X$$. For $$X_i\sim\text{Poisson}(\lambda)$$,
$$\hat\lambda_{\mathrm{ML}}=\bar X$$.

## Properties of maximum likelihood

Under regularity conditions, the MLE has optimal properties:

- **invariance**: if $$\hat\theta$$ is the MLE of $$\theta$$, then
  $$g(\hat\theta)$$ is the MLE of $$g(\theta)$$;
- **consistency**: $$\hat\theta_{\mathrm{ML}}\xrightarrow{P}\theta$$;
- **asymptotic normality and efficiency**:

$$
\sqrt{n}\,(\hat\theta_{\mathrm{ML}}-\theta)\ \xrightarrow{d}\ \mathcal{N}\!\big(0,\ I(\theta)^{-1}\big),
$$

where $$I(\theta)$$ is the Fisher information of one observation (lecture 1.11).
The MLE attains the Cramér-Rao bound in the limit, and $$I(\hat\theta)^{-1}/n$$
provides the approximate standard errors.

When there is no closed-form solution, $$\ell$$ is maximized numerically
(Newton, BFGS) or by the EM algorithm if there are latent variables.

## Least squares method

When the interest is the **conditional mean** $$\mathbb{E}[Y\mid x]=g(x;\theta)$$
and not the whole distribution, $$\theta$$ is estimated by minimizing the
residual sum of squares,

$$
\hat\theta_{\mathrm{LS}}=\arg\min_{\theta}\ \sum_{i=1}^{n}\big(y_i-g(x_i;\theta)\big)^{2}.
$$

It does not require specifying the error distribution, only
$$\mathbb{E}[\varepsilon\mid x]=0$$. Under Gaussian noise with constant
variance, least squares **coincides** with maximum likelihood, and the
Gauss-Markov theorem guarantees that, in linear regression, it is the linear
unbiased estimator with smallest variance.

## Comparison between the methods

| Method | Needs the distribution? | Efficiency | Cost |
| --- | --- | --- | --- |
| Moments | no | low | trivial |
| Maximum likelihood | yes | optimal (asymptotic) | may require numerical optimization |
| Least squares | no (only the conditional mean) | optimal under homoscedastic Gaussian error | closed form in the linear case |

In practice, maximum likelihood is the standard method when the probabilistic
model is known; least squares dominates regression; and moments serve as a
starting point or when the likelihood is intractable.
