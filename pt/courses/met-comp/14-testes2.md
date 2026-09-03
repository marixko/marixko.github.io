---
title: "1.14 - Testes para duas populações"
course: met-comp
---

## Testes para duas populações

A aula anterior comparou um parâmetro a um valor fixo. Na prática, a pergunta
mais comum é comparar **o mesmo parâmetro em duas populações**: dois
tratamentos, dois grupos, antes e depois. A estrutura do teste é a mesma; muda
a estatística e a sua distribuição.

### Conteúdo

- Amostras independentes e pareadas
- Comparação de duas médias
- Amostras pareadas
- Comparação de duas variâncias
- Comparação de duas proporções

## Amostras independentes e pareadas

Duas situações distintas:

- **Amostras independentes**: dois grupos separados,
  $$X_1,\ldots,X_{n_1}$$ da população 1 e $$Y_1,\ldots,Y_{n_2}$$ da população 2,
  sem relação entre as observações dos dois grupos.
- **Amostras pareadas**: cada unidade fornece **duas** medidas (antes e depois,
  dois métodos no mesmo objeto, dois olhos do mesmo paciente). Analisa-se a
  diferença $$D_i=X_i-Y_i$$.

O pareamento, quando possível, é preferível: ele elimina a variabilidade
**entre** unidades e concentra a análise na variabilidade **dentro** de cada
par.

## Comparação de duas médias

Em todos os casos abaixo, $$H_0:\mu_1=\mu_2$$, ou seja,
$$\mu_1-\mu_2=0$$, com amostras independentes. A base é que

$$
\mathbb{E}[\bar X-\bar Y]=\mu_1-\mu_2,
\qquad
\operatorname{Var}(\bar X-\bar Y)=\frac{\sigma_1^{2}}{n_1}+\frac{\sigma_2^{2}}{n_2}.
$$

### Variâncias conhecidas

$$
Z=\frac{(\bar X-\bar Y)-(\mu_1-\mu_2)}{\sqrt{\dfrac{\sigma_1^{2}}{n_1}+\dfrac{\sigma_2^{2}}{n_2}}}\sim\mathcal{N}(0,1),
$$

e rejeita-se $$H_0$$ (bilateral) se $$\lvert Z\rvert>z_{\alpha/2}$$.

### Variâncias iguais e desconhecidas

Supondo $$\sigma_1^{2}=\sigma_2^{2}$$, combina-se a informação das duas amostras
no **estimador agrupado**

$$
S_p^{2}=\frac{(n_1-1)S_1^{2}+(n_2-1)S_2^{2}}{n_1+n_2-2},
$$

e então

$$
T=\frac{(\bar X-\bar Y)-(\mu_1-\mu_2)}{S_p\sqrt{\dfrac{1}{n_1}+\dfrac{1}{n_2}}}\sim t_{\,n_1+n_2-2}.
$$

### Variâncias diferentes (Welch)

Sem supor variâncias iguais, usa-se

$$
T'=\frac{(\bar X-\bar Y)-(\mu_1-\mu_2)}{\sqrt{\dfrac{S_1^{2}}{n_1}+\dfrac{S_2^{2}}{n_2}}},
$$

que tem distribuição aproximadamente $$t_\nu$$, com graus de liberdade dados
pela fórmula de Welch-Satterthwaite,

$$
\nu\approx\frac{\left(\dfrac{S_1^{2}}{n_1}+\dfrac{S_2^{2}}{n_2}\right)^{2}}{\dfrac{(S_1^{2}/n_1)^{2}}{n_1-1}+\dfrac{(S_2^{2}/n_2)^{2}}{n_2-1}}.
$$

Este é o teste recomendado quando não há razão forte para acreditar que as
variâncias são iguais.

## Amostras pareadas

Com dados pareados, o problema se reduz a um teste de **uma** amostra sobre as
diferenças $$D_i=X_i-Y_i$$. Para $$H_0:\mu_D=0$$,

