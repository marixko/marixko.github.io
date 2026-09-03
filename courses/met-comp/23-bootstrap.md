---
title: "2.3 - Bootstrap and jackknife"
course: met-comp
---

## Bootstrap and jackknife

For $$\bar X$$ we know the standard error is $$\sigma/\sqrt{n}$$. For the
median, a quantile, the correlation coefficient or a ratio of means, the
standard error formula either does not exist in closed form or depends on
strong assumptions. The *bootstrap* estimates the variability of **any**
statistic by resampling the data themselves.

### Contents

- The bootstrap idea
- Bootstrap standard error and bias
- Bootstrap confidence intervals
- The jackknife
- When the bootstrap fails

## The bootstrap idea

Let $$\hat\theta=T(X_1,\ldots,X_n)$$ be any statistic. Its sampling
distribution depends on the population distribution $$F$$, which we do not know.
The *bootstrap* replaces $$F$$ by the **empirical CDF** $$\hat F_n$$ (lecture
1.6), which is the best estimate of $$F$$ we have, and simulates from it:

1. draw, **with replacement**, a sample $$X_1^{*},\ldots,X_n^{*}$$ from the
   original data (this is the same as sampling from $$\hat F_n$$);
2. compute $$\hat\theta^{*}=T(X_1^{*},\ldots,X_n^{*})$$;
3. repeat $$B$$ times, obtaining $$\hat\theta^{*}_1,\ldots,\hat\theta^{*}_B$$.

The dispersion of the $$\hat\theta^{*}_b$$ mimics the dispersion of
$$\hat\theta$$ across real samples from the population.

## Bootstrap standard error and bias

The **standard error** of $$\hat\theta$$ is estimated by the standard deviation
of the replicates:

$$
\widehat{\mathrm{se}}_{\mathrm{boot}}
=
\sqrt{\frac{1}{B-1}\sum_{b=1}^{B}\big(\hat\theta^{*}_b-\bar{\hat\theta^{*}}\big)^{2}}.
$$

The **bias** is estimated by
$$\widehat{\mathrm{bias}}=\bar{\hat\theta^{*}}-\hat\theta$$, the difference
between the mean of the replicates and the original estimate.

## Bootstrap confidence intervals

Three constructions, from the simplest to the most reliable:

- **Percentile**: the $$\alpha/2$$ and $$1-\alpha/2$$ quantiles of the
  distribution of the replicates $$\hat\theta^{*}$$.
- **Basic** (or reverse pivotal):
  $$\big[\,2\hat\theta-q_{1-\alpha/2}^{*},\ 2\hat\theta-q_{\alpha/2}^{*}\,\big]$$,
  where $$q^{*}$$ are the quantiles of the replicates.
- **BCa** (bias-corrected and accelerated): adjusts the percentile quantiles to
  correct for bias and skewness; it is the recommended one in practice.

All of them converge to the classical interval when its assumptions hold, but
they also work when they do not.

## The jackknife

A predecessor of the *bootstrap*, cheaper and deterministic. We compute
$$\hat\theta_{(i)}$$, the statistic with observation $$i$$ **removed**, for
each $$i$$. With the mean $$\bar\theta_{(\cdot)}=\frac{1}{n}\sum_i\hat\theta_{(i)}$$,

$$
\widehat{\mathrm{se}}_{\mathrm{jack}}
=
\sqrt{\frac{n-1}{n}\sum_{i=1}^{n}\big(\hat\theta_{(i)}-\bar\theta_{(\cdot)}\big)^{2}},
$$

$$
\widehat{\mathrm{bias}}_{\mathrm{jack}}=(n-1)\big(\bar\theta_{(\cdot)}-\hat\theta\big).
$$

It requires only $$n$$ recomputations and uses no random numbers, but it fails
for **non-smooth** statistics such as the median, for which the *bootstrap* is
preferable.

## When the bootstrap fails

- **Statistics on the boundary of the support**, such as the sample maximum:
  resampling never produces values larger than the observed one, and the
  bootstrap distribution is biased.
- **Dependent data** (time series, spatial data): simple resampling destroys
  the dependence structure; the block *bootstrap* is used.
- **Very small samples**: $$\hat F_n$$ is a poor approximation of $$F$$.

In these cases, the *bootstrap* can give a false sense of precision, and it is
worth checking against an analytical method or against simulation from the
assumed model.
