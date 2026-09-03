---
title: "2.4 - Permutation tests"
course: met-comp
---

## Permutation tests

The classical hypothesis tests derive the distribution of the statistic under
$$H_0$$ from assumptions about the population (normality, equal variances). The
permutation test builds that distribution **directly from the data**, by
reshuffling the labels, and needs none of those assumptions.

### Contents

- The exchangeability hypothesis
- The algorithm
- Example: difference of means
- Monte Carlo p-value
- Relation with bootstrap and classical tests

## The exchangeability hypothesis

The idea: if $$H_0$$ says that two groups come from the **same** distribution,
then the group labels are **exchangeable**. Any random reassignment of the
labels to the same numerical values is, under $$H_0$$, as likely as the one
observed. By comparing the real statistic with the statistics of many
reassignments, we see whether the observed result is atypical.

## The algorithm

Let $$T$$ be a statistic that measures the effect of interest (a difference of
means, a correlation, an $$F$$ ratio), and $$t_{\mathrm{obs}}$$ its value on the
data. Then:

1. randomly shuffle the labels (or, in the paired case, randomly flip the sign
   of each difference);
2. recompute the statistic, obtaining $$T^{*}$$;
3. repeat $$B$$ times.

The collection $$T^{*}_1,\ldots,T^{*}_B$$ is the **permutation distribution** of
$$T$$ under $$H_0$$.

## Example: difference of means

Two groups, $$x_1,\ldots,x_{n_1}$$ and $$y_1,\ldots,y_{n_2}$$. The statistic is
$$T=\bar x-\bar y$$. Everything is pooled into a single vector of $$n_1+n_2$$
values; at each replicate, $$n_1$$ of them are drawn for "group 1" and the rest
for "group 2", and $$\bar x^{*}-\bar y^{*}$$ is recomputed. If
$$\lvert t_{\mathrm{obs}}\rvert$$ falls in the tail of the distribution of
$$\lvert T^{*}\rvert$$, $$H_0$$ is rejected.

## Monte Carlo p-value

For a two-sided test,

$$
p\text{-value}=\frac{1+\#\{\,b:\ \lvert T^{*}_b\rvert\ge\lvert t_{\mathrm{obs}}\rvert\,\}}{B+1}.
$$

The $$+1$$ in the numerator and denominator includes the observed configuration
(which is one of the possible permutations) and guarantees an always-positive
p-value. If all $$\binom{n_1+n_2}{n_1}$$ permutations were enumerated, the test
would be **exact**; with $$B$$ random permutations, it is a Monte Carlo
approximation, with an error that decreases as $$B$$ grows.

## Relation with bootstrap and classical tests

- **Permutation vs. bootstrap**: permutation resamples **without replacement**
  and tests a hypothesis of equal distributions; the *bootstrap* resamples
  **with replacement** and estimates the uncertainty of an estimate. They are
  tools for different questions.
- **Permutation vs. $$t$$ test**: when normality holds, the two give
  practically the same p-value; when it does not, permutation remains valid.
- The permutation test is the natural choice when $$n$$ is small, when the
  statistic is nonstandard, or when one does not want to defend any
  distributional assumption. The cost is only computational.
