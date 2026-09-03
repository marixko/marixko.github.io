---
title: 1.7 - Probability and density functions
course: met-comp
---

## From the CDF to the probability functions

The cumulative distribution function of the previous lecture describes any
random variable, but it is not always the most convenient form to work with.
For the discrete case we use the **probability function**, and for the
continuous case the **probability density function**. This lecture covers both
in detail and the operations we perform with them.

## Probability function (discrete case)

**Definition.** If $$X$$ takes values in a countable set
$$\{x_1,x_2,\ldots\}$$, its **probability function** is

$$
p(x)=P(X=x).
$$

It satisfies

$$
p(x_i)\ge 0
\qquad\text{and}\qquad
\sum_{i}p(x_i)=1.
$$

The relation with the CDF is direct: $$p(x_i)$$ is the jump of $$F_X$$ at
$$x_i$$,

$$
p(x_i)=F_X(x_i)-F_X(x_i^{-}),
\qquad
F_X(x)=\sum_{x_i\le x}p(x_i),
$$

and the probability of any event is a sum,

$$
P(X\in A)=\sum_{x_i\in A}p(x_i).
$$

For example, for $$X\sim\text{Binomial}(n,\theta)$$,

$$
p(k)=\binom{n}{k}\theta^{k}(1-\theta)^{\,n-k},
\qquad k=0,1,\ldots,n.
$$

## Probability density function (continuous case)

**Definition.** If there exists a function $$f_X\ge 0$$ such that

$$
P(a<X\le b)=\int_a^b f_X(x)\,dx
$$

for all $$a\le b$$, we say that $$X$$ is continuous and $$f_X$$ is its
**probability density function**. It satisfies

$$
f_X(x)\ge 0
\qquad\text{and}\qquad
\int_{-\infty}^{+\infty}f_X(x)\,dx=1.
$$

The relation with the CDF is one of integration and differentiation:

$$
F_X(x)=\int_{-\infty}^{x}f_X(t)\,dt,
\qquad
f_X(x)=F_X'(x)
$$

at the points where $$f_X$$ is continuous.

**Caution:** $$f_X(x)$$ is **not** a probability. It can be greater than $$1$$,
and $$P(X=x)=0$$ for every $$x$$. What has an interpretation is the density
times an infinitesimal length,

$$
P(x<X\le x+dx)\approx f_X(x)\,dx,
$$

or, equivalently, the area under the curve over an interval. Two examples:

$$
X\sim\text{Exponential}(\lambda):\qquad f_X(x)=\lambda e^{-\lambda x},\quad x\ge 0,
$$

$$
X\sim\mathcal{N}(\mu,\sigma^{2}):\qquad
f_X(x)=\frac{1}{\sqrt{2\pi}\,\sigma}\exp\!\left(-\frac{(x-\mu)^{2}}{2\sigma^{2}}\right).
$$

## Support

The **support** of $$X$$ is the set of values with positive probability or
density,

$$
\operatorname{supp}(X)=\{\,x:\ p(x)>0\,\}
\quad\text{or}\quad
\operatorname{supp}(X)=\{\,x:\ f_X(x)>0\,\}.
$$

Outside the support, all the sums and integrals above can be restricted.

## Expectation and variance

Recalling lecture 1.5, for a function $$g$$ of $$X$$,

$$
\mathbb{E}[g(X)]=\sum_i g(x_i)\,p(x_i)
\qquad\text{or}\qquad
\mathbb{E}[g(X)]=\int_{-\infty}^{+\infty}g(x)\,f_X(x)\,dx,
$$

and, in particular, $$\mu=\mathbb{E}[X]$$ and
$$\operatorname{Var}(X)=\mathbb{E}[(X-\mu)^{2}]=\mathbb{E}[X^{2}]-\mu^{2}$$.
The entire numerical characterization of the distribution (mean, variance,
moments, quantiles) can be read from the probability function or the density.

## Joint distribution

When we study two variables at once, $$p(x,y)=P(X=x,Y=y)$$ is the **joint
probability function** in the discrete case, and $$f_{X,Y}(x,y)$$ the **joint
density** in the continuous case, with

$$
P\big((X,Y)\in A\big)=\iint_{A}f_{X,Y}(x,y)\,dx\,dy.
$$

The distributions of each variable on its own, called **marginals**, are
obtained by summing or integrating out the other:

$$
p_X(x)=\sum_{y}p(x,y),
\qquad
f_X(x)=\int_{-\infty}^{+\infty}f_{X,Y}(x,y)\,dy.
$$

The **conditional density** of $$Y$$ given $$X=x$$ (with $$f_X(x)>0$$) is

$$
f_{Y\mid X}(y\mid x)=\frac{f_{X,Y}(x,y)}{f_X(x)},
$$

the continuous analogue of the conditional probability of lecture 1.4. The
variables are **independent** if and only if the joint factors into the
marginals,

$$
\boxed{
f_{X,Y}(x,y)=f_X(x)\,f_Y(y)\quad\text{for all }x,y.
}
$$

## Change of variables

If $$Y=g(X)$$ with $$g$$ monotone and differentiable, the density of $$Y$$ is
obtained from that of $$X$$ by the change-of-variables formula,

$$
f_Y(y)=f_X\big(g^{-1}(y)\big)\left\lvert\frac{d}{dy}\,g^{-1}(y)\right\rvert.
$$

The factor with the derivative corrects the "compression" or "dilation" of the
axis caused by $$g$$. For example, with $$Y=aX+b$$ and $$a\neq 0$$,
$$f_Y(y)=\frac{1}{\lvert a\rvert}f_X\!\big((y-b)/a\big)$$. In the discrete case
there is no correction factor: just sum the probabilities of the $$x$$ values
that map to each value of $$y$$.
