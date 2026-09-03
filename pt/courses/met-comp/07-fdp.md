---
title: 1.7 - Função de probabilidade e densidade
course: met-comp
---

## Da FDA às funções de probabilidade

A função de distribuição acumulada da aula anterior descreve qualquer variável
aleatória, mas nem sempre é a forma mais prática de trabalhar. Para o caso
discreto usamos a **função de probabilidade**, e para o caso contínuo a
**função densidade de probabilidade**. Esta aula trata das duas em detalhe e
das operações que fazemos com elas.

## Função de probabilidade (caso discreto)

**Definição.** Se $$X$$ assume valores num conjunto enumerável
$$\{x_1,x_2,\ldots\}$$, a sua **função de probabilidade** é

$$
p(x)=P(X=x).
$$

Ela satisfaz

$$
p(x_i)\ge 0
\qquad\text{e}\qquad
\sum_{i}p(x_i)=1.
$$

A relação com a FDA é direta: $$p(x_i)$$ é o salto de $$F_X$$ em $$x_i$$,

$$
p(x_i)=F_X(x_i)-F_X(x_i^{-}),
\qquad
F_X(x)=\sum_{x_i\le x}p(x_i),
$$

e a probabilidade de um evento qualquer é uma soma,

$$
P(X\in A)=\sum_{x_i\in A}p(x_i).
$$

Por exemplo, para $$X\sim\text{Binomial}(n,\theta)$$,

$$
p(k)=\binom{n}{k}\theta^{k}(1-\theta)^{\,n-k},
\qquad k=0,1,\ldots,n.
$$

## Função densidade de probabilidade (caso contínuo)

**Definição.** Se existe uma função $$f_X\ge 0$$ tal que

$$
P(a<X\le b)=\int_a^b f_X(x)\,dx
$$

para todos $$a\le b$$, dizemos que $$X$$ é contínua e $$f_X$$ é a sua **função
densidade de probabilidade**. Ela satisfaz

$$
f_X(x)\ge 0
\qquad\text{e}\qquad
\int_{-\infty}^{+\infty}f_X(x)\,dx=1.
$$

A relação com a FDA é de integração e derivação:

$$
F_X(x)=\int_{-\infty}^{x}f_X(t)\,dt,
\qquad
f_X(x)=F_X'(x)
$$

nos pontos em que $$f_X$$ é contínua.

**Cuidado:** $$f_X(x)$$ **não** é uma probabilidade. Pode ser maior que $$1$$, e
$$P(X=x)=0$$ para todo $$x$$. O que tem interpretação é a densidade vezes um
comprimento infinitesimal,

$$
P(x<X\le x+dx)\approx f_X(x)\,dx,
$$

ou, de forma equivalente, a área sob a curva num intervalo. Dois exemplos:

$$
X\sim\text{Exponencial}(\lambda):\qquad f_X(x)=\lambda e^{-\lambda x},\quad x\ge 0,
$$

$$
X\sim\mathcal{N}(\mu,\sigma^{2}):\qquad
f_X(x)=\frac{1}{\sqrt{2\pi}\,\sigma}\exp\!\left(-\frac{(x-\mu)^{2}}{2\sigma^{2}}\right).
$$

## Suporte

O **suporte** de $$X$$ é o conjunto de valores com probabilidade ou densidade
positiva,

$$
\operatorname{supp}(X)=\{\,x:\ p(x)>0\,\}
\quad\text{ou}\quad
\operatorname{supp}(X)=\{\,x:\ f_X(x)>0\,\}.
$$

Fora do suporte, todas as somas e integrais anteriores podem ser restringidas.

## Esperança e variância

Retomando a aula 1.5, para uma função $$g$$ de $$X$$,

$$
\mathbb{E}[g(X)]=\sum_i g(x_i)\,p(x_i)
\qquad\text{ou}\qquad
\mathbb{E}[g(X)]=\int_{-\infty}^{+\infty}g(x)\,f_X(x)\,dx,
$$

e, em particular, $$\mu=\mathbb{E}[X]$$ e
$$\operatorname{Var}(X)=\mathbb{E}[(X-\mu)^{2}]=\mathbb{E}[X^{2}]-\mu^{2}$$.
Toda a caracterização numérica da distribuição (média, variância, momentos,
quantis) pode ser lida da função de probabilidade ou da densidade.

## Distribuição conjunta

Quando estudamos duas variáveis ao mesmo tempo, $$p(x,y)=P(X=x,Y=y)$$ é a
**função de probabilidade conjunta** no caso discreto, e $$f_{X,Y}(x,y)$$ a
**densidade conjunta** no caso contínuo, com

$$
P\big((X,Y)\in A\big)=\iint_{A}f_{X,Y}(x,y)\,dx\,dy.
$$

As distribuições de cada variável isoladamente, chamadas **marginais**, saem
por soma ou integração da outra:

$$
p_X(x)=\sum_{y}p(x,y),
\qquad
f_X(x)=\int_{-\infty}^{+\infty}f_{X,Y}(x,y)\,dy.
$$

A **densidade condicional** de $$Y$$ dado $$X=x$$ (com $$f_X(x)>0$$) é

$$
f_{Y\mid X}(y\mid x)=\frac{f_{X,Y}(x,y)}{f_X(x)},
$$

o análogo contínuo da probabilidade condicional da aula 1.4. As variáveis são
**independentes** se e somente se a conjunta se fatora nas marginais,

$$
\boxed{
f_{X,Y}(x,y)=f_X(x)\,f_Y(y)\quad\text{para todos }x,y.
}
$$

## Transformação de variáveis

Se $$Y=g(X)$$ com $$g$$ monótona e diferenciável, a densidade de $$Y$$ sai da
de $$X$$ pela fórmula da mudança de variável,

$$
f_Y(y)=f_X\big(g^{-1}(y)\big)\left\lvert\frac{d}{dy}\,g^{-1}(y)\right\rvert.
$$

O fator com a derivada corrige a "compressão" ou "dilatação" do eixo provocada
por $$g$$. Por exemplo, com $$Y=aX+b$$ e $$a\neq 0$$,
$$f_Y(y)=\frac{1}{\lvert a\rvert}f_X\!\big((y-b)/a\big)$$. No caso discreto não
há fator de correção: basta somar as probabilidades dos $$x$$ que levam a cada
valor de $$y$$.
