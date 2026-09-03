---
title: 1.4 - Probability Theory
course: met-comp
---

## Probability space

**Definition.** A probability space is given by the triple

$$
(\Omega,\mathcal{F},P),
$$

where:

* $$\Omega$$ is the **sample space**, that is, the set of all possible outcomes of the experiment;
* $$\mathcal{F}$$ is a **$$\sigma$$-algebra** of subsets of $$\Omega$$, that is, a collection of events;
* $$P$$ is a **probability function** defined on $$\mathcal{F}$$.

The function $$P:\mathcal{F}\rightarrow[0,1]$$ must satisfy Kolmogorov's three axioms.

### Axiom 1 (Normalization)

$$
P(\Omega)=1.
$$

That is, the probability that some outcome belonging to the sample space occurs is equal to 1.

### Axiom 2 (Non-negativity)

For every event $$A\in\mathcal{F}$$,

$$
0\leq P(A)\leq 1.
$$

### Axiom 3 (Additivity)

For any sequence of mutually exclusive events

$$
A_1,A_2,\ldots\in\mathcal{F},
$$

that is,

$$
A_i\cap A_j=\varnothing,
\qquad i\neq j,
$$

we have

$$
P\left(
\bigcup_{i=1}^{\infty}A_i
\right)
=
\sum_{i=1}^{\infty}P(A_i).
$$

This axiom is known as **countable additivity**.

---

## Conditional probability and independence

### Conditional probability

**Definition.** Given a probability space

$$
(\Omega,\mathcal{F},P),
$$

for any events $$A,B\in\mathcal{F}$$, with

$$
P(B)>0,
$$

the probability of $$A$$ conditioned on the occurrence of $$B$$ is defined by

$$
\boxed{
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)}
}
$$

Conditional probability represents the probability of $$A$$ occurring when we know that event $$B$$ has occurred.

From the definition,

$$
P(A\cap B)
=
P(A\mid B)P(B).
$$

Similarly,

$$
P(A\cap B)
=
P(B\mid A)P(A).
$$

Therefore,

$$
\boxed{
P(A\mid B)P(B)
=
P(B\mid A)P(A)
}
$$

---

### Law of total probability

**Definition.** Let $$\{B_1,B_2,\ldots\}$$ be a **partition** of $$\Omega$$, that is, a collection of mutually exclusive events,

$$
B_i\cap B_j=\varnothing,\qquad i\neq j,
$$

whose union is the entire sample space,

$$
\bigcup_i B_i=\Omega,
$$

with $$P(B_i)>0$$ for all $$i$$. Then, for any event $$A\in\mathcal{F}$$,

$$
\boxed{
P(A)
=
\sum_i P(A\mid B_i)\,P(B_i)
}
$$

**Proof.** Since the $$B_i$$ partition $$\Omega$$, the events $$A\cap B_i$$ are mutually exclusive and

$$
A=\bigcup_i (A\cap B_i).
$$

By countable additivity (Axiom 3),

$$
P(A)=\sum_i P(A\cap B_i),
$$

and, substituting $$P(A\cap B_i)=P(A\mid B_i)\,P(B_i)$$, we get the result.

In the simplest case, where the partition consists of an event $$B$$ and its complement $$B^{c}$$,

$$
P(A)=P(A\mid B)\,P(B)+P(A\mid B^{c})\,P(B^{c}).
$$

The law of total probability lets us compute $$P(A)$$ when that probability is only known within each scenario $$B_i$$. Combined with the identity $$P(A\mid B)\,P(B)=P(B\mid A)\,P(A)$$, it provides the denominator of **Bayes' theorem**:

$$
P(B_k\mid A)
=
\frac{P(A\mid B_k)\,P(B_k)}{\sum_i P(A\mid B_i)\,P(B_i)}.
$$

---

### Independence

Two events $$A$$ and $$B$$ are **independent** if the occurrence of one does not change the probability of the other occurring.

Formally,

$$
P(A\mid B)=P(A),
$$

provided $$P(B)>0$$.

Using the definition of conditional probability,

$$
\frac{P(A\cap B)}{P(B)}
=
P(A),
$$

and therefore

$$
\boxed{
P(A\cap B)
=
P(A)P(B)
}
$$

This last expression is the most general form of the definition of independence between two events.
