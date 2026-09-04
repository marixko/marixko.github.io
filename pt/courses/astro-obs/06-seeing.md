---
title: "1.6 - Seeing, turbulência e óptica adaptativa"
course: astro-obs
---

## Por que as estrelas cintilam

Um telescópio ideal de diâmetro $$D$$ forma imagens com resolução limitada por difração, $$\theta \sim \lambda/D$$. Do solo, quase nunca chegamos lá: a turbulência atmosférica embaralha a frente de onda e espalha a luz de uma estrela em uma mancha muito maior, o **seeing**. Esta aula quantifica o efeito e descreve como corrigi-lo.

### Conteúdo

- Turbulência de Kolmogorov
- O parâmetro de Fried $$r_0$$
- Seeing, tempo de coerência e ângulo isoplanático
- Cintilação e speckles
- Óptica adaptativa
- Estratégias alternativas

## Turbulência de Kolmogorov

Massas de ar com temperaturas ligeiramente diferentes se misturam de forma turbulenta, criando flutuações do índice de refração. No modelo de **Kolmogorov**, a energia injetada em grandes escalas cascateia para escalas menores até se dissipar, e o espectro de potência das flutuações de fase segue uma lei de potência. A consequência para a óptica: a frente de onda que chega ao telescópio não é plana, mas corrugada, com uma estrutura estatística bem definida.

## O parâmetro de Fried $$r_0$$

Toda a turbulência integrada ao longo da linha de visada se resume em um único número, o **parâmetro de Fried** $$r_0$$: o diâmetro sobre o qual a frente de onda ainda é aproximadamente plana (erro de fase $$\sim 1\ \text{rad}$$). Em um bom sítio, $$r_0 \sim 10$$–$$20\ \text{cm}$$ no visível. Ele depende fortemente do comprimento de onda:

$$
r_0 \propto \lambda^{6/5}.
$$

Um telescópio de abertura $$D$$ se comporta de dois jeitos:

- se $$D \lesssim r_0$$: limitado por difração, a imagem apenas **treme** (*tip-tilt*);
- se $$D \gg r_0$$: limitado por seeing, a imagem se decompõe em muitos *speckles* que se somam numa mancha borrada.

## Seeing, tempo de coerência e ângulo isoplanático

A largura a meia altura da imagem de longa exposição, o **seeing**, é

$$
\varepsilon_\text{FWHM} \approx 0{,}98\,\frac{\lambda}{r_0} \propto \lambda^{-1/5}.
$$

Como $$r_0$$ cresce mais rápido que $$\lambda$$, **o seeing melhora para o vermelho**: um sítio com $$0{,}8''$$ no visível chega a $$\sim 0{,}5''$$ na banda $$K$$. Dois outros parâmetros completam a descrição:

- **Tempo de coerência** $$\tau_0 \approx r_0/v_\text{vento} \sim$$ poucos ms: durante quanto tempo a frente de onda fica congelada. Fixa a frequência a que um sistema de correção precisa operar (centenas de Hz).
- **Ângulo isoplanático** $$\theta_0 \sim r_0/h \sim$$ poucos segundos de arco: a separação angular dentro da qual a turbulência é a mesma. Limita o campo que uma correção pontual consegue nitidar.

## Cintilação e speckles

A **cintilação** (o "piscar" das estrelas a olho nu) é a flutuação de **intensidade** causada pela propagação da frente de onda distorcida: interferência que concentra e rarefaz a luz. É maior para aberturas pequenas e perto do horizonte, e é uma fonte de ruído fotométrico irredutível do solo, que escala como $$D^{-2/3} X^{7/4}$$ e melhora com exposições mais longas.

Em exposições **curtas** (poucos ms), a imagem de uma estrela num telescópio grande não é uma mancha lisa, mas um padrão granulado de **speckles**, cada um com tamanho $$\sim \lambda/D$$. A informação de alta resolução ainda está lá, apenas embaralhada; técnicas de *speckle imaging* e *lucky imaging* a recuperam.

## Óptica adaptativa

A **óptica adaptativa** (AO) mede a distorção da frente de onda e a corrige em tempo real:

1. Um **sensor de frente de onda** (Shack-Hartmann, curvatura, pirâmide) amostra a fase usando uma fonte de referência brilhante.
2. Um computador calcula, centenas de vezes por segundo, o comando de correção.
3. Um **espelho deformável** (e um espelho de *tip-tilt*) aplica a forma conjugada, achatando a frente de onda antes do detector científico.

A qualidade da correção é medida pela **razão de Strehl** $$S$$, a razão entre o pico da PSF corrigida e o pico da PSF ideal ($$S=1$$). A AO funciona muito melhor no infravermelho, onde $$r_0$$ e $$\theta_0$$ são maiores e a frente de onda tem menos radianos de erro.

Limitações e soluções:

- **Estrela de referência**: precisa ser brilhante e próxima do alvo (dentro de $$\theta_0$$). Como isso cobre pouco do céu, criam-se **estrelas guia laser** excitando a camada de sódio a $$90\ \text{km}$$ ou por retroespalhamento Rayleigh. O laser não informa o *tip-tilt* global, que ainda exige uma estrela natural fraca.
- **Cobertura de campo**: sistemas de **AO multiconjugada** e **AO de campo largo** usam vários lasers e vários espelhos deformáveis para corrigir dezenas de segundos de arco.

## Estratégias alternativas

Quando a AO não se aplica, restam: escolher o sítio e o momento (monitoramento de *seeing*), ir para o infravermelho, usar *lucky imaging* em telescópios de porte médio, ou sair da atmosfera. Um telescópio espacial modesto entrega, de graça, uma PSF estável limitada por difração em todo o campo, o que muitas vezes compensa a abertura menor. O trade-off entre abertura no solo e estabilidade no espaço reaparece em quase todo projeto observacional.
