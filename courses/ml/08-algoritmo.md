---
title: "2.4 - Optimization for Machine Learning"
course: ml
---

## Optimization for Machine Learning

So far we have been lucky: OLS and *ridge* have closed-form solutions. The
*lasso*, logistic regression, GLMs and neural networks do not. In those cases
we minimize the objective function $$J(\theta)$$, which is the empirical risk
(possibly penalized), by **iterative** methods. This lecture gathers the
calculus tools that underpin those methods and presents the two base
algorithms: gradient descent and its stochastic version.

### Contents

- Derivatives, gradient and Jacobian
- Hessian
- Taylor expansion
- Gradient descent
- Stochastic gradient descent
- Second-order methods

### Derivatives, gradient and Jacobian

Let $$J:\mathbb{R}^{p}\rightarrow\mathbb{R}$$ be the function to minimize. The
**gradient** gathers the partial derivatives,

$$
\nabla J(\theta)
=
\Big(\frac{\partial J}{\partial\theta_1},\ \ldots,\ \frac{\partial J}{\partial\theta_p}\Big)^{\top},
$$

and points in the direction of fastest increase of $$J$$;
$$-\nabla J(\theta)$$ points in the direction of fastest decrease. At a minimum
the first-order condition $$\nabla J(\theta^{*})=0$$ holds.

For a vector function $$F:\mathbb{R}^{p}\rightarrow\mathbb{R}^{m}$$, the
**Jacobian** is the $$m\times p$$ matrix

$$
\big[\mathbf{J}_F(\theta)\big]_{ij}=\frac{\partial F_i}{\partial\theta_j}.
$$

The gradient of a scalar function is the transpose of its Jacobian. The chain
rule in matrix form, $$\mathbf{J}_{F\circ G}=\mathbf{J}_F\,\mathbf{J}_G$$, is
exactly what backpropagation implements.

### Hessian

The **Hessian** is the $$p\times p$$ matrix of second derivatives,

$$
\big[\nabla^{2}J(\theta)\big]_{ij}=\frac{\partial^{2}J}{\partial\theta_i\,\partial\theta_j},
$$

symmetric when $$J$$ is twice continuously differentiable. It describes the
**curvature**. At a critical point: if $$\nabla^{2}J\succ 0$$ it is a local
minimum, if $$\nabla^{2}J\prec 0$$ it is a maximum, if it is indefinite it is a
saddle point.

When $$J$$ is **convex**, $$\nabla^{2}J\succeq 0$$ at every point and every
local minimum is global. This is the case of OLS, *ridge*, *lasso* and logistic
regression, which makes the optimization much simpler. The condition number
$$\kappa=\lambda_{\max}/\lambda_{\min}$$ of the Hessian governs the speed of
gradient descent: the larger $$\kappa$$, the slower the convergence.

### Taylor expansion

Near a point $$\theta$$,

$$
J(\theta+\Delta)
\approx
J(\theta)
+
\nabla J(\theta)^{\top}\Delta
+
\tfrac{1}{2}\,\Delta^{\top}\nabla^{2}J(\theta)\,\Delta.
$$

Truncating at first order,

$$
J(\theta+\Delta)\approx J(\theta)+\nabla J(\theta)^{\top}\Delta,
$$

we get the linear model that justifies gradient descent. Keeping the quadratic
term, we get the model that justifies Newton's method.

### Gradient descent

From the linear model, to decrease $$J$$ it is enough to walk in the direction
$$-\nabla J$$. The iteration is

$$
\boxed{\;\theta_{t+1}=\theta_t-\eta\,\nabla J(\theta_t)\;}
$$

where $$\eta>0$$ is the **learning rate** (the step size). An $$\eta$$ too
small converges slowly; too large makes the method oscillate or diverge. For
$$J$$ convex with $$L$$-Lipschitz gradient, any $$\eta\le 1/L$$ guarantees
convergence, with rate $$O(1/t)$$ in general and linear if $$J$$ is strongly
convex. Convergence gets slow when the Hessian is ill-conditioned, a situation
in which the gradient zigzags along long, narrow valleys. The usual
improvements are **momentum** (Polyak, Nesterov) and adaptive rates (AdaGrad,
RMSProp, Adam).

### Stochastic gradient descent

In machine learning the objective is an average over the data,

$$
J(\theta)=\frac{1}{n}\sum_{i=1}^{n}\ell_i(\theta),
\qquad
\ell_i(\theta)=L\big(y_i,f_\theta(x_i)\big),
$$

and computing $$\nabla J$$ requires sweeping the entire set, which is expensive
for large $$n$$. **Stochastic gradient descent** (SGD) replaces the full
gradient with an estimate based on a randomly drawn observation, or a
*mini-batch* $$B_t$$:

$$
\theta_{t+1}=\theta_t-\eta_t\,\nabla\ell_{i_t}(\theta_t),
\qquad
i_t\sim\text{Uniform}\{1,\ldots,n\}.
$$

Since $$\mathbb{E}\big[\nabla\ell_{i_t}(\theta)\big]=\nabla J(\theta)$$, the
step uses an **unbiased** estimator of the gradient, but with variance. The
consequences:

- each step is much cheaper, which allows scaling to huge $$n$$ and to
  streaming data;
- the noise prevents convergence to an exact point, so a decreasing step is
  used (with $$\sum_t\eta_t=\infty$$ and $$\sum_t\eta_t^{2}<\infty$$) or a
  small fixed step, which converges to a neighborhood of the minimum;
- in non-convex problems, such as neural networks, this same noise helps escape
  saddles and shallow local minima;
- the *mini-batch* size is a trade-off between variance (large batch) and cost
  per step (small batch), and moderate batches make better use of
  vectorization.

### Second-order methods

Minimizing the quadratic Taylor model in $$\Delta$$, the condition
$$\nabla J(\theta)+\nabla^{2}J(\theta)\,\Delta=0$$ gives the **Newton** step:

$$
\boxed{\;\theta_{t+1}=\theta_t-\big[\nabla^{2}J(\theta_t)\big]^{-1}\nabla J(\theta_t)\;}
$$

Its advantages are **quadratic** convergence near the optimum, much faster than
gradient descent, and invariance to the scale of the variables, which
eliminates the ill-conditioning problem. The costs: each step requires
$$O(p^{3})$$ to solve the system and $$O(p^{2})$$ memory for the Hessian, which
makes it infeasible for large $$p$$, and the method can diverge far from the
optimum when the Hessian is not positive definite (hence the damped and
trust-region variants).

The practical alternatives keep part of the gain at a lower cost:

- **Gauss-Newton** and **Levenberg-Marquardt** for nonlinear least squares,
  which approximate the Hessian by $$\mathbf{J}^{\top}\mathbf{J}$$;
- **quasi-Newton** methods (BFGS and the limited-memory version L-BFGS), which
  build an approximation of the inverse Hessian from the observed gradients, at
  cost $$O(p^{2})$$ or $$O(p)$$; L-BFGS is the standard for logistic regression
  and medium-sized convex problems;
- **IRLS** (iteratively reweighted least squares) for generalized linear
  models, which is Newton's method with the expected Hessian (*Fisher
  scoring*).

In practice: for convex objectives of moderate dimension, L-BFGS or Newton
converge in a few iterations; for neural networks, with $$p$$ in the millions,
SGD with momentum or Adam is used.
