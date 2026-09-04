---
title: "1.2 - A esfera celeste e sistemas de coordenadas"
course: astro-obs
---

## A esfera celeste e sistemas de coordenadas

Para apontar um telescópio e para comparar catálogos precisamos de um jeito preciso de dizer **onde** um objeto está no céu. Como as distâncias não entram nesse problema, projetamos tudo sobre uma esfera de raio unitário, a **esfera celeste**, e trabalhamos com pares de ângulos.

### Conteúdo

- A esfera celeste e os círculos de referência
- Coordenadas horizontais
- Coordenadas equatoriais
- Ângulo horário e tempo sideral
- Coordenadas eclípticas e galácticas
- O triângulo astronômico e a massa de ar

## A esfera celeste e os círculos de referência

Sobre a esfera celeste definimos: o **horizonte** do observador, o **zênite** (ponto acima da cabeça) e o **nadir**; os **polos celestes**, prolongamento do eixo de rotação da Terra; o **equador celeste**, projeção do equador terrestre; e a **eclíptica**, o círculo máximo que o Sol percorre em um ano, inclinado de $$\varepsilon\approx 23{,}44^\circ$$ em relação ao equador. Os dois pontos onde a eclíptica cruza o equador são os **equinócios**; o equinócio de março, ou **ponto vernal** $$\gamma$$, é a origem das coordenadas equatoriais.

Um **círculo máximo** é a interseção da esfera com um plano que passa pelo centro; é a rota mais curta entre dois pontos na esfera. O **meridiano local** é o círculo máximo que passa pelos polos celestes e pelo zênite: um objeto está na sua altura máxima quando **cruza o meridiano** (culminação).

## Coordenadas horizontais

Ancoradas no observador e no instante:

- **Altura** $$h$$: ângulo acima do horizonte, de $$-90^\circ$$ a $$+90^\circ$$. A **distância zenital** é $$z = 90^\circ - h$$.
- **Azimute** $$A$$: ângulo ao longo do horizonte, medido em geral a partir do Norte para o Leste.

São as coordenadas naturais de uma montagem alt-azimutal e as que determinam a massa de ar e a refração. A desvantagem: mudam continuamente com a rotação da Terra e dependem da posição do observador.

## Coordenadas equatoriais

Ancoradas na esfera celeste, quase fixas para as estrelas:

- **Declinação** $$\delta$$: ângulo em relação ao equador celeste, de $$-90^\circ$$ a $$+90^\circ$$. É análoga à latitude.
- **Ascensão reta** $$\alpha$$: ângulo medido ao longo do equador a partir do ponto vernal $$\gamma$$, no sentido do movimento anual do Sol. É medida em **horas, minutos e segundos** ($$24^\text{h} = 360^\circ$$, logo $$1^\text{h}=15^\circ$$).

O par $$(\alpha,\delta)$$ de uma estrela muda lentamente (precessão, movimento próprio), por isso um catálogo sempre especifica a **época** e o **equinócio** de referência (hoje, o padrão é o sistema ICRS, praticamente coincidente com J2000).

## Ângulo horário e tempo sideral

Para relacionar $$(\alpha,\delta)$$ com $$(h,A)$$ usamos o **ângulo horário** $$H$$: a distância angular, medida ao longo do equador, entre o meridiano local e o círculo horário do objeto. Cresce com o tempo à taxa de rotação da Terra. Vale a relação fundamental

$$
H = \mathrm{TSL} - \alpha,
$$

onde $$\mathrm{TSL}$$ é o **tempo sideral local**, definido como o ângulo horário do ponto vernal. Em $$H=0$$ o objeto culmina; $$H<0$$ (a leste do meridiano) o objeto está subindo, $$H>0$$ descendo. O tempo sideral é o assunto da próxima aula.

## O triângulo astronômico e a massa de ar

O **triângulo astronômico** (ou de posição) tem vértices no polo celeste, no zênite e no objeto. Seus lados são $$90^\circ-\varphi$$ (colatitude do observador), $$90^\circ-\delta$$ e $$90^\circ-h=z$$; os ângulos nos vértices polo e zênite são $$H$$ e $$360^\circ-A$$. Aplicando a **lei dos cossenos da trigonometria esférica** ao lado $$z$$:

$$
\sin h = \sin\varphi\,\sin\delta + \cos\varphi\,\cos\delta\,\cos H.
$$

Esta é a equação que converte $$(\alpha,\delta)$$ e o instante em altura. Dela seguem consequências práticas:

- A altura de culminação é $$h_\text{max} = 90^\circ - \lvert\varphi-\delta\rvert$$.
- Um objeto é **circumpolar** (nunca se põe) se $$\delta > 90^\circ - \varphi$$ (hemisfério norte) e **nunca nasce** se $$\delta < -(90^\circ-\varphi)$$.
- A **massa de ar**, a espessura de atmosfera atravessada em unidades da espessura no zênite, é aproximadamente

$$
X \approx \sec z = \frac{1}{\sin h},
$$

válida até $$z\approx 60^\circ$$ ($$X\approx 2$$). Perto do horizonte a curvatura da atmosfera importa e usam-se fórmulas corrigidas (Hardie, Young). A massa de ar controla a extinção atmosférica e a refração diferencial, tratadas na aula 1.5.

## Coordenadas eclípticas e galácticas

Dois outros sistemas, escolhidos pela conveniência do problema:

- **Eclípticas** $$(\lambda,\beta)$$: latitude e longitude medidas a partir da eclíptica e do ponto vernal. Naturais para objetos do Sistema Solar e para a luz zodiacal.
- **Galácticas** $$(l,b)$$: longitude e latitude medidas a partir do plano da Via Láctea, com origem na direção do centro galáctico. Naturais para estrutura galáctica e para mapear a extinção interestelar.

A conversão entre quaisquer dois sistemas é uma rotação, aplicada com as mesmas fórmulas de trigonometria esférica, e hoje está embutida em bibliotecas como `astropy.coordinates`.
