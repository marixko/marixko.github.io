---
title: 1.8 - Main discrete distributions
course: met-comp
---

## Main discrete distributions

In the previous lectures we built the general tools: CDF, probability function,
expectation and variance. Now we catalog the most common discrete families.
Each one corresponds to a specific counting mechanism, and it is worth
recognizing the mechanism before applying the formula.

### Contents

- Discrete uniform
- Bernoulli
- Binomial
- Geometric
- Negative binomial
- Hypergeometric
- Poisson

## Discrete uniform

All $$N$$ possible values have the same probability. If
$$X\in\{1,2,\ldots,N\}$$,

$$
p(k)=\frac{1}{N},\qquad k=1,\ldots,N,
$$

$$
\mathbb{E}[X]=\frac{N+1}{2},
\qquad
\operatorname{Var}(X)=\frac{N^{2}-1}{12}.
$$

It is the model for a fair die and an unbiased draw.

## Bernoulli

A single trial with two outcomes: **success**, with probability $$p$$, and
**failure**, with probability $$1-p$$. Coding $$X=1$$ for success and
$$X=0$$ for failure,

$$
p(x)=p^{x}(1-p)^{1-x},\qquad x\in\{0,1\},
$$

$$
\mathbb{E}[X]=p,
\qquad
\operatorname{Var}(X)=p(1-p).
$$

The variance is maximal at $$p=1/2$$ and zero at $$p\in\{0,1\}$$. The Bernoulli
is the building block of the next distributions.

## Binomial

Number of successes in $$n$$ **independent** Bernoulli trials, all with the same
probability $$p$$. We write $$X\sim\text{Binomial}(n,p)$$ and
$$X=\sum_{i=1}^{n}X_i$$ with $$X_i$$ independent Bernoulli$$(p)$$.

$$
\boxed{
p(k)=\binom{n}{k}p^{k}(1-p)^{\,n-k},\qquad k=0,1,\ldots,n.
}
$$

By linearity of expectation and by independence,

$$
\mathbb{E}[X]=np,
\qquad
\operatorname{Var}(X)=np(1-p).
$$

The sum of independent binomials with the same $$p$$ is binomial. The case
$$n=1$$ is the Bernoulli.

## Geometric

Number of Bernoulli trials until the **first success**, counting the success
itself. So $$X\in\{1,2,\ldots\}$$ and

$$
p(k)=(1-p)^{\,k-1}p,
$$

$$
\mathbb{E}[X]=\frac{1}{p},
\qquad
\operatorname{Var}(X)=\frac{1-p}{p^{2}},
\qquad
F_X(k)=1-(1-p)^{k}.
$$

The geometric is the only discrete distribution with the **memoryless**
property,

$$
P(X>s+t\mid X>s)=P(X>t),
$$

that is, the number of trials already run without success does not change the
distribution of what remains. An alternative convention counts the failures
**before** the first success, giving support $$\{0,1,\ldots\}$$, $$p(k)=(1-p)^{k}p$$
and $$\mathbb{E}[X]=(1-p)/p$$.

## Negative binomial

Number of trials until the $$r$$-th success. With support
$$\{r,r+1,\ldots\}$$,

$$
p(k)=\binom{k-1}{r-1}(1-p)^{\,k-r}p^{r},
$$

$$
\mathbb{E}[X]=\frac{r}{p},
\qquad
\operatorname{Var}(X)=\frac{r(1-p)}{p^{2}}.
$$

It is the sum of $$r$$ independent geometrics, and the case $$r=1$$ is the
geometric. Outside the trials context, it also serves as a count model with
**overdispersion** (variance greater than the mean), generalizing the Poisson.

## Hypergeometric

Sampling **without replacement**. In a population of $$N$$ objects, $$K$$ are of
the "success" type; $$n$$ objects are drawn without replacement and $$X$$ counts
the successes in the sample:

$$
p(k)=\frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}},
$$

$$
\mathbb{E}[X]=n\,\frac{K}{N},
\qquad
\operatorname{Var}(X)=n\,\frac{K}{N}\cdot\frac{N-K}{N}\cdot\frac{N-n}{N-1}.
$$

The factor $$\dfrac{N-n}{N-1}$$ is the **finite-population correction**: it
makes the variance smaller than that of a binomial with $$p=K/N$$. When
$$N\to\infty$$ with $$K/N\to p$$ fixed, the hypergeometric converges to the
Binomial$$(n,p)$$, because replacement stops mattering.

## Poisson

Number of events occurring in a fixed interval of time or space, when they
happen independently at an average rate $$\lambda$$. With support
$$\{0,1,2,\ldots\}$$,

$$
\boxed{
p(k)=\frac{\lambda^{k}e^{-\lambda}}{k!}.
}
$$

Its signature is the equality of mean and variance,

$$
\mathbb{E}[X]=\operatorname{Var}(X)=\lambda.
$$

The sum of independent Poissons is Poisson, with parameter
$$\lambda_1+\lambda_2$$. The Poisson appears as the **limit of the binomial**:
if $$n\to\infty$$ and $$p\to 0$$ such that $$np\to\lambda$$, then
$$\text{Binomial}(n,p)\to\text{Poisson}(\lambda)$$. This is why it models
counts with large $$n$$ and small $$p$$, such as radioactive decays or photon
counts.

## Summary table

| Distribution | Support | $$p(k)$$ | $$\mathbb{E}[X]$$ | $$\operatorname{Var}(X)$$ |
| --- | --- | --- | --- | --- |
| Uniform$$(N)$$ | $$1,\ldots,N$$ | $$1/N$$ | $$\tfrac{N+1}{2}$$ | $$\tfrac{N^{2}-1}{12}$$ |
| Bernoulli$$(p)$$ | $$0,1$$ | $$p^{k}(1-p)^{1-k}$$ | $$p$$ | $$p(1-p)$$ |
| Binomial$$(n,p)$$ | $$0,\ldots,n$$ | $$\binom{n}{k}p^{k}(1-p)^{n-k}$$ | $$np$$ | $$np(1-p)$$ |
| Geometric$$(p)$$ | $$1,2,\ldots$$ | $$(1-p)^{k-1}p$$ | $$1/p$$ | $$(1-p)/p^{2}$$ |
| Neg. binomial$$(r,p)$$ | $$r,r{+}1,\ldots$$ | $$\binom{k-1}{r-1}(1-p)^{k-r}p^{r}$$ | $$r/p$$ | $$r(1-p)/p^{2}$$ |
| Hypergeom.$$(N,K,n)$$ | $$0,\ldots,n$$ | $$\binom{K}{k}\binom{N-K}{n-k}/\binom{N}{n}$$ | $$n\tfrac{K}{N}$$ | $$n\tfrac{K}{N}\tfrac{N-K}{N}\tfrac{N-n}{N-1}$$ |
| Poisson$$(\lambda)$$ | $$0,1,2,\ldots$$ | $$\lambda^{k}e^{-\lambda}/k!$$ | $$\lambda$$ | $$\lambda$$ |

## Relations between the distributions

- The Bernoulli is the Binomial with $$n=1$$; the Binomial is the sum of $$n$$
  independent Bernoullis.
- The Geometric is the Negative binomial with $$r=1$$; the Negative binomial is
  the sum of $$r$$ independent geometrics.
- The Hypergeometric tends to the Binomial as the population grows
  ($$N\to\infty$$, $$K/N\to p$$).
- The Binomial tends to the Poisson as $$n\to\infty$$, $$p\to 0$$ and
  $$np\to\lambda$$.
