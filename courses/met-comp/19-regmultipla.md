---
title: "1.19 - Multiple linear regression"
course: met-comp
---

## Multiple linear regression

The simple regression of lecture 1.17 uses one predictor. Almost every real
problem has several, and it is common to want the effect of one of them while
**controlling** for the others. Multiple regression does this, and matrix
notation makes the formulas as compact as in the simple case.

### Contents

- The model in matrix form
- Least squares estimation
- Interpretation of the coefficients
- Inference and adjusted $$R^{2}$$
- Multicollinearity
- Variable selection

## The model in matrix form

With $$n$$ observations and $$p$$ predictors (including the intercept),

$$
y=X\beta+\varepsilon,
\qquad
\varepsilon\sim\mathcal{N}(0,\sigma^{2}I_n),
$$

where $$y\in\mathbb{R}^{n}$$, the **design matrix**
$$X\in\mathbb{R}^{n\times p}$$ has a column of $$1$$ and the rest with the
predictors, and $$\beta\in\mathbb{R}^{p}$$. Row by row,
$$y_i=\beta_0+\beta_1 x_{i1}+\cdots+\beta_{p-1}x_{i,p-1}+\varepsilon_i$$.

## Least squares estimation

Minimizing $$\lVert y-X\beta\rVert^{2}$$, the gradient
$$-2X^{\top}(y-X\beta)$$ vanishes at the **normal equations**
$$X^{\top}X\,\hat\beta=X^{\top}y$$, whose solution, when $$X$$ has full rank, is

$$
\boxed{
\hat\beta=(X^{\top}X)^{-1}X^{\top}y.
}
$$

The fitted values are $$\hat y=X\hat\beta=Hy$$ with the **hat matrix**
$$H=X(X^{\top}X)^{-1}X^{\top}$$, and the error variance is estimated by

$$
\hat\sigma^{2}=\frac{\lVert y-\hat y\rVert^{2}}{n-p}.
$$

Geometrically, $$\hat y$$ is the orthogonal projection of $$y$$ onto the space
spanned by the columns of $$X$$.

## Interpretation of the coefficients

$$\beta_j$$ is the expected change in $$y$$ when $$x_j$$ increases by one unit
and **all other predictors are held fixed**. This clause is what distinguishes
multiple regression from running several simple regressions: the coefficient
already comes "adjusted" for the others.

## Inference and adjusted $$R^{2}$$

Under the Gaussian model,

$$
\hat\beta\sim\mathcal{N}\!\big(\beta,\ \sigma^{2}(X^{\top}X)^{-1}\big),
$$

and the standard error of $$\hat\beta_j$$ is the root of the $$j$$-th diagonal
element of that matrix, with $$\sigma^{2}$$ replaced by $$\hat\sigma^{2}$$. For
each coefficient, $$T_j=\hat\beta_j/\mathrm{se}(\hat\beta_j)\sim t_{n-p}$$. The
global $$F$$ test compares the model with the intercept-only model.

The $$R^{2}$$ never decreases when a predictor is added, even an irrelevant
one. The **adjusted $$R^{2}$$** penalizes the number of parameters:

$$
R^{2}_{\text{adj}}=1-\frac{\mathrm{SSR}/(n-p)}{\mathrm{SST}/(n-1)}.
$$

## Multicollinearity

When two or more columns of $$X$$ are nearly linear combinations of each other,
$$X^{\top}X$$ becomes ill-conditioned, $$(X^{\top}X)^{-1}$$ has huge entries and
the variances of $$\hat\beta$$ explode: the coefficients become unstable and
change sign with small perturbations of the data. It is detected by the
**variance inflation factor**,

$$
\mathrm{VIF}_j=\frac{1}{1-R_j^{2}},
$$

where $$R_j^{2}$$ is the $$R^{2}$$ of the regression of $$x_j$$ on the other
predictors. A $$\mathrm{VIF}$$ above $$5$$ to $$10$$ signals a problem.
Solutions: remove redundant predictors, combine them, or regularize (*ridge*,
*lasso*), the topic of the machine learning module.

## Variable selection

Choosing which predictors to include involves a trade-off between bias (model
too small) and variance (model too large). The usual approaches:

- stepwise procedures (forward, backward, mixed), guided by a criterion such as
  **AIC** or **BIC**, which add to the fit a penalty for the number of
  parameters;
- cross-validation, choosing the model with the smallest out-of-sample
  prediction error;
- regularization, which does selection and estimation at the same time.

The significance of an isolated coefficient ($$t$$ test) should not be the only
criterion, especially with many predictors, because of the multiple comparisons
problem of lecture 1.15.
