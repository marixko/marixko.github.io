---
title: 1.3 - Revisão de Análise Combinatória
course: met-comp
---

## O Princípio fundamental da contagem (incompleto)
O princípio fundamental da contagem visa calcular o número de possibilidades de eventos sucessivos. Se um experimento $$A$$ tem um total de $$n_A$$ possibilidades e, em seguida, $$B$$ tem um total de $$n_B$$ possibilidades, então há um total de

$$
n_A \times n_B
$$

possíveis resultados para os dois experimentos conjuntamente.

Esse princípio pode ser generalizado para uma quantidade qualquer de experimentos. Se temos $$k$$ experimentos sucessivos, com $$n_1,n_2,\ldots,n_k$$ possibilidades em cada etapa, o número total de resultados possíveis é

$$
N = \prod_{i=1}^{k} n_i.
$$

## Distribuição de bolas em urnas

Considere o problema de distribuir $$N$$ bolas em $$M$$ urnas, considerando:

* bolas distintas ou iguais;
* distribuição com ou sem reposição;
* distribuição com ou sem ordenação.

As principais possibilidades são resumidas na tabela abaixo.

|                   |                              | **Bolas distintas** |                   **Bolas iguais** |
| ----------------- | ---------------------------- | ------------------: | ---------------------------------: |
| **Com ordenação** | Sem exclusão (com reposição) |             $$M^N$$ |                                  — |
|                   | Com exclusão (sem reposição) |         $$A_{M,N}$$ |                                  — |
| **Sem ordenação** | Sem exclusão (com reposição) |                   — | $$\displaystyle \binom{M-1+N}{N}$$ |
|                   | Com exclusão (sem reposição) |         $$C_{M,N}$$ |                        $$C_{M,N}$$ |

### Observações

Para bolas distintas, com reposição, cada uma das $$N$$ bolas pode ser colocada em qualquer uma das $$M$$ urnas. Portanto,

$$
M^N.
$$

Sem reposição, o número de maneiras de escolher e ordenar $$N$$ urnas distintas dentre $$M$$ é

$$
A_{M,N}
=
\frac{M!}{(M-N)!},
$$

desde que $$N\leq M$$.

Para bolas iguais distribuídas sem ordenação e com reposição, utilizamos o problema clássico de **estrelas e barras**:

$$
\binom{M+N-1}{N}.
$$

Para uma seleção de $$N$$ elementos distintos dentre $$M$$, sem considerar a ordem, temos

$$
C_{M,N}
=
\binom{M}{N}.
$$
