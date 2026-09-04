---
title: "3.4 - Detectores no infravermelho e contagem de fótons"
course: astro-obs
---

## Além do silício

O silício deixa de absorver fótons com $$\lambda \gtrsim 1{,}1\ \mu\text{m}$$, então o infravermelho exige outros materiais e outra arquitetura de detector. E, além do detector, o infravermelho térmico traz um problema novo: **tudo em volta brilha**. Esta aula cobre os detectores IR e faz um apanhado dos detectores em outras faixas.

### Conteúdo

- Materiais e arquitetura dos arrays IR
- Leitura não destrutiva
- O fundo térmico
- Chopping e nodding
- Persistência e anomalias
- Detectores em outras faixas

## Materiais e arquitetura dos arrays IR

Os detectores IR usam semicondutores de *gap* menor: **HgCdTe** (mercúrio-cádmio-telúrio, as famílias HAWAII e H2RG) cobre $$0{,}8$$–$$2{,}5\ \mu\text{m}$$ (ou até $$5\ \mu\text{m}$$ com composição ajustada), e **InSb** cobre até $$\sim 5{,}5\ \mu\text{m}$$. No infravermelho médio ($$5$$–$$28\ \mu\text{m}$$) usam-se **Si:As** e outros semicondutores extrínsecos.

A arquitetura é diferente do CCD: em vez de transferir carga, cada pixel tem o seu próprio circuito e é conectado, por microssoldas de índio, a um **multiplexador CMOS** que endereça e lê os pixels individualmente (detector **híbrido**). Não há transferência de carga ao longo do chip, então raios cósmicos e defeitos não deixam rastros, e é possível **ler apenas uma janela** com cadência alta.

## Leitura não destrutiva

Como a leitura não esvazia o pixel, pode-se **ler o mesmo pixel várias vezes durante a exposição** sem interrompê-la. Isso permite esquemas que reduzem o ruído de leitura efetivo:

- **Correlated double sampling (CDS)**: lê logo após o *reset* e de novo no fim; a diferença cancela a incerteza do nível de *reset*.
- **Fowler sampling**: várias leituras no início e várias no fim, promediadas.
- **Up-the-ramp**: leituras igualmente espaçadas durante toda a exposição, e ajusta-se uma reta cuja inclinação é a taxa de fótons. Um bônus: pixels atingidos por raio cósmico mostram um "degrau" e podem ser corrigidos, e pixels saturados são identificados pela quebra da linearidade.

## O fundo térmico

Qualquer corpo a temperatura $$T$$ irradia como um corpo negro com pico em $$\lambda_\text{max} \approx 2900/T\ \mu\text{m}\cdot\text{K}$$. A $$T = 280\ \text{K}$$ (o telescópio, a cúpula, a atmosfera), isso significa emissão intensa a partir de $$\sim 3\ \mu\text{m}$$. Consequências práticas:

- Na banda $$K$$ ($$2{,}2\ \mu\text{m}$$) o fundo já é dominado pela emissão térmica do telescópio e da atmosfera; em $$L$$ e $$M$$ ($$3$$–$$5\ \mu\text{m}$$) o fundo é esmagador.
- O **instrumento inteiro** precisa ser criogênico (resfriado a dezenas de kelvin), com janelas frias e paradas de campo frias, para não ver a sua própria emissão.
- A **emissividade** do telescópio (poeira nos espelhos, quantidade de superfícies) vira um parâmetro de projeto: cada 1% de emissividade adiciona fundo.
- As exposições individuais são **curtas** (segundos), para não saturar no fundo, e centenas são combinadas.

## Chopping e nodding

Para medir uma fonte fraca sobre um fundo enorme e variável, aplica-se subtração diferencial rápida:

- **Chopping**: o secundário oscila alguns hertz entre a posição da fonte e uma posição vizinha de céu; a diferença cancela o fundo comum, que varia devagar.
- **Nodding**: o telescópio inteiro é movido periodicamente entre duas posições, para cancelar o gradiente residual introduzido pelo próprio *chopping* (as duas posições do secundário veem caminhos ópticos ligeiramente diferentes).

No IR próximo do solo, onde o fundo é sobretudo linhas de OH variáveis, a técnica equivalente é o **dithering**: mover o alvo entre várias posições no detector e usar a mediana das imagens como estimativa do céu.

## Persistência e anomalias

- **Persistência** (*image persistence*): cargas presas em armadilhas do material são liberadas devagar, deixando uma "imagem fantasma" de fontes brilhantes nas exposições seguintes, por minutos a horas. Mitiga-se evitando saturação e descartando as primeiras exposições após um alvo brilhante.
- **Reset anomaly**: os primeiros instantes após o *reset* têm comportamento não linear; a primeira leitura é descartada.
- **Interpixel capacitance** e **brighter-fatter**: acoplamento elétrico entre pixels que espalha o sinal e alarga a PSF das fontes brilhantes.

## Detectores em outras faixas

- **Ultravioleta**: placas de microcanais (MCP) e CCDs sensibilizados; contagem de fótons com marcação de tempo e posição.
- **Raios X**: CCDs operados como **espectrômetros** (a carga liberada por um fóton X é proporcional à sua energia, dando $$E$$ e posição por evento), e calorímetros criogênicos com resolução espectral de poucos eV.
- **Contagem de fótons no óptico**: fotomultiplicadoras (históricas), fotodiodos de avalanche (APD), **EMCCDs** (ganho de elétrons no registrador serial, para ruído de leitura sub-elétron em alta cadência) e **sCMOS** (baixo ruído, leitura rápida, usados em *lucky imaging* e domínio do tempo).
- **Submilimétrico e além**: bolômetros e **MKIDs** (detectores de indutância cinética), que medem energia e às vezes resolvem $$\lambda$$ por pixel.
