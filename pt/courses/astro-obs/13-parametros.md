---
title: "3.2 - Abertura, razão focal, escala de placa e campo"
course: astro-obs
---

## Traduzindo o telescópio em números

Antes de qualquer observação é preciso saber quanto do céu o detector enxerga, com que amostragem, e quão rápido a imagem se forma. Tudo isso sai de quatro parâmetros: abertura, distância focal, razão focal e tamanho do pixel.

### Conteúdo

- Abertura e poder coletor
- Distância focal e razão focal
- Escala de placa
- Escala de pixel e campo de visão
- Rapidez para fontes pontuais e extensas
- Étendue e vinhetação

## Abertura e poder coletor

A **abertura** $$D$$ é o diâmetro do espelho primário (ou, mais precisamente, o diâmetro do feixe que efetivamente chega ao detector). O número de fótons coletados por segundo é proporcional à área **desobstruída**:

$$
\text{taxa de fótons} \propto \frac{\pi}{4}\left(D^{2} - D_\text{obst}^{2}\right).
$$

Para fontes pontuais em regime limitado pelo céu, o que importa para a detecção é $$D$$ (mais luz da fonte concentrada na mesma PSF, contra o mesmo fundo). Duplicar $$D$$ ganha $$2\ \text{mag}$$ de profundidade no mesmo tempo de exposição.

## Distância focal e razão focal

A **distância focal** $$f$$ do sistema converte ângulos no céu em distâncias no plano focal. A **razão focal** (ou número f) é

$$
N = \frac{f}{D}.
$$

Sistemas "rápidos" têm $$N$$ pequeno ($$f/2$$–$$f/4$$, câmeras de levantamento, foco primário); "lentos" têm $$N$$ grande ($$f/8$$–$$f/15$$, Cassegrain para espectroscopia e alta resolução). O nome vem da fotografia: um sistema rápido enche o plano focal de luz mais depressa **para fontes extensas**.

## Escala de placa

Diferenciando $$x = f\theta$$, a **escala de placa** (quanto céu cabe por unidade de comprimento no detector) é

$$
\frac{d\theta}{dx} = \frac{1}{f}.
$$

Em unidades práticas, com $$1\ \text{rad} = 206265''$$,

$$
\text{escala de placa} \;[''/\text{mm}] = \frac{206265}{f\ [\text{mm}]}.
$$

Um telescópio com $$f = 10\,000\ \text{mm}$$ tem $$20{,}6''/\text{mm}$$. Distâncias focais maiores dão imagens maiores e escalas menores (mais mm por segundo de arco), ou seja, mais "zoom".

## Escala de pixel e campo de visão

Multiplicando a escala de placa pelo tamanho físico do pixel $$p$$ (tipicamente $$10$$–$$15\ \mu\text{m}$$ em CCDs ópticos, $$18\ \mu\text{m}$$ em arrays IR):

$$
\text{escala de pixel} \;[''/\text{px}] = \frac{206265\, p\ [\text{mm}]}{f\ [\text{mm}]}.
$$

O **campo de visão** é a escala de pixel vezes o número de pixels do detector:

$$
\text{FOV} = \text{escala de pixel} \times N_\text{px}.
$$

Exemplo: $$f = 10\ \text{m}$$, $$p = 15\ \mu\text{m}$$ dá $$0{,}31''/\text{px}$$; um detector de $$2048^2$$ cobre $$\approx 10{,}6'$$. Câmeras de levantamento sacrificam distância focal (e resolução) para cobrir graus.

A escolha da escala de pixel deve casar com o *seeing*: pelo menos $$\sim 2$$ pixels por FWHM para não perder informação (critério de Nyquist, aula 3.6). Pixels grandes demais degradam astrometria e fotometria; pequenos demais espalham o sinal e aumentam o peso do ruído de leitura.

## Rapidez para fontes pontuais e extensas

O papel de $$D$$ e de $$N$$ depende da fonte:

- **Fonte extensa** (nebulosa, céu, galáxia resolvida): o brilho superficial na imagem, em fótons por pixel por segundo, depende só de $$N$$, $$\propto N^{-2}$$. Um sistema $$f/2$$ registra o céu quatro vezes mais rápido que um $$f/4$$, independentemente da abertura. Por isso câmeras de levantamento são rápidas.
- **Fonte pontual** limitada pelo céu: o que decide a detecção é a razão entre os fótons da fonte (que dependem de $$D^2$$) e o ruído do céu sob a PSF. Como a PSF, em segundos de arco, é fixada pelo *seeing*, o que conta é $$D$$, não $$N$$.

Resumindo: para ver **mais fundo** um ponto, aumente a abertura; para cobrir **mais céu** rápido, diminua a razão focal.

## Étendue e vinhetação

A **étendue** (ou produto $$A\Omega$$) é o produto da área coletora pelo ângulo sólido do campo. É a figura de mérito de um instrumento de levantamento: quantifica quanto do espaço de fase ele processa por unidade de tempo, e é aproximadamente conservada ao longo do sistema óptico. LSST/Rubin ($$6{,}5\ \text{m}$$ efetivos, $$9{,}6\ \text{deg}^2$$) tem étendue de ordem de grandeza acima dos telescópios de $$4\ \text{m}$$ com câmeras de $$1\ \text{deg}^2$$.

A **vinhetação** é a queda de iluminação nas bordas do campo, porque parte do feixe é bloqueada por baffles, pelo furo do primário ou pelo tamanho finito dos elementos. Ela é medida e removida no *flat-field* (aula 4.1), mas campos muito vinhetados têm S/N degradado nas bordas mesmo após correção.
