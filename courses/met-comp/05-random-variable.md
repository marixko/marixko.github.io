---
title: 1.5 - Random variables
course: met-comp
---

## The concept of a random variable

In the previous lecture we worked with events, which are subsets of the sample
space $$\Omega$$. In practice, we are almost always interested in some
**number** associated with the outcome of the experiment: the sum of two dice,
the number of successes in $$n$$ trials, the time until a failure. The random
variable is the object that formalizes this passage from outcomes to numbers.

**Definition.** Given a probability space $$(\Omega,\mathcal{F},P)$$, a
**random variable** is a function

$$
X:\Omega\rightarrow\mathbb{R}
$$

such that, for every $$x\in\mathbb{R}$$, the set
$$\{\omega\in\Omega:X(\omega)\le x\}$$ belongs to $$\mathcal{F}$$, that is, it
is an event to which $$P$$ assigns a probability.

The name is a bit misleading: $$X$$ is neither "variable" nor "random"; it is a
deterministic function. The randomness comes from $$\omega$$, and $$X$$ merely
carries it onto the real line. We write, for example,
$$P(X\le x)$$ as shorthand for $$P(\{\omega:X(\omega)\le x\})$$.

## Cumulative distribution function

The most general way to describe a random variable is by its **cumulative
distribution function** (CDF):

$$
\boxed{
F_X(x)=P(X\le x),\qquad x\in\mathbb{R}.
}
$$

Every CDF satisfies:

* it is **non-decreasing**: if $$x_1\le x_2$$, then $$F_X(x_1)\le F_X(x_2)$$;
* $$\displaystyle\lim_{x\to-\infty}F_X(x)=0$$ and
  $$\displaystyle\lim_{x\to+\infty}F_X(x)=1$$;
* it is **right-continuous**.

From $$F_X$$ we recover the probability of any interval:

$$
P(a<X\le b)=F_X(b)-F_X(a).
$$

## Discrete random variables

A random variable is **discrete** when it takes values in a finite or
countable set $$\{x_1,x_2,\ldots\}$$. It is described by the **probability
function**

$$
p(x_i)=P(X=x_i),
$$

which satisfies $$p(x_i)\ge 0$$ and $$\sum_i p(x_i)=1$$. The CDF is the
cumulative sum,

$$
F_X(x)=\sum_{x_i\le x}p(x_i).
$$

Classic examples are the Bernoulli, binomial and Poisson distributions,
covered in the next lectures.

## Continuous random variables

A random variable is **continuous** when there exists a function
$$f_X\ge 0$$, called the **probability density function**, such that

$$
F_X(x)=\int_{-\infty}^{x}f_X(t)\,dt.
$$

In this case,

$$
P(a<X\le b)=\int_a^b f_X(x)\,dx,
\qquad
\int_{-\infty}^{+\infty}f_X(x)\,dx=1,
$$

and, at the points where $$f_X$$ is continuous, $$f_X(x)=F_X'(x)$$. Note that
$$f_X(x)$$ is **not** a probability: it can be greater than $$1$$, and what is
meaningful is the area under the curve. For a continuous variable,
$$P(X=x)=0$$ for every $$x$$. Classic examples are the uniform, exponential
and normal distributions.

## Expectation

The **expectation** (or expected value, or mean) of $$X$$ summarizes its
location. For a discrete variable,

$$
\mathbb{E}[X]=\sum_i x_i\,p(x_i),
$$

and for a continuous one,

$$
\mathbb{E}[X]=\int_{-\infty}^{+\infty}x\,f_X(x)\,dx,
$$

when the sum or integral converges absolutely. It is an average of the
possible values weighted by their probabilities.

For a function $$g$$ of $$X$$, there is no need to find the distribution of
$$g(X)$$: the **law of the unconscious statistician** holds,

$$
\mathbb{E}[g(X)]=\sum_i g(x_i)\,p(x_i)
\qquad\text{or}\qquad
\mathbb{E}[g(X)]=\int_{-\infty}^{+\infty}g(x)\,f_X(x)\,dx.
$$

Expectation is **linear**: for constants $$a$$ and $$b$$,

$$
\mathbb{E}[aX+b]=a\,\mathbb{E}[X]+b,
$$

and, for any variables $$X$$ and $$Y$$ (independent or not),

$$
\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y].
$$

## Variance and standard deviation

The **variance** measures the dispersion of $$X$$ around its mean
$$\mu=\mathbb{E}[X]$$:

$$
\boxed{
\operatorname{Var}(X)=\mathbb{E}\big[(X-\mu)^2\big].
}
$$

Expanding the square and using linearity, we get the more commonly used
computational form,

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-\big(\mathbb{E}[X]\big)^2.
$$

The **standard deviation** is $$\sigma_X=\sqrt{\operatorname{Var}(X)}$$, in the
same units as $$X$$. For constants $$a$$ and $$b$$,

$$
\operatorname{Var}(aX+b)=a^2\,\operatorname{Var}(X),
$$

that is, shifting the variable does not change the dispersion, and rescaling it
multiplies the variance by the square of the factor. When $$X$$ and $$Y$$ are
**independent**,

$$
\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y).
$$

## Moments

The expectations of powers of $$X$$ are the **moments** of the distribution.
The moment of order $$k$$ about the origin is $$\mathbb{E}[X^k]$$, and the
**central** moment of order $$k$$ is $$\mathbb{E}[(X-\mu)^k]$$. The first four
central moments describe, respectively, location (the first is zero by
construction), dispersion (the variance), skewness and kurtosis, concepts
introduced in lecture 1.1. Many distributions are completely determined by the
sequence of their moments.
