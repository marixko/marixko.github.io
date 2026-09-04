---
title: "1.3 - Tempo e efemérides"
course: astro-obs
---

## Tempo e efemérides

Planejar uma observação é, antes de tudo, um problema de tempo: quando o alvo está alto, quando o céu está escuro, quando a Lua não atrapalha. Esta aula organiza as várias escalas de tempo usadas em astronomia e mostra como decidir se e quando um objeto é observável.

### Conteúdo

- Dia solar e dia sideral
- Tempo sideral local
- Escalas de tempo: UT, UTC, TAI, TT
- Data juliana
- Janela de observabilidade
- Crepúsculo e a Lua

## Dia solar e dia sideral

O **dia solar** é o intervalo entre duas passagens do Sol pelo meridiano: em média $$24^\text{h}$$ de tempo civil. O **dia sideral** é o intervalo entre duas passagens do ponto vernal pelo meridiano, ou seja, o período de rotação da Terra em relação às estrelas. Como a Terra também orbita o Sol, ela precisa girar um pouco mais que $$360^\circ$$ para o Sol voltar ao meridiano; o dia sideral é mais curto:

$$
1\ \text{dia sideral} \approx 23^\text{h}\,56^\text{m}\,04^\text{s} \approx 0{,}99727\ \text{dia solar}.
$$

Na prática: uma estrela nasce cerca de **4 minutos mais cedo a cada noite**, e o céu de uma dada hora avança um mês inteiro de constelações ao longo do ano.

## Tempo sideral local

O **tempo sideral local** (TSL) é o ângulo horário do ponto vernal, medido no meridiano do observador. É o relógio que diz o que está culminando: um objeto de ascensão reta $$\alpha$$ cruza o meridiano quando

$$
\mathrm{TSL} = \alpha, \qquad\text{e em geral}\qquad H = \mathrm{TSL} - \alpha.
$$

O TSL se obtém do **tempo sideral de Greenwich** (GST) mais a longitude do observador (em unidades de tempo, positiva para leste). O GST, por sua vez, é uma função quase linear da data juliana em UT1, tabelada e implementada em qualquer biblioteca astronômica.

## Escalas de tempo

Várias escalas coexistem porque medem coisas diferentes:

- **UT1**: tempo baseado na rotação real da Terra (ângulo de rotação). Irregular, porque a rotação da Terra desacelera e flutua.
- **TAI** (Tempo Atômico Internacional): contagem uniforme de segundos SI por relógios atômicos.
- **UTC**: escala civil. Segue o TAI no ritmo, mas recebe **segundos intercalares** (*leap seconds*) para nunca se afastar mais de $$0{,}9\ \text{s}$$ do UT1. É o que aparece nos cabeçalhos dos dados (`DATE-OBS`).
- **TT** (Tempo Terrestre): escala uniforme usada nas efemérides, $$\mathrm{TT} = \mathrm{TAI} + 32{,}184\ \text{s}$$.
- **TDB**: variante baricêntrica do TT, usada para tempos de chegada corrigidos ao baricentro do Sistema Solar (essencial para pulsares e velocidades radiais de precisão).

Para apontar o telescópio, a diferença $$\mathrm{UT1}-\mathrm{UTC}$$ (poucas décimas de segundo) raramente importa. Para *timing* de precisão, todas as conversões importam e devem ser feitas com cuidado.

## Data juliana

Contar dias do calendário é ruim para cálculos. A **data juliana** (JD) é a contagem contínua de dias (e frações) desde o meio-dia de 1 de janeiro de 4713 a.C. (calendário juliano). Diferenças de JD dão intervalos diretamente. Variantes úteis:

$$
\mathrm{MJD} = \mathrm{JD} - 2\,400\,000{,}5,
$$

que começa à meia-noite e tem menos dígitos, e o **BJD** (*Barycentric Julian Date*), corrigido do tempo de luz até o baricentro, obrigatório em curvas de luz de trânsitos e em séries de velocidade radial.

## Janela de observabilidade

Para um alvo $$(\alpha,\delta)$$ observado de uma latitude $$\varphi$$, a sequência de decisões é:

1. **O alvo sobe o suficiente?** A altura máxima é $$h_\text{max} = 90^\circ - \lvert\varphi-\delta\rvert$$. Como regra, exige-se $$h > 30^\circ$$ (massa de ar $$X < 2$$) para fotometria de qualidade.
2. **Quando ele está alto?** Ele culmina quando $$\mathrm{TSL}=\alpha$$. A janela útil é o intervalo de ângulo horário em torno disso em que $$X$$ fica abaixo do limite adotado, tipicamente $$\lvert H \rvert \lesssim 3^\text{h}$$ a $$4^\text{h}$$.
3. **Essa janela cai à noite?** É preciso cruzar a janela de ângulo horário com o intervalo entre os crepúsculos. Um alvo cuja culminação ocorre ao meio-dia só será observável meses depois.
4. **A Lua atrapalha?** Ver abaixo.

A "melhor época do ano" para um alvo é quando ele culmina por volta da meia-noite local, ou seja, quando $$\alpha$$ é oposta à ascensão reta do Sol.

## Crepúsculo e a Lua

O **crepúsculo** se classifica pela altura do Sol abaixo do horizonte: civil ($$-6^\circ$$), náutico ($$-12^\circ$$) e **astronômico** ($$-18^\circ$$), quando o céu atinge o brilho de fundo mínimo. A duração da noite astronômica varia com a latitude e a estação, e em latitudes altas pode desaparecer no verão.

A **Lua** é a principal fonte de contaminação: perto da lua cheia, o céu no óptico fica **vários magnitudes por segundo de arco quadrado** mais brilhante, o que inviabiliza alvos fracos e observações em banda azul. Os telescópios classificam as noites em *dark*, *grey* e *bright* conforme a fase e a distância angular do alvo à Lua, e alocam programas de acordo. No infravermelho a Lua incomoda muito menos.
