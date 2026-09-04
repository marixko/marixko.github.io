---
title: "6.4 - Astronomia de domínio do tempo e curvas de luz"
course: astro-obs
---

## O céu que muda

Boa parte da astrofísica interessante acontece porque algo **varia**: estrelas pulsam, binárias eclipsam, planetas transitam, núcleos ativos flutuam, supernovas explodem, fontes transientes aparecem e somem. A astronomia de domínio do tempo mede $$f(t)$$ e extrai física dessa variação.

### Conteúdo

- Tipos de variabilidade
- A curva de luz e a cadência
- Fotometria de precisão no tempo
- Busca de periodicidade
- Detecção de transientes
- Astronomia multimensageira

## Tipos de variabilidade

- **Intrínseca**: pulsantes (Cefeidas, RR Lyrae, para distâncias), binárias eclipsantes (massas e raios), variáveis cataclísmicas e novas, erupções estelares, AGN e blazares, supernovas, eventos de disrupção de maré, surtos de raios gama.
- **Extrínseca** (a fonte não muda, a geometria sim): trânsitos planetários, ocultações por corpos do Sistema Solar, microlente gravitacional, rotação de asteroides, eclipses por discos e anéis.

Cada classe tem uma **amplitude**, uma **escala de tempo** e uma **forma de curva** características, e a estratégia de observação é escolhida a partir delas.

## A curva de luz e a cadência

Uma **curva de luz** é o fluxo (ou a magnitude) em função do tempo, idealmente em BJD para *timing* de precisão (aula 1.3). Três parâmetros do programa determinam o que se pode detectar:

- **Cadência** (intervalo entre pontos): fixa a escala de tempo mais rápida amostrável. Por Nyquist, é preciso $$\gtrsim 2$$ pontos por ciclo; sinais mais rápidos sofrem *aliasing*.
- **Linha de base** (duração total): fixa a menor frequência e a precisão do período (o erro no período escala como $$\propto 1/T_\text{base}$$).
- **Precisão por ponto**: fixa a menor amplitude detectável.

Um trânsito de $$0{,}5\%$$ de profundidade e $$3\ \text{h}$$ de duração exige precisão de milimagnitude, cadência de minutos e cobertura de vários eventos.

## Fotometria de precisão no tempo

Para curvas de luz, o inimigo não é o ruído de Poisson, mas a **sistemática correlacionada**: variações de massa de ar, de *seeing*, da posição da estrela no detector (imperfeições de flat), de temperatura. As defesas:

- **Fotometria diferencial**: medir o alvo em relação a estrelas de referência **do mesmo campo**, de brilho e cor semelhantes; efeitos comuns cancelam.
- **Fotometria de conjunto** (*ensemble*): usar muitas referências e um modelo que resolve simultaneamente para as magnitudes e para um termo de transparência por época.
- **Decorrelação**: modelar explicitamente a dependência do fluxo residual com massa de ar, posição $$(x,y)$$, largura da PSF, e remover.
- **Manter a estrela no mesmo pixel** (guiagem cuidadosa) e não deixar saturar.

## Busca de periodicidade

Para sinais periódicos com amostragem irregular (o caso normal em astronomia do solo), a ferramenta padrão é o **periodograma de Lomb-Scargle**, equivalente a ajustar uma senoide de cada frequência por mínimos quadrados. Alternativas: **minimização da dispersão de fase** (PDM), boa para curvas não senoidais, e **box least squares** (BLS), otimizado para o formato "caixa" de trânsitos.

Cuidados:

- **Falsos períodos por *aliasing***: picos espúrios em $$1\ \text{dia}$$, $$1\ \text{dia sideral}$$, $$1\ \text{mês lunar}$$ e nos batimentos com a frequência real, por causa da janela de amostragem.
- **Significância**: avaliar a probabilidade de falso alarme por permutação ou por simulações, não pela altura nominal do pico.
- **Harmônicos**: uma curva não senoidal produz picos em múltiplos da frequência fundamental.

## Detecção de transientes

O fluxo típico de um levantamento de transientes:

1. **Imagem de diferença** (aula 4.4) entre a nova imagem e uma referência profunda: sobra só o que mudou.
2. **Classificação real/bogus**: um classificador (hoje quase sempre uma rede neural) separa detecções reais de artefatos (raios cósmicos, dipolos de subtração mal casada, *spikes* de estrelas saturadas).
3. **Fluxo de alertas**: cada detecção real vira um pacote com posição, fotometria, histórico e recortes de imagem. ZTF gera $$\sim 10^6$$ alertas por noite; Rubin/LSST projeta $$\sim 10^7$$.
4. **Brokers**: sistemas que filtram, cruzam com catálogos, classificam e distribuem os alertas relevantes para cada comunidade científica.
5. **Follow-up**: primeiro fotométrico (classificar pela cor e pela evolução), depois espectroscópico para os alvos prioritários, com recursos escassos e sob pressão de tempo.

## Astronomia multimensageira

Alguns eventos são detectados por **canais não eletromagnéticos**: ondas gravitacionais (LIGO/Virgo/KAGRA), neutrinos (IceCube). A localização inicial é ruim (dezenas a centenas de graus quadrados para ondas gravitacionais), e a tarefa observacional é **vasculhar essa região** com câmeras de campo largo, cruzar as detecções com catálogos de galáxias, e identificar a contrapartida óptica pela sua evolução rápida e atípica. A quilonova AT2017gfo, contrapartida de GW170817, foi encontrada assim, em menos de 11 horas, por várias equipes independentes.
