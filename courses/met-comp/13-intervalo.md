---
title: "1.12 - Confidence interval"
course: met-comp
---

## Confidence interval

The point estimation of the previous lecture returns a single number,
$$\hat\theta$$, without saying how close it is to $$\theta$$. The confidence
interval adds that information: instead of a point, a range of plausible values
for the parameter, with an associated confidence level.

### Contents

- The idea and the interpretation
- Pivotal quantity
- Interval for the mean
- Interval for the variance
- Interval for a proportion
- Sample size determination

## The idea and the interpretation

A **confidence interval** of level $$1-\alpha$$ for $$\theta$$ is a pair of
statistics $$[L,U]$$, computed from the sample, such that

$$
P(L\le\theta\le U)=1-\alpha
$$

**before** the data are observed. The value $$1-\alpha$$ is the **confidence
level**, typically $$0.90$$, $$0.95$$ or $$0.99$$.

The interpretation requires care. What is random is the **interval**, not
$$\theta$$, which is a fixed (though unknown) constant. The correct statement
is: if we repeated the experiment many times, about $$100(1-\alpha)\%$$ of the
intervals built would contain $$\theta$$. After computing a concrete interval
$$[\ell,u]$$, it either contains or does not contain $$\theta$$, and it makes
no sense to speak of probability; we only say "with $$95\%$$ confidence".

## Pivotal quantity

The standard construction method uses a **pivotal quantity**: a function
$$Q(X_1,\ldots,X_n;\theta)$$ that depends on the data and on $$\theta$$, but
whose **distribution does not depend on $$\theta$$**. Choosing $$a$$ and $$b$$
with $$P(a\le Q\le b)=1-\alpha$$, we just solve the inequality
$$a\le Q\le b$$ for $$\theta$$.

## Interval for the mean with known variance

An i.i.d. sample with unknown mean $$\mu$$ and known variance $$\sigma^{2}$$
(with a normal population, or with large $$n$$ by the central limit theorem).
The pivot is

$$
Z=\frac{\bar X-\mu}{\sigma/\sqrt{n}}\sim\mathcal{N}(0,1).
$$

Denoting by $$z_{\alpha/2}$$ the value with
$$P(-z_{\alpha/2}\le Z\le z_{\alpha/2})=1-\alpha$$, we solve for $$\mu$$ and get

$$
\boxed{
\bar X\ \pm\ z_{\alpha/2}\,\frac{\sigma}{\sqrt{n}}.
}
$$

The half-width $$z_{\alpha/2}\,\sigma/\sqrt{n}$$ is the **margin of error**. For
$$95\%$$, $$z_{\alpha/2}\approx 1.96$$.

## Interval for the mean with unknown variance

When $$\sigma$$ is not known, we replace it by $$S$$. The pivot becomes

$$
T=\frac{\bar X-\mu}{S/\sqrt{n}}\sim t_{n-1},
$$

exact if the population is normal and approximate by the central limit theorem
otherwise. The interval is

$$
\boxed{
\bar X\ \pm\ t_{n-1;\,\alpha/2}\,\frac{S}{\sqrt{n}}.
}
$$

The quantile $$t_{n-1;\alpha/2}$$ is larger than $$z_{\alpha/2}$$, so the
interval is wider: it is the price of having estimated $$\sigma$$. As $$n$$
grows, $$t_{n-1;\alpha/2}\to z_{\alpha/2}$$ and the two intervals coincide.

## Interval for the variance

For a normal population, the pivot is

$$
\frac{(n-1)S^{2}}{\sigma^{2}}\sim\chi^{2}_{n-1}.
$$

With $$\chi^{2}_{n-1;\,\alpha/2}$$ and $$\chi^{2}_{n-1;\,1-\alpha/2}$$ the
corresponding quantiles, we solve for $$\sigma^{2}$$:

$$
\left[\ \frac{(n-1)S^{2}}{\chi^{2}_{n-1;\,\alpha/2}}\ ,\ \frac{(n-1)S^{2}}{\chi^{2}_{n-1;\,1-\alpha/2}}\ \right].
$$

Unlike the intervals for the mean, this one is **asymmetric** about $$S^{2}$$,
because the $$\chi^{2}$$ distribution is asymmetric.

## Interval for a proportion

Let $$X\sim\text{Binomial}(n,p)$$ and $$\hat p=X/n$$. For large $$n$$, the
central limit theorem gives

$$
\frac{\hat p-p}{\sqrt{p(1-p)/n}}\ \approx\ \mathcal{N}(0,1).
$$

Substituting $$p$$ by $$\hat p$$ in the standard error, we get the Wald
interval

$$
\boxed{
\hat p\ \pm\ z_{\alpha/2}\,\sqrt{\frac{\hat p\,(1-\hat p)}{n}}.
}
$$

This approximation is poor when $$p$$ is near $$0$$ or $$1$$, or when $$n$$ is
small; in those cases the Wilson, Agresti-Coull or exact Clopper-Pearson
intervals are used.

## Sample size determination

The sample size can be chosen to reach a target margin of error $$E$$. For the
mean with known variance,

$$
E=z_{\alpha/2}\,\frac{\sigma}{\sqrt{n}}
\quad\Longrightarrow\quad
n=\left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^{2}.
$$

For a proportion, using the worst case $$\hat p=1/2$$, which maximizes
$$\hat p(1-\hat p)$$,

$$
n=\left(\frac{z_{\alpha/2}}{2E}\right)^{2}.
$$

In both cases, halving the margin of error requires **quadrupling** the sample
size.

## Summary table

| Parameter | Conditions | Pivot | $$1-\alpha$$ interval |
| --- | --- | --- | --- |
| $$\mu$$ | $$\sigma$$ known | $$\dfrac{\bar X-\mu}{\sigma/\sqrt{n}}\sim\mathcal{N}(0,1)$$ | $$\bar X\pm z_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}$$ |
| $$\mu$$ | $$\sigma$$ unknown | $$\dfrac{\bar X-\mu}{S/\sqrt{n}}\sim t_{n-1}$$ | $$\bar X\pm t_{n-1;\alpha/2}\dfrac{S}{\sqrt{n}}$$ |
| $$\sigma^{2}$$ | normal population | $$\dfrac{(n-1)S^{2}}{\sigma^{2}}\sim\chi^{2}_{n-1}$$ | $$\left[\dfrac{(n-1)S^{2}}{\chi^{2}_{n-1;\alpha/2}},\ \dfrac{(n-1)S^{2}}{\chi^{2}_{n-1;1-\alpha/2}}\right]$$ |
| $$p$$ | large $$n$$ | $$\dfrac{\hat p-p}{\sqrt{\hat p(1-\hat p)/n}}\approx\mathcal{N}(0,1)$$ | $$\hat p\pm z_{\alpha/2}\sqrt{\dfrac{\hat p(1-\hat p)}{n}}$$ |
