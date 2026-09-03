---
title: "8.1 — Generalização em Redes Neurais"
course: ml
---

## Generalização em redes neurais

A Parte VIII reúne tópicos avançados. Começamos por um paradoxo: a teoria
clássica da Parte III prevê que redes com muito mais parâmetros que dados
deveriam sobreajustar de forma catastrófica, e na prática elas generalizam bem.
Entender por quê mudou a forma como pensamos sobre capacidade.

### Conteúdo

- Sobreparametrização
- Double descent
- Interpolação
- Regularização implícita
- SGD como regularização implícita
- Perspectiva do núcleo tangente

### O quebra-cabeça da sobreparametrização

Redes modernas têm $$p\gg n$$ e são treinadas até **erro de treino zero**. Pela
decomposição viés-variância, isso deveria significar variância altíssima.
Experimentos famosos mostram que essas mesmas redes conseguem também ajustar
rótulos **completamente aleatórios** (portanto têm capacidade efetiva enorme),
e ainda assim, com rótulos reais, generalizam. Contar parâmetros não é a medida
certa de complexidade.

### Double descent

Traçando o erro de teste contra o tamanho do modelo (ou o número de épocas),
não se vê a curva em U clássica, mas sim uma curva de **descida dupla**: o erro
cai, sobe até um pico no **limiar de interpolação** ($$p\approx n$$), e então
**volta a cair** no regime sobreparametrizado, muitas vezes para um valor
abaixo do melhor ponto do regime clássico. A região "boa" fica depois de
interpolar, não antes.

### Interpolação sem sobreajuste

Erro de treino zero não implica má generalização quando a solução que interpola
é **suave** o suficiente. Entre as muitas soluções de perda zero, algumas são
benignas e outras não; o que importa é qual delas o treino seleciona.

### Regularização implícita

A descida de gradiente não devolve uma solução qualquer de perda zero: ela é
**enviesada** para soluções de norma pequena. Em regressão linear
sobredeterminada, o gradiente inicializado em zero converge para o interpolador
de **norma mínima**. Para perdas do tipo logístico em dados separáveis, o
gradiente converge para a direção de **margem máxima**. A arquitetura e o
otimizador impõem uma preferência que age como regularização, sem nenhum termo
de penalização explícito.

### SGD como regularização implícita

O ruído do gradiente estocástico adiciona um viés extra: ele tende a evitar
mínimos "afiados" e a se estabilizar em mínimos **planos**, que empiricamente
generalizam melhor. O tamanho do *mini-lote* e a taxa de aprendizado controlam
a intensidade desse efeito.

### A perspectiva do núcleo tangente

No limite de **largura infinita**, com a escala de inicialização adequada, o
treino de uma rede por gradiente se comporta como uma regressão de *kernel* com
um *kernel* fixo, o **núcleo tangente neural** (NTK). Isso torna o
comportamento analisável e explica parte do fenômeno. A limitação: nesse regime
a rede **não aprende representações** (as *features* ficam essencialmente
fixas), enquanto redes reais claramente aprendem, o que o NTK não captura. A
teoria completa da generalização em *deep learning* ainda está em aberto, mas a
mensagem prática é clara: o controle de capacidade acontece de forma implícita,
e a medida relevante de complexidade é baseada em norma e margem, não em
contagem de parâmetros.
