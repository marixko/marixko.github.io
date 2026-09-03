---
title: "8.1 - Generalization in Neural Networks"
course: ml
---

## Generalization in neural networks

Part VIII gathers advanced topics. We start with a paradox: the classical theory
of Part III predicts that networks with far more parameters than data should
overfit catastrophically, and in practice they generalize well. Understanding
why changed the way we think about capacity.

### Contents

- Overparameterization
- Double descent
- Interpolation
- Implicit regularization
- SGD as implicit regularization
- The tangent kernel perspective

### The overparameterization puzzle

Modern networks have $$p\gg n$$ and are trained to **zero training error**. By
the bias-variance decomposition, this should mean very high variance. Famous
experiments show that these same networks can also fit **completely random**
labels (so they have enormous effective capacity), and yet, with real labels,
they generalize. Counting parameters is not the right measure of complexity.

### Double descent

Plotting the test error against the model size (or the number of epochs), one
does not see the classical U curve, but rather a **double descent** curve: the
error falls, rises to a peak at the **interpolation threshold**
($$p\approx n$$), and then **falls again** in the overparameterized regime,
often to a value below the best point of the classical regime. The "good" region
is after interpolating, not before.

### Interpolation without overfitting

Zero training error does not imply poor generalization when the interpolating
solution is **smooth** enough. Among the many zero-loss solutions, some are
benign and others are not; what matters is which one training selects.

### Implicit regularization

Gradient descent does not return an arbitrary zero-loss solution: it is
**biased** toward small-norm solutions. In overdetermined linear regression, the
gradient initialized at zero converges to the **minimum-norm** interpolator. For
logistic-type losses on separable data, the gradient converges to the
**maximum-margin** direction. The architecture and the optimizer impose a
preference that acts as regularization, with no explicit penalty term.

### SGD as implicit regularization

The noise of the stochastic gradient adds an extra bias: it tends to avoid
"sharp" minima and to settle in **flat** minima, which empirically generalize
better. The *mini-batch* size and the learning rate control the intensity of
this effect.

### The tangent kernel perspective

In the **infinite width** limit, with the appropriate initialization scale,
training a network by gradient descent behaves like a *kernel* regression with a
fixed *kernel*, the **neural tangent kernel** (NTK). This makes the behavior
analyzable and explains part of the phenomenon. The limitation: in that regime
the network **does not learn representations** (the *features* stay essentially
fixed), whereas real networks clearly do learn, which the NTK does not capture.
The full theory of generalization in *deep learning* is still open, but the
practical message is clear: capacity control happens implicitly, and the
relevant measure of complexity is based on norm and margin, not on parameter
count.
