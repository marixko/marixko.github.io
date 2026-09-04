---
title: "3.6 - PSF, amostragem e o critério de Nyquist"
course: astro-obs
---

## A imagem de um ponto

Uma estrela é, para todos os efeitos, uma fonte pontual. O que o detector registra no lugar dela, uma mancha com perfil característico, é a **função de espalhamento de ponto** (PSF). Toda a fotometria e a astrometria dependem de conhecer e amostrar bem essa mancha.

### Conteúdo

- A PSF como convolução
- Perfis analíticos
- O teorema da amostragem
- Subamostragem e aliasing
- Dithering e reconstrução
- Variação da PSF e curva de crescimento

## A PSF como convolução

A imagem observada é o céu verdadeiro **convoluído** com uma sequência de respostas:

$$
\mathrm{PSF} = \mathrm{Airy} \otimes \mathrm{seeing} \otimes \mathrm{aberrações} \otimes \mathrm{guiagem} \otimes \mathrm{pixel} \otimes \mathrm{difusão}.
$$

- **Airy**: difração pela abertura, $$\theta \sim \lambda/D$$. Só domina do espaço ou com óptica adaptativa.
- **Seeing**: turbulência atmosférica, em geral o termo maior do solo (aula 1.6).
- **Aberrações e desfoco**: óptica imperfeita, colimação, gradiente térmico.
- **Guiagem/tracking**: erros de acompanhamento borram a imagem, muitas vezes de forma anisotrópica.
- **Pixel**: cada pixel integra sobre a sua área (uma convolução com um quadrado).
- **Difusão de carga** no silício: espalha o sinal para pixels vizinhos.

Como convoluções somam variâncias para perfis quase gaussianos, as FWHM se combinam aproximadamente em quadratura:
$$\mathrm{FWHM}^2 \approx \mathrm{FWHM}_\text{seeing}^2 + \mathrm{FWHM}_\text{difração}^2 + \dots$$

## Perfis analíticos

- **Gaussiana**: $$I(r) \propto e^{-r^2/2\sigma^2}$$, com $$\mathrm{FWHM} = 2{,}355\,\sigma$$. Simples, mas cai rápido demais: subestima as **asas** da PSF real.
- **Moffat**: $$I(r) \propto \left[1 + (r/\alpha)^2\right]^{-\beta}$$. Reproduz bem as asas do *seeing*; $$\beta \approx 2{,}5$$–$$4{,}5$$ tipicamente, e $$\beta\to\infty$$ recupera a gaussiana.
- **PSF empírica**: uma tabela/modelo construído a partir de várias estrelas brilhantes isoladas do próprio campo. É o que a fotometria de campos densos usa (aula 4.4).

A **razão de Strehl** (pico observado / pico ideal) e a **energia encerrada** em função do raio completam a caracterização.

## O teorema da amostragem

Uma imagem contínua é amostrada por uma grade de pixels de passo $$p$$. O **teorema de Nyquist-Shannon** diz que, para não perder informação, é preciso amostrar a estrutura mais fina com **pelo menos dois pontos**:

$$
p \le \frac{\mathrm{FWHM}}{2} \quad (\text{amostragem crítica}).
$$

- **Bem amostrada** ($$\gtrsim 2$$–$$3$$ px por FWHM): a PSF pode ser reconstruída, o centroide é preciso, o ajuste de perfil funciona.
- **Subamostrada** ($$< 2$$ px por FWHM): informação de alta frequência é perdida de forma irrecuperável em uma única imagem.
- **Superamostrada** ($$\gg 3$$ px por FWHM): nenhuma perda de informação, mas o sinal se espalha por muitos pixels, o ruído de leitura e o céu pesam mais, e o campo fica menor.

## Subamostragem e aliasing

Quando $$p > \mathrm{FWHM}/2$$, frequências acima da frequência de Nyquist "dobram" para dentro da banda amostrada: é o **aliasing**. Sintomas: a FWHM medida depende de onde a estrela caiu dentro do pixel, a fotometria de abertura tem erro dependente da posição sub-pixel, e a astrometria fica limitada. Muitos levantamentos de campo largo (Rubin/LSST com $$0{,}2''/\text{px}$$ para $$\sim 0{,}7''$$ de *seeing*, HST/WFC3-UVIS) operam **deliberadamente subamostrados**, trocando fidelidade da PSF por área e por S/N por pixel, e recuperam a resolução na combinação de muitas imagens.

## Dithering e reconstrução

A técnica é registrar várias exposições com pequenos deslocamentos (**dithers**) de fração de pixel entre elas. Cada exposição amostra a PSF numa fase sub-pixel diferente; combiná-las reconstrói uma imagem em uma grade mais fina. O algoritmo clássico é o **drizzle** (*variable-pixel linear reconstruction*), que projeta cada pixel de entrada, encolhido, na grade de saída. Benefícios adicionais do *dithering*: cobre as falhas entre chips de um mosaico, elimina pixels ruins e raios cósmicos, e faz a média de erros de *flat-field*.

## Variação da PSF e curva de crescimento

A PSF **não é constante**: muda ao longo do campo (aberrações fora do eixo, desfoco diferencial), com o tempo (o *seeing* varia em minutos), com o comprimento de onda, e até com a cor da estrela. Fotometria e modelagem sérias usam uma PSF que **varia com a posição**, ajustada por um polinômio de baixo grau nas coordenadas do detector.

A **curva de crescimento** é o fluxo medido em função do raio da abertura. Para uma estrela isolada ela sobe e **satura** quando a abertura contém toda a luz. A diferença entre a magnitude numa abertura pequena (usada para maximizar S/N) e a magnitude assintótica é a **correção de abertura**, determinada em estrelas brilhantes e aplicada a todas as fontes do campo.
