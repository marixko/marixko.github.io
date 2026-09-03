---
title: "1.11 - Inference: CLT and estimator properties"
course: met-comp
---

## Statistical inference

Lecture 1.2 introduced the idea of inference. Now, with probability, random
variables and distributions already built, we formalize the problem: use a
sample to say something about an unknown parameter, and assess how well each
method does it.

### Contents

- Population, sample and parameter
- Statistic, estimator and estimate
- Sampling distribution
- Central limit theorem
- Bias, variance and mean squared error
- Consistency
- Efficiency and Fisher information

## Population, sample and parameter

The **population** is described by a distribution $$F_\theta$$ (or density
$$f_\theta$$) that depends on one or more unknown parameters $$\theta$$. A
**simple random sample** of size $$n$$ is a set $$X_1,\ldots,X_n$$ of
independent and identically distributed variables from $$F_\theta$$. The goal
of inference is to use $$X_1,\ldots,X_n$$ to learn about $$\theta$$, whether by
**point estimation**, **interval estimation** or **hypothesis testing**.

## Statistic, estimator and estimate

A **statistic** is any function of the sample, $$T=T(X_1,\ldots,X_n)$$, that
does not depend on $$\theta$$. An **estimator** of $$\theta$$ is a statistic
$$\hat\theta=\hat\theta(X_1,\ldots,X_n)$$ used to approximate $$\theta$$; being
a function of random variables, it is itself a random variable. The
**estimate** is the numerical value that $$\hat\theta$$ takes on a concrete
sample.

The central examples:

$$
\bar X=\frac{1}{n}\sum_{i=1}^{n}X_i
\quad\text{for}\quad\mu,
\qquad
S^{2}=\frac{1}{n-1}\sum_{i=1}^{n}(X_i-\bar X)^{2}
\quad\text{for}\quad\sigma^{2}.
$$

## Sampling distribution

Since $$\hat\theta$$ is a random variable, it has a distribution, called the
**sampling distribution**, which describes how the estimate varies from sample
to sample. For the sample mean of an i.i.d. sample,

$$
\mathbb{E}[\bar X]=\mu,
\qquad
\operatorname{Var}(\bar X)=\frac{\sigma^{2}}{n},
$$

so that the **standard error** of $$\bar X$$ is $$\sigma/\sqrt{n}$$: precision
improves, but only with the root of $$n$$. If the population is normal, the
results are exact:

$$
\bar X\sim\mathcal{N}\!\left(\mu,\frac{\sigma^{2}}{n}\right),
\qquad
\frac{(n-1)S^{2}}{\sigma^{2}}\sim\chi^{2}_{n-1},
\qquad
\frac{\bar X-\mu}{S/\sqrt{n}}\sim t_{n-1}.
$$

## Central limit theorem

When the population is **not** normal, the sampling distribution of $$\bar X$$
can still be approximated, and the reason is the central limit theorem (CLT).

**Statement.** If $$X_1,\ldots,X_n$$ are i.i.d. with mean $$\mu$$ and finite
variance $$\sigma^{2}$$, then

$$
\boxed{
\frac{\bar X_n-\mu}{\sigma/\sqrt{n}}\ \xrightarrow{\ d\ }\ \mathcal{N}(0,1)
\qquad (n\to\infty),
}
$$

that is, for large $$n$$, $$\bar X_n\approx\mathcal{N}(\mu,\sigma^{2}/n)$$,
**whatever** the shape of the underlying distribution. Equivalently, the sum
satisfies $$\sum_i X_i\approx\mathcal{N}(n\mu,\,n\sigma^{2})$$.

The speed of the approximation depends on how skewed the underlying
distribution is: for already symmetric distributions, small $$n$$ is enough;
for very skewed ones, larger $$n$$ is needed. The usual rule of thumb is
$$n\gtrsim 30$$.

The CLT complements the **law of large numbers**: the law says that $$\bar X_n$$
converges to $$\mu$$; the CLT says at what rate ($$1/\sqrt{n}$$) and with what
shape (normal) the fluctuations around $$\mu$$ are distributed. This is why the
normal appears in the sampling distribution of means, proportions and most
estimators.

## Bias, variance and mean squared error

The **bias** of an estimator is

$$
\operatorname{Bias}(\hat\theta)=\mathbb{E}[\hat\theta]-\theta.
$$

The estimator is **unbiased** if $$\mathbb{E}[\hat\theta]=\theta$$ for every
$$\theta$$. The sample mean $$\bar X$$ is unbiased for $$\mu$$, and the sample
variance $$S^{2}$$ with divisor $$n-1$$ is unbiased for $$\sigma^{2}$$; using
the divisor $$n$$ produces a biased estimator.

The overall quality combines bias and dispersion in the **mean squared
error**:

$$
\operatorname{MSE}(\hat\theta)
=
\mathbb{E}\big[(\hat\theta-\theta)^{2}\big]
=
\operatorname{Var}(\hat\theta)+\operatorname{Bias}(\hat\theta)^{2}.
$$

This is the bias-variance decomposition. A practical consequence: a **biased**
estimator can have **smaller** MSE than an unbiased one, if the reduction in
variance compensates for the bias introduced.

## Consistency

An estimator is **consistent** if it converges in probability to the parameter
as the sample grows,

$$
\hat\theta_n\ \xrightarrow{\ P\ }\ \theta
\qquad (n\to\infty).
$$

A sufficient condition is $$\operatorname{MSE}(\hat\theta_n)\to 0$$, that is,
bias and variance both tending to zero. The sample mean is consistent for
$$\mu$$ by the law of large numbers.

## Efficiency and Fisher information

Among unbiased estimators, the one with **smallest variance** is preferred.
There is a universal lower bound for that variance. Under regularity
conditions, every unbiased estimator satisfies the **Cramér-Rao inequality**,

$$
\operatorname{Var}(\hat\theta)\ \ge\ \frac{1}{n\,I(\theta)},
$$

where

$$
I(\theta)=\mathbb{E}\!\left[\left(\frac{\partial}{\partial\theta}\log f_\theta(X)\right)^{2}\right]
$$

is the **Fisher information** of one observation. An unbiased estimator that
attains this bound is called **efficient**, and the **relative efficiency**
between two estimators is the ratio of their variances.

The maximum likelihood estimator has, under regularity, an optimal asymptotic
behavior: it is consistent and

$$
\sqrt{n}\,(\hat\theta_{\mathrm{ML}}-\theta)\ \xrightarrow{\ d\ }\ \mathcal{N}\!\big(0,\ I(\theta)^{-1}\big),
$$

that is, it is asymptotically normal and attains the Cramér-Rao bound in the
limit. This justifies the use of maximum likelihood and provides approximate
standard errors from $$I(\theta)$$.
