---
title: 1.1 - Introduction
course: ml
---

## Machine Learning as Statistical Inference

Much of machine learning can be understood as a statistical inference problem:
from a finite sample, we want to estimate a relationship between variables that
<mark>holds for the whole population</mark>, especially for data we have not yet
observed. In this lecture we fix the notation and the concepts that will
support the rest of the course.

### Contents

- Data and the generating process
- Random variables $$X$$ and $$Y$$
- Training set
- Prediction function
- Hypothesis space
- Parametric and nonparametric models
- Supervised and unsupervised learning
- Prediction versus inference

### Mathematical formulation

Consider a data set

$$
D = \{(x_i,y_i)\}_{i=1}^{n},
$$

with

$$
(X,Y)\sim P(X,Y).
$$

The goal is to find a function

$$
f:X\rightarrow Y
$$

that produces good predictions for new observations.

The estimator can be written as

$$
\hat f = \mathcal{A}(D),
$$

where $$\mathcal{A}$$ represents the learning algorithm.

### Fundamental concepts

#### Data and the generating process

Every data set is seen as a **sample** from an unknown generating process,
described by a joint probability distribution $$P(X,Y)$$. In general we assume
that the observations $$(x_i,y_i)$$ are **independent and identically
distributed** (i.i.d.) according to $$P$$. This is an idealization: in
Astronomy, the "generating process" combines the physics of the sources, the
instrument and the selection effects of the sample, and the observations are
not always truly independent. Still, it is the working hypothesis that makes it
possible to generalize from what we have seen to what we have not yet seen. If
the generating process changed arbitrarily between training and use, there
would be nothing to learn.

#### Random variables $$X$$ and $$Y$$

We split the variables into two: $$X$$ gathers the **predictor variables**
(*features*, covariates, attributes), typically a vector
$$X\in\mathbb{R}^{d}$$; $$Y$$ is the **response variable** (target), what we
want to predict. The nature of $$Y$$ defines the task:

- if $$Y$$ takes values in a discrete set of categories, we have a
  **classification** problem (for example, star / galaxy / quasar);
- if $$Y$$ is continuous, we have a **regression** problem (for example,
  estimating the *redshift* of a source).

#### Training set

The training set $$D = \{(x_i,y_i)\}_{i=1}^{n}$$ is the **finite** realization
of the generating process that we have access to. It is from this that the
algorithm builds the estimator $$\hat f$$. Since $$D$$ is random, $$\hat f$$ is
too: if we collected another sample from the same process, we would get a
slightly different function. That is why, in practice, we set aside part of the
data, that is, **validation** and **test** sets, to honestly estimate the
performance on new data, without contamination from the fitting.

#### Prediction function

The prediction function $$f:X\rightarrow Y$$ is the rule that, given a
*feature* vector $$x$$, returns a guess $$f(x)$$ for the response. To compare
functions we need a **loss function** $$L\big(y,f(x)\big)$$, which quantifies
the cost of predicting $$f(x)$$ when the true value is $$y$$ (for example, the
squared error $$\big(y-f(x)\big)^2$$ in regression). The ideal function is the
one that minimizes the **expected risk**

$$
R(f) = \mathbb{E}_{(X,Y)\sim P}\big[\,L(Y,f(X))\,\big],
$$

but, since $$P$$ is unknown, the algorithm works with the **empirical risk**
computed over the training set,

$$
\hat R(f) = \frac{1}{n}\sum_{i=1}^{n} L\big(y_i,f(x_i)\big).
$$

Much of the course is about the difference between these two risks.

#### Hypothesis space

The algorithm does not look for $$f$$ among *all* possible functions, but
within a restricted set $$\mathcal{H}$$, the **hypothesis space**. For example,
all linear functions, or all neural networks of a given architecture. Learning
is choosing

$$
\hat f = \arg\min_{f\in\mathcal{H}} \hat R(f).
$$

The choice of $$\mathcal{H}$$ controls the **bias-variance trade-off**: a space
too small may not contain a good approximation of the true relationship (high
bias); a space too rich fits the noise of the sample and generalizes poorly
(high variance).

#### Parametric and nonparametric models

A model is **parametric** when $$\mathcal{H}$$ is indexed by a parameter vector
$$\theta\in\mathbb{R}^{p}$$ of **fixed** dimension, which does not grow with the
sample size (linear regression and logistic regression are examples). A model
is **nonparametric** when its effective complexity **grows with $$n$$**:
nearest neighbors ($$k$$-NN), decision trees, *kernel* methods and Gaussian
processes keep (implicitly or explicitly) a portion of the data itself.
Parametric models are more rigid, easier to interpret and need less data;
nonparametric models are more flexible, but require larger samples and more
care with overfitting.

#### Supervised and unsupervised learning

In **supervised** learning we have the pairs $$(x_i,y_i)$$ and we want to
estimate the relationship between them, that is, the conditional distribution
$$P(Y\mid X)$$ or directly a function $$f$$. In **unsupervised** learning we
only observe $$X$$, without labels $$y$$, and the goal is to discover structure
in the distribution $$P(X)$$: group similar objects (*clustering*), reduce
dimensionality, estimate densities or detect anomalies.

#### Prediction versus inference

Finally, a distinction of goal. When the interest is **prediction**, all that
matters is that $$f(x)$$ is close to $$y$$ on new data; the internal form of
the model can be opaque. When the interest is **inference**, we want to
understand *the relationship itself*, that is, which *features* matter, what
the functional form of the dependence is, what the uncertainty about the
parameters is and whether the effects are statistically significant. The same
data set can be analyzed with either goal, but they lead to different choices
of model, of validation and of interpretation of the results.
