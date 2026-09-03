---
title: 1.9 - Main continuous distributions
course: met-comp
---

## Main continuous distributions

Just as we did with the discrete ones, here we catalog the most used continuous
families. Some model quantities directly (time, length, error); others, like
chi-square, $$t$$ and $$F$$, arise as distributions of statistics computed from
normal samples, and will be essential in the inference part.

### Contents

- Uniform
- Exponential
- Gamma
- Normal
- Chi-square
- Student's $$t$$
- Snedecor's $$F$$
- Beta

## Uniform

All points of an interval $$[a,b]$$ are equally likely:

$$
f_X(x)=\frac{1}{b-a},\quad a\le x\le b,
\qquad
F_X(x)=\frac{x-a}{b-a},\quad a\le x\le b,
$$

$$
\mathbb{E}[X]=\frac{a+b}{2},
\qquad
\operatorname{Var}(X)=\frac{(b-a)^{2}}{12}.
$$

The Uniform$$(0,1)$$ plays a central role in simulation: by the inverse method
of lecture 1.6, applying the quantile function of any distribution to a
Uniform$$(0,1)$$ produces a sample from that distribution.

## Exponential

Time until an event occurs in a process where events happen independently at an
average rate $$\lambda$$. With support $$x>0$$,

$$
f_X(x)=\lambda e^{-\lambda x},
\qquad
F_X(x)=1-e^{-\lambda x},
$$

$$
\mathbb{E}[X]=\frac{1}{\lambda},
\qquad
\operatorname{Var}(X)=\frac{1}{\lambda^{2}}.
$$

It is the only **continuous** distribution with the **memoryless** property,

$$
P(X>s+t\mid X>s)=P(X>t).
$$

There is a duality with the Poisson: if the number of events per unit time is
Poisson$$(\lambda)$$, then the intervals between consecutive events are
Exponential$$(\lambda)$$.

## Gamma

Generalizes the exponential. For integer $$\alpha$$, it is the time until the
$$\alpha$$-th event, that is, the sum of $$\alpha$$ independent exponentials.
With shape parameter $$\alpha>0$$ and rate $$\lambda>0$$,

$$
f_X(x)=\frac{\lambda^{\alpha}}{\Gamma(\alpha)}\,x^{\alpha-1}e^{-\lambda x},
\qquad x>0,
$$

where $$\Gamma(\alpha)=\int_{0}^{\infty}t^{\alpha-1}e^{-t}\,dt$$ is the gamma
function, with $$\Gamma(n)=(n-1)!$$ for integer $$n$$. The moments are

$$
\mathbb{E}[X]=\frac{\alpha}{\lambda},
\qquad
\operatorname{Var}(X)=\frac{\alpha}{\lambda^{2}}.
$$

The case $$\alpha=1$$ recovers the exponential. The sum of independent Gammas
with the same $$\lambda$$ is Gamma.

## Normal

The most important distribution in statistics. We write
$$X\sim\mathcal{N}(\mu,\sigma^{2})$$ and

$$
\boxed{
f_X(x)=\frac{1}{\sqrt{2\pi}\,\sigma}\exp\!\left(-\frac{(x-\mu)^{2}}{2\sigma^{2}}\right).
}
$$

It is symmetric about $$\mu$$, unimodal, and

$$
\mathbb{E}[X]=\mu,
\qquad
\operatorname{Var}(X)=\sigma^{2}.
$$

**Standardization.** The transformation $$Z=(X-\mu)/\sigma$$ gives the
**standard normal** $$\mathcal{N}(0,1)$$, whose CDF is denoted $$\Phi$$. Any
normal probability reduces to $$\Phi$$. By symmetry, about $$68\%$$, $$95\%$$
and $$99.7\%$$ of the mass lie within one, two and three standard deviations of
the mean.

Every linear combination of independent normals is normal. And, by the
**central limit theorem**, the sum (or mean) of many independent variables from
any distribution, with finite variance, is approximately normal. That is why
the normal shows up in so many contexts.

## Chi-square

Sum of $$k$$ squared standard normals:

$$
X=\sum_{i=1}^{k}Z_i^{2}\ \sim\ \chi^{2}_{k},
\qquad Z_i\sim\mathcal{N}(0,1)\ \text{independent}.
$$

It is a case of the Gamma, with $$\alpha=k/2$$ and $$\lambda=1/2$$, and

$$
\mathbb{E}[X]=k,
\qquad
\operatorname{Var}(X)=2k.
$$

It appears in the distribution of the sample variance of normal data,
$$(n-1)S^{2}/\sigma^{2}\sim\chi^{2}_{n-1}$$, and is the basis of goodness-of-fit
and independence tests.

## Student's $$t$$

Ratio of a standard normal to the square root of a normalized chi-square,
independent:

