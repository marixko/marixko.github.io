---
title: "2.3 - Regularization: Ridge and Lasso"
course: ml
---

## Regularization: Ridge and Lasso

At the end of the previous two lectures we saw that the variance of
$$\hat\beta_{\mathrm{OLS}}$$ explodes when the columns of $$X$$ are nearly
collinear, and that least squares is not even defined when $$p>n$$.
**Regularization** solves both problems at once: it adds to the objective a
term that penalizes large coefficients, trading a little bias for a large
reduction in variance.

### Contents

- Penalization and why regularize
- Ridge: closed-form solution
- Shrinkage
- Lasso and sparsity
- Geometric interpretation
- Bias-variance trade-off
- Variable selection and choosing $$\lambda$$

### Penalization and why regularize

The general form of a penalized linear fit is

$$
\hat\beta=\arg\min_{\beta}\Big[\;\lVert y-X\beta\rVert^{2}+\lambda\,\Omega(\beta)\;\Big],
$$

where $$\Omega$$ is the penalty and $$\lambda\ge 0$$ controls its strength. With
$$\lambda=0$$ we recover OLS; as $$\lambda\to\infty$$, $$\hat\beta\to 0$$.

This is not an *ad hoc* trick: as we saw in lecture 1.4, penalized least
squares is a **maximum a posteriori** estimate. The penalty
$$\lambda\lVert\beta\rVert_2^{2}$$ corresponds to a Gaussian prior
$$\beta\sim\mathcal{N}(0,\tau^{2}I)$$, and $$\lambda\lVert\beta\rVert_1$$, to a
Laplace prior.

Two conventions matter before penalizing: the columns of $$X$$ should be
**standardized** (zero mean and unit variance), otherwise the penalty would
depend on the units of each predictor, and the **intercept** is usually left
out of the penalization.

### Ridge: closed-form solution

*Ridge* regression uses the $$L_2$$ penalty:

$$
\hat\beta_{\mathrm{ridge}}
=
\arg\min_{\beta}\Big[\;\lVert y-X\beta\rVert^{2}+\lambda\lVert\beta\rVert_2^{2}\;\Big].
$$

The objective is still a convex quadratic. The gradient is

$$
\nabla_{\beta}
=
-2X^{\top}(y-X\beta)+2\lambda\beta,
$$

and setting it to zero we get $$(X^{\top}X+\lambda I)\hat\beta=X^{\top}y$$, that
is,

$$
\boxed{\;\hat\beta_{\mathrm{ridge}}=(X^{\top}X+\lambda I)^{-1}X^{\top}y\;}
$$

For any $$\lambda>0$$, the matrix $$X^{\top}X+\lambda I$$ is **always
invertible**: adding $$\lambda$$ to all the eigenvalues of $$X^{\top}X$$ makes
it positive definite even when $$X^{\top}X$$ is singular. This is why *ridge*
works with collinearity and even with $$p>n$$.

### Shrinkage

The effect of the penalty becomes transparent through the singular value
decomposition $$X=UDV^{\top}$$, with singular values $$d_j$$. The fitted values
of OLS and *ridge* are

$$
\hat y_{\mathrm{OLS}}=\sum_{j}u_j\,(u_j^{\top}y),
\qquad
\hat y_{\mathrm{ridge}}=\sum_{j}u_j\,\frac{d_j^{2}}{d_j^{2}+\lambda}\,(u_j^{\top}y).
$$

Each direction is multiplied by a **shrinkage** factor
$$d_j^{2}/(d_j^{2}+\lambda)\in(0,1)$$. The directions of least variance in the
data (those with small $$d_j$$) are the most shrunk, which are precisely the
ones responsible for the instability of OLS under collinearity. *Ridge* brings
the coefficients close to zero but **never zeros them**. A useful measure of
the effective complexity of the fit is the degrees of freedom

$$
\operatorname{df}(\lambda)=\sum_{j}\frac{d_j^{2}}{d_j^{2}+\lambda},
$$

which decrease from $$p$$ (when $$\lambda=0$$) to $$0$$ (when
$$\lambda\to\infty$$).

### Lasso and sparsity

The *lasso* replaces the $$L_2$$ penalty with the $$L_1$$ one:

$$
\hat\beta_{\mathrm{lasso}}
=
\arg\min_{\beta}\Big[\;\lVert y-X\beta\rVert^{2}+\lambda\lVert\beta\rVert_1\;\Big],
\qquad
\lVert\beta\rVert_1=\sum_{j}\lvert\beta_j\rvert.
$$

