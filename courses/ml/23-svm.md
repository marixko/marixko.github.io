---
title: "5.2 - Support Vector Machines"
course: ml
---

## Support vector machines

The previous lecture reduced the search for the maximum-margin hyperplane to a
constrained optimization problem. This lecture solves that problem: it presents
the primal formulation, the version with slack for non-separable data, and the
optimality conditions that give rise to the **support vectors**.

### Contents

- Constrained optimization
- Lagrangian
- KKT conditions
- Support vectors

### The primal problem

Maximizing the margin is equivalent to minimizing $$\lVert w\rVert$$, and it is
convenient to minimize $$\tfrac{1}{2}\lVert w\rVert^{2}$$:

$$
\min_{w,b}\ \frac{1}{2}\lVert w\rVert^{2}
\qquad\text{subject to}\qquad
y_i(w^{\top}x_i+b)\ge 1,\quad i=1,\ldots,n.
$$

It is a **convex quadratic** programming problem with linear constraints, so it
has a unique global minimum.

### Soft margin

Real data are rarely perfectly separable. One introduces a slack variable
$$\xi_i\ge 0$$ per point, allowing margin violations:

$$
\min_{w,b,\xi}\ \frac{1}{2}\lVert w\rVert^{2}+C\sum_{i=1}^{n}\xi_i
\qquad\text{subject to}\qquad
y_i(w^{\top}x_i+b)\ge 1-\xi_i,\quad \xi_i\ge 0.
$$

The parameter $$C>0$$ controls the trade-off between a wide margin and few
errors: large $$C$$ approaches the hard margin, small $$C$$ tolerates more
violations. Eliminating $$\xi_i$$, the problem is equivalent to

$$
\min_{w,b}\ \sum_{i=1}^{n}\max\!\big(0,\ 1-y_i(w^{\top}x_i+b)\big)+\frac{1}{2C}\lVert w\rVert^{2},
$$

that is, **ERM with the hinge loss** and $$L_2$$ penalty. The SVM is a case of
the regularization of the previous lectures.

### The Lagrangian

To handle the constraints, we form the Lagrangian with multipliers
$$\alpha_i\ge 0$$ (hard-margin case):

$$
\mathcal{L}(w,b,\alpha)
=
\frac{1}{2}\lVert w\rVert^{2}
-
\sum_{i=1}^{n}\alpha_i\big[\,y_i(w^{\top}x_i+b)-1\,\big].
$$

### KKT conditions

At the optimum the Karush-Kuhn-Tucker conditions hold:

- **stationarity**:
  $$\nabla_w\mathcal{L}=0\Rightarrow w=\sum_i\alpha_i y_i x_i$$ and
  $$\nabla_b\mathcal{L}=0\Rightarrow\sum_i\alpha_i y_i=0$$;
- **primal feasibility**: $$y_i(w^{\top}x_i+b)\ge 1$$;
- **dual feasibility**: $$\alpha_i\ge 0$$;
- **complementary slackness**:
  $$\alpha_i\big[\,y_i(w^{\top}x_i+b)-1\,\big]=0$$.

### Support vectors

Complementary slackness has a strong consequence. If a point is **outside** the
margin, then $$y_i(w^{\top}x_i+b)>1$$ and the condition forces $$\alpha_i=0$$:
that point **does not contribute** to $$w=\sum_i\alpha_i y_i x_i$$. Only the
points **on** the margin (or, in the soft version, inside it) have
$$\alpha_i>0$$. These are the **support vectors**, and the solution depends only
on them. That is why the SVM produces a sparse model, defined by a small subset
of the data. In the next lecture we use the same stationarity to write the
problem purely in terms of inner products and reach the *kernel trick*.
