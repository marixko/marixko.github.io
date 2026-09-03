---
title: "2.3 - Bootstrap e jackknife"
course: met-comp
---

## Bootstrap e jackknife

Para $$\bar X$$ sabemos que o erro padrão é $$\sigma/\sqrt{n}$$. Para a mediana,
para um quantil, para o coeficiente de correlação ou para uma razão de médias,
a fórmula do erro padrão ou não existe em forma fechada ou depende de
suposições fortes. O *bootstrap* estima a variabilidade de **qualquer**
estatística reamostrando os próprios dados.

### Conteúdo

- A ideia do bootstrap
- Erro padrão e viés por bootstrap
- Intervalos de confiança bootstrap
- O jackknife
- Quando o bootstrap falha

## A ideia do bootstrap

Seja $$\hat\theta=T(X_1,\ldots,X_n)$$ uma estatística qualquer. A sua
distribuição amostral depende da distribuição populacional $$F$$, que não
conhecemos. O *bootstrap* substitui $$F$$ pela **FDA empírica** $$\hat F_n$$
(aula 1.6), que é a melhor estimativa de $$F$$ que temos, e simula a partir
dela:

1. sortear, **com reposição**, uma amostra $$X_1^{*},\ldots,X_n^{*}$$ dos dados
   originais (isto é o mesmo que amostrar de $$\hat F_n$$);
2. calcular $$\hat\theta^{*}=T(X_1^{*},\ldots,X_n^{*})$$;
3. repetir $$B$$ vezes, obtendo $$\hat\theta^{*}_1,\ldots,\hat\theta^{*}_B$$.

A dispersão dos $$\hat\theta^{*}_b$$ imita a dispersão de $$\hat\theta$$ entre
amostras reais da população.

## Erro padrão e viés por bootstrap

O **erro padrão** de $$\hat\theta$$ é estimado pelo desvio padrão das réplicas:

$$
\widehat{\mathrm{ep}}_{\mathrm{boot}}
=
\sqrt{\frac{1}{B-1}\sum_{b=1}^{B}\big(\hat\theta^{*}_b-\bar{\hat\theta^{*}}\big)^{2}}.
$$

O **viés** é estimado por
$$\widehat{\mathrm{vies}}=\bar{\hat\theta^{*}}-\hat\theta$$, a diferença entre a
média das réplicas e a estimativa original.

## Intervalos de confiança bootstrap

Três construções, da mais simples à mais confiável:

- **Percentil**: os quantis $$\alpha/2$$ e $$1-\alpha/2$$ da distribuição das
  réplicas $$\hat\theta^{*}$$.
- **Básico** (ou pivotal reverso):
  $$\big[\,2\hat\theta-q_{1-\alpha/2}^{*},\ 2\hat\theta-q_{\alpha/2}^{*}\,\big]$$,
  onde $$q^{*}$$ são os quantis das réplicas.
- **BCa** (corrigido para viés e aceleração): ajusta os quantis do método
  percentil para corrigir viés e assimetria; é o recomendado na prática.

Todos convergem para o intervalo clássico quando as suposições deste valem, mas
funcionam também quando não valem.

## O jackknife

Um predecessor do *bootstrap*, mais barato e determinístico. Calcula-se
$$\hat\theta_{(i)}$$, a estatística com a observação $$i$$ **removida**, para
cada $$i$$. Com a média $$\bar\theta_{(\cdot)}=\frac{1}{n}\sum_i\hat\theta_{(i)}$$,

$$
\widehat{\mathrm{ep}}_{\mathrm{jack}}
=
\sqrt{\frac{n-1}{n}\sum_{i=1}^{n}\big(\hat\theta_{(i)}-\bar\theta_{(\cdot)}\big)^{2}},
$$

$$
\widehat{\mathrm{vies}}_{\mathrm{jack}}=(n-1)\big(\bar\theta_{(\cdot)}-\hat\theta\big).
$$

Ele exige apenas $$n$$ recálculos e não usa números aleatórios, mas falha para
estatísticas **não suaves** como a mediana, para as quais o *bootstrap* é
preferível.

## Quando o bootstrap falha

- **Estatísticas na fronteira do suporte**, como o máximo amostral: a
  reamostragem nunca produz valores maiores que o observado, e a distribuição
  bootstrap é enviesada.
- **Dados dependentes** (séries temporais, dados espaciais): a reamostragem
  simples destrói a estrutura de dependência; usa-se o *bootstrap* em blocos.
- **Amostras muito pequenas**: $$\hat F_n$$ é uma aproximação ruim de $$F$$.

Nesses casos, o *bootstrap* pode dar uma falsa sensação de precisão, e vale
verificar contra um método analítico ou contra simulação do modelo assumido.
