---
title: "8.4 — Machine Learning Probabilístico"
course: ml
---

## Machine learning probabilístico

Até aqui os modelos devolveram um ponto: um $$\hat\beta$$, uma classe, uma
previsão. O aprendizado bayesiano devolve uma **distribuição**, que carrega a
incerteza sobre os parâmetros e a propaga para as previsões. Isso é
particularmente importante em ciência, onde as previsões alimentam inferências
posteriores.

### Conteúdo

- Inferência bayesiana
- Distribuição preditiva a posteriori
- Inferência aproximada
- Monte Carlo
- Inferência variacional
- Incerteza preditiva

### Inferência bayesiana

Com um *prior* $$p(\theta)$$ e a verossimilhança $$p(D\mid\theta)$$, o teorema
de Bayes dá o **posterior**

$$
p(\theta\mid D)=\frac{p(D\mid\theta)\,p(\theta)}{p(D)}\ \propto\ p(D\mid\theta)\,p(\theta).
$$

Em vez de escolher um único $$\theta$$ (como a MLE ou a MAP), mantemos toda a
distribuição.

### Distribuição preditiva a posteriori

A previsão para uma nova entrada $$x_*$$ integra sobre a incerteza dos
parâmetros:

$$
p(y_*\mid x_*,D)=\int p(y_*\mid x_*,\theta)\,p(\theta\mid D)\,d\theta.
$$

É uma **média de modelos** ponderada pelo posterior, e não a previsão de um
modelo só. Quando o posterior é largo (poucos dados), a preditiva também é
larga; quando é concentrado, a preditiva se aproxima da de um ponto.

### Inferência aproximada

A integral acima raramente tem forma fechada. As três famílias de aproximação:

**Monte Carlo.** Amostrar $$\theta^{(1)},\ldots,\theta^{(S)}$$ do posterior e
aproximar

$$
p(y_*\mid x_*,D)\approx\frac{1}{S}\sum_{s=1}^{S}p\big(y_*\mid x_*,\theta^{(s)}\big).
$$

As amostras vêm de MCMC (Metropolis-Hastings, Monte Carlo Hamiltoniano). É
assintoticamente exato, mas pode ser lento.

**Inferência variacional.** Escolher uma família tratável $$q_\phi(\theta)$$ e
ajustar $$\phi$$ para maximizar o **limite inferior da evidência** (ELBO),

$$
\mathrm{ELBO}(\phi)=\mathbb{E}_{q_\phi}\big[\log p(D,\theta)\big]+H(q_\phi),
$$

o que equivale a minimizar $$\mathrm{KL}\big(q_\phi\,\Vert\,p(\theta\mid D)\big)$$.
É rápido, mas devolve uma aproximação enviesada.

**Aproximação de Laplace.** Uma gaussiana centrada na MAP, com covariância
igual à inversa da Hessiana da log-verossimilhança negativa nesse ponto.

### Aprendizado bayesiano profundo na prática

Fazer inferência bayesiana completa numa rede grande é caro, então usam-se
aproximações baratas: *dropout* de Monte Carlo (manter o *dropout* ativo na
previsão e amostrar), **ensembles profundos** (treinar várias redes e agregar),
e versões bayesianas apenas da última camada.

### Por que isso importa

Além da incerteza calibrada, o framework bayesiano dá a **verossimilhança
marginal** $$p(D)$$ para comparar modelos (fatores de Bayes) e um modo natural
de incorporar conhecimento físico como *prior*. A quantificação de incerteza
que resulta disso é o tema da próxima aula.
