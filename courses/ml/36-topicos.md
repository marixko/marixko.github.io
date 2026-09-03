---
title: "8.6 - Current Topics in Machine Learning"
course: ml
---

## Current topics in machine learning

This final lecture is an overview, with no proofs, of the directions that
dominate research today and what they mean for scientific use. Each of these
topics is a course in itself.

### Contents

- Generative models
- Diffusion models
- Self-supervised and representation learning
- Foundation models
- Simulation-based inference
- Distribution shift
- Causal machine learning
- Scientific machine learning

### Generative models

They learn the distribution $$p(x)$$ or how to sample from it. Variational
autoencoders (VAE) optimize an ELBO with an encoder and a decoder; generative
adversarial networks (GAN) train a generator against a discriminator;
*normalizing flows* use invertible transformations to have exact likelihood;
autoregressive models factor $$p(x)=\prod_t p(x_t\mid x_{<t})$$.

### Diffusion models

The state of the art in image generation. A forward process adds Gaussian noise
to the data in many steps; the network learns to **reverse** that process, which
is equivalent to estimating the **score** $$\nabla_x\log p(x)$$. In science they
are starting to be used as learned *priors* for inverse problems and as
emulators.

### Self-supervised and representation learning

Learning useful representations from **unlabeled** data, by solving pretext
tasks: predicting masked parts of the input, or bringing together the
representations of two views of the same object and pushing apart those of
different objects (contrastive learning). The resulting representations transfer
well to tasks with few labels.

### Foundation models

Large models pre-trained on broad data and then adapted to many tasks by
fine-tuning or by in-context examples. They are almost always *transformers* at
scale, and their behavior follows **scaling laws** with the number of
parameters, of data and of compute.

### Simulation-based inference

When the likelihood is implicit, defined by an expensive simulator, the
posterior is estimated with neural density estimators, ratio estimators or
approximate Bayesian computation. It is directly relevant to Astronomy and
Physics, where the forward models are simulators.

### Distribution shift

When the training distribution differs from the deployment one (covariate shift,
label shift, or concept drift over time), performance drops in ways that
standard validation does not detect. The responses include importance
reweighting, domain adaptation and robust training.

### Causal machine learning

Prediction answers $$P(Y\mid X)$$; many scientific and decision questions
require $$P\big(Y\mid \operatorname{do}(X)\big)$$, the effect of **intervening**
on $$X$$. Confounders make the two quantities diverge, and no volume of
observational data fixes this without causal assumptions.

### Scientific machine learning

Models that respect known structure: physics-informed networks, neural
operators that learn solutions of differential equations, emulators that replace
expensive simulations, and architectures that impose symmetries and
conservation laws. It is the frontier where machine learning meets the
scientific method, and the natural end point of this course.
