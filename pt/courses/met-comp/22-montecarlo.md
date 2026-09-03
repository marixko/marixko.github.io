---
title: "2.2 - Método de Monte Carlo"
course: met-comp
---

## Método de Monte Carlo

O método de Monte Carlo troca uma conta difícil (uma integral, uma esperança,
uma probabilidade) por uma **média sobre amostras aleatórias**. É a ideia
central da estatística computacional, e a lei dos grandes números garante que
funciona.

### Conteúdo

- Estimação de esperanças e integrais
- O erro de Monte Carlo
- Estimação de probabilidades
- Amostragem por importância
- Propagação de incerteza

## Estimação de esperanças e integrais

Queremos calcular

$$
\theta=\mathbb{E}_f[h(X)]=\int h(x)\,f(x)\,dx.
$$

Se sabemos amostrar de $$f$$, geramos $$X_1,\ldots,X_n$$ independentes e
usamos a média

$$
\hat\theta_n=\frac{1}{n}\sum_{i=1}^{n}h(X_i).
$$

Pela lei dos grandes números, $$\hat\theta_n\xrightarrow{P}\theta$$, e o
estimador é não viesado: $$\mathbb{E}[\hat\theta_n]=\theta$$.

Qualquer integral $$\int_a^b g(x)\,dx$$ vira uma esperança escolhendo $$f$$
conveniente. Por exemplo, com $$X\sim\text{Uniforme}(a,b)$$,

$$
\int_a^b g(x)\,dx=(b-a)\,\mathbb{E}[g(X)]\approx\frac{b-a}{n}\sum_{i=1}^{n}g(X_i).
$$

## O erro de Monte Carlo

Pelo teorema central do limite,

$$
\hat\theta_n\approx\mathcal{N}\!\left(\theta,\ \frac{\sigma_h^{2}}{n}\right),
\qquad
\sigma_h^{2}=\operatorname{Var}_f\big[h(X)\big],
$$

de modo que o **erro padrão de Monte Carlo** é

$$
\mathrm{ep}(\hat\theta_n)=\frac{\hat\sigma_h}{\sqrt{n}},
\qquad
\hat\sigma_h^{2}=\frac{1}{n-1}\sum_{i=1}^{n}\big(h(X_i)-\hat\theta_n\big)^{2}.
$$

Duas consequências importantes: o erro decresce como $$1/\sqrt{n}$$, então
reduzi-lo por um fator $$10$$ exige $$100$$ vezes mais amostras; e a taxa
$$1/\sqrt{n}$$ **não depende da dimensão** de $$x$$, o que torna Monte Carlo
imbatível para integrais em muitas dimensões, onde os métodos determinísticos
de quadratura falham.

## Estimação de probabilidades

Uma probabilidade é a esperança de um indicador:

$$
p=P(X\in A)=\mathbb{E}\big[\mathbf{1}(X\in A)\big]\approx\frac{1}{n}\sum_{i=1}^{n}\mathbf{1}(X_i\in A).
$$

Como $$n\hat p\sim\text{Binomial}(n,p)$$, o erro padrão é
$$\sqrt{\hat p(1-\hat p)/n}$$. Para eventos **raros** ($$p$$ minúsculo), a
estimativa é ruim (quase nenhuma amostra cai em $$A$$), e usa-se amostragem por
importância.

## Amostragem por importância

Em vez de amostrar de $$f$$, amostra-se de outra densidade $$g$$ e corrige-se
pelo peso $$w(x)=f(x)/g(x)$$:

$$
\theta=\mathbb{E}_f[h(X)]=\mathbb{E}_g\!\left[h(X)\,\frac{f(X)}{g(X)}\right]
\approx\frac{1}{n}\sum_{i=1}^{n}h(X_i)\,w(X_i),
\qquad X_i\sim g.
$$

Escolhendo $$g$$ concentrada onde $$h\,f$$ é grande (por exemplo, na região
$$A$$ de um evento raro), a variância do estimador cai muito. Uma escolha ruim
de $$g$$, ao contrário, pode dar variância infinita.

## Propagação de incerteza

Dado um modelo $$Y=h(X_1,\ldots,X_k)$$ e distribuições (ou incertezas) para as
entradas, Monte Carlo estima a distribuição de $$Y$$ diretamente: amostram-se as
entradas, calcula-se $$Y$$ para cada conjunto, e a amostra resultante de
$$Y$$ dá média, desvio padrão, quantis e a forma da distribuição. É mais geral
e mais confiável que a fórmula de propagação linear de erros, que só vale para
funções aproximadamente lineares e incertezas pequenas.
