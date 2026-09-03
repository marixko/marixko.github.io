---
title: "4.1 — Árvores de Decisão"
course: ml
---

## Árvores de decisão

Começa aqui a Parte IV, sobre árvores e métodos de *ensemble*. A árvore de
decisão é um modelo não paramétrico que particiona o espaço das *features* em
regiões retangulares e prevê um valor constante em cada uma. Sozinha ela tem
variância alta, mas é a peça de base dos métodos mais fortes para dados
tabulares (florestas aleatórias e *boosting*), que vêm nas próximas aulas.

### Conteúdo

- Particionamento recursivo
- Árvores de classificação e de regressão
- Impureza
- Entropia e índice de Gini
- Ganho de informação
- Poda

### Particionamento recursivo

Uma árvore é construída por **particionamento recursivo**: começa-se com todos
os dados num único nó e, a cada passo, escolhe-se uma *feature* $$j$$ e um
limiar $$s$$ que dividem o nó em dois, $$\{x_j\le s\}$$ e $$\{x_j>s\}$$. O
processo se repete em cada filho. O resultado é uma partição do espaço em caixas
alinhadas aos eixos, uma por folha.

### Predição nas folhas

Cada folha guarda uma previsão constante, estimada com os pontos de treino que
caem nela:

- **regressão**: a média dos $$y_i$$ na folha;
- **classificação**: a classe majoritária, ou as proporções de classe
  $$\hat p_k$$ se quisermos probabilidades.

### Medidas de impureza

Para decidir onde cortar, precisamos medir quão "misturado" é um nó. Para um nó
com proporções de classe $$p_k$$, as medidas usuais são a **entropia**

$$
H(Y)=-\sum_{k}p_k\log p_k,
$$

o **índice de Gini**

$$
G(Y)=1-\sum_{k}p_k^{2},
$$

e o erro de classificação $$1-\max_k p_k$$. Todas valem zero quando o nó é
puro (uma só classe) e são máximas quando as classes estão em partes iguais.
Entropia e Gini são preferidas porque são diferenciáveis e mais sensíveis a
mudanças nas proporções. Em regressão, a impureza de um nó é a **variância**
(ou o erro quadrático médio) dos $$y_i$$ nele.

### Ganho de informação e a escolha do corte

Um corte que divide um nó de $$n$$ pontos em filhos de tamanhos $$n_j$$ e
impurezas $$H(Y_j)$$ produz um **ganho de informação**

$$
\mathrm{IG}=H(Y)-\sum_{j}\frac{n_j}{n}\,H(Y_j),
$$

isto é, a impureza do nó menos a média ponderada das impurezas dos filhos. A
cada passo, o algoritmo testa todas as *features* e todos os limiares
candidatos e escolhe o corte de maior ganho. É um procedimento **guloso**:
otimiza um corte por vez, sem revisar os anteriores.

### Crescimento guloso e parada

O crescimento para quando um nó fica puro, quando tem poucos pontos, quando se
atinge uma profundidade máxima, ou quando nenhum corte melhora a impureza. Sem
nenhum limite, a árvore cresce até isolar cada ponto: erro de treino zero,
variância enorme, o retrato do sobreajuste da aula 3.1.

### Poda por custo-complexidade

A estratégia clássica é deixar a árvore crescer e depois **podá-la**. A poda
por custo-complexidade minimiza

$$
R_\alpha(T)=R(T)+\alpha\,\lvert T\rvert,
$$

onde $$R(T)$$ é o erro da árvore, $$\lvert T\rvert$$ o número de folhas e
$$\alpha\ge 0$$ um parâmetro que penaliza o tamanho. Aumentar $$\alpha$$ colapsa
folhas de baixo ganho; o valor de $$\alpha$$ é escolhido por validação cruzada.

### Vantagens, limitações e o caminho para *ensembles*

Árvores são interpretáveis, lidam com *features* numéricas e categóricas sem
pré-processamento, não exigem padronização e capturam interações
automaticamente. Em contrapartida, têm **variância alta**: uma pequena mudança
nos dados pode mudar toda a estrutura, e as fronteiras são sempre alinhadas aos
eixos. É exatamente o perfil (baixo viés, alta variância, instável) que a média
de modelos corrige, o que motiva o *bagging* e as florestas aleatórias das
próximas aulas.