$$
T=\frac{Z}{\sqrt{V/k}},
\qquad Z\sim\mathcal{N}(0,1),\quad V\sim\chi^{2}_{k}.
$$

It is symmetric about zero and has **heavier tails** than the normal. For
$$k>1$$, $$\mathbb{E}[T]=0$$; for $$k>2$$,
$$\operatorname{Var}(T)=k/(k-2)$$. As $$k\to\infty$$, the $$t$$ converges to
the $$\mathcal{N}(0,1)$$. It is the distribution used for inference about means
when the population variance is unknown.

## Snedecor's $$F$$

Ratio of two normalized chi-squares, independent:

$$
F=\frac{V_1/k_1}{V_2/k_2},
\qquad V_i\sim\chi^{2}_{k_i}.
$$

It has support $$(0,\infty)$$, is right-skewed and, for $$k_2>2$$,
$$\mathbb{E}[F]=k_2/(k_2-2)$$. It is used to compare variances and in analysis
of variance. The relations $$t_k^{2}=F_{1,k}$$ and
$$1/F_{k_1,k_2}\sim F_{k_2,k_1}$$ hold.

## Beta

Distribution on $$[0,1]$$, natural for modeling proportions and probabilities.
With shape parameters $$\alpha,\beta>0$$,

$$
f_X(x)=\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)},
\qquad
B(\alpha,\beta)=\frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)},
$$

$$
\mathbb{E}[X]=\frac{\alpha}{\alpha+\beta},
\qquad
\operatorname{Var}(X)=\frac{\alpha\beta}{(\alpha+\beta)^{2}(\alpha+\beta+1)}.
$$

The shape is very flexible: it can be U-shaped, bell-shaped or monotone. The
case $$\alpha=\beta=1$$ is the Uniform$$(0,1)$$.

## Summary table

| Distribution | Support | $$f_X(x)$$ | $$\mathbb{E}[X]$$ | $$\operatorname{Var}(X)$$ |
| --- | --- | --- | --- | --- |
| Uniform$$(a,b)$$ | $$[a,b]$$ | $$\dfrac{1}{b-a}$$ | $$\dfrac{a+b}{2}$$ | $$\dfrac{(b-a)^{2}}{12}$$ |
| Exponential$$(\lambda)$$ | $$(0,\infty)$$ | $$\lambda e^{-\lambda x}$$ | $$1/\lambda$$ | $$1/\lambda^{2}$$ |
| Gamma$$(\alpha,\lambda)$$ | $$(0,\infty)$$ | $$\dfrac{\lambda^{\alpha}}{\Gamma(\alpha)}x^{\alpha-1}e^{-\lambda x}$$ | $$\alpha/\lambda$$ | $$\alpha/\lambda^{2}$$ |
| Normal$$(\mu,\sigma^{2})$$ | $$\mathbb{R}$$ | $$\dfrac{1}{\sqrt{2\pi}\sigma}e^{-(x-\mu)^{2}/2\sigma^{2}}$$ | $$\mu$$ | $$\sigma^{2}$$ |
| Chi-square$$(k)$$ | $$(0,\infty)$$ | Gamma$$(k/2,\,1/2)$$ | $$k$$ | $$2k$$ |
| Student's $$t$$$$(k)$$ | $$\mathbb{R}$$ | $$Z/\sqrt{V/k}$$ | $$0$$ $$(k>1)$$ | $$k/(k-2)$$ $$(k>2)$$ |
| $$F(k_1,k_2)$$ | $$(0,\infty)$$ | $$\dfrac{V_1/k_1}{V_2/k_2}$$ | $$\dfrac{k_2}{k_2-2}$$ $$(k_2>2)$$ | $$\dfrac{2k_2^{2}(k_1+k_2-2)}{k_1(k_2-2)^{2}(k_2-4)}$$ |
| Beta$$(\alpha,\beta)$$ | $$[0,1]$$ | $$\dfrac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}$$ | $$\dfrac{\alpha}{\alpha+\beta}$$ | $$\dfrac{\alpha\beta}{(\alpha+\beta)^{2}(\alpha+\beta+1)}$$ |

## Relations between the distributions

- The Exponential is the Gamma with $$\alpha=1$$; the sum of independent
  exponentials is Gamma.
- The $$\chi^{2}_{k}$$ is the Gamma$$(k/2,1/2)$$ and the sum of $$k$$ squared
  standard normals.
- The $$t_k$$ is a normal divided by the root of a normalized $$\chi^{2}_k$$,
  and $$t_k\to\mathcal{N}(0,1)$$ as $$k\to\infty$$.
- The $$F$$ is the ratio of two normalized $$\chi^{2}$$, and $$t_k^{2}=F_{1,k}$$.
- The Beta$$(1,1)$$ is the Uniform$$(0,1)$$.
- The Normal is the limit (central limit theorem) of sums of independent
  variables with finite variance.
