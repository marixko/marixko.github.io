---
title: 1.3 — O Preditor de Bayes e Decisão Estatística
course: ml
---

## O preditor de Bayes e decisão estatística

Na aula anterior definimos o risco e afirmamos, sem demonstrar, qual é o
preditor ótimo para cada função de perda. Nesta aula fechamos essa lacuna. A
ferramenta é a **teoria da decisão estatística**, que trata a predição como a
escolha de uma ação sob incerteza, e a chave é uma observação simples: o risco
pode ser minimizado separadamente em cada ponto $$x$$.

### Conteúdo

- Decisão estatística
- Regra de decisão
- Preditor ótimo
- Risco de Bayes
- Função de perda e escolha do estimador

### Decisão estatística

Um problema de decisão estatística tem quatro ingredientes:

- a **quantidade de interesse**, aqui a resposta $$Y$$, cujo valor é incerto;
- um **espaço de ações** $$\mathcal{A}$$, o conjunto de predições possíveis
  (por exemplo $$\mathcal{A}=\mathbb{R}$$ em regressão, ou o conjunto de classes
  em classificação);
- uma **função de perda** $$L(y,a)$$, o custo de tomar a ação $$a$$ quando a
  resposta verdadeira é $$y$$;
- os **dados** $$X$$, que carregam informação sobre $$Y$$ através da
  distribuição conjunta $$P(X,Y)$$.

Prever é escolher uma ação $$a\in\mathcal{A}$$ para cada valor observado de
$$X$$, antes de conhecer $$Y$$.

### Regra de decisão

Uma **regra de decisão** é uma função

$$
\delta:\mathcal{X}\rightarrow\mathcal{A}
$$

que associa a cada entrada $$x$$ uma ação $$\delta(x)$$. No nosso contexto a
regra de decisão é exatamente a função de predição $$f$$. A qualidade de uma
regra é medida pelo risco já conhecido,

$$
R(\delta)=\mathbb{E}_{(X,Y)\sim P}\big[\,L\big(Y,\delta(X)\big)\,\big].
$$

Queremos a regra que minimiza $$R(\delta)$$ entre todas as regras possíveis.

### O preditor ótimo (regra de Bayes)

Aplicando a lei da esperança total, escrevemos o risco condicionando em $$X$$:

$$
R(\delta)
=
\mathbb{E}_{X}\Big[\;
\underbrace{\mathbb{E}_{Y\mid X}\big[\,L(Y,\delta(X))\,\big\vert\,X\,\big]}_{\text{risco condicional em }X}
\;\Big].
$$

O termo interno depende da regra apenas através do valor $$\delta(x)$$, e o
termo externo é uma média de quantidades não negativas. Logo, para minimizar
$$R(\delta)$$ basta minimizar o **risco condicional** separadamente em cada
ponto. O **preditor de Bayes** é

$$
\boxed{
\,f^{*}(x)=\arg\min_{a\in\mathcal{A}}\;\mathbb{E}\big[\,L(Y,a)\,\big\vert\,X=x\,\big]\,}
$$

Tudo o que resta é resolver esse problema de minimização em $$a$$ para cada
função de perda. É o que fazemos a seguir.

### Perda quadrática: a média condicional

Para $$L(y,a)=(y-a)^2$$, o risco condicional em $$x$$ é

$$
g(a)=\mathbb{E}\big[(Y-a)^2\,\big\vert\,X=x\,\big].
$$

Some e subtraia $$\mu(x):=\mathbb{E}[\,Y\mid X=x\,]$$ dentro do quadrado:

$$
g(a)
=
\mathbb{E}\big[(Y-\mu(x))^2\,\big\vert\,x\,\big]
+
\big(\mu(x)-a\big)^2,
$$

pois o termo cruzado $$2\,(\mu(x)-a)\,\mathbb{E}[\,Y-\mu(x)\mid x\,]$$ se anula
por definição de $$\mu(x)$$. O primeiro termo é
$$\operatorname{Var}(Y\mid X=x)$$ e **não depende de $$a$$**; o segundo é não
negativo e se anula quando $$a=\mu(x)$$. Portanto,

$$
f^{*}(x)=\mathbb{E}[\,Y\mid X=x\,].
$$

A perda quadrática faz o modelo estimar a **média condicional**, e o resíduo
irredutível é a variância condicional.

### Perda absoluta: a mediana condicional

Para $$L(y,a)=\lvert y-a\rvert$$, o risco condicional em $$x$$ é
$$g(a)=\mathbb{E}\big[\,\lvert Y-a\rvert\,\big\vert\,X=x\,\big]$$. Derivando em
relação a $$a$$ (a troca de derivada e esperança é válida aqui),

