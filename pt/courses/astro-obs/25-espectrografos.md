---
title: "5.2 - Espectrógrafos: fenda longa, echelle, multi-objeto e IFU"
course: astro-obs
---

## Arquiteturas de espectrógrafo

O elemento dispersor é só uma peça. Um espectrógrafo é um sistema óptico completo, e o modo como ele coleta a luz da entrada, uma fenda, muitas fendas, fibras, um mosaico de lentes, define o tipo de ciência que ele faz.

### Conteúdo

- Anatomia de um espectrógrafo
- Fenda longa
- Echelle
- Espectroscopia multi-objeto
- Espectroscopia de campo integral
- Fibra versus fenda; espectroscopia sem fenda

## Anatomia de um espectrógrafo

A cadeia óptica padrão:

$$
\text{fenda} \rightarrow \text{colimador} \rightarrow \text{dispersor} \rightarrow \text{câmera} \rightarrow \text{detector}.
$$

A **fenda** (ou a fibra, ou o furo) define o que entra e, com a sua largura, o poder de resolução. O **colimador** transforma o feixe divergente em feixe paralelo para incidir na rede. O **dispersor** separa os comprimentos de onda em ângulo. A **câmera** foca cada $$\lambda$$ em uma posição do detector. O resultado no detector é uma imagem 2D: uma direção é comprimento de onda, a outra é a posição ao longo da fenda (ou a identidade da fibra).

## Fenda longa

Uma **fenda longa** ($$\sim 1'$$–$$10'$$) preserva uma dimensão espacial. Cada linha do detector é o espectro de um ponto ao longo da fenda. Usos: objetos extensos (curvas de rotação de galáxias, gradientes de abundância, jatos, nebulosas), e a possibilidade de amostrar o **céu na própria fenda**, ao lado do objeto, para subtração (aula 5.4). É a configuração mais simples e mais flexível, e a que se usa para aprender.

## Echelle

Um espectrógrafo **echelle** opera uma rede de baixa densidade de ranhuras em **ordem alta** ($$m \sim 50$$–$$150$$), com grande ângulo de blaze, obtendo $$R \sim 20\,000$$–$$100\,000$$. Como a faixa espectral livre de cada ordem é estreita, um **cross-disperser** (prisma ou segunda rede) separa as ordens na direção perpendicular, e o detector registra dezenas de ordens paralelas cobrindo, de uma só vez, boa parte do óptico. Usos: velocidades radiais de precisão, abundâncias químicas detalhadas, cinemática de linhas estreitas, meio interestelar. Exigem detectores grandes e calibração cuidadosa ordem a ordem.

## Espectroscopia multi-objeto

Para observar centenas ou milhares de alvos por exposição:

- **Máscaras de fendas** (MOS): uma placa metálica com fendas cortadas a laser nas posições dos alvos do campo, inserida no plano focal. Cada fenda gera um mini espectro de fenda longa. Flexível na forma da fenda, limitada pelo risco de sobreposição de espectros no detector.
- **Fibras ópticas**: cada alvo é acoplado a uma fibra, posicionada por um robô ou por uma placa pré-perfurada; as fibras conduzem a luz a um ou mais espectrógrafos de bancada. Permite multiplex muito maior (2dF: 400; DESI: 5000; WEAVE, 4MOST, PFS: milhares). É preciso dedicar parte das fibras ao **céu** e monitorar o *cross-talk* entre fibras vizinhas no detector.

Levantamentos espectroscópicos como SDSS, LAMOST e DESI são construídos sobre essa tecnologia.

## Espectroscopia de campo integral

A **espectroscopia de campo integral** (IFS) obtém um **espectro para cada ponto** de uma área bidimensional, produzindo um **cubo de dados** $$(x, y, \lambda)$$. Três tecnologias:

- **Matriz de microlentes**: um mosaico de lentículas concentra a luz de cada elemento espacial em um ponto, e um dispersor gera microspectros dispostos de forma a não colidir.
- **Feixe de fibras**: as fibras de um feixe compacto no plano focal são reorganizadas em uma pseudo-fenda na entrada do espectrógrafo (MaNGA, SAMI).
- **Fatiador de imagem** (*image slicer*): espelhos cortam o campo em tiras finas e as realinham em uma longa fenda virtual (MUSE, KMOS, NIRSpec).

A IFS domina a análise de galáxias resolvidas, regiões HII, fluxos de gás em torno de AGN e alvos onde não se sabe de antemão onde pôr a fenda.

## Fibra versus fenda; espectroscopia sem fenda

**Fibra**: estabiliza e embaralha a iluminação de entrada (bom para $$R$$ e para velocidade radial), mas é circular (não amostra bem objetos alongados), tem perdas de acoplamento, e a subtração de céu é mais difícil porque a fibra de céu vê um caminho instrumental ligeiramente diferente da fibra do objeto.

**Fenda**: preserva a informação espacial e permite céu adjacente, mas sofre perdas de fenda dependentes de $$\lambda$$ e é sensível à centragem e ao *seeing*.

**Espectroscopia sem fenda** (*slitless*): dispersa o campo inteiro sem fenda; cada fonte gera o seu espectro sobre o fundo do céu disperso. É a única opção prática para espectroscopia de levantamento no espaço (grisms do HST e do JWST, Euclid), ao custo de contaminação entre espectros vizinhos e de um fundo de céu alto.
