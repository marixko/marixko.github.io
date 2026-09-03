---
title: "2.6 — Modelos Lineares Generalizados"
course: ml
---

## Modelos lineares generalizados

A regressão linear e a logística parecem modelos distintos, mas são o mesmo
objeto visto de dois ângulos: um preditor linear $$x^{\top}\beta$$, uma
distribuição da **família exponencial** para $$Y\mid x$$, e uma função que
liga a média à parte linear. Os modelos lineares generalizados (GLMs) tornam
essa estrutura explícita e fornecem um algoritmo de ajuste único para toda a
classe.

### Conteúdo

- A família exponencial
- Estatística suficiente e parâmetro canônico
- Média, variância e a função de variância
- Função de ligação e o preditor linear
- A estrutura de um GLM
- Exemplos e ajuste por IRLS

### A família exponencial

Uma distribuição pertence à **família exponencial de dispersão** se a sua
densidade ou massa de probabilidade pode ser escrita como

$$
p(y\mid\theta,\phi)
=
\exp\!\left\{\frac{y\,\theta-b(\theta)}{a(\phi)}+c(y,\phi)\right\}.
$$

Aqui $$\theta$$ é o **parâmetro canônico** (ou natural), $$\phi$$ é o parâmetro
de **dispersão** (a escala do ruído, conhecida ou estimada), $$b(\theta)$$ é a
função geradora de cumulantes, e $$a(\phi)$$ e $$c(y,\phi)$$ são funções
conhecidas. A Gaussiana, a Bernoulli, a binomial, a Poisson, a gama e a
inversa-gaussiana, entre outras, estão todas nessa forma.

### Estatística suficiente e parâmetro canônico

Nessa parametrização, $$y$$ aparece apenas multiplicando $$\theta$$ de forma
linear. Pelo teorema da fatoração, $$y$$ (e, para uma amostra,
$$\sum_i y_i$$) é a **estatística suficiente** para $$\theta$$: resume toda a
informação amostral sobre o parâmetro. O $$\theta$$ que se emparelha
diretamente com $$y$$ é, por definição, o parâmetro canônico.

### Média, variância e a função de variância

Derivando a identidade $$\int p(y\mid\theta,\phi)\,dy=1$$ em relação a
$$\theta$$, os dois primeiros cumulantes saem de $$b$$:

$$
\mathbb{E}[Y]=b'(\theta)=:\mu,
\qquad
\operatorname{Var}(Y)=a(\phi)\,b''(\theta).
$$

Como $$\mu=b'(\theta)$$, a variância pode ser expressa como função da média,

