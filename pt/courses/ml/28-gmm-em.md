---
title: "6.4 — Modelos de Mistura Gaussiana e EM"
course: ml
---

## Modelos de mistura gaussiana e EM

O modelo de mistura gaussiana (GMM) é a versão probabilística e de atribuição
**suave** do K-means: cada ponto pertence a todos os grupos, com probabilidades.
Ajustá-lo por máxima verossimilhança leva ao algoritmo **EM**, o método padrão
para modelos com variáveis latentes.

### Conteúdo

- Modelos de variáveis latentes
- Verossimilhança e verossimilhança completa
- Expectation-Maximization
- Máximos locais
- Modelos de mistura

### O modelo de mistura gaussiana

A densidade é uma soma ponderada de $$K$$ gaussianas:

$$
p(x)=\sum_{k=1}^{K}\pi_k\,\mathcal{N}(x\mid\mu_k,\Sigma_k),
\qquad
\pi_k\ge 0,\quad \sum_{k}\pi_k=1.
$$

Cada observação tem um rótulo **latente** $$z_i\in\{1,\ldots,K\}$$ com
$$P(z_i=k)=\pi_k$$ e $$x_i\mid z_i=k\sim\mathcal{N}(\mu_k,\Sigma_k)$$. Os
$$z_i$$ não são observados.

### Responsabilidades

A probabilidade *a posteriori* de o ponto $$i$$ pertencer ao grupo $$k$$ é a
**responsabilidade**

$$
\gamma_{ik}=P(z_i=k\mid x_i)
=
\frac{\pi_k\,\mathcal{N}(x_i\mid\mu_k,\Sigma_k)}{\sum_{l=1}^{K}\pi_l\,\mathcal{N}(x_i\mid\mu_l,\Sigma_l)}.
$$

É a atribuição suave: $$\gamma_{ik}\in[0,1]$$ e $$\sum_k\gamma_{ik}=1$$.

### Por que a verossimilhança é difícil

A log-verossimilhança dos dados é

$$
\ell(\theta)=\sum_{i=1}^{n}\log\sum_{k=1}^{K}\pi_k\,\mathcal{N}(x_i\mid\mu_k,\Sigma_k).
$$

O logaritmo de uma soma não se separa, e $$\ell$$ não é côncava. Se os rótulos
$$z_i$$ fossem conhecidos, a **verossimilhança completa**
$$\log p(X,Z\mid\theta)$$ se separaria em termos gaussianos simples, um por
grupo, com solução fechada. O EM explora exatamente isso.

### Expectation-Maximization

O EM maximiza um limite inferior de $$\ell(\theta)$$. Para qualquer distribuição
$$q(z)$$ sobre os rótulos,

$$
\ell(\theta)\ \ge\ \mathbb{E}_{q}\big[\log p(X,Z\mid\theta)\big]+H(q),
$$

e a igualdade vale quando $$q(z)=p(z\mid X,\theta)$$. O algoritmo alterna:

**Passo E** (fixando $$\theta^{\mathrm{antigo}}$$): calcular
$$q(z)=p(z\mid X,\theta^{\mathrm{antigo}})$$, isto é, as responsabilidades
$$\gamma_{ik}$$. Isso torna o limite justo.

**Passo M** (fixando $$q$$): maximizar o valor esperado da verossimilhança
completa,

$$
\theta^{\mathrm{novo}}=\arg\max_{\theta}\ \mathbb{E}_{q}\big[\log p(X,Z\mid\theta)\big],
$$

o que para o GMM tem forma fechada, uma MLE gaussiana ponderada pelas
responsabilidades:

$$
\pi_k=\frac{1}{n}\sum_{i}\gamma_{ik},
\qquad
\mu_k=\frac{\sum_i\gamma_{ik}\,x_i}{\sum_i\gamma_{ik}},
\qquad
\Sigma_k=\frac{\sum_i\gamma_{ik}\,(x_i-\mu_k)(x_i-\mu_k)^{\top}}{\sum_i\gamma_{ik}}.
$$

### Convergência e máximos locais

Cada iteração de EM **não diminui** $$\ell(\theta)$$, e o algoritmo converge
para um máximo local ou ponto de sela. Como no K-means, o resultado depende da
inicialização (é comum inicializar com o próprio K-means). O K-means é o limite
do EM para GMM com $$\Sigma_k=\varepsilon I$$, $$\varepsilon\to 0$$, e
responsabilidades que viram atribuições rígidas.

### Cuidados práticos

- **Singularidades**: uma componente pode colapsar sobre um único ponto,
  $$\Sigma_k\to 0$$ e $$\ell\to\infty$$. Regulariza-se adicionando um pequeno
  valor à diagonal de $$\Sigma_k$$.
- **Escolha de $$K$$** por BIC, AIC ou validação.
- **Troca de rótulos**: os grupos não têm identidade fixa entre execuções.

O EM é geral: o mesmo esquema E-M ajusta o PPCA, modelos de Markov ocultos e
qualquer modelo de variável latente com verossimilhança completa tratável.
