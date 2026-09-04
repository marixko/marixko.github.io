---
title: "4.6 - Fotometria de superfície de objetos extensos"
course: astro-obs
---

## Medir a distribuição de luz

Para uma galáxia ou uma nebulosa, o número relevante não é só o fluxo total, mas **como a luz se distribui**: o perfil de brilho, o tamanho, a forma, a decomposição em componentes. Esta aula trata da fotometria de superfície e dos seus limites.

### Conteúdo

- Brilho superficial e magnitude por segundo de arco quadrado
- Ajuste de isofotas
- Modelos paramétricos de perfil
- Decomposição bojo-disco
- O céu como sistemática dominante
- O regime de baixo brilho superficial

## Brilho superficial e magnitude por segundo de arco quadrado

O **brilho superficial** $$\mu$$ é o fluxo por unidade de ângulo sólido, expresso em magnitudes:

$$
\mu(x,y) = -2{,}5\,\log_{10}\!\left[\frac{I(x,y)}{(\text{escala de pixel})^2}\right] + \mathrm{ZP} \quad [\text{mag arcsec}^{-2}].
$$

Como visto na aula 2.1, $$\mu$$ **não depende da distância** enquanto o objeto for resolvido (a menos do *dimming* cosmológico). Valores de referência: o centro de uma espiral tem $$\mu_V \sim 18$$–$$20$$, o disco a um raio de escala $$\sim 21$$–$$22$$, e o limite de detecção de um levantamento profundo fica em $$\mu_V \sim 27$$–$$29$$.

## Ajuste de isofotas

A ferramenta clássica é ajustar **elipses de brilho constante** (isofotas) em raios crescentes. Em cada raio obtêm-se: brilho superficial médio, centro, elipticidade $$\epsilon$$, ângulo de posição, e os coeficientes de Fourier $$a_n, b_n$$ dos desvios da elipse (o termo $$a_4 > 0$$ indica isofotas "disky", $$a_4 < 0$$ "boxy"). O perfil $$\mu(r)$$ resultante é o dado primário da análise morfológica. Implementação de referência: a tarefa `ellipse` do IRAF/STSDAS, hoje em `photutils.isophote`.

## Modelos paramétricos de perfil

Perfis analíticos que descrevem bem galáxias:

- **Disco exponencial**: $$I(r) = I_0\, e^{-r/h}$$, com $$h$$ o comprimento de escala.
- **Perfil de Sérsic**: generaliza os casos clássicos,

$$
I(r) = I_e \exp\!\left\{ -b_n\left[\left(\frac{r}{R_e}\right)^{1/n} - 1\right] \right\},
$$

onde $$R_e$$ é o **raio efetivo** (contém metade da luz), $$I_e$$ o brilho nesse raio, $$n$$ o **índice de Sérsic** e $$b_n \approx 2n - 1/3$$. $$n = 1$$ recupera o disco exponencial; $$n = 4$$ é o perfil de de Vaucouleurs, típico de elípticas e bojos clássicos; $$n < 1$$ descreve alguns discos e anãs.

O ajuste é feito **na imagem 2D**, não no perfil 1D, para tratar corretamente a inclinação, a PSF e as fontes contaminantes. Códigos: **GALFIT**, `imfit`, `statmorph`.

## Decomposição bojo-disco

Muitas galáxias são a soma de um **bojo** (Sérsic com $$n$$ alto) e um **disco** (exponencial), mais eventualmente barra, halo e núcleo pontual (AGN). O ajuste simultâneo dessas componentes na imagem 2D fornece a **razão bojo-total** ($$B/T$$), um parâmetro central para estudos de evolução morfológica. A decomposição é **degenerada**: componentes diferentes podem produzir imagens quase idênticas, sobretudo com S/N ou resolução limitados, então os erros devem vir de simulações, não só das barras formais do ajuste.

## O céu como sistemática dominante

A determinação do **fundo do céu** é o fator que limita quase toda fotometria de superfície. Um erro de $$1\%$$ na subtração do céu, invisível no centro brilhante, domina completamente as regiões externas de baixo brilho e pode inventar ou apagar um halo estelar inteiro. Boas práticas:

- estimar o céu **longe** da galáxia, em regiões amplas e limpas, e verificar a estabilidade em vários setores;
- ajustar a galáxia e o céu **em conjunto** quando o objeto ocupa grande fração do campo;
- usar imagens com campo bem maior que o alvo;
- checar o perfil externo contra diferentes hipóteses de céu para propagar essa incerteza.

## O regime de baixo brilho superficial

Abaixo de $$\mu \sim 26\ \text{mag arcsec}^{-2}$$ tudo conspira contra a medida:

- **Flat-field**: erros de $$0{,}1\%$$ em larga escala já são o sinal.
- **Luz espalhada** na óptica e reflexos internos criam halos e "fantasmas" em torno de estrelas brilhantes.
- **Asas estendidas da PSF**: a PSF real tem asas de potência que se estendem por minutos de arco e transferem luz do núcleo brilhante para as regiões externas; corrigir isso exige uma PSF caracterizada até raios muito grandes.
- **Cirros galácticos** e gradientes de céu reais se confundem com estrutura da galáxia.

Levantamentos dedicados (Dragonfly, telescópios com óptica anti-reflexo, exposições ultraprofundas com muitos dithers) foram construídos especificamente para esse regime.

Para relatar um **fluxo total**, integra-se o perfil ajustado até o infinito (analiticamente, no caso de Sérsic) ou até um raio de Petrosian, e a diferença entre as duas estimativas é uma medida honesta da incerteza sistemática da "magnitude total".
