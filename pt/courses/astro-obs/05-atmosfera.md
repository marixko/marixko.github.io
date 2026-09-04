---
title: "1.5 - A atmosfera: janelas, extinção e refração"
course: astro-obs
---

## A atmosfera como filtro e como fonte

Para o astrônomo do solo, a atmosfera é ao mesmo tempo um filtro que atenua o sinal, um prisma que o distorce e uma lâmpada que o contamina. Esta aula quantifica esses três papéis: as janelas de transmissão, a extinção e a refração.

### Conteúdo

- Janelas atmosféricas
- Extinção atmosférica e massa de ar
- A reta de Bouguer e a calibração
- Componentes da extinção
- Refração e dispersão atmosférica
- Emissão do céu e escolha de sítio

## Janelas atmosféricas

A atmosfera é opaca na maior parte do espectro eletromagnético. As **janelas** onde a radiação chega ao solo são:

- **Óptico** ($$\sim 0{,}32$$–$$1\ \mu\text{m}$$): limitada no azul pela absorção do ozônio e pelo espalhamento Rayleigh, no vermelho pelo início das bandas de vapor d'água.
- **Infravermelho próximo e médio**: janelas parciais ($$J$$, $$H$$, $$K$$, $$L$$, $$M$$, $$N$$, $$Q$$) separadas por bandas intensas de $$\text{H}_2\text{O}$$ e $$\text{CO}_2$$. Exigem sítios altos e secos.
- **Submilimétrico**: só acessível de sítios extremamente secos (Atacama, Polo Sul) e em janelas estreitas.
- **Rádio** ($$\sim 1\ \text{cm}$$ a $$\sim 10\ \text{m}$$): a janela mais ampla, fechada em ondas longas pela ionosfera e em ondas curtas pelo vapor d'água e pelo $$\text{O}_2$$.

Ultravioleta, raios X e raios gama são inacessíveis do solo e exigem observação do espaço (Módulo 6).

## Extinção atmosférica e massa de ar

Dentro de uma janela, a atmosfera ainda atenua a luz por absorção e espalhamento. Pela **lei de Beer-Lambert**, a intensidade decai exponencialmente com a coluna de material atravessada. Em magnitudes, isso vira uma relação **linear** com a massa de ar $$X$$:

$$
m_\text{obs}(\lambda) = m_0(\lambda) + k(\lambda)\,X,
$$

onde $$m_0$$ é a magnitude que se mediria fora da atmosfera, $$k(\lambda)$$ é o **coeficiente de extinção** em magnitudes por massa de ar, e $$X\approx \sec z$$ (aula 1.2). Valores típicos de um bom sítio: $$k_U\approx 0{,}5$$, $$k_B\approx 0{,}25$$, $$k_V\approx 0{,}15$$, $$k_R\approx 0{,}10$$, $$k_I\approx 0{,}05$$ mag/massa de ar. A extinção é sempre pior no azul.

## A reta de Bouguer e a calibração

Para medir $$k(\lambda)$$ numa dada noite, observa-se uma estrela padrão (ou várias) em uma faixa ampla de massa de ar, do zênite até perto do horizonte, e ajusta-se uma reta de $$m_\text{obs}$$ contra $$X$$: a **reta de Bouguer**. A inclinação é $$k$$, e o intercepto ($$X=0$$) é a magnitude extra-atmosférica. Noites em que os pontos não caem sobre uma reta são **não fotométricas** (cirros, variação de transparência) e não servem para calibração absoluta. A dependência residual da cor da estrela introduz um **termo de segunda ordem** $$k'(\lambda)$$, pequeno mas relevante em fotometria de precisão.

## Componentes da extinção

O coeficiente $$k(\lambda)$$ soma contribuições com dependências espectrais distintas:

- **Espalhamento Rayleigh** por moléculas: $$\propto \lambda^{-4}$$, domina no azul, é estável e previsível a partir da pressão do sítio.
- **Absorção molecular**: bandas discretas de $$\text{O}_3$$ (Chappuis, no visível; Hartley, no UV), $$\text{O}_2$$ (banda A em $$760\ \text{nm}$$) e $$\text{H}_2\text{O}$$.
- **Espalhamento por aerossóis** (poeira, sal, fumaça): dependência suave $$\propto \lambda^{-\alpha}$$ com $$\alpha\sim 1$$, é a componente **mais variável** e a que estraga noites.

## Refração e dispersão atmosférica

A atmosfera funciona como uma lente de gradiente de índice: a luz se curva e a fonte aparece **mais alta** que a sua posição geométrica. A refração é nula no zênite e cresce com $$z$$:

$$
R \approx 58''\,\tan z \quad (z \lesssim 70^\circ),
$$

chegando a cerca de $$35'$$ no horizonte (o Sol inteiro cabe nesse deslocamento). A refração pura só desloca a posição, o que a montagem compensa. O problema para os dados é a **dispersão atmosférica**: como o índice de refração depende de $$\lambda$$, a imagem de uma estrela vira um pequeno **espectro vertical**, com o azul acima do vermelho. Em $$z=45^\circ$$ a separação entre $$400$$ e $$700\ \text{nm}$$ é de vários décimos de segundo de arco, suficiente para causar perdas dependentes da cor na fenda ou na abertura fotométrica. A solução é observar perto do meridiano, alinhar a fenda ao ângulo paraláctico, ou usar um **corretor de dispersão atmosférica** (ADC).

## Emissão do céu e escolha de sítio

Mesmo sem Lua, o céu não é preto. Contribuem: a **luminescência do ar** (*airglow*, sobretudo linhas de OH no infravermelho próximo e a linha de [OI] em $$557{,}7\ \text{nm}$$), a **luz zodiacal** (luz solar espalhada por poeira interplanetária), a luz estelar difusa e, cada vez mais, a **poluição luminosa** artificial. O brilho de um céu escuro no óptico é de cerca de $$V\approx 21{,}8\ \text{mag/arcsec}^2$$. Esse fundo é a principal fonte de ruído em objetos fracos (aula 3.5).

Um bom sítio astronômico combina: **altitude** (menos massa de ar, menos vapor d'água), **secura** (janelas infravermelhas), **estabilidade do ar** (bom *seeing*, próxima aula), **fração de noites limpas** alta e **céu escuro**. É por isso que os grandes observatórios ficam concentrados no Atacama, no Havaí e nas Canárias.
