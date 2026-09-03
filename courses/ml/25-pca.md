---
title: "6.1 - PCA and Dimensionality Reduction"
course: ml
---

## PCA and dimensionality reduction

Part VI, on unsupervised learning, begins: we observe only $$X$$, with no
labels. Principal component analysis (PCA) is the basic linear method for
finding the directions along which the data vary the most, and using them to
compress, visualize or denoise.

### Contents

- Covariance matrix
- Variance maximization
- Eigenvectors and eigenvalues
- Singular value decomposition
- Reconstruction error

### Preparation and covariance matrix

Center the data by subtracting the mean of each column, forming
$$X\in\mathbb{R}^{n\times p}$$ with zero-mean columns. The **sample covariance
matrix** is

$$
S=\frac{1}{n}X^{\top}X\ \in\ \mathbb{R}^{p\times p},
$$

symmetric and positive semidefinite.

### Variance maximization

We look for the unit direction $$w$$ along which the projection $$Xw$$ has the
largest variance. Since the data are centered,
$$\operatorname{Var}(Xw)=w^{\top}Sw$$, and the problem is

$$
\max_{\lVert w\rVert=1}\ w^{\top}Sw.
$$

With a Lagrange multiplier for the constraint $$\lVert w\rVert^{2}=1$$,
differentiating gives

$$
Sw=\lambda w.
$$

That is, the candidates are the **eigenvectors** of $$S$$, and for an
eigenvector $$w$$ the explained variance is $$w^{\top}Sw=\lambda$$, the
**eigenvalue**. The first principal component is the eigenvector with the
largest eigenvalue; the second is the next eigenvector (orthogonal to the
first), and so on.

### Reconstruction and the reconstruction error

Projecting the data onto the first $$k$$ components gives the best rank-$$k$$
linear approximation: among all subspaces of dimension $$k$$, the one spanned by
the first $$k$$ components is the one that minimizes the **reconstruction
error**

$$
\sum_{i=1}^{n}\big\lVert x_i-\Pi_k x_i\big\rVert^{2},
$$

where $$\Pi_k$$ is the orthogonal projection onto that subspace (Eckart-Young
theorem). Maximizing retained variance and minimizing reconstruction error are
therefore the same problem.

### Via singular value decomposition

In practice, one computes the SVD $$X=U D V^{\top}$$ instead of diagonalizing
$$S$$. The columns of $$V$$ are the principal components, the values
$$d_j^{2}/n$$ are the variances $$\lambda_j$$, and the coordinates of the points
in the new system (the *scores*) are $$U D$$. The SVD is more numerically stable
and avoids forming $$X^{\top}X$$.

### Choosing the number of components

The **explained variance ratio** of each component is
$$\lambda_j\big/\sum_{l}\lambda_l$$. One usually looks at the plot of the
eigenvalues (*scree plot*) and retains components until a target fraction of the
total variance is accumulated, or up to the "elbow" of the curve.

### Uses and limitations

PCA is useful for visualization in two or three dimensions, compression, noise
removal and decorrelation of *features* before another model. The limitations:
it is **linear** (does not capture curved structure), it is sensitive to the
scale of the variables (standardize first if the units differ), and the
directions do not always have a physical interpretation. In Astronomy it is
classical for spectra (the *eigenspectra*) and for compressing photometry from
many bands.
