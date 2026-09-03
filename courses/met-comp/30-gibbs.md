---
title: "4.2 - Gibbs sampling"
course: met-comp
---

## Gibbs sampling

The Metropolis-Hastings of the previous lecture samples all parameters at once,
and its efficiency depends on a well-calibrated proposal. Gibbs sampling is a
special case that dispenses with the proposal: it updates **one parameter at a
time**, sampling from its full conditional distribution. When those
conditionals are known, every step is accepted with probability $$1$$.

### Contents

- Full conditional distributions
- The algorithm
- Relation with Metropolis-Hastings
- Hierarchical models and auxiliary variables
- Advantages and limitations

## Full conditional distributions

Let $$\theta=(\theta_1,\ldots,\theta_p)$$. The **full conditional
distribution** of $$\theta_j$$ is the posterior of $$\theta_j$$ with all the
other parameters fixed at their current values:

$$
p\big(\theta_j\ \big|\ \theta_{-j},\,D\big),
\qquad
\theta_{-j}=(\theta_1,\ldots,\theta_{j-1},\theta_{j+1},\ldots,\theta_p).
$$

It is proportional to the joint posterior seen as a function of $$\theta_j$$
only,

$$
p(\theta_j\mid\theta_{-j},D)\ \propto\ p(D\mid\theta)\,p(\theta),
$$

and, for models built with piecewise conjugate priors, it has a closed form
(Beta, Gamma, Normal), even when the joint posterior does not.

## The algorithm

Starting from an initial value $$\theta^{(0)}$$, in each iteration $$t$$ the
parameters are visited in order, each sampled from its conditional given the
most recent version of the others:

$$
\begin{aligned}
\theta_1^{(t)}&\sim p\big(\theta_1\mid\theta_2^{(t-1)},\ldots,\theta_p^{(t-1)},D\big),\\
\theta_2^{(t)}&\sim p\big(\theta_2\mid\theta_1^{(t)},\theta_3^{(t-1)},\ldots,\theta_p^{(t-1)},D\big),\\
&\ \vdots\\
\theta_p^{(t)}&\sim p\big(\theta_p\mid\theta_1^{(t)},\ldots,\theta_{p-1}^{(t)},D\big).
\end{aligned}
$$

The sequence $$\theta^{(0)},\theta^{(1)},\ldots$$ is a Markov chain whose
stationary distribution is the joint posterior $$p(\theta\mid D)$$. As in
Metropolis-Hastings, the first iterations are discarded (burn-in) and the rest
are used to estimate posterior expectations and quantiles.

## Relation with Metropolis-Hastings

Gibbs sampling is a Metropolis-Hastings in which the proposal for $$\theta_j$$
is the full conditional **itself**. Substituting that proposal into the
acceptance ratio, all the terms cancel and $$r=1$$: **nothing is rejected**.
The price is having to derive and sample from each full conditional.

## Hierarchical models and auxiliary variables

Gibbs is the natural tool for **hierarchical models**, in which the parameters
are organized into levels (for example, a mean per group, and hyperparameters
governing the distribution of those means). Each level is usually conjugate
conditioned on its neighbors, and Gibbs alternates between them. The **data
augmentation** technique introduces auxiliary variables (latent labels,
imaginary censored data) that make the conditionals tractable, and is the
stochastic analogue of the EM algorithm.

## Advantages and limitations

- **In favor**: no tuning parameters, no rejection, every step uses all the
  information in the conditionals.
- **Against**: requires known full conditionals; when the parameters are
  strongly correlated a posteriori, the chain moves slowly (the steps are
  always parallel to the axes), and mixing is poor. In those cases, blocks of
  parameters are updated together, or Hamiltonian Monte Carlo is used.
