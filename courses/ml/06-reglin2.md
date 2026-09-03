---
title: 2.2 - Linear Regression as a Probabilistic Model
course: ml
---

## Linear regression as a probabilistic model

The previous lecture treated least squares as a purely geometric problem:
projecting $$y$$ onto the column space of $$X$$, with no assumption about the
noise distribution. Now we add a **probability model**. This does not change
the estimator, but it gives access to the likelihood, to the exact
distribution of $$\hat\beta$$, to tests and intervals, and makes clear exactly
when least squares is the right choice.

### Contents

- The Gaussian model
- Likelihood and log-likelihood
- Maximum likelihood coincides with least squares
- Distribution of the estimator
- Unbiasedness and variance
- Gauss-Markov
- Homoscedasticity and heteroscedasticity

### The Gaussian model

We assume that the response, given the predictor, is normal around the linear
mean:

$$
Y\mid X=x\;\sim\;\mathcal{N}\big(x^{\top}\beta,\;\sigma^{2}\big).
$$

Equivalently, the errors $$\epsilon_i=y_i-x_i^{\top}\beta$$ are independent and
$$\epsilon_i\sim\mathcal{N}(0,\sigma^{2})$$. Four assumptions are embedded in
that line: the conditional mean is **linear**, the noise is **Gaussian**, has
**constant** variance (homoscedastic) and is **independent** across
observations. In matrix form,

$$
y\mid X\;\sim\;\mathcal{N}\big(X\beta,\;\sigma^{2}I_n\big).
$$

### Likelihood and log-likelihood

The density of one observation is

$$
p(y_i\mid x_i,\beta,\sigma^{2})
=
\frac{1}{\sqrt{2\pi\sigma^{2}}}
\exp\!\left(-\frac{(y_i-x_i^{\top}\beta)^{2}}{2\sigma^{2}}\right).
$$

By independence, the joint likelihood is the product,

$$
p(y\mid X,\beta,\sigma^{2})
=
\prod_{i=1}^{n}p(y_i\mid x_i,\beta,\sigma^{2})
=
(2\pi\sigma^{2})^{-n/2}
\exp\!\left(-\frac{1}{2\sigma^{2}}\lVert y-X\beta\rVert^{2}\right),
$$

and the log-likelihood is

$$
\ell(\beta,\sigma^{2})
=
-\frac{n}{2}\log(2\pi)
-\frac{n}{2}\log\sigma^{2}
-\frac{1}{2\sigma^{2}}\lVert y-X\beta\rVert^{2}.
$$

### Maximum likelihood coincides with least squares

For fixed $$\sigma^{2}$$, $$\ell$$ depends on $$\beta$$ only through the term
$$-\frac{1}{2\sigma^{2}}\lVert y-X\beta\rVert^{2}$$, which is maximal exactly
when $$\lVert y-X\beta\rVert^{2}$$ is minimal. Hence,

$$
\hat\beta_{\mathrm{ML}}
=
\arg\min_{\beta}\lVert y-X\beta\rVert^{2}
=
(X^{\top}X)^{-1}X^{\top}y
=
\hat\beta_{\mathrm{OLS}}.
$$

It is the Gaussian assumption that promotes least squares from a "reasonable
geometric choice" to a **maximum likelihood estimator**. For the variance,
solving $$\partial\ell/\partial\sigma^{2}=0$$,

$$
\hat\sigma^{2}_{\mathrm{ML}}
=
\frac{1}{n}\lVert y-X\hat\beta\rVert^{2}
=
\frac{1}{n}\lVert\hat\epsilon\rVert^{2}.
$$

This estimator is **biased** (it divides by $$n$$, not $$n-p$$). The unbiased
version, used in practice, is

$$
s^{2}=\frac{\lVert\hat\epsilon\rVert^{2}}{\,n-p\,},
$$

sometimes written as $$\mathrm{RSS}/(n-p)$$.

### Distribution of the estimator

Since $$\hat\beta=(X^{\top}X)^{-1}X^{\top}y$$ is a **linear** function of $$y$$,
and $$y\mid X$$ is Gaussian, $$\hat\beta$$ is too:

$$
\hat\beta\mid X\;\sim\;\mathcal{N}\big(\beta,\;\sigma^{2}(X^{\top}X)^{-1}\big).
$$

This is the **exact** distribution, valid for any finite $$n$$ under the
Gaussian model, not just asymptotic. From it follow the inference tools:

