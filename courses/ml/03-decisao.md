---
title: 1.3 - The Bayes Predictor and Statistical Decision Theory
course: ml
---

## The Bayes predictor and statistical decision theory

In the previous lecture we defined the risk and stated, without proof, which is
the optimal predictor for each loss function. In this lecture we close that
gap. The tool is **statistical decision theory**, which treats prediction as
the choice of an action under uncertainty, and the key is a simple observation:
the risk can be minimized separately at each point $$x$$.

### Contents

- Statistical decision
- Decision rule
- Optimal predictor
- Bayes risk
- Loss function and the choice of estimator

### Statistical decision

A statistical decision problem has four ingredients:

- the **quantity of interest**, here the response $$Y$$, whose value is
  uncertain;
- an **action space** $$\mathcal{A}$$, the set of possible predictions (for
  example $$\mathcal{A}=\mathbb{R}$$ in regression, or the set of classes in
  classification);
- a **loss function** $$L(y,a)$$, the cost of taking action $$a$$ when the true
  response is $$y$$;
- the **data** $$X$$, which carry information about $$Y$$ through the joint
  distribution $$P(X,Y)$$.

Predicting is choosing an action $$a\in\mathcal{A}$$ for each observed value of
$$X$$, before knowing $$Y$$.

### Decision rule

A **decision rule** is a function

$$
\delta:\mathcal{X}\rightarrow\mathcal{A}
$$

that associates to each input $$x$$ an action $$\delta(x)$$. In our context the
decision rule is exactly the prediction function $$f$$. The quality of a rule
is measured by the risk we already know,

$$
R(\delta)=\mathbb{E}_{(X,Y)\sim P}\big[\,L\big(Y,\delta(X)\big)\,\big].
$$

We want the rule that minimizes $$R(\delta)$$ among all possible rules.

### The optimal predictor (Bayes rule)

Applying the law of total expectation, we write the risk conditioning on $$X$$:

$$
R(\delta)
=
\mathbb{E}_{X}\Big[\;
\underbrace{\mathbb{E}_{Y\mid X}\big[\,L(Y,\delta(X))\,\big\vert\,X\,\big]}_{\text{conditional risk at }X}
\;\Big].
$$

The inner term depends on the rule only through the value $$\delta(x)$$, and the
outer term is an average of non-negative quantities. Hence, to minimize
$$R(\delta)$$ it is enough to minimize the **conditional risk** separately at
each point. The **Bayes predictor** is

$$
\boxed{
\,f^{*}(x)=\arg\min_{a\in\mathcal{A}}\;\mathbb{E}\big[\,L(Y,a)\,\big\vert\,X=x\,\big]\,}
$$

All that remains is to solve this minimization problem in $$a$$ for each loss
function. That is what we do next.

### Squared loss: the conditional mean

For $$L(y,a)=(y-a)^2$$, the conditional risk at $$x$$ is

$$
g(a)=\mathbb{E}\big[(Y-a)^2\,\big\vert\,X=x\,\big].
$$

Add and subtract $$\mu(x):=\mathbb{E}[\,Y\mid X=x\,]$$ inside the square:

$$
g(a)
=
\mathbb{E}\big[(Y-\mu(x))^2\,\big\vert\,x\,\big]
+
\big(\mu(x)-a\big)^2,
$$

since the cross term $$2\,(\mu(x)-a)\,\mathbb{E}[\,Y-\mu(x)\mid x\,]$$ vanishes
by the definition of $$\mu(x)$$. The first term is
$$\operatorname{Var}(Y\mid X=x)$$ and **does not depend on $$a$$**; the second
is non-negative and vanishes when $$a=\mu(x)$$. Therefore,

$$
f^{*}(x)=\mathbb{E}[\,Y\mid X=x\,].
$$

The squared loss makes the model estimate the **conditional mean**, and the
irreducible residual is the conditional variance.

### Absolute loss: the conditional median

For $$L(y,a)=\lvert y-a\rvert$$, the conditional risk at $$x$$ is
$$g(a)=\mathbb{E}\big[\,\lvert Y-a\rvert\,\big\vert\,X=x\,\big]$$. Differentiating
with respect to $$a$$ (interchanging derivative and expectation is valid here),

