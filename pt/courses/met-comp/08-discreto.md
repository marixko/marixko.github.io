---
title: 1.8 - Principais distribuições discretas
course: met-comp
---

## Principais distribuições discretas

Nas aulas anteriores montamos as ferramentas gerais: FDA, função de
probabilidade, esperança e variância. Agora catalogamos as famílias discretas
mais frequentes. Cada uma corresponde a um mecanismo de contagem específico, e
vale a pena reconhecer o mecanismo antes de aplicar a fórmula.

### Conteúdo

- Uniforme discreta
- Bernoulli
- Binomial
- Geométrica
- Binomial negativa
- Hipergeométrica
- Poisson

## Uniforme discreta

Todos os $$N$$ valores possíveis têm a mesma probabilidade. Se
$$X\in\{1,2,\ldots,N\}$$,

$$
p(k)=\frac{1}{N},\qquad k=1,\ldots,N,
$$

$$
\mathbb{E}[X]=\frac{N+1}{2},
\qquad
\operatorname{Var}(X)=\frac{N^{2}-1}{12}.
$$

É o modelo do dado honesto e do sorteio sem viés.

## Bernoulli

Um único ensaio com dois resultados: **sucesso**, com probabilidade $$p$$, e
**fracasso**, com probabilidade $$1-p$$. Codificando $$X=1$$ para sucesso e
$$X=0$$ para fracasso,

$$
p(x)=p^{x}(1-p)^{1-x},\qquad x\in\{0,1\},
$$

$$
\mathbb{E}[X]=p,
\qquad
\operatorname{Var}(X)=p(1-p).
$$

A variância é máxima em $$p=1/2$$ e nula em $$p\in\{0,1\}$$. A Bernoulli é o
bloco de construção das próximas distribuições.

## Binomial

Número de sucessos em $$n$$ ensaios de Bernoulli **independentes**, todos com a
mesma probabilidade $$p$$. Escrevemos $$X\sim\text{Binomial}(n,p)$$ e
$$X=\sum_{i=1}^{n}X_i$$ com $$X_i$$ Bernoulli$$(p)$$ independentes.

$$
\boxed{
p(k)=\binom{n}{k}p^{k}(1-p)^{\,n-k},\qquad k=0,1,\ldots,n.
}
$$

Pela linearidade da esperança e pela independência,

$$
\mathbb{E}[X]=np,
\qquad
\operatorname{Var}(X)=np(1-p).
$$

A soma de binomiais independentes com o mesmo $$p$$ é binomial. O caso
$$n=1$$ é a Bernoulli.

## Geométrica

Número de ensaios de Bernoulli até o **primeiro sucesso**, contando o próprio
sucesso. Assim $$X\in\{1,2,\ldots\}$$ e

$$
p(k)=(1-p)^{\,k-1}p,
$$

$$
\mathbb{E}[X]=\frac{1}{p},
\qquad
\operatorname{Var}(X)=\frac{1-p}{p^{2}},
\qquad
F_X(k)=1-(1-p)^{k}.
$$

A geométrica é a única distribuição discreta com a propriedade de **falta de
memória**,

$$
P(X>s+t\mid X>s)=P(X>t),
$$

ou seja, o número de ensaios já realizados sem sucesso não altera a
distribuição do que falta. Uma convenção alternativa conta os fracassos
**antes** do primeiro sucesso, dando suporte $$\{0,1,\ldots\}$$, $$p(k)=(1-p)^{k}p$$
e $$\mathbb{E}[X]=(1-p)/p$$.

## Binomial negativa

Número de ensaios até o $$r$$-ésimo sucesso. Com suporte
$$\{r,r+1,\ldots\}$$,

$$
p(k)=\binom{k-1}{r-1}(1-p)^{\,k-r}p^{r},
$$

$$
\mathbb{E}[X]=\frac{r}{p},
\qquad
\operatorname{Var}(X)=\frac{r(1-p)}{p^{2}}.
$$

É a soma de $$r$$ geométricas independentes, e o caso $$r=1$$ é a geométrica.
Fora do contexto de ensaios, ela também serve como modelo de contagem com
**superdispersão** (variância maior que a média), generalizando a Poisson.

