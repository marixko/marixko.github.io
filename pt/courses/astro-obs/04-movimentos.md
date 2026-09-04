---
title: "1.4 - Precessão, nutação, aberração e movimento próprio"
course: astro-obs
---

## Coordenadas mudam com o tempo

A ascensão reta e a declinação de uma estrela não são constantes. Vários efeitos, uns do observador, outros da própria estrela, deslocam as coordenadas ao longo do tempo. Ignorá-los leva a erros de dezenas de segundos de arco, grandes o suficiente para pôr o alvo fora da fenda de um espectrógrafo ou para associar a fonte errada entre dois catálogos.

### Conteúdo

- Precessão dos equinócios
- Nutação
- Aberração da luz
- Paralaxe anual
- Movimento próprio e velocidade radial
- Época, equinócio e o sistema ICRS

## Precessão dos equinócios

O torque do Sol e da Lua sobre o bojo equatorial da Terra faz o eixo de rotação **precessar**, descrevendo um cone de semiângulo $$\varepsilon\approx 23{,}4^\circ$$ com período de cerca de **25\,800 anos**. O ponto vernal desliza ao longo da eclíptica a

$$
\approx 50{,}3''\ \text{por ano} \approx 1^\circ\ \text{a cada 72 anos}.
$$

Como o ponto vernal é a origem da ascensão reta e o equador é a referência da declinação, **todas** as coordenadas equatoriais variam de forma sistemática. Por isso um catálogo precisa declarar o **equinócio** ao qual as coordenadas estão referidas (B1950, J2000). A precessão é previsível e se corrige com fórmulas ou matrizes de rotação padronizadas.

## Nutação

Sobreposta à precessão suave há uma oscilação pequena e periódica do eixo, a **nutação**, causada principalmente pela inclinação variável da órbita lunar. A componente dominante tem amplitude de cerca de $$9''$$ e período de **18,6 anos**. Junto com a precessão, define a diferença entre coordenadas **médias** (só precessão) e **verdadeiras** (precessão + nutação) de uma data.

## Aberração da luz

Por causa da velocidade finita da luz, um observador em movimento vê a fonte deslocada **na direção do seu movimento**, como a chuva que parece vir de frente quando corremos. Para a **aberração anual**, devida à velocidade orbital da Terra $$v\approx 29{,}8\ \text{km/s}$$, o deslocamento máximo é

$$
\theta_\text{max} = \frac{v}{c} \approx 20{,}5''.
$$

O efeito é anual e traça uma pequena elipse na posição aparente de cada estrela ao longo do ano. Há ainda a **aberração diurna** (rotação da Terra, até $$0{,}3''$$) e a correção pela velocidade do próprio alvo. A aberração não depende da distância, o que a distingue da paralaxe.

## Paralaxe anual

Conforme a Terra orbita o Sol, uma estrela próxima parece descrever uma elipse contra o fundo de estrelas distantes. O semieixo maior dessa elipse é a **paralaxe** $$\varpi$$, e define a distância:

$$
d\ [\text{pc}] = \frac{1}{\varpi\ [\text{arcsec}]}.
$$

Uma estrela a $$1\ \text{pc}$$ teria $$\varpi = 1''$$; nenhuma está tão perto (Proxima Centauri tem $$\varpi\approx 0{,}77''$$). A missão Gaia mede paralaxes com incerteza de dezenas de microssegundos de arco para mais de um bilhão de estrelas. Ao contrário da aberração, a paralaxe **depende da distância** e é a base de toda a escala de distâncias.

## Movimento próprio e velocidade radial

As estrelas se movem de verdade pela Galáxia. A projeção desse movimento no plano do céu é o **movimento próprio** $$\mu$$, em geral dado por componentes $$\mu_{\alpha^*} = \mu_\alpha\cos\delta$$ e $$\mu_\delta$$, em mas/ano. A componente ao longo da linha de visada é a **velocidade radial** $$v_r$$, medida pelo deslocamento Doppler das linhas espectrais (aula 5.6). Juntas,

$$
v_\text{tan} = 4{,}74\,\mu\,[\text{arcsec/ano}]\,d\,[\text{pc}]\ \ \text{km/s}, \qquad
v_\text{espacial} = \sqrt{v_\text{tan}^2 + v_r^2}.
$$

Barnard's Star, com $$\mu\approx 10{,}3''/\text{ano}$$, atravessa o diâmetro da Lua em menos de 200 anos. Para a maioria das fontes o movimento próprio é desprezível numa única noite, mas acumula ao longo de décadas e precisa ser propagado ao comparar catálogos de épocas distintas.

## Época, equinócio e o sistema ICRS

Duas datas descrevem uma posição catalogada:

- **Equinócio**: a orientação dos eixos (equador e ponto vernal) usada como referência. Fixo por convenção (J2000).
- **Época**: a data em que a posição foi medida, relevante por causa do movimento próprio e da paralaxe.

O padrão moderno é o **ICRS** (*International Celestial Reference System*), um sistema **cinemático** ancorado nas posições de quasares extragalácticos observados por VLBI, sem rotação mensurável e independente da dinâmica da Terra. Suas coordenadas praticamente coincidem com as equatoriais J2000, mas conceitualmente não dependem mais de equador nem de equinócio. O catálogo Gaia materializa o ICRS no óptico. Na prática: para apontar o telescópio hoje, parte-se da posição ICRS na época do catálogo, aplica-se movimento próprio e paralaxe até a data da observação, e então precessão, nutação, aberração e refração para chegar às coordenadas aparentes.
