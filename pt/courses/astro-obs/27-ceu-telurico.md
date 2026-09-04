---
title: "5.4 - Subtração de céu e correção telúrica"
course: astro-obs
---

## O que a atmosfera adiciona e o que ela tira

Em espectroscopia, a atmosfera contamina o dado de duas formas: **emite** o seu próprio espectro, que se soma ao do objeto, e **absorve** bandas inteiras, que se multiplicam sobre o do objeto. As duas precisam ser removidas, e cada uma tem a sua técnica.

### Conteúdo

- O espectro do céu
- Subtração de céu em fenda longa
- Técnicas dedicadas
- Absorção telúrica
- Correção por estrela padrão telúrica
- Correção por modelo atmosférico

## O espectro do céu

O fundo do céu noturno num espectro tem:

- um **contínuo** fraco (luz zodiacal, luz estelar difusa, luminescência do ar, luar espalhado se houver Lua);
- **linhas de emissão** intensas: as bandas de **OH** (radical hidroxila) que dominam de $$\sim 0{,}6\ \mu\text{m}$$ até o IR próximo, a linha verde de **[OI]** $$557{,}7\ \text{nm}$$, o dubleto de **[OI]** $$630$$/$$636\ \text{nm}$$, o **Na** $$589\ \text{nm}$$ e o **O2** $$864\ \text{nm}$$.

As linhas de OH variam de **intensidade em escala de minutos** e não são resolvidas em baixa resolução, o que as torna a principal fonte de ruído no vermelho: mesmo bem subtraídas, deixam resíduos por causa da variabilidade e da subamostragem.

## Subtração de céu em fenda longa

Numa fenda longa, o céu está registrado **ao lado** do objeto, nas mesmas colunas de $$\lambda$$. O procedimento clássico:

1. em cada coluna de dispersão, selecionar as linhas espaciais **sem objeto**;
2. ajustar um polinômio de baixo grau (grau 1–2) ao longo da direção espacial, representando o gradiente suave do céu;
3. subtrair esse ajuste de todas as linhas, incluindo as do objeto.

Funciona bem quando o objeto é compacto e a fenda é longa o bastante para conter bastante céu limpo. Falha para objetos que preenchem a fenda (galáxias grandes) e para as linhas de OH mais fortes, onde pequenos erros de calibração de $$\lambda$$ e de perfil de linha (LSF) deixam resíduos em "P Cygni".

## Técnicas dedicadas

- **Nod-and-shuffle** (ou *beam-switching*): alterna-se a fonte entre duas posições na fenda a cada minuto, deslocando a carga no CCD em sincronia. A subtração A menos B usa céu tomado **quase ao mesmo tempo** e **no mesmo pixel**, cancelando a variabilidade de OH ao custo de metade do tempo e do dobro do ruído de leitura.
- **Fibras de céu**: em instrumentos de fibra, dezenas de fibras apontam para céu vazio; o céu de cada fibra de objeto é reconstruído a partir delas, corrigindo diferenças de transmissão fibra a fibra.
- **Subtração por PCA** (método de Kelson): em vez de reamostrar o céu para o referencial do objeto (o que introduz erro), modela-se o céu na grade nativa de cada pixel e ajustam-se poucas componentes principais que capturam a variação de intensidade e de perfil das linhas.

## Absorção telúrica

Moléculas da atmosfera absorvem bandas do espectro:

- **O2**: banda A ($$\sim 760\ \text{nm}$$, profunda e estruturada), banda B ($$\sim 690\ \text{nm}$$).
- **H2O**: muitas bandas de $$\sim 590\ \text{nm}$$ ao IR, com profundidade que varia com a **coluna de vapor d'água** (PWV), ou seja, com a noite e com a hora.
- **CO2, CH4, O3**: bandas adicionais, sobretudo no IR.

A absorção é **multiplicativa** e depende da **massa de ar** (mais atmosfera, mais absorção) e do tempo (o vapor d'água muda). Ignorá-la simula linhas espectrais que não existem no objeto.

## Correção por estrela padrão telúrica

O método observacional:

1. Observar, logo antes ou depois do alvo e na **mesma massa de ar**, uma **estrela telúrica**: quente (A0 V ou similar) e de espectro quase sem linhas na região de interesse, ou uma anã G próxima usada como "solar analog".
2. Dividir o espectro do alvo pelo da telúrica: as bandas atmosféricas, comuns aos dois, cancelam.
3. Antes de dividir, **remover as linhas intrínsecas da telúrica** (as linhas de hidrogênio da A0 V, por exemplo) interpolando o contínuo, e **reescalar** as profundidades das bandas para a massa de ar exata do alvo.

Limitações: exige tempo de telescópio extra, casa mal quando a PWV muda entre as duas observações, e a telúrica raramente está exatamente na mesma massa de ar.

## Correção por modelo atmosférico

A alternativa moderna é **modelar** a transmissão atmosférica com um código de transferência radiativa (`molecfit`, `telfit`, `TelFit`), que ajusta a coluna de cada molécula, a massa de ar e a LSF do instrumento diretamente ao **próprio espectro do alvo**, usando as regiões com bandas telúricas. Vantagens: dispensa a estrela padrão, usa a atmosfera real do instante, e funciona mesmo quando não há telúrica adequada. É hoje o padrão em espectroscopia de IR próximo e cada vez mais no óptico vermelho.
