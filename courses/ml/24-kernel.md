---
title: "5.3 - Duality and the Kernel Trick"
course: ml
---

## Duality and the kernel trick

Substituting the stationarity conditions of the previous lecture back into the
Lagrangian, we obtain a formulation of the SVM in which the data appear **only
through inner products**. Replacing that inner product by a *kernel* function
carries the linear SVM into very high-dimensional *feature* spaces, at no extra
cost.

### Contents

- Dual optimization
- The kernel trick
- Linear, polynomial and RBF kernels
- Mercer's condition

### The dual formulation

From stationarity, $$w=\sum_i\alpha_i y_i x_i$$ and $$\sum_i\alpha_i y_i=0$$.
Substituting into $$\mathcal{L}$$ and simplifying, the problem becomes to
maximize over the multipliers:

$$
\max_{\alpha}\ \sum_{i=1}^{n}\alpha_i
-
\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}\alpha_i\alpha_j\,y_i y_j\,x_i^{\top}x_j
$$

subject to $$\alpha_i\ge 0$$ (and $$\alpha_i\le C$$ in the soft margin) and
$$\sum_i\alpha_i y_i=0$$. It is again a convex quadratic program, now in
$$\alpha\in\mathbb{R}^{n}$$.

The prediction for a new point also uses only inner products:

$$
f(x)=\sum_{i=1}^{n}\alpha_i y_i\,x_i^{\top}x+b,
$$

and the sum is effectively over the support vectors.

### The kernel trick

The data enter **only** through $$x_i^{\top}x_j$$. Suppose we wanted to first
map each point by a nonlinear transformation
$$\phi:\mathbb{R}^{p}\rightarrow\mathcal{F}$$ and then apply the linear SVM in
$$\mathcal{F}$$. We would need only $$\phi(x_i)^{\top}\phi(x_j)$$. A **kernel
function** is precisely

$$
K(x,z)=\phi(x)^{\top}\phi(z),
$$

and if we can compute $$K$$ directly, we never need to build $$\phi(x)$$, which
may have infinite dimension. It is enough to replace every $$x_i^{\top}x_j$$ by
$$K(x_i,x_j)$$ in the dual problem and in the prediction:

$$
f(x)=\sum_{i}\alpha_i y_i\,K(x_i,x)+b.
$$

### Mercer's condition

A symmetric function $$K$$ is a valid *kernel* (that is, there is some $$\phi$$
such that $$K(x,z)=\phi(x)^{\top}\phi(z)$$) if and only if, for any finite set
of points, the Gram matrix $$[K(x_i,x_j)]_{ij}$$ is **positive semidefinite**.
Valid kernels are closed under sum, product and positive scaling, which allows
building new ones from the basic ones.

### Examples of kernels

**Linear.**

$$
K(x,z)=x^{\top}z.
$$

Recovers the linear SVM; $$\phi$$ is the identity.

**Polynomial.**

$$
K(x,z)=(x^{\top}z+c)^{d}.
$$

The *feature* space contains all monomials of degree up to $$d$$; $$c$$ weights
the lower-degree terms.

**RBF (Gaussian).**

$$
K(x,z)=\exp\!\left(-\frac{\lVert x-z\rVert^{2}}{2\sigma^{2}}\right).
$$

The corresponding *feature* space has **infinite dimension**. The parameter
$$\sigma$$ (bandwidth) controls the scale: small $$\sigma$$ gives very flexible
boundaries (risk of overfitting), large $$\sigma$$ approaches a linear model. It
is the most common general-purpose *kernel*.

### Beyond the SVM

The same argument holds for any method that depends on the data only through
inner products: *ridge* regression becomes **kernel ridge regression**, and the
Bayesian limit of that construction is the **Gaussian process**. The
*representer theorem* guarantees, in general, that the solution of a regularized
problem in a Hilbert space with a reproducing *kernel* has the form
$$f(\cdot)=\sum_i c_i K(x_i,\cdot)$$, that is, it lives in the space spanned by
the training data.
