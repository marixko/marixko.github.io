---
title: 1.4 - Teoria da Probabilidade
course: met-comp
---

## Espaço de probabilidade

**Definição.** Um espaço de probabilidade é dado pelo trio

$$
(\Omega,\mathcal{F},P),
$$

em que:

* $$\Omega$$ é o **espaço amostral**, isto é, o conjunto de todos os resultados possíveis do experimento;
* $$\mathcal{F}$$ é uma **$$\sigma$$-álgebra** de subconjuntos de $$\Omega$$, isto é, uma coleção de eventos;
* $$P$$ é uma **função de probabilidade** definida em $$\mathcal{F}$$.

A função $$P:\mathcal{F}\rightarrow[0,1]$$ deve satisfazer os três axiomas de Kolmogorov.

### Axioma 1 — Normalização

$$
P(\Omega)=1.
$$

Ou seja, a probabilidade de que algum resultado pertencente ao espaço amostral ocorra é igual a 1.

### Axioma 2 — Não negatividade

Para todo evento $$A\in\mathcal{F}$$,

$$
0\leq P(A)\leq 1.
$$

### Axioma 3 — Aditividade

Para qualquer sequência de eventos mutuamente exclusivos

$$
A_1,A_2,\ldots\in\mathcal{F},
$$

isto é,

$$
A_i\cap A_j=\varnothing,
\qquad i\neq j,
$$

temos

$$
P\left(
\bigcup_{i=1}^{\infty}A_i
\right)
=
\sum_{i=1}^{\infty}P(A_i).
$$

Esse axioma é conhecido como **aditividade enumerável**.

---

## Probabilidade condicional e independência

### Probabilidade condicional

**Definição.** Dado um espaço de probabilidade

$$
(\Omega,\mathcal{F},P),
$$

para quaisquer eventos $$A,B\in\mathcal{F}$$, com

$$
P(B)>0,
$$

a probabilidade de $$A$$ condicionada à ocorrência de $$B$$ é definida por

$$
\boxed{
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)}
}
$$

A probabilidade condicional representa a probabilidade de ocorrência de $$A$$ quando sabemos que o evento $$B$$ ocorreu.

A partir da definição,

$$
P(A\cap B)
=
P(A\mid B)P(B).
$$

Analogamente,

$$
P(A\cap B)
=
P(B\mid A)P(A).
$$

Portanto,

$$
\boxed{
P(A\mid B)P(B)
=
P(B\mid A)P(A)
}
$$

---

### Lei da probabilidade total

**Definição.** Seja $$\{B_1,B_2,\ldots\}$$ uma **partição** de $$\Omega$$, isto é, uma coleção de eventos mutuamente exclusivos,

$$
B_i\cap B_j=\varnothing,\qquad i\neq j,
$$

cuja união é todo o espaço amostral,

$$
\bigcup_i B_i=\Omega,
$$

com $$P(B_i)>0$$ para todo $$i$$. Então, para qualquer evento $$A\in\mathcal{F}$$,

$$
\boxed{
P(A)
=
\sum_i P(A\mid B_i)\,P(B_i)
}
$$

**Demonstração.** Como os $$B_i$$ particionam $$\Omega$$, os eventos $$A\cap B_i$$ são mutuamente exclusivos e

$$
A=\bigcup_i (A\cap B_i).
$$

Pela aditividade enumerável (Axioma 3),

$$
P(A)=\sum_i P(A\cap B_i),
$$

e, substituindo $$P(A\cap B_i)=P(A\mid B_i)\,P(B_i)$$, obtém-se o resultado.

No caso mais simples, em que a partição é formada por um evento $$B$$ e o seu complementar $$B^{c}$$,

$$
P(A)=P(A\mid B)\,P(B)+P(A\mid B^{c})\,P(B^{c}).
$$

A lei da probabilidade total permite calcular $$P(A)$$ quando essa probabilidade só é conhecida dentro de cada cenário $$B_i$$. Combinada com a identidade $$P(A\mid B)\,P(B)=P(B\mid A)\,P(A)$$, ela fornece o denominador do **teorema de Bayes**:

$$
P(B_k\mid A)
=
\frac{P(A\mid B_k)\,P(B_k)}{\sum_i P(A\mid B_i)\,P(B_i)}.
$$

---

### Independência

Dois eventos $$A$$ e $$B$$ são **independentes** se a ocorrência de um deles não altera a probabilidade de ocorrência do outro.

Formalmente,

$$
P(A\mid B)=P(A),
$$

desde que $$P(B)>0$$.

Usando a definição de probabilidade condicional,

$$
\frac{P(A\cap B)}{P(B)}
=
P(A),
$$

e, portanto,

$$
\boxed{
P(A\cap B)
=
P(A)P(B)
}
$$

Essa última expressão é a forma mais geral da definição de independência entre dois eventos.


