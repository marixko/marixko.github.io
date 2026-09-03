---
title: "2.5 - Logistic Regression"
course: ml
---

## Logistic regression

This is the first classification model of the course, and it brings together
several threads we have seen: it models $$P(Y=1\mid x)$$ directly through a link
function, it is maximum likelihood with the log-loss (lectures 1.2 and 1.4),
and it is a **convex** ERM problem solved with the methods of lecture 2.4.

### Contents

- Binary classification and the model
- Log-odds and the logistic function
- Likelihood and cross-entropy
- Gradient and fitting
- Decision boundary
- Separability and the multiclass case

### Binary classification and the model

We have $$Y\in\{0,1\}$$ and we want to estimate $$P(Y=1\mid X=x)$$. A direct
linear model $$x^{\top}\beta$$ does not work, since it produces values outside
$$[0,1]$$. We pass the linear index through a **logistic function** (sigmoid):

$$
p(x)=P(Y=1\mid X=x)=\sigma\big(x^{\top}\beta\big),
\qquad
\sigma(z)=\frac{1}{1+e^{-z}}.
$$

The sigmoid maps $$\mathbb{R}$$ to $$(0,1)$$, is increasing, equals $$1/2$$ at
$$z=0$$, satisfies $$\sigma(-z)=1-\sigma(z)$$ and has derivative
$$\sigma'(z)=\sigma(z)\big(1-\sigma(z)\big)$$. The vector $$x$$ includes the
column of $$1$$ for the intercept. In the language of generalized linear
models, this is the GLM with Bernoulli response and logit link.

### Log-odds and the logistic function

Inverting the relation, the **odds** are $$p/(1-p)=e^{x^{\top}\beta}$$, and the
**logit** (log-odds) is linear in the predictors:

$$
\log\frac{P(Y=1\mid x)}{P(Y=0\mid x)}=x^{\top}\beta.
$$

Hence the interpretation of the coefficients: increasing $$x_j$$ by one unit,
holding the others fixed, multiplies the odds by $$e^{\beta_j}$$. A
$$\beta_j>0$$ means predictor $$j$$ increases the probability of class $$1$$.

### Likelihood and cross-entropy

Each observation is $$y_i\mid x_i\sim\text{Bernoulli}(p_i)$$ with
$$p_i=\sigma(x_i^{\top}\beta)$$. The likelihood is

$$
\mathcal{L}(\beta)=\prod_{i=1}^{n}p_i^{\,y_i}(1-p_i)^{\,1-y_i},
$$

and the *negative log-likelihood*, which is the **cross-entropy** (the log-loss
of lecture 1.2), is

$$
J(\beta)=-\sum_{i=1}^{n}\big[\,y_i\log p_i+(1-y_i)\log(1-p_i)\,\big].
$$

Divided by $$n$$, it is the empirical risk. There is no closed-form solution,
but $$J(\beta)$$ is **convex** in $$\beta$$ (the Hessian is positive
semidefinite, as shown below), so the global minimum is unique when it exists
and the iterative methods of lecture 2.4 apply with no risk of local minima.

### Gradient and fitting

Using $$\sigma'=\sigma(1-\sigma)$$ and the chain rule, the gradient has a
remarkably simple form:

$$
\nabla J(\beta)=\sum_{i=1}^{n}(p_i-y_i)\,x_i=X^{\top}(p-y),
$$

with $$p=\big(\sigma(x_1^{\top}\beta),\ldots,\sigma(x_n^{\top}\beta)\big)^{\top}$$.
The parallel with OLS holds, where the gradient is $$X^{\top}(X\beta-y)$$: the
role of the residual is now played by $$p_i-y_i$$. The Hessian is

$$
\nabla^{2}J(\beta)=\sum_{i=1}^{n}p_i(1-p_i)\,x_i x_i^{\top}=X^{\top}WX,
\qquad
W=\operatorname{diag}\big(p_i(1-p_i)\big)\succeq 0,
$$

which confirms convexity. The Newton step can be rewritten as **iteratively
reweighted least squares** (IRLS):

$$
\beta_{t+1}=(X^{\top}W_tX)^{-1}X^{\top}W_t\,z_t,
\qquad
z_t=X\beta_t+W_t^{-1}(y-p_t),
$$

that is, each iteration is a WLS with weights $$p_i(1-p_i)$$ and working
response $$z_t$$. It converges in a few iterations. For large $$n$$ or $$p$$,
L-BFGS or SGD is used. Adding $$\lambda\lVert\beta\rVert_2^{2}$$ or
$$\lambda\lVert\beta\rVert_1$$ to the objective (regularized logistic
regression) is common and recommended, especially with nearly separable data.

### Decision boundary

The Bayes rule for the 0-1 loss (lecture 1.3) classifies as $$1$$ when
$$p(x)>1/2$$, that is, when $$x^{\top}\beta>0$$. The **decision boundary**

$$
\{\,x:\ x^{\top}\beta=0\,\}
$$

is a **hyperplane**. This is why logistic regression is a linear classifier:
the boundary is linear even though the probability is a nonlinear (sigmoid)
function of $$x$$.

A threshold other than $$1/2$$ is used when the classes have asymmetric costs
or are imbalanced: classifying as $$1$$ when $$p(x)>c$$ is equivalent to
requiring $$x^{\top}\beta>\log\frac{c}{1-c}$$. Nonlinear boundaries are obtained
by expanding $$x$$ with polynomial terms, *kernels* or learned representations,
and applying the logistic on the transformed *features*.

### Separability and the multiclass case

If the data are **linearly separable**, maximum likelihood **has no finite
solution**: it is always possible to decrease $$J(\beta)$$ by increasing
$$\lVert\beta\rVert$$, pushing the probabilities toward $$0$$ and $$1$$. The
signs are diverging coefficients and exploding standard errors. Any
regularization with $$\lambda>0$$ (or early stopping) solves the problem,
making the minimum finite.

For $$K$$ classes, it generalizes with the **softmax** function (multinomial
logistic regression):

$$
P(Y=k\mid x)=\frac{e^{x^{\top}\beta_k}}{\sum_{l=1}^{K}e^{x^{\top}\beta_l}},
$$

whose *negative log-likelihood* is the categorical cross-entropy of lecture
1.4. For identifiability, one of the $$\beta_k$$ is fixed at zero or
regularization is used.
