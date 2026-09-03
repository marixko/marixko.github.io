---
title: "1.13 - Hypothesis testing"
course: met-comp
---

## Hypothesis testing

The confidence interval of the previous lecture describes a range of plausible
values for the parameter. The hypothesis test answers a binary question: are
the data compatible with a specific claim about the parameter, or do they
contradict it?

### Contents

- Null and alternative hypotheses
- Test statistic and rejection region
- Type I and type II errors
- Significance level, power and p-value
- Tests for the mean, variance and proportion
- Relation with the confidence interval

## Null and alternative hypotheses

The **null hypothesis** $$H_0$$ is the reference claim, usually of "no effect"
or "no difference", assumed true until the data contradict it. The
**alternative hypothesis** $$H_1$$ is what one wants to demonstrate. For
example,

$$
H_0:\mu=\mu_0
\qquad\text{versus}\qquad
H_1:\mu\neq\mu_0
$$

in the **two-sided** case, or $$H_1:\mu>\mu_0$$ (or $$\mu<\mu_0$$) in the
**one-sided** case.

The roles are not symmetric: the test protects $$H_0$$ and only rejects it in
the face of strong evidence. Hence "not rejecting $$H_0$$" is **not** the same
as "accepting $$H_0$$": it only means the data were not enough to discard it.

## Test statistic and rejection region

A **test statistic** $$T$$ is a function of the sample whose distribution
**under $$H_0$$** is known. The **rejection region** (or critical region)
$$\mathrm{RC}$$ is the set of values of $$T$$ for which we decide to reject
$$H_0$$. The decision rule is: reject $$H_0$$ if $$T\in\mathrm{RC}$$.

## Type I and type II errors

Every decision can err in two ways:

| | $$H_0$$ true | $$H_0$$ false |
| --- | --- | --- |
| **Reject $$H_0$$** | type I error | correct decision |
| **Do not reject $$H_0$$** | correct decision | type II error |

The probabilities of these errors are

$$
\alpha=P(\text{reject }H_0\mid H_0\text{ true}),
\qquad
\beta=P(\text{do not reject }H_0\mid H_0\text{ false}).
$$

The value $$\alpha$$ is the **significance level**, fixed by the analyst
(typically $$0.05$$). The value $$\beta$$ depends on how false $$H_0$$ really
is. The **power** of the test is

$$
1-\beta=P(\text{reject }H_0\mid H_1\text{ true}).
$$

There is a trade-off: decreasing $$\alpha$$ increases $$\beta$$, and vice
versa. The only way to reduce both at once is to increase $$n$$. With $$\alpha$$
fixed, the critical region is chosen to maximize power; for simple hypotheses,
the Neyman-Pearson lemma shows that the likelihood ratio test is the most
powerful.

## p-value

The **p-value** is the probability, computed **under $$H_0$$**, of obtaining a
test statistic at least as contrary to $$H_0$$ as the one observed:

$$
p\text{-value}=P\big(T\ \text{as or more extreme than }t_{\text{obs}}\ \big|\ H_0\big).
$$

The equivalent decision rule is: reject $$H_0$$ if
$$p\text{-value}\le\alpha$$. A small p-value indicates that the data would be
unlikely if $$H_0$$ were true.

Important interpretation: the p-value is **not** $$P(H_0\text{ true}\mid
\text{data})$$. It measures the compatibility of the data with $$H_0$$, not the
probability of $$H_0$$.

## Test for the mean

For $$H_0:\mu=\mu_0$$:

- with $$\sigma$$ known (or $$n$$ large), under $$H_0$$,
  $$Z=\dfrac{\bar X-\mu_0}{\sigma/\sqrt{n}}\sim\mathcal{N}(0,1)$$;
  reject (two-sided) if $$\lvert Z\rvert>z_{\alpha/2}$$;
- with $$\sigma$$ unknown, under $$H_0$$,
  $$T=\dfrac{\bar X-\mu_0}{S/\sqrt{n}}\sim t_{n-1}$$;
  reject if $$\lvert T\rvert>t_{n-1;\,\alpha/2}$$.

In one-sided tests, the critical region is on one side only, with $$z_{\alpha}$$
or $$t_{n-1;\,\alpha}$$.

## Test for the variance

For $$H_0:\sigma^{2}=\sigma_0^{2}$$, with a normal population, under $$H_0$$,

$$
\frac{(n-1)S^{2}}{\sigma_0^{2}}\sim\chi^{2}_{n-1}.
$$

In the two-sided case, reject $$H_0$$ if the value falls below
$$\chi^{2}_{n-1;\,1-\alpha/2}$$ or above $$\chi^{2}_{n-1;\,\alpha/2}$$.

## Test for a proportion

For $$H_0:p=p_0$$, with large $$n$$, under $$H_0$$,

$$
Z=\frac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}\ \approx\ \mathcal{N}(0,1).
$$

Note that the standard error uses $$p_0$$, the hypothesized value, not
$$\hat p$$. Reject (two-sided) if $$\lvert Z\rvert>z_{\alpha/2}$$.

## Relation with the confidence interval

Test and interval are the same inference. A two-sided test of
$$H_0:\theta=\theta_0$$ at level $$\alpha$$ rejects $$H_0$$ **if and only if**
$$\theta_0$$ is **outside** the confidence interval of level $$1-\alpha$$.
Building the interval and checking whether it contains $$\theta_0$$ is
equivalent to running the test.

## Cautions

- **Statistical significance is not practical significance.** With very large
  $$n$$, tiny and irrelevant differences become "significant". Also report the
  effect size.
- **Multiple tests** inflate the type I error probability: running $$m$$ tests
  at level $$\alpha$$ can give a false-positive rate much larger than
  $$\alpha$$. Correct with Bonferroni or by controlling the false discovery
  rate (FDR).
- The level $$\alpha=0.05$$ is a convention, not a law. Prefer reporting the
  p-value and the confidence interval over just "rejected" or "not rejected".

## Summary table

| $$H_0$$ | Conditions | Statistic under $$H_0$$ | Reject (two-sided) if |
| --- | --- | --- | --- |
| $$\mu=\mu_0$$ | $$\sigma$$ known | $$\dfrac{\bar X-\mu_0}{\sigma/\sqrt{n}}\sim\mathcal{N}(0,1)$$ | $$\lvert Z\rvert>z_{\alpha/2}$$ |
| $$\mu=\mu_0$$ | $$\sigma$$ unknown | $$\dfrac{\bar X-\mu_0}{S/\sqrt{n}}\sim t_{n-1}$$ | $$\lvert T\rvert>t_{n-1;\alpha/2}$$ |
| $$\sigma^{2}=\sigma_0^{2}$$ | normal population | $$\dfrac{(n-1)S^{2}}{\sigma_0^{2}}\sim\chi^{2}_{n-1}$$ | outside $$[\chi^{2}_{n-1;1-\alpha/2},\ \chi^{2}_{n-1;\alpha/2}]$$ |
| $$p=p_0$$ | large $$n$$ | $$\dfrac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}\approx\mathcal{N}(0,1)$$ | $$\lvert Z\rvert>z_{\alpha/2}$$ |
