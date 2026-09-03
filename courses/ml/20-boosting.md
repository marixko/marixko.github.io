---
title: "4.4 - Boosting"
course: ml
---

## Boosting

Random forests combine strong trees **in parallel** to reduce variance.
*Boosting* does the opposite: it combines **weak** models **sequentially**, each
one correcting the errors of the previous ensemble, and mainly reduces the bias.

### Contents

- Weak learners
- Additive models
- AdaBoost
- Exponential loss
- Sequential learning

### Weak learners and the additive model

A *weak learner* is a model only slightly better than chance, such as a
**decision stump** (a tree of depth $$1$$). *Boosting* combines $$M$$ of these
into an **additive model**

$$
F_M(x)=\sum_{m=1}^{M}\alpha_m\,h_m(x),
$$

where each $$h_m$$ is a *weak learner* and $$\alpha_m$$ its weight.

### Sequential learning

The essential difference from *bagging* is that the $$h_m$$ are **not**
independent: $$h_m$$ is fit after $$h_1,\ldots,h_{m-1}$$ and its task is to fix
what the current ensemble $$F_{m-1}$$ still gets wrong. This is done by
**forward stagewise additive modeling**: at each round, everything already built
is kept and a new term $$\alpha_m h_m$$ that reduces the loss the most is added.

### AdaBoost

The original algorithm, for binary classification with $$y\in\{-1,+1\}$$, keeps
a weight $$w_i$$ on each training point. At each round $$m$$:

1. fit $$h_m$$ to the data **weighted** by $$w_i$$;
2. compute the weighted error
   $$\epsilon_m=\sum_i w_i\,\mathbf{1}[\,y_i\neq h_m(x_i)\,]\big/\sum_i w_i$$;
3. set the model weight
   $$\alpha_m=\tfrac{1}{2}\log\dfrac{1-\epsilon_m}{\epsilon_m}$$;
4. update the point weights,
   $$w_i\leftarrow w_i\,\exp\!\big(-\alpha_m\,y_i\,h_m(x_i)\big)$$, and
   renormalize.

Misclassified points gain weight, so the next round focuses on them. The final
prediction is $$F(x)=\operatorname{sign}\big(\sum_m\alpha_m h_m(x)\big)$$.

### AdaBoost as exponential loss

What looks like an *ad hoc* weighting scheme is, in fact, forward stagewise
additive modeling with the **exponential loss**

$$
L(y,F)=e^{-y\,F(x)}.
$$

Minimizing the expected exponential loss over $$F(x)$$ gives

$$
F^{*}(x)=\tfrac{1}{2}\log\frac{P(Y=1\mid x)}{P(Y=-1\mid x)},
$$

that is, half the logit. Each AdaBoost step solves exactly the subproblem of
choosing $$h_m$$ and $$\alpha_m$$ that reduce that loss the most, keeping
$$F_{m-1}$$ fixed. The weights $$w_i$$ that appear are
$$e^{-y_iF_{m-1}(x_i)}$$.

### Boosting reduces bias

Since each round attacks the remaining errors, *boosting* progressively
decreases the **bias**, and can turn decision stumps (high bias) into a
low-error classifier. That is why *weak learners* are used: models that are
already strong leave little to correct and the process saturates quickly.

### Sensitivity to noise

The exponential loss grows very fast for points misclassified with a large
margin. With noisy labels, AdaBoost puts too much weight on those points and can
overfit. Replacing the exponential loss by a less aggressive loss (the logistic
*deviance*) fixes this, and is the starting point of *gradient boosting*, in the
next lecture.
