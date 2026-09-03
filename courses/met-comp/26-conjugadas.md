---
title: "3.2 - Conjugate families"
course: met-comp
---

## Conjugate families

The practical difficulty of Bayesian inference is computing the posterior
$$p(\theta\mid D)\propto p(D\mid\theta)\,p(\theta)$$, which in general requires
an intractable integral. There is, however, a class of prior + likelihood
combinations for which the posterior comes out in **closed form**, in the same
family as the prior. These are the **conjugate** priors.

### Contents

- The idea of conjugacy
- Beta-Binomial
- Gamma-Poisson
- Normal-Normal
- Interpretation and noninformative priors

## The idea of conjugacy

A prior $$p(\theta)$$ is **conjugate** to a likelihood
$$p(D\mid\theta)$$ if the posterior $$p(\theta\mid D)$$ belongs to the same
parametric family as the prior. In that case, updating with the data amounts to
updating the prior's **hyperparameters** by simple formulas, with no
integration at all.

## Beta-Binomial

For $$X\mid\theta\sim\text{Binomial}(n,\theta)$$, the conjugate prior is the
$$\text{Beta}(\alpha,\beta)$$. Observing $$x$$ successes in $$n$$ trials,

$$
p(\theta\mid x)\ \propto\ \theta^{x}(1-\theta)^{n-x}\cdot\theta^{\alpha-1}(1-\theta)^{\beta-1}
=\theta^{\alpha+x-1}(1-\theta)^{\beta+n-x-1},
$$

that is,

$$
\boxed{
\theta\mid x\ \sim\ \text{Beta}(\alpha+x,\ \beta+n-x).
}
$$

The hyperparameters $$\alpha$$ and $$\beta$$ act as "imaginary successes and
failures" observed before the data. The posterior mean is

$$
\mathbb{E}[\theta\mid x]=\frac{\alpha+x}{\alpha+\beta+n},
$$

a weighted average between the prior mean $$\alpha/(\alpha+\beta)$$ and the
sample proportion $$x/n$$, with increasing weight on the data as $$n$$ grows.

## Gamma-Poisson

For $$X_i\mid\lambda\sim\text{Poisson}(\lambda)$$ i.i.d., the conjugate prior
is the $$\text{Gamma}(\alpha,\beta)$$ (with $$\beta$$ as rate). With
$$s=\sum_i x_i$$ and $$n$$ observations,

$$
\lambda\mid D\ \sim\ \text{Gamma}(\alpha+s,\ \beta+n),
\qquad
\mathbb{E}[\lambda\mid D]=\frac{\alpha+s}{\beta+n}.
$$

## Normal-Normal

For $$X_i\mid\mu\sim\mathcal{N}(\mu,\sigma^{2})$$ with $$\sigma^{2}$$
**known**, the conjugate prior for $$\mu$$ is
$$\mathcal{N}(\mu_0,\tau_0^{2})$$. The posterior is normal, and it is clearer in
terms of **precisions** (the inverse of the variance). With prior precision
$$\tau_0^{-2}$$ and data precision $$n/\sigma^{2}$$,

$$
\mu\mid D\ \sim\ \mathcal{N}\!\left(\mu_n,\ \tau_n^{2}\right),
\qquad
\frac{1}{\tau_n^{2}}=\frac{1}{\tau_0^{2}}+\frac{n}{\sigma^{2}},
$$

$$
\mu_n=\tau_n^{2}\left(\frac{\mu_0}{\tau_0^{2}}+\frac{n\,\bar x}{\sigma^{2}}\right).
$$

The precisions **add up**, and the posterior mean is the average of the means
(prior and data) weighted by the precisions. When $$\sigma^{2}$$ is also
unknown, the joint conjugate prior for $$(\mu,\sigma^{2})$$ is the
Normal-Inverse-Gamma.

## Interpretation and noninformative priors

In all cases, the posterior is the prior "updated" with counts or sums of the
data, and the hyperparameters read as **imaginary data**. Letting those
hyperparameters tend to zero (for example $$\alpha,\beta\to 0$$ in the Beta),
we get **noninformative** priors, which let the data dominate; in those limits,
the posterior mean generally coincides with the maximum likelihood estimator.

Conjugacy is elegant and cheap, but limited: for realistic models, the prior
one wants to use is rarely conjugate, and one turns to the computational
methods of Module 4.
