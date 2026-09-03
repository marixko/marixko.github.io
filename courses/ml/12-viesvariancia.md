---
title: "3.2 - Bias-Variance Decomposition"
course: ml
---

## Bias-variance decomposition

The previous lecture described the U curve of the test error qualitatively.
Here we make it quantitative: for the squared loss, the expected error of a
model splits into three parts, each with a clear meaning. This decomposition is
the standard language for talking about overfitting and underfitting.

### Contents

- Bias
- Variance
- Irreducible error
- Model complexity
- Underfitting and overfitting

### The thought experiment

Fix a point $$x$$. Imagine drawing many training sets $$D$$ from the same
generating process, fitting a model $$\hat f_D$$ on each one and looking at the
predictions $$\hat f_D(x)$$. Two sources of randomness enter the error:

- the response noise, $$Y=f^{*}(x)+\varepsilon$$ with
  $$f^{*}(x)=\mathbb{E}[Y\mid x]$$ and $$\operatorname{Var}(\varepsilon)=\sigma^{2}$$;
- the variation of $$\hat f_D(x)$$ from one training set to another.

The object of study is the expected squared error over both,

$$
\mathbb{E}_{D,\,Y}\big[(Y-\hat f_D(x))^{2}\big].
$$

### Derivation

Write $$\bar f(x)=\mathbb{E}_D[\hat f_D(x)]$$, the average prediction. Add and
subtract $$f^{*}(x)$$ and $$\bar f(x)$$ and expand the square. The cross terms
cancel, because $$\varepsilon$$ has zero mean and is independent of $$D$$, and
because $$\mathbb{E}_D[\hat f_D(x)-\bar f(x)]=0$$. Three terms remain:

$$
\mathbb{E}_{D,\,Y}\big[(Y-\hat f_D(x))^{2}\big]
=
\underbrace{\sigma^{2}}_{\text{noise}}
+
\underbrace{\big(\bar f(x)-f^{*}(x)\big)^{2}}_{\text{bias}^{2}}
+
\underbrace{\mathbb{E}_D\big[(\hat f_D(x)-\bar f(x))^{2}\big]}_{\text{variance}}.
$$

In compact form,

$$
\boxed{\ \text{Error}=\text{Bias}^{2}+\text{Variance}+\text{Noise}\ }
$$

### The three terms

- **Noise** ($$\sigma^{2}$$): the intrinsic variance of $$Y$$ given $$x$$. It
  is the **irreducible error**, the same Bayes risk of lecture 1.3. No model
  eliminates it.
- **Bias**: how much the average prediction $$\bar f(x)$$ misses the target
  $$f^{*}(x)$$. It measures the systematic error of the family of models, what
  it cannot represent even with infinite data.
- **Variance**: how much $$\hat f_D(x)$$ oscillates around its own mean when the
  training set changes. It measures the sensitivity to the noise of the sample.

### Complexity and the trade-off

Increasing the model complexity in general **reduces the bias** (the family
comes to contain better approximations of $$f^{*}$$) and **increases the
variance** (there is more freedom for the fit to follow the noise). The total
error is minimized at an intermediate point, which is exactly the bottom of the
U curve of lecture 3.1.

- Model too simple: high bias, low variance. This is **underfitting**.
- Model too complex: low bias, high variance. This is **overfitting**.

### Ridge and nearest neighbors as an illustration

- In *ridge* regression, increasing $$\lambda$$ shrinks the coefficients: the
  bias grows and the variance drops. The optimal $$\lambda$$ balances the two,
  and under collinearity there is always a $$\lambda>0$$ with smaller error than
  OLS.
- In $$k$$ nearest neighbors, small $$k$$ gives low bias and high variance (the
  prediction depends on few noisy points); large $$k$$ does the opposite,
  oversmoothing.

### Limitations of the decomposition

The exact separation into three terms holds for the **squared loss**. For the
0-1 loss there are analogous decompositions, but they are not additive in such
a clean way, and the effect of variance on the classification error is more
subtle. Moreover, in heavily overparameterized models the variance can
**decrease** again past the interpolation point (*double descent*). Still, bias
and variance remain the most useful vocabulary for diagnosing why a model
performs poorly.
