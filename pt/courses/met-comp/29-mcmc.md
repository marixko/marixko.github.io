---
title: "4.1 - MCMC: Metropolis-Hastings"
course: met-comp
---

## MCMC: Metropolis-Hastings

Fora das famílias conjugadas, o posterior
$$p(\theta\mid D)\propto p(D\mid\theta)\,p(\theta)$$ é conhecido apenas **a
menos da constante de normalização** $$p(D)$$, que é uma integral intratável.
O MCMC contorna isso: constrói uma cadeia de Markov cuja distribuição de
equilíbrio é exatamente o posterior, e usa as amostras dessa cadeia como se
fossem amostras do posterior.

### Conteúdo

- Por que amostrar em vez de integrar
- Cadeias de Markov e distribuição estacionária
- O algoritmo de Metropolis-Hastings
- Escolha da proposta e taxa de aceitação
- Aquecimento e uso das amostras

## Por que amostrar em vez de integrar

Toda quantidade bayesiana de interesse é uma esperança a posteriori,

$$
\mathbb{E}[h(\theta)\mid D]=\int h(\theta)\,p(\theta\mid D)\,d\theta,
$$

e, pela lógica de Monte Carlo (aula 2.2), basta ter amostras
$$\theta^{(1)},\ldots,\theta^{(T)}$$ do posterior para aproximá-la pela média
$$\frac{1}{T}\sum_t h(\theta^{(t)})$$. O problema é gerar essas amostras quando
só sabemos avaliar $$p(D\mid\theta)\,p(\theta)$$, sem a constante.

## Cadeias de Markov e distribuição estacionária

Uma **cadeia de Markov** é uma sequência $$\theta^{(0)},\theta^{(1)},\ldots$$
em que $$\theta^{(t+1)}$$ depende apenas de $$\theta^{(t)}$$, através de um
núcleo de transição. Sob condições brandas (irredutibilidade, aperiodicidade),
a cadeia tem uma única **distribuição estacionária** $$\pi$$, e
$$\theta^{(t)}$$ converge em distribuição para $$\pi$$ qualquer que seja o
ponto inicial. A ideia do MCMC é **desenhar** o núcleo de transição de modo que
$$\pi$$ seja o posterior.

Uma condição suficiente é o **balanço detalhado**: se, para o núcleo
$$q$$ de aceitação total,

$$
\pi(\theta)\,q(\theta\to\theta')=\pi(\theta')\,q(\theta'\to\theta)
\quad\text{para todos }\theta,\theta',
$$

então $$\pi$$ é estacionária.

## O algoritmo de Metropolis-Hastings

Dada uma **distribuição proposta** $$g(\theta'\mid\theta)$$ (fácil de amostrar)
e o alvo $$\pi(\theta)\propto p(D\mid\theta)\,p(\theta)$$, a iteração é:

1. a partir do estado atual $$\theta^{(t)}$$, propor
   $$\theta'\sim g(\cdot\mid\theta^{(t)})$$;
2. calcular a razão de aceitação

$$
r=\min\!\left(1,\ \frac{\pi(\theta')\,g(\theta^{(t)}\mid\theta')}{\pi(\theta^{(t)})\,g(\theta'\mid\theta^{(t)})}\right);
$$

3. com probabilidade $$r$$, aceitar: $$\theta^{(t+1)}=\theta'$$; caso
   contrário, repetir o estado: $$\theta^{(t+1)}=\theta^{(t)}$$.

A **constante de normalização se cancela** na razão, porque aparece no
numerador e no denominador: só é preciso avaliar
$$p(D\mid\theta)\,p(\theta)$$. Quando a proposta é simétrica,
$$g(\theta'\mid\theta)=g(\theta\mid\theta')$$ (por exemplo, um passo gaussiano
$$\theta'=\theta^{(t)}+\mathcal{N}(0,s^{2})$$), os termos $$g$$ somem e resta o
**algoritmo de Metropolis**: $$r=\min\big(1,\ \pi(\theta')/\pi(\theta^{(t)})\big)$$.

## Escolha da proposta e taxa de aceitação

O desempenho depende inteiramente da proposta:

- passo **pequeno demais**: quase tudo é aceito, mas a cadeia se move devagar e
  as amostras ficam muito correlacionadas;
- passo **grande demais**: quase tudo é rejeitado, e a cadeia trava.

Para um passo gaussiano, uma taxa de aceitação em torno de $$20\%$$ a $$50\%$$
costuma ser um bom alvo (perto de $$25\%$$ em dimensão alta). Métodos mais
sofisticados, como o Monte Carlo Hamiltoniano, usam o gradiente de
$$\log\pi$$ para propor passos longos e informados, com aceitação alta.

## Aquecimento e uso das amostras

- As primeiras iterações dependem do ponto inicial e são descartadas: é o
  **aquecimento** (*burn-in*).
- As amostras restantes **são correlacionadas** entre si, então elas contam
  como menos que $$T$$ amostras independentes; mede-se isso pelo **tamanho
  efetivo de amostra**.
- As esperanças a posteriori são estimadas pela média sobre as amostras
  pós-aquecimento, e os quantis dessas amostras dão os intervalos de
  credibilidade.

O diagnóstico de que a cadeia realmente convergiu ao posterior é o tema da
aula 4.3.
