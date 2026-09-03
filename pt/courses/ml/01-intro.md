---
title: 1.1 — Introdução
course: ml
---

## Machine Learning como Inferência Estatística

Boa parte do aprendizado de máquina pode ser entendida como um problema de
inferência estatística: a partir de uma amostra finita, queremos estimar uma
relação entre variáveis que <mark>vale para toda a população</mark>, sobretudo
para dados que ainda não observamos. Nesta aula fixamos a notação e os conceitos
que vão sustentar todo o restante do curso.

### Conteúdo

- Dados e processo gerador
- Variáveis aleatórias $$X$$ e $$Y$$
- Conjunto de treinamento
- Função de predição
- Espaço de hipóteses
- Modelos paramétricos e não paramétricos
- Aprendizado supervisionado e não supervisionado
- Predição versus inferência

### Formulação matemática

Considere um conjunto de dados

$$
D = \{(x_i,y_i)\}_{i=1}^{n},
$$

com

$$
(X,Y)\sim P(X,Y).
$$

O objetivo é encontrar uma função

$$
f:X\rightarrow Y
$$

que produza boas previsões para novas observações.

O estimador pode ser escrito como

$$
\hat f = \mathcal{A}(D),
$$

onde $$\mathcal{A}$$ representa o algoritmo de aprendizado.

### Conceitos fundamentais

#### Dados e processo gerador

Todo conjunto de dados é encarado como uma **amostra** de um processo gerador
desconhecido, descrito por uma distribuição de probabilidade conjunta
$$P(X,Y)$$. Em geral supomos que as observações $$(x_i,y_i)$$ são
**independentes e identicamente distribuídas** (i.i.d.) segundo $$P$$. Essa é
uma idealização: na Astronomia, o "processo gerador" combina a física das
fontes, o instrumento e os efeitos de seleção da amostra, e nem sempre as
observações são realmente independentes. Ainda assim, é a hipótese de trabalho
que torna possível generalizar do que vimos para o que ainda não vimos. Se o
processo gerador mudasse arbitrariamente entre treino e uso, não haveria nada a
aprender.

#### Variáveis aleatórias $$X$$ e $$Y$$

Separamos as variáveis em duas: $$X$$ reúne as **variáveis preditoras**
(*features*, covariáveis, atributos), tipicamente um vetor
$$X\in\mathbb{R}^{d}$$; $$Y$$ é a **variável resposta** (alvo), aquilo que
queremos prever. A natureza de $$Y$$ define a tarefa:

- se $$Y$$ assume valores em um conjunto discreto de categorias, temos um
  problema de **classificação** (por exemplo, estrela / galáxia / quasar);
- se $$Y$$ é contínuo, temos um problema de **regressão** (por exemplo,
  estimar o *redshift* de uma fonte).

#### Conjunto de treinamento

O conjunto de treinamento $$D = \{(x_i,y_i)\}_{i=1}^{n}$$ é a realização
**finita** do processo gerador à qual temos acesso. É a partir dele que o
algoritmo constrói o estimador $$\hat f$$. Como $$D$$ é aleatório, $$\hat f$$
também é: se coletássemos outra amostra do mesmo processo, obteríamos uma função
um pouco diferente. Por isso, na prática, reservamos parte dos dados, ou seja,
conjuntos de **validação** e de **teste**, para estimar de forma honesta o
desempenho em dados novos, sem contaminação pelo ajuste.

#### Função de predição

A função de predição $$f:X\rightarrow Y$$ é a regra que, dado um vetor de
*features* $$x$$, devolve um palpite $$f(x)$$ para a resposta. Para comparar
funções precisamos de uma **função de perda** $$L\big(y,f(x)\big)$$, que
quantifica o custo de prever $$f(x)$$ quando o valor verdadeiro é $$y$$
(por exemplo, o erro quadrático $$\big(y-f(x)\big)^2$$ em regressão). A função
ideal é a que minimiza o **risco esperado**

$$
R(f) = \mathbb{E}_{(X,Y)\sim P}\big[\,L(Y,f(X))\,\big],
$$

mas, como $$P$$ é desconhecida, o algoritmo trabalha com o **risco empírico**
calculado sobre o conjunto de treinamento,

$$
\hat R(f) = \frac{1}{n}\sum_{i=1}^{n} L\big(y_i,f(x_i)\big).
$$

Grande parte do curso é sobre a diferença entre esses dois riscos.

#### Espaço de hipóteses

O algoritmo não procura $$f$$ entre *todas* as funções possíveis, mas dentro de
um conjunto restrito $$\mathcal{H}$$, o **espaço de hipóteses**. Por exemplo,
todas as funções lineares, ou todas as redes neurais de uma dada arquitetura.
Aprender é escolher

$$
\hat f = \arg\min_{f\in\mathcal{H}} \hat R(f).
$$

A escolha de $$\mathcal{H}$$ controla o **compromisso viés–variância**: um
espaço muito pequeno pode não conter uma boa aproximação da relação verdadeira
(viés alto); um espaço muito rico ajusta-se ao ruído da amostra e generaliza
mal (variância alta).

#### Modelos paramétricos e não paramétricos

Um modelo é **paramétrico** quando $$\mathcal{H}$$ é indexado por um vetor de
parâmetros $$\theta\in\mathbb{R}^{p}$$ de dimensão **fixa**, que não cresce com
o tamanho da amostra (regressão linear e regressão logística são exemplos).
Um modelo é **não paramétrico** quando a sua complexidade efetiva **aumenta
com $$n$$**: vizinhos mais próximos ($$k$$-NN), árvores de decisão, métodos de
*kernel* e processos gaussianos guardam (implícita ou explicitamente) uma
parcela dos próprios dados. Modelos paramétricos são mais rígidos, mais fáceis
de interpretar e precisam de menos dados; modelos não paramétricos são mais
flexíveis, mas exigem amostras maiores e mais cuidado com sobreajuste.

#### Aprendizado supervisionado e não supervisionado

No aprendizado **supervisionado** dispomos dos pares $$(x_i,y_i)$$ e queremos
estimar a relação entre eles, ou seja, a distribuição condicional $$P(Y\mid X)$$ ou
diretamente uma função $$f$$. No aprendizado **não supervisionado** só
observamos $$X$$, sem rótulos $$y$$, e o objetivo é descobrir estrutura na
distribuição $$P(X)$$: agrupar objetos semelhantes (*clustering*), reduzir a
dimensionalidade, estimar densidades ou detectar anomalias.

#### Predição versus inferência

Por fim, uma distinção de objetivo. Quando o interesse é **predição**, só
importa que $$f(x)$$ se aproxime de $$y$$ em dados novos; a forma interna do
modelo pode ser opaca. Quando o interesse é **inferência**, queremos entender
*a relação em si*, isto é, quais *features* importam, qual a forma funcional da
dependência, qual a incerteza sobre os parâmetros e se os efeitos são
estatisticamente significativos. Um mesmo conjunto de dados pode ser analisado
com qualquer um dos dois objetivos, mas eles levam a escolhas diferentes de
modelo, de validação e de interpretação dos resultados.
