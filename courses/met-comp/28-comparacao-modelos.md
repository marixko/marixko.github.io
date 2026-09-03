---
title: "3.4 - Model comparison"
course: met-comp
---

## Model comparison

A hypothesis test compares two values of a parameter within a single model.
Model comparison is more general: which of several candidate structures (number
of predictors, functional form, distribution family) best describes the data,
without overfitting?

### Contents

- The overfitting problem
- Bayes factor
- Information criteria: AIC and BIC
- Validation and other approaches

## The overfitting problem

A model with more parameters always fits the training data at least as well as
a smaller model: the maximum likelihood $$p(D\mid\hat\theta)$$ never decreases
when parameters are added. Comparing models by likelihood alone would always
lead to the larger model. All the criteria below penalize complexity in some
way.

## Bayes factor

The Bayesian comparison between two models $$M_1$$ and $$M_2$$ uses the
**marginal likelihoods** (lecture 3.1):

$$
p(D\mid M_k)=\int p(D\mid\theta_k,M_k)\,p(\theta_k\mid M_k)\,d\theta_k.
$$

The **Bayes factor** is the ratio

$$
B_{12}=\frac{p(D\mid M_1)}{p(D\mid M_2)},
$$

and it relates the posterior probabilities of the models to the prior
probabilities:

$$
\frac{P(M_1\mid D)}{P(M_2\mid D)}=B_{12}\cdot\frac{P(M_1)}{P(M_2)}.
$$

The marginal likelihood penalizes complexity **automatically**: a model with
many parameters spreads the prior over a large space, so it assigns little
prior probability to any specific data set (the "Bayesian Occam's razor").
$$B_{12}$$ is interpreted on scales such as Jeffreys' ($$B_{12}>10$$ is strong
evidence in favor of $$M_1$$). The difficulty is computing the marginal
integral, which is sensitive to the prior.

## Information criteria: AIC and BIC

Cheaper approximations that explicitly penalize the number of parameters
$$k$$. Both are computed from the maximum log-likelihood
$$\hat\ell=\log p(D\mid\hat\theta)$$, and **smaller is better**:

$$
\mathrm{AIC}=-2\hat\ell+2k,
\qquad
\mathrm{BIC}=-2\hat\ell+k\log n.
$$

Differences:

- **AIC** estimates the out-of-sample prediction error; it tends to select
  somewhat large models, and does not assume the "true model" is among the
  candidates;
- **BIC** approximates $$-2\log p(D\mid M)$$; it penalizes complexity more
  ($$\log n>2$$ for $$n>7$$) and is **consistent**: as $$n\to\infty$$, it
  selects the correct model if it is among the candidates.

Models are compared by the difference
$$\Delta=\mathrm{crit}_k-\mathrm{crit}_{\min}$$: a $$\Delta$$ up to about $$2$$
indicates practically equivalent models; above $$10$$, the worse model can be
discarded.

## Validation and other approaches

- **Cross-validation**: estimate the prediction error by training and testing
  on disjoint parts of the data; it is the gold standard for predictive
  purposes and does not require counting parameters.
- **Deviance and the likelihood ratio test**: for **nested** models (one is a
  special case of the other),
  $$2(\hat\ell_1-\hat\ell_2)\sim\chi^{2}_{k_1-k_2}$$ under the smaller model.
- **WAIC** and **Bayesian LOO**: fully Bayesian versions of AIC and
  cross-validation, computed from posterior samples (Module 4).

No criterion is definitive. AIC and cross-validation answer "which model
predicts better"; BIC and the Bayes factor answer "which model is most likely
the correct one". The choice of criterion depends on the question.