The problem is convex, but $$\lVert\cdot\rVert_1$$ is not differentiable at
zero, so there is no closed form; coordinate descent or the LARS algorithm is
used. The central property is that, for $$\lambda$$ large enough, some
$$\hat\beta_j$$ become **exactly equal to zero**: the *lasso* estimates and
selects variables at the same time.

The optimality condition (via subgradient) explains why. For each predictor
$$j$$,

$$
x_j^{\top}(y-X\hat\beta)=\lambda\,\operatorname{sign}(\hat\beta_j)
\ \text{ if }\ \hat\beta_j\neq 0,
\qquad
\big\lvert x_j^{\top}(y-X\hat\beta)\big\rvert\le\lambda
\ \text{ if }\ \hat\beta_j=0.
$$

In the orthonormal case ($$X^{\top}X=I$$), this becomes **soft-thresholding**:

$$
\hat\beta_j^{\mathrm{lasso}}
=
\operatorname{sign}\big(\hat\beta_j^{\mathrm{OLS}}\big)\,
\Big(\big\lvert\hat\beta_j^{\mathrm{OLS}}\big\rvert-\tfrac{\lambda}{2}\Big)_{+},
$$

which zeros every coefficient whose OLS value is smaller than $$\lambda/2$$ in
magnitude. For comparison, *ridge* in the same case only rescales:
$$\hat\beta_j^{\mathrm{ridge}}=\hat\beta_j^{\mathrm{OLS}}/(1+\lambda)$$.

### Geometric interpretation

Each penalty has an equivalent constrained form:

$$
\min_{\beta}\ \lVert y-X\beta\rVert^{2}
\quad\text{subject to}\quad
\lVert\beta\rVert_2^{2}\le t
\ \ (\text{ridge}),
\qquad
\lVert\beta\rVert_1\le t
\ \ (\text{lasso}).
$$

The solution is the point where the level ellipses of
$$\lVert y-X\beta\rVert^{2}$$ touch the constraint region. In *ridge* that
region is a ball with a smooth boundary, so the contact point almost never has
any coordinate exactly zero. In the *lasso* the region is a diamond (the
$$L_1$$ ball), with corners resting on the axes, and the contact tends to occur
at a corner, where part of the coordinates vanish. This is the geometric origin
of sparsity.

### Bias-variance trade-off

For $$\lambda>0$$ the *ridge* estimator is biased,

$$
\mathbb{E}[\hat\beta_{\mathrm{ridge}}\mid X]
=
(X^{\top}X+\lambda I)^{-1}X^{\top}X\,\beta\neq\beta,
$$

but its variance,

$$
\operatorname{Var}(\hat\beta_{\mathrm{ridge}}\mid X)
=
\sigma^{2}(X^{\top}X+\lambda I)^{-1}X^{\top}X(X^{\top}X+\lambda I)^{-1},
$$

is smaller than $$\sigma^{2}(X^{\top}X)^{-1}$$. The remarkable point is that,
under collinearity, there **always exists** a $$\lambda>0$$ whose mean squared
error (bias squared plus variance) is smaller than that of OLS. The
out-of-sample prediction error, as a function of $$\lambda$$, typically has a
U shape: it grows again when $$\lambda$$ is too large and the bias dominates.

### Variable selection and choosing $$\lambda$$

The *lasso* does variable selection automatically and is indicated when one
believes that **few** predictors really matter (sparsity hypothesis). Its
limitations: among highly correlated predictors it picks one almost at random,
and it selects at most $$n$$ variables when $$p>n$$. The *elastic net* combines
the two penalties, $$\lambda_1\lVert\beta\rVert_1+\lambda_2\lVert\beta\rVert_2^{2}$$,
and inherits the sparsity of the *lasso* with the stability of *ridge* under
correlation.

The parameter $$\lambda$$ is chosen by **cross-validation**: the data are split
into $$k$$ blocks, the model is fit for a grid of $$\lambda$$ values and the one
that minimizes the average prediction error on the held-out blocks is chosen.
The "one standard error" rule prefers the largest $$\lambda$$ whose error is
still within one standard error of the minimum, resulting in a more
parsimonious model. One never chooses $$\lambda$$ by the training error, which
decreases monotonically as $$\lambda\to 0$$.

The **regularization path** is the function $$\hat\beta(\lambda)$$ for all
$$\lambda$$; for the *lasso* it is piecewise linear, and LARS computes it
entirely at a cost comparable to that of a single OLS fit. In Astronomy, where
it is common to have dozens of bands and strongly correlated derived colors
(for example in photometry for *photo-z* or classification), *lasso* and
*elastic net* are useful both for selecting and for stabilizing the fit.
