---
title: "1.11 - Inferência: TLC e propriedades dos estimadores"
course: met-comp
---

## Inferência estatística

A aula 1.2 introduziu a ideia de inferência. Agora, com probabilidade,
variáveis aleatórias e distribuições já construídas, formalizamos o problema:
usar uma amostra para dizer algo sobre um parâmetro desconhecido, e avaliar o
quão bem cada método faz isso.

### Conteúdo

- População, amostra e parâmetro
- Estatística, estimador e estimativa
- Distribuição amostral
- Teorema central do limite
- Viés, variância e erro quadrático médio
- Consistência
- Eficiência e informação de Fisher

## População, amostra e parâmetro

A **população** é descrita por uma distribuição $$F_\theta$$ (ou densidade
$$f_\theta$$) que depende de um ou mais parâmetros $$\theta$$ desconhecidos.
Uma **amostra aleatória simples** de tamanho $$n$$ é um conjunto
$$X_1,\ldots,X_n$$ de variáveis independentes e identicamente distribuídas
segundo $$F_\theta$$. O objetivo da inferência é usar $$X_1,\ldots,X_n$$ para
aprender sobre $$\theta$$, seja por **estimação pontual**, por **estimação
intervalar** ou por **testes de hipóteses**.

## Estatística, estimador e estimativa

Uma **estatística** é qualquer função da amostra,
$$T=T(X_1,\ldots,X_n)$$, que não depende de $$\theta$$. Um **estimador** de
$$\theta$$ é uma estatística $$\hat\theta=\hat\theta(X_1,\ldots,X_n)$$ usada
para aproximar $$\theta$$; por ser função de variáveis aleatórias, é ele
próprio uma variável aleatória. A **estimativa** é o valor numérico que
$$\hat\theta$$ assume numa amostra concreta.

Os exemplos centrais:

$$
\bar X=\frac{1}{n}\sum_{i=1}^{n}X_i
\quad\text{para}\quad\mu,
\qquad
S^{2}=\frac{1}{n-1}\sum_{i=1}^{n}(X_i-\bar X)^{2}
\quad\text{para}\quad\sigma^{2}.
$$

## Distribuição amostral

Como $$\hat\theta$$ é uma variável aleatória, ela tem uma distribuição, chamada
**distribuição amostral**, que descreve como a estimativa varia de amostra para
amostra. Para a média amostral de uma amostra i.i.d.,

$$
\mathbb{E}[\bar X]=\mu,
\qquad
\operatorname{Var}(\bar X)=\frac{\sigma^{2}}{n},
$$

de modo que o **erro padrão** de $$\bar X$$ é $$\sigma/\sqrt{n}$$: a precisão
melhora, mas apenas com a raiz de $$n$$. Se a população é normal, os resultados
são exatos:

$$
\bar X\sim\mathcal{N}\!\left(\mu,\frac{\sigma^{2}}{n}\right),
\qquad
\frac{(n-1)S^{2}}{\sigma^{2}}\sim\chi^{2}_{n-1},
\qquad
\frac{\bar X-\mu}{S/\sqrt{n}}\sim t_{n-1}.
$$

## Teorema central do limite

Quando a população **não** é normal, a distribuição amostral de $$\bar X$$
ainda pode ser aproximada, e a razão é o teorema central do limite (TLC).

**Enunciado.** Se $$X_1,\ldots,X_n$$ são i.i.d. com média $$\mu$$ e variância
finita $$\sigma^{2}$$, então

$$
\boxed{
\frac{\bar X_n-\mu}{\sigma/\sqrt{n}}\ \xrightarrow{\ d\ }\ \mathcal{N}(0,1)
\qquad (n\to\infty),
}
$$

isto é, para $$n$$ grande, $$\bar X_n\approx\mathcal{N}(\mu,\sigma^{2}/n)$$,
**qualquer que seja** a forma da distribuição de origem. De forma equivalente,
a soma satisfaz $$\sum_i X_i\approx\mathcal{N}(n\mu,\,n\sigma^{2})$$.

A velocidade da aproximação depende de quão assimétrica é a distribuição de
origem: para distribuições já simétricas, $$n$$ pequeno basta; para muito
assimétricas, é preciso $$n$$ maior. A regra prática usual é $$n\gtrsim 30$$.

O TLC complementa a **lei dos grandes números**: a lei diz que $$\bar X_n$$
converge para $$\mu$$; o TLC diz a que taxa ($$1/\sqrt{n}$$) e com que forma
(normal) as flutuações em torno de $$\mu$$ se distribuem. É por isso que a
normal aparece na distribuição amostral de médias, proporções e da maioria dos
estimadores.

## Viés, variância e erro quadrático médio

O **viés** de um estimador é

$$
\operatorname{Vies}(\hat\theta)=\mathbb{E}[\hat\theta]-\theta.
$$

O estimador é **não viesado** se $$\mathbb{E}[\hat\theta]=\theta$$ para todo
$$\theta$$. A média amostral $$\bar X$$ é não viesada para $$\mu$$, e a
variância amostral $$S^{2}$$ com divisor $$n-1$$ é não viesada para
$$\sigma^{2}$$; usar o divisor $$n$$ produz um estimador viesado.

A qualidade global combina viés e dispersão no **erro quadrático médio**:

$$
\operatorname{EQM}(\hat\theta)
=
\mathbb{E}\big[(\hat\theta-\theta)^{2}\big]
=
\operatorname{Var}(\hat\theta)+\operatorname{Vies}(\hat\theta)^{2}.
$$

Essa é a decomposição viés-variância. Uma consequência prática: um estimador
**viesado** pode ter EQM **menor** que um não viesado, se a redução de
variância compensar o viés introduzido.

## Consistência

Um estimador é **consistente** se converge em probabilidade para o parâmetro à
medida que a amostra cresce,

$$
\hat\theta_n\ \xrightarrow{\ P\ }\ \theta
\qquad (n\to\infty).
$$

Uma condição suficiente é $$\operatorname{EQM}(\hat\theta_n)\to 0$$, ou seja,
viés e variância tendendo ambos a zero. A média amostral é consistente para
$$\mu$$ pela lei dos grandes números.

## Eficiência e informação de Fisher

Entre os estimadores não viesados, prefere-se o de **menor variância**. Existe
um limite inferior universal para essa variância. Sob condições de
regularidade, todo estimador não viesado satisfaz a **desigualdade de
Cramér-Rao**,

$$
\operatorname{Var}(\hat\theta)\ \ge\ \frac{1}{n\,I(\theta)},
$$

onde

$$
I(\theta)=\mathbb{E}\!\left[\left(\frac{\partial}{\partial\theta}\log f_\theta(X)\right)^{2}\right]
$$

é a **informação de Fisher** de uma observação. Um estimador não viesado que
atinge esse limite é dito **eficiente**, e a **eficiência relativa** entre dois
estimadores é a razão das suas variâncias.

O estimador de máxima verossimilhança tem, sob regularidade, um comportamento
assintótico ótimo: é consistente e

$$
\sqrt{n}\,(\hat\theta_{\mathrm{MV}}-\theta)\ \xrightarrow{\ d\ }\ \mathcal{N}\!\big(0,\ I(\theta)^{-1}\big),
$$

isto é, ele é assintoticamente normal e atinge a cota de Cramér-Rao no limite.
Isso justifica o uso da máxima verossimilhança e fornece erros padrão
aproximados a partir de $$I(\theta)$$.
