---
title: "8.4 - Probabilistic Machine Learning"
course: ml
---

## Probabilistic machine learning

So far the models have returned a point: a $$\hat\beta$$, a class, a prediction.
Bayesian learning returns a **distribution**, which carries the uncertainty
about the parameters and propagates it to the predictions. This is particularly
important in science, where predictions feed downstream inferences.

### Contents

- Bayesian inference
- Posterior predictive distribution
- Approximate inference
- Monte Carlo
- Variational inference
- Predictive uncertainty

### Bayesian inference

With a *prior* $$p(\theta)$$ and the likelihood $$p(D\mid\theta)$$, Bayes'
theorem gives the **posterior**

$$
p(\theta\mid D)=\frac{p(D\mid\theta)\,p(\theta)}{p(D)}\ \propto\ p(D\mid\theta)\,p(\theta).
$$

Instead of choosing a single $$\theta$$ (like the MLE or the MAP), we keep the
whole distribution.

### Posterior predictive distribution

The prediction for a new input $$x_*$$ integrates over the parameter
uncertainty:

$$
p(y_*\mid x_*,D)=\int p(y_*\mid x_*,\theta)\,p(\theta\mid D)\,d\theta.
$$

It is a **model average** weighted by the posterior, not the prediction of a
single model. When the posterior is wide (little data), the predictive is also
wide; when it is concentrated, the predictive approaches a point prediction.

### Approximate inference

The integral above rarely has closed form. The three families of
approximation:

**Monte Carlo.** Sample $$\theta^{(1)},\ldots,\theta^{(S)}$$ from the posterior
and approximate

$$
p(y_*\mid x_*,D)\approx\frac{1}{S}\sum_{s=1}^{S}p\big(y_*\mid x_*,\theta^{(s)}\big).
$$

The samples come from MCMC (Metropolis-Hastings, Hamiltonian Monte Carlo). It is
asymptotically exact, but can be slow.

**Variational inference.** Choose a tractable family $$q_\phi(\theta)$$ and tune
$$\phi$$ to maximize the **evidence lower bound** (ELBO),

$$
\mathrm{ELBO}(\phi)=\mathbb{E}_{q_\phi}\big[\log p(D,\theta)\big]+H(q_\phi),
$$

which is equivalent to minimizing
$$\mathrm{KL}\big(q_\phi\,\Vert\,p(\theta\mid D)\big)$$. It is fast, but returns
a biased approximation.

**Laplace approximation.** A Gaussian centered at the MAP, with covariance equal
to the inverse of the Hessian of the negative log-likelihood at that point.

### Deep Bayesian learning in practice

Doing full Bayesian inference on a large network is expensive, so cheap
approximations are used: Monte Carlo *dropout* (keep *dropout* active at
prediction time and sample), **deep ensembles** (train several networks and
aggregate), and Bayesian versions of only the last layer.

### Why this matters

Beyond calibrated uncertainty, the Bayesian framework gives the **marginal
likelihood** $$p(D)$$ for comparing models (Bayes factors) and a natural way to
incorporate physical knowledge as a *prior*. The uncertainty quantification that
results from this is the topic of the next lecture.
