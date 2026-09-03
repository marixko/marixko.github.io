---
title: "3.1 - Bayesian fundamentals"
course: met-comp
---

## Bayesian fundamentals

Module 3 begins. So far, $$\theta$$ was treated as a fixed and unknown
constant, and probability described the variability of the **data**. The
Bayesian approach inverts this: $$\theta$$ is given a probability distribution
that represents our **uncertainty** about it, and that distribution is updated
by the data.

### Contents

- Probability as degree of belief
- Prior, likelihood and posterior
- Bayes' theorem revisited
- The marginal likelihood
- Frequentist and Bayesian

## Probability as degree of belief

In the Bayesian view, a probability can quantify the **degree of belief** in a
statement, not just the frequency of a repeatable event. This lets us speak of
"the probability that $$\theta$$ is between $$0.3$$ and $$0.5$$", a sentence
that has no meaning in the frequentist view, where $$\theta$$ is fixed.

## Prior, likelihood and posterior

The model has three ingredients:

- the **prior distribution** $$p(\theta)$$, which expresses what is known about
  $$\theta$$ **before** seeing the data;
- the **likelihood** $$p(D\mid\theta)$$, the model of the data given the
  parameter, the same one from the previous lectures;
- the **posterior distribution** $$p(\theta\mid D)$$, which combines the two
  and represents what is known **after** seeing the data.

## Bayes' theorem revisited

The connection between them is Bayes' theorem from lecture 1.4, applied to
$$\theta$$:

$$
\boxed{
p(\theta\mid D)=\frac{p(D\mid\theta)\,p(\theta)}{p(D)}.
}
$$

Since the denominator $$p(D)$$ does not depend on $$\theta$$, we usually write

$$
p(\theta\mid D)\ \propto\ p(D\mid\theta)\,p(\theta),
$$

that is, **posterior is proportional to likelihood times prior**. All Bayesian
inference comes from the posterior: point estimates, intervals, predictions and
model comparisons.

As data accumulate, the likelihood dominates the prior and the posterior
concentrates around the true value; with little data, the prior carries more
weight. Different priors lead to very different conclusions only when the data
are scarce.

## The marginal likelihood

The denominator

$$
p(D)=\int p(D\mid\theta)\,p(\theta)\,d\theta
$$

is the **marginal likelihood** (or evidence): the probability of the data
**averaged over all values of $$\theta$$**, weighted by the prior. It
normalizes the posterior and, as we will see in lecture 3.4, is the central
piece of model comparison. Computing this integral is the main computational
difficulty of the Bayesian approach, and what motivates the methods of Module
4.

## Frequentist and Bayesian

| | Frequentist | Bayesian |
| --- | --- | --- |
| $$\theta$$ | fixed constant | random variable (uncertainty) |
| Probability | long-run frequency | degree of belief |
| Output | point estimate, CI, p-value | the entire posterior distribution |
| Interval interpretation | $$95\%$$ of intervals contain $$\theta$$ | $$95\%$$ probability that $$\theta$$ is in the interval |
| Needs a prior? | no | yes |

The two approaches usually agree numerically when there is a lot of data and
the prior is weakly informative. The choice between them depends on the
problem: the Bayesian one is natural for incorporating prior knowledge and
propagating uncertainty; the frequentist one, for guarantees that hold **for
any** value of $$\theta$$.
