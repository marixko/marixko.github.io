---
title: "1.17 - Correlation and simple linear regression"
course: met-comp
---

## Correlation and simple linear regression

So far we analyzed one variable at a time. This lecture deals with the
**relationship between two quantitative variables**: how to quantify it, with
correlation, and how to model it, with linear regression.

### Contents

- Covariance and correlation
- The Pearson coefficient
- The simple linear regression model
- Least squares estimation
- Variance decomposition and $$R^{2}$$
- Inference about the coefficients
- Diagnostics and cautions

## Covariance and correlation

For a sample of pairs $$(x_i,y_i)$$, $$i=1,\ldots,n$$, the **sample
covariance** is

$$
s_{xy}=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar x)(y_i-\bar y).
$$

It measures the tendency of $$x$$ and $$y$$ to vary together, but it depends on
the units. Normalizing by the standard deviations, we get the **Pearson
correlation coefficient**:

$$
r=\frac{s_{xy}}{s_x\,s_y}
=
\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum_i(x_i-\bar x)^{2}}\ \sqrt{\sum_i(y_i-\bar y)^{2}}}.
$$

Properties: $$r\in[-1,1]$$; $$\lvert r\rvert=1$$ if and only if the points lie
exactly on a line; $$r=0$$ indicates absence of a **linear** relationship, but
there may be a nonlinear one. The value of $$r$$ is invariant to changes of
scale and origin.

Two essential caveats: **correlation is not causation** (there may be a common
factor, or the cause may be reversed), and $$r$$ only sees the linear pattern,
so the scatter plot must always be inspected. To test $$H_0:\rho=0$$,

$$
T=\frac{r\sqrt{n-2}}{\sqrt{1-r^{2}}}\sim t_{n-2}\quad\text{under }H_0.
$$

When there are *outliers* or the relationship is monotone but nonlinear,
**Spearman**'s correlation, computed on the ranks, is used.

## The simple linear regression model

Regression goes beyond measuring association: it models how the mean of $$Y$$
changes with $$x$$. The model is

$$
Y_i=\beta_0+\beta_1 x_i+\varepsilon_i,
\qquad
\varepsilon_i\overset{\text{i.i.d.}}{\sim}\mathcal{N}(0,\sigma^{2}),
$$

with $$x$$ treated as fixed. The deterministic part is the **regression line**
$$\mathbb{E}[Y\mid x]=\beta_0+\beta_1 x$$: $$\beta_1$$ is the expected change in
$$Y$$ for each additional unit of $$x$$, and $$\beta_0$$ is the expected value
of $$Y$$ when $$x=0$$.

## Least squares estimation

The coefficients are estimated by minimizing the residual sum of squares,
$$S(\beta_0,\beta_1)=\sum_i(y_i-\beta_0-\beta_1 x_i)^{2}$$. Setting the partial
derivatives to zero, we get

$$
\boxed{
\hat\beta_1=\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sum_i(x_i-\bar x)^{2}}=r\,\frac{s_y}{s_x},
}
$$

$$
\boxed{
\hat\beta_0=\bar y-\hat\beta_1\,\bar x.
}
$$

The fitted line passes through the mean point $$(\bar x,\bar y)$$. The residuals
$$\hat\varepsilon_i=y_i-\hat y_i$$ sum to zero and are orthogonal to $$x$$
($$\sum_i x_i\hat\varepsilon_i=0$$). The error variance is estimated by

$$
\hat\sigma^{2}=\frac{1}{n-2}\sum_{i=1}^{n}\hat\varepsilon_i^{2}.
$$

## Variance decomposition and $$R^{2}$$

As in ANOVA, the total variability of $$Y$$ splits into a part explained by the
regression and a residual part:

$$
\underbrace{\sum_i(y_i-\bar y)^{2}}_{\mathrm{SST}}
=
\underbrace{\sum_i(\hat y_i-\bar y)^{2}}_{\mathrm{SSReg}}
+
\underbrace{\sum_i(y_i-\hat y_i)^{2}}_{\mathrm{SSR}}.
$$

The **coefficient of determination** is the explained fraction,

$$
R^{2}=\frac{\mathrm{SSReg}}{\mathrm{SST}}=1-\frac{\mathrm{SSR}}{\mathrm{SST}},
$$

and, in simple linear regression, $$R^{2}=r^{2}$$.

## Inference about the coefficients

Under the Gaussian model,

$$
\hat\beta_1\sim\mathcal{N}\!\left(\beta_1,\ \frac{\sigma^{2}}{\sum_i(x_i-\bar x)^{2}}\right),
$$

with standard error
$$\mathrm{se}(\hat\beta_1)=\hat\sigma\big/\sqrt{\sum_i(x_i-\bar x)^{2}}$$.
The test of $$H_0:\beta_1=0$$ (no linear relationship) uses

$$
T=\frac{\hat\beta_1}{\mathrm{se}(\hat\beta_1)}\sim t_{n-2},
$$

and the confidence interval is
$$\hat\beta_1\pm t_{n-2;\,\alpha/2}\,\mathrm{se}(\hat\beta_1)$$. The global
$$F$$ test of the regression, $$F=\mathrm{MSReg}/\mathrm{MSR}\sim F_{1,\,n-2}$$,
is equivalent, and $$F=T^{2}$$.

To predict $$Y$$ at a new value $$x_0$$, the **prediction interval** for an
individual observation is wider than the **confidence interval** for the mean
$$\mathbb{E}[Y\mid x_0]$$, because it also incorporates the error variance
$$\hat\sigma^{2}$$.

## Diagnostics and cautions

- **Residuals vs. fitted values plot**: should look like a patternless cloud.
  Curvature indicates nonlinearity; a "funnel" indicates heteroscedasticity.
- **Normality of the residuals**: checked with a quantile-quantile plot.
- **Influential points**: observations with extreme $$x$$ have high leverage and
  can determine the slope of the line on their own.
- **Extrapolation**: the line is only reliable within the observed range of
  $$x$$.
- Anscombe's quartet shows four data sets with the same $$r$$,
  $$\hat\beta_0$$, $$\hat\beta_1$$ and $$R^{2}$$, but totally different
  behaviors: never skip the scatter plot.

With several predictors, the model generalizes to **multiple regression**,
covered in detail in the second part of the course and in the machine learning
module.
