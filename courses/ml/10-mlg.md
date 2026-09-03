---
title: "2.6 - Generalized Linear Models"
course: ml
---

## Generalized linear models

Linear regression and logistic regression look like distinct models, but they
are the same object seen from two angles: a linear predictor
$$x^{\top}\beta$$, an **exponential family** distribution for $$Y\mid x$$, and a
function that links the mean to the linear part. Generalized linear models
(GLMs) make this structure explicit and provide a single fitting algorithm for
the whole class.

### Contents

- The exponential family
- Sufficient statistic and canonical parameter
- Mean, variance and the variance function
- Link function and the linear predictor
- The structure of a GLM
- Examples and fitting by IRLS

### The exponential family

A distribution belongs to the **exponential dispersion family** if its density
or probability mass can be written as

$$
p(y\mid\theta,\phi)
=
\exp\!\left\{\frac{y\,\theta-b(\theta)}{a(\phi)}+c(y,\phi)\right\}.
$$

Here $$\theta$$ is the **canonical parameter** (or natural), $$\phi$$ is the
**dispersion** parameter (the noise scale, known or estimated), $$b(\theta)$$
is the cumulant generating function, and $$a(\phi)$$ and $$c(y,\phi)$$ are known
functions. The Gaussian, Bernoulli, binomial, Poisson, gamma and
inverse-Gaussian, among others, are all in this form.

### Sufficient statistic and canonical parameter

In this parameterization, $$y$$ appears only multiplying $$\theta$$ linearly. By
the factorization theorem, $$y$$ (and, for a sample, $$\sum_i y_i$$) is the
**sufficient statistic** for $$\theta$$: it summarizes all the sample
information about the parameter. The $$\theta$$ that pairs directly with $$y$$
is, by definition, the canonical parameter.

### Mean, variance and the variance function

Differentiating the identity $$\int p(y\mid\theta,\phi)\,dy=1$$ with respect to
$$\theta$$, the first two cumulants come from $$b$$:

$$
\mathbb{E}[Y]=b'(\theta)=:\mu,
\qquad
\operatorname{Var}(Y)=a(\phi)\,b''(\theta).
$$

Since $$\mu=b'(\theta)$$, the variance can be expressed as a function of the
mean,

$$
\operatorname{Var}(Y)=a(\phi)\,V(\mu),
\qquad
V(\mu)=b''\big((b')^{-1}(\mu)\big).
$$

$$V(\mu)$$ is the **variance function** and characterizes each family: constant
in the Gaussian, $$\mu(1-\mu)$$ in the Bernoulli, $$\mu$$ in the Poisson,
$$\mu^{2}$$ in the gamma. It is what encodes the mean-variance relationship that
distinguishes the models.

### Link function and the linear predictor

A GLM has three components:

1. **Random component**: $$Y_i\mid x_i$$ in the exponential family, with mean
   $$\mu_i$$.
2. **Linear predictor**: $$\eta_i=x_i^{\top}\beta$$.
3. **Link function** $$g$$, monotone and differentiable, connecting the two:

$$
g(\mu_i)=\eta_i=x_i^{\top}\beta,
\qquad\text{that is}\qquad
g\big(\mathbb{E}[Y\mid X=x]\big)=x^{\top}\beta.
$$

The link is necessary because $$\mu$$ usually lives in a restricted interval
($$(0,1)$$ for probabilities, $$(0,\infty)$$ for counts), while
$$\eta=x^{\top}\beta$$ ranges over the whole line. The function $$g$$ is the
bijection that reconciles the two domains; its inverse $$g^{-1}$$ is the mean
response function.

The **canonical link** is the choice of $$g$$ such that $$\theta_i=\eta_i$$,
that is, $$g=(b')^{-1}$$. With it the canonical parameter is directly linear in
$$\beta$$, $$\sum_i y_i x_i$$ is sufficient for $$\beta$$, and the observed
Hessian of the log-likelihood coincides with the expected one, which simplifies
the fitting. It is not mandatory, but it is the default.

### The structure of a GLM

With the canonical link and constant $$a(\phi)$$, the log-likelihood is

$$
\ell(\beta)
=
\sum_{i}\frac{y_i\,(x_i^{\top}\beta)-b(x_i^{\top}\beta)}{a(\phi)}+c(y_i,\phi),
$$

and the gradient (the likelihood equations) always has the same form:

$$
\nabla\ell(\beta)
=
\frac{1}{a(\phi)}\sum_{i}(y_i-\mu_i)\,x_i
=
\frac{1}{a(\phi)}\,X^{\top}(y-\mu).
$$

It is the same pattern as OLS and logistic regression: $$X^{\top}(y-\mu)=0$$,
with the residual $$y-\mu$$ orthogonal to the predictors. In general there is
no closed-form solution, and the fitting is done by **IRLS** (iteratively
reweighted least squares), which is Newton's method with the expected Hessian
(*Fisher scoring*). Each iteration is a WLS,

$$
\beta^{(t+1)}=(X^{\top}W_tX)^{-1}X^{\top}W_t\,z_t,
$$

with weights $$w_i=1/\big(V(\mu_i)\,g'(\mu_i)^{2}\big)$$ and working response
$$z_i=\eta_i+(y_i-\mu_i)\,g'(\mu_i)$$. Linear regression (constant weight,
$$z=y$$) and logistic regression (weight $$p_i(1-p_i)$$) are special cases.

### Examples and fitting by IRLS

| Family | Support of $$Y$$ | $$b(\theta)$$ | $$V(\mu)$$ | Canonical link $$g(\mu)$$ |
| --- | --- | --- | --- | --- |
| Gaussian | $$\mathbb{R}$$ | $$\theta^{2}/2$$ | $$1$$ | $$\mu$$ (identity) |
| Bernoulli | $$\{0,1\}$$ | $$\log(1+e^{\theta})$$ | $$\mu(1-\mu)$$ | $$\log\dfrac{\mu}{1-\mu}$$ (logit) |
| Poisson | $$\{0,1,2,\ldots\}$$ | $$e^{\theta}$$ | $$\mu$$ | $$\log\mu$$ (log) |
| Gamma | $$(0,\infty)$$ | $$-\log(-\theta)$$ | $$\mu^{2}$$ | $$-1/\mu$$ |

**Gaussian.** With $$g(\mu)=\mu$$ we recover exactly the linear regression of
lecture 2.2: additive noise with constant variance.

**Bernoulli.** With $$g(p)=\log\dfrac{p}{1-p}$$ we recover the logistic
regression of lecture 2.5. For binomial data (number of successes in $$m_i$$
trials) the same structure gives grouped logistic regression.

**Poisson.** With $$g(\lambda)=\log\lambda$$ we get **Poisson regression**, the
natural model for count data:
$$\log\lambda_i=x_i^{\top}\beta$$, so $$\lambda_i=e^{x_i^{\top}\beta}$$, with
multiplicative effects on the rate. In Astronomy it is the standard model for
photon counts, number of objects per bin or event rates. A fixed exposure term
(*offset*) is usually included,
$$\log\lambda_i=\log t_i+x_i^{\top}\beta$$, to model rates per unit of time or
area. When the variance exceeds the mean (overdispersion), quasi-Poisson or the
negative binomial is used.

### Why this matters

All these models share a single framework, a single fitting algorithm (IRLS)
and a single asymptotic theory of maximum likelihood (consistency, normality of
$$\hat\beta$$, Wald, likelihood ratio and score tests). The **deviance**
generalizes the residual sum of squares and serves to compare models and to
define $$R^{2}$$ analogues. The $$L_2$$ and $$L_1$$ regularization of the
previous lectures extends directly to GLMs.
