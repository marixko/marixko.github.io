---
title: "4.2 - Astrometria e solução astrométrica (WCS)"
course: astro-obs
---

## De pixels para o céu

Uma imagem reduzida ainda é apenas uma grade de números. Para saber a que posição no céu corresponde cada pixel, e vice-versa, é preciso ajustar uma **solução astrométrica**: a transformação entre coordenadas de pixel $$(x,y)$$ e coordenadas celestes $$(\alpha,\delta)$$.

### Conteúdo

- O World Coordinate System
- O modelo de placa linear
- Distorção
- Ajuste da solução
- Precisão e seus limites
- Aplicações

## O World Coordinate System

O padrão **WCS** dos cabeçalhos FITS descreve a transformação em etapas: aplica-se uma matriz linear aos pixels centrados em um pixel de referência, obtêm-se **coordenadas intermediárias** no plano tangente, e uma **projeção** (em geral a gnomônica, `TAN`) leva o plano tangente à esfera celeste. As palavras-chave essenciais:

- `CRPIX1, CRPIX2`: o pixel de referência.
- `CRVAL1, CRVAL2`: as coordenadas celestes $$(\alpha_0,\delta_0)$$ desse pixel.
- `CD1_1 ... CD2_2` (ou `PC` + `CDELT`): a matriz $$2\times 2$$ que codifica escala, rotação e cisalhamento.

## O modelo de placa linear

Ignorando a distorção, a relação é

$$
\begin{pmatrix} \xi \\ \eta \end{pmatrix}
=
\begin{pmatrix} \mathrm{CD}_{11} & \mathrm{CD}_{12} \\ \mathrm{CD}_{21} & \mathrm{CD}_{22} \end{pmatrix}
\begin{pmatrix} x - \mathrm{CRPIX}_1 \\ y - \mathrm{CRPIX}_2 \end{pmatrix},
$$

onde $$(\xi,\eta)$$ são coordenadas padrão no plano tangente, depois convertidas em $$(\alpha,\delta)$$ pela projeção. A matriz CD tem quatro números que absorvem: a escala de placa (aula 3.2), o ângulo de posição do detector no céu, e um eventual cisalhamento óptico. Determinante negativo indica imagem espelhada (comum, dependendo do número de reflexões).

## Distorção

Telescópios de campo largo têm **distorção óptica**: a escala varia radialmente, então o modelo linear deixa resíduos que crescem para as bordas, de décimos a vários segundos de arco. Modela-se com termos polinomiais adicionais:

- **SIP** (*Simple Imaging Polynomial*): polinômios em $$(x,y)$$ aplicados antes da matriz CD.
- **TPV**: polinômios aplicados no plano tangente, comuns em pipelines baseados no antigo `TNX`.

O grau costuma ser 3 a 5. A distorção é aproximadamente estável e pode ser pré-caracterizada, deixando só a orientação e o ponto de referência para ajustar em cada imagem.

## Ajuste da solução

O procedimento:

1. **Detectar fontes** na imagem e medir centroides de precisão sub-pixel (momentos ou ajuste de PSF).
2. **Obter um catálogo de referência** na região: hoje, quase sempre **Gaia**, que dá posições com incerteza de dezenas de $$\mu$$as e movimentos próprios para propagar até a época da observação.
3. **Casar** as duas listas. Sem solução prévia, faz-se *blind solving* por padrões de triângulos invariantes a escala e rotação (o método do `astrometry.net`).
4. **Ajustar** os parâmetros do WCS por mínimos quadrados, com **rejeição iterativa de outliers** (fontes mal casadas, binárias não resolvidas, objetos em movimento).
5. **Inspecionar os resíduos**: o RMS pós-ajuste e mapas de resíduo em função da posição, que revelam distorção não modelada ou erros de escala.

## Precisão e seus limites

A incerteza da posição de uma fonte individual é limitada por:

- **Centroiding**: $$\sigma_\text{centro} \sim \mathrm{FWHM}/(S/N)$$ para uma PSF bem amostrada. Fontes brilhantes chegam a milésimos de pixel; fontes fracas, a décimos.
- **Catálogo de referência**: densidade e precisão das referências, e o erro de propagação do movimento próprio para épocas distantes da do catálogo.
- **Atmosfera**: a turbulência introduz um "jitter" posicional correlacionado que não promedia como $$1/\sqrt{N}$$ ingênuo; é o piso da astrometria de campo estreito do solo ($$\sim 1$$–$$5\ \text{mas}$$).
- **Refração cromática diferencial**: fontes de cores diferentes são refratadas de forma diferente, deslocando-se ao longo do ângulo paraláctico de um valor que depende da cor e da massa de ar.

## Aplicações

A solução astrométrica é pré-requisito para: **empilhar** (*stacking*) imagens de épocas e filtros diferentes na mesma grade; **fotometria forçada**, medindo o fluxo em posições fixas vindas de outro catálogo; **cross-match** com outros levantamentos; identificar e acompanhar **objetos em movimento** (asteroides, cometas); e, no limite de precisão, programas de **paralaxe e movimento próprio** e de detecção astrométrica de exoplanetas e buracos negros.
