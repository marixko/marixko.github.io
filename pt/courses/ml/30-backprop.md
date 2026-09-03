---
title: "7.2 — Backpropagation e Deep Learning"
course: ml
---

## Backpropagation e deep learning

Treinar uma rede é minimizar o risco empírico por descida de gradiente
estocástica (aula 2.4). O que falta é calcular o gradiente da perda em relação
a milhões de parâmetros de forma eficiente. A **retropropagação** faz isso: é a
regra da cadeia organizada para reaproveitar cálculos.

### Conteúdo

- Grafos computacionais
- Regra da cadeia
- Propagação direta e retropropagação
- Otimização
- Gradientes que desaparecem ou explodem
- Regularização

### Grafo computacional e propagação direta

A avaliação de $$L=L\big(y,f(x;\theta)\big)$$ é uma sequência de operações
elementares, que podemos desenhar como um grafo. A **propagação direta**
percorre o grafo da entrada para a saída, calculando e **armazenando** as
ativações intermediárias. Para a camada $$l$$,

$$
z^{(l)}=W^{(l)}h^{(l-1)}+b^{(l)},
\qquad
h^{(l)}=\sigma\big(z^{(l)}\big).
$$

### Retropropagação

A retropropagação percorre o grafo no sentido inverso, aplicando a **regra da
cadeia** da saída de volta para os parâmetros. Em forma geral, para os pesos da
camada $$l$$,

$$
\frac{\partial L}{\partial W^{(l)}}
=
\frac{\partial L}{\partial h^{(l)}}\,
\frac{\partial h^{(l)}}{\partial W^{(l)}}.
$$

Concretamente, definindo o sinal de erro
$$\delta^{(l)}=\partial L/\partial z^{(l)}$$, ele se propaga para trás por

$$
\delta^{(l)}=\big(W^{(l+1)\top}\delta^{(l+1)}\big)\odot\sigma'\big(z^{(l)}\big),
$$

e os gradientes dos parâmetros saem de

$$
\frac{\partial L}{\partial W^{(l)}}=\delta^{(l)}\,h^{(l-1)\top},
\qquad
\frac{\partial L}{\partial b^{(l)}}=\delta^{(l)}.
$$

Como as subexpressões compartilhadas são reaproveitadas, o custo de calcular
**todos** os gradientes é da mesma ordem do custo de uma propagação direta.
Isso é a diferenciação automática em modo reverso.

### Otimização

Os gradientes alimentam a SGD por *mini-lotes* (aula 2.4), quase sempre com
**momento** ou **Adam**, e com a taxa de aprendizado seguindo um cronograma
(aquecimento e decaimento). O objetivo é não convexo, então busca-se uma boa
bacia, não o mínimo global.

### Gradientes que desaparecem ou explodem

Na retropropagação, $$\delta^{(l)}$$ é multiplicado repetidamente por matrizes
$$W$$ e por derivadas $$\sigma'$$. Se esses fatores são tipicamente menores que
$$1$$, o gradiente **desaparece** ao chegar às primeiras camadas (as sigmoides e
tanh saturam e têm $$\sigma'\approx 0$$); se são maiores que $$1$$, ele
**explode**. As soluções: ativação ReLU (derivada $$1$$ para $$z>0$$),
inicialização que preserva a variância do sinal e do gradiente entre camadas
(Xavier, He), conexões residuais, recorte de gradiente e normalização por lote.

### Regularização

Redes muito flexíveis precisam de controle de capacidade. Os mecanismos usuais:

- **decaimento de peso** (penalidade $$L_2$$);
- **dropout**: zerar aleatoriamente unidades durante o treino, o que age como
  uma média de sub-redes;
- **parada antecipada** guiada pela validação;
- **aumento de dados**;
- **normalização por lote**, que estabiliza o treino e também regulariza.

A generalização dessas redes, apesar de terem mais parâmetros que dados, é o
tema da próxima aula.
