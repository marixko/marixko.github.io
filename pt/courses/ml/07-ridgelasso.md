---
title: "2.3 — Regularização: Ridge e Lasso"
course: ml
---

## Regularização: Ridge e Lasso

No fim das duas aulas anteriores vimos que a variância de $$\hat\beta_{\mathrm{OLS}}$$
explode quando as colunas de $$X$$ são quase colineares, e que os mínimos
quadrados nem sequer estão definidos quando $$p>n$$. A **regularização**
resolve os dois problemas de uma vez: acrescenta à função objetivo um termo que
penaliza coeficientes grandes, trocando um pouco de viés por uma redução grande
de variância.

### Conteúdo

- Penalização e por que regularizar
- Ridge: solução fechada
- Shrinkage
- Lasso e esparsidade
- Interpretação geométrica
- Compromisso viés-variância
- Seleção de variáveis e escolha de $$\lambda$$

### Penalização e por que regularizar

A forma geral de um ajuste linear penalizado é

$$
\hat\beta=\arg\min_{\beta}\Big[\;\lVert y-X\beta\rVert^{2}+\lambda\,\Omega(\beta)\;\Big],
$$

onde $$\Omega$$ é a penalidade e $$\lambda\ge 0$$ controla a sua força. Com
$$\lambda=0$$ recupera-se OLS; quando $$\lambda\to\infty$$, $$\hat\beta\to 0$$.

Isso não é um truque *ad hoc*: como vimos na aula 1.4, mínimos quadrados
penalizados são uma estimativa de **máximo a posteriori**. A penalidade
$$\lambda\lVert\beta\rVert_2^{2}$$ corresponde a um prior gaussiano
$$\beta\sim\mathcal{N}(0,\tau^{2}I)$$, e $$\lambda\lVert\beta\rVert_1$$, a um
prior de Laplace.

Duas convenções importam antes de penalizar: as colunas de $$X$$ devem ser
**padronizadas** (média zero e variância um), pois caso contrário a penalidade
dependeria das unidades de cada preditor, e o **intercepto** normalmente fica
de fora da penalização.

### Ridge: solução fechada

A regressão *ridge* usa a penalidade $$L_2$$:

$$
\hat\beta_{\mathrm{ridge}}
=
\arg\min_{\beta}\Big[\;\lVert y-X\beta\rVert^{2}+\lambda\lVert\beta\rVert_2^{2}\;\Big].
$$

A função objetivo continua sendo uma quadrática convexa. O gradiente é

$$
\nabla_{\beta}
=
-2X^{\top}(y-X\beta)+2\lambda\beta,
$$

e igualando a zero obtemos $$(X^{\top}X+\lambda I)\hat\beta=X^{\top}y$$, ou seja,

$$
\boxed{\;\hat\beta_{\mathrm{ridge}}=(X^{\top}X+\lambda I)^{-1}X^{\top}y\;}
$$

Para qualquer $$\lambda>0$$, a matriz $$X^{\top}X+\lambda I$$ é **sempre
inversível**: somar $$\lambda$$ a todos os autovalores de $$X^{\top}X$$ a torna
positiva definida mesmo quando $$X^{\top}X$$ é singular. É por isso que *ridge*
funciona com colinearidade e até com $$p>n$$.

### Shrinkage

O efeito da penalidade fica transparente pela decomposição em valores
singulares $$X=UDV^{\top}$$, com valores singulares $$d_j$$. Os valores
ajustados de OLS e de *ridge* são

$$
\hat y_{\mathrm{OLS}}=\sum_{j}u_j\,(u_j^{\top}y),
\qquad
\hat y_{\mathrm{ridge}}=\sum_{j}u_j\,\frac{d_j^{2}}{d_j^{2}+\lambda}\,(u_j^{\top}y).
$$

Cada direção é multiplicada por um fator de **encolhimento**
$$d_j^{2}/(d_j^{2}+\lambda)\in(0,1)$$. As direções de menor variância nos dados
(as de $$d_j$$ pequeno) são as mais encolhidas, que são justamente as
responsáveis pela instabilidade de OLS sob colinearidade. O *ridge* aproxima os
coeficientes de zero mas **nunca os zera**. Uma medida útil da complexidade
efetiva do ajuste são os graus de liberdade

$$
\operatorname{df}(\lambda)=\sum_{j}\frac{d_j^{2}}{d_j^{2}+\lambda},
$$

que decrescem de $$p$$ (quando $$\lambda=0$$) até $$0$$ (quando
$$\lambda\to\infty$$).

### Lasso e esparsidade

O *lasso* troca a penalidade $$L_2$$ pela $$L_1$$:

$$
\hat\beta_{\mathrm{lasso}}
=
\arg\min_{\beta}\Big[\;\lVert y-X\beta\rVert^{2}+\lambda\lVert\beta\rVert_1\;\Big],
\qquad
\lVert\beta\rVert_1=\sum_{j}\lvert\beta_j\rvert.
$$