## Hipergeométrica

Amostragem **sem reposição**. Numa população de $$N$$ objetos, $$K$$ são do
tipo "sucesso"; retiram-se $$n$$ objetos sem reposição e $$X$$ conta os
sucessos na amostra:

$$
p(k)=\frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}},
$$

$$
\mathbb{E}[X]=n\,\frac{K}{N},
\qquad
\operatorname{Var}(X)=n\,\frac{K}{N}\cdot\frac{N-K}{N}\cdot\frac{N-n}{N-1}.
$$

O fator $$\dfrac{N-n}{N-1}$$ é a **correção para população finita**: ele faz a
variância ser menor que a de uma binomial com $$p=K/N$$. Quando $$N\to\infty$$
com $$K/N\to p$$ fixo, a hipergeométrica converge para a Binomial$$(n,p)$$,
porque a reposição deixa de fazer diferença.

## Poisson

Número de eventos que ocorrem num intervalo fixo de tempo ou de espaço, quando
eles acontecem de forma independente e a uma taxa média $$\lambda$$. Com
suporte $$\{0,1,2,\ldots\}$$,

$$
\boxed{
p(k)=\frac{\lambda^{k}e^{-\lambda}}{k!}.
}
$$

A sua assinatura é a igualdade entre média e variância,

$$
\mathbb{E}[X]=\operatorname{Var}(X)=\lambda.
$$

A soma de Poisson independentes é Poisson, com parâmetro
$$\lambda_1+\lambda_2$$. A Poisson aparece como **limite da binomial**: se
$$n\to\infty$$ e $$p\to 0$$ de modo que $$np\to\lambda$$, então
$$\text{Binomial}(n,p)\to\text{Poisson}(\lambda)$$. Por isso ela modela
contagens com $$n$$ grande e $$p$$ pequeno, como decaimentos radioativos ou
contagens de fótons.

## Tabela-resumo

| Distribuição | Suporte | $$p(k)$$ | $$\mathbb{E}[X]$$ | $$\operatorname{Var}(X)$$ |
| --- | --- | --- | --- | --- |
| Uniforme$$(N)$$ | $$1,\ldots,N$$ | $$1/N$$ | $$\tfrac{N+1}{2}$$ | $$\tfrac{N^{2}-1}{12}$$ |
| Bernoulli$$(p)$$ | $$0,1$$ | $$p^{k}(1-p)^{1-k}$$ | $$p$$ | $$p(1-p)$$ |
| Binomial$$(n,p)$$ | $$0,\ldots,n$$ | $$\binom{n}{k}p^{k}(1-p)^{n-k}$$ | $$np$$ | $$np(1-p)$$ |
| Geométrica$$(p)$$ | $$1,2,\ldots$$ | $$(1-p)^{k-1}p$$ | $$1/p$$ | $$(1-p)/p^{2}$$ |
| Bin. negativa$$(r,p)$$ | $$r,r{+}1,\ldots$$ | $$\binom{k-1}{r-1}(1-p)^{k-r}p^{r}$$ | $$r/p$$ | $$r(1-p)/p^{2}$$ |
| Hipergeom.$$(N,K,n)$$ | $$0,\ldots,n$$ | $$\binom{K}{k}\binom{N-K}{n-k}/\binom{N}{n}$$ | $$n\tfrac{K}{N}$$ | $$n\tfrac{K}{N}\tfrac{N-K}{N}\tfrac{N-n}{N-1}$$ |
| Poisson$$(\lambda)$$ | $$0,1,2,\ldots$$ | $$\lambda^{k}e^{-\lambda}/k!$$ | $$\lambda$$ | $$\lambda$$ |

## Relações entre as distribuições

- A Bernoulli é a Binomial com $$n=1$$; a Binomial é a soma de $$n$$ Bernoulli
  independentes.
- A Geométrica é a Binomial negativa com $$r=1$$; a Binomial negativa é a soma
  de $$r$$ geométricas independentes.
- A Hipergeométrica tende à Binomial quando a população cresce
  ($$N\to\infty$$, $$K/N\to p$$).
- A Binomial tende à Poisson quando $$n\to\infty$$, $$p\to 0$$ e
  $$np\to\lambda$$.
