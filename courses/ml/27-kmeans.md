---
title: "6.3 - K-Means"
course: ml
---

## K-means

K-means is the most widely used clustering algorithm: it divides the data into
$$K$$ groups represented by their centers, minimizing the sum of the squared
distances from each point to the center of its group. It is a clean example of
coordinate optimization and of the pitfalls of local minima.

### Contents

- Objective functions
- Coordinate optimization
- Local minima
- Initialization
- Choice of $$K$$

### The objective

Given the number of groups $$K$$, we look for assignments
$$c_i\in\{1,\ldots,K\}$$ and centers $$\mu_1,\ldots,\mu_K$$ that minimize

$$
J=\sum_{i=1}^{n}\big\lVert x_i-\mu_{c_i}\big\rVert^{2}.
$$

$$J$$ is the total within-group variance. The joint problem is combinatorial and
NP-hard in general.

### Lloyd's algorithm

$$J$$ is optimized by alternating between the two variables, each step in closed
form:

**Assignment** (fixing the centers): each point goes to the nearest center,

$$
c_i=\arg\min_{k}\ \lVert x_i-\mu_k\rVert^{2}.
$$

**Update** (fixing the assignments): each center becomes the mean of its
points,

$$
\mu_k=\frac{1}{N_k}\sum_{i:\,c_i=k}x_i,
\qquad
N_k=\lvert\{i:c_i=k\}\rvert.
$$

### Convergence and local minima

Each of the two steps **does not increase** $$J$$, and $$J\ge 0$$, so the
algorithm converges in a finite number of iterations. But it converges to a
**local** minimum: $$J$$ is not convex in the discrete assignment, and the
result depends on the initialization. The induced partition is always a Voronoi
diagram of the centers.

### Initialization

Bad initial centers lead to bad solutions. The standard practices:

- run the algorithm several times with different random seeds and keep the one
  with the smallest $$J$$;
- use **k-means++**, which chooses the initial centers in a spread-out way
  (each new center is drawn with probability proportional to the squared
  distance to the nearest already-chosen center), which guarantees a solution
  within a factor $$O(\log K)$$ of the optimum in expectation.

### Choice of K

$$J$$ decreases monotonically with $$K$$ (more centers always fit better), so
$$K$$ cannot be chosen by minimizing $$J$$. One uses the "elbow" of the curve
$$J(K)$$, the **silhouette** coefficient, or the **gap statistic**, which
compares $$J$$ to what is expected under data with no structure.

### Assumptions and limitations

K-means assumes roughly **spherical groups of similar size**, makes a **hard**
assignment (each point belongs to a single group) and is sensitive to the scale
of the *features* and to *outliers*. It is the limiting case of the Gaussian
mixture model of the next lecture, with equal isotropic covariances and hard
assignment. In Astronomy it is used for fast clustering in color space, catalog
segmentation and vector quantization.
