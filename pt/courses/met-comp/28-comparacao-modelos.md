---
title: "3.4 - Comparação de modelos"
course: met-comp
---

## Comparação de modelos

Um teste de hipóteses compara dois valores de um parâmetro dentro de um mesmo
modelo. A comparação de modelos é mais geral: quais das várias estruturas
candidatas (número de preditores, forma funcional, família de distribuição)
descreve melhor os dados, sem sobreajustar?

### Conteúdo

- O problema do sobreajuste
- Fator de Bayes
- Critérios de informação: AIC e BIC
- Validação e outras abordagens

## O problema do sobreajuste

Um modelo com mais parâmetros sempre ajusta os dados de treino ao menos tão bem
quanto um modelo menor: a verossimilhança máxima $$p(D\mid\hat\theta)$$ nunca
diminui ao acrescentar parâmetros. Comparar modelos só pela verossimilhança
levaria sempre ao modelo maior. Todos os critérios abaixo penalizam a
complexidade de alguma forma.

## Fator de Bayes

A comparação bayesiana entre dois modelos $$M_1$$ e $$M_2$$ usa as
**verossimilhanças marginais** (aula 3.1):

$$
p(D\mid M_k)=\int p(D\mid\theta_k,M_k)\,p(\theta_k\mid M_k)\,d\theta_k.
$$

O **fator de Bayes** é a razão

$$
B_{12}=\frac{p(D\mid M_1)}{p(D\mid M_2)},
$$

e relaciona as probabilidades a posteriori dos modelos às probabilidades a
priori:

$$
\frac{P(M_1\mid D)}{P(M_2\mid D)}=B_{12}\cdot\frac{P(M_1)}{P(M_2)}.
$$

A verossimilhança marginal penaliza a complexidade **automaticamente**: um
modelo com muitos parâmetros espalha o prior por um espaço grande, então
atribui pouca probabilidade a priori a qualquer conjunto específico de dados
(a "navalha de Occam bayesiana"). Interpreta-se $$B_{12}$$ em escalas como a de
Jeffreys ($$B_{12}>10$$ é evidência forte a favor de $$M_1$$). A dificuldade é
calcular a integral marginal, sensível ao prior.

## Critérios de informação: AIC e BIC

Aproximações mais baratas, que penalizam explicitamente o número de parâmetros
$$k$$. Ambos são calculados a partir da log-verossimilhança máxima
$$\hat\ell=\log p(D\mid\hat\theta)$$, e **menor é melhor**:

$$
\mathrm{AIC}=-2\hat\ell+2k,
\qquad
\mathrm{BIC}=-2\hat\ell+k\log n.
$$

Diferenças:

- o **AIC** estima o erro de previsão fora da amostra; tende a escolher modelos
  um pouco grandes, e não supõe que o "modelo verdadeiro" esteja entre os
  candidatos;
- o **BIC** aproxima $$-2\log p(D\mid M)$$; penaliza mais a complexidade
  ($$\log n>2$$ para $$n>7$$) e é **consistente**: com $$n\to\infty$$, escolhe
  o modelo correto se ele estiver entre os candidatos.

Compara-se pela diferença $$\Delta=\mathrm{crit}_k-\mathrm{crit}_{\min}$$: um
$$\Delta$$ até cerca de $$2$$ indica modelos praticamente equivalentes; acima
de $$10$$, o modelo pior pode ser descartado.

## Validação e outras abordagens

- **Validação cruzada**: estimar o erro de previsão treinando e testando em
  partes disjuntas dos dados; é o padrão-ouro para fins preditivos e não exige
  contar parâmetros.
- **Deviance e teste da razão de verossimilhanças**: para modelos
  **encaixados** (um é caso particular do outro),
  $$2(\hat\ell_1-\hat\ell_2)\sim\chi^{2}_{k_1-k_2}$$ sob o modelo menor.
- **WAIC** e **LOO bayesiano**: versões totalmente bayesianas do AIC e da
  validação cruzada, calculadas a partir de amostras do posterior (Módulo 4).

Nenhum critério é definitivo. O AIC e a validação cruzada respondem "qual
modelo prevê melhor"; o BIC e o fator de Bayes respondem "qual modelo é mais
provavelmente o correto". A escolha do critério depende da pergunta.
