---
title: 2.2 — Regressão Linear como Modelo Probabilístico
course: ml
---

## Regressão linear como modelo probabilístico

A aula anterior tratou os mínimos quadrados como um problema puramente
geométrico: projetar $$y$$ no espaço coluna de $$X$$, sem nenhuma hipótese
sobre a distribuição do ruído. Agora acrescentamos um **modelo de
probabilidade**. Isso não muda o estimador, mas dá acesso à verossimilhança, à
distribuição exata de $$\hat\beta$$, a testes e intervalos, e deixa claro
exatamente quando os mínimos quadrados são a escolha certa.

### Conteúdo

- O modelo gaussiano
- Verossimilhança e log-verossimilhança
- Máxima verossimilhança coincide com mínimos quadrados
- Distribuição do estimador
- Não-viés e variância
- Gauss-Markov
- Homoscedasticidade e heteroscedasticidade

### O modelo gaussiano

Supomos que a resposta, dado o preditor, seja normal em torno da média linear:

$$
Y\mid X=x\;\sim\;\mathcal{N}\big(x^{\top}\beta,\;\sigma^{2}\big).
$$

De forma equivalente, os erros $$\epsilon_i=y_i-x_i^{\top}\beta$$ são
independentes e $$\epsilon_i\sim\mathcal{N}(0,\sigma^{2})$$. Quatro hipóteses
estão embutidas nessa linha: a média condicional é **linear**, o ruído é
**gaussiano**, tem variância **constante** (homoscedástico) e é
**independente** entre observações. Em forma matricial,

$$
y\mid X\;\sim\;\mathcal{N}\big(X\beta,\;\sigma^{2}I_n\big).
$$

### Verossimilhança e log-verossimilhança

A densidade de uma observação é

$$
p(y_i\mid x_i,\beta,\sigma^{2})
=
\frac{1}{\sqrt{2\pi\sigma^{2}}}
\exp\!\left(-\frac{(y_i-x_i^{\top}\beta)^{2}}{2\sigma^{2}}\right).
$$

Pela independência, a verossimilhança conjunta é o produto,

$$
p(y\mid X,\beta,\sigma^{2})
=
\prod_{i=1}^{n}p(y_i\mid x_i,\beta,\sigma^{2})
=
(2\pi\sigma^{2})^{-n/2}
\exp\!\left(-\frac{1}{2\sigma^{2}}\lVert y-X\beta\rVert^{2}\right),
$$

e a log-verossimilhança é

$$
\ell(\beta,\sigma^{2})
=
-\frac{n}{2}\log(2\pi)
-\frac{n}{2}\log\sigma^{2}
-\frac{1}{2\sigma^{2}}\lVert y-X\beta\rVert^{2}.
$$

### Máxima verossimilhança coincide com mínimos quadrados

Para $$\sigma^{2}$$ fixo, $$\ell$$ depende de $$\beta$$ apenas pelo termo
$$-\frac{1}{2\sigma^{2}}\lVert y-X\beta\rVert^{2}$$, que é máximo exatamente
quando $$\lVert y-X\beta\rVert^{2}$$ é mínimo. Logo,

$$
\hat\beta_{\mathrm{MV}}
=
\arg\min_{\beta}\lVert y-X\beta\rVert^{2}
=
(X^{\top}X)^{-1}X^{\top}y
=
\hat\beta_{\mathrm{OLS}}.
$$

É a hipótese gaussiana que promove os mínimos quadrados de "escolha geométrica
razoável" a **estimador de máxima verossimilhança**. Para a variância,
resolvendo $$\partial\ell/\partial\sigma^{2}=0$$,

$$
\hat\sigma^{2}_{\mathrm{MV}}
=
\frac{1}{n}\lVert y-X\hat\beta\rVert^{2}
=
\frac{1}{n}\lVert\hat\epsilon\rVert^{2}.
$$

Esse estimador é **viesado** (divide por $$n$$, não por $$n-p$$). A versão não
viesada, usada na prática, é

$$
s^{2}=\frac{\lVert\hat\epsilon\rVert^{2}}{\,n-p\,},
$$

às vezes escrita como $$\mathrm{RSS}/(n-p)$$.

### Distribuição do estimador

Como $$\hat\beta=(X^{\top}X)^{-1}X^{\top}y$$ é uma função **linear** de $$y$$, e
$$y\mid X$$ é gaussiano, $$\hat\beta$$ também é:

$$
\hat\beta\mid X\;\sim\;\mathcal{N}\big(\beta,\;\sigma^{2}(X^{\top}X)^{-1}\big).
$$

Essa é a distribuição **exata**, válida para qualquer $$n$$ finito sob o modelo
gaussiano, e não apenas assintótica. Dela seguem as ferramentas de inferência:

