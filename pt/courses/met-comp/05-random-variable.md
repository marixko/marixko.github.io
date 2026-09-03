---
title: 1.5 - Variáveis aleatórias
course: met-comp
---

## O conceito de variável aleatória

Na aula anterior trabalhamos com eventos, que são subconjuntos do espaço
amostral $$\Omega$$. Na prática, quase sempre estamos interessados em algum
**número** associado ao resultado do experimento: a soma de dois dados, o
número de sucessos em $$n$$ tentativas, o tempo até uma falha. A variável
aleatória é o objeto que formaliza essa passagem de resultados para números.

**Definição.** Dado um espaço de probabilidade $$(\Omega,\mathcal{F},P)$$, uma
**variável aleatória** é uma função

$$
X:\Omega\rightarrow\mathbb{R}
$$

tal que, para todo $$x\in\mathbb{R}$$, o conjunto
$$\{\omega\in\Omega:X(\omega)\le x\}$$ pertence a $$\mathcal{F}$$, ou seja, é um
evento ao qual $$P$$ atribui probabilidade.

O nome é um pouco enganoso: $$X$$ não é "variável" nem "aleatória", é uma
função determinística. A aleatoriedade vem de $$\omega$$, e $$X$$ apenas a
transporta para a reta real. Escrevemos, por exemplo,
$$P(X\le x)$$ como abreviação de $$P(\{\omega:X(\omega)\le x\})$$.

## Função de distribuição acumulada

A forma mais geral de descrever uma variável aleatória é pela sua **função de
distribuição acumulada** (FDA):

$$
\boxed{
F_X(x)=P(X\le x),\qquad x\in\mathbb{R}.
}
$$

Toda FDA satisfaz:

* é **não decrescente**: se $$x_1\le x_2$$, então $$F_X(x_1)\le F_X(x_2)$$;
* $$\displaystyle\lim_{x\to-\infty}F_X(x)=0$$ e
  $$\displaystyle\lim_{x\to+\infty}F_X(x)=1$$;
* é **contínua à direita**.

A partir de $$F_X$$ recuperamos a probabilidade de qualquer intervalo:

$$
P(a<X\le b)=F_X(b)-F_X(a).
$$

## Variáveis aleatórias discretas

Uma variável aleatória é **discreta** quando assume valores em um conjunto
finito ou enumerável $$\{x_1,x_2,\ldots\}$$. Ela é descrita pela **função de
probabilidade**

$$
p(x_i)=P(X=x_i),
$$

que satisfaz $$p(x_i)\ge 0$$ e $$\sum_i p(x_i)=1$$. A FDA é a soma acumulada,

$$
F_X(x)=\sum_{x_i\le x}p(x_i).
$$

Exemplos clássicos são as distribuições de Bernoulli, binomial e de Poisson,
tratadas nas próximas aulas.

## Variáveis aleatórias contínuas

Uma variável aleatória é **contínua** quando existe uma função
$$f_X\ge 0$$, chamada **função densidade de probabilidade**, tal que

$$
F_X(x)=\int_{-\infty}^{x}f_X(t)\,dt.
$$

Nesse caso,

$$
P(a<X\le b)=\int_a^b f_X(x)\,dx,
\qquad
\int_{-\infty}^{+\infty}f_X(x)\,dx=1,
$$

e, nos pontos em que $$f_X$$ é contínua, $$f_X(x)=F_X'(x)$$. Note que
$$f_X(x)$$ **não** é uma probabilidade: pode ser maior que $$1$$, e o que tem
significado é a área sob a curva. Para uma variável contínua,
$$P(X=x)=0$$ para todo $$x$$. Exemplos clássicos são as distribuições
uniforme, exponencial e normal.

## Esperança

A **esperança** (ou valor esperado, ou média) de $$X$$ resume a sua
localização. Para uma variável discreta,

$$
\mathbb{E}[X]=\sum_i x_i\,p(x_i),
$$

e para uma contínua,

$$
\mathbb{E}[X]=\int_{-\infty}^{+\infty}x\,f_X(x)\,dx,
$$

quando a soma ou a integral convergem absolutamente. É uma média dos valores
possíveis ponderada pelas suas probabilidades.

Para uma função $$g$$ de $$X$$, não é preciso encontrar a distribuição de
$$g(X)$$: vale a **lei do estatístico inconsciente**,

$$
\mathbb{E}[g(X)]=\sum_i g(x_i)\,p(x_i)
\qquad\text{ou}\qquad
\mathbb{E}[g(X)]=\int_{-\infty}^{+\infty}g(x)\,f_X(x)\,dx.
$$

A esperança é **linear**: para constantes $$a$$ e $$b$$,

$$
\mathbb{E}[aX+b]=a\,\mathbb{E}[X]+b,
$$

e, para quaisquer variáveis $$X$$ e $$Y$$ (independentes ou não),

$$
\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y].
$$

## Variância e desvio padrão

A **variância** mede a dispersão de $$X$$ em torno da sua média
$$\mu=\mathbb{E}[X]$$:

$$
\boxed{
\operatorname{Var}(X)=\mathbb{E}\big[(X-\mu)^2\big].
}
$$

Expandindo o quadrado e usando a linearidade, obtém-se a forma de cálculo mais
usada,

$$
\operatorname{Var}(X)=\mathbb{E}[X^2]-\big(\mathbb{E}[X]\big)^2.
$$

O **desvio padrão** é $$\sigma_X=\sqrt{\operatorname{Var}(X)}$$, na mesma
unidade de $$X$$. Para constantes $$a$$ e $$b$$,

$$
\operatorname{Var}(aX+b)=a^2\,\operatorname{Var}(X),
$$

ou seja, deslocar a variável não altera a dispersão, e reescalá-la multiplica a
variância pelo quadrado do fator. Quando $$X$$ e $$Y$$ são **independentes**,

$$
\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y).
$$

## Momentos

As esperanças de potências de $$X$$ são os **momentos** da distribuição. O
momento de ordem $$k$$ em torno da origem é $$\mathbb{E}[X^k]$$, e o momento
**central** de ordem $$k$$ é $$\mathbb{E}[(X-\mu)^k]$$. Os quatro primeiros
momentos centrais descrevem, respectivamente, localização (o primeiro é zero
por construção), dispersão (a variância), assimetria e curtose, conceitos
introduzidos na aula 1.1. Muitas distribuições ficam completamente
determinadas pela sequência dos seus momentos.
