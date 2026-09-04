---
title: "2.4 - Índices de cor e correção bolométrica"
course: astro-obs
---

## Cor como diagnóstico físico

A diferença entre duas magnitudes de bandas distintas, a **cor**, é a medida fotométrica mais barata da forma do espectro. Ela não precisa de calibração absoluta perfeita, é pouco sensível à distância e correlaciona-se diretamente com a temperatura. Esta aula mostra o que se extrai de cores e como chegar da magnitude a uma luminosidade.

### Conteúdo

- Definição de índice de cor
- Cor e temperatura efetiva
- Diagramas cor-cor e cor-magnitude
- O vetor de avermelhamento
- Correção bolométrica
- Correção K

## Definição de índice de cor

Um **índice de cor** é a diferença de magnitude entre uma banda mais azul e uma mais vermelha, por exemplo

$$
(B-V) = m_B - m_V = -2{,}5\,\log_{10}\!\left(\frac{F_B/F_{0,B}}{F_V/F_{0,V}}\right).
$$

Como é uma diferença, os efeitos multiplicativos comuns às duas bandas (uma nuvem cinza fina, um erro de escala, a distância) **cancelam**. Convenções: para o sistema Vega, uma estrela A0 V tem todas as cores $$\approx 0$$; estrelas quentes têm $$(B-V)<0$$, frias têm $$(B-V)>0$$ (o Sol, G2 V, tem $$(B-V)\approx 0{,}65$$).

## Cor e temperatura efetiva

Para um corpo aproximadamente térmico, a razão de fluxos entre duas bandas é função monótona da temperatura, então a cor é um **termômetro**. Relações empíricas do tipo

$$
T_\text{eff} \approx \frac{a}{(B-V) + b} + c
$$

(e polinômios mais elaborados, calibrados com estrelas de $$T_\text{eff}$$ conhecida por métodos diretos) são usadas rotineiramente. Limitações: a relação satura para estrelas muito quentes (o pico de Planck sai da banda), depende da **metalicidade** e da **gravidade superficial**, e é arruinada pelo avermelhamento interestelar se este não for corrigido. Cores no infravermelho próximo, como $$(V-K)$$ ou $$(J-K)$$, são termômetros melhores porque têm alavancagem maior e sofrem menos extinção.

## Diagramas cor-cor e cor-magnitude

- **Diagrama cor-cor** (por exemplo $$(U-B)$$ contra $$(B-V)$$): as estrelas normais caem sobre uma linha estreita, a **sequência estelar**. Objetos fora dela são candidatos interessantes: quasares, anãs brancas, estrelas com excesso infravermelho por disco, fontes avermelhadas. É a base de seleções fotométricas de amostras.
- **Diagrama cor-magnitude** (CMD): magnitude absoluta contra cor, a versão observacional do diagrama de Hertzsprung-Russell. Para um aglomerado (mesma distância, mesma idade, mesma composição), o CMD revela a sequência principal, o *turn-off* (que dá a idade), o ramo das gigantes e as anãs brancas. É a ferramenta central da astrofísica estelar observacional.

## O vetor de avermelhamento

A poeira interestelar avermelha e enfraquece a luz de forma **dependente de $$\lambda$$** (aula 2.5). Num diagrama cor-cor ou cor-magnitude, isso desloca cada ponto ao longo de um **vetor de avermelhamento** de direção conhecida (fixada pela lei de extinção) e comprimento proporcional à quantidade de poeira. Como a direção do vetor em geral **não** é paralela à sequência estelar, é possível, em muitos casos, separar o efeito da poeira do efeito da temperatura e "desavermelhar" as fotometrias.

## Correção bolométrica

A **correção bolométrica** na banda $$V$$ é definida por

$$
\mathrm{BC}_V = M_\text{bol} - M_V,
$$

de modo que $$M_\text{bol} = M_V + \mathrm{BC}_V$$. Ela contabiliza a fração da luz que cai **fora** da banda $$V$$, então é $$\le 0$$ e depende sobretudo de $$T_\text{eff}$$: é pequena ($$\sim -0{,}1$$) para estrelas tipo solar, cujo pico está no visível, e grande em módulo para estrelas muito quentes (a maior parte da luz sai no UV) e muito frias (sai no infravermelho). Os valores vêm de modelos de atmosfera estelar, tabelados em função de $$T_\text{eff}$$, $$\log g$$ e $$[\text{Fe/H}]$$. Com $$M_V$$ medido e $$\mathrm{BC}_V$$ modelado, chega-se a $$M_\text{bol}$$ e daí a $$L$$ pela relação da aula 2.2.

## Correção K

Para fontes extragalácticas com redshift $$z$$, a banda observada corresponde, no referencial da fonte, a um comprimento de onda $$\lambda/(1+z)$$, mais azul. A **correção K** converte a magnitude observada na banda $$X$$ para a magnitude que se mediria na mesma banda no referencial de repouso:

$$
M_X = m_X - \mu - K_X(z),
$$

com $$K_X(z)$$ dependente do espectro da fonte. É desprezível para $$z\ll 1$$ e dominante em $$z\gtrsim 1$$; calcula-se por fotometria sintética a partir de um espectro modelo ou observado. Um caso limpo é escolher, em cada redshift, a banda cujo $$\lambda_\text{eff}/(1+z)$$ coincide com uma banda de referência fixa, minimizando a correção.
