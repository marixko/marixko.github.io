---
title: "4.4 — Boosting"
course: ml
---

## Boosting

Florestas aleatórias combinam árvores fortes **em paralelo** para reduzir
variância. O *boosting* faz o oposto: combina modelos **fracos** de forma
**sequencial**, cada um corrigindo os erros do conjunto anterior, e reduz
principalmente o viés.

### Conteúdo

- Weak learners
- Modelos aditivos
- AdaBoost
- Perda exponencial
- Aprendizado sequencial

### Weak learners e o modelo aditivo

Um *weak learner* é um modelo apenas um pouco melhor que o acaso, como um
**toco de decisão** (uma árvore de profundidade $$1$$). O *boosting* combina
$$M$$ desses num **modelo aditivo**

$$
F_M(x)=\sum_{m=1}^{M}\alpha_m\,h_m(x),
$$

onde cada $$h_m$$ é um *weak learner* e $$\alpha_m$$ o seu peso.

### Aprendizado sequencial

A diferença essencial para o *bagging* é que os $$h_m$$ **não** são
independentes: $$h_m$$ é ajustado depois de $$h_1,\ldots,h_{m-1}$$ e tem como
tarefa consertar o que o conjunto atual $$F_{m-1}$$ ainda erra. Isso se faz
por **modelagem aditiva em estágios progressivos**: a cada rodada, mantém-se
tudo o que já foi construído e acrescenta-se um novo termo
$$\alpha_m h_m$$ que reduz mais a perda.

### AdaBoost

O algoritmo original, para classificação binária com $$y\in\{-1,+1\}$$, mantém
um peso $$w_i$$ sobre cada ponto de treino. Em cada rodada $$m$$:

1. ajusta $$h_m$$ aos dados **ponderados** por $$w_i$$;
2. calcula o erro ponderado
   $$\epsilon_m=\sum_i w_i\,\mathbf{1}[\,y_i\neq h_m(x_i)\,]\big/\sum_i w_i$$;
3. define o peso do modelo
   $$\alpha_m=\tfrac{1}{2}\log\dfrac{1-\epsilon_m}{\epsilon_m}$$;
4. atualiza os pesos dos pontos,
   $$w_i\leftarrow w_i\,\exp\!\big(-\alpha_m\,y_i\,h_m(x_i)\big)$$, e
   renormaliza.

Pontos classificados errado ganham peso, então a rodada seguinte se concentra
neles. A previsão final é
$$F(x)=\operatorname{sign}\big(\sum_m\alpha_m h_m(x)\big)$$.

### AdaBoost como perda exponencial

O que parece um esquema de pesos *ad hoc* é, na verdade, modelagem aditiva em
estágios com a **perda exponencial**

$$
L(y,F)=e^{-y\,F(x)}.
$$

Minimizar a perda exponencial esperada em $$F(x)$$ dá

$$
F^{*}(x)=\tfrac{1}{2}\log\frac{P(Y=1\mid x)}{P(Y=-1\mid x)},
$$

ou seja, metade do logito. Cada passo do AdaBoost resolve exatamente o
subproblema de escolher $$h_m$$ e $$\alpha_m$$ que mais reduzem essa perda,
mantendo $$F_{m-1}$$ fixo. Os pesos $$w_i$$ que aparecem são
$$e^{-y_iF_{m-1}(x_i)}$$.

### Boosting reduz viés

Como cada rodada ataca os erros que restam, o *boosting* diminui
progressivamente o **viés**, e pode transformar tocos de decisão (viés alto) num
classificador de baixo erro. É por isso que se usam *weak learners*: modelos
já fortes deixam pouco a corrigir e o processo satura rápido.

### Sensibilidade a ruído

A perda exponencial cresce muito rápido para pontos mal classificados com
margem grande. Com rótulos ruidosos, o AdaBoost coloca peso demais nesses
pontos e pode sobreajustar. Trocar a perda exponencial por uma perda menos
agressiva (a *deviance* logística) resolve isso, e é o ponto de partida do
*gradient boosting*, na próxima aula.
