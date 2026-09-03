---
title: "1.15 - Analysis of variance (ANOVA)"
course: met-comp
---

## Analysis of variance

The previous lecture compared two means. Analysis of variance (ANOVA) compares
$$k\ge 2$$ means at once, with a single test, avoiding the type I error
inflation that would result from running all the pairwise tests.

### Contents

- The multiple comparisons problem
- One-factor model
- Sum of squares decomposition
- The F statistic
- The ANOVA table
- Multiple comparisons
- Model assumptions

## The multiple comparisons problem

With $$k$$ groups there are $$\binom{k}{2}$$ pairs. Testing all of them at level
$$\alpha$$ makes the probability of **at least** one false positive grow well
above $$\alpha$$: for $$k=5$$ there are $$10$$ tests, and the overall error rate
exceeds $$40\%$$. ANOVA answers a single global question: are **all** the means
equal?

## One-factor model

We have $$k$$ groups (the levels of a factor), with $$n_i$$ observations in
group $$i$$ and $$N=\sum_i n_i$$ in total. The model is

$$
X_{ij}=\mu_i+\varepsilon_{ij},
\qquad
\varepsilon_{ij}\overset{\text{i.i.d.}}{\sim}\mathcal{N}(0,\sigma^{2}),
$$

or, equivalently, $$X_{ij}=\mu+\tau_i+\varepsilon_{ij}$$, where $$\tau_i$$ is
the effect of group $$i$$ (with $$\sum_i n_i\tau_i=0$$). The hypothesis tested
is

$$
H_0:\mu_1=\mu_2=\cdots=\mu_k
$$

against the alternative that at least two means differ.

## Sum of squares decomposition

Let $$\bar X_{i\cdot}$$ be the mean of group $$i$$ and $$\bar X_{\cdot\cdot}$$
the grand mean. Starting from the identity

$$
X_{ij}-\bar X_{\cdot\cdot}
=
(\bar X_{i\cdot}-\bar X_{\cdot\cdot})+(X_{ij}-\bar X_{i\cdot}),
$$

squaring and summing over all observations, the cross terms cancel and we are
left with

$$
\underbrace{\sum_{i,j}(X_{ij}-\bar X_{\cdot\cdot})^{2}}_{\mathrm{SST}}
=
\underbrace{\sum_{i}n_i(\bar X_{i\cdot}-\bar X_{\cdot\cdot})^{2}}_{\mathrm{SSB}}
+
\underbrace{\sum_{i,j}(X_{ij}-\bar X_{i\cdot})^{2}}_{\mathrm{SSW}}.
$$

The **total** sum of squares (SST) splits into the **between-groups** part
(SSB), which measures how far the group means deviate from the grand mean, and
the **within-groups** part (SSW), which measures the residual dispersion. The
degrees of freedom add up the same way:
$$N-1=(k-1)+(N-k)$$.

## The F statistic

Dividing each sum of squares by its degrees of freedom, we get the **mean
squares**

$$
\mathrm{MSB}=\frac{\mathrm{SSB}}{k-1},
\qquad
\mathrm{MSW}=\frac{\mathrm{SSW}}{N-k}.
$$

The residual mean square estimates $$\sigma^{2}$$ always,
$$\mathbb{E}[\mathrm{MSW}]=\sigma^{2}$$, while

$$
\mathbb{E}[\mathrm{MSB}]=\sigma^{2}+\frac{\sum_i n_i\tau_i^{2}}{k-1},
$$

which equals $$\sigma^{2}$$ under $$H_0$$ and is larger under $$H_1$$. The test
statistic compares the two:

$$
\boxed{
F=\frac{\mathrm{MSB}}{\mathrm{MSW}}\ \sim\ F_{\,k-1,\ N-k}\quad\text{under }H_0.
}
$$

Reject $$H_0$$ if $$F>F_{k-1,\,N-k;\,\alpha}$$. The test is **one-sided to the
right**: only large values of $$F$$ (means very dispersed relative to the
noise) contradict $$H_0$$. For $$k=2$$, $$F=T^{2}$$ and ANOVA coincides with the
two-sample $$t$$ test with equal variances.

## The ANOVA table

| Source of variation | Sum of squares | df | Mean square | F |
| --- | --- | --- | --- | --- |
| Between groups | $$\mathrm{SSB}$$ | $$k-1$$ | $$\mathrm{MSB}$$ | $$\mathrm{MSB}/\mathrm{MSW}$$ |
| Within groups | $$\mathrm{SSW}$$ | $$N-k$$ | $$\mathrm{MSW}$$ | |
| Total | $$\mathrm{SST}$$ | $$N-1$$ | | |

The fraction of variability explained by the factor is
$$R^{2}=\mathrm{SSB}/\mathrm{SST}$$.

## Multiple comparisons

When ANOVA rejects $$H_0$$, it does not say **which** groups differ. For that,
pairwise comparisons are made while controlling the overall error rate:

- **Tukey (HSD)**: simultaneous intervals for all differences
  $$\mu_i-\mu_j$$, with exact control of the family-wise error rate;
- **Bonferroni**: uses level $$\alpha/m$$ in each of the $$m$$ tests; simple but
  conservative;
- **Scheffé**: for general linear contrasts between the means.

## Model assumptions

ANOVA assumes:

1. **independence** of the observations;
2. **normality** of the residuals (the test is reasonably robust to moderate
   departures, especially with groups of similar size);
3. **homoscedasticity**, that is, the same variance $$\sigma^{2}$$ in all
   groups (checkable with the Levene or Bartlett tests). When it fails, Welch's
   ANOVA is used.

If normality fails seriously, the nonparametric alternative is the
**Kruskal-Wallis** test.

## Beyond one factor

With two or more factors, two-way ANOVA decomposes the variability into main
effects of each factor and the **interaction** effect between them. The same
logic of sum-of-squares decomposition and $$F$$ ratios still holds.
