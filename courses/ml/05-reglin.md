---
title: 2.1 - Linear Regression and Least Squares
course: ml
---

## Linear regression and least squares

Part II of the course, on linear models, begins here. Linear regression is the
first concrete model, and it is an exact instance of what we have seen so far:
empirical risk minimization with **squared loss** and a **linear** hypothesis
space. Despite its simplicity, it has a closed-form solution, a clean geometric
reading and optimal properties that serve as a reference for everything that
follows.

### Contents

- The linear model
- Ordinary least squares
- Normal equations and closed-form solution
- Geometric interpretation: orthogonal projection
- The hat matrix
- Properties of the estimator (Gauss-Markov)

### The linear model

We have $$n$$ observations and $$p$$ predictors (counting the intercept). We
stack the inputs in the **design matrix** $$X\in\mathbb{R}^{n\times p}$$, the
responses in $$y\in\mathbb{R}^{n}$$ and the parameters in
$$\beta\in\mathbb{R}^{p}$$. The model is

$$
y=X\beta+\epsilon,
$$

or, row by row, $$y_i=x_i^{\top}\beta+\epsilon_i$$. The term "linear" refers to
the **parameters**, not the predictors: columns of $$X$$ can contain $$x^2$$,
$$\log x$$, interactions or any fixed transformation of the original variables.
A column of $$1$$ represents the intercept.

To use least squares as a point estimator it is enough to assume
$$\mathbb{E}[\epsilon\mid X]=0$$. To make inference about $$\beta$$ we add
$$\operatorname{Var}(\epsilon\mid X)=\sigma^{2}I_n$$, that is, noise with
constant variance and uncorrelated.

### Ordinary least squares

The **ordinary least squares** (OLS) estimator is the one that minimizes the
residual sum of squares:

$$
\hat\beta
=
\arg\min_{\beta}\;\frac{1}{n}\sum_{i=1}^{n}\big(y_i-x_i^{\top}\beta\big)^2
=
\arg\min_{\beta}\;\lVert y-X\beta\rVert_2^{2}.
$$

The factor $$1/n$$ does not change the minimizer, so we work with the sum. This
is literally ERM with $$L(y,\hat y)=(y-\hat y)^2$$ and
$$\mathcal{H}=\{x\mapsto x^{\top}\beta:\beta\in\mathbb{R}^{p}\}$$. The objective
$$S(\beta)=\lVert y-X\beta\rVert^{2}$$ is a convex quadratic in $$\beta$$, so
the global minimum is where the gradient vanishes.

The connection with the previous lecture holds: if
$$\epsilon\mid X\sim\mathcal{N}(0,\sigma^{2}I)$$, then OLS coincides with
**maximum likelihood**, because the Gaussian NLL is the squared error plus a
constant.

### Normal equations and closed-form solution

Expanding the objective,

$$
S(\beta)
=
(y-X\beta)^{\top}(y-X\beta)
=
y^{\top}y-2\beta^{\top}X^{\top}y+\beta^{\top}X^{\top}X\beta,
$$

and differentiating with respect to $$\beta$$,

$$
\nabla_{\beta}S(\beta)
=
-2X^{\top}y+2X^{\top}X\beta
=
-2X^{\top}(y-X\beta).
$$

Setting this to zero, we arrive at the **normal equations**:

$$
X^{\top}X\,\hat\beta=X^{\top}y.
$$

When $$X$$ has full column rank (linearly independent columns, which requires
$$p\le n$$), the matrix $$X^{\top}X$$ is invertible and

$$
\boxed{\;\hat\beta=(X^{\top}X)^{-1}X^{\top}y\;}
$$

The Hessian $$2X^{\top}X$$ is positive definite in this case, confirming this is
a minimum. In practice **one does not invert** $$X^{\top}X$$: the system is
solved by Cholesky decomposition, or, in a numerically more stable way, a QR or
SVD decomposition is applied directly to $$X$$, avoiding squaring the condition
number.

