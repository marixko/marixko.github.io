---
title: "3.5 - Generalization Bounds"
course: ml
---

## Generalization bounds

We put together the pieces of the two previous lectures. The concentration
inequalities gave a bound for the generalization gap of a **finite** class; the
VC dimension measures the capacity of an **infinite** class. The result is a
bound of the form "true risk less than or equal to empirical risk plus a
complexity term", which is the theoretical basis of regularization.

### Contents

- Uniform convergence
- PAC learning
- Bound for a finite class
- VC bound
- Complexity penalties
- Structural risk minimization

### Uniform convergence

Since $$\hat f$$ is chosen from the data, it is not enough that
$$\hat R(f)\approx R(f)$$ for a fixed $$f$$: we need this to hold
**simultaneously for all** $$f\in\mathcal{H}$$, that is, that

$$
\sup_{f\in\mathcal{H}}\big\lvert\hat R(f)-R(f)\big\rvert
$$

is small with high probability. When this happens, we say that $$\mathcal{H}$$
has the **uniform convergence** property, and in that case the empirical risk
minimizer is almost as good as the best element of the class.

### The PAC framework

An algorithm learns $$\mathcal{H}$$ in the **PAC** sense (*probably
approximately correct*) if, for any $$\epsilon,\delta\in(0,1)$$, there is a
sample size $$n(\epsilon,\delta)$$ from which on the returned model has risk at
most $$\epsilon$$ away from the best possible, with probability at least
$$1-\delta$$. "Approximately" is the $$\epsilon$$, "probably" is the
$$1-\delta$$.

### Bound for a finite class

Recovering the result of lecture 3.3: with loss in $$[0,1]$$, a finite class
$$\mathcal{H}$$ and probability $$1-\delta$$, it holds for every
$$f\in\mathcal{H}$$ that

$$
R(f)\ \le\ \hat R(f)+\sqrt{\frac{\log\lvert\mathcal{H}\rvert+\log(2/\delta)}{2n}}.
$$

### VC bound

For infinite classes, the same strategy (concentration plus *union bound*)
applied to the dichotomies, with the growth function controlled by
Sauer-Shelah, gives the **VC bound**. With probability $$1-\delta$$, for every
$$f\in\mathcal{H}$$,

$$
R(f)\ \le\ \hat R(f)
+
O\!\left(\sqrt{\frac{d_{\mathrm{VC}}\,\log(n/d_{\mathrm{VC}})+\log(1/\delta)}{n}}\right).
$$

The role of $$\log\lvert\mathcal{H}\rvert$$ is now played by
$$d_{\mathrm{VC}}\log n$$. The reading: the generalization gap is small when
$$n\gg d_{\mathrm{VC}}$$, and the rate is still approximately $$1/\sqrt{n}$$.

### The general form

All these results have the same structure:

$$
R(f)\ \le\ \hat R(f)+\text{complexity term},
$$

where the complexity term grows with the capacity of the class and decreases
with $$n$$. It is a **complexity penalty** derived from first principles, and it
explains why penalizing rich models (lecture 2.3) improves generalization: in
practice we are minimizing an upper bound on the true risk rather than the
empirical risk alone.

### Structural risk minimization

**Structural risk minimization** (SRM) turns this into a method: one organizes a
sequence of nested classes
$$\mathcal{H}_1\subset\mathcal{H}_2\subset\cdots$$ with increasing capacity, and
chooses the class (and the model within it) that minimizes the sum
$$\hat R(f)+\text{penalty}(\mathcal{H}_k)$$. It is the theoretical version of
model selection.

### What the bounds say in practice

VC bounds are usually **numerically loose**: the value they predict for the risk
is often greater than $$1$$. What they capture correctly is the **qualitative
dependence**: more capacity requires more data, and controlling the capacity
controls generalization. Tighter, data-dependent bounds (Rademacher complexity,
margin-based bounds) refine the constant but keep the same message. The
practical tool for estimating $$R(\hat f)$$ and choosing hyperparameters remains
cross-validation, from the next lecture.
