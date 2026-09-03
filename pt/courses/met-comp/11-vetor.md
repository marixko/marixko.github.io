---
title: 1.10 - Vetores aleatórios
course: met-comp
---

## Vetores aleatórios

Até aqui trabalhamos com uma variável de cada vez. Na prática quase sempre
observamos **várias** grandezas do mesmo objeto, e o que interessa é como elas
variam em conjunto. O vetor aleatório organiza essas variáveis, e a matriz de
covariância descreve as suas relações lineares.

### Conteúdo

- Vetor aleatório e distribuição conjunta
- Marginais e condicionais
- Vetor de médias
- Matriz de covariância e de correlação
- Independência e não correlação
- Combinações lineares
- Normal multivariada

## Vetor aleatório e distribuição conjunta

Um **vetor aleatório** é uma função
$$\mathbf{X}=(X_1,\ldots,X_p)^{\top}$$ de $$\Omega$$ em $$\mathbb{R}^{p}$$, cujas
componentes são variáveis aleatórias. Ele é descrito pela **FDA conjunta**

$$
F_{\mathbf{X}}(x_1,\ldots,x_p)=P(X_1\le x_1,\ldots,X_p\le x_p),
$$

ou, quando existem, pela função de probabilidade conjunta
$$p(x_1,\ldots,x_p)$$ no caso discreto e pela densidade conjunta
$$f_{\mathbf{X}}$$ no caso contínuo, com
$$P(\mathbf{X}\in A)=\int_A f_{\mathbf{X}}(\mathbf{x})\,d\mathbf{x}$$.

## Marginais e condicionais

A distribuição de um subconjunto das componentes, chamada **marginal**,
obtém-se somando ou integrando as demais. Por exemplo, para $$p=2$$,

$$
f_{X_1}(x_1)=\int_{-\infty}^{+\infty}f_{X_1,X_2}(x_1,x_2)\,dx_2,
$$

e a **densidade condicional** de $$X_1$$ dado $$X_2=x_2$$, com
$$f_{X_2}(x_2)>0$$, é

$$
f_{X_1\mid X_2}(x_1\mid x_2)=\frac{f_{X_1,X_2}(x_1,x_2)}{f_{X_2}(x_2)}.
$$

## Vetor de médias

A esperança de um vetor aleatório é calculada componente a componente:

$$
\boldsymbol{\mu}=\mathbb{E}[\mathbf{X}]=\big(\mathbb{E}[X_1],\ldots,\mathbb{E}[X_p]\big)^{\top}.
$$

Para uma função $$g:\mathbb{R}^{p}\rightarrow\mathbb{R}$$, a esperança é a
integral (ou soma) múltipla de $$g(\mathbf{x})$$ ponderada pela densidade (ou
função de probabilidade) conjunta.

## Matriz de covariância e de correlação

A **covariância** entre duas componentes mede a associação linear entre elas:

$$
\operatorname{Cov}(X_i,X_j)
=
\mathbb{E}\big[(X_i-\mu_i)(X_j-\mu_j)\big]
=
\mathbb{E}[X_iX_j]-\mu_i\mu_j.
$$

Reunindo todas as covariâncias numa matriz $$p\times p$$,

$$
\boldsymbol{\Sigma}
=
\operatorname{Cov}(\mathbf{X})
=
\mathbb{E}\big[(\mathbf{X}-\boldsymbol{\mu})(\mathbf{X}-\boldsymbol{\mu})^{\top}\big].
$$

A diagonal de $$\boldsymbol{\Sigma}$$ contém as variâncias
$$\sigma_i^{2}=\operatorname{Var}(X_i)$$. A matriz é **simétrica** e **positiva
semidefinida**: para qualquer $$\mathbf{a}\in\mathbb{R}^{p}$$,

$$
\mathbf{a}^{\top}\boldsymbol{\Sigma}\,\mathbf{a}
=
\operatorname{Var}(\mathbf{a}^{\top}\mathbf{X})\ge 0.
$$

A **correlação** normaliza a covariância para o intervalo $$[-1,1]$$,

$$
\rho_{ij}=\frac{\operatorname{Cov}(X_i,X_j)}{\sigma_i\,\sigma_j},
$$

