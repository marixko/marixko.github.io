---
title: "4.5 - Gradient Boosting"
course: ml
---

## Gradient boosting

AdaBoost was tied to the exponential loss. *Gradient boosting* generalizes the
idea to **any** differentiable loss function, by reinterpreting *boosting* as
gradient descent, only in function space instead of parameter space.

### Contents

- Functional gradient descent
- Gradient boosting
- Loss functions
- Regression trees as weak learners

### Boosting as functional gradient descent

We want to minimize $$\sum_{i=1}^{n}L\big(y_i,F(x_i)\big)$$ over the function
$$F$$. Think of the values $$F(x_1),\ldots,F(x_n)$$ as the "coordinates" to
optimize. Gradient descent would take a step in the direction of the negative
gradient of that sum with respect to each $$F(x_i)$$. *Gradient boosting* does
this, but with a constraint: the step has to be a function from the class of
*weak learners*, so that the model generalizes to $$x$$ outside the training
set.

### Pseudo-residuals

At round $$m$$, the negative gradient evaluated at the current model
$$F_{m-1}$$ gives the **pseudo-residuals**

$$
r_{im}
=
-\left[\frac{\partial L\big(y_i,F(x_i)\big)}{\partial F(x_i)}\right]_{F=F_{m-1}}.
$$

They are the "direction" in which each prediction should move to reduce the
loss.

### The algorithm

1. initialize $$F_0(x)$$ with a constant (the one that minimizes the total
   loss);
2. for $$m=1,\ldots,M$$:
   - compute the pseudo-residuals $$r_{im}$$;
   - fit a *weak learner* $$h_m$$ to the pairs $$(x_i,r_{im})$$ by least
     squares;
   - choose the step $$\gamma_m$$ by line search,
     $$\gamma_m=\arg\min_{\gamma}\sum_i L\big(y_i,F_{m-1}(x_i)+\gamma\,h_m(x_i)\big)$$;
   - update
     $$F_m(x)=F_{m-1}(x)+\gamma_m\,h_m(x).$$

Note the parallel with lecture 2.4: it is the same iteration
$$\theta_{t+1}=\theta_t-\eta\nabla J$$, but in function space, and the
"gradient" is projected onto the class of *weak learners* by being fit by
$$h_m$$.

### The squared-loss case

With $$L(y,F)=\tfrac{1}{2}(y-F)^{2}$$, the pseudo-residual is

$$
r_{im}=y_i-F_{m-1}(x_i),
$$

the ordinary residual. So *gradient boosting* with squared loss is just
**repeatedly fitting the residuals**: each tree models what the sum of the
previous ones has not yet explained. With the logistic *deviance*, the
pseudo-residuals become $$y_i-p_{m-1}(x_i)$$ and one obtains a classifier; with
the absolute or the Huber loss, one gains robustness to *outliers*.

### Regression trees as weak learners

The standard *weak learner* is a **shallow regression tree** (depth $$2$$ to
$$8$$), always fit to the pseudo-residuals by least squares, regardless of the
original loss. The depth controls the order of the interactions the model
captures.

### Regularization

Without control, *gradient boosting* overfits. The usual mechanisms:

- **learning rate** (shrinkage) $$\nu\in(0,1]$$:
  $$F_m=F_{m-1}+\nu\,\gamma_m h_m$$, with $$\nu$$ small (for example $$0.1$$)
  and $$M$$ correspondingly larger;
- **subsampling** of rows (*stochastic gradient boosting*) and of columns at
  each tree;
- **depth** of the trees and number of leaves;
- **number of trees** $$M$$, chosen by early stopping on a validation set.

### Modern implementations and use

Current libraries (XGBoost, LightGBM, CatBoost) add an explicit regularization
term to the objective, use **second-order** information (a Newton step instead
of a gradient) and histograms to find splits quickly. Gradient boosting of
trees is today the reference method for **tabular** data, beating random forests
on most structured problems. In Astronomy it is widely used for *photo-z*,
classification and scoring of detections.
