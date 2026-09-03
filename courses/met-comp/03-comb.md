---
title: 1.3 - Review of Combinatorics
course: met-comp
---

## The fundamental principle of counting (incomplete)
The fundamental principle of counting is used to compute the number of possibilities for successive events. If an experiment $$A$$ has a total of $$n_A$$ possibilities and then $$B$$ has a total of $$n_B$$ possibilities, then there is a total of

$$
n_A \times n_B
$$

possible outcomes for the two experiments jointly.

This principle can be generalized to any number of experiments. If we have $$k$$ successive experiments, with $$n_1,n_2,\ldots,n_k$$ possibilities at each stage, the total number of possible outcomes is

$$
N = \prod_{i=1}^{k} n_i.
$$

## Distributing balls into urns

Consider the problem of distributing $$N$$ balls into $$M$$ urns, considering:

* distinct or identical balls;
* distribution with or without replacement;
* distribution with or without ordering.

The main possibilities are summarized in the table below.

|                   |                              | **Distinct balls** |                   **Identical balls** |
| ----------------- | ---------------------------- | ------------------: | ---------------------------------: |
| **With ordering** | Without exclusion (with replacement) |             $$M^N$$ |                                  — |
|                   | With exclusion (without replacement) |         $$A_{M,N}$$ |                                  — |
| **Without ordering** | Without exclusion (with replacement) |                   — | $$\displaystyle \binom{M-1+N}{N}$$ |
|                   | With exclusion (without replacement) |         $$C_{M,N}$$ |                        $$C_{M,N}$$ |

### Remarks

For distinct balls, with replacement, each of the $$N$$ balls can be placed in any of the $$M$$ urns. Therefore,

$$
M^N.
$$

Without replacement, the number of ways to choose and order $$N$$ distinct urns out of $$M$$ is

$$
A_{M,N}
=
\frac{M!}{(M-N)!},
$$

provided that $$N\leq M$$.

For identical balls distributed without ordering and with replacement, we use the classic **stars and bars** problem:

$$
\binom{M+N-1}{N}.
$$

For a selection of $$N$$ distinct elements out of $$M$$, without regard to order, we have

$$
C_{M,N}
=
\binom{M}{N}.
$$
