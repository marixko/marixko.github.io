---
title: 1.2 - Loss functions and risk
course: ml
---

## Loss functions and risk

In the previous lecture we said that learning is choosing a prediction function
$$f$$ that "errs little". In this lecture we make that idea precise: a **loss
function** defines what it means to err, the **risk** measures the average error
over the whole generating process, and the **Bayes optimal predictor** is the
best one can do: the target that every algorithm tries to reach.

### Contents

- Loss function
- Squared loss
- Absolute loss
- 0-1 loss
- Log-loss
- Expected risk
- Empirical risk
- Bayes optimal predictor

### Loss function

A **loss function** is a function

$$
L:\mathcal{Y}\times\mathcal{Y}\rightarrow\mathbb{R}_{\geq 0},
$$

where $$L(y,\hat y)$$ is the cost of predicting $$\hat y$$ when the true value
is $$y$$. In general we ask that $$L(y,y)=0$$ (no cost when we are right) and
that $$L\geq 0$$. The choice of $$L$$ is not a technical detail: it encodes
which errors are tolerable and which are serious and, as we will see,
determines which feature of the distribution of $$Y$$ the model will learn.

On the regression side ($$Y$$ continuous) the most common losses depend only on
the **residual** $$r = y-\hat y$$. On the classification side ($$Y$$
categorical) the loss depends on whether the label is right or wrong, or on the
probability the model assigned to the correct label.

### Squared loss

The **squared loss** (or squared error, $$L_2$$) is

$$
L(y,\hat y)=(y-\hat y)^2.
$$

It is the default choice in regression. Since the residual enters squared, it
penalizes large errors **disproportionately**: an error of $$2$$ costs four
times as much as an error of $$1$$. This makes it sensitive to *outliers* and
heavy tails. Statistically, minimizing the squared loss is equivalent to
assuming Gaussian noise with constant variance: least squares estimation is
maximum likelihood under

$$
Y\mid X=x \;\sim\; \mathcal{N}\big(f(x),\,\sigma^2\big).
$$

### Absolute loss

The **absolute loss** ($$L_1$$) is

$$
L(y,\hat y)=\lvert y-\hat y\rvert.
$$

The residual enters linearly, so large errors weigh less than in the squared
loss: it is **more robust** to *outliers*. The price is that $$L$$ is not
differentiable at $$r=0$$, which complicates the optimization a bit. It
corresponds to maximum likelihood under Laplace noise,

$$
p(y\mid x)\;\propto\;\exp\!\big(-\lvert y-f(x)\rvert/b\big).
$$

### 0-1 loss

In classification, the most natural loss is the **0-1 loss**:

$$
L(y,\hat y)=\mathbf{1}[\,y\neq\hat y\,]
=
\begin{cases}
0, & \hat y = y,\\
1, & \hat y \neq y.
\end{cases}
$$

The associated risk is simply the **probability of misclassifying**. It is the
metric that actually matters in many problems, but it is **non-convex** and
**non-differentiable** (piecewise constant, with a jump). Optimizing it
directly is a hard combinatorial problem, and so algorithms minimize convex
*surrogate losses*, such as the log-loss below, the SVM *hinge loss* or the
boosting exponential, which are tractable and whose minimum coincides (under
mild conditions) with that of the 0-1 loss.

### Log-loss

When the classifier produces **probabilities** instead of just a label, we
evaluate those probabilities with the **log-loss** (cross-entropy, or *negative
log-likelihood*). Let $$\hat p(x)$$ be the probability distribution over the
classes that the model predicts at $$x$$. In the binary case, with
$$y\in\{0,1\}$$ and $$\hat p=\hat p(x)=\hat P(Y=1\mid X=x)$$,

$$
L(y,\hat p)=-\big[\,y\log\hat p+(1-y)\log(1-\hat p)\,\big].
$$

In the $$K$$-class case, with $$\hat p_k$$ the predicted probability for class
$$k$$,

$$
L(y,\hat p)=-\sum_{k=1}^{K}\mathbf{1}[\,y=k\,]\log\hat p_k=-\log\hat p_y.
$$

The log-loss blows up when the model assigns a probability near zero to the
label that actually occurred: it punishes both the error and the
**overconfidence**. It is a *proper scoring rule*: in expectation, it is
minimized exactly when $$\hat p(x)$$ equals the true conditional distribution
$$P(Y\mid X=x)$$. This makes it the appropriate loss when one wants a
**well-calibrated** model, not just good decision boundaries.

