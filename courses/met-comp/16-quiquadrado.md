---
title: "1.16 - Chi-square tests"
course: met-comp
---

## Chi-square tests

The previous tests deal with numerical parameters: means, variances,
proportions. The chi-square test handles **categorical** data: counts
distributed across categories, and the association between two categorical
variables in a table.

### Contents

- Pearson's chi-square statistic
- Goodness-of-fit test
- Test of independence
- Test of homogeneity
- Validity conditions
- Measures of association

## Pearson's chi-square statistic

The data are organized into cells, each with an **observed** frequency
$$O_i$$ and an **expected** frequency $$E_i$$ computed under $$H_0$$. The test
statistic is

$$
\chi^{2}=\sum_{i}\frac{(O_i-E_i)^{2}}{E_i}.
$$

It sums the relative discrepancies between observed and expected. Under $$H_0$$,
and provided the $$E_i$$ are not too small, $$\chi^{2}$$ has approximately a
$$\chi^{2}_{\nu}$$ distribution, with $$\nu$$ depending on the test. The test is
always **one-sided to the right**: only large values of $$\chi^{2}$$ indicate a
departure from $$H_0$$.

## Goodness-of-fit test

Tests whether the data come from a specified distribution, with probabilities
$$p_1,\ldots,p_c$$ in the $$c$$ categories. With $$n$$ observations in total,
the expected frequencies are $$E_i=n\,p_i$$, and

$$
\chi^{2}=\sum_{i=1}^{c}\frac{(O_i-n\,p_i)^{2}}{n\,p_i}\ \sim\ \chi^{2}_{\,c-1-m},
$$

where $$m$$ is the number of distribution parameters **estimated from the data
themselves**. Each estimated parameter consumes one degree of freedom.

Two examples: testing whether a die is fair uses $$c=6$$, $$p_i=1/6$$, $$m=0$$
and $$\nu=5$$; testing whether counts follow a Poisson with $$\lambda$$
estimated from the sample uses $$m=1$$.

## Test of independence

In an $$r\times c$$ **contingency table**, two categorical variables are
cross-classified, with $$O_{ij}$$ observations in cell $$(i,j)$$ and total
$$n$$. The hypothesis is

$$
H_0:\ \text{the two variables are independent}.
$$

Under $$H_0$$, the probability of a cell is the product of the marginal
probabilities, estimated by the row and column totals:

$$
E_{ij}=\frac{(\text{row }i\text{ total})\times(\text{column }j\text{ total})}{n}.
$$

The statistic is

$$
\chi^{2}=\sum_{i=1}^{r}\sum_{j=1}^{c}\frac{(O_{ij}-E_{ij})^{2}}{E_{ij}}\ \sim\ \chi^{2}_{\,(r-1)(c-1)}.
$$

The degrees of freedom $$(r-1)(c-1)$$ result from $$rc$$ cells, minus $$1$$ for
the fixed total, minus $$(r-1)+(c-1)$$ for the estimated marginal
probabilities.

## Test of homogeneity

It has exactly the same statistic, the same $$E_{ij}$$ and the same degrees of
freedom as the test of independence, but the sampling design is different:
instead of a single sample classified by two variables, there are $$r$$
independent samples (one per row, with sizes fixed in advance), and we test
whether the distribution across the $$c$$ categories is **the same** in the
$$r$$ populations. In practice, the computation is identical.

## Special cases

- In a $$2\times 2$$ table, $$\nu=1$$. For small samples, the **Yates
  continuity correction** is applied or **Fisher's exact test** is used.
- The $$\chi^{2}$$ test of independence in a $$2\times 2$$ table is equivalent
  to the two-proportion $$Z$$ test of lecture 1.14: $$\chi^{2}=Z^{2}$$.
- The **likelihood ratio test**,
  $$G^{2}=2\sum_i O_i\log(O_i/E_i)$$, is an asymptotically equivalent
  alternative to the Pearson statistic.

## Validity conditions

- the observations must be **independent** and must be **counts**; applying the
  test to percentages, means or the same unit counted twice invalidates the
  result;
- the **expected** frequencies must be large enough. The usual rule is all
  $$E_i\ge 5$$; it is tolerable for up to $$20\%$$ of the cells to have $$E_i$$
  between $$1$$ and $$5$$, but none below $$1$$. When the rule fails, categories
  are merged or an exact test is used.

## Measures of association

Rejecting $$H_0$$ indicates that association exists, but not **how strong**. One
measure is **Cramér's $$V$$**,

$$
V=\sqrt{\frac{\chi^{2}}{n\,\min(r-1,\,c-1)}}\ \in[0,1],
$$

which equals $$0$$ under perfect independence and $$1$$ under perfect
association. For $$2\times 2$$ tables, the coefficient $$\phi=\sqrt{\chi^{2}/n}$$
is also used.
