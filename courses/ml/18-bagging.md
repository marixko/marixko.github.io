---
title: "4.2 - Bootstrap and Bagging"
course: ml
---

## Bootstrap and bagging

The tree of the previous lecture has high variance. *Bagging* reduces it in a
simple way: fit many trees on resamples of the data and take the average. The
resampling in question is the **bootstrap**, a statistical tool useful in its
own right.

### Contents

- Bootstrap resampling
- Sampling distribution
- Bagging
- Variance reduction
- Ensemble prediction

### The bootstrap

The **bootstrap** estimates the sampling distribution of a statistic by
resampling the data itself. From the set $$D$$ of $$n$$ points, one draws $$n$$
points **with replacement**, forming a set $$D^{*}$$; this is repeated $$B$$
times. The variation of the statistic across the $$D^{*b}$$ approximates its
variation across real samples from the generating process, with no need for an
analytic formula or new data.

In a bootstrap set, the probability that a specific point is **not** drawn is
$$(1-1/n)^{n}\to e^{-1}\approx 0.368$$. That is, each $$D^{*b}$$ contains about
$$63.2\%$$ of the distinct points, and the rest are left out (*out-of-bag*).

### Bagging

*Bagging* is short for *bootstrap aggregating*. The procedure:

1. generate $$B$$ bootstrap sets $$D^{*1},\ldots,D^{*B}$$;
2. fit a model $$\hat f_b$$ on each one;
3. aggregate the predictions.

For regression, the aggregation is the average:

$$
\hat f_{\mathrm{bag}}(x)=\frac{1}{B}\sum_{b=1}^{B}\hat f_b(x).
$$

For classification, one uses majority vote or the average of the class
probabilities.

### Why averaging reduces variance

Suppose each $$\hat f_b(x)$$ has variance $$\sigma^{2}$$ and that any two models
have correlation $$\rho$$. The variance of the average is

$$
\operatorname{Var}\!\left(\frac{1}{B}\sum_{b=1}^{B}\hat f_b(x)\right)
=
\rho\,\sigma^{2}+\frac{1-\rho}{B}\,\sigma^{2}.
$$

When $$B\to\infty$$, the second term vanishes and $$\rho\sigma^{2}$$ remains.
*Bagging* eliminates the $$\frac{1-\rho}{B}\sigma^{2}$$ part of the variance; the
floor $$\rho\sigma^{2}$$ depends on how correlated the models are. The bias is
practically unchanged, because each $$\hat f_b$$ has the same bias and the
average preserves the mean.

### When *bagging* helps

From the formula above: *bagging* gains the most when the individual models have
**high variance** and are weakly correlated. Deep, unpruned trees are the ideal
case: low bias, high variance, and sensitive enough to the resampling not to all
come out the same. For stable models, such as linear regression, the gain is
small, and the average of linear fits is essentially a single fit.

The floor $$\rho\sigma^{2}$$ also points to the next step: if we can
**decorrelate** the trees, we reduce $$\rho$$ and lower the floor. That is
exactly what random forests do.

### Out-of-bag estimate

Since about one third of the points is left out of each bootstrap set, each
point $$x_i$$ can be predicted using only the trees that did **not** see it in
training. The average of those errors is the **out-of-bag estimate** of the
risk, a practically free validation, with no need for a separate set.
