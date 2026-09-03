---
title: "6.1 — PCA e Redução de Dimensionalidade"
course: ml
---

## PCA e redução de dimensionalidade

Começa a Parte VI, sobre aprendizado não supervisionado: só observamos $$X$$,
sem rótulos. A análise de componentes principais (PCA) é o método linear
básico para encontrar as direções ao longo das quais os dados mais variam, e
usá-las para comprimir, visualizar ou denoisar.

### Conteúdo

- Matriz de covariância
- Maximização da variância
- Autovetores e autovalores
- Decomposição em valores singulares
- Erro de reconstrução

### Preparação e matriz de covariância

Centre os dados subtraindo a média de cada coluna, formando
$$X\in\mathbb{R}^{n\times p}$$ com colunas de média zero. A **matriz de
covariância amostral** é

$$
S=\frac{1}{n}X^{\top}X\ \in\ \mathbb{R}^{p\times p},
$$

simétrica e positiva semidefinida.

### Maximização da variância

Procuramos a direção unitária $$w$$ ao longo da qual a projeção $$Xw$$ tem a
maior variância. Como os dados são centrados,
$$\operatorname{Var}(Xw)=w^{\top}Sw$$, e o problema é

$$
\max_{\lVert w\rVert=1}\ w^{\top}Sw.
$$

Com um multiplicador de Lagrange para a restrição $$\lVert w\rVert^{2}=1$$,
derivando obtém-se

$$
Sw=\lambda w.
$$

Ou seja, os candidatos são os **autovetores** de $$S$$, e para um autovetor
$$w$$ a variância explicada é $$w^{\top}Sw=\lambda$$, o **autovalor**. A
primeira componente principal é o autovetor de maior autovalor; a segunda é o
autovetor seguinte (ortogonal ao primeiro), e assim por diante.

### Reconstrução e o erro de reconstrução

Projetar os dados nas primeiras $$k$$ componentes dá a melhor aproximação
linear de posto $$k$$: entre todos os subespaços de dimensão $$k$$, o gerado
pelas $$k$$ primeiras componentes é o que minimiza o **erro de reconstrução**

$$
\sum_{i=1}^{n}\big\lVert x_i-\Pi_k x_i\big\rVert^{2},
$$

onde $$\Pi_k$$ é a projeção ortogonal nesse subespaço (teorema de
Eckart-Young). Maximizar variância retida e minimizar erro de reconstrução são,
portanto, o mesmo problema.

### Via decomposição em valores singulares

Na prática, calcula-se a SVD $$X=U D V^{\top}$$ em vez de diagonalizar $$S$$. As
colunas de $$V$$ são as componentes principais, os valores $$d_j^{2}/n$$ são as
variâncias $$\lambda_j$$, e as coordenadas dos pontos no novo sistema (os
*scores*) são $$U D$$. A SVD é mais estável numericamente e evita formar
$$X^{\top}X$$.

### Escolha do número de componentes

A **razão de variância explicada** por cada componente é
$$\lambda_j\big/\sum_{l}\lambda_l$$. Costuma-se olhar o gráfico dos autovalores
(*scree plot*) e reter componentes até acumular uma fração alvo da variância
total, ou até o "cotovelo" da curva.

### Usos e limitações

PCA serve para visualização em duas ou três dimensões, compressão, remoção de
ruído e descorrelação de *features* antes de outro modelo. As limitações: é
**linear** (não captura estrutura curva), é sensível à escala das variáveis
(padronize antes se as unidades diferem), e as direções nem sempre têm
interpretação física. Em Astronomia é clássico para espectros (as
*eigenspectra*) e para comprimir fotometria de muitas bandas.
