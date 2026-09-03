---
title: "4.3 - Random Forests"
course: ml
---

## Random forests

The variance formula for the average, $$\rho\sigma^{2}+\frac{1-\rho}{B}\sigma^{2}$$,
showed that *bagging* of trees hits a floor $$\rho\sigma^{2}$$ because the trees
are too similar. The random forest attacks precisely the $$\rho$$: it introduces
extra randomness in the construction of each tree to **decorrelate** them.

### Contents

- Randomized trees
- Feature subsampling
- Correlation between trees
- Variance reduction
- Out-of-bag estimate

### From bagging to the random forest

A **random forest** is the *bagging* of trees with one modification: at each
node, instead of searching for the best split among **all** $$p$$ *features*,
the algorithm draws a subset of $$m<p$$ *features* and chooses the best split
only among them. Usual values are $$m=\sqrt{p}$$ for classification and
$$m=p/3$$ for regression. The trees are grown deep and are not pruned.

### The role of correlation

Returning to the variance of the average of $$B$$ trees,

$$
\operatorname{Var}\!\left(\frac{1}{B}\sum_{b=1}^{B}f_b(x)\right)
=
\rho\,\sigma^{2}+\frac{1-\rho}{B}\,\sigma^{2}
\ \xrightarrow[B\to\infty]{}\
\rho\,\sigma^{2}.
$$

*Bagging* alone already drives the second term to zero, but leaves $$\rho$$
high: if one or two *features* dominate, almost every tree splits on them first
and the trees end up very similar. Restricting the splits to a random subset of
*features* **forces** different trees to use different *features*, which reduces
$$\rho$$ and therefore lowers the floor $$\rho\sigma^{2}$$.

### The trade-off in m

The parameter $$m$$ controls a trade-off:

- small $$m$$: more decorrelated trees (smaller $$\rho$$), but each tree
  individually is weaker, because sometimes the good *features* do not even
  enter the draw (larger individual variance $$\sigma^{2}$$);
- large $$m$$: stronger trees, but more correlated.

The optimum is intermediate and is a hyperparameter to tune, although the
default values usually work well.

### Depth of the trees

The trees of the forest are left to grow with no pruning. Individually they have
low bias and very high variance; the aggregation over many trees takes care of
the variance. This division of labor (each tree reduces bias, the forest reduces
variance) is the opposite of *boosting*, where each new model reduces bias
sequentially.

### Out-of-bag and variable importance

The forest inherits the **out-of-bag estimate** from *bagging*: each point is
evaluated by the trees that did not use it, giving a risk estimate with no
validation set. Two measures of **variable importance** are common: the mean
impurity reduction attributed to each *feature* in the splits, and the
permutation importance, which measures how much the out-of-bag error worsens
when the values of a *feature* are shuffled.

### In practice

Random forests are one of the most robust "off-the-shelf" methods: few
hyperparameters, little preprocessing, good performance in high dimension and
resistance to *outliers* and irrelevant *features*. The downsides are the loss
of interpretability relative to a single tree and the size of the model. On
highly structured tabular problems, the *gradient boosting* of the next lectures
usually beats them. In Astronomy, the random forest is a standard choice for
*photo-z* and for classification of stars, galaxies and quasars.