e a matriz de correlação $$\mathbf{R}$$ tem essas quantidades fora da diagonal e
$$1$$ na diagonal.

## Independência e não correlação

As componentes são **independentes** se e somente se a conjunta se fatora nas
marginais,

$$
f_{\mathbf{X}}(x_1,\ldots,x_p)=\prod_{i=1}^{p}f_{X_i}(x_i).
$$

A independência implica **não correlação** ($$\rho_{ij}=0$$ para $$i\neq j$$),
mas a recíproca é falsa em geral. Um contraexemplo: se $$X\sim\mathcal{N}(0,1)$$
e $$Y=X^{2}$$, então $$\operatorname{Cov}(X,Y)=\mathbb{E}[X^{3}]=0$$, mas $$X$$ e
$$Y$$ são claramente dependentes. A covariância só enxerga a relação **linear**.
A exceção importante é o vetor normal multivariado, para o qual não correlação
**equivale** a independência.

## Combinações lineares

Para uma matriz $$A$$ de dimensão $$m\times p$$ e um vetor $$\mathbf{b}$$,

$$
\mathbb{E}[A\mathbf{X}+\mathbf{b}]=A\boldsymbol{\mu}+\mathbf{b},
\qquad
\operatorname{Cov}(A\mathbf{X}+\mathbf{b})=A\,\boldsymbol{\Sigma}\,A^{\top}.
$$

Em particular, a variância de uma combinação linear escalar é

$$
\operatorname{Var}(\mathbf{a}^{\top}\mathbf{X})
=
\mathbf{a}^{\top}\boldsymbol{\Sigma}\,\mathbf{a}
=
\sum_{i}a_i^{2}\sigma_i^{2}+\sum_{i\neq j}a_i a_j\operatorname{Cov}(X_i,X_j),
$$

e, para duas variáveis,

$$
\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y).
$$

O termo de covariância desaparece quando as variáveis não são correlacionadas,
recuperando a aditividade da variância vista na aula 1.5.

## Normal multivariada

A generalização da normal para vetores. Escrevemos
$$\mathbf{X}\sim\mathcal{N}_p(\boldsymbol{\mu},\boldsymbol{\Sigma})$$ com
$$\boldsymbol{\Sigma}$$ positiva definida, e

$$
\boxed{
f_{\mathbf{X}}(\mathbf{x})
=
\frac{1}{(2\pi)^{p/2}\,\lvert\boldsymbol{\Sigma}\rvert^{1/2}}
\exp\!\left(-\tfrac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^{\top}\boldsymbol{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})\right).
}
$$

As suas propriedades a tornam central na estatística multivariada:

- toda combinação linear $$\mathbf{a}^{\top}\mathbf{X}$$ é normal univariada, e
  $$A\mathbf{X}+\mathbf{b}\sim\mathcal{N}(A\boldsymbol{\mu}+\mathbf{b},\,A\boldsymbol{\Sigma}A^{\top})$$;
- todas as marginais são normais;
- as condicionais também são normais. Particionando
  $$\mathbf{X}=(\mathbf{X}_1,\mathbf{X}_2)$$,

$$
\mathbf{X}_1\mid\mathbf{X}_2=\mathbf{x}_2
\ \sim\
\mathcal{N}\big(\boldsymbol{\mu}_1+\boldsymbol{\Sigma}_{12}\boldsymbol{\Sigma}_{22}^{-1}(\mathbf{x}_2-\boldsymbol{\mu}_2),\ \boldsymbol{\Sigma}_{11}-\boldsymbol{\Sigma}_{12}\boldsymbol{\Sigma}_{22}^{-1}\boldsymbol{\Sigma}_{21}\big).
$$

A média condicional é **linear** em $$\mathbf{x}_2$$, o que é a origem da
regressão linear, e a variância condicional não depende de $$\mathbf{x}_2$$;

- não correlação equivale a independência;
- as curvas de nível da densidade são elipses centradas em
  $$\boldsymbol{\mu}$$, com eixos dados pelos autovetores de
  $$\boldsymbol{\Sigma}$$ e comprimentos proporcionais às raízes dos
  autovalores.
