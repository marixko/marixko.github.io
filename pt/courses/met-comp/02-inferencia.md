---
title: Métodos Estatísticos e Computacionais
course: met-comp
---

## O que é inferência estatística?

Um processo de inferência estatística visa descrever relações entre variáveis aleatórias a partir de uma amostra de uma população e tirar conclusões acerca dessa população. A amostra deve ser representativa da população e, geralmente, aplicam-se técnicas de amostragem para determinação dessa amostra (e.g., determinação do tamanho amostral).

Na Astronomia, o que chamamos de "amostra" em geral não passa por esse processo técnico de amostragem, mas sim trabalha-se com o máximo de fontes disponíveis. As fontes disponíveis para estudo vão ser limitadas por características instrumentais e observacionais.

---

## Tipos de dados

Podemos dividir os dados em dois tipos: **estruturados** e **não estruturados**. Alguns exemplos de dados não estruturados são textos, em geral, e imagens. Neste curso, todavia, apenas lidaremos com dados estruturados. Dados estruturados são aqueles que podem ser visualizados na forma de tabela, contendo linhas e colunas.

Estes dados podem ser divididos em dois tipos: **quantitativos** e **qualitativos**.

Os dados **quantitativos** podem ser:

- **Discretos:** assumem valores isolados ou contáveis (e.g., número de objetos).
- **Contínuos:** podem assumir qualquer valor em um intervalo (e.g., preço de aluguel).

Já os dados **qualitativos** podem ser:

- **Nominais:** categorias sem uma ordem natural (e.g., cidade).
- **Ordinais:** categorias que possuem uma ordem natural (e.g., grau de escolaridade).

---

## Medidas-resumo

Sempre que precisar analisar dados estruturados, é interessante calcular medidas-resumo e visualizar alguns gráficos para se obter conhecimento das características das suas variáveis.

> **Nota:** aqui uso o termo "variáveis" correspondendo a dados, colunas ou *features*.

Pergunte-se, por exemplo:

- Meus dados são simétricos?
- Há muita variabilidade nos valores?
- Onde os dados estão concentrados?
- Existem valores extremos?

As principais medidas-resumo para te ajudar a responder essas e outras perguntas estão listadas abaixo.

### 1. Medidas de tendência central

#### Média

A média aritmética de um conjunto de $$n$$ observações é dada por

$$
\bar{x} =
\frac{x_1 + \cdots + x_n}{n}
=
\frac{1}{n}\sum_{i=1}^{n}x_i.
$$

#### Mediana

A mediana é o valor central dos dados quando as observações estão ordenadas. Para uma amostra de tamanho $$n$$:

$$
\operatorname{md}(X) =
\begin{cases}
x_{\frac{n+1}{2}}, & \text{se } n \text{ é ímpar}, \\[6pt]
\frac{x_{\frac{n}{2}} + x_{\frac{n}{2}+1}}{2}, & \text{se } n \text{ é par}.
\end{cases}
$$

#### Moda

A **moda** é a realização mais frequente do conjunto de dados observados.

---

### 2. Medidas de dispersão

As medidas de dispersão quantificam o quanto os dados variam em torno de uma medida de tendência central.

#### Desvio médio

O desvio médio em relação à média é dado por

$$
dm(X) =
\frac{1}{n}
\sum_{i=1}^{n}
\left|x_i-\bar{x}\right|.
$$

#### Variância

A variância de um conjunto de dados é dada por

$$
\sigma^2(X) =
\frac{1}{n}
\sum_{i=1}^{n}
(x_i-\bar{x})^2.
$$

> **Nota:** aqui estamos calculando a variância descritiva da população de dados observada. Na inferência estatística, veremos posteriormente outras definições, como a variância amostral.

#### Desvio padrão

O desvio padrão é a raiz quadrada da variância:

$$
\sigma(X) =
\sqrt{\sigma^2(X)}.
$$

---

### 3. Medidas de posição

#### Quantil

O quantil de ordem $$p$$, ou $$p$$-quantil, indicado por $$q(p)$$, em que $$p$$ é uma proporção entre 0 e 1, é um valor tal que aproximadamente $$100\times p\%$$ das observações sejam menores ou iguais a $$q(p)$$.

Por exemplo, a mediana é, por definição,

$$
q(0.5).
$$

Alguns quantis particularmente importantes são:

- $$q(0.25)$$: primeiro quartil;
- $$q(0.50)$$: mediana;
- $$q(0.75)$$: terceiro quartil.

O intervalo entre o primeiro e o terceiro quartil é chamado de **intervalo interquartil (IQR)**:

$$
IQR = q(0.75) - q(0.25).
$$

---

### 4. Medidas de simetria

#### Assimetria (*skewness*)

Uma medida de assimetria pode ser definida como

$$
\gamma_1 =
\frac{\mu_3}{\sigma^3},
$$

em que $$\mu_3$$ é o terceiro momento central. Esse conceito ficará mais claro nas próximas aulas.

De maneira geral:

- $$\gamma_1 \approx 0$$: distribuição aproximadamente simétrica;
- $$\gamma_1 > 0$$: assimetria à direita;
- $$\gamma_1 < 0$$: assimetria à esquerda.

#### Curtose

A curtose pode ser definida como

$$
Kurt(X) =
\frac{\mu_4}{\sigma^4},
$$

em que $$\mu_4$$ é o quarto momento central.

> **Nota:** existem diferentes convenções para definir e normalizar a curtose. Algumas referências utilizam a chamada **curtose em excesso**, definida como $$Kurt(X)-3$$ para distribuições cuja referência é a normal.

---

## Visualização de dados

**A definir.**

A visualização é uma etapa fundamental da análise exploratória de dados. Gráficos podem revelar padrões, assimetrias, correlações, *outliers*, heterocedasticidade e outras características que podem não ser evidentes a partir de medidas-resumo.

Uma boa referência para explorar diferentes tipos de visualização em Python é a galeria do **Seaborn**:

https://seaborn.pydata.org/examples/index.html

---

## Transformações

Em geral pouco usado na Astronomia, porém pode ser muito útil, é o uso de transformações dos dados.

Várias análises estatísticas supõem que os dados provenham de uma distribuição normal (veremos sobre isso nas próximas aulas) ou que sejam aproximadamente simétricos. Em muitos casos, nos deparamos com distribuições assimétricas.

Nesses casos, uma família de transformações frequentemente utilizada é a transformação de potência, que pode ser escrita como

$$
x^{(p)} =
\begin{cases}
x^p, & \text{se } p > 0, \\[4pt]
\ln(x), & \text{se } p = 0, \\[4pt]
-x^p, & \text{se } p < 0.
\end{cases}
$$

> **Nota:** existem diferentes famílias e convenções para transformações de potência. A definição acima deve ser entendida como uma introdução à ideia geral de transformar os dados para modificar suas propriedades estatísticas.

