---
title: "4.2 - Amostragem de Gibbs"
course: met-comp
---

## Amostragem de Gibbs

O Metropolis-Hastings da aula anterior amostra todos os parâmetros de uma vez,
e a sua eficiência depende de uma proposta bem calibrada. A amostragem de Gibbs
é um caso particular que dispensa a proposta: ela atualiza **um parâmetro de
cada vez**, amostrando da sua distribuição condicional completa. Quando essas
condicionais são conhecidas, cada passo é aceito com probabilidade $$1$$.

### Conteúdo

- Distribuições condicionais completas
- O algoritmo
- Relação com Metropolis-Hastings
- Modelos hierárquicos e variáveis auxiliares
- Vantagens e limitações

## Distribuições condicionais completas

Seja $$\theta=(\theta_1,\ldots,\theta_p)$$. A **distribuição condicional
completa** de $$\theta_j$$ é o posterior de $$\theta_j$$ com todos os outros
parâmetros fixados nos seus valores atuais:

$$
p\big(\theta_j\ \big|\ \theta_{-j},\,D\big),
\qquad
\theta_{-j}=(\theta_1,\ldots,\theta_{j-1},\theta_{j+1},\ldots,\theta_p).
$$

Ela é proporcional ao posterior conjunto visto como função só de $$\theta_j$$,

$$
p(\theta_j\mid\theta_{-j},D)\ \propto\ p(D\mid\theta)\,p(\theta),
$$

e, para modelos construídos com priors conjugados por partes, tem forma
fechada (Beta, Gama, Normal), mesmo quando o posterior conjunto não tem.

## O algoritmo

Partindo de um valor inicial $$\theta^{(0)}$$, em cada iteração $$t$$
percorrem-se os parâmetros em ordem, cada um amostrado da sua condicional dada
a versão mais recente dos demais:

$$
\begin{aligned}
\theta_1^{(t)}&\sim p\big(\theta_1\mid\theta_2^{(t-1)},\ldots,\theta_p^{(t-1)},D\big),\\
\theta_2^{(t)}&\sim p\big(\theta_2\mid\theta_1^{(t)},\theta_3^{(t-1)},\ldots,\theta_p^{(t-1)},D\big),\\
&\ \vdots\\
\theta_p^{(t)}&\sim p\big(\theta_p\mid\theta_1^{(t)},\ldots,\theta_{p-1}^{(t)},D\big).
\end{aligned}
$$

A sequência $$\theta^{(0)},\theta^{(1)},\ldots$$ é uma cadeia de Markov cuja
distribuição estacionária é o posterior conjunto $$p(\theta\mid D)$$. Como no
Metropolis-Hastings, descartam-se as primeiras iterações (aquecimento) e usam-se
as demais para estimar esperanças e quantis a posteriori.

## Relação com Metropolis-Hastings

A amostragem de Gibbs é um Metropolis-Hastings em que a proposta para
$$\theta_j$$ é a **própria** condicional completa. Substituindo essa proposta
na razão de aceitação, todos os termos se cancelam e $$r=1$$: **nada é
rejeitado**. O preço é ter de derivar e amostrar de cada condicional completa.

## Modelos hierárquicos e variáveis auxiliares

Gibbs é a ferramenta natural para **modelos hierárquicos**, em que os
parâmetros são organizados em níveis (por exemplo, uma média por grupo, e
hiperparâmetros governando a distribuição dessas médias). Cada nível costuma
ser conjugado condicionado nos vizinhos, e o Gibbs alterna entre eles. A
técnica de **aumento de dados** introduz variáveis auxiliares (rótulos
latentes, dados censurados imaginários) que tornam as condicionais tratáveis,
e é o análogo estocástico do algoritmo EM.

## Vantagens e limitações

- **A favor**: sem parâmetros de ajuste, sem rejeição, cada passo usa toda a
  informação das condicionais.
- **Contra**: exige condicionais completas conhecidas; quando os parâmetros são
  fortemente correlacionados a posteriori, a cadeia se move devagar (os passos
  são sempre paralelos aos eixos), e a mistura fica ruim. Nesses casos,
  atualizam-se blocos de parâmetros juntos ou usa-se o Monte Carlo
  Hamiltoniano.
