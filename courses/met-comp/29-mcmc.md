---
title: "4.1 - MCMC: Metropolis-Hastings"
course: met-comp
---

## MCMC: Metropolis-Hastings

Outside the conjugate families, the posterior
$$p(\theta\mid D)\propto p(D\mid\theta)\,p(\theta)$$ is known only **up to the
normalizing constant** $$p(D)$$, which is an intractable integral. MCMC gets
around this: it builds a Markov chain whose equilibrium distribution is exactly
the posterior, and uses the samples of that chain as if they were samples from
the posterior.

### Contents

- Why sample instead of integrate
- Markov chains and the stationary distribution
- The Metropolis-Hastings algorithm
- Choosing the proposal and the acceptance rate
- Burn-in and using the samples

## Why sample instead of integrate

Every Bayesian quantity of interest is a posterior expectation,

$$
\mathbb{E}[h(\theta)\mid D]=\int h(\theta)\,p(\theta\mid D)\,d\theta,
$$

and, by the Monte Carlo logic (lecture 2.2), it is enough to have samples
$$\theta^{(1)},\ldots,\theta^{(T)}$$ from the posterior to approximate it by the
average $$\frac{1}{T}\sum_t h(\theta^{(t)})$$. The problem is generating those
samples when we can only evaluate $$p(D\mid\theta)\,p(\theta)$$, without the
constant.

## Markov chains and the stationary distribution

A **Markov chain** is a sequence $$\theta^{(0)},\theta^{(1)},\ldots$$ in which
$$\theta^{(t+1)}$$ depends only on $$\theta^{(t)}$$, through a transition
kernel. Under mild conditions (irreducibility, aperiodicity), the chain has a
unique **stationary distribution** $$\pi$$, and $$\theta^{(t)}$$ converges in
distribution to $$\pi$$ regardless of the starting point. The idea of MCMC is
to **design** the transition kernel so that $$\pi$$ is the posterior.

A sufficient condition is **detailed balance**: if, for the full acceptance
kernel $$q$$,

$$
\pi(\theta)\,q(\theta\to\theta')=\pi(\theta')\,q(\theta'\to\theta)
\quad\text{for all }\theta,\theta',
$$

then $$\pi$$ is stationary.

## The Metropolis-Hastings algorithm

Given a **proposal distribution** $$g(\theta'\mid\theta)$$ (easy to sample from)
and the target $$\pi(\theta)\propto p(D\mid\theta)\,p(\theta)$$, the iteration
is:

1. from the current state $$\theta^{(t)}$$, propose
   $$\theta'\sim g(\cdot\mid\theta^{(t)})$$;
2. compute the acceptance ratio

$$
r=\min\!\left(1,\ \frac{\pi(\theta')\,g(\theta^{(t)}\mid\theta')}{\pi(\theta^{(t)})\,g(\theta'\mid\theta^{(t)})}\right);
$$

3. with probability $$r$$, accept: $$\theta^{(t+1)}=\theta'$$; otherwise, repeat
   the state: $$\theta^{(t+1)}=\theta^{(t)}$$.

The **normalizing constant cancels** in the ratio, because it appears in the
numerator and the denominator: only $$p(D\mid\theta)\,p(\theta)$$ needs to be
evaluated. When the proposal is symmetric,
$$g(\theta'\mid\theta)=g(\theta\mid\theta')$$ (for example, a Gaussian step
$$\theta'=\theta^{(t)}+\mathcal{N}(0,s^{2})$$), the $$g$$ terms drop out and we
are left with the **Metropolis algorithm**:
$$r=\min\big(1,\ \pi(\theta')/\pi(\theta^{(t)})\big)$$.

## Choosing the proposal and the acceptance rate

Performance depends entirely on the proposal:

- **step too small**: almost everything is accepted, but the chain moves slowly
  and the samples are highly correlated;
- **step too large**: almost everything is rejected, and the chain stalls.

For a Gaussian step, an acceptance rate around $$20\%$$ to $$50\%$$ is usually a
good target (near $$25\%$$ in high dimension). More sophisticated methods, such
as Hamiltonian Monte Carlo, use the gradient of $$\log\pi$$ to propose long,
informed steps with high acceptance.

## Burn-in and using the samples

- The first iterations depend on the starting point and are discarded: this is
  the **burn-in**.
- The remaining samples **are correlated** with each other, so they count as
  fewer than $$T$$ independent samples; this is measured by the **effective
  sample size**.
- Posterior expectations are estimated by the average over the post-burn-in
  samples, and the quantiles of those samples give the credible intervals.

The diagnostic that the chain has actually converged to the posterior is the
topic of lecture 4.3.
