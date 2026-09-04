---
title: "6.1 - Rádio e milimétrico"
course: astro-obs
---

## Observar em ondas longas

A janela de rádio é a mais ampla do espectro acessível do solo, e a radioastronomia funciona segundo uma lógica diferente da óptica: o sinal é **coerente**, a fase é preservada, e o "detector" mede um campo elétrico, não fótons individuais. Esta aula cobre a observação com antena única; a interferometria vem na aula 6.2.

### Conteúdo

- A janela de rádio e a detecção coerente
- Temperatura de antena e de brilho
- O feixe de uma antena única
- Temperatura de sistema e a equação do radiômetro
- Modos de observação
- Milimétrico e submilimétrico

## A janela de rádio e a detecção coerente

A atmosfera é transparente aproximadamente de $$\sim 10\ \text{m}$$ (limite imposto pela ionosfera) a $$\sim 1\ \text{cm}$$ (onde começam as bandas de $$\text{H}_2\text{O}$$ e $$\text{O}_2$$). Nessa faixa, os receptores fazem **detecção coerente**: amplificam o campo elétrico captado pela antena preservando a fase, o que permite depois correlacionar sinais de antenas diferentes (interferometria) e fazer espectroscopia com resolução altíssima por transformada de Fourier do sinal temporal.

## Temperatura de antena e de brilho

Por tradição, o sinal em rádio é medido em **temperatura**, não em fluxo. No regime de Rayleigh-Jeans ($$h\nu \ll kT$$), válido em rádio, a intensidade de um corpo negro é $$I_\nu = 2kT\nu^2/c^2$$, linear em $$T$$. Define-se:

- **Temperatura de brilho** $$T_b$$: a temperatura de um corpo negro que teria a intensidade observada naquela direção e frequência. É uma propriedade da fonte.
- **Temperatura de antena** $$T_A$$: a potência que a antena entrega ao receptor, expressa como a temperatura de um resistor que entregaria a mesma potência. Relaciona-se a $$T_b$$ convoluída pelo feixe e multiplicada pela eficiência da antena.

O fluxo de uma fonte pontual em janskys se obtém de $$T_A$$ pela **ganho da antena** $$\Gamma$$ (em $$\text{K/Jy}$$), que depende da área efetiva: $$S = T_A/\Gamma$$.

## O feixe de uma antena única

A resolução angular de uma antena (o **feixe**, ou *beam*) é, como em qualquer abertura,

$$
\theta_\text{HPBW} \approx 1{,}2\,\frac{\lambda}{D}.
$$

Para uma antena de $$100\ \text{m}$$ em $$\lambda = 21\ \text{cm}$$: $$\theta \approx 9'$$. Comparado ao óptico, é péssimo, e é a razão de existir a interferometria. O **padrão de radiação** completo tem, além do lóbulo principal, **lóbulos laterais** por onde entra radiação de fora da direção apontada (o Sol, o solo), fonte de contaminação. A **eficiência de abertura** $$\eta_A$$ (0,5–0,7 tipicamente) mede quanto da área geométrica é efetivamente usada, e cai quando a superfície do prato tem erros comparáveis a $$\lambda$$.

## Temperatura de sistema e a equação do radiômetro

O ruído total do sistema, expresso em temperatura, é

$$
T_\text{sys} = T_\text{receptor} + T_\text{atm} + T_\text{solo} + T_\text{CMB} + T_\text{fonte},
$$

somando o ruído do amplificador, a emissão da atmosfera, o vazamento do solo pelos lóbulos laterais, o fundo cósmico e a própria fonte. A incerteza de uma medida de temperatura, após integrar por um tempo $$\tau$$ com uma banda $$\Delta\nu$$, é dada pela **equação do radiômetro**:

$$
\frac{\Delta T}{T_\text{sys}} = \frac{K}{\sqrt{\Delta\nu\,\tau}},
$$

com $$K$$ de ordem 1 (depende do esquema de observação). É o análogo em rádio da equação de S/N: a sensibilidade melhora como $$\sqrt{\Delta\nu\,\tau}$$, e por isso se usa a maior banda compatível com a ciência e integrações longas.

## Modos de observação

Como $$T_\text{sys}$$ é dominado por termos que **não** vêm da fonte, mede-se sempre por diferença:

- **Position switching**: alterna entre a fonte (ON) e uma posição vizinha de céu vazio (OFF); o espectro final é $$(\text{ON}-\text{OFF})/\text{OFF}$$.
- **Frequency switching**: desloca ligeiramente a frequência local entre duas fases; a linha se move, o contínuo instrumental não, e a diferença cancela a resposta de banda.
- **On-the-fly mapping**: varre a antena continuamente sobre a região, com um OFF de referência, construindo um mapa.
- **Beam switching**: com um receptor multi-feixe, dois feixes no céu ao mesmo tempo, um na fonte e outro fora.

Cuidados adicionais: o **limite de confusão** (fontes fracas não resolvidas dentro do feixe grande somam um fundo flutuante que não melhora com $$\tau$$) e a **interferência de radiofrequência** (RFI) de origem humana, cada vez mais severa e que exige mitigação por software e zonas de silêncio.

## Milimétrico e submilimétrico

Entre $$\sim 1\ \text{mm}$$ e $$\sim 0{,}3\ \text{mm}$$ a atmosfera só é transparente em janelas estreitas, e apenas de sítios com **coluna de vapor d'água** muito baixa (Atacama a $$5000\ \text{m}$$, Polo Sul). Os receptores são misturadores **SIS** supercondutores (heteródinos, para linhas) ou **bolômetros** e **KIDs** (contínuo, para poeira). A ciência é dominada pelas linhas rotacionais de moléculas (CO e o traçado de gás molecular, química do meio interestelar), pela emissão térmica da poeira fria e pelo efeito Sunyaev-Zeldovich em aglomerados. É o regime onde ALMA opera, já como interferômetro.
