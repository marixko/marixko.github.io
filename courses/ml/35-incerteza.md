---
title: "8.5 - Uncertainty Quantification"
course: ml
---

## Uncertainty quantification

A prediction with no uncertainty is of little use in science. This lecture
separates the two types of uncertainty, shows how to produce prediction
intervals with a coverage guarantee and discusses calibration, the requirement
that the predicted probabilities mean what they say.

### Contents

- Aleatoric and epistemic uncertainty
- Prediction intervals
- Calibration
- Bayesian models and ensembles
- Probabilistic predictions

### Two types of uncertainty

**Aleatoric uncertainty** is the intrinsic noise of the generating process: the
variance of $$Y$$ given $$x$$, the irreducible error of lecture 3.2. It does not
decrease with more data, only with better measurements, and it can depend on
$$x$$ (heteroscedastic), $$\sigma^{2}(x)$$.

**Epistemic uncertainty** is the uncertainty about the **model**, arising from
having finite data. It **decreases** with more data and is large in sparsely
populated regions of the *feature* space or outside the training distribution.

The total predictive variance decomposes into the two, by the law of total
variance applied to the parameter posterior:

$$
\operatorname{Var}(y_*\mid x_*,D)
=
\underbrace{\mathbb{E}_{\theta\mid D}\big[\operatorname{Var}(y_*\mid x_*,\theta)\big]}_{\text{aleatoric}}
+
\underbrace{\operatorname{Var}_{\theta\mid D}\big[\mathbb{E}(y_*\mid x_*,\theta)\big]}_{\text{epistemic}}.
$$

### Prediction intervals

We want $$[\ell(x_*),u(x_*)]$$ such that
$$P\big(y_*\in[\ell(x_*),u(x_*)]\big)\ge 1-\alpha$$. The approaches:

- **quantile regression**: fit the conditional quantiles directly with the
  *pinball* loss (lecture 1.3);
- **Bayesian intervals**: quantiles of the posterior predictive distribution
  (lecture 8.4);
- **conformal prediction**: uses a calibration set to build intervals with
  coverage **guaranteed in finite samples**, with no assumptions about the
  distribution, as long as the data are exchangeable.

### Calibration

A classifier is **calibrated** if, among the cases to which it assigns
probability $$0.8$$, about $$80\%$$ actually belong to the class. It is measured
with the reliability diagram and the expected calibration error. Deep networks
tend to be **overconfident**; they are recalibrated with temperature scaling,
Platt scaling or isotonic regression, fit on a separate set.

### Practical estimates

- **Deep ensembles**: train several networks with different seeds and
  aggregate; they usually give the best estimate of epistemic uncertainty.
- **Monte Carlo dropout** and **Bayesian last layer**: cheaper, lower quality.
- **Gaussian processes**: exact epistemic uncertainty, but cubic cost in
  $$n$$.

### In Astronomy

The concrete cases: the **photometric redshift PDFs**, whose width must be
reliable for the downstream population inference; the classification
probabilities used to select samples; and the **covariate shift** between the
training set (spectroscopic, bright) and the target (photometric, fainter),
which increases the epistemic uncertainty in a way that standard
cross-validation does not reveal.
