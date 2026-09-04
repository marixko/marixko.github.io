---
title: "2.3 - Sistemas fotométricos e filtros"
course: astro-obs
---

## O que é um sistema fotométrico

Uma magnitude só tem sentido se dissermos **em que banda** ela foi medida, e "banda" aqui é mais do que um filtro de vidro: é a combinação de tudo o que fica entre a fonte e a contagem final. Esta aula define a função de resposta total, apresenta os principais sistemas e explica como comparar medidas de instrumentos diferentes.

### Conteúdo

- A função de resposta total
- Comprimento de onda efetivo e largura de banda
- Sistemas de banda larga, média e estreita
- Os principais sistemas fotométricos
- Sistema natural e sistema padrão
- Fotometria sintética

## A função de resposta total

A probabilidade de um fóton de comprimento de onda $$\lambda$$ produzir um elétron contado é o produto de vários fatores:

$$
S(\lambda) = T_\text{atm}(\lambda)\; R_\text{opt}(\lambda)\; T_\text{filtro}(\lambda)\; \mathrm{QE}(\lambda),
$$

onde $$T_\text{atm}$$ é a transmissão da atmosfera (depende da massa de ar), $$R_\text{opt}$$ reúne as reflexões dos espelhos e as transmissões das lentes, $$T_\text{filtro}$$ é a curva do filtro e $$\mathrm{QE}$$ é a eficiência quântica do detector. É $$S(\lambda)$$, não só o filtro, que define a banda.

Como os detectores modernos **contam fótons**, e não energia, o número de contagens de uma fonte de fluxo $$f_\lambda$$ é

$$
N \propto \int f_\lambda \, S(\lambda) \, \frac{\lambda}{hc}\, d\lambda,
$$

com o fator $$\lambda/hc$$ convertendo energia em número de fótons. Detectores bolométricos (calorímetros de raios X, alguns instrumentos de rádio) integram energia e não levam esse fator.

## Comprimento de onda efetivo e largura de banda

Duas quantidades resumem uma banda. O **comprimento de onda efetivo** é a média de $$\lambda$$ ponderada pela resposta e pelo espectro da fonte:

$$
\lambda_\text{eff} = \frac{\int \lambda\, f_\lambda\, S(\lambda)\,\lambda\, d\lambda}{\int f_\lambda\, S(\lambda)\,\lambda\, d\lambda}.
$$

Ele depende (fracamente) da cor da fonte: uma estrela vermelha tem $$\lambda_\text{eff}$$ ligeiramente maior que uma azul na mesma banda. A **largura equivalente** ou FWHM da curva dá a resolução espectral $$R = \lambda/\Delta\lambda$$, que é $$\sim 4$$–$$7$$ para banda larga e $$\gtrsim 50$$ para banda estreita.

## Sistemas de banda larga, média e estreita

- **Banda larga** ($$\Delta\lambda/\lambda \sim 20\%$$): máximo de fótons, usada para detectar fontes fracas e medir cores contínuas. Ex.: $$UBVRI$$, $$ugriz$$.
- **Banda média** ($$\sim 5\%$$): compromisso entre profundidade e discriminação espectral. Ex.: Strömgren $$uvby$$, os 12 filtros do J-PLUS/S-PLUS.
- **Banda estreita** ($$\lesssim 1\%$$): centrada numa linha de emissão (H$$\alpha$$, [OIII], [SII]) ou numa característica fotosférica. Isola o sinal da linha, mas exige fontes brilhantes ou longas exposições.

Um sistema com muitas bandas médias funciona como um **espectro de baixíssima resolução** para milhões de objetos ao mesmo tempo, e é a base dos levantamentos fotométricos modernos de *photo-z*.

## Os principais sistemas fotométricos

| Sistema | Bandas | Faixa | Ponto de zero |
| --- | --- | --- | --- |
| Johnson-Cousins | $$U\,B\,V\,R_C\,I_C$$ | $$0{,}36$$–$$0{,}9\ \mu\text{m}$$ | Vega |
| SDSS / modernos | $$u\,g\,r\,i\,z$$ | $$0{,}35$$–$$1{,}0\ \mu\text{m}$$ | AB |
| Pan-STARRS | $$g\,r\,i\,z\,y$$ | $$0{,}4$$–$$1{,}0\ \mu\text{m}$$ | AB |
| 2MASS | $$J\,H\,K_s$$ | $$1{,}2$$–$$2{,}2\ \mu\text{m}$$ | Vega |
| Gaia | $$G\,G_\text{BP}\,G_\text{RP}$$ | $$0{,}33$$–$$1{,}05\ \mu\text{m}$$ | Vega (e AB) |
| WISE | $$W1$$–$$W4$$ | $$3{,}4$$–$$22\ \mu\text{m}$$ | Vega |

Cada um tem a sua história instrumental, e os $$\lambda_\text{eff}$$ e larguras não coincidem, mesmo quando os nomes das bandas se parecem (o $$R$$ de Johnson e o $$r$$ do SDSS são bem diferentes).

## Sistema natural e sistema padrão

O **sistema natural** de um instrumento é a fotometria como sai da sua própria $$S(\lambda)$$. O **sistema padrão** é a definição de referência (por exemplo, o sistema Landolt para $$UBVRI$$). Para converter um no outro, ajustam-se **equações de transformação** com termos de cor:

$$
V_\text{padrão} = v_\text{natural} + \mathrm{ZP} + c_1\,(b-v) + c_2\,(b-v)^2 + \dots,
$$

onde $$v$$, $$b$$ são as magnitudes instrumentais e $$(b-v)$$ é a cor instrumental. Os **termos de cor** $$c_i$$ corrigem o fato de a banda do instrumento não ser idêntica à padrão: o efeito depende do espectro da fonte, e a cor é o melhor indicador disponível desse espectro. Instrumentos bem casados com o padrão têm $$c_i$$ pequenos.

## Fotometria sintética

Se conhecemos $$S(\lambda)$$ e um espectro calibrado $$f_\lambda$$, podemos **calcular** a magnitude que seria medida, integrando a fórmula das contagens e aplicando o ponto de zero do sistema. Isso é a **fotometria sintética**, e serve para: prever cores de modelos estelares, transferir a calibração de poucos espectrofotométricos padrão para milhares de estrelas, comparar sistemas diferentes sem observar, e construir os termos de cor acima a partir de bibliotecas espectrais. Ferramentas como `pyphot`, `sedpy` e o SVO Filter Profile Service tornam isso rotina.
