---
title: "6.3 — K-Means"
course: ml
---

## K-means

O K-means é o algoritmo de agrupamento mais usado: divide os dados em $$K$$
grupos representados por seus centros, minimizando a soma das distâncias
quadráticas de cada ponto ao centro do seu grupo. É um exemplo limpo de
otimização por coordenadas e das armadilhas dos mínimos locais.

### Conteúdo

- Funções objetivo
- Otimização por coordenadas
- Mínimos locais
- Inicialização
- Escolha de $$K$$

### O objetivo

Dado o número de grupos $$K$$, buscamos atribuições $$c_i\in\{1,\ldots,K\}$$ e
centros $$\mu_1,\ldots,\mu_K$$ que minimizem

$$
J=\sum_{i=1}^{n}\big\lVert x_i-\mu_{c_i}\big\rVert^{2}.
$$

$$J$$ é a variância intra-grupo total. O problema conjunto é combinatório e
NP-difícil em geral.

### O algoritmo de Lloyd

Otimiza-se $$J$$ alternando entre as duas variáveis, cada passo em forma
fechada:

**Atribuição** (fixando os centros): cada ponto vai para o centro mais
próximo,

$$
c_i=\arg\min_{k}\ \lVert x_i-\mu_k\rVert^{2}.
$$

**Atualização** (fixando as atribuições): cada centro vira a média dos seus
pontos,

$$
\mu_k=\frac{1}{N_k}\sum_{i:\,c_i=k}x_i,
\qquad
N_k=\lvert\{i:c_i=k\}\rvert.
$$

### Convergência e mínimos locais

Cada um dos dois passos **não aumenta** $$J$$, e $$J\ge 0$$, então o algoritmo
converge em um número finito de iterações. Mas ele converge para um mínimo
**local**: $$J$$ não é convexo na atribuição discreta, e o resultado depende da
inicialização. A partição induzida é sempre um diagrama de Voronoi dos centros.

### Inicialização

Centros iniciais ruins levam a soluções ruins. As práticas padrão:

- rodar o algoritmo várias vezes com sementes aleatórias diferentes e ficar
  com a de menor $$J$$;
- usar **k-means++**, que escolhe os centros iniciais de forma espalhada
  (cada novo centro é sorteado com probabilidade proporcional à distância
  quadrática ao centro mais próximo já escolhido), o que garante uma solução a
  no máximo um fator $$O(\log K)$$ do ótimo em expectativa.

### Escolha de K

$$J$$ decresce de forma monótona com $$K$$ (mais centros sempre ajustam
melhor), então não se pode escolher $$K$$ minimizando $$J$$. Usa-se o
"cotovelo" da curva $$J(K)$$, o coeficiente de **silhueta**, ou a **estatística
de lacuna**, que compara $$J$$ ao esperado sob dados sem estrutura.

### Hipóteses e limitações

O K-means assume grupos aproximadamente **esféricos e de tamanho parecido**,
faz atribuição **rígida** (cada ponto pertence a um único grupo) e é sensível à
escala das *features* e a *outliers*. Ele é o caso limite do modelo de mistura
gaussiana da próxima aula, com covariâncias isotrópicas iguais e atribuição
rígida. Em Astronomia serve para agrupamentos rápidos em espaço de cor,
segmentação de catálogos e quantização de vetores.
