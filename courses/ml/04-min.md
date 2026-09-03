---
title: 1.4 - Empirical Risk Minimization
course: ml
---

## Empirical risk minimization

In the previous lectures we defined the Bayes predictor $$f^{*}$$, the ideal
target. The problem is that it depends on $$P(X,Y)$$, which we do not know: we
only have a finite sample. This lecture deals with the practical principle that
replaces the true risk with its sample version, and shows that maximum
likelihood, central in Statistics, is a special case of that same principle.

### Contents

- Empirical risk minimization (ERM)
- Population risk versus empirical risk
- Maximum likelihood as a learning problem
- Log-likelihood
- Negative log-likelihood
- The relationship between Statistics and Machine Learning

### The ERM principle

Since we cannot compute the population risk

$$
R(f)=\mathbb{E}_{(X,Y)\sim P}\big[\,L(Y,f(X))\,\big],
$$

we replace the expectation under $$P$$ by the average over the training set
$$D=\{(x_i,y_i)\}_{i=1}^{n}$$. This defines the **empirical risk**

$$
\hat R_n(f)=\frac{1}{n}\sum_{i=1}^{n}L\big(y_i,f(x_i)\big),
$$

and the principle of **empirical risk minimization** (ERM) chooses the
predictor that makes it smallest within the hypothesis space $$\mathcal{H}$$:

$$
\hat f=\arg\min_{f\in\mathcal{H}}\;\hat R_n(f).
$$

Almost every supervised learning algorithm is an instance of ERM: the loss
$$L$$ changes, the family $$\mathcal{H}$$ changes and the optimizer changes, but
the structure is always this one. When $$\mathcal{H}$$ is parameterized by
$$\theta$$, we write $$f_\theta$$ and minimize over $$\theta$$.

### Population risk versus empirical risk

For a **fixed** $$f$$, chosen without looking at the data, the empirical risk
is an unbiased estimator of the population risk:

$$
\mathbb{E}\big[\hat R_n(f)\big]=R(f),
$$

and by the law of large numbers $$\hat R_n(f)\to R(f)$$ as $$n\to\infty$$, with
a fluctuation of order $$1/\sqrt{n}$$ by the central limit theorem.

The problem appears when the same set $$D$$ is used to **choose** $$\hat f$$.
Then $$\hat f$$ comes to depend on the noise of the sample, and
$$\hat R_n(\hat f)$$ stops being unbiased: it is **optimistic**, that is, it
systematically underestimates $$R(\hat f)$$. The quantity that controls the
error is the maximum deviation over the whole class,

$$
\sup_{f\in\mathcal{H}}\big\lvert\,\hat R_n(f)-R(f)\,\big\rvert,
$$

which grows with the **capacity** of $$\mathcal{H}$$ (number of parameters, VC
dimension and related concepts we will see later). A rich $$\mathcal{H}$$ can
lower $$\hat R_n$$ by fitting the noise, without lowering $$R$$: that is
overfitting. This is why $$R(\hat f)$$ is estimated on an independent test set,
and the difference $$R(\hat f)-\hat R_n(\hat f)$$ is the **generalization
gap**.

### Maximum likelihood as a learning problem

Suppose the model is **probabilistic**: for each $$\theta$$ it defines a
conditional density $$p_\theta(y\mid x)$$. The **likelihood** of the data is
the probability of observing the training set as a function of $$\theta$$.
Assuming the observations are independent,

$$
\mathcal{L}(\theta)=\prod_{i=1}^{n}p_\theta(y_i\mid x_i),
$$

and the **maximum likelihood** estimator is

$$
\hat\theta=\arg\max_{\theta}\;\prod_{i=1}^{n}p_\theta(y_i\mid x_i).
$$

### Log-likelihood

Working with the product is bad: it produces tiny numbers (numerical problems)
and its derivative, by the product rule, is awkward. Since the logarithm is
**strictly increasing**, maximizing $$\mathcal{L}(\theta)$$ is the same as
maximizing the **log-likelihood**

$$
\ell(\theta)=\log\mathcal{L}(\theta)=\sum_{i=1}^{n}\log p_\theta(y_i\mid x_i).
$$

The product became a sum, which makes the optimization and the asymptotic
analysis much simpler. The gradient $$\nabla_\theta\ell(\theta)$$ is called the
**score**, and $$\hat\theta$$ solves $$\nabla_\theta\ell(\hat\theta)=0$$.

### Negative log-likelihood

Since optimizers minimize by convention, we flip the sign and define the
**negative log-likelihood** (NLL):

$$
\mathrm{NLL}(\theta)=-\ell(\theta)=-\sum_{i=1}^{n}\log p_\theta(y_i\mid x_i).
$$

Dividing by $$n$$, this is **exactly** an empirical risk with the loss function

$$
L(y,\theta;x)=-\log p_\theta(y\mid x).
$$

That is, **maximum likelihood is ERM with the log-loss**. Each choice of
$$p_\theta$$ recovers a familiar loss:

| Model $$p_\theta(y\mid x)$$ | $$-\log p_\theta(y\mid x)$$ | Equivalent loss |
| --- | --- | --- |
| $$\mathcal{N}\big(f_\theta(x),\sigma^2\big)$$ | $$\dfrac{(y-f_\theta(x))^2}{2\sigma^2}+\tfrac12\log(2\pi\sigma^2)$$ | squared error (least squares) |
| Bernoulli$$\big(\hat p_\theta(x)\big)$$ | $$-\big[y\log\hat p_\theta+(1-y)\log(1-\hat p_\theta)\big]$$ | binary log-loss |
| Categorical$$\big(\hat p_\theta(x)\big)$$ | $$-\log \hat p_{\theta,y}(x)$$ | cross-entropy |
| Poisson$$\big(\lambda_\theta(x)\big)$$ | $$\lambda_\theta(x)-y\log\lambda_\theta(x)+\log y!$$ | Poisson loss |

So, "assuming Gaussian noise" and "minimizing the squared error" are the same
statement, seen from two angles.

### Statistics and Machine Learning

The picture that emerges is that **Statistics and machine learning attack the
same problem**: estimating aspects of $$P(Y\mid X)$$ from a sample. What
differs are the emphases.

- Classical Statistics focuses on the **parameter**: consistency of
  $$\hat\theta$$, asymptotic distribution, confidence intervals, hypothesis
  tests, and it usually assumes the model $$p_\theta$$ is correct.
- Machine learning focuses on **prediction**: the object of interest is
  $$R(\hat f)$$ on new data, $$\mathcal{H}$$ is chosen by its ability to
  generalize and not for being "true", and the scalability of the optimizer
  matters as much as the statistics.

The bridge between the two sides is **regularization**. Adding a penalty term
in favor of small $$\theta$$,

$$
\hat\theta=\arg\min_{\theta}\;\Big[\,-\sum_{i=1}^{n}\log p_\theta(y_i\mid x_i)\;-\;\log \pi(\theta)\,\Big],
$$

is, on the statistical side, a **maximum a posteriori** estimate with prior
$$\pi(\theta)$$ and, on the ML side, a penalized empirical risk that trades a
little bias for less variance. The $$L_2$$ penalty corresponds to a Gaussian
prior; the $$L_1$$ penalty, to a Laplace prior. This is the topic of the next
lectures.
