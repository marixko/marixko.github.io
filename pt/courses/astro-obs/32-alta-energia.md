---
title: "6.3 - Ultravioleta, raios X e raios gama"
course: astro-obs
---

## O espectro que exige o espaço

Ultravioleta, raios X e raios gama são absorvidos pela atmosfera e só podem ser observados do espaço (ou, no caso dos raios gama de altíssima energia, usando a própria atmosfera como detector). Cada faixa tem óptica, detectores e estatística próprios.

### Conteúdo

- Ultravioleta
- Raios X: óptica de incidência rasante
- Detectores de raios X
- Resposta e análise espectral
- Raios gama
- Estatística de baixa contagem

## Ultravioleta

O UV ($$\sim 10$$–$$320\ \text{nm}$$) é, do ponto de vista óptico, parecido com o azul, mas com dois problemas: os revestimentos refletores comuns (Al) precisam de sobrecamadas ($$\text{MgF}_2$$, LiF) para não oxidar e perder refletividade, e os detectores são placas de microcanais ou CCDs sensibilizados. É a faixa das transições ressonantes (Ly$$\alpha$$, CIV, MgII), do contínuo de estrelas quentes, do gás quente e do meio circumgaláctico em absorção contra quasares. Missões: IUE, GALEX, HST/COS e STIS.

## Raios X: óptica de incidência rasante

Fótons de raios X atravessam ou são absorvidos por espelhos em incidência normal. A solução é a **óptica de incidência rasante** (telescópios de Wolter): a luz reflete a ângulos de $$< 1^\circ$$ em pares de superfícies (paraboloide + hiperboloide), aninhadas como cascas para aumentar a área. Consequências:

- a **área efetiva** é muito menor que a área geométrica e cai com a energia (ângulo crítico menor);
- o campo de visão é pequeno e a PSF piora fora do eixo;
- acima de $$\sim 10\ \text{keV}$$ focar fica muito difícil, e usam-se **colimadores** ou **máscaras codificadas** (uma máscara de padrão conhecido projeta uma sombra no detector; a distribuição do céu é recuperada por deconvolução).

## Detectores de raios X

Um CCD de raios X funciona como **espectrômetro de contagem de fótons**: cada fóton X libera uma nuvem de carga **proporcional à sua energia**, então cada evento registra posição, energia e tempo de chegada. A partir da lista de eventos monta-se imagem, espectro ou curva de luz depois. A **resolução espectral** de um CCD é $$E/\Delta E \sim 20$$–$$50$$; **microcalorímetros** criogênicos (XRISM/Resolve, futuro Athena) medem o minúsculo aumento de temperatura por fóton e chegam a $$E/\Delta E \sim 1000$$. O **pile-up** (dois fótons no mesmo pixel entre leituras) distorce fontes brilhantes e limita a taxa utilizável.

## Resposta e análise espectral

Não se "calibra em fluxo" um espectro de raios X como no óptico. A relação entre o espectro real $$S(E)$$ e as contagens observadas $$C(i)$$ no canal $$i$$ é

$$
C(i) = \int R(i,E)\, A(E)\, S(E)\, dE + B(i),
$$

onde $$A(E)$$ é a **área efetiva** (arquivo ARF), $$R(i,E)$$ é a **matriz de redistribuição** (arquivo RMF, que espalha a energia verdadeira pelos canais) e $$B(i)$$ é o fundo. Como essa relação **não é invertível** de forma estável, a análise é feita por **forward folding**: propõe-se um modelo físico $$S(E;\theta)$$ (lei de potência, plasma térmico, linhas), passa-se pela resposta, e ajustam-se os parâmetros $$\theta$$ comparando com $$C(i)$$. Ferramentas: XSPEC, Sherpa.

## Raios gama

- **keV–MeV**: sem foco possível; **máscaras codificadas** (INTEGRAL) ou detectores de cintilação com colimação.
- **MeV–GeV**: **produção de pares**. O fóton se converte em $$e^+e^-$$ num conversor; um rastreador segue as trajetórias (dá a direção) e um calorímetro mede a energia (Fermi-LAT). Resolução angular de graus a arcmin, melhorando com a energia.
- **GeV–TeV e acima**: do **solo**, por telescópios **Cherenkov** (H.E.S.S., MAGIC, VERITAS, CTA). O fóton gama gera um chuveiro de partículas na alta atmosfera, que emite um flash de luz Cherenkov de nanossegundos; vários telescópios registram esse flash e reconstroem a direção e a energia do fóton primário. A "abertura" efetiva é a área iluminada pelo flash ($$\sim 10^5\ \text{m}^2$$), enorme, mas o **ciclo útil** é baixo (só noites limpas e sem Lua) e há um fundo intenso de chuveiros de raios cósmicos a rejeitar.

## Estatística de baixa contagem

Em altas energias uma "fonte" pode ser **dezenas de fótons**. A estatística gaussiana e o $$\chi^2$$ deixam de valer:

- os erros são **de Poisson**, assimétricos, e $$\sqrt{N}$$ subestima a incerteza quando $$N$$ é pequeno;
- ajusta-se por **máxima verossimilhança de Poisson** não binada (estatística de Cash ou C-stat), não por $$\chi^2$$;
- **agrupar** canais para ter $$\gtrsim 20$$ contagens por bin permite usar $$\chi^2$$, ao custo de resolução espectral;
- significância de detecção e limites superiores vêm de razões de verossimilhança e de simulações, não de "$$n\sigma$$" ingênuo.

Essa mesma estatística reaparece em qualquer regime de poucos fótons: espectroscopia de fontes muito fracas, contagem de eventos raros, astronomia de neutrinos.