- para cada coeficiente,
  $$\hat\beta_j\mid X\sim\mathcal{N}\big(\beta_j,\;\sigma^{2}[(X^{\top}X)^{-1}]_{jj}\big)$$;
- trocando $$\sigma^{2}$$ por $$s^{2}$$,
  $$\dfrac{\hat\beta_j-\beta_j}{s\,\sqrt{[(X^{\top}X)^{-1}]_{jj}}}\sim t_{\,n-p}$$,
  o que dá testes $$t$$ e intervalos de confiança para os coeficientes;
- $$\lVert\hat\epsilon\rVert^{2}/\sigma^{2}\sim\chi^{2}_{\,n-p}$$, e essa
  quantidade é independente de $$\hat\beta$$.

### Não-viés e variância

Retomando o que vimos na aula 2.1, sob $$\mathbb{E}[\epsilon\mid X]=0$$ o
estimador é não viesado,

$$
\mathbb{E}[\hat\beta\mid X]
=
(X^{\top}X)^{-1}X^{\top}X\beta
=
\beta,
$$

e sob $$\operatorname{Var}(\epsilon\mid X)=\sigma^{2}I$$ a covariância é

$$
\operatorname{Var}(\hat\beta\mid X)=\sigma^{2}(X^{\top}X)^{-1}.
$$

A raiz quadrada dos elementos diagonais dessa matriz (com $$\sigma^{2}$$
estimado por $$s^{2}$$) são os **erros-padrão** dos coeficientes. A variância
cresce quando $$\sigma^{2}$$ é grande, quando $$n$$ é pequeno e quando as
colunas de $$X$$ são quase colineares.

### Gauss-Markov

O **teorema de Gauss-Markov** afirma que, sob média zero e variância
$$\sigma^{2}I$$, o estimador de OLS tem a menor variância entre todos os
estimadores lineares em $$y$$ e não viesados (é BLUE). Ele **não exige
normalidade**. O que a hipótese gaussiana acrescenta é mais forte:

- OLS passa a ser de mínima variância entre **todos** os estimadores não
  viesados, não só os lineares (atinge a cota de Cramér-Rao);
- as distribuições exatas de $$\hat\beta$$, $$s^{2}$$ e das estatísticas $$t$$
  e $$F$$ ficam disponíveis para inferência com $$n$$ finito.

### Homoscedasticidade e heteroscedasticidade

**Homoscedasticidade** é a hipótese de variância constante,
$$\operatorname{Var}(\epsilon_i\mid x_i)=\sigma^{2}$$ para todo $$i$$. É ela
que garante $$\operatorname{Var}(\hat\beta)=\sigma^{2}(X^{\top}X)^{-1}$$ e o
teorema de Gauss-Markov.

Há **heteroscedasticidade** quando a variância do erro varia com a observação,
$$\operatorname{Var}(\epsilon_i\mid x_i)=\sigma_i^{2}$$. É a situação típica em
Astronomia: os erros fotométricos são maiores para fontes mais fracas, e as
incertezas mudam com magnitude, cor ou *redshift*. As consequências:

- $$\hat\beta_{\mathrm{OLS}}$$ continua **não viesado**, pois isso só depende de
  $$\mathbb{E}[\epsilon\mid X]=0$$;
- mas deixa de ser eficiente (não é mais BLUE), e a fórmula
  $$\sigma^{2}(X^{\top}X)^{-1}$$ passa a estar **errada**, o que invalida
  erros-padrão, testes e intervalos.

Três respostas usuais:

1. **Erros-padrão robustos** (sanduíche, ou de Huber-White): mantêm OLS e
   corrigem apenas a inferência,
   $$
   \widehat{\operatorname{Var}}(\hat\beta)
   =
   (X^{\top}X)^{-1}
   \Big(\textstyle\sum_{i}\hat\epsilon_i^{2}\,x_i x_i^{\top}\Big)
   (X^{\top}X)^{-1}.
   $$
2. **Mínimos quadrados ponderados** (WLS): se
   $$\operatorname{Var}(\epsilon_i)=\sigma^{2}/w_i$$ com pesos conhecidos,
   minimiza-se $$\sum_i w_i\,(y_i-x_i^{\top}\beta)^{2}$$. Isso é a máxima
   verossimilhança sob ruído gaussiano com pesos $$w_i=1/\sigma_i^{2}$$ e
   recupera o estimador BLUE. Em Astronomia, usa-se $$w_i=1/\sigma_i^{2}$$ com
   $$\sigma_i$$ igual à incerteza medida de cada ponto.
3. **Mínimos quadrados generalizados** (GLS): para uma covariância geral
   $$\operatorname{Var}(\epsilon\mid X)=\Omega$$,
   $$
   \hat\beta_{\mathrm{GLS}}
   =
   (X^{\top}\Omega^{-1}X)^{-1}X^{\top}\Omega^{-1}y.
   $$
