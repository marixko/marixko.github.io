---
title: "1.14 - Tests for two populations"
course: met-comp
---

## Tests for two populations

The previous lecture compared a parameter to a fixed value. In practice, the
most common question is to compare **the same parameter in two populations**:
two treatments, two groups, before and after. The test structure is the same;
what changes is the statistic and its distribution.

### Contents

- Independent and paired samples
- Comparing two means
- Paired samples
- Comparing two variances
- Comparing two proportions

## Independent and paired samples

Two distinct situations:

- **Independent samples**: two separate groups,
  $$X_1,\ldots,X_{n_1}$$ from population 1 and $$Y_1,\ldots,Y_{n_2}$$ from
  population 2, with no relation between the observations of the two groups.
- **Paired samples**: each unit provides **two** measurements (before and
  after, two methods on the same object, two eyes of the same patient). We
  analyze the difference $$D_i=X_i-Y_i$$.

Pairing, when possible, is preferable: it removes the variability **between**
units and focuses the analysis on the variability **within** each pair.

## Comparing two means

In all cases below, $$H_0:\mu_1=\mu_2$$, that is, $$\mu_1-\mu_2=0$$, with
independent samples. The basis is that

$$
\mathbb{E}[\bar X-\bar Y]=\mu_1-\mu_2,
\qquad
\operatorname{Var}(\bar X-\bar Y)=\frac{\sigma_1^{2}}{n_1}+\frac{\sigma_2^{2}}{n_2}.
$$

### Known variances

$$
Z=\frac{(\bar X-\bar Y)-(\mu_1-\mu_2)}{\sqrt{\dfrac{\sigma_1^{2}}{n_1}+\dfrac{\sigma_2^{2}}{n_2}}}\sim\mathcal{N}(0,1),
$$

and $$H_0$$ is rejected (two-sided) if $$\lvert Z\rvert>z_{\alpha/2}$$.

### Equal and unknown variances

Assuming $$\sigma_1^{2}=\sigma_2^{2}$$, the information from the two samples is
combined in the **pooled estimator**

$$
S_p^{2}=\frac{(n_1-1)S_1^{2}+(n_2-1)S_2^{2}}{n_1+n_2-2},
$$

and then

$$
T=\frac{(\bar X-\bar Y)-(\mu_1-\mu_2)}{S_p\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}\sim t_{\,n_1+n_2-2}.
$$

### Different variances (Welch)

Without assuming equal variances, we use

$$
T'=\frac{(\bar X-\bar Y)-(\mu_1-\mu_2)}{\sqrt{\dfrac{S_1^{2}}{n_1}+\dfrac{S_2^{2}}{n_2}}},
$$

which has an approximately $$t_\nu$$ distribution, with degrees of freedom
given by the Welch-Satterthwaite formula,

$$
\nu\approx\frac{\left(\dfrac{S_1^{2}}{n_1}+\dfrac{S_2^{2}}{n_2}\right)^{2}}{\dfrac{(S_1^{2}/n_1)^{2}}{n_1-1}+\dfrac{(S_2^{2}/n_2)^{2}}{n_2-1}}.
$$

This is the recommended test when there is no strong reason to believe the
variances are equal.

## Paired samples

With paired data, the problem reduces to a **one**-sample test on the
differences $$D_i=X_i-Y_i$$. For $$H_0:\mu_D=0$$,

$$
T=\frac{\bar D}{S_D/\sqrt{n}}\sim t_{n-1},
$$

where $$\bar D$$ and $$S_D$$ are the mean and standard deviation of the $$n$$
differences. When the two measurements are positively correlated, this test has
much higher power than the independent two-sample test on the same data.

## Comparing two variances

For $$H_0:\sigma_1^{2}=\sigma_2^{2}$$, with independent normal populations,

$$
F=\frac{S_1^{2}}{S_2^{2}}\sim F_{\,n_1-1,\,n_2-1}\quad\text{under }H_0.
$$

Reject (two-sided) if $$F$$ falls outside the interval
$$\big[F_{n_1-1,n_2-1;\,1-\alpha/2},\ F_{n_1-1,n_2-1;\,\alpha/2}\big]$$. This
test is sensitive to departures from normality.

## Comparing two proportions

For $$H_0:p_1=p_2$$, with $$\hat p_1=X_1/n_1$$ and $$\hat p_2=X_2/n_2$$. Under
$$H_0$$, the two proportions are equal, so the common value is estimated by the
**pooled proportion**

$$
\hat p=\frac{X_1+X_2}{n_1+n_2},
$$

and

$$
Z=\frac{\hat p_1-\hat p_2}{\sqrt{\hat p\,(1-\hat p)\left(\dfrac{1}{n_1}+\dfrac{1}{n_2}\right)}}\ \approx\ \mathcal{N}(0,1).
$$

The confidence interval for $$p_1-p_2$$ (which does not use $$H_0$$) is

$$
(\hat p_1-\hat p_2)\ \pm\ z_{\alpha/2}\sqrt{\frac{\hat p_1(1-\hat p_1)}{n_1}+\frac{\hat p_2(1-\hat p_2)}{n_2}}.
$$

## Summary table

| Comparison | Conditions | Statistic under $$H_0$$ | Distribution |
| --- | --- | --- | --- |
| $$\mu_1=\mu_2$$ | independent, $$\sigma_i$$ known | $$\dfrac{\bar X-\bar Y}{\sqrt{\sigma_1^{2}/n_1+\sigma_2^{2}/n_2}}$$ | $$\mathcal{N}(0,1)$$ |
| $$\mu_1=\mu_2$$ | independent, $$\sigma_1=\sigma_2$$ | $$\dfrac{\bar X-\bar Y}{S_p\sqrt{1/n_1+1/n_2}}$$ | $$t_{n_1+n_2-2}$$ |
| $$\mu_1=\mu_2$$ | independent, $$\sigma_1\neq\sigma_2$$ | $$\dfrac{\bar X-\bar Y}{\sqrt{S_1^{2}/n_1+S_2^{2}/n_2}}$$ | $$t_\nu$$ (Welch) |
| $$\mu_D=0$$ | paired | $$\dfrac{\bar D}{S_D/\sqrt{n}}$$ | $$t_{n-1}$$ |
| $$\sigma_1^{2}=\sigma_2^{2}$$ | independent normal | $$S_1^{2}/S_2^{2}$$ | $$F_{n_1-1,\,n_2-1}$$ |
| $$p_1=p_2$$ | large $$n_1,n_2$$ | $$\dfrac{\hat p_1-\hat p_2}{\sqrt{\hat p(1-\hat p)(1/n_1+1/n_2)}}$$ | $$\mathcal{N}(0,1)$$ |

## Beyond two groups

To compare $$k>2$$ means at once, we use **analysis of variance** (ANOVA),
whose test statistic has an $$F$$ distribution. To compare $$k$$ proportions,
or to test association in contingency tables, we use the **$$\chi^{2}$$ test**.
Both are topics of the next lectures.
