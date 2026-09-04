---
title: "5.6 - Medidas espectrais: velocidades radiais e larguras de linha"
course: astro-obs
---

## O que sai de um espectro calibrado

Com um espectro em $$f_\lambda$$ e escala de $$\lambda$$ confiável, extraem-se as grandezas físicas: redshift, velocidade radial, larguras equivalentes, dispersão de velocidades, fluxos de linhas de emissão. Esta aula reúne as medidas mais comuns e as suas incertezas.

### Conteúdo

- Identificação de linhas e redshift
- Velocidade radial por correlação cruzada
- Largura equivalente e abundâncias
- Perfis de linha e cinemática
- Linhas de emissão e diagnósticos
- Velocidade radial de precisão

## Identificação de linhas e redshift

Cada linha atômica ou molecular tem um comprimento de onda de repouso $$\lambda_0$$. Se as linhas observadas estão em $$\lambda_\text{obs}$$, o **redshift** é

$$
1 + z = \frac{\lambda_\text{obs}}{\lambda_0}, \qquad
z = \frac{\lambda_\text{obs} - \lambda_0}{\lambda_0}.
$$

Para $$z \ll 1$$, $$z \approx v/c$$ (velocidade radial em unidades de $$c$$); para $$z$$ grande vale a fórmula relativística. Identifica-se o redshift procurando um **padrão** de linhas que caiba: o dubleto de [OII], o tripleto de Ca, as linhas de Balmer, o *break* de $$4000\ \text{\AA}$$. Uma única linha é ambígua; o padrão não.

## Velocidade radial por correlação cruzada

Para medir $$v_r$$ com precisão, não se usa uma linha só, mas **todas ao mesmo tempo**, por **correlação cruzada** (Tonry & Davis 1979) entre o espectro observado e um **template** (uma estrela de tipo semelhante, ou um modelo). O pico da função de correlação cruzada, em função do deslocamento em $$\ln\lambda$$, dá o desvio Doppler; a largura e a altura do pico dão a incerteza. A precisão escala como

$$
\sigma_{v} \sim \frac{c}{R\,\sqrt{N_\text{linhas}}\,(S/N)},
$$

ou seja, melhora com resolução, com número de linhas e com S/N. Sempre aplicar a **correção baricêntrica** (aula 5.3) e verificar o ponto de zero com padrões de velocidade radial de valor conhecido. Espectros de galáxias usam a mesma ideia com um template estelar convoluído por uma **função de alargamento** (a dispersão de velocidades, abaixo).

## Largura equivalente e abundâncias

A **largura equivalente** de uma linha de absorção mede quanta luz do contínuo ela retira:

$$
W_\lambda = \int \left(1 - \frac{F_\lambda}{F_\text{cont}}\right) d\lambda,
$$

a largura de um retângulo de profundidade total ($$F=0$$) e mesma área que a linha. É independente da resolução (enquanto a linha estiver contida na janela) e da calibração absoluta de fluxo. A **curva de crescimento** relaciona $$W_\lambda$$ à densidade de coluna do elemento: linear em regime fraco, achatada (saturada) em regime intermediário, e $$\propto \sqrt{\ln}$$ no regime de asas de amortecimento. É a base da determinação de **abundâncias químicas** estelares, junto com modelos de atmosfera e a força de oscilador de cada transição.

## Perfis de linha e cinemática

A **forma** da linha carrega a cinemática do gás ou das estrelas:

- **Dispersão de velocidades** $$\sigma_v$$: em uma galáxia, as absorções estelares são a soma de espectros de milhões de estrelas com velocidades distintas; a linha aparece alargada por $$\sigma_v$$. Mede-se ajustando um template estelar convoluído por uma gaussiana (ou pela LOSVD completa, com códigos como o **pPXF**), depois de remover a LSF do instrumento em quadratura. $$\sigma_v$$ entra na relação $$M$$–$$\sigma$$ e em estimativas de massa.
- **Curvas de rotação e campos de velocidade**: a posição da linha ao longo da fenda longa (ou pixel a pixel num cubo de IFS) dá $$v_r(x,y)$$, de onde saem rotação, dispersão, fluxos e assimetrias.
- **Largura de linhas de emissão** em AGN: separa o "*broad line region*" ($$\sim$$ milhares de km/s) do "*narrow line region*" ($$\sim$$ centenas), base da classificação Seyfert 1/2 e do *reverberation mapping*.

## Linhas de emissão e diagnósticos

Para gás ionizado (regiões HII, nebulosas planetárias, AGN), medem-se **fluxos** das linhas ajustando gaussianas sobre o contínuo. Razões de linhas são diagnósticos poderosos:

- **[OIII]$$\lambda 5007$$/H$$\beta$$** contra **[NII]$$\lambda 6584$$/H$$\alpha$$**: o diagrama **BPT**, que separa fotoionização por estrelas de fotoionização por AGN e choques.
- **[SII]** e **[OII]** para densidade eletrônica; **[OIII]$$\lambda 4363$$/$$\lambda 5007$$** para temperatura eletrônica e daí abundâncias pelo "método direto".
- **Decremento de Balmer** H$$\alpha$$/H$$\beta$$: o valor teórico do caso B é $$\approx 2{,}86$$; um valor maior mede a extinção pela poeira (aula 2.5), com a vantagem de as duas linhas estarem no mesmo espectro.

## Velocidade radial de precisão

Para detectar exoplanetas pela reflexa da estrela ($$\sim\text{m/s}$$ a $$\text{cm/s}$$) é preciso combater a instabilidade instrumental:

- **Célula de iodo**: uma cubeta de $$\text{I}_2$$ no feixe imprime um espectro de referência denso e estável **sobre** o da estrela, servindo de régua de $$\lambda$$ e de sonda da LSF.
- **Espectrógrafos estabilizados** (HARPS, ESPRESSO): em vácuo, temperatura controlada a mK, alimentados por fibra com *scrambling*, calibrados por lâmpada ou por **pente de frequência** de laser.

O piso de precisão hoje não é instrumental, mas **astrofísico**: manchas, granulação e oscilações da própria estrela produzem sinais de velocidade radial que imitam ou escondem planetas, e separá-los é um problema ativo.
