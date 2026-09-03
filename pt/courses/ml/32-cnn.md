---
title: "8.2 — Redes Neurais Convolucionais"
course: ml
---

## Redes neurais convolucionais

Uma camada densa trata cada *pixel* como uma *feature* independente, o que
ignora a estrutura espacial da imagem e gasta parâmetros demais. A rede
convolucional (CNN) troca a multiplicação por matriz cheia por uma
**convolução** com um filtro pequeno, embutindo duas hipóteses sobre sinais
naturais: localidade e invariância a translação.

### Conteúdo

- Convolução
- Equivariância à translação
- Compartilhamento de parâmetros
- Campos receptivos
- Pooling
- CNNs como operadores matemáticos

### Convolução

A convolução de duas funções é

$$
(f*g)(x)=\int f(\tau)\,g(x-\tau)\,d\tau,
$$

e a sua versão discreta desliza um **filtro** (o *kernel*) sobre o sinal,
calculando em cada posição uma soma ponderada da vizinhança. Numa CNN, os pesos
do filtro são aprendidos.

### Compartilhamento de parâmetros

O mesmo filtro é aplicado em **todas** as posições da entrada. Um filtro
$$3\times 3$$ tem $$9$$ pesos, independentemente do tamanho da imagem, contra os
milhões de uma camada densa equivalente. Menos parâmetros significa menos
variância e um viés indutivo adequado ao problema.

### Equivariância à translação

A convolução é **equivariante a translações**: deslocar a entrada desloca a
saída da mesma forma,

$$
T_s(f*g)=(T_sf)*g.
$$

Um padrão aprendido num canto da imagem é reconhecido em qualquer outro. A
operação de *pooling*, combinada com a profundidade, acrescenta **invariância**
aproximada: a resposta passa a depender pouco da posição exata do padrão.

### Campos receptivos e pooling

O **campo receptivo** de uma unidade é a região da entrada que a influencia.
Ele começa pequeno (o tamanho do filtro) e cresce com a profundidade, à medida
que camadas sucessivas combinam vizinhanças. O *pooling* (máximo ou média)
reduz a resolução, o que aumenta o campo receptivo, dá invariância local e
diminui o custo.

### CNNs como operadores matemáticos

Cada camada convolucional é um operador **linear e equivariante a translação**
seguido de uma não linearidade pontual. É a mesma estrutura das camadas densas
(linear mais ativação), com a matriz restrita à classe das que representam
convoluções. Variações comuns: convolução com passo maior que $$1$$, convolução
dilatada (campo receptivo maior sem mais pesos), convolução $$1\times 1$$
(mistura de canais), conexões residuais e normalização por lote.

### Uso

CNNs são o padrão para dados com estrutura de grade e estacionariedade
aproximada: imagens (morfologia de galáxias, separação de fontes sobrepostas,
detecção de lentes), espectros unidimensionais e séries temporais. O ganho vem
menos da capacidade e mais do **viés indutivo** certo para o tipo de sinal.
