---
title: "3.1 - Generalization"
course: ml
---

## Generalization

Part III of the course, on learning theory, begins here. The central question
is the one that separates machine learning from mere interpolation: will a
model fit to one sample work well on **new** data? This lecture fixes the
vocabulary (the various "errors"), defines the generalization gap and describes
the phenomenon of overfitting.

### Contents

- Training error and test error
- Population risk and empirical risk
- The generalization gap
- Overfitting and underfitting
- Model complexity

### The four errors

Let $$\hat f$$ be the model fit to the training set $$D$$ and $$L$$ the loss
function. Four quantities appear all the time:

- **Population risk** (or generalization error):
  $$R(f)=\mathbb{E}_{(X,Y)\sim P}[L(Y,f(X))]$$. It is what we want to minimize,
  and we cannot compute it.
- **Empirical risk** on a set of $$m$$ points:
  $$\hat R(f)=\frac{1}{m}\sum_{i=1}^{m}L(y_i,f(x_i))$$. It is what we can
  compute.
- **Training error**: the empirical risk evaluated on the **same** data used
  to fit $$\hat f$$.
- **Test error**: the empirical risk evaluated on an **independent** set that
  $$\hat f$$ has never seen. It is our best estimate of $$R(\hat f)$$.

### The generalization gap

The difference between the real performance and the apparent performance is

$$
R(\hat f)-\hat R(\hat f),
$$

the **generalization gap**. For a fixed model $$f$$, chosen without looking at
the data, the training error is an unbiased estimator of $$R(f)$$ and the gap
tends to zero. The problem is that $$\hat f$$ **is** chosen from $$D$$: the fit
chases the noise of the sample, so $$\hat R(\hat f)$$ is optimistic and the gap
is positive. Controlling it is the subject of all of Part III.

### Optimism of the training error

The training error almost always underestimates $$R(\hat f)$$, and the
underestimation grows with the freedom the model has to adapt. In the limit, a
sufficiently flexible model can reach **zero** training error by memorizing
every point, without having learned anything about $$P$$. That is why model
selection is never based on the training error.

### Overfitting and underfitting

- **Underfitting**: the model is too rigid to capture the real pattern. Both
  training **and** test error high.
- **Overfitting**: the model is too flexible and fits the noise. Low training
  error, high test error, large gap.
- The desired operating point is between the two: training and test error both
  low and close to each other.

### Complexity and the U curve

As we increase the **complexity** of the model (polynomial degree, tree depth,
number of parameters, or the inverse of the regularization strength), the
training error decreases monotonically. The test error, by contrast, usually
has a **U** shape: it first decreases, because the model starts to capture the
signal, and then rises again, because it starts to capture the noise. The
minimum of that curve is the ideal complexity level for the available sample
size.

This classical picture has known exceptions in heavily overparameterized models
(the *double descent* phenomenon), but the central intuition, that there is a
trade-off between fitting the data and generalizing, remains the guiding thread
of the next lectures. Since we do not have access to $$R(\hat f)$$, it is
estimated by a test set or by cross-validation, the topic of lecture 3.6.