- for each coefficient,
  $$\hat\beta_j\mid X\sim\mathcal{N}\big(\beta_j,\;\sigma^{2}[(X^{\top}X)^{-1}]_{jj}\big)$$;
- replacing $$\sigma^{2}$$ by $$s^{2}$$,
  $$\dfrac{\hat\beta_j-\beta_j}{s\,\sqrt{[(X^{\top}X)^{-1}]_{jj}}}\sim t_{\,n-p}$$,
  which gives $$t$$ tests and confidence intervals for the coefficients;
- $$\lVert\hat\epsilon\rVert^{2}/\sigma^{2}\sim\chi^{2}_{\,n-p}$$, and this
  quantity is independent of $$\hat\beta$$.

### Unbiasedness and variance

Recalling what we saw in lecture 2.1, under $$\mathbb{E}[\epsilon\mid X]=0$$ the
estimator is unbiased,

$$
\mathbb{E}[\hat\beta\mid X]
=
(X^{\top}X)^{-1}X^{\top}X\beta
=
\beta,
$$

and under $$\operatorname{Var}(\epsilon\mid X)=\sigma^{2}I$$ the covariance is

$$
\operatorname{Var}(\hat\beta\mid X)=\sigma^{2}(X^{\top}X)^{-1}.
$$

The square roots of the diagonal elements of that matrix (with $$\sigma^{2}$$
estimated by $$s^{2}$$) are the **standard errors** of the coefficients. The
variance grows when $$\sigma^{2}$$ is large, when $$n$$ is small and when the
columns of $$X$$ are nearly collinear.

### Gauss-Markov

The **Gauss-Markov theorem** states that, under zero mean and variance
$$\sigma^{2}I$$, the OLS estimator has the smallest variance among all
estimators linear in $$y$$ and unbiased (it is BLUE). It **does not require
normality**. What the Gaussian assumption adds is stronger:

- OLS becomes minimum variance among **all** unbiased estimators, not just the
  linear ones (it attains the Cramér-Rao bound);
- the exact distributions of $$\hat\beta$$, $$s^{2}$$ and the $$t$$ and $$F$$
  statistics become available for finite-$$n$$ inference.

### Homoscedasticity and heteroscedasticity

**Homoscedasticity** is the assumption of constant variance,
$$\operatorname{Var}(\epsilon_i\mid x_i)=\sigma^{2}$$ for all $$i$$. It is what
guarantees $$\operatorname{Var}(\hat\beta)=\sigma^{2}(X^{\top}X)^{-1}$$ and the
Gauss-Markov theorem.

There is **heteroscedasticity** when the error variance varies with the
observation, $$\operatorname{Var}(\epsilon_i\mid x_i)=\sigma_i^{2}$$. It is the
typical situation in Astronomy: photometric errors are larger for fainter
sources, and uncertainties change with magnitude, color or *redshift*. The
consequences:

- $$\hat\beta_{\mathrm{OLS}}$$ remains **unbiased**, since that only depends on
  $$\mathbb{E}[\epsilon\mid X]=0$$;
- but it stops being efficient (no longer BLUE), and the formula
  $$\sigma^{2}(X^{\top}X)^{-1}$$ becomes **wrong**, which invalidates standard
  errors, tests and intervals.

Three usual responses:

1. **Robust standard errors** (sandwich, or Huber-White): keep OLS and correct
   only the inference,
   $$
   \widehat{\operatorname{Var}}(\hat\beta)
   =
   (X^{\top}X)^{-1}
   \Big(\textstyle\sum_{i}\hat\epsilon_i^{2}\,x_i x_i^{\top}\Big)
   (X^{\top}X)^{-1}.
   $$
2. **Weighted least squares** (WLS): if
   $$\operatorname{Var}(\epsilon_i)=\sigma^{2}/w_i$$ with known weights, one
   minimizes $$\sum_i w_i\,(y_i-x_i^{\top}\beta)^{2}$$. This is maximum
   likelihood under Gaussian noise with weights $$w_i=1/\sigma_i^{2}$$ and
   recovers the BLUE estimator. In Astronomy, one uses $$w_i=1/\sigma_i^{2}$$
   with $$\sigma_i$$ equal to the measured uncertainty of each point.
3. **Generalized least squares** (GLS): for a general covariance
   $$\operatorname{Var}(\epsilon\mid X)=\Omega$$,
   $$
   \hat\beta_{\mathrm{GLS}}
   =
   (X^{\top}\Omega^{-1}X)^{-1}X^{\top}\Omega^{-1}y.
   $$
