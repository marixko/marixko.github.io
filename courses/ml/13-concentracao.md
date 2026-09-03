---
title: "3.3 - Concentration Inequalities"
course: ml
---

## Concentration inequalities

The law of large numbers says that the sample mean converges to the true mean,
but it does not say **how fast**. Concentration inequalities answer that: they
bound the probability that a sample mean is far from its expected value, for
finite $$n$$. They are the technical tool behind all generalization bounds.

### Contents

- Law of large numbers
- Markov and Chebyshev
- Hoeffding
- The Chernoff method
- Union bound
- From concentration to generalization

### From the law of large numbers to finite rates

Let $$X_1,\ldots,X_n$$ be independent and identically distributed with mean
$$\mu$$, and $$\hat\mu=\frac{1}{n}\sum_i X_i$$. The weak law guarantees
$$\hat\mu\xrightarrow{P}\mu$$. We want something stronger: an explicit bound for
$$P(\lvert\hat\mu-\mu\rvert\ge\epsilon)$$ as a function of $$n$$ and
$$\epsilon$$.

### Markov and Chebyshev

For a **non-negative** variable $$Z\ge 0$$ and $$t>0$$, **Markov**'s inequality
says

$$
P(Z\ge t)\le\frac{\mathbb{E}[Z]}{t}.
$$

Applying it to $$Z=(W-\mathbb{E}W)^{2}$$ gives **Chebyshev**'s inequality,

$$
P\big(\lvert W-\mathbb{E}W\rvert\ge t\big)\le\frac{\operatorname{Var}(W)}{t^{2}}.
$$

For the sample mean, $$\operatorname{Var}(\hat\mu)=\sigma^{2}/n$$, so

$$
P\big(\lvert\hat\mu-\mu\rvert\ge\epsilon\big)\le\frac{\sigma^{2}}{n\,\epsilon^{2}}.
$$

It is a correct bound, but **polynomial** in $$n$$: to guarantee a failure
probability $$\delta$$, we need $$n\sim 1/(\delta\epsilon^{2})$$.

### Hoeffding

When the variables are **bounded**, $$X_i\in[a,b]$$, a much better bound is
obtained. **Hoeffding**'s inequality states

$$
P\big(\lvert\hat\mu-\mu\rvert\ge\epsilon\big)
\le
2\exp\!\left(-\frac{2n\,\epsilon^{2}}{(b-a)^{2}}\right),
$$

and, in the case $$X_i\in[0,1]$$,

$$
P\big(\lvert\hat\mu-\mu\rvert\ge\epsilon\big)\le 2e^{-2n\epsilon^{2}}.
$$

The dependence on $$n$$ is now **exponential**: to fail with probability
$$\delta$$ it is enough that $$n\sim\frac{1}{\epsilon^{2}}\log\frac{1}{\delta}$$.
Inverting, with probability $$1-\delta$$,

$$
\lvert\hat\mu-\mu\rvert\le\sqrt{\frac{\log(2/\delta)}{2n}}.
$$

### The Chernoff method

Hoeffding is a case of the **Chernoff method**: for any $$s>0$$,

$$
P(Z\ge t)=P\big(e^{sZ}\ge e^{st}\big)\le e^{-st}\,\mathbb{E}[e^{sZ}],
$$

and the right-hand side is minimized over $$s$$ using the moment generating
function. Variables whose generating function behaves like that of a Gaussian
are called **sub-Gaussian**, and for them a Hoeffding-type bound holds. This is
also how the **Chernoff** bounds for sums of Bernoullis are obtained.

### Union bound

For a finite collection of events $$A_1,\ldots,A_M$$,

$$
P\Big(\bigcup_{j=1}^{M}A_j\Big)\le\sum_{j=1}^{M}P(A_j).
$$

Simple, but it is what allows going from "one fixed model" to "all models of a
class".

### From concentration to generalization

Fix a model $$f$$ and assume the loss bounded in $$[0,1]$$. Each
$$L(y_i,f(x_i))$$ is a bounded variable with mean $$R(f)$$, so Hoeffding gives

$$
P\big(\lvert\hat R(f)-R(f)\rvert\ge\epsilon\big)\le 2e^{-2n\epsilon^{2}}.
$$

For a **finite** class $$\mathcal{H}$$ with $$M=\lvert\mathcal{H}\rvert$$
models, the *union bound* over the $$M$$ events gives

$$
P\Big(\max_{f\in\mathcal{H}}\lvert\hat R(f)-R(f)\rvert\ge\epsilon\Big)
\le
2M\,e^{-2n\epsilon^{2}}.
$$

Setting the right-hand side to $$\delta$$ and inverting: with probability
$$1-\delta$$, **for every** $$f\in\mathcal{H}$$,

$$
R(f)\le\hat R(f)+\sqrt{\frac{\log M+\log(2/\delta)}{2n}}.
$$

This is the first generalization bound of the course. The extra term grows with
$$\log M$$, a crude measure of the complexity of the class, and decays as
$$1/\sqrt{n}$$. The next lectures replace $$\log M$$ by a capacity measure that
also works for infinite classes.
