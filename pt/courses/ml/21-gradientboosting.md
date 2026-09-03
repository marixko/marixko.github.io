---
title: "4.5 — Gradient Boosting"
course: ml
---

## Gradient boosting

O AdaBoost estava preso à perda exponencial. O *gradient boosting* generaliza a
ideia para **qualquer** função de perda diferenciável, ao reinterpretar o
*boosting* como descida de gradiente, só que no espaço de funções em vez do
espaço de parâmetros.

### Conteúdo

- Descida de gradiente funcional
- Gradient boosting
- Funções de perda
- Árvores de regressão como weak learners

### Boosting como descida de gradiente funcional

Queremos minimizar $$\sum_{i=1}^{n}L\big(y_i,F(x_i)\big)$$ sobre a função
$$F$$. Pense nos valores $$F(x_1),\ldots,F(x_n)$$ como as "coordenadas" a
otimizar. A descida de gradiente daria um passo na direção do gradiente
negativo dessa soma em relação a cada $$F(x_i)$$. O *gradient boosting* faz
isso, mas com uma restrição: o passo tem que ser uma função da classe de
*weak learners*, para que o modelo generalize para $$x$$ fora do treino.

### Pseudo-resíduos

Na rodada $$m$$, o gradiente negativo avaliado no modelo atual $$F_{m-1}$$ dá os
**pseudo-resíduos**

$$
r_{im}
=
-\left[\frac{\partial L\big(y_i,F(x_i)\big)}{\partial F(x_i)}\right]_{F=F_{m-1}}.
$$

Eles são a "direção" em que cada previsão deveria se mover para reduzir a
perda.

### O algoritmo

1. inicializar $$F_0(x)$$ com uma constante (a que minimiza a perda total);
2. para $$m=1,\ldots,M$$:
   - calcular os pseudo-resíduos $$r_{im}$$;
   - ajustar um *weak learner* $$h_m$$ aos pares $$(x_i,r_{im})$$ por mínimos
     quadrados;
   - escolher o passo $$\gamma_m$$ por busca de linha,
     $$\gamma_m=\arg\min_{\gamma}\sum_i L\big(y_i,F_{m-1}(x_i)+\gamma\,h_m(x_i)\big)$$;
   - atualizar
     $$F_m(x)=F_{m-1}(x)+\gamma_m\,h_m(x).$$

Note o paralelo com a aula 2.4: é a mesma iteração
$$\theta_{t+1}=\theta_t-\eta\nabla J$$, mas no espaço de funções, e o "gradiente"
é projetado sobre a classe de *weak learners* ao ser ajustado por $$h_m$$.

### O caso da perda quadrática

Com $$L(y,F)=\tfrac{1}{2}(y-F)^{2}$$, o pseudo-resíduo é

$$
r_{im}=y_i-F_{m-1}(x_i),
$$

o resíduo comum. Então o *gradient boosting* com perda quadrática é apenas
**ajustar repetidamente os resíduos**: cada árvore modela o que a soma das
anteriores ainda não explicou. Com a *deviance* logística, os pseudo-resíduos
viram $$y_i-p_{m-1}(x_i)$$ e obtém-se um classificador; com a perda absoluta ou
a de Huber, ganha-se robustez a *outliers*.

### Árvores de regressão como weak learners

O *weak learner* padrão é uma **árvore de regressão rasa** (profundidade $$2$$ a
$$8$$), sempre ajustada aos pseudo-resíduos por mínimos quadrados,
independentemente da perda original. A profundidade controla a ordem das
interações que o modelo captura.

### Regularização

Sem controle, o *gradient boosting* sobreajusta. Os mecanismos usuais:

- **taxa de aprendizado** (encolhimento) $$\nu\in(0,1]$$:
  $$F_m=F_{m-1}+\nu\,\gamma_m h_m$$, com $$\nu$$ pequeno (por exemplo $$0{,}1$$)
  e $$M$$ correspondentemente maior;
- **subamostragem** de linhas (*stochastic gradient boosting*) e de colunas a
  cada árvore;
- **profundidade** das árvores e número de folhas;
- **número de árvores** $$M$$, escolhido por parada antecipada num conjunto de
  validação.

### Implementações modernas e uso

As bibliotecas atuais (XGBoost, LightGBM, CatBoost) acrescentam um termo de
regularização explícito ao objetivo, usam a informação de **segunda ordem** (um
passo de Newton em vez de gradiente) e histogramas para achar cortes
rapidamente. O *gradient boosting* de árvores é hoje o método de referência
para dados **tabulares**, superando florestas aleatórias na maioria dos
problemas estruturados. Em Astronomia é amplamente usado para *photo-z*,
classificação e pontuação de detecções.
