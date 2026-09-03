---
title: "2.2 - Monte Carlo method"
course: met-comp
---

## Monte Carlo method

The Monte Carlo method replaces a hard computation (an integral, an
expectation, a probability) with an **average over random samples**. It is the
central idea of computational statistics, and the law of large numbers
guarantees that it works.

### Contents

- Estimating expectations and integrals
- The Monte Carlo error
- Estimating probabilities
- Importance sampling
- Uncertainty propagation

## Estimating expectations and integrals

We want to compute

$$
\theta=\mathbb{E}_f[h(X)]=\int h(x)\,f(x)\,dx.
$$

If we can sample from $$f$$, we generate $$X_1,\ldots,X_n$$ independent and use
the average

$$
\hat\theta_n=\frac{1}{n}\sum_{i=1}^{n}h(X_i).
$$

By the law of large numbers, $$\hat\theta_n\xrightarrow{P}\theta$$, and the
estimator is unbiased: $$\mathbb{E}[\hat\theta_n]=\theta$$.

Any integral $$\int_a^b g(x)\,dx$$ becomes an expectation by choosing a
convenient $$f$$. For example, with $$X\sim\text{Uniform}(a,b)$$,

$$
\int_a^b g(x)\,dx=(b-a)\,\mathbb{E}[g(X)]\approx\frac{b-a}{n}\sum_{i=1}^{n}g(X_i).
$$

## The Monte Carlo error

By the central limit theorem,

$$
\hat\theta_n\approx\mathcal{N}\!\left(\theta,\ \frac{\sigma_h^{2}}{n}\right),
\qquad
\sigma_h^{2}=\operatorname{Var}_f\big[h(X)\big],
$$

so that the **Monte Carlo standard error** is

$$
\mathrm{se}(\hat\theta_n)=\frac{\hat\sigma_h}{\sqrt{n}},
\qquad
\hat\sigma_h^{2}=\frac{1}{n-1}\sum_{i=1}^{n}\big(h(X_i)-\hat\theta_n\big)^{2}.
$$

Two important consequences: the error decreases as $$1/\sqrt{n}$$, so reducing
it by a factor of $$10$$ requires $$100$$ times more samples; and the
$$1/\sqrt{n}$$ rate **does not depend on the dimension** of $$x$$, which makes
Monte Carlo unbeatable for integrals in many dimensions, where deterministic
quadrature methods fail.

## Estimating probabilities

A probability is the expectation of an indicator:

$$
p=P(X\in A)=\mathbb{E}\big[\mathbf{1}(X\in A)\big]\approx\frac{1}{n}\sum_{i=1}^{n}\mathbf{1}(X_i\in A).
$$

Since $$n\hat p\sim\text{Binomial}(n,p)$$, the standard error is
$$\sqrt{\hat p(1-\hat p)/n}$$. For **rare** events ($$p$$ tiny), the estimate
is poor (almost no sample falls in $$A$$), and importance sampling is used.

## Importance sampling

Instead of sampling from $$f$$, we sample from another density $$g$$ and
correct by the weight $$w(x)=f(x)/g(x)$$:

$$
\theta=\mathbb{E}_f[h(X)]=\mathbb{E}_g\!\left[h(X)\,\frac{f(X)}{g(X)}\right]
\approx\frac{1}{n}\sum_{i=1}^{n}h(X_i)\,w(X_i),
\qquad X_i\sim g.
$$

Choosing $$g$$ concentrated where $$h\,f$$ is large (for example, in the region
$$A$$ of a rare event), the variance of the estimator drops sharply. A poor
choice of $$g$$, on the contrary, can give infinite variance.

## Uncertainty propagation

Given a model $$Y=h(X_1,\ldots,X_k)$$ and distributions (or uncertainties) for
the inputs, Monte Carlo estimates the distribution of $$Y$$ directly: the
inputs are sampled, $$Y$$ is computed for each set, and the resulting sample of
$$Y$$ gives the mean, standard deviation, quantiles and the shape of the
distribution. It is more general and more reliable than the linear error
propagation formula, which only holds for approximately linear functions and
small uncertainties.
