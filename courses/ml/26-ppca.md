---
title: "6.2 - Probabilistic PCA"
course: ml
---

## Probabilistic PCA

The PCA of the previous lecture is an algebraic procedure, with no probability
model. **Probabilistic PCA** (PPCA) rewrites the same idea as a generative model
with a Gaussian latent variable. This brings likelihood, handling of missing
data, sampling and a direct bridge to the EM algorithm.

### Contents

- Latent variables
- Gaussian models
- Probabilistic PCA
- Maximum likelihood
- Relation between PCA and latent variable models

### The model

Each observation $$x\in\mathbb{R}^{p}$$ is generated from a low-dimensional
**latent** variable $$z\in\mathbb{R}^{k}$$:

$$
z\sim\mathcal{N}(0,I_k),
\qquad
x=Wz+\mu+\epsilon,
\qquad
\epsilon\sim\mathcal{N}(0,\sigma^{2}I_p).
$$

The matrix $$W\in\mathbb{R}^{p\times k}$$ maps the latent space into the data
space, $$\mu$$ is the mean and $$\epsilon$$ is isotropic noise.

### The marginal distribution

Since $$x$$ is a linear combination of independent Gaussians, it is also
Gaussian. Computing the mean and covariance,

$$
x\sim\mathcal{N}\big(\mu,\ WW^{\top}+\sigma^{2}I\big).
$$

The model says that the covariance of the data has a **low-rank plus noise**
structure: $$k$$ directions with extra variance (the columns of $$W$$) on top of
an isotropic floor $$\sigma^{2}$$.

### Maximum likelihood

Fitting by maximum likelihood, $$\hat\mu$$ is the sample mean and the solution
for $$W$$ and $$\sigma^{2}$$ is explicit in terms of the sample covariance
$$S$$:

$$
\hat\sigma^{2}=\frac{1}{p-k}\sum_{j=k+1}^{p}\lambda_j,
\qquad
\hat W=U_k\big(\Lambda_k-\hat\sigma^{2}I\big)^{1/2}R,
$$

where $$\lambda_1\ge\cdots\ge\lambda_p$$ are the eigenvalues of $$S$$, $$U_k$$
the $$k$$ principal eigenvectors, $$\Lambda_k$$ the diagonal of the $$k$$
largest eigenvalues and $$R$$ an arbitrary rotation. That is: $$\hat\sigma^{2}$$
is the average variance of the **discarded** directions, and $$\hat W$$ recovers
the principal components, corrected for the noise.

### Relation to classical PCA

When $$\sigma^{2}\to 0$$, PPCA collapses exactly onto the PCA of lecture 6.1:
the projection onto the latent subspace becomes the orthogonal projection onto
the principal components. PPCA is, therefore, "PCA plus a noise model".

What the model buys:

- **likelihood**, which allows comparing models and choosing $$k$$ by criteria
  such as the BIC or by cross-validation;
- **missing data** handled naturally, by marginalizing out the unobserved
  coordinates;
- a **posterior** $$p(z\mid x)$$, also Gaussian, giving the latent projection
  **with uncertainty**;
- the ability to **sample** new $$x$$ from the model;
- fitting by **EM** when the closed-form solution is not convenient, which
  connects to the next lecture.

**Factor analysis** generalizes PPCA by replacing the isotropic noise
$$\sigma^{2}I$$ with a diagonal matrix $$\Psi$$, allowing each *feature* to have
its own noise level.
