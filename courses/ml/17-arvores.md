---
title: "4.1 - Decision Trees"
course: ml
---

## Decision trees

Part IV, on trees and *ensemble* methods, begins here. The decision tree is a
nonparametric model that partitions the *feature* space into rectangular regions
and predicts a constant value in each one. On its own it has high variance, but
it is the building block of the strongest methods for tabular data (random
forests and *boosting*), which come in the next lectures.

### Contents

- Recursive partitioning
- Classification and regression trees
- Impurity
- Entropy and the Gini index
- Information gain
- Pruning

### Recursive partitioning

A tree is built by **recursive partitioning**: one starts with all the data in a
single node and, at each step, chooses a *feature* $$j$$ and a threshold $$s$$
that split the node in two, $$\{x_j\le s\}$$ and $$\{x_j>s\}$$. The process
repeats in each child. The result is a partition of the space into axis-aligned
boxes, one per leaf.

### Prediction at the leaves

Each leaf stores a constant prediction, estimated from the training points that
fall in it:

- **regression**: the mean of the $$y_i$$ in the leaf;
- **classification**: the majority class, or the class proportions
  $$\hat p_k$$ if we want probabilities.

### Impurity measures

To decide where to split, we need to measure how "mixed" a node is. For a node
with class proportions $$p_k$$, the usual measures are the **entropy**

$$
H(Y)=-\sum_{k}p_k\log p_k,
$$

the **Gini index**

$$
G(Y)=1-\sum_{k}p_k^{2},
$$

and the classification error $$1-\max_k p_k$$. All are zero when the node is
pure (a single class) and are maximal when the classes are in equal parts.
Entropy and Gini are preferred because they are differentiable and more
sensitive to changes in the proportions. In regression, the impurity of a node
is the **variance** (or the mean squared error) of the $$y_i$$ in it.

### Information gain and the choice of split

A split that divides a node of $$n$$ points into children of sizes $$n_j$$ and
impurities $$H(Y_j)$$ produces an **information gain**

$$
\mathrm{IG}=H(Y)-\sum_{j}\frac{n_j}{n}\,H(Y_j),
$$

that is, the impurity of the node minus the weighted average of the impurities
of the children. At each step, the algorithm tests all *features* and all
candidate thresholds and chooses the split with the largest gain. It is a
**greedy** procedure: it optimizes one split at a time, without revisiting the
previous ones.

### Greedy growth and stopping

Growth stops when a node becomes pure, when it has few points, when a maximum
depth is reached, or when no split improves the impurity. With no limit at all,
the tree grows until it isolates every point: zero training error, huge
variance, the picture of overfitting from lecture 3.1.

### Cost-complexity pruning

The classical strategy is to let the tree grow and then **prune** it.
Cost-complexity pruning minimizes

$$
R_\alpha(T)=R(T)+\alpha\,\lvert T\rvert,
$$

where $$R(T)$$ is the error of the tree, $$\lvert T\rvert$$ the number of leaves
and $$\alpha\ge 0$$ a parameter that penalizes size. Increasing $$\alpha$$
collapses low-gain leaves; the value of $$\alpha$$ is chosen by
cross-validation.

### Advantages, limitations and the road to *ensembles*

Trees are interpretable, handle numerical and categorical *features* with no
preprocessing, do not require standardization and capture interactions
automatically. On the other hand, they have **high variance**: a small change in
the data can change the whole structure, and the boundaries are always
axis-aligned. It is exactly the profile (low bias, high variance, unstable) that
model averaging corrects, which motivates the *bagging* and the random forests
of the next lectures.
