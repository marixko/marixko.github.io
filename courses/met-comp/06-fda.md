---
title: 1.6 - Cumulative distribution function
course: met-comp
---

## Cumulative distribution function

In the previous lecture we saw that discrete random variables are described by
the probability function and continuous ones by the density. The **cumulative
distribution function** (CDF) is the description that works for **both**, and
also for variables that mix the two natures. That is why it is the central
object of this lecture.

**Definition.** The CDF of a random variable $$X$$ is

$$
\boxed{
F_X(x)=P(X\le x),\qquad x\in\mathbb{R}.
}
$$

## Characterizing properties

Every CDF satisfies the three properties below, and, conversely, any function
with these three properties is the CDF of some random variable.

1. **Monotonicity.** $$F_X$$ is non-decreasing: if $$x_1\le x_2$$, then
   $$F_X(x_1)\le F_X(x_2)$$.
2. **Limits.**
   $$\displaystyle\lim_{x\to-\infty}F_X(x)=0$$ and
   $$\displaystyle\lim_{x\to+\infty}F_X(x)=1$$.
3. **Right-continuity.**
   $$\displaystyle\lim_{h\to 0^{+}}F_X(x+h)=F_X(x)$$ for every $$x$$.

## Probabilities from the CDF

Every question about $$X$$ can be answered from $$F_X$$. Denoting the left limit
by $$F_X(x^{-})=\lim_{h\to 0^{+}}F_X(x-h)$$,

$$
P(X\le b)=F_X(b),
\qquad
P(X>a)=1-F_X(a),
$$

$$
P(a<X\le b)=F_X(b)-F_X(a),
$$

$$
P(X<x)=F_X(x^{-}),
\qquad
P(X=x)=F_X(x)-F_X(x^{-}).
$$

The last identity is important: $$P(X=x)$$ is the **jump size** of $$F_X$$ at
$$x$$. If $$F_X$$ is continuous at $$x$$, the jump is zero and $$P(X=x)=0$$.
Hence $$X$$ is continuous if and only if $$F_X$$ is continuous, and each
discontinuity of $$F_X$$ corresponds to a value with positive probability.

## CDF of discrete variables

For a discrete variable taking the values $$x_1<x_2<\cdots$$ with
probabilities $$p(x_i)$$,

$$
F_X(x)=\sum_{x_i\le x}p(x_i).
$$

The graph is a **step function**: constant between consecutive values, with a
jump of height $$p(x_i)$$ at each $$x_i$$. For example, for
$$X\sim\text{Bernoulli}(p)$$,

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
1-p, & 0\le x<1,\\
1, & x\ge 1.
\end{cases}
$$

## CDF of continuous variables

For a continuous variable with density $$f_X$$,

$$
F_X(x)=\int_{-\infty}^{x}f_X(t)\,dt,
$$

which is a continuous function, differentiable almost everywhere, with
$$F_X'(x)=f_X(x)$$ where $$f_X$$ is continuous. Two examples:

$$
X\sim\text{Uniform}(a,b):\qquad
F_X(x)=
\begin{cases}
0, & x<a,\\[2pt]
\dfrac{x-a}{b-a}, & a\le x\le b,\\[6pt]
1, & x>b.
\end{cases}
$$

$$
X\sim\text{Exponential}(\lambda):\qquad
F_X(x)=1-e^{-\lambda x},\quad x\ge 0.
$$

## Quantiles and the quantile function

The CDF can be "inverted" to answer the opposite question: what value of
$$x$$ leaves a given proportion of the distribution to its left? The **quantile
function** is the generalized inverse

$$
Q_X(q)=\inf\{\,x:\ F_X(x)\ge q\,\},\qquad q\in(0,1).
$$

When $$F_X$$ is continuous and strictly increasing, $$Q_X=F_X^{-1}$$. The median
is $$Q_X(0.5)$$, and the first and third quartiles are $$Q_X(0.25)$$ and
$$Q_X(0.75)$$, recovering the position measures of lecture 1.1.

## Probability integral transform

A result that connects the CDF to simulation. If $$X$$ is continuous with CDF
$$F_X$$, then

$$
U=F_X(X)\ \sim\ \text{Uniform}(0,1).
$$

The converse is the **inverse method**: if $$U\sim\text{Uniform}(0,1)$$, then
$$Q_X(U)$$ has CDF $$F_X$$. This lets us generate samples from **any**
distribution from uniform numbers: just apply $$Q_X$$. For example, for the
exponential, $$F_X(x)=1-e^{-\lambda x}$$ gives
$$Q_X(u)=-\frac{1}{\lambda}\log(1-u)$$, and $$-\frac{1}{\lambda}\log(1-U)$$ is
an exponential. We will return to this in the computational part of the course.

## Empirical CDF

Given a sample $$x_1,\ldots,x_n$$, the **empirical CDF** is

$$
\hat F_n(x)=\frac{1}{n}\sum_{i=1}^{n}\mathbf{1}[\,x_i\le x\,],
$$

that is, the proportion of observations less than or equal to $$x$$. For each
fixed $$x$$, $$n\,\hat F_n(x)\sim\text{Binomial}\big(n,F_X(x)\big)$$, so that
$$\hat F_n(x)$$ is an unbiased estimator of $$F_X(x)$$. The Glivenko-Cantelli
theorem guarantees more: the convergence is **uniform**,

$$
\sup_{x}\big\lvert\hat F_n(x)-F_X(x)\big\rvert\ \longrightarrow\ 0
$$

almost surely as $$n\to\infty$$. The empirical CDF is the basis of
goodness-of-fit tests (such as Kolmogorov-Smirnov) and of quantile-quantile
plots.
