---
title: "1.19 - Regressão linear múltipla"
course: met-comp
---

## Regressão linear múltipla

A regressão simples da aula 1.17 usa um preditor. Quase todo problema real tem
vários, e é comum querer o efeito de um deles **controlando** os demais. A
regressão múltipla faz isso, e a notação matricial deixa as fórmulas tão
compactas quanto no caso simples.

### Conteúdo

- O modelo em forma matricial
- Estimação por mínimos quadrados
- Interpretação dos coeficientes
- Inferência e $$R^{2}$$ ajustado
- Multicolinearidade
- Seleção de variáveis

## O modelo em forma matricial

Com $$n$$ observações e $$p$$ preditores (incluindo o intercepto),

$$
y=X\beta+\varepsilon,
\qquad
\varepsilon\sim\mathcal{N}(0,\sigma^{2}I_n),
$$

onde $$y\in\mathbb{R}^{n}$$, a **matriz de desenho**
$$X\in\mathbb{R}^{n\times p}$$ tem uma coluna de $$1$$ e as demais com os
preditores, e $$\beta\in\mathbb{R}^{p}$$. Linha a linha,
$$y_i=\beta_0+\beta_1 x_{i1}+\cdots+\beta_{p-1}x_{i,p-1}+\varepsilon_i$$.

## Estimação por mínimos quadrados

Minimizando $$\lVert y-X\beta\rVert^{2}$$, o gradiente
$$-2X^{\top}(y-X\beta)$$ zera nas **equações normais**
$$X^{\top}X\,\hat\beta=X^{\top}y$$, cuja solução, quando $$X$$ tem posto
completo, é

$$
\boxed{
\hat\beta=(X^{\top}X)^{-1}X^{\top}y.
}
$$

Os valores ajustados são $$\hat y=X\hat\beta=Hy$$ com a **matriz chapéu**
$$H=X(X^{\top}X)^{-1}X^{\top}$$, e a variância do erro é estimada por

$$
\hat\sigma^{2}=\frac{\lVert y-\hat y\rVert^{2}}{n-p}.
$$

Geometricamente, $$\hat y$$ é a projeção ortogonal de $$y$$ no espaço gerado
pelas colunas de $$X$$.

## Interpretação dos coeficientes

$$\beta_j$$ é a variação esperada em $$y$$ quando $$x_j$$ aumenta de uma
unidade e **todos os outros preditores são mantidos fixos**. Essa cláusula é o
que diferencia a regressão múltipla de rodar várias regressões simples: o
coeficiente já vem "ajustado" para os demais.

## Inferência e $$R^{2}$$ ajustado

Sob o modelo gaussiano,

$$
\hat\beta\sim\mathcal{N}\!\big(\beta,\ \sigma^{2}(X^{\top}X)^{-1}\big),
$$

e o erro padrão de $$\hat\beta_j$$ é a raiz do $$j$$-ésimo elemento diagonal
dessa matriz, com $$\sigma^{2}$$ trocado por $$\hat\sigma^{2}$$. Para cada
coeficiente, $$T_j=\hat\beta_j/\mathrm{ep}(\hat\beta_j)\sim t_{n-p}$$. O teste
$$F$$ global compara o modelo ao modelo só com o intercepto.

O $$R^{2}$$ nunca diminui quando se acrescenta um preditor, mesmo que
irrelevante. O **$$R^{2}$$ ajustado** penaliza o número de parâmetros:

$$
R^{2}_{\text{aj}}=1-\frac{\mathrm{SQR}/(n-p)}{\mathrm{SQT}/(n-1)}.
$$

## Multicolinearidade

Quando duas ou mais colunas de $$X$$ são quase combinações lineares umas das
outras, $$X^{\top}X$$ fica mal condicionada, $$(X^{\top}X)^{-1}$$ tem entradas
enormes e as variâncias de $$\hat\beta$$ explodem: os coeficientes ficam
instáveis e mudam de sinal com pequenas perturbações dos dados. Detecta-se pelo
**fator de inflação da variância**,

$$
\mathrm{VIF}_j=\frac{1}{1-R_j^{2}},
$$

onde $$R_j^{2}$$ é o $$R^{2}$$ da regressão de $$x_j$$ sobre os outros
preditores. $$\mathrm{VIF}$$ acima de $$5$$ a $$10$$ sinaliza problema.
Soluções: remover preditores redundantes, combiná-los, ou regularizar (*ridge*,
*lasso*), tema do módulo de aprendizado de máquina.

## Seleção de variáveis

Escolher quais preditores incluir envolve um compromisso entre viés (modelo
pequeno demais) e variância (modelo grande demais). As abordagens usuais:

- procedimentos passo a passo (para frente, para trás, misto), guiados por um
  critério como o **AIC** ou o **BIC**, que somam ao ajuste uma penalidade pelo
  número de parâmetros;
- validação cruzada, escolhendo o modelo de menor erro de previsão fora da
  amostra;
- regularização, que faz seleção e estimação ao mesmo tempo.

A significância de um coeficiente isolado (teste $$t$$) não deve ser o único
critério, sobretudo com muitos preditores, pelo problema das comparações
múltiplas da aula 1.15.