### Expected risk

Once the loss is fixed, the quality of a function $$f$$ is its **expected
risk** (also called population risk or generalization error):

$$
R(f)=\mathbb{E}_{(X,Y)\sim P}\big[\,L\big(Y,f(X)\big)\,\big].
$$

It is the average of the loss over the **whole** generating process, not just
over the data we have. Using the law of total expectation, we can condition on
$$X$$:

$$
R(f)=\mathbb{E}_{X}\Big[\;\mathbb{E}_{Y\mid X}\big[\,L(Y,f(X))\,\big\vert\,X\,\big]\;\Big].
$$

This form is important: since the inner term depends on $$f$$ only through the
value $$f(x)$$, we can **minimize pointwise**, choosing, for each $$x$$, the
value $$f(x)$$ that minimizes the conditional expected loss. This is what leads
to the Bayes predictor, later on.

### Empirical risk

Since $$P$$ is unknown, we cannot compute $$R(f)$$. We replace the expectation
by the average over the training set $$D=\{(x_i,y_i)\}_{i=1}^{n}$$, obtaining
the **empirical risk**:

$$
\hat R_n(f)=\frac{1}{n}\sum_{i=1}^{n}L\big(y_i,f(x_i)\big).
$$

For a **fixed** $$f$$, $$\hat R_n(f)$$ is an unbiased estimator of $$R(f)$$,
with $$\mathbb{E}[\hat R_n(f)]=R(f)$$, and by the law of large numbers
$$\hat R_n(f)\to R(f)$$ as $$n\to\infty$$. The principle of **empirical risk
minimization** (ERM) chooses

$$
\hat f=\arg\min_{f\in\mathcal{H}}\hat R_n(f).
$$

The caution: as soon as $$\hat f$$ is chosen **using** the same data,
$$\hat R_n(\hat f)$$ stops being unbiased and becomes **optimistic**, that is,
it underestimates the true risk. The difference

$$
R(\hat f)-\hat R_n(\hat f)
$$

is the generalization gap, and it grows with the richness of $$\mathcal{H}$$:
it is the formal manifestation of overfitting. That is why the risk is
estimated on an independent test set.

### Bayes optimal predictor

The **Bayes predictor** $$f^{*}$$ is the function that minimizes $$R(f)$$ among
**all** (measurable) functions, without the restriction to a hypothesis space:

$$
f^{*}=\arg\min_{f}R(f),
\qquad
R^{*}=R(f^{*}).
$$

$$R^{*}$$ is the **Bayes risk**, the minimum possible error, due only to the
intrinsic noise of $$P(Y\mid X)$$. No model, however good, can go below it. By
minimizing the conditional risk pointwise, we get $$f^{*}$$ for each loss:

| Loss | Bayes predictor $$f^{*}(x)$$ |
| --- | --- |
| Squared | $$\mathbb{E}[\,Y\mid X=x\,]$$ (conditional mean) |
| Absolute | median of $$Y\mid X=x$$ |
| 0-1 | $$\displaystyle\arg\max_{k}P(Y=k\mid X=x)$$ (Bayes classifier) |
| Log-loss | the distribution $$P(Y\mid X=x)$$ itself |

For the 0-1 loss, the Bayes risk has an explicit form:

$$
R^{*}=\mathbb{E}_{X}\Big[\,1-\max_{k}P(Y=k\mid X)\,\Big].
$$

In practice we never reach $$f^{*}$$, and the error of a model decomposes into

$$
\underbrace{R(\hat f)-R^{*}}_{\text{excess risk}}
=
\underbrace{\big(R(f_{\mathcal{H}})-R^{*}\big)}_{\text{approximation error}}
+
\underbrace{\big(R(\hat f)-R(f_{\mathcal{H}})\big)}_{\text{estimation error}},
$$

where $$f_{\mathcal{H}}$$ is the best element of $$\mathcal{H}$$. The
approximation error comes from $$\mathcal{H}$$ being too small (bias); the
estimation error comes from having too little data to find the best $$f$$ in
$$\mathcal{H}$$ (variance). This is the **bias-variance trade-off** seen
through the lens of risk.
