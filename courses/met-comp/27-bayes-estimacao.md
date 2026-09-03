---
title: "3.3 - Bayesian estimation"
course: met-comp
---

## Bayesian estimation

The posterior $$p(\theta\mid D)$$ contains everything that is known about
$$\theta$$. This lecture shows how to extract from it the practical objects: a
point estimate, an interval, and a prediction for new observations.

### Contents

- Posterior point estimates
- Credible intervals
- Posterior predictive distribution
- Comparison with frequentist inference

## Posterior point estimates

If the posterior must be summarized in a single number, the choice depends on
the loss function (decision lecture of the ML module):

- the **posterior mean** $$\mathbb{E}[\theta\mid D]$$ minimizes the expected
  squared loss;
- the **posterior median** minimizes the absolute loss;
- the **posterior mode** (the **MAP**, *maximum a posteriori*),

$$
\hat\theta_{\mathrm{MAP}}=\arg\max_{\theta}\ p(\theta\mid D)
=\arg\max_{\theta}\ \big[\log p(D\mid\theta)+\log p(\theta)\big],
$$

minimizes the 0-1 loss and corresponds to maximum likelihood **penalized** by
the prior. With a uniform prior, the MAP coincides with the MLE.

For a symmetric and unimodal posterior, the three coincide; for skewed
posteriors (common with little data), they differ, and the mean is usually the
most robust.

## Credible intervals

The Bayesian analogue of the confidence interval. A **credible interval** of
level $$1-\alpha$$ is any region $$C$$ with

$$
P(\theta\in C\mid D)=\int_{C}p(\theta\mid D)\,d\theta=1-\alpha.
$$

Two usual constructions:

- **equal-tailed**: between the $$\alpha/2$$ and $$1-\alpha/2$$ quantiles of the
  posterior;
- **HPD** (*highest posterior density*): the smallest region that accumulates
  $$1-\alpha$$ probability, formed by the values of $$\theta$$ with the highest
  posterior density.

The interpretation is the one people wish they could give the confidence
interval, but which is only correct here: "there is $$95\%$$ probability that
$$\theta$$ is in this interval, given the observed data".

## Posterior predictive distribution

To predict a new observation $$\tilde X$$, we do not use a single value of
$$\theta$$; we integrate over all the posterior uncertainty:

$$
\boxed{
p(\tilde x\mid D)=\int p(\tilde x\mid\theta)\,p(\theta\mid D)\,d\theta.
}
$$

It is an average of the predictions of each $$\theta$$, weighted by the
credibility of $$\theta$$. The predictive is **more dispersed** than
$$p(\tilde x\mid\hat\theta)$$, because it incorporates the uncertainty about the
parameter in addition to the data noise.

Example (Beta-Binomial of lecture 3.2): observing $$x$$ successes in $$n$$
trials with a $$\text{Beta}(\alpha,\beta)$$ prior, the predictive probability of
success on the next trial is

$$
P(\tilde X=1\mid D)=\mathbb{E}[\theta\mid D]=\frac{\alpha+x}{\alpha+\beta+n}.
$$

## Comparison with frequentist inference

| Object | Frequentist | Bayesian |
| --- | --- | --- |
| Point estimate | MLE, moments, least squares | posterior mean / median / mode (MAP) |
| Interval | confidence ($$1-\alpha$$ of intervals contain $$\theta$$) | credible ($$1-\alpha$$ probability for $$\theta$$) |
| Prediction | $$p(\tilde x\mid\hat\theta)$$ (plug-in) | $$p(\tilde x\mid D)$$ (integrates the uncertainty) |

With a lot of data and a weakly informative prior, the estimates and intervals
of the two approaches become numerically close; the main difference remains in
the interpretation and in the fact that the Bayesian one delivers the **entire
distribution**, not just a summary.
