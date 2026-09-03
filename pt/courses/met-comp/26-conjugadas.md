---
title: "3.2 - Famílias conjugadas"
course: met-comp
---

## Famílias conjugadas

A dificuldade prática da inferência bayesiana é calcular o posterior
$$p(\theta\mid D)\propto p(D\mid\theta)\,p(\theta)$$, que em geral exige uma
integral intratável. Existe, porém, uma classe de combinações prior +
verossimilhança para as quais o posterior sai em **forma fechada**, na mesma
família do prior. São os priors **conjugados**.

### Conteúdo

- A ideia de conjugação
- Beta-Binomial
- Gama-Poisson
- Normal-Normal
- Interpretação e priors não informativos

## A ideia de conjugação

Um prior $$p(\theta)$$ é **conjugado** a uma verossimilhança
$$p(D\mid\theta)$$ se o posterior $$p(\theta\mid D)$$ pertence à mesma família
paramétrica do prior. Nesse caso, atualizar com os dados equivale a atualizar
os **hiperparâmetros** do prior por fórmulas simples, sem nenhuma integração.

## Beta-Binomial

Para $$X\mid\theta\sim\text{Binomial}(n,\theta)$$, o prior conjugado é a
$$\text{Beta}(\alpha,\beta)$$. Observando $$x$$ sucessos em $$n$$ tentativas,

$$
p(\theta\mid x)\ \propto\ \theta^{x}(1-\theta)^{n-x}\cdot\theta^{\alpha-1}(1-\theta)^{\beta-1}
=\theta^{\alpha+x-1}(1-\theta)^{\beta+n-x-1},
$$

ou seja,

$$
\boxed{
\theta\mid x\ \sim\ \text{Beta}(\alpha+x,\ \beta+n-x).
}
$$

Os hiperparâmetros $$\alpha$$ e $$\beta$$ funcionam como "sucessos e fracassos
imaginários" observados antes dos dados. A média a posteriori é

$$
\mathbb{E}[\theta\mid x]=\frac{\alpha+x}{\alpha+\beta+n},
$$

uma média ponderada entre a média do prior $$\alpha/(\alpha+\beta)$$ e a
proporção amostral $$x/n$$, com peso crescente para os dados conforme $$n$$
aumenta.

## Gama-Poisson

Para $$X_i\mid\lambda\sim\text{Poisson}(\lambda)$$ i.i.d., o prior conjugado é
a $$\text{Gama}(\alpha,\beta)$$ (com $$\beta$$ como taxa). Com
$$s=\sum_i x_i$$ e $$n$$ observações,

$$
\lambda\mid D\ \sim\ \text{Gama}(\alpha+s,\ \beta+n),
\qquad
\mathbb{E}[\lambda\mid D]=\frac{\alpha+s}{\beta+n}.
$$

## Normal-Normal

Para $$X_i\mid\mu\sim\mathcal{N}(\mu,\sigma^{2})$$ com $$\sigma^{2}$$
**conhecido**, o prior conjugado para $$\mu$$ é
$$\mathcal{N}(\mu_0,\tau_0^{2})$$. O posterior é normal, e é mais claro em
termos de **precisões** (o inverso da variância). Com precisão do prior
$$\tau_0^{-2}$$ e precisão dos dados $$n/\sigma^{2}$$,

$$
\mu\mid D\ \sim\ \mathcal{N}\!\left(\mu_n,\ \tau_n^{2}\right),
\qquad
\frac{1}{\tau_n^{2}}=\frac{1}{\tau_0^{2}}+\frac{n}{\sigma^{2}},
$$

$$
\mu_n=\tau_n^{2}\left(\frac{\mu_0}{\tau_0^{2}}+\frac{n\,\bar x}{\sigma^{2}}\right).
$$

As precisões **se somam**, e a média a posteriori é a média das médias
(do prior e dos dados) ponderada pelas precisões. Quando $$\sigma^{2}$$ também é
desconhecido, o prior conjugado conjunto para $$(\mu,\sigma^{2})$$ é a
Normal-Gama-Inversa.

## Interpretação e priors não informativos

Em todos os casos, o posterior é o prior "atualizado" com contagens ou somas
dos dados, e os hiperparâmetros têm leitura de **dados imaginários**. Fazendo
esses hiperparâmetros tenderem a zero (por exemplo $$\alpha,\beta\to 0$$ na
Beta), obtêm-se priors **não informativos**, que deixam os dados dominarem;
nesses limites, a média a posteriori em geral coincide com o estimador de
máxima verossimilhança.

A conjugação é elegante e barata, mas limitada: para modelos realistas, o prior
que se quer usar raramente é conjugado, e recorre-se aos métodos
computacionais do Módulo 4.
