---
title: "1.2 - What is statistical inference?"
course: met-comp
---

## What is statistical inference?

A statistical inference process aims to describe relationships between random variables from a sample of a population and to draw conclusions about that population. The sample must be representative of the population, and sampling techniques are usually applied to determine it (e.g., determining the sample size).

In Astronomy, what we call a "sample" generally does not go through this technical sampling process; instead, we work with as many available sources as possible. The sources available for study are limited by instrumental and observational constraints.

---

## Types of data

We can split data into two types: **structured** and **unstructured**. Some examples of unstructured data are text in general and images. In this course, however, we will only deal with structured data. Structured data are those that can be viewed as a table, with rows and columns.

These data can be divided into two types: **quantitative** and **qualitative**.

**Quantitative** data can be:

- **Discrete:** take isolated or countable values (e.g., number of objects).
- **Continuous:** can take any value in an interval (e.g., rental price).

**Qualitative** data can be:

- **Nominal:** categories with no natural order (e.g., city).
- **Ordinal:** categories that have a natural order (e.g., education level).

---

## Summary measures

Whenever you need to analyze structured data, it is useful to compute summary measures and look at some plots to get to know the characteristics of your variables.

> **Note:** here I use the term "variables" to mean data, columns or *features*.

Ask yourself, for example:

- Is my data symmetric?
- Is there a lot of variability in the values?
- Where is the data concentrated?
- Are there extreme values?

The main summary measures to help you answer these and other questions are listed below.

### 1. Measures of central tendency

#### Mean

The arithmetic mean of a set of $$n$$ observations is given by

$$
\bar{x} =
\frac{x_1 + \cdots + x_n}{n}
=
\frac{1}{n}\sum_{i=1}^{n}x_i.
$$

#### Median

The median is the central value of the data when the observations are ordered. For a sample of size $$n$$:

$$
\operatorname{md}(X) =
\begin{cases}
x_{\frac{n+1}{2}}, & \text{if } n \text{ is odd}, \\[6pt]
\frac{x_{\frac{n}{2}} + x_{\frac{n}{2}+1}}{2}, & \text{if } n \text{ is even}.
\end{cases}
$$

#### Mode

The **mode** is the most frequent realization in the observed data set.

---

### 2. Measures of dispersion

Dispersion measures quantify how much the data varies around a measure of central tendency.

#### Mean deviation

The mean deviation about the mean is given by

$$
dm(X) =
\frac{1}{n}
\sum_{i=1}^{n}
\left|x_i-\bar{x}\right|.
$$

#### Variance

The variance of a data set is given by

$$
\sigma^2(X) =
\frac{1}{n}
\sum_{i=1}^{n}
(x_i-\bar{x})^2.
$$

> **Note:** here we are computing the descriptive variance of the observed data population. In statistical inference, we will later see other definitions, such as the sample variance.

#### Standard deviation

The standard deviation is the square root of the variance:

$$
\sigma(X) =
\sqrt{\sigma^2(X)}.
$$

---

### 3. Measures of position

#### Quantile

The quantile of order $$p$$, or $$p$$-quantile, denoted $$q(p)$$, where $$p$$ is a proportion between 0 and 1, is a value such that approximately $$100\times p\%$$ of the observations are less than or equal to $$q(p)$$.

For example, the median is, by definition,

$$
q(0.5).
$$

Some particularly important quantiles are:

- $$q(0.25)$$: first quartile;
- $$q(0.50)$$: median;
- $$q(0.75)$$: third quartile.

The range between the first and third quartiles is called the **interquartile range (IQR)**:

$$
IQR = q(0.75) - q(0.25).
$$

---

### 4. Measures of symmetry

#### Skewness

A measure of skewness can be defined as

$$
\gamma_1 =
\frac{\mu_3}{\sigma^3},
$$

where $$\mu_3$$ is the third central moment. This concept will become clearer in the next lectures.

In general:

- $$\gamma_1 \approx 0$$: approximately symmetric distribution;
- $$\gamma_1 > 0$$: right skew;
- $$\gamma_1 < 0$$: left skew.

#### Kurtosis

Kurtosis can be defined as

$$
Kurt(X) =
\frac{\mu_4}{\sigma^4},
$$

where $$\mu_4$$ is the fourth central moment.

> **Note:** there are different conventions for defining and normalizing kurtosis. Some references use the so-called **excess kurtosis**, defined as $$Kurt(X)-3$$ for distributions whose reference is the normal.

---

## Data visualization

**To be defined.**

Visualization is a fundamental step of exploratory data analysis. Plots can reveal patterns, asymmetries, correlations, *outliers*, heteroscedasticity and other features that may not be evident from summary measures.

A good reference for exploring different types of visualization in Python is the **Seaborn** gallery:

https://seaborn.pydata.org/examples/index.html

---

## Transformations

Generally little used in Astronomy, but it can be very useful: the use of data transformations.

Several statistical analyses assume that the data come from a normal distribution (we will see this in the next lectures) or that they are approximately symmetric. In many cases, we come across skewed distributions.

In these cases, a frequently used family of transformations is the power transformation, which can be written as

$$
x^{(p)} =
\begin{cases}
x^p, & \text{if } p > 0, \\[4pt]
\ln(x), & \text{if } p = 0, \\[4pt]
-x^p, & \text{if } p < 0.
\end{cases}
$$

> **Note:** there are different families and conventions for power transformations. The definition above should be understood as an introduction to the general idea of transforming the data to modify its statistical properties.
