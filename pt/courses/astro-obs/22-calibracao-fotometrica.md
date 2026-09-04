---
title: "4.5 - Calibração fotométrica e estrelas padrão"
course: astro-obs
---

## De contagens a magnitudes de verdade

A fotometria dá, até aqui, um fluxo em elétrons por segundo, um número que só faz sentido para aquele instrumento, naquela noite, naquela massa de ar. A calibração fotométrica converte isso em uma magnitude de um sistema padrão, comparável com o resto da literatura.

### Conteúdo

- Magnitude instrumental
- A equação de calibração
- Estrelas padrão
- Noites fotométricas e não fotométricas
- Calibração absoluta e relativa
- Gaia como padrão de todo o céu

## Magnitude instrumental

Define-se a **magnitude instrumental** a partir do fluxo medido $$f$$ (em $$e^-/\text{s}$$, já com correção de abertura):

$$
m_\text{inst} = -2{,}5\,\log_{10} f.
$$

É uma escala relativa, sem ponto de zero físico. Toda a calibração está em achar a transformação de $$m_\text{inst}$$ para $$m_\text{padrão}$$.

## A equação de calibração

A forma geral, para uma banda, é

$$
m_\text{padrão} = m_\text{inst} + \mathrm{ZP} - k\,X + c\,(\text{cor})_\text{padrão} + \dots,
$$

- $$\mathrm{ZP}$$: **ponto de zero**, absorve a área do telescópio, a eficiência total do sistema e o ponto de zero do sistema de magnitudes.
- $$k\,X$$: **extinção atmosférica**, com $$k$$ o coeficiente da noite (mag por massa de ar) e $$X$$ a massa de ar da observação (aula 1.5).
- $$c\,(\text{cor})$$: **termo de cor**, corrige a diferença entre a banda do instrumento e a banda padrão; o efeito depende do espectro da fonte, e a cor é o melhor indicador dele (aula 2.3).
- Termos de ordem superior: extinção de segunda ordem $$k'\,(\text{cor})\,X$$, dependência temporal do ZP, dependência espacial (gradiente no campo).

Determina-se $$\mathrm{ZP}$$, $$k$$ e $$c$$ ajustando essa equação a um conjunto de estrelas de magnitude e cor **conhecidas**, observadas ao longo da noite em várias massas de ar.

## Estrelas padrão

Campos de **estrelas padrão** são regiões com fotometria precisa e homogênea, medida e re-medida por décadas:

- **Landolt**: campos equatoriais no sistema Johnson-Cousins $$UBVRI$$, o padrão histórico do óptico.
- **Stetson**: extensão com muito mais estrelas e cobertura, útil para campos densos.
- **SDSS / Pan-STARRS**: fotometria $$ugrizy$$ no sistema AB cobrindo grande parte do céu, hoje usada como referência secundária.
- **Espectrofotométricos** (ex.: as estrelas de calibração do HST, anãs brancas modeladas): têm o **espectro absoluto** medido, e servem para ancorar a escala de fluxo e para gerar fotometria sintética em qualquer banda.

A estratégia clássica: intercalar, ao longo da noite, observações de 2–4 campos padrão em massas de ar entre $$\sim 1$$ e $$\sim 2$$, cobrindo uma faixa ampla de cor.

## Noites fotométricas e não fotométricas

A calibração absoluta pela equação acima **só funciona em noite fotométrica**: transparência estável, sem cirros, com a reta de Bouguer bem definida. Em noite **não fotométrica**, a transmissão varia de minuto a minuto e o $$\mathrm{ZP}$$ efetivo não é constante. Nesse caso:

- faz-se **fotometria diferencial**, medindo o alvo em relação a estrelas de referência **no mesmo campo** (mesma massa de ar, mesma nuvem), o que cancela a variação;
- e transfere-se a calibração absoluta depois, de uma noite fotométrica, para essas estrelas de referência locais (**padrões secundários**).

## Calibração absoluta e relativa

- **Absoluta**: amarrar as magnitudes à escala física (fluxo em unidades SI). Depende dos espectrofotométricos padrão e tem uma incerteza de sistema de $$\sim 1$$–$$2\%$$.
- **Relativa** (*ubercalibration*, autocalibração): impor que estrelas observadas várias vezes, em campos e noites diferentes, tenham magnitudes **consistentes entre si**, ajustando um ZP por exposição (e termos de campo) que minimize as diferenças. Levantamentos modernos (SDSS, Pan-STARRS, DES) alcançam homogeneidade relativa de poucos milésimos de magnitude em todo o céu por esse método, mesmo que a âncora absoluta continue em 1%.

## Gaia como padrão de todo o céu

Gaia mudou a prática: com fotometria de $$G$$, $$G_\text{BP}$$, $$G_\text{RP}$$ para $$\sim 1{,}5$$ bilhão de estrelas, milimagnitude de precisão e cobertura completa, quase todo campo científico já contém dezenas de "padrões" utilizáveis. A partir dos espectros de baixa resolução de Gaia (Gaia XP) é possível gerar **fotometria sintética** em praticamente qualquer sistema, e usá-la diretamente como referência de calibração no lugar das viagens a campos de Landolt. Ainda assim, o entendimento da equação de calibração e dos termos de cor continua necessário, porque é o que permite julgar quando a calibração está confiável e quando os resíduos indicam um problema instrumental.
