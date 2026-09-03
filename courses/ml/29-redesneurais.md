---
title: "7.1 - Neural Networks as Function Approximators"
course: ml
---

## Neural networks as function approximators

Part VII covers neural networks. The reading here is deliberately statistical: a
network is a parametric family of functions, assembled by composing linear and
nonlinear transformations, whose parameters are fit by ERM. What sets it apart
from the previous models is that it **learns its own features**.

### Contents

- Perceptron
- Neural network
- Activation functions
- Layers and nonlinear transformations
- Representation learning
- Universal approximation

### From the perceptron to the network

The **perceptron** is the linear classifier
$$\hat y=\operatorname{sign}(w^{\top}x+b)$$, trained by an update rule that
corrects the errors one by one. It only solves linearly separable problems: it
cannot represent the "exclusive or". The way out is to add **nonlinearity** and
**depth**.

### One layer

A layer applies a linear transformation followed by a nonlinear function
applied element by element:

$$
h=\sigma(Wx+b).
$$

$$W$$ and $$b$$ are the parameters; $$\sigma$$ is the **activation function**.

### Deep network

A network of $$L$$ layers is the composition

$$
f(x)=f_L\circ f_{L-1}\circ\cdots\circ f_1(x),
\qquad
f_l(u)=\sigma_l(W_l u+b_l).
$$

Each layer transforms the representation of the previous one. The last layer is
usually linear (regression) or *softmax* (classification), applied to the
*features* produced by the hidden layers.

### Activation functions

- **Sigmoid** $$\sigma(z)=1/(1+e^{-z})$$: output in $$(0,1)$$, saturates at the
  ends.
- **Hyperbolic tangent** $$\tanh(z)$$: output in $$(-1,1)$$, centered at zero.
- **ReLU** $$\max(0,z)$$: cheap, does not saturate for $$z>0$$, produces sparse
  activations; it is the default choice in the hidden layers.
- **Softmax**: normalizes a vector into a probability distribution, used at the
  output of multiclass classification.

Without the nonlinearity, the composition of linear layers collapses into a
single linear transformation, and depth would add nothing.

### Representation learning

The conceptual difference from *kernels* and from manual *feature* engineering:
instead of fixing the transformation $$\phi(x)$$ in advance, the network
**learns** $$\phi$$ together with the final classifier. The hidden layers build
increasingly abstract representations, adapted to the task and the data.

### Universal approximation

The **universal approximation theorem** guarantees that a network with a single
hidden layer and a non-polynomial activation can approximate any continuous
function on a compact set to arbitrary precision, provided it has enough units.
Two important caveats: the theorem does not say **how many** units are needed
(there may be exponentially many), nor that training will **find** that
solution. Depth enters here: there are functions that require exponential width
with one layer, but only polynomial depth with several.
