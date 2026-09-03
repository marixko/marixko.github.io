---
title: "4.3 — Random Forests"
course: ml
---

## Random forests

A fórmula da variância da média, $$\rho\sigma^{2}+\frac{1-\rho}{B}\sigma^{2}$$,
mostrou que o *bagging* de árvores esbarra num piso $$\rho\sigma^{2}$$ porque as
árvores são parecidas demais. A floresta aleatória ataca justamente o $$\rho$$:
introduz aleatoriedade extra na construção de cada árvore para
**descorrelacioná-las**.

### Conteúdo

- Árvores aleatorizadas
- Subamostragem de variáveis
- Correlação entre árvores
- Redução de variância
- Estimativa out-of-bag

### Da bagging à floresta aleatória

Uma **floresta aleatória** é o *bagging* de árvores com uma modificação: em cada
nó, em vez de procurar o melhor corte entre **todas** as $$p$$ *features*, o
algoritmo sorteia um subconjunto de $$m<p$$ *features* e escolhe o melhor corte
apenas entre elas. Valores usuais são $$m=\sqrt{p}$$ para classificação e
$$m=p/3$$ para regressão. As árvores são crescidas fundas e não são podadas.

### O papel da correlação

Retomando a variância da média de $$B$$ árvores,

$$
\operatorname{Var}\!\left(\frac{1}{B}\sum_{b=1}^{B}f_b(x)\right)
=
\rho\,\sigma^{2}+\frac{1-\rho}{B}\,\sigma^{2}
\ \xrightarrow[B\to\infty]{}\
\rho\,\sigma^{2}.
$$

O *bagging* sozinho já leva o segundo termo a zero, mas deixa $$\rho$$ alto: se
uma ou duas *features* dominam, quase toda árvore corta por elas primeiro e as
árvores ficam muito parecidas. Restringir os cortes a um subconjunto aleatório
de *features* **força** árvores diferentes a usarem *features* diferentes, o
que reduz $$\rho$$ e portanto reduz o piso $$\rho\sigma^{2}$$.

### O compromisso em m

O parâmetro $$m$$ controla uma troca:

- $$m$$ pequeno: árvores mais descorrelacionadas ($$\rho$$ menor), mas cada
  árvore individualmente é mais fraca, porque às vezes as *features* boas nem
  entram no sorteio (variância individual $$\sigma^{2}$$ maior);
- $$m$$ grande: árvores mais fortes, porém mais correlacionadas.

O ótimo é intermediário e é um hiperparâmetro a ajustar, embora os valores
padrão costumem funcionar bem.

### Profundidade das árvores

As árvores da floresta são deixadas crescer sem poda. Individualmente elas têm
viés baixo e variância altíssima; a agregação sobre muitas árvores cuida da
variância. Essa divisão de trabalho (cada árvore reduz viés, a floresta reduz
variância) é o oposto do *boosting*, onde cada modelo novo reduz viés de forma
sequencial.

### Out-of-bag e importância de variáveis

A floresta herda a **estimativa out-of-bag** do *bagging*: cada ponto é
avaliado pelas árvores que não o usaram, dando uma estimativa de risco sem
conjunto de validação. Duas medidas de **importância de variáveis** são comuns:
a redução média de impureza atribuída a cada *feature* nos cortes, e a
importância por permutação, que mede quanto o erro out-of-bag piora quando os
valores de uma *feature* são embaralhados.

### Na prática

Florestas aleatórias são um dos métodos mais robustos "de prateleira": poucos
hiperparâmetros, pouco pré-processamento, bom desempenho em alta dimensão e
resistência a *outliers* e a *features* irrelevantes. As desvantagens são a
perda de interpretabilidade em relação a uma árvore única e o tamanho do
modelo. Em problemas tabulares muito estruturados, o *gradient boosting* das
próximas aulas costuma superá-las. Em Astronomia, a floresta aleatória é uma
escolha padrão para *photo-z* e para classificação de estrelas, galáxias e
quasares.
