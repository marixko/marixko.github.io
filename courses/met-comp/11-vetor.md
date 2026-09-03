---
title: 1.10 - Random vectors
course: met-comp
---

## Random vectors

So far we worked with one variable at a time. In practice we almost always
observe **several** quantities from the same object, and what matters is how
they vary together. The random vector organizes these variables, and the
covariance matrix describes their linear relationships.

### Contents

- Random vector and joint distribution
- Marginals and conditionals
- Mean vector
- Covariance and correlation matrices
- Independence and uncorrelatedness
- Linear combinations
- Multivariate normal

## Random vector and joint distribution

A **random vector** is a function
$$\mathbf{X}=(X_1,\ldots,X_p)^{\top}$$ from $$\Omega$$ to $$\mathbb{R}^{p}$$,
whose components are random variables. It is described by the **joint CDF**

$$
F_{\mathbf{X}}(x_1,\ldots,x_p)=P(X_1\le x_1,\ldots,X_p\le x_p),
$$

or, when they exist, by the joint probability function
$$p(x_1,\ldots,x_p)$$ in the discrete case and the joint density
$$f_{\mathbf{X}}$$ in the continuous case, with
$$P(\mathbf{X}\in A)=\int_A f_{\mathbf{X}}(\mathbf{x})\,d\mathbf{x}$$.

## Marginals and conditionals

The distribution of a subset of the components, called the **marginal**, is
obtained by summing or integrating out the rest. For example, for $$p=2$$,

$$
f_{X_1}(x_1)=\int_{-\infty}^{+\infty}f_{X_1,X_2}(x_1,x_2)\,dx_2,
$$

and the **conditional density** of $$X_1$$ given $$X_2=x_2$$, with
$$f_{X_2}(x_2)>0$$, is

$$
f_{X_1\mid X_2}(x_1\mid x_2)=\frac{f_{X_1,X_2}(x_1,x_2)}{f_{X_2}(x_2)}.
$$

## Mean vector

The expectation of a random vector is computed component by component:

$$
\boldsymbol{\mu}=\mathbb{E}[\mathbf{X}]=\big(\mathbb{E}[X_1],\ldots,\mathbb{E}[X_p]\big)^{\top}.
$$

For a function $$g:\mathbb{R}^{p}\rightarrow\mathbb{R}$$, the expectation is the
multiple integral (or sum) of $$g(\mathbf{x})$$ weighted by the joint density
(or probability function).

## Covariance and correlation matrices

The **covariance** between two components measures the linear association
between them:

$$
\operatorname{Cov}(X_i,X_j)
=
\mathbb{E}\big[(X_i-\mu_i)(X_j-\mu_j)\big]
=
\mathbb{E}[X_iX_j]-\mu_i\mu_j.
$$

Collecting all covariances in a $$p\times p$$ matrix,

$$
\boldsymbol{\Sigma}
=
\operatorname{Cov}(\mathbf{X})
=
\mathbb{E}\big[(\mathbf{X}-\boldsymbol{\mu})(\mathbf{X}-\boldsymbol{\mu})^{\top}\big].
$$

The diagonal of $$\boldsymbol{\Sigma}$$ contains the variances
$$\sigma_i^{2}=\operatorname{Var}(X_i)$$. The matrix is **symmetric** and
**positive semidefinite**: for any $$\mathbf{a}\in\mathbb{R}^{p}$$,

$$
\mathbf{a}^{\top}\boldsymbol{\Sigma}\,\mathbf{a}
=
\operatorname{Var}(\mathbf{a}^{\top}\mathbf{X})\ge 0.
$$

The **correlation** normalizes the covariance to the range $$[-1,1]$$,

$$
\rho_{ij}=\frac{\operatorname{Cov}(X_i,X_j)}{\sigma_i\,\sigma_j},
$$

and the correlation matrix $$\mathbf{R}$$ has these quantities off the diagonal
and $$1$$ on the diagonal.

