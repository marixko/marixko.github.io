---
title: "1.20 - Estatística não paramétrica"
course: met-comp
---

## Estatística não paramétrica

Os testes das aulas 1.13 a 1.17 supõem uma forma para a distribuição dos dados,
quase sempre a normal. Quando essa suposição é duvidosa (amostras pequenas,
dados assimétricos, presença de *outliers*, variáveis ordinais), usam-se testes
**não paramétricos**, que se apoiam em postos e sinais em vez de nos valores
originais.

### Conteúdo

- A ideia dos postos
- Teste dos sinais
- Teste de Wilcoxon (postos sinalizados)
- Teste de Mann-Whitney
- Teste de Kruskal-Wallis
- Teste de Kolmogorov-Smirnov

## A ideia dos postos

Substituir cada observação pela sua posição na ordenação (o **posto**) elimina
a dependência da escala e da forma exata da distribuição. A distribuição das
estatísticas baseadas em postos, sob a hipótese nula, depende apenas de
$$n$$ (e de combinatória), não da distribuição de origem. O preço é uma
pequena perda de poder quando os dados **são** realmente normais.

## Teste dos sinais

O mais simples. Para $$H_0$$ de que a **mediana** vale $$m_0$$, conta-se quantas
observações estão acima de $$m_0$$. Sob $$H_0$$, esse número
$$S\sim\text{Binomial}(n,\tfrac{1}{2})$$ (descartando empates). Serve também
para dados pareados, aplicado aos sinais das diferenças. Usa pouquíssima
informação (só o sinal), então tem poder baixo.

## Teste de Wilcoxon (postos sinalizados)

Para dados pareados, ou para uma amostra contra uma mediana $$m_0$$, é o
substituto do teste $$t$$. Calculam-se as diferenças $$d_i$$, ordenam-se os
$$\lvert d_i\rvert$$, atribuem-se postos, e somam-se separadamente os postos das
diferenças positivas ($$W^{+}$$) e das negativas ($$W^{-}$$). A estatística é
$$W=\min(W^{+},W^{-})$$. Sob $$H_0$$, $$W^{+}$$ tem média
$$\frac{n(n+1)}{4}$$ e variância $$\frac{n(n+1)(2n+1)}{24}$$, e para $$n$$
grande

$$
Z=\frac{W^{+}-\frac{n(n+1)}{4}}{\sqrt{\frac{n(n+1)(2n+1)}{24}}}\ \approx\ \mathcal{N}(0,1).
$$

Diferentemente do teste dos sinais, ele usa a **magnitude** relativa das
diferenças.

## Teste de Mann-Whitney

O substituto não paramétrico do teste $$t$$ de **duas amostras
independentes**. Juntam-se as $$n_1+n_2$$ observações, atribuem-se postos, e
soma-se $$R_1$$, a soma dos postos do grupo 1. A estatística é

$$
U_1=R_1-\frac{n_1(n_1+1)}{2},
$$

que conta quantos pares $$(x,y)$$ têm $$x<y$$. Sob $$H_0$$ (mesma
distribuição), $$U_1$$ tem média $$\frac{n_1 n_2}{2}$$ e variância
$$\frac{n_1 n_2(n_1+n_2+1)}{12}$$, e a aproximação normal vale para amostras
moderadas.

## Teste de Kruskal-Wallis

A extensão do Mann-Whitney para $$k\ge 2$$ grupos, e o substituto não
paramétrico da ANOVA. Com os postos de todas as $$N$$ observações e $$R_i$$ a
soma dos postos do grupo $$i$$,

$$
H=\frac{12}{N(N+1)}\sum_{i=1}^{k}\frac{R_i^{2}}{n_i}-3(N+1)\ \sim\ \chi^{2}_{k-1}
$$

sob $$H_0$$ de que os $$k$$ grupos têm a mesma distribuição.

## Teste de Kolmogorov-Smirnov

Testa a **forma** da distribuição, não um parâmetro. Compara a FDA empírica
$$\hat F_n$$ (aula 1.6) com uma FDA de referência $$F_0$$ (teste de aderência)
ou com a FDA empírica de uma segunda amostra (teste de duas amostras). A
estatística é a maior distância vertical entre as curvas,

$$
D_n=\sup_{x}\big\lvert\hat F_n(x)-F_0(x)\big\rvert.
$$

Sob $$H_0$$, a distribuição de $$\sqrt{n}\,D_n$$ não depende de $$F_0$$ (desde
que $$F_0$$ seja contínua e totalmente especificada), o que dá valores
críticos tabelados. É sensível sobretudo a diferenças no centro da
distribuição; para as caudas, o teste de Anderson-Darling é preferível.

## Resumo

| Situação | Teste paramétrico | Alternativa não paramétrica |
| --- | --- | --- |
| Uma amostra / pareada | teste $$t$$ | sinais, Wilcoxon |
| Duas amostras independentes | teste $$t$$ | Mann-Whitney |
| $$k$$ grupos | ANOVA | Kruskal-Wallis |
| Forma da distribuição | (qui-quadrado de aderência) | Kolmogorov-Smirnov |
