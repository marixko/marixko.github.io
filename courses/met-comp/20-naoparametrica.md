---
title: "1.20 - Nonparametric statistics"
course: met-comp
---

## Nonparametric statistics

The tests of lectures 1.13 to 1.17 assume a shape for the data distribution,
almost always the normal. When that assumption is doubtful (small samples,
skewed data, presence of *outliers*, ordinal variables), **nonparametric**
tests are used, which rely on ranks and signs instead of the original values.

### Contents

- The idea of ranks
- Sign test
- Wilcoxon signed-rank test
- Mann-Whitney test
- Kruskal-Wallis test
- Kolmogorov-Smirnov test

## The idea of ranks

Replacing each observation by its position in the ordering (the **rank**)
removes the dependence on scale and on the exact shape of the distribution. The
distribution of rank-based statistics, under the null hypothesis, depends only
on $$n$$ (and combinatorics), not on the underlying distribution. The price is
a small loss of power when the data really **are** normal.

## Sign test

The simplest. For $$H_0$$ that the **median** equals $$m_0$$, we count how many
observations are above $$m_0$$. Under $$H_0$$, that count
$$S\sim\text{Binomial}(n,\tfrac{1}{2})$$ (discarding ties). It also works for
paired data, applied to the signs of the differences. It uses very little
information (just the sign), so it has low power.

## Wilcoxon signed-rank test

For paired data, or for one sample against a median $$m_0$$, it is the
substitute for the $$t$$ test. The differences $$d_i$$ are computed, the
$$\lvert d_i\rvert$$ are ordered, ranks are assigned, and the ranks of the
positive differences ($$W^{+}$$) and the negative ones ($$W^{-}$$) are summed
separately. The statistic is $$W=\min(W^{+},W^{-})$$. Under $$H_0$$, $$W^{+}$$
has mean $$\frac{n(n+1)}{4}$$ and variance $$\frac{n(n+1)(2n+1)}{24}$$, and for
large $$n$$

$$
Z=\frac{W^{+}-\frac{n(n+1)}{4}}{\sqrt{\frac{n(n+1)(2n+1)}{24}}}\ \approx\ \mathcal{N}(0,1).
$$

Unlike the sign test, it uses the relative **magnitude** of the differences.

## Mann-Whitney test

The nonparametric substitute for the $$t$$ test of **two independent
samples**. The $$n_1+n_2$$ observations are pooled, ranks are assigned, and
$$R_1$$, the sum of the ranks of group 1, is computed. The statistic is

$$
U_1=R_1-\frac{n_1(n_1+1)}{2},
$$

which counts how many pairs $$(x,y)$$ have $$x<y$$. Under $$H_0$$ (same
distribution), $$U_1$$ has mean $$\frac{n_1 n_2}{2}$$ and variance
$$\frac{n_1 n_2(n_1+n_2+1)}{12}$$, and the normal approximation holds for
moderate samples.

## Kruskal-Wallis test

The extension of Mann-Whitney to $$k\ge 2$$ groups, and the nonparametric
substitute for ANOVA. With the ranks of all $$N$$ observations and $$R_i$$ the
sum of the ranks of group $$i$$,

$$
H=\frac{12}{N(N+1)}\sum_{i=1}^{k}\frac{R_i^{2}}{n_i}-3(N+1)\ \sim\ \chi^{2}_{k-1}
$$

under $$H_0$$ that the $$k$$ groups have the same distribution.

## Kolmogorov-Smirnov test

Tests the **shape** of the distribution, not a parameter. It compares the
empirical CDF $$\hat F_n$$ (lecture 1.6) with a reference CDF $$F_0$$
(goodness-of-fit test) or with the empirical CDF of a second sample (two-sample
test). The statistic is the largest vertical distance between the curves,

$$
D_n=\sup_{x}\big\lvert\hat F_n(x)-F_0(x)\big\rvert.
$$

Under $$H_0$$, the distribution of $$\sqrt{n}\,D_n$$ does not depend on $$F_0$$
(provided $$F_0$$ is continuous and fully specified), which gives tabulated
critical values. It is mostly sensitive to differences in the center of the
distribution; for the tails, the Anderson-Darling test is preferable.

## Summary

| Situation | Parametric test | Nonparametric alternative |
| --- | --- | --- |
| One sample / paired | $$t$$ test | sign, Wilcoxon |
| Two independent samples | $$t$$ test | Mann-Whitney |
| $$k$$ groups | ANOVA | Kruskal-Wallis |
| Shape of the distribution | (chi-square goodness-of-fit) | Kolmogorov-Smirnov |
