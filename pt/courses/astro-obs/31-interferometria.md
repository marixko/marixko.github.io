---
title: "6.2 - Interferometria e síntese de abertura"
course: astro-obs
---

## Resolução por combinação de antenas

Uma antena de rádio única tem resolução ruim porque $$\lambda/D$$ é grande. A interferometria resolve isso combinando o sinal de **pares de antenas** separadas por até milhares de quilômetros, sintetizando a resolução de um telescópio do tamanho da separação máxima.

### Conteúdo

- O interferômetro de dois elementos
- Visibilidade e o teorema de van Cittert-Zernike
- O plano $$(u,v)$$ e a síntese por rotação da Terra
- Feixe sujo, imagem suja e CLEAN
- Calibração e autocalibração
- Interferometria óptica e VLBI

## O interferômetro de dois elementos

Duas antenas separadas por um vetor **linha de base** $$\vec b$$ observam a mesma fonte. A luz chega a uma delas com um atraso geométrico $$\tau_g = \vec b \cdot \hat s / c$$, onde $$\hat s$$ é a direção da fonte. Correlacionando (multiplicando e integrando) os dois sinais, a saída oscila, produzindo **franjas** conforme a Terra gira e $$\tau_g$$ muda. A amplitude e a fase dessas franjas para uma dada linha de base são a **visibilidade complexa** $$V(\vec b)$$.

## Visibilidade e o teorema de van Cittert-Zernike

O resultado central da interferometria: para uma fonte pequena, a visibilidade medida por uma linha de base é a **transformada de Fourier** da distribuição de brilho do céu, amostrada na frequência espacial correspondente à linha de base projetada. Escrevendo a linha de base projetada em unidades de comprimento de onda como $$(u,v)$$ e a posição no céu como $$(l,m)$$:

$$
V(u,v) = \iint I(l,m)\, e^{-2\pi i (ul + vm)}\, dl\,dm.
$$

Ou seja: **cada par de antenas mede uma componente de Fourier do céu**. Antenas próximas medem estrutura de larga escala (pequeno $$u,v$$); antenas distantes medem detalhe fino (grande $$u,v$$). Um interferômetro com $$N$$ antenas mede $$N(N-1)/2$$ visibilidades por instante.

## O plano $$(u,v)$$ e a síntese por rotação da Terra

Para reconstruir a imagem seria preciso preencher o **plano $$(u,v)$$**. Um arranjo fixo só amostra alguns pontos, mas a **rotação da Terra** faz cada linha de base varrer uma elipse no plano $$(u,v)$$ ao longo de horas: é a **síntese de abertura por rotação da Terra**. Observando a mesma fonte por uma noite, a cobertura fica densa o suficiente para uma imagem.

Consequências geométricas:

- **Resolução angular** $$\approx \lambda / b_\text{max}$$, fixada pela linha de base **mais longa**.
- **Maior escala angular detectável** $$\approx \lambda / b_\text{min}$$, fixada pela linha de base **mais curta**: estrutura mais extensa que isso é "resfilrada" e some (**problema do espaçamento zero**). Combina-se com dados de antena única para recuperá-la.
- **Campo de visão** $$\approx \lambda / D$$ de cada antena individual (o **feixe primário**).

## Feixe sujo, imagem suja e CLEAN

Como a amostragem do plano $$(u,v)$$ é incompleta, a transformada de Fourier inversa direta das visibilidades não dá a imagem verdadeira, mas a **imagem suja**: o céu convoluído com o **feixe sujo** (a transformada da função de amostragem, cheia de lóbulos laterais).

O algoritmo **CLEAN** (Högbom e variantes) deconvolui essa imagem assumindo que o céu é uma soma de fontes pontuais: encontra o pico, subtrai uma fração do feixe sujo naquela posição, registra a componente, e repete até o resíduo ser ruído. As componentes são então reconvoluídas com um feixe "limpo" gaussiano e somadas ao resíduo. Métodos de **máxima entropia** e, mais recentemente, de reconstrução esparsa e regularizada são alternativas para fontes extensas.

## Calibração e autocalibração

As visibilidades brutas trazem erros de ganho complexo (amplitude e fase) de cada antena, variáveis no tempo (atmosfera, eletrônica). Calibra-se por etapas:

- **Bandpass**: resposta em frequência de cada antena, de uma fonte brilhante.
- **Ganho complexo**: alterna-se, a cada poucos minutos, entre o alvo e um **calibrador de fase** próximo e pontual, cuja visibilidade deveria ser constante; o desvio dá a correção a interpolar para o alvo.
- **Escala de fluxo**: de um calibrador de fluxo absoluto conhecido.

Se a fonte for brilhante, a **autocalibração** usa o próprio alvo: parte-se de um modelo, resolve-se para os ganhos que melhor o ajustam, reimageia-se, e itera-se. A **fase de fechamento** (a soma das fases em torno de um triângulo de antenas) é imune a erros por antena e fornece uma restrição robusta usada nesse processo, e foi a chave da imagem do buraco negro em M87 pelo EHT.

## Interferometria óptica e VLBI

- **VLBI** (*Very Long Baseline Interferometry*): antenas em continentes diferentes, gravando o sinal com marca de tempo atômica e correlacionando depois. Resolução de $$\mu$$as. Usada para núcleos de AGN, o buraco negro do Centro Galáctico, o referencial ICRS e geodésia.
- **Interferometria no óptico e IR** (VLTI, CHARA): muito mais difícil, porque a atmosfera destrói a fase em milissegundos e a taxa de fótons é baixa. Poucas linhas de base, integrações curtas, e o produto costuma ser um punhado de visibilidades e fases de fechamento ajustadas a **modelos geométricos** (diâmetros estelares, órbitas de binárias próximas, regiões internas de discos e de AGN), mais do que imagens.
