---
title: "2.1 - Grandezas radiométricas: fluxo, intensidade e brilho superficial"
course: astro-obs
---

## Medir quanta luz chega

Antes de falar em magnitudes, é preciso definir com cuidado as grandezas físicas que descrevem um campo de radiação. Esta aula estabelece intensidade, fluxo, luminosidade e brilho superficial, e a relação entre elas.

### Conteúdo

- Intensidade específica
- Densidade de fluxo
- Luminosidade e a lei do inverso do quadrado
- Brilho superficial
- Grandezas monocromáticas e bolométricas
- Unidades e a conversão $$f_\lambda \leftrightarrow f_\nu$$

## Intensidade específica

A grandeza fundamental é a **intensidade específica** $$I_\nu$$: a energia que atravessa uma área $$dA$$, por intervalo de tempo $$dt$$, por intervalo de frequência $$d\nu$$, dentro de um ângulo sólido $$d\Omega$$ em torno de uma dada direção, para radiação que faz ângulo $$\theta$$ com a normal:

$$
dE = I_\nu \,\cos\theta \; dA \; dt \; d\nu \; d\Omega.
$$

Unidades: $$\text{erg s}^{-1}\,\text{cm}^{-2}\,\text{Hz}^{-1}\,\text{sr}^{-1}$$. A propriedade decisiva de $$I_\nu$$ é que, **no vácuo, ela é constante ao longo de um raio**. A intensidade que sai da superfície de uma estrela é a mesma que chega ao telescópio (a menos de absorção pelo meio). É por isso que o **brilho superficial** de um objeto extenso não depende da distância.

## Densidade de fluxo

O **fluxo** (ou densidade de fluxo) $$F_\nu$$ é a intensidade integrada sobre o ângulo sólido da fonte, ponderada pela projeção:

$$
F_\nu = \int I_\nu \,\cos\theta \; d\Omega.
$$

É a energia por unidade de tempo, área e frequência que cruza a abertura do telescópio, **somada sobre toda a fonte**. Para uma fonte pontual ou não resolvida, é isso que a fotometria mede. Unidades no óptico: $$\text{erg s}^{-1}\,\text{cm}^{-2}\,\text{Hz}^{-1}$$; em rádio, o **jansky**, $$1\ \text{Jy} = 10^{-23}\ \text{erg s}^{-1}\,\text{cm}^{-2}\,\text{Hz}^{-1}$$.

Para uma fonte pequena de raio angular tal que $$\cos\theta\approx 1$$, $$F_\nu \approx I_\nu\,\Delta\Omega$$: o fluxo é a intensidade vezes o ângulo sólido subtendido.

## Luminosidade e a lei do inverso do quadrado

A **luminosidade** $$L_\nu$$ é a energia total emitida pela fonte por unidade de tempo e frequência, uma propriedade intrínseca. Se a fonte emite isotropicamente e não há absorção, a mesma energia atravessa esferas de raio crescente, então

$$
F_\nu = \frac{L_\nu}{4\pi d^{2}}.
$$

Esta é a **lei do inverso do quadrado**, e é o que liga o que se mede ($$F_\nu$$) ao que se quer saber ($$L_\nu$$), desde que se conheça a distância $$d$$. Toda a dificuldade da escala de distâncias extragaláctica está aqui.

## Brilho superficial

Para um objeto **resolvido** (uma galáxia, uma nebulosa), a grandeza natural é o **brilho superficial**: o fluxo por unidade de ângulo sólido, ou seja, a própria intensidade média sobre a região considerada. Costuma ser expresso em $$\text{mag arcsec}^{-2}$$.

Como $$I_\nu$$ é invariante ao longo do raio, o brilho superficial **não muda com a distância** (enquanto o objeto continuar resolvido): uma galáxia duas vezes mais distante tem metade do tamanho angular em cada eixo, um quarto do ângulo sólido e um quarto do fluxo, mantendo o fluxo por unidade de ângulo sólido constante. O que cai com a distância é a capacidade de **resolver** o objeto, não o seu brilho superficial. (Em cosmologia há ainda o *dimming* de brilho superficial $$\propto (1+z)^{-4}$$, um efeito relativístico distinto.)

## Grandezas monocromáticas e bolométricas

As grandezas acima são **monocromáticas** (por unidade de frequência ou de comprimento de onda). Integrando sobre todo o espectro obtêm-se as versões **bolométricas**:

$$
F = \int_0^\infty F_\nu \, d\nu, \qquad L = \int_0^\infty L_\nu \, d\nu = 4\pi d^2 F.
$$

Na prática nunca se observa o espectro inteiro; a magnitude bolométrica é sempre reconstruída a partir de uma banda medida mais uma **correção bolométrica** modelada (aula 2.4).

## Unidades e a conversão $$f_\lambda \leftrightarrow f_\nu$$

O fluxo por unidade de comprimento de onda $$f_\lambda$$ e por unidade de frequência $$f_\nu$$ descrevem a mesma energia, então $$f_\lambda\,d\lambda = -f_\nu\,d\nu$$. Usando $$\nu = c/\lambda$$, $$\lvert d\nu \rvert = (c/\lambda^2)\,d\lambda$$:

$$
f_\lambda = \frac{c}{\lambda^{2}}\,f_\nu, \qquad
\lambda f_\lambda = \nu f_\nu.
$$

A quantidade $$\nu f_\nu = \lambda f_\lambda$$ é a energia por década logarítmica de frequência e é a forma usual de plotar uma distribuição espectral de energia (SED), porque o pico indica onde a fonte realmente irradia a maior parte da sua potência. Unidades comuns de $$f_\lambda$$ no óptico: $$\text{erg s}^{-1}\,\text{cm}^{-2}\,\text{\AA}^{-1}$$.