### Geometric interpretation: orthogonal projection

Let $$\hat y=X\hat\beta$$ be the vector of fitted values. The normal equations
can be rewritten as

$$
X^{\top}(y-X\hat\beta)=0,
$$

that is, the **residual** vector $$\hat\epsilon=y-\hat y$$ is orthogonal to all
the columns of $$X$$ and, therefore, to the entire **column space**
$$\operatorname{col}(X)$$. This identifies $$\hat y$$ as the **orthogonal
projection** of $$y$$ onto $$\operatorname{col}(X)$$: the point of that subspace
closest to $$y$$ in the Euclidean norm. It is the finite-dimensional version of
the idea that minimizing distance to a subspace is the same as projecting onto
it.

From the orthogonality between $$\hat y$$ and $$\hat\epsilon$$ follows the
Pythagorean theorem,

$$
\lVert y\rVert^{2}=\lVert\hat y\rVert^{2}+\lVert\hat\epsilon\rVert^{2},
$$

which, applied to the centered variables, gives the decomposition
$$\mathrm{SST}=\mathrm{SSReg}+\mathrm{SSR}$$ used to define $$R^{2}$$.

### The hat matrix

Substituting $$\hat\beta$$ into $$\hat y$$,

$$
\hat y=X\hat\beta=X(X^{\top}X)^{-1}X^{\top}y=P_X\,y,
\qquad
\boxed{\;P_X=X(X^{\top}X)^{-1}X^{\top}\;}
$$

$$P_X$$ is the **hat matrix** (because it puts the "hat" on $$y$$) or projection
matrix. Its properties translate the geometry of the previous section:

- **symmetric**, $$P_X^{\top}=P_X$$;
- **idempotent**, $$P_X^{2}=P_X$$ (projecting again changes nothing);
- $$P_X X=X$$ and the eigenvalues are $$0$$ or $$1$$;
- $$\operatorname{tr}(P_X)=p$$, the dimension of $$\operatorname{col}(X)$$;
- $$I-P_X$$ projects onto the orthogonal complement, so that
  $$\hat\epsilon=(I-P_X)\,y$$.

The diagonal elements $$h_{ii}$$ are called **leverage** and measure how much
observation $$i$$ influences its own fitted value. We have $$0\le h_{ii}\le 1$$
and $$\sum_i h_{ii}=p$$; points with high $$h_{ii}$$ deserve attention in the
fit diagnostics.

### Properties of the estimator (Gauss-Markov)

Under $$\mathbb{E}[\epsilon\mid X]=0$$, the OLS estimator is **unbiased**:

$$
\mathbb{E}[\hat\beta\mid X]
=
(X^{\top}X)^{-1}X^{\top}\,\mathbb{E}[y\mid X]
=
(X^{\top}X)^{-1}X^{\top}X\beta
=
\beta.
$$

Adding $$\operatorname{Var}(\epsilon\mid X)=\sigma^{2}I$$, the covariance matrix
is

$$
\operatorname{Var}(\hat\beta\mid X)=\sigma^{2}\,(X^{\top}X)^{-1}.
$$

The **Gauss-Markov theorem** states that, among all estimators that are linear
in $$y$$ and unbiased, least squares is the one with the smallest variance (it
is the *best linear unbiased estimator*, BLUE). The result does not require
normality of the noise. The variance $$\sigma^{2}$$ is estimated without bias by

$$
\hat\sigma^{2}=\frac{\lVert\hat\epsilon\rVert^{2}}{\,n-p\,}.
$$

When the columns of $$X$$ are nearly collinear, $$X^{\top}X$$ becomes
ill-conditioned and the entries of $$(X^{\top}X)^{-1}$$ explode, inflating
$$\operatorname{Var}(\hat\beta)$$. This is the problem that regularization, the
topic of the next lecture, comes to solve.
