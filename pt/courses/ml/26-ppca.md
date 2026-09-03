---
title: "6.2 — PCA Probabilístico"
course: ml
---

## PCA probabilístico

A PCA da aula anterior é um procedimento algébrico, sem modelo de
probabilidade. O **PCA probabilístico** (PPCA) reescreve a mesma ideia como um
modelo generativo com uma variável latente gaussiana. Isso traz verossimilhança,
tratamento de dados faltantes, amostragem e uma ponte direta para o algoritmo
EM.

### Conteúdo

- Variáveis latentes
- Modelos gaussianos
- PCA probabilístico
- Máxima verossimilhança
- Relação PCA e modelos de variáveis latentes

### O modelo

Cada observação $$x\in\mathbb{R}^{p}$$ é gerada a partir de uma variável
**latente** $$z\in\mathbb{R}^{k}$$ de baixa dimensão:

$$
z\sim\mathcal{N}(0,I_k),
\qquad
x=Wz+\mu+\epsilon,
\qquad
\epsilon\sim\mathcal{N}(0,\sigma^{2}I_p).
$$

A matriz $$W\in\mathbb{R}^{p\times k}$$ mapeia o espaço latente no espaço dos
dados, $$\mu$$ é a média e $$\epsilon$$ é ruído isotrópico.

### A distribuição marginal

Como $$x$$ é uma combinação linear de gaussianas independentes, ele também é
gaussiano. Calculando média e covariância,

$$
x\sim\mathcal{N}\big(\mu,\ WW^{\top}+\sigma^{2}I\big).
$$

O modelo diz que a covariância dos dados tem estrutura de **posto baixo mais
ruído**: $$k$$ direções com variância extra (as colunas de $$W$$) sobre um piso
isotrópico $$\sigma^{2}$$.

### Máxima verossimilhança

Ajustando por máxima verossimilhança, $$\hat\mu$$ é a média amostral e a
solução para $$W$$ e $$\sigma^{2}$$ é explícita em termos da covariância
amostral $$S$$:

$$
\hat\sigma^{2}=\frac{1}{p-k}\sum_{j=k+1}^{p}\lambda_j,
\qquad
\hat W=U_k\big(\Lambda_k-\hat\sigma^{2}I\big)^{1/2}R,
$$

onde $$\lambda_1\ge\cdots\ge\lambda_p$$ são os autovalores de $$S$$, $$U_k$$ os
$$k$$ autovetores principais, $$\Lambda_k$$ a diagonal dos $$k$$ maiores
autovalores e $$R$$ uma rotação arbitrária. Ou seja: $$\hat\sigma^{2}$$ é a
variância média das direções **descartadas**, e $$\hat W$$ recupera as
componentes principais, corrigidas pelo ruído.

### Relação com a PCA clássica

Quando $$\sigma^{2}\to 0$$, o PPCA colapsa exatamente na PCA da aula 6.1: a
projeção no subespaço latente vira a projeção ortogonal nas componentes
principais. O PPCA é, portanto, "PCA mais um modelo de ruído".

O que se ganha com o modelo:

- **verossimilhança**, que permite comparar modelos e escolher $$k$$ por
  critérios como o BIC ou por validação cruzada;
- **dados faltantes** tratados de forma natural, marginalizando as coordenadas
  não observadas;
- um **posterior** $$p(z\mid x)$$, também gaussiano, que dá a projeção latente
  **com incerteza**;
- a capacidade de **amostrar** novos $$x$$ do modelo;
- ajuste por **EM** quando a solução fechada não é conveniente, o que conecta
  com a próxima aula.

A **análise fatorial** generaliza o PPCA trocando o ruído isotrópico
$$\sigma^{2}I$$ por uma matriz diagonal $$\Psi$$, permitindo que cada
*feature* tenha o seu próprio nível de ruído.