$$
g'(a)
=
\mathbb{E}\big[\,\operatorname{sign}(a-Y)\,\big\vert\,x\,\big]
=
P(Y<a\mid x)-P(Y>a\mid x).
$$

Setting this to zero, we look for $$a$$ such that $$P(Y<a\mid x)=P(Y>a\mid x)$$,
that is, $$P(Y\le a\mid x)\ge \tfrac12$$ and $$P(Y\ge a\mid x)\ge \tfrac12$$.
This is precisely the definition of the **median** of $$Y\mid X=x$$. Hence,

$$
f^{*}(x)=\operatorname{median}(Y\mid X=x).
$$

Since the median is little affected by heavy tails, the absolute loss produces
predictions that are more robust to *outliers* than the squared loss.

### Classification: 0-1 loss and the Bayes classifier

Now $$Y$$ takes values in a finite set of classes and
$$L(y,a)=\mathbf{1}[\,y\neq a\,]$$. The conditional risk at $$x$$ is

$$
g(a)
=
\mathbb{E}\big[\,\mathbf{1}[\,Y\neq a\,]\,\big\vert\,X=x\,\big]
=
P(Y\neq a\mid X=x)
=
1-P(Y=a\mid X=x).
$$

Minimizing $$g(a)$$ is maximizing $$P(Y=a\mid X=x)$$. The Bayes predictor is the
**Bayes classifier**, which chooses the most probable class *a posteriori*:

$$
f^{*}(x)=\arg\max_{y}\;P(Y=y\mid X=x).
$$

The decision boundary between two classes is the locus where the *posterior*
probabilities become equal.

### Bayes risk

The risk of the Bayes predictor, $$R^{*}=R(f^{*})$$, is the **Bayes risk**: the
smallest risk attainable by any decision rule. It measures the uncertainty that
remains even knowing $$P(X,Y)$$ perfectly, and is therefore often called the
irreducible error. Substituting each optimal predictor into the risk, we get
closed forms:

| Loss | Bayes predictor $$f^{*}(x)$$ | Bayes risk $$R^{*}$$ |
| --- | --- | --- |
| Squared | $$\mathbb{E}[\,Y\mid X=x\,]$$ | $$\mathbb{E}_{X}\big[\operatorname{Var}(Y\mid X)\big]$$ |
| Absolute | $$\operatorname{median}(Y\mid X=x)$$ | $$\mathbb{E}_{X}\big[\,\mathbb{E}(\lvert Y-\operatorname{median}\rvert\mid X)\big]$$ |
| 0-1 | $$\arg\max_{y}P(Y=y\mid X=x)$$ | $$\mathbb{E}_{X}\big[\,1-\max_{y}P(Y=y\mid X)\big]$$ |

A real model never reaches $$R^{*}$$, but it is the reference: the difference
$$R(\hat f)-R^{*}$$, the excess risk, is what can actually be reduced with more
data and better hypotheses.

### The loss function and the choice of estimator

The central conclusion of the lecture is that <mark>the loss function
determines which functional of the conditional distribution the model
estimates</mark>: the mean with the squared loss, the median with the absolute
loss, the mode with the 0-1 loss, and the entire distribution with the
log-loss. Choosing the loss is therefore a modeling decision, not an
implementation detail.

This also makes room for **asymmetric losses**, useful when erring high and
erring low have different costs. The *pinball* loss of level
$$\tau\in(0,1)$$,

$$
L_{\tau}(y,a)=\big(\tau-\mathbf{1}[\,y<a\,]\big)(y-a),
$$

has as its Bayes predictor the conditional **$$\tau$$-quantile** of
$$Y\mid X=x$$, and is the basis of quantile regression. In classification, a
cost matrix $$C(y,a)$$ replaces the 0-1 loss, and the Bayes rule becomes

$$
f^{*}(x)=\arg\min_{a}\;\sum_{y}C(y,a)\,P(Y=y\mid X=x).
$$

In Astronomy this is common: the cost of missing a rare object (a high-*redshift*
quasar, a transient) is usually much greater than that of contaminating the
sample with a false positive, and the cost matrix encodes exactly this
trade-off.
