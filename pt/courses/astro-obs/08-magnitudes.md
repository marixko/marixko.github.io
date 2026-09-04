---
title: "2.2 - O sistema de magnitudes"
course: astro-obs
---

## Por que os astrônomos contam ao contrário

A astronomia herdou de Hipparco uma escala de brilho logarítmica, invertida e centenária. Ela sobreviveu porque é conveniente: o olho e o detector respondem a razões de fluxo, os erros ficam aproximadamente aditivos, e diferenças de magnitude são independentes de calibração absoluta. Esta aula formaliza o sistema.

### Conteúdo

- A definição de Pogson
- Pontos de zero
- Magnitude aparente e absoluta
- Módulo de distância
- Os sistemas Vega, AB e ST
- Magnitude bolométrica

## A definição de Pogson

Norman Pogson fixou a escala impondo que **5 magnitudes correspondem a um fator exato de 100 em fluxo**. Logo, uma diferença de magnitude entre duas fontes é

$$
m_1 - m_2 = -2{,}5 \,\log_{10}\!\left(\frac{F_1}{F_2}\right).
$$

O sinal negativo preserva a convenção antiga: **mais brilhante, menor magnitude**. Um fator de 2,512 em fluxo é uma magnitude; a olho nu enxergamos até $$m\approx 6$$, o Sol tem $$m\approx -26{,}7$$, os telescópios mais fundos chegam a $$m\approx 30$$.

## Pontos de zero

A fórmula acima só dá **diferenças**. Para uma escala absoluta escolhe-se um fluxo de referência $$F_0$$ (o **ponto de zero**, *zero point*):

$$
m = -2{,}5\,\log_{10}\!\left(\frac{F}{F_0}\right) = -2{,}5\,\log_{10} F + \mathrm{ZP}.
$$

O que distingue os "sistemas de magnitude" (Vega, AB, ST) é exatamente **a escolha de $$F_0$$**. Na redução de dados, o ponto de zero instrumental é o número que converte as contagens medidas em magnitudes calibradas, e é ele que se determina com estrelas padrão (aula 4.5).

## Magnitude aparente e absoluta

A **magnitude aparente** $$m$$ mede o fluxo que chega até nós, e portanto mistura a luminosidade da fonte com a sua distância. A **magnitude absoluta** $$M$$ remove a distância: é a magnitude aparente que o objeto teria se estivesse a **10 parsecs**, sem extinção. Como o fluxo cai com $$d^{-2}$$,

$$
m - M = 5\,\log_{10}\!\left(\frac{d}{10\ \text{pc}}\right) = 5\,\log_{10} d\,[\text{pc}] - 5.
$$

## Módulo de distância

A quantidade $$\mu \equiv m - M$$ é o **módulo de distância**, e é a moeda corrente da escala de distâncias: $$\mu=0$$ a 10 pc, $$\mu\approx 18{,}5$$ para a Grande Nuvem de Magalhães, $$\mu\approx 31$$ para o aglomerado de Virgo. Na presença de extinção $$A$$ (aula 2.5), a relação vira

$$
m - M = 5\,\log_{10} d\,[\text{pc}] - 5 + A,
$$

e ignorar $$A$$ superestima a distância.

## Os sistemas Vega, AB e ST

**Sistema Vega.** Define $$F_0$$ em cada banda como o fluxo da estrela Vega (A0 V), de modo que Vega tem magnitude $$\approx 0$$ em todas as bandas por construção. É o sistema histórico do Johnson-Cousins e do infravermelho próximo. Desvantagem: exige um modelo espectral de Vega para converter magnitudes em fluxo físico.

**Sistema AB.** Define um ponto de zero **constante em $$f_\nu$$**:

$$
m_\text{AB} = -2{,}5\,\log_{10}\!\left(\frac{f_\nu}{3631\ \text{Jy}}\right) = -2{,}5\,\log_{10} f_\nu\,[\text{erg s}^{-1}\text{cm}^{-2}\text{Hz}^{-1}] - 48{,}60.
$$

Uma fonte de $$f_\nu$$ constante tem a mesma magnitude AB em toda banda. É o sistema do SDSS, do Pan-STARRS e da maioria dos levantamentos modernos, porque a conversão para fluxo físico é imediata.

**Sistema ST.** Análogo, mas com ponto de zero constante em $$f_\lambda$$ ($$3{,}63\times 10^{-9}\ \text{erg s}^{-1}\text{cm}^{-2}\text{\AA}^{-1}$$). Usado sobretudo no contexto do Hubble.

As diferenças $$m_\text{AB}-m_\text{Vega}$$ são tabeladas por banda: pequenas no visível ($$\sim 0$$ em $$V$$), grandes no infravermelho ($$\approx 1{,}9$$ em $$K$$).

## Magnitude bolométrica

A **magnitude bolométrica** $$M_\text{bol}$$ corresponde à luminosidade total integrada. O ponto de zero é fixado por convenção da IAU de forma que $$M_{\text{bol},\odot} = 4{,}74$$ (equivalente a $$L_\odot = 3{,}828\times 10^{33}\ \text{erg/s}$$). Então

$$
M_\text{bol} - M_{\text{bol},\odot} = -2{,}5\,\log_{10}\!\left(\frac{L}{L_\odot}\right).
$$

Como não se mede o espectro inteiro, na prática $$M_\text{bol} = M_V + \mathrm{BC}_V$$, onde a **correção bolométrica** $$\mathrm{BC}_V$$ vem de modelos e depende da temperatura efetiva (aula 2.4). Ela é sempre negativa ou nula, porque a banda $$V$$ captura apenas parte da luz.
