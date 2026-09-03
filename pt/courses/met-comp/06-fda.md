---
title: 1.6 - Função de distribuição acumulada
course: met-comp
---

## Função de distribuição acumulada

Na aula anterior vimos que variáveis aleatórias discretas são descritas pela
função de probabilidade e as contínuas pela densidade. A **função de
distribuição acumulada** (FDA) é a descrição que serve para **as duas**, e
ainda para variáveis que misturam as duas naturezas. Por isso ela é o objeto
central desta aula.

**Definição.** A FDA de uma variável aleatória $$X$$ é

$$
\boxed{
F_X(x)=P(X\le x),\qquad x\in\mathbb{R}.
}
$$

## Propriedades caracterizadoras

Toda FDA satisfaz as três propriedades a seguir, e, reciprocamente, qualquer
função com essas três propriedades é a FDA de alguma variável aleatória.

1. **Monotonicidade.** $$F_X$$ é não decrescente: se $$x_1\le x_2$$, então
   $$F_X(x_1)\le F_X(x_2)$$.
2. **Limites.**
   $$\displaystyle\lim_{x\to-\infty}F_X(x)=0$$ e
   $$\displaystyle\lim_{x\to+\infty}F_X(x)=1$$.
3. **Continuidade à direita.**
   $$\displaystyle\lim_{h\to 0^{+}}F_X(x+h)=F_X(x)$$ para todo $$x$$.

## Probabilidades a partir da FDA

Toda pergunta sobre $$X$$ pode ser respondida por $$F_X$$. Denotando por
$$F_X(x^{-})=\lim_{h\to 0^{+}}F_X(x-h)$$ o limite pela esquerda,

$$
P(X\le b)=F_X(b),
\qquad
P(X>a)=1-F_X(a),
$$

$$
P(a<X\le b)=F_X(b)-F_X(a),
$$

$$
P(X<x)=F_X(x^{-}),
\qquad
P(X=x)=F_X(x)-F_X(x^{-}).
$$

A última identidade é importante: $$P(X=x)$$ é o **tamanho do salto** de
$$F_X$$ em $$x$$. Se $$F_X$$ é contínua em $$x$$, o salto é zero e
$$P(X=x)=0$$. Logo, $$X$$ é contínua se e somente se $$F_X$$ é contínua, e cada
descontinuidade de $$F_X$$ corresponde a um valor com probabilidade positiva.

## FDA de variáveis discretas

Para uma variável discreta que assume os valores $$x_1<x_2<\cdots$$ com
probabilidades $$p(x_i)$$,

$$
F_X(x)=\sum_{x_i\le x}p(x_i).
$$

O gráfico é uma **função escada**: constante entre valores consecutivos, com
um salto de altura $$p(x_i)$$ em cada $$x_i$$. Por exemplo, para
$$X\sim\text{Bernoulli}(p)$$,

$$
F_X(x)=
\begin{cases}
0, & x<0,\\
1-p, & 0\le x<1,\\
1, & x\ge 1.
\end{cases}
$$

## FDA de variáveis contínuas

Para uma variável contínua com densidade $$f_X$$,

$$
F_X(x)=\int_{-\infty}^{x}f_X(t)\,dt,
$$

que é uma função contínua, derivável em quase todo ponto, com
$$F_X'(x)=f_X(x)$$ onde $$f_X$$ é contínua. Dois exemplos:

$$
X\sim\text{Uniforme}(a,b):\qquad
F_X(x)=
\begin{cases}
0, & x<a,\\[2pt]
\dfrac{x-a}{b-a}, & a\le x\le b,\\[6pt]
1, & x>b.
\end{cases}
$$

$$
X\sim\text{Exponencial}(\lambda):\qquad
F_X(x)=1-e^{-\lambda x},\quad x\ge 0.
$$

## Quantis e a função quantil

A FDA pode ser "invertida" para responder à pergunta oposta: qual valor de
$$x$$ deixa uma dada proporção da distribuição à esquerda? A **função quantil**
é a inversa generalizada

$$
Q_X(q)=\inf\{\,x:\ F_X(x)\ge q\,\},\qquad q\in(0,1).
$$

Quando $$F_X$$ é contínua e estritamente crescente, $$Q_X=F_X^{-1}$$. A mediana
é $$Q_X(0{,}5)$$, e o primeiro e o terceiro quartis são $$Q_X(0{,}25)$$ e
$$Q_X(0{,}75)$$, recuperando as medidas de posição da aula 1.1.

## Transformação integral de probabilidade

Um resultado que liga a FDA à simulação. Se $$X$$ é contínua com FDA $$F_X$$,
então

$$
U=F_X(X)\ \sim\ \text{Uniforme}(0,1).
$$

A recíproca é o **método da inversa**: se $$U\sim\text{Uniforme}(0,1)$$, então
$$Q_X(U)$$ tem FDA $$F_X$$. Isso permite gerar amostras de **qualquer**
distribuição a partir de números uniformes: basta aplicar $$Q_X$$. Por exemplo,
para a exponencial, $$F_X(x)=1-e^{-\lambda x}$$ dá
$$Q_X(u)=-\frac{1}{\lambda}\log(1-u)$$, e $$-\frac{1}{\lambda}\log(1-U)$$ é uma
exponencial. Voltaremos a isso na parte computacional do curso.

## FDA empírica

Dada uma amostra $$x_1,\ldots,x_n$$, a **FDA empírica** é

$$
\hat F_n(x)=\frac{1}{n}\sum_{i=1}^{n}\mathbf{1}[\,x_i\le x\,],
$$

isto é, a proporção de observações menores ou iguais a $$x$$. Para cada $$x$$
fixo, $$n\,\hat F_n(x)\sim\text{Binomial}\big(n,F_X(x)\big)$$, de modo que
$$\hat F_n(x)$$ é um estimador não viesado de $$F_X(x)$$. O teorema de
Glivenko-Cantelli garante mais: a convergência é **uniforme**,

$$
\sup_{x}\big\lvert\hat F_n(x)-F_X(x)\big\rvert\ \longrightarrow\ 0
$$

quase certamente quando $$n\to\infty$$. A FDA empírica é a base dos testes de
aderência (como o de Kolmogorov-Smirnov) e dos gráficos quantil-quantil.