$$
T=\frac{\bar D}{S_D/\sqrt{n}}\sim t_{n-1},
$$

onde $$\bar D$$ e $$S_D$$ são a média e o desvio padrão das $$n$$ diferenças.
Quando as duas medidas são positivamente correlacionadas, esse teste tem poder
bem maior que o de duas amostras independentes com os mesmos dados.

## Comparação de duas variâncias

Para $$H_0:\sigma_1^{2}=\sigma_2^{2}$$, com populações normais independentes,

$$
F=\frac{S_1^{2}}{S_2^{2}}\sim F_{\,n_1-1,\,n_2-1}\quad\text{sob }H_0.
$$

Rejeita-se (bilateral) se $$F$$ cai fora do intervalo
$$\big[F_{n_1-1,n_2-1;\,1-\alpha/2},\ F_{n_1-1,n_2-1;\,\alpha/2}\big]$$. Este teste
é sensível a desvios da normalidade.

## Comparação de duas proporções

Para $$H_0:p_1=p_2$$, com $$\hat p_1=X_1/n_1$$ e $$\hat p_2=X_2/n_2$$. Sob
$$H_0$$, as duas proporções são iguais, então se estima o valor comum pela
**proporção combinada**

$$
\hat p=\frac{X_1+X_2}{n_1+n_2},
$$

e

$$
Z=\frac{\hat p_1-\hat p_2}{\sqrt{\hat p\,(1-\hat p)\left(\dfrac{1}{n_1}+\dfrac{1}{n_2}\right)}}\ \approx\ \mathcal{N}(0,1).
$$

O intervalo de confiança para $$p_1-p_2$$ (que não usa $$H_0$$) é

$$
(\hat p_1-\hat p_2)\ \pm\ z_{\alpha/2}\sqrt{\frac{\hat p_1(1-\hat p_1)}{n_1}+\frac{\hat p_2(1-\hat p_2)}{n_2}}.
$$

## Tabela-resumo

| Comparação | Condições | Estatística sob $$H_0$$ | Distribuição |
| --- | --- | --- | --- |
| $$\mu_1=\mu_2$$ | independentes, $$\sigma_i$$ conhecidos | $$\dfrac{\bar X-\bar Y}{\sqrt{\sigma_1^{2}/n_1+\sigma_2^{2}/n_2}}$$ | $$\mathcal{N}(0,1)$$ |
| $$\mu_1=\mu_2$$ | independentes, $$\sigma_1=\sigma_2$$ | $$\dfrac{\bar X-\bar Y}{S_p\sqrt{1/n_1+1/n_2}}$$ | $$t_{n_1+n_2-2}$$ |
| $$\mu_1=\mu_2$$ | independentes, $$\sigma_1\neq\sigma_2$$ | $$\dfrac{\bar X-\bar Y}{\sqrt{S_1^{2}/n_1+S_2^{2}/n_2}}$$ | $$t_\nu$$ (Welch) |
| $$\mu_D=0$$ | pareadas | $$\dfrac{\bar D}{S_D/\sqrt{n}}$$ | $$t_{n-1}$$ |
| $$\sigma_1^{2}=\sigma_2^{2}$$ | normais independentes | $$S_1^{2}/S_2^{2}$$ | $$F_{n_1-1,\,n_2-1}$$ |
| $$p_1=p_2$$ | $$n_1,n_2$$ grandes | $$\dfrac{\hat p_1-\hat p_2}{\sqrt{\hat p(1-\hat p)(1/n_1+1/n_2)}}$$ | $$\mathcal{N}(0,1)$$ |

## Além de dois grupos

Para comparar $$k>2$$ médias de uma vez, usa-se a **análise de variância**
(ANOVA), cuja estatística de teste tem distribuição $$F$$. Para comparar $$k$$
proporções, ou para testar associação em tabelas de contingência, usa-se o
**teste $$\chi^{2}$$**. Ambos são temas das próximas aulas.
