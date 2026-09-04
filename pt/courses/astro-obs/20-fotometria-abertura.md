---
title: "4.3 - Detecção de fontes e fotometria de abertura"
course: astro-obs
---

## Encontrar e medir

Com a imagem reduzida e a astrometria resolvida, os dois passos seguintes são **detectar** as fontes (decidir onde há objeto e onde há só ruído) e **medir** o fluxo de cada uma. Esta aula trata da forma mais direta de medida, a fotometria de abertura.

### Conteúdo

- Estimativa e subtração do fundo
- Detecção por limiar e filtro casado
- Segmentação e deblending
- Centroiding
- Fotometria de abertura
- Aberturas para objetos extensos

## Estimativa e subtração do fundo

O céu não é uniforme: há gradientes de larga escala (Lua, luz zodiacal, luz espalhada, gradiente de flat residual). Estima-se o fundo em uma **grade grossa** de células, calculando em cada uma uma estatística robusta (mediana com *sigma-clipping*, ou moda estimada por $$2{,}5\,\text{mediana} - 1{,}5\,\text{média}$$), e interpola-se um **mapa de fundo** suave, que é subtraído. A escala da grade deve ser bem maior que as fontes e bem menor que os gradientes reais.

## Detecção por limiar e filtro casado

Depois de subtrair o fundo, uma fonte é uma região onde o sinal excede o ruído local por um fator escolhido. O critério básico:

$$
I(x,y) > n_\sigma\,\sigma_\text{fundo}(x,y),
$$

com $$n_\sigma \sim 1{,}5$$–$$5$$ e $$\sigma_\text{fundo}$$ o RMS do fundo naquela posição. Aplicar isso pixel a pixel é ineficiente e ruidoso; primeiro **convolui-se a imagem com um filtro casado** à forma esperada da fonte, tipicamente um núcleo gaussiano de largura igual à FWHM da PSF. O filtro casado é o detector ótimo de fontes pontuais em ruído branco: maximiza o S/N de pico e suaviza flutuações de um pixel só. Pixels contíguos acima do limiar formam um **grupo de detecção**; exige-se um número mínimo de pixels conectados para reduzir falsos positivos.

## Segmentação e deblending

O conjunto de pixels atribuídos a cada fonte é a sua **máscara de segmentação**. Quando duas fontes se tocam, um único grupo de detecção contém as duas e é preciso **separá-las** (*deblending*): a abordagem do SExtractor examina o grupo em vários níveis de limiar (como curvas de nível) e decide, em cada ramificação, se um pico é uma fonte independente ou apenas uma flutuação, usando um critério de contraste de fluxo. Deblending é intrinsecamente ambíguo e é uma das maiores fontes de erro sistemático em campos densos e em torno de galáxias.

## Centroiding

A posição de uma fonte estima-se por:

- **Momentos de primeira ordem** (centro de luz) dentro da máscara: rápido, mas enviesado pelo fundo e por vizinhos.
- **Ajuste de um perfil** (gaussiana 2D, Moffat, ou a própria PSF): mais preciso, com incerteza $$\sim \mathrm{FWHM}/(S/N)$$.

O centroide bem medido é o que entra na astrometria e o que ancora a abertura.

## Fotometria de abertura

Mede-se o fluxo somando os pixels dentro de uma **abertura circular** de raio $$r_\text{ap}$$ centrada na fonte, e subtraindo o céu local estimado em um **anel** ao redor:

$$
F = \sum_{i \in \text{abertura}} \big(I_i - \bar b\big), \qquad
\bar b = \text{mediana robusta do anel}.
$$

Detalhes que importam:

- **Pixels parciais**: pixels na borda da abertura entram com peso proporcional à fração de área coberta.
- **Raio da abertura**: o que maximiza o S/N é $$\sim 0{,}7$$–$$1{,}0$$ FWHM (aula 3.5), não o que contém toda a luz.
- **Correção de abertura**: a diferença entre a magnitude na abertura pequena e a magnitude "total", medida na curva de crescimento de estrelas brilhantes isoladas, e aplicada a todas as fontes.
- **Anel de céu**: precisa estar longe o bastante para não conter luz da fonte, mas perto o bastante para amostrar o fundo local; fontes vizinhas no anel devem ser rejeitadas.
- **Erro**: propaga-se a equação do CCD sobre os pixels da abertura, incluindo a incerteza da estimativa de céu (que escala com $$1/\sqrt{n_\text{anel}}$$).

A fotometria de abertura é **ótima quando as fontes são isoladas e o campo é pouco denso**. Falha quando as aberturas se sobrepõem: é o caso da fotometria de PSF (aula 4.4).

## Aberturas para objetos extensos

Para galáxias, uma abertura fixa não faz sentido (o tamanho angular varia). Usam-se aberturas **adaptativas**:

- **Abertura de Kron**: raio proporcional ao "primeiro momento radial" do perfil de luz, $$r_K = \sum r\,I(r) / \sum I(r)$$; uma abertura de $$\sim 2{,}5\,r_K$$ captura tipicamente $$> 90\%$$ da luz. É a base da `MAG_AUTO`.
- **Abertura de Petrosian**: definida pelo raio em que o brilho superficial local cai a uma fração fixa do brilho médio interior; é quase independente de distância e de profundidade, e por isso usada no SDSS.

Ambas embutem a extrapolação do fluxo fora da abertura em modelo, e por isso têm uma incerteza sistemática que a fotometria de superfície explícita (aula 4.6) torna controlável.