O problema é convexo, mas $$\lVert\cdot\rVert_1$$ não é diferenciável em zero,
então não há fórmula fechada; usa-se descida por coordenadas ou o algoritmo
LARS. A propriedade central é que, para $$\lambda$$ grande o suficiente, alguns
$$\hat\beta_j$$ ficam **exatamente iguais a zero**: o *lasso* estima e
seleciona variáveis ao mesmo tempo.

A condição de otimalidade (via subgradiente) explica por quê. Para cada
preditor $$j$$,

$$
x_j^{\top}(y-X\hat\beta)=\lambda\,\operatorname{sign}(\hat\beta_j)
\ \text{ se }\ \hat\beta_j\neq 0,
\qquad
\big\lvert x_j^{\top}(y-X\hat\beta)\big\rvert\le\lambda
\ \text{ se }\ \hat\beta_j=0.
$$

No caso ortonormal ($$X^{\top}X=I$$), isso vira o **limiar suave**
(*soft-thresholding*):

$$
\hat\beta_j^{\mathrm{lasso}}
=
\operatorname{sign}\big(\hat\beta_j^{\mathrm{OLS}}\big)\,
\Big(\big\lvert\hat\beta_j^{\mathrm{OLS}}\big\rvert-\tfrac{\lambda}{2}\Big)_{+},
$$

que zera todo coeficiente cujo valor de OLS seja menor que $$\lambda/2$$ em
módulo. Para comparar, o *ridge* no mesmo caso apenas reescala:
$$\hat\beta_j^{\mathrm{ridge}}=\hat\beta_j^{\mathrm{OLS}}/(1+\lambda)$$.

### Interpretação geométrica

Cada penalidade tem uma forma restrita equivalente:

$$
\min_{\beta}\ \lVert y-X\beta\rVert^{2}
\quad\text{sujeito a}\quad
\lVert\beta\rVert_2^{2}\le t
\ \ (\text{ridge}),
\qquad
\lVert\beta\rVert_1\le t
\ \ (\text{lasso}).
$$

A solução é o ponto em que as elipses de nível de $$\lVert y-X\beta\rVert^{2}$$
tocam a região de restrição. No *ridge* essa região é uma bola de fronteira
lisa, então o ponto de contato quase nunca tem alguma coordenada exatamente
zero. No *lasso* a região é um losango (a bola $$L_1$$), com quinas apoiadas
sobre os eixos, e o contato tende a ocorrer numa quina, onde parte das
coordenadas se anula. Essa é a origem geométrica da esparsidade.

### Compromisso viés-variância

Para $$\lambda>0$$ o estimador *ridge* é viesado,

$$
\mathbb{E}[\hat\beta_{\mathrm{ridge}}\mid X]
=
(X^{\top}X+\lambda I)^{-1}X^{\top}X\,\beta\neq\beta,
$$

mas a sua variância,

$$
\operatorname{Var}(\hat\beta_{\mathrm{ridge}}\mid X)
=
\sigma^{2}(X^{\top}X+\lambda I)^{-1}X^{\top}X(X^{\top}X+\lambda I)^{-1},
$$

é menor que $$\sigma^{2}(X^{\top}X)^{-1}$$. O ponto notável é que, sob
colinearidade, **sempre existe** um $$\lambda>0$$ cujo erro quadrático médio
(viés ao quadrado mais variância) é menor que o de OLS. O erro de predição
fora da amostra, como função de $$\lambda$$, tem tipicamente forma de U: cresce
de novo quando $$\lambda$$ é grande demais e o viés domina.

### Seleção de variáveis e escolha de $$\lambda$$

O *lasso* faz seleção de variáveis de forma automática e é indicado quando se
acredita que **poucos** preditores realmente importam (hipótese de
esparsidade). As suas limitações: entre preditores muito correlacionados ele
escolhe um quase ao acaso, e seleciona no máximo $$n$$ variáveis quando
$$p>n$$. A *elastic net* combina as duas penalidades,
$$\lambda_1\lVert\beta\rVert_1+\lambda_2\lVert\beta\rVert_2^{2}$$, e herda a
esparsidade do *lasso* com a estabilidade do *ridge* sob correlação.

O parâmetro $$\lambda$$ é escolhido por **validação cruzada**: parte-se os
dados em $$k$$ blocos, ajusta-se para uma grade de valores de $$\lambda$$ e
escolhe-se o que minimiza o erro de predição médio nos blocos deixados de
fora. A regra "um erro-padrão" prefere o maior $$\lambda$$ cujo erro ainda está
dentro de um erro-padrão do mínimo, resultando num modelo mais parcimonioso.
Nunca se escolhe $$\lambda$$ pelo erro de treino, que decresce de forma
monótona à medida que $$\lambda\to 0$$.

O **caminho de regularização** é a função $$\hat\beta(\lambda)$$ para todo
$$\lambda$$; para o *lasso* ele é linear por partes, e o LARS o calcula por
inteiro a um custo comparável ao de um único ajuste de OLS. Em Astronomia,
onde é comum ter dezenas de bandas e cores derivadas fortemente
correlacionadas (por exemplo em fotometria para *photo-z* ou classificação),
*lasso* e *elastic net* são úteis tanto para selecionar quanto para
estabilizar o ajuste.
