---
title: "6.5 - Levantamentos, arquivos e o observatório virtual"
course: astro-obs
---

## Ciência com dados que você não observou

Uma fração crescente da astrofísica é feita com dados de **levantamentos** e **arquivos**, não com observações próprias. Saber projetar, entender e consultar esses conjuntos é hoje uma competência observacional central.

### Conteúdo

- Levantamento versus observação individual
- Projeto de um levantamento
- Os principais levantamentos
- Produtos de dados e função de seleção
- Arquivos e o observatório virtual
- Reprodutibilidade e volume de dados

## Levantamento versus observação individual

Na observação **por proposta** (modo PI), o astrônomo pede tempo para alvos específicos e um objetivo definido. Em um **levantamento**, observa-se de forma sistemática uma área do céu com estratégia fixa, e os dados servem a muitos objetivos, inclusive os não previstos. O levantamento troca flexibilidade por **homogeneidade**, **volume** e uma **função de seleção conhecida**, que é o que permite estatística de populações.

## Projeto de um levantamento

Com recursos fixos (tempo de telescópio, área do detector), há um orçamento a distribuir entre cinco eixos:

$$
\text{área} \times \text{profundidade} \times \text{cobertura espectral} \times \text{cadência} \times \text{resolução}.
$$

Aumentar um exige reduzir outro. Estratégias comuns: **bolo de noiva** (*wedding cake*), com uma camada rasa e ampla mais camadas cada vez mais fundas e estreitas; ou dividir o tempo entre um componente de área larga e campos ultraprofundos. A **étendue** do instrumento (aula 3.2) determina quanto do espaço é possível cobrir por noite.

## Os principais levantamentos

| Tipo | Exemplos |
| --- | --- |
| Imageamento óptico | SDSS, Pan-STARRS, DES, HSC-SSP, Rubin/LSST |
| Imageamento espacial | HST (campos), Euclid, Roman |
| Espectroscopia | SDSS/BOSS/eBOSS, DESI, GAMA, LAMOST, WEAVE, 4MOST, PFS |
| Astrometria e todo o céu | Gaia, 2MASS, WISE/NEOWISE |
| Raios X | ROSAT, eROSITA |
| Domínio do tempo | ASAS-SN, ZTF, ATLAS, Kepler, TESS, Rubin/LSST |
| Rádio | NVSS, VLASS, ASKAP/EMU, LOFAR |

Cada um tem um **artigo de descrição** (o *survey paper*) e um documento de *data release* que definem cobertura, profundidade, sistema fotométrico e limitações conhecidas: leitura obrigatória antes de usar.

## Produtos de dados e função de seleção

Um levantamento entrega camadas: imagens de época única, **coadds** (empilhamentos), **catálogos** (posições, fluxos, formas, classificações), e produtos de valor agregado (*photo-z*, massas estelares, parâmetros estelares). Para curvas de luz, tabelas de fotometria multiépoca.

O item mais importante, e o mais ignorado, é a **função de seleção**: a probabilidade de um objeto de dadas propriedades entrar no catálogo. Ela depende de magnitude, cor, tamanho, brilho superficial, densidade local, posição no céu, época. Qualquer medida de **densidade, função de luminosidade, fração de um tipo de objeto ou evolução** exige dividir pela função de seleção; sem ela, o resultado mede o levantamento, não o Universo. Estima-se com **fontes artificiais** injetadas e recuperadas pelo mesmo pipeline (aula 4.4).

## Arquivos e o observatório virtual

Os dados vivem em arquivos institucionais (MAST para HST/JWST, IRSA para dados infravermelhos e de levantamentos, ESA, NOIRLab, CADC) e são acessíveis por protocolos padronizados do **Observatório Virtual** (IVOA):

- **TAP / ADQL**: consultas SQL a catálogos remotos, sem baixar as tabelas.
- **Cone Search, SIA, SSA**: busca de fontes, imagens e espectros por posição.
- **VOTable, FITS**: formatos de intercâmbio.
- **Serviços do CDS**: SIMBAD (identificação e bibliografia por objeto), VizieR (catálogos publicados), Aladin (visualização), X-Match (cruzamento de tabelas grandes).

Ferramentas como `astroquery`, `pyvo` e TOPCAT tornam isso acessível de dentro de um script.

## Reprodutibilidade e volume de dados

Boas práticas que os levantamentos impõem:

- **Consultas em código**, versionadas, com a ADQL exata registrada, e não cliques em um formulário web.
- **Citar o *data release* e os DOIs** dos conjuntos usados.
- Registrar a **função de seleção** aplicada e as **flags de qualidade** usadas para filtrar.

O volume mudou a escala: os catálogos de Rubin/LSST terão dezenas de bilhões de fontes e petabytes de imagens. Não se baixa mais "o céu"; leva-se a **análise até os dados**, via consultas remotas, *notebooks* hospedados junto ao arquivo, e cortes bem definidos. A competência observacional moderna inclui saber formular a pergunta certa como uma consulta e entender os vieses do que ela devolve.