## Independence and uncorrelatedness

The components are **independent** if and only if the joint factors into the
marginals,

$$
f_{\mathbf{X}}(x_1,\ldots,x_p)=\prod_{i=1}^{p}f_{X_i}(x_i).
$$

Independence implies **uncorrelatedness** ($$\rho_{ij}=0$$ for $$i\neq j$$),
but the converse is false in general. A counterexample: if $$X\sim\mathcal{N}(0,1)$$
and $$Y=X^{2}$$, then $$\operatorname{Cov}(X,Y)=\mathbb{E}[X^{3}]=0$$, but $$X$$
and $$Y$$ are clearly dependent. Covariance only sees the **linear** relation.
The important exception is the multivariate normal vector, for which
uncorrelatedness is **equivalent** to independence.

## Linear combinations

For a matrix $$A$$ of dimension $$m\times p$$ and a vector $$\mathbf{b}$$,

$$
\mathbb{E}[A\mathbf{X}+\mathbf{b}]=A\boldsymbol{\mu}+\mathbf{b},
\qquad
\operatorname{Cov}(A\mathbf{X}+\mathbf{b})=A\,\boldsymbol{\Sigma}\,A^{\top}.
$$

In particular, the variance of a scalar linear combination is

$$
\operatorname{Var}(\mathbf{a}^{\top}\mathbf{X})
=
\mathbf{a}^{\top}\boldsymbol{\Sigma}\,\mathbf{a}
=
\sum_{i}a_i^{2}\sigma_i^{2}+\sum_{i\neq j}a_i a_j\operatorname{Cov}(X_i,X_j),
$$

and, for two variables,

$$
\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y).
$$

The covariance term vanishes when the variables are uncorrelated, recovering
the additivity of variance seen in lecture 1.5.

## Multivariate normal

The generalization of the normal to vectors. We write
$$\mathbf{X}\sim\mathcal{N}_p(\boldsymbol{\mu},\boldsymbol{\Sigma})$$ with
$$\boldsymbol{\Sigma}$$ positive definite, and

$$
\boxed{
f_{\mathbf{X}}(\mathbf{x})
=
\frac{1}{(2\pi)^{p/2}\,\lvert\boldsymbol{\Sigma}\rvert^{1/2}}
\exp\!\left(-\tfrac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^{\top}\boldsymbol{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})\right).
}
$$

Its properties make it central to multivariate statistics:

- every linear combination $$\mathbf{a}^{\top}\mathbf{X}$$ is univariate normal,
  and $$A\mathbf{X}+\mathbf{b}\sim\mathcal{N}(A\boldsymbol{\mu}+\mathbf{b},\,A\boldsymbol{\Sigma}A^{\top})$$;
- all marginals are normal;
- the conditionals are also normal. Partitioning
  $$\mathbf{X}=(\mathbf{X}_1,\mathbf{X}_2)$$,

$$
\mathbf{X}_1\mid\mathbf{X}_2=\mathbf{x}_2
\ \sim\
\mathcal{N}\big(\boldsymbol{\mu}_1+\boldsymbol{\Sigma}_{12}\boldsymbol{\Sigma}_{22}^{-1}(\mathbf{x}_2-\boldsymbol{\mu}_2),\ \boldsymbol{\Sigma}_{11}-\boldsymbol{\Sigma}_{12}\boldsymbol{\Sigma}_{22}^{-1}\boldsymbol{\Sigma}_{21}\big).
$$

The conditional mean is **linear** in $$\mathbf{x}_2$$, which is the origin of
linear regression, and the conditional variance does not depend on
$$\mathbf{x}_2$$;

- uncorrelatedness is equivalent to independence;
- the level curves of the density are ellipses centered at
  $$\boldsymbol{\mu}$$, with axes given by the eigenvectors of
  $$\boldsymbol{\Sigma}$$ and lengths proportional to the roots of the
  eigenvalues.