$$
g'(a)
=
\mathbb{E}\big[\,\operatorname{sign}(a-Y)\,\big\vert\,x\,\big]
=
P(Y<a\mid x)-P(Y>a\mid x).
$$

Igualando a zero, procuramos $$a$$ tal que $$P(Y<a\mid x)=P(Y>a\mid x)$$, ou
seja, $$P(Y\le a\mid x)\ge \tfrac12$$ e $$P(Y\ge a\mid x)\ge \tfrac12$$. Isso é
precisamente a definição de **mediana** de $$Y\mid X=x$$. Logo,

$$
f^{*}(x)=\operatorname{mediana}(Y\mid X=x).
$$

Como a mediana é pouco afetada por caudas pesadas, a perda absoluta produz
predições mais robustas a *outliers* do que a perda quadrática.

### Classificação: perda 0–1 e o classificador de Bayes

Agora $$Y$$ toma valores em um conjunto finito de classes e
$$L(y,a)=\mathbf{1}[\,y\neq a\,]$$. O risco condicional em $$x$$ é

$$
g(a)
=
\mathbb{E}\big[\,\mathbf{1}[\,Y\neq a\,]\,\big\vert\,X=x\,\big]
=
P(Y\neq a\mid X=x)
=
1-P(Y=a\mid X=x).
$$

Minimizar $$g(a)$$ é maximizar $$P(Y=a\mid X=x)$$. O preditor de Bayes é o
**classificador de Bayes**, que escolhe a classe *a posteriori* mais provável:

$$
f^{*}(x)=\arg\max_{y}\;P(Y=y\mid X=x).
$$

A fronteira de decisão entre duas classes é o lugar onde as probabilidades
*a posteriori* se igualam.

### Risco de Bayes

O risco do preditor de Bayes, $$R^{*}=R(f^{*})$$, é o **risco de Bayes**: o
menor risco alcançável por qualquer regra de decisão. Ele mede a incerteza que
sobra mesmo conhecendo $$P(X,Y)$$ perfeitamente, e por isso costuma ser chamado
de erro irredutível. Substituindo cada preditor ótimo no risco, obtemos formas
fechadas:

| Perda | Preditor de Bayes $$f^{*}(x)$$ | Risco de Bayes $$R^{*}$$ |
| --- | --- | --- |
| Quadrática | $$\mathbb{E}[\,Y\mid X=x\,]$$ | $$\mathbb{E}_{X}\big[\operatorname{Var}(Y\mid X)\big]$$ |
| Absoluta | $$\operatorname{mediana}(Y\mid X=x)$$ | $$\mathbb{E}_{X}\big[\,\mathbb{E}(\lvert Y-\operatorname{mediana}\rvert\mid X)\big]$$ |
| 0–1 | $$\arg\max_{y}P(Y=y\mid X=x)$$ | $$\mathbb{E}_{X}\big[\,1-\max_{y}P(Y=y\mid X)\big]$$ |

Um modelo real nunca atinge $$R^{*}$$, mas ele é a referência: a diferença
$$R(\hat f)-R^{*}$$, o excesso de risco, é o que se pode de fato reduzir com
mais dados e melhores hipóteses.

### A função de perda e a escolha do estimador

A conclusão central da aula é que <mark>a função de perda determina qual
funcional da distribuição condicional o modelo estima</mark>: a média com a
perda quadrática, a mediana com a perda absoluta, a moda com a perda 0–1, e a
distribuição inteira com a log-loss. Escolher a perda é, portanto, uma decisão
de modelagem, e não um detalhe de implementação.

Isso também abre espaço para **perdas assimétricas**, úteis quando errar para
mais e errar para menos têm custos diferentes. A perda *pinball* de nível
$$\tau\in(0,1)$$,

$$
L_{\tau}(y,a)=\big(\tau-\mathbf{1}[\,y<a\,]\big)(y-a),
$$

tem como preditor de Bayes o **$$\tau$$-quantil** condicional de $$Y\mid X=x$$,
e é a base da regressão quantílica. Em classificação, uma matriz de custos
$$C(y,a)$$ substitui a perda 0–1, e a regra de Bayes passa a ser

$$
f^{*}(x)=\arg\min_{a}\;\sum_{y}C(y,a)\,P(Y=y\mid X=x).
$$

Em Astronomia isso é comum: o custo de deixar escapar um objeto raro (um quasar
de alto *redshift*, uma transiente) costuma ser bem maior que o de contaminar a
amostra com um falso positivo, e a matriz de custos codifica exatamente esse
compromisso.
