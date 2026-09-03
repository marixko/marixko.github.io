---
title: "5.1 - Margin Classification"
course: ml
---

## Margin classification

Part V covers support vector machines (SVM) and *kernels*. The starting idea is
geometric: when the data are linearly separable, there are infinitely many
hyperplanes that separate them, and we want to choose the one that stays as
**far as possible** from the points of both classes.

### Contents

- Hyperplanes
- Linear separability
- Margin
- Geometric interpretation

### Hyperplanes

A **hyperplane** in $$\mathbb{R}^{p}$$ is the set

$$
\{\,x:\ w^{\top}x+b=0\,\},
$$

where $$w$$ is a vector **normal** to the hyperplane and $$b$$ an offset. The
associated linear classifier is
$$\hat y=\operatorname{sign}(w^{\top}x+b)$$: the sign of $$w^{\top}x+b$$ says on
which side of the hyperplane the point lies.

### Distance to the hyperplane

The distance from a point $$x$$ to the hyperplane is

$$
\frac{\lvert w^{\top}x+b\rvert}{\lVert w\rVert}.
$$

To see this, project: the closest point on the hyperplane along the direction of
$$w$$ is $$x-t\,\frac{w}{\lVert w\rVert}$$ for some $$t$$; imposing that it
satisfy the hyperplane equation gives $$t=(w^{\top}x+b)/\lVert w\rVert$$, whose
absolute value is the distance. The quantity $$w^{\top}x+b$$ without the
absolute value is the **signed** distance, positive on one side and negative on
the other.

### Linear separability and margins

The data $$\{(x_i,y_i)\}$$ with $$y_i\in\{-1,+1\}$$ are **linearly separable**
if there is $$(w,b)$$ such that $$y_i(w^{\top}x_i+b)>0$$ for every $$i$$, that
is, every point is on the right side.

The **functional margin** of a point is defined as $$y_i(w^{\top}x_i+b)$$ and
the **geometric margin** as

$$
\gamma_i=\frac{y_i(w^{\top}x_i+b)}{\lVert w\rVert},
$$

which is the signed distance from the point to the hyperplane (positive if
classified correctly). The margin of a separating hyperplane is the smallest
geometric margin over all points, $$\gamma=\min_i\gamma_i$$.

### The maximum-margin hyperplane

Among all separating hyperplanes, the **maximum-margin** one is the one that
maximizes $$\gamma$$. It is unique, stays equidistant from the closest points of
each class, and is the most robust to perturbations of the data. The
generalization intuition is the same as in Part III: a large margin corresponds
to an effectively smaller class of functions, which tightens the margin-based
generalization bounds.

### Canonical form

The geometric margin does not change if we rescale $$(w,b)$$ by a positive
constant. We can then **fix the scale** by requiring
$$\min_i y_i(w^{\top}x_i+b)=1$$. With this normalization, the geometric margin
is

$$
\gamma=\frac{1}{\lVert w\rVert},
$$

and maximizing the margin becomes **minimizing $$\lVert w\rVert$$** subject to
$$y_i(w^{\top}x_i+b)\ge 1$$ for every $$i$$. This is exactly the problem the
next lecture solves.
