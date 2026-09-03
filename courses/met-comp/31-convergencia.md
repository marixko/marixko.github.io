---
title: "4.3 - Convergence diagnostics"
course: met-comp
---

## Convergence diagnostics

MCMC only produces samples from the posterior **after** the chain converges to
its stationary distribution, and even then the samples are correlated. This
lecture gathers the tools to judge whether the chain has run long enough and to
quantify the precision of the estimates that come out of it.

### Contents

- Burn-in and the trace plot
- Autocorrelation and effective sample size
- The chain's Monte Carlo error
- Multiple chains and the $$\hat R$$ statistic
- Best practices

## Burn-in and the trace plot

The first iterations depend on the starting point and do not represent the
posterior. These iterations are discarded (the **burn-in**). To decide how
many, we look at the **trace plot**: the parameter value against the iteration
number. A well-mixed chain looks like "stationary noise" around a constant
level; trends, plateaus or a chain that is still "climbing" indicate that the
burn-in was too short or that the chain has not converged.

## Autocorrelation and effective sample size

Consecutive MCMC samples are correlated. The **autocorrelation function**
$$\rho_k$$ measures the correlation between $$\theta^{(t)}$$ and
$$\theta^{(t+k)}$$; the slower it decays, the more redundant the samples. The
**effective sample size** summarizes this:

$$
n_{\mathrm{eff}}=\frac{T}{1+2\sum_{k\ge 1}\rho_k},
$$

the number of **independent** samples equivalent to the $$T$$ correlated
samples of the chain. If $$T=10^{4}$$ but $$n_{\mathrm{eff}}=200$$, the chain
carries little information and one must run more, or improve the proposal.

## The chain's Monte Carlo error

As in any Monte Carlo (lecture 2.2), the estimate of a posterior expectation
has an error that decreases with the root of the number of samples, but now
with $$n_{\mathrm{eff}}$$ in place of $$T$$:

$$
\mathrm{se}\big(\hat{\mathbb{E}}[h(\theta)\mid D]\big)\approx\frac{\hat\sigma_h}{\sqrt{n_{\mathrm{eff}}}}.
$$

This **Monte Carlo error** should be small relative to the posterior standard
deviation of $$h(\theta)$$; otherwise, the uncertainty in the report comes from
the sampler, not from the data.

## Multiple chains and the $$\hat R$$ statistic

The most reliable diagnostic is to run **several chains** from dispersed
starting points and check whether they agree. The Gelman-Rubin statistic
$$\hat R$$ compares the **between**-chain variance with the **within**-chain
variance:

$$
\hat R\approx\sqrt{\frac{\text{pooled variance}}{\text{within-chain variance}}}.
$$

If the chains have converged to the same distribution, the two variances
coincide and $$\hat R\approx 1$$. Values above about $$1.01$$ indicate that the
chains have not mixed yet and that it is too early to use the samples.

## Best practices

- run **at least four chains** from different starting points;
- discard the first half of each chain as burn-in;
- report $$\hat R$$ and $$n_{\mathrm{eff}}$$ for **every** quantity of
  interest, not just for the parameters;
- visually inspect the trace plots and the overlaid marginal densities of the
  chains;
- remember that the diagnostics can **detect** non-convergence, but never
  **prove** convergence: a chain can look stable for a long time and only later
  discover another region of the posterior.
