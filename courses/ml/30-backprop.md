---
title: "7.2 - Backpropagation and Deep Learning"
course: ml
---

## Backpropagation and deep learning

Training a network is minimizing the empirical risk by stochastic gradient
descent (lecture 2.4). What is missing is computing the gradient of the loss
with respect to millions of parameters efficiently. **Backpropagation** does
this: it is the chain rule organized to reuse computations.

### Contents

- Computational graphs
- Chain rule
- Forward and backward propagation
- Optimization
- Vanishing and exploding gradients
- Regularization

### Computational graph and forward propagation

The evaluation of $$L=L\big(y,f(x;\theta)\big)$$ is a sequence of elementary
operations, which we can draw as a graph. **Forward propagation** traverses the
graph from input to output, computing and **storing** the intermediate
activations. For layer $$l$$,

$$
z^{(l)}=W^{(l)}h^{(l-1)}+b^{(l)},
\qquad
h^{(l)}=\sigma\big(z^{(l)}\big).
$$

### Backpropagation

Backpropagation traverses the graph in reverse, applying the **chain rule** from
the output back to the parameters. In general form, for the weights of layer
$$l$$,

$$
\frac{\partial L}{\partial W^{(l)}}
=
\frac{\partial L}{\partial h^{(l)}}\,
\frac{\partial h^{(l)}}{\partial W^{(l)}}.
$$

Concretely, defining the error signal
$$\delta^{(l)}=\partial L/\partial z^{(l)}$$, it propagates backward through

$$
\delta^{(l)}=\big(W^{(l+1)\top}\delta^{(l+1)}\big)\odot\sigma'\big(z^{(l)}\big),
$$

and the parameter gradients come from

$$
\frac{\partial L}{\partial W^{(l)}}=\delta^{(l)}\,h^{(l-1)\top},
\qquad
\frac{\partial L}{\partial b^{(l)}}=\delta^{(l)}.
$$

Since the shared subexpressions are reused, the cost of computing **all** the
gradients is of the same order as the cost of one forward propagation. This is
reverse-mode automatic differentiation.

### Optimization

The gradients feed *mini-batch* SGD (lecture 2.4), almost always with
**momentum** or **Adam**, and with the learning rate following a schedule
(warmup and decay). The objective is non-convex, so one looks for a good basin,
not the global minimum.

### Vanishing and exploding gradients

In backpropagation, $$\delta^{(l)}$$ is multiplied repeatedly by matrices $$W$$
and by derivatives $$\sigma'$$. If these factors are typically smaller than
$$1$$, the gradient **vanishes** by the time it reaches the first layers (the
sigmoid and tanh saturate and have $$\sigma'\approx 0$$); if they are larger
than $$1$$, it **explodes**. The solutions: ReLU activation (derivative $$1$$
for $$z>0$$), initialization that preserves the variance of the signal and of
the gradient across layers (Xavier, He), residual connections, gradient clipping
and batch normalization.

### Regularization

Very flexible networks need capacity control. The usual mechanisms:

- **weight decay** ($$L_2$$ penalty);
- **dropout**: randomly zero out units during training, which acts like an
  average of sub-networks;
- **early stopping** guided by validation;
- **data augmentation**;
- **batch normalization**, which stabilizes training and also regularizes.

The generalization of these networks, despite having more parameters than data,
is the topic of the next lecture.
