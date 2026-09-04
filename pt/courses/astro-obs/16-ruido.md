---
title: "3.5 - Ruído e a equação sinal-ruído"
course: astro-obs
---

## Quanto vale uma medida

Toda contagem astronômica tem incerteza, e a razão entre o sinal e essa incerteza, o **S/N**, decide se há detecção, com que precisão se mede um fluxo, e quanto tempo de telescópio é preciso. Esta aula deriva a equação de S/N do CCD e discute os seus regimes.

### Conteúdo

- Fontes de ruído
- Ruído de Poisson
- A equação do CCD
- Regime limitado pela fonte e pelo fundo
- Tempo de exposição e magnitude limite
- Erro em magnitude e abertura ótima

## Fontes de ruído

- **Ruído de Poisson da fonte**: a chegada de fótons é um processo de Poisson; $$N$$ elétrons detectados têm desvio padrão $$\sqrt{N}$$. Irredutível.
- **Ruído de Poisson do céu**: idem para os fótons do fundo do céu que caem na abertura.
- **Ruído de Poisson da corrente de escuro**: idem para os elétrons térmicos.
- **Ruído de leitura** $$R$$: incerteza fixa (em $$e^-$$ RMS) adicionada pelo amplificador a cada pixel, a cada leitura. Independe do sinal.
- **Ruído de digitização**: quantização do A/D, pequeno se o ganho for bem escolhido.
- **Erros sistemáticos**: imperfeições do *flat-field*, subtração de céu, calibração. Não caem com $$\sqrt{t}$$ e acabam sendo o piso de precisão em fontes brilhantes.

## Ruído de Poisson

Para uma variável de Poisson, variância = média. Se uma fonte deposita $$N_\star$$ elétrons e o céu $$N_S$$ elétrons **por pixel** sobre $$n_\text{pix}$$ pixels da abertura, e a corrente de escuro é $$N_D$$ por pixel, as variâncias se **somam**:

$$
\sigma^2 = \underbrace{N_\star}_\text{fonte} + \underbrace{n_\text{pix} N_S}_\text{céu} + \underbrace{n_\text{pix} N_D}_\text{escuro} + \underbrace{n_\text{pix} R^2}_\text{leitura}.
$$

O sinal é $$N_\star$$ (as componentes de fundo são subtraídas na média, mas o seu ruído permanece).

## A equação do CCD

Juntando tudo, a razão sinal-ruído de uma medida fotométrica é

$$
\frac{S}{N} = \frac{N_\star}{\sqrt{N_\star + n_\text{pix}\left(N_S + N_D + R^2\right)}}.
$$

Escrevendo $$N_\star = f_\star\, t$$ e $$N_S = b_S\, t$$ (taxas em $$e^-/\text{s}$$), fica explícita a dependência no tempo de exposição $$t$$:

$$
\frac{S}{N} = \frac{f_\star\, t}{\sqrt{f_\star t + n_\text{pix}\left(b_S t + b_D t + R^2\right)}}.
$$

## Regime limitado pela fonte e pelo fundo

**Fonte brilhante** ($$N_\star$$ domina o denominador):

$$
\frac{S}{N} \approx \sqrt{N_\star} = \sqrt{f_\star\, t} \;\propto\; \sqrt{t}.
$$

Quadruplicar o tempo dobra o S/N. É o regime da fotometria estelar em campos não muito profundos.

**Fonte fraca** (o céu domina, e $$R^2$$ é desprezível frente a $$b_S t$$):

$$
\frac{S}{N} \approx \frac{f_\star\, t}{\sqrt{n_\text{pix}\, b_S\, t}} = \frac{f_\star}{\sqrt{n_\text{pix}\, b_S}}\,\sqrt{t} \;\propto\; \sqrt{t}.
$$

De novo $$\sqrt{t}$$, mas agora o S/N também escala com $$D^2$$ (via $$f_\star$$) e piora com o brilho do céu e com o tamanho da PSF (via $$n_\text{pix}$$). É o regime dos levantamentos profundos, e a razão pela qual **céu escuro, abertura grande e boa imagem** são decisivos.

**Regime de leitura** (exposições muito curtas, $$R^2 > b_S t$$): $$S/N \propto t$$, e vale a pena aumentar $$t$$ até sair desse regime. Daí a regra de que cada exposição individual deve ter fundo de céu $$\gtrsim 3$$–$$5\,R^2$$ por pixel.

## Tempo de exposição e magnitude limite

Invertendo a equação do CCD chega-se ao **tempo para atingir um dado S/N**, que é o cálculo de uma *exposure time calculator*. A **magnitude limite** de uma observação é a magnitude para a qual $$S/N$$ cai a um valor de referência (5 para "detecção", 10 para fotometria decente). No regime de céu:

$$
m_\text{lim} \approx \text{ZP} - 2{,}5\log_{10}\!\left[\frac{(S/N)_\text{lim}}{t}\sqrt{n_\text{pix}\,b_S\,t}\right],
$$

ou seja, ganha-se $$\sim 1{,}25\ \text{mag}$$ a cada fator 10 em tempo, $$2{,}5\ \text{mag}$$ a cada fator 10 em área coletora, e $$\sim 0{,}75\ \text{mag}$$ a cada fator 2 de melhora no *seeing*.

## Erro em magnitude e abertura ótima

Propagando a definição de magnitude, o erro fotométrico se relaciona ao S/N por

$$
\sigma_m = \frac{2{,}5}{\ln 10}\,\frac{1}{S/N} \approx \frac{1{,}0857}{S/N}.
$$

Um S/N de 100 corresponde a $$0{,}011\ \text{mag}$$; para chegar a $$0{,}001\ \text{mag}$$ (fotometria de trânsitos) é preciso $$S/N \sim 1000$$, normalmente só alcançável somando muitas exposições e com sistemática sob controle.

O **raio de abertura** que maximiza o S/N não é o que contém toda a luz: aberturas grandes captam mais fonte mas também muito mais céu e ruído de leitura. O ótimo fica em torno de $$0{,}7$$–$$1{,}0$$ FWHM, e a luz perdida fora dele é recuperada por uma **correção de abertura** medida em estrelas brilhantes isoladas (aula 4.3). Combinar $$M$$ exposições em vez de uma só longa custa um extra de $$\sqrt{M}\,R$$ em ruído de leitura, quase sempre um preço pequeno frente às vantagens (rejeição de raios cósmicos, saturação, *tracking*, flexibilidade).
