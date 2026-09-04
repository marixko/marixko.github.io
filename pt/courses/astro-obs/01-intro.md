---
title: "1.1 - Introdução à astronomia observacional"
course: astro-obs
---

## O que é astronomia observacional

Quase tudo o que sabemos sobre o Universo chegou até nós na forma de **luz**, ou, mais recentemente, de alguns poucos raios cósmicos, neutrinos e ondas gravitacionais. A astronomia observacional é a disciplina que trata de como coletar essa informação, o que ela contém e como transformá-la em números com incerteza controlada. Esta aula fixa o vocabulário e a estrutura do curso.

### Conteúdo

- A informação carregada pela luz
- A cadeia de sinal
- Do fóton ao número
- Observar do solo e do espaço
- Referências e organização do curso

## A informação carregada pela luz

Um feixe de luz que chega a um detector traz, em princípio, cinco tipos de informação:

- **Direção**: de onde vem o fóton. Define a posição da fonte no céu e, com um instrumento que forma imagem, a estrutura espacial do objeto.
- **Energia**: o comprimento de onda $$\lambda$$ (ou a frequência $$\nu=c/\lambda$$, ou a energia $$E=h\nu$$). A distribuição da energia recebida em função de $$\lambda$$ é o **espectro**, de onde saem temperatura, composição química, densidade, campo de velocidades e redshift.
- **Intensidade**: quantos fótons por segundo, por unidade de área, por unidade de banda. É o que a **fotometria** mede e o que se converte em fluxo e luminosidade.
- **Polarização**: a orientação do campo elétrico. Revela campos magnéticos, espalhamento e geometria não resolvida.
- **Tempo de chegada**: como o sinal varia. É o domínio da **astronomia de séries temporais**: pulsares, binárias eclipsantes, supernovas, trânsitos, contrapartidas de eventos transientes.

Nenhum instrumento mede tudo ao mesmo tempo. Cada técnica observacional é uma escolha sobre quais desses eixos privilegiar e quais sacrificar. Uma câmera de campo largo troca resolução espectral por área; um espectrógrafo de alta resolução troca fótons por detalhe em $$\lambda$$.

## A cadeia de sinal

O sinal que se registra é o resultado de uma sequência de transformações, cada uma com a sua própria função de transferência e a sua própria fonte de ruído:

$$
\text{fonte} \;\rightarrow\; \text{meio interestelar} \;\rightarrow\; \text{atmosfera} \;\rightarrow\; \text{telescópio} \;\rightarrow\; \text{instrumento} \;\rightarrow\; \text{detector} \;\rightarrow\; \text{dados brutos}.
$$

- A **fonte** emite um espectro que é o que queremos recuperar.
- O **meio interestelar** (e o intergaláctico) absorve, avermelha e desloca as linhas.
- A **atmosfera** absorve bandas inteiras, borra a imagem (*seeing*), refrata, adiciona a sua própria emissão e varia com o tempo.
- O **telescópio** coleta uma fração da frente de onda, com uma resposta espacial (a PSF) e perdas por reflexão e obstrução.
- O **instrumento** seleciona a banda (filtros), dispersa a luz (redes), define o campo.
- O **detector** converte fótons em elétrons com uma eficiência $$<1$$ e adiciona ruído de leitura, corrente de escuro e não linearidades.

Reduzir dados é, essencialmente, **inverter essa cadeia**, etapa por etapa, até recuperar uma estimativa da grandeza física de interesse com a sua barra de erro. Grande parte do curso é o detalhamento de cada seta.

## Do fóton ao número

O produto final de uma observação não é uma imagem bonita: é um **número com incerteza**, um fluxo, uma magnitude, uma velocidade radial, um período, acompanhado de uma estimativa honesta de quão bem ele é conhecido. Duas ideias organizam esse processo:

- **Calibração**: relacionar as contagens do detector a unidades físicas absolutas, usando fontes de referência (estrelas padrão, lâmpadas, o céu).
- **Propagação de erros**: manter o controle da incerteza em cada operação, desde o ruído de Poisson dos fótons até a incerteza da calibração.

Uma medida sem barra de erro é inutilizável em pesquisa. Ao longo do curso, cada técnica virá acompanhada da sua equação de sinal-ruído.

## Observar do solo e do espaço

Do **solo** temos abertura grande e barata, acesso fácil para manutenção e atualização de instrumentos, mas sofremos com a absorção atmosférica (que fecha o ultravioleta, quase todo o infravermelho médio e boa parte do submilimétrico), com o *seeing*, com a emissão do céu e com a duração da noite.

Do **espaço** ganhamos acesso a todo o espectro, uma PSF estável limitada por difração e um céu escuro e sem variabilidade atmosférica, ao custo de aberturas menores, missões caras e sem reparo, e restrições severas de massa, potência e telemetria.

A astronomia moderna combina os dois: levantamentos de campo largo no solo alimentam alvos para telescópios espaciais e para os grandes telescópios com óptica adaptativa.

## Referências e organização do curso

O curso segue de perto:

> Chromey, *To Measure the Sky*; Léna et al., *Observational Astrophysics*; Howell, *Handbook of CCD Astronomy*.

A sequência das aulas acompanha a cadeia de sinal: fundamentos da observação e a atmosfera (Módulo 1), fluxo e magnitudes (Módulo 2), telescópios e detectores (Módulo 3), imageamento e fotometria (Módulo 4), espectroscopia (Módulo 5), e por fim as outras faixas do espectro, o domínio do tempo e a prática de uma noite real (Módulos 6 e 7).
