---
title: "1.17 - Correlação e regressão linear simples"
course: met-comp
---

## Correlação e regressão linear simples

Até aqui analisamos uma variável de cada vez. Esta aula trata da **relação
entre duas variáveis quantitativas**: como quantificá-la, com a correlação, e
como modelá-la, com a regressão linear.

### Conteúdo

- Covariância e correlação
- O coeficiente de Pearson
- O modelo de regressão linear simples
- Estimação por mínimos quadrados
- Decomposição da variância e $$R^{2}$$
- Inferência sobre os coeficientes
- Diagnóstico e cuidados

## Covariância e correlação

Para uma amostra de pares $$(x_i,y_i)$$, $$i=1,\ldots,n$$, a **covariância
amostral** é

$$
s_{xy}=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar x)(y_i-\bar y).
$$

Ela mede a tendência de $$x$$ e $$y$$ variarem juntos, mas depende das
unidades. Normalizando pelos desvios padrão, obtém-se o **coeficiente de
correlação de Pearson**:

$$
r=\frac{s_{xy}}{s_x\,s_y}
=
\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sqrt{\sum_i(x_i-\bar x)^{2}}\ \sqrt{\sum_i(y_i-\bar y)^{2}}}.
$$

Propriedades: $$r\in[-1,1]$$; $$\lvert r\rvert=1$$ se e somente se os pontos
estão exatamente sobre uma reta; $$r=0$$ indica ausência de relação **linear**,
mas pode haver relação não linear. O valor de $$r$$ é invariante a mudanças de
escala e de origem.

Duas ressalvas essenciais: **correlação não é causalidade** (pode haver um
fator comum, ou a causa pode estar invertida), e $$r$$ só enxerga o padrão
linear, então o gráfico de dispersão deve sempre ser olhado. Para testar
$$H_0:\rho=0$$,

$$
T=\frac{r\sqrt{n-2}}{\sqrt{1-r^{2}}}\sim t_{n-2}\quad\text{sob }H_0.
$$

Quando há *outliers* ou a relação é monótona mas não linear, usa-se a
correlação de **Spearman**, calculada sobre os postos.

## O modelo de regressão linear simples

A regressão vai além de medir a associação: modela como a média de $$Y$$ muda
com $$x$$. O modelo é

$$
Y_i=\beta_0+\beta_1 x_i+\varepsilon_i,
\qquad
\varepsilon_i\overset{\text{i.i.d.}}{\sim}\mathcal{N}(0,\sigma^{2}),
$$

com $$x$$ tratado como fixo. A parte determinística é a **reta de regressão**
$$\mathbb{E}[Y\mid x]=\beta_0+\beta_1 x$$: $$\beta_1$$ é a variação esperada em
$$Y$$ para cada unidade a mais de $$x$$, e $$\beta_0$$ é o valor esperado de
$$Y$$ quando $$x=0$$.

## Estimação por mínimos quadrados

Os coeficientes são estimados minimizando a soma dos quadrados dos resíduos,
$$S(\beta_0,\beta_1)=\sum_i(y_i-\beta_0-\beta_1 x_i)^{2}$$. Zerando as
derivadas parciais, chega-se a

$$
\boxed{
\hat\beta_1=\frac{\sum_i(x_i-\bar x)(y_i-\bar y)}{\sum_i(x_i-\bar x)^{2}}=r\,\frac{s_y}{s_x},
}
$$

$$
\boxed{
\hat\beta_0=\bar y-\hat\beta_1\,\bar x.
}
$$

A reta ajustada passa pelo ponto médio $$(\bar x,\bar y)$$. Os resíduos
$$\hat\varepsilon_i=y_i-\hat y_i$$ somam zero e são ortogonais a $$x$$
($$\sum_i x_i\hat\varepsilon_i=0$$). A variância do erro é estimada por

$$
\hat\sigma^{2}=\frac{1}{n-2}\sum_{i=1}^{n}\hat\varepsilon_i^{2}.
$$

## Decomposição da variância e $$R^{2}$$

Como na ANOVA, a variabilidade total de $$Y$$ se separa em uma parte explicada
pela regressão e uma parte residual:

$$
\underbrace{\sum_i(y_i-\bar y)^{2}}_{\mathrm{SQT}}
=
\underbrace{\sum_i(\hat y_i-\bar y)^{2}}_{\mathrm{SQReg}}
+
\underbrace{\sum_i(y_i-\hat y_i)^{2}}_{\mathrm{SQR}}.
$$

O **coeficiente de determinação** é a fração explicada,

$$
R^{2}=\frac{\mathrm{SQReg}}{\mathrm{SQT}}=1-\frac{\mathrm{SQR}}{\mathrm{SQT}},
$$

e, na regressão linear simples, $$R^{2}=r^{2}$$.

## Inferência sobre os coeficientes

Sob o modelo gaussiano,

$$
\hat\beta_1\sim\mathcal{N}\!\left(\beta_1,\ \frac{\sigma^{2}}{\sum_i(x_i-\bar x)^{2}}\right),
$$

com erro padrão
$$\mathrm{ep}(\hat\beta_1)=\hat\sigma\big/\sqrt{\sum_i(x_i-\bar x)^{2}}$$.
O teste de $$H_0:\beta_1=0$$ (não há relação linear) usa

$$
T=\frac{\hat\beta_1}{\mathrm{ep}(\hat\beta_1)}\sim t_{n-2},
$$

e o intervalo de confiança é
$$\hat\beta_1\pm t_{n-2;\,\alpha/2}\,\mathrm{ep}(\hat\beta_1)$$. O teste $$F$$
global da regressão, $$F=\mathrm{QMReg}/\mathrm{QMR}\sim F_{1,\,n-2}$$, é
equivalente, e vale $$F=T^{2}$$.

Para prever $$Y$$ em um novo valor $$x_0$$, o **intervalo de previsão** para uma
observação individual é mais largo que o **intervalo de confiança** para a
média $$\mathbb{E}[Y\mid x_0]$$, porque incorpora também a variância
$$\hat\sigma^{2}$$ do erro.

## Diagnóstico e cuidados

- **Gráfico de resíduos contra valores ajustados**: deve parecer uma nuvem sem
  padrão. Curvatura indica não linearidade; um "funil" indica
  heteroscedasticidade.
- **Normalidade dos resíduos**: verificada por um gráfico quantil-quantil.
- **Pontos influentes**: observações com $$x$$ extremo têm alta alavancagem e
  podem determinar sozinhas a inclinação da reta.
- **Extrapolação**: a reta só é confiável dentro do intervalo de $$x$$
  observado.
- O quarteto de Anscombe mostra quatro conjuntos com o mesmo $$r$$,
  $$\hat\beta_0$$, $$\hat\beta_1$$ e $$R^{2}$$, mas comportamentos totalmente
  diferentes: nunca dispensar o gráfico de dispersão.

Com vários preditores, o modelo se generaliza para a **regressão múltipla**,
tratada em detalhe na segunda parte do curso e no módulo de aprendizado de
máquina.