$$
\operatorname{Var}(Y)=a(\phi)\,V(\mu),
\qquad
V(\mu)=b''\big((b')^{-1}(\mu)\big).
$$

$$V(\mu)$$ é a **função de variância** e caracteriza cada família: constante na
Gaussiana, $$\mu(1-\mu)$$ na Bernoulli, $$\mu$$ na Poisson, $$\mu^{2}$$ na gama.
É ela que codifica a relação média-variância que distingue os modelos.

### Função de ligação e o preditor linear

Um GLM tem três componentes:

1. **Componente aleatória**: $$Y_i\mid x_i$$ na família exponencial, com média
   $$\mu_i$$.
2. **Preditor linear**: $$\eta_i=x_i^{\top}\beta$$.
3. **Função de ligação** $$g$$, monótona e diferenciável, que conecta os dois:

$$
g(\mu_i)=\eta_i=x_i^{\top}\beta,
\qquad\text{ou seja}\qquad
g\big(\mathbb{E}[Y\mid X=x]\big)=x^{\top}\beta.
$$

A ligação é necessária porque $$\mu$$ costuma viver num intervalo restrito
($$(0,1)$$ para probabilidades, $$(0,\infty)$$ para contagens), enquanto
$$\eta=x^{\top}\beta$$ percorre toda a reta. A função $$g$$ é a bijeção que
reconcilia os dois domínios; a sua inversa $$g^{-1}$$ é a função de resposta
média.

A **ligação canônica** é a escolha de $$g$$ tal que $$\theta_i=\eta_i$$, isto
é, $$g=(b')^{-1}$$. Com ela o parâmetro canônico é diretamente linear em
$$\beta$$, $$\sum_i y_i x_i$$ é suficiente para $$\beta$$, e a Hessiana
observada da log-verossimilhança coincide com a esperada, o que simplifica o
ajuste. Não é obrigatória, mas é o padrão.

### A estrutura de um GLM

Com a ligação canônica e $$a(\phi)$$ constante, a log-verossimilhança é

$$
\ell(\beta)
=
\sum_{i}\frac{y_i\,(x_i^{\top}\beta)-b(x_i^{\top}\beta)}{a(\phi)}+c(y_i,\phi),
$$

e o gradiente (as equações de verossimilhança) tem sempre a mesma forma:

$$
\nabla\ell(\beta)
=
\frac{1}{a(\phi)}\sum_{i}(y_i-\mu_i)\,x_i
=
\frac{1}{a(\phi)}\,X^{\top}(y-\mu).
$$

É o mesmo padrão de OLS e da logística: $$X^{\top}(y-\mu)=0$$, com o resíduo
$$y-\mu$$ ortogonal aos preditores. Em geral não há solução fechada, e o ajuste
é feito por **IRLS** (mínimos quadrados iterativamente reponderados), que é o
método de Newton com a Hessiana esperada (*Fisher scoring*). Cada iteração é um
WLS,

$$
\beta^{(t+1)}=(X^{\top}W_tX)^{-1}X^{\top}W_t\,z_t,
$$

com pesos $$w_i=1/\big(V(\mu_i)\,g'(\mu_i)^{2}\big)$$ e resposta de trabalho
$$z_i=\eta_i+(y_i-\mu_i)\,g'(\mu_i)$$. A regressão linear (peso constante,
$$z=y$$) e a logística (peso $$p_i(1-p_i)$$) são casos particulares.

### Exemplos e ajuste por IRLS

| Família | Suporte de $$Y$$ | $$b(\theta)$$ | $$V(\mu)$$ | Ligação canônica $$g(\mu)$$ |
| --- | --- | --- | --- | --- |
| Gaussiana | $$\mathbb{R}$$ | $$\theta^{2}/2$$ | $$1$$ | $$\mu$$ (identidade) |
| Bernoulli | $$\{0,1\}$$ | $$\log(1+e^{\theta})$$ | $$\mu(1-\mu)$$ | $$\log\dfrac{\mu}{1-\mu}$$ (logito) |
| Poisson | $$\{0,1,2,\ldots\}$$ | $$e^{\theta}$$ | $$\mu$$ | $$\log\mu$$ (log) |
| Gama | $$(0,\infty)$$ | $$-\log(-\theta)$$ | $$\mu^{2}$$ | $$-1/\mu$$ |

**Gaussiana.** Com $$g(\mu)=\mu$$ recupera-se exatamente a regressão linear da
aula 2.2: ruído aditivo de variância constante.

**Bernoulli.** Com $$g(p)=\log\dfrac{p}{1-p}$$ recupera-se a regressão
logística da aula 2.5. Para dados binomiais (número de sucessos em $$m_i$$
tentativas) a mesma estrutura dá a regressão logística agrupada.

**Poisson.** Com $$g(\lambda)=\log\lambda$$ obtém-se a **regressão de Poisson**,
o modelo natural para dados de contagem:
$$\log\lambda_i=x_i^{\top}\beta$$, logo $$\lambda_i=e^{x_i^{\top}\beta}$$, com
efeitos multiplicativos sobre a taxa. Em Astronomia é o modelo padrão para
contagens de fótons, número de objetos por intervalo ou taxas de eventos.
Costuma-se incluir um termo de exposição fixo (*offset*),
$$\log\lambda_i=\log t_i+x_i^{\top}\beta$$, para modelar taxas por unidade de
tempo ou de área. Quando a variância excede a média (superdispersão),
usa-se a quase-Poisson ou a binomial negativa.

### Por que isso importa

Todos esses modelos compartilham um único framework, um único algoritmo de
ajuste (IRLS) e uma única teoria assintótica de máxima verossimilhança
(consistência, normalidade de $$\hat\beta$$, testes de Wald, da razão de
verossimilhanças e do escore). A **deviance** generaliza a soma de quadrados
residual e serve para comparar modelos e definir análogos do $$R^{2}$$. A
regularização $$L_2$$ e $$L_1$$ das aulas anteriores estende-se diretamente
aos GLMs.
