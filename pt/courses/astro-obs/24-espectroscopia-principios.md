---
title: "5.1 - Princípios da espectroscopia: dispersão e resolução"
course: astro-obs
---

## Decompor a luz

A fotometria mede quanta luz chega em bandas largas; a espectroscopia mede $$f_\lambda$$ com resolução suficiente para ver linhas. É de longe a técnica mais rica: dá temperatura, composição, densidade, campo magnético, velocidade e redshift. Esta aula trata dos elementos dispersores e do conceito de poder de resolução.

### Conteúdo

- Prismas, redes e grisms
- A equação da rede
- Dispersão angular e linear
- Poder de resolução
- Ordens, blaze e faixa espectral livre
- Fenda, seeing e o compromisso com o fluxo

## Prismas, redes e grisms

- **Prisma**: dispersa por índice de refração dependente de $$\lambda$$. Dispersão não linear (forte no azul), baixo poder de resolução, mas alta eficiência. Usado em espectroscopia de levantamento de baixa resolução.
- **Rede de difração**: uma superfície com milhares de ranhuras por milímetro; a dispersão vem da interferência entre as ranhuras. Domina a espectroscopia astronômica. Pode ser de **reflexão** ou de **transmissão**.
- **Grism**: uma rede de transmissão colada a um prisma, montada de modo que o comprimento de onda central passe reto. Permite alternar imagem e espectro sem reconfigurar o instrumento.
- **VPH** (*volume phase holographic*): rede de índice modulado no volume de uma gelatina; alta eficiência de pico, sintonizável, muito usada em instrumentos modernos.

## A equação da rede

Para uma rede de espaçamento $$d$$ entre ranhuras, com a luz incidindo a um ângulo $$\alpha$$ e difratada a um ângulo $$\beta$$ (ambos em relação à normal), a interferência construtiva ocorre quando

$$
d\,(\sin\alpha + \sin\beta) = m\,\lambda,
$$

com $$m = 0, \pm 1, \pm 2, \dots$$ a **ordem** de difração. A ordem $$m = 0$$ não dispersa (todos os $$\lambda$$ saem juntos). Ordens $$\lvert m \rvert \ge 1$$ separam os comprimentos de onda no ângulo.

## Dispersão angular e linear

Diferenciando a equação da rede em relação a $$\lambda$$, com $$\alpha$$ fixo:

$$
\frac{d\beta}{d\lambda} = \frac{m}{d\,\cos\beta}.
$$

Esta é a **dispersão angular**: cresce com a ordem $$m$$ e com a densidade de ranhuras $$1/d$$. Projetada pela câmera de distância focal $$f_\text{cam}$$ sobre o detector, dá a **dispersão linear** (em $$\text{\AA/mm}$$ ou $$\text{\AA/pixel}$$),

$$
\frac{d\lambda}{dx} = \frac{d\,\cos\beta}{m\,f_\text{cam}}.
$$

Instrumentos de baixa resolução têm $$\sim 100$$–$$500\ \text{\AA/mm}$$; echelle de alta resolução, $$\sim 1$$–$$5\ \text{\AA/mm}$$.

## Poder de resolução

O **poder de resolução** é

$$
R = \frac{\lambda}{\Delta\lambda},
$$

onde $$\Delta\lambda$$ é a menor separação em comprimento de onda que o instrumento distingue. O limite teórico de uma rede totalmente iluminada com $$N$$ ranhuras na ordem $$m$$ é $$R_\text{teórico} = mN$$. Na prática, para uma fonte com fenda, $$R$$ é fixado pela **largura da fenda projetada no detector**: a imagem da fenda tem uma largura, e $$\Delta\lambda$$ é essa largura vezes a dispersão linear.

Uma tradução útil: $$R$$ corresponde a uma resolução em velocidade

$$
\Delta v = \frac{c}{R}.
$$

$$R = 1000$$ dá $$300\ \text{km/s}$$ (bom para galáxias e redshift); $$R = 50\,000$$ dá $$6\ \text{km/s}$$ (abundâncias estelares); espectrógrafos de velocidade radial de precisão chegam a $$R \sim 100\,000$$ e a estabilidade de $$\text{cm/s}$$. O elemento de resolução deve ser amostrado por **pelo menos 2 pixels** (Nyquist, aula 3.6).

## Ordens, blaze e faixa espectral livre

Da equação da rede, o mesmo ângulo $$\beta$$ satisfaz $$m\lambda = \text{const}$$: o vermelho da ordem $$m$$ cai no mesmo lugar que o azul da ordem $$m+1$$. A separação sem sobreposição dentro de uma ordem é a **faixa espectral livre**,

$$
\Delta\lambda_\text{FSR} = \frac{\lambda}{m}.
$$

Em baixa ordem ($$m = 1, 2$$) a FSR é ampla e um **filtro bloqueador de ordem** basta. Em alta ordem (echelle, $$m \sim 50$$–$$150$$) a FSR é estreita e as ordens precisam ser separadas por um segundo dispersor perpendicular, o **cross-disperser**, produzindo o padrão em "escada".

O ângulo de **blaze** é a inclinação dada às ranhuras (rede *echelette*) para concentrar a luz numa direção específica, maximizando a eficiência em um $$\lambda$$ (o **comprimento de onda de blaze**) e nas suas vizinhanças em cada ordem.

## Fenda, seeing e o compromisso com o fluxo

A fenda cumpre dois papéis opostos:

- **Fenda estreita** ($$\lesssim$$ FWHM do *seeing*): alto $$R$$, mas parte da luz da estrela cai fora e é perdida (**perdas de fenda**), e essas perdas dependem de $$\lambda$$ por causa da dispersão atmosférica (aula 1.5).
- **Fenda larga**: capta toda a luz, mas $$R$$ cai (a imagem da fenda passa a dominar $$\Delta\lambda$$) e o céu entra em maior quantidade.

O compromisso $$R$$ versus fótons está no centro de todo projeto espectroscópico. Espectrógrafos alimentados por **fibra** contornam parte do problema (a fibra embaralha a distribuição angular e estabiliza a iluminação), ao custo de perder a informação espacial ao longo da fenda.
