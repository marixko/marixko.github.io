---
title: "7.1 — Redes Neurais como Aproximadores de Funções"
course: ml
---

## Redes neurais como aproximadores de funções

A Parte VII trata de redes neurais. A leitura aqui é deliberadamente estatística:
uma rede é uma família paramétrica de funções, montada por composição de
transformações lineares e não lineares, cujos parâmetros são ajustados por ERM.
O que a distingue dos modelos anteriores é que ela **aprende as próprias
features**.

### Conteúdo

- Perceptron
- Rede neural
- Funções de ativação
- Camadas e transformações não lineares
- Aprendizado de representação
- Aproximação universal

### Do perceptron à rede

O **perceptron** é o classificador linear
$$\hat y=\operatorname{sign}(w^{\top}x+b)$$, treinado por uma regra de
atualização que corrige os erros um a um. Ele só resolve problemas linearmente
separáveis: não consegue representar o "ou exclusivo". A saída é acrescentar
**não linearidade** e **profundidade**.

### Uma camada

Uma camada aplica uma transformação linear seguida de uma função não linear
aplicada elemento a elemento:

$$
h=\sigma(Wx+b).
$$

$$W$$ e $$b$$ são os parâmetros; $$\sigma$$ é a **função de ativação**.

### Rede profunda

Uma rede de $$L$$ camadas é a composição

$$
f(x)=f_L\circ f_{L-1}\circ\cdots\circ f_1(x),
\qquad
f_l(u)=\sigma_l(W_l u+b_l).
$$

Cada camada transforma a representação da anterior. A última camada costuma ser
linear (regressão) ou *softmax* (classificação), aplicada às *features*
produzidas pelas camadas escondidas.

### Funções de ativação

- **Sigmoide** $$\sigma(z)=1/(1+e^{-z})$$: saída em $$(0,1)$$, satura nas
  pontas.
- **Tangente hiperbólica** $$\tanh(z)$$: saída em $$(-1,1)$$, centrada em zero.
- **ReLU** $$\max(0,z)$$: barata, não satura para $$z>0$$, produz ativações
  esparsas; é a escolha padrão nas camadas escondidas.
- **Softmax**: normaliza um vetor em uma distribuição de probabilidade, usada
  na saída de classificação multiclasse.

Sem a não linearidade, a composição de camadas lineares colapsa numa única
transformação linear, e a profundidade não acrescentaria nada.

### Aprendizado de representação

A diferença conceitual em relação aos *kernels* e à engenharia manual de
*features*: em vez de fixar a transformação $$\phi(x)$$ de antemão, a rede
**aprende** $$\phi$$ junto com o classificador final. As camadas escondidas
constroem representações cada vez mais abstratas, adaptadas à tarefa e aos
dados.

### Aproximação universal

O **teorema da aproximação universal** garante que uma rede com uma única
camada escondida e ativação não polinomial pode aproximar qualquer função
contínua num compacto com precisão arbitrária, desde que tenha unidades
suficientes. Duas ressalvas importantes: o teorema não diz **quantas** unidades
são necessárias (podem ser exponencialmente muitas), nem que o treino vai
**encontrar** essa solução. A profundidade entra aqui: há funções que exigem
largura exponencial com uma camada, mas apenas profundidade polinomial com
várias.
