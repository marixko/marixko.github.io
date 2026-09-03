---
title: "8.5 — Quantificação de Incerteza"
course: ml
---

## Quantificação de incerteza

Uma previsão sem incerteza é pouco útil em ciência. Esta aula separa os dois
tipos de incerteza, mostra como produzir intervalos de previsão com garantia de
cobertura e discute calibração, o requisito de que as probabilidades previstas
signifiquem o que dizem.

### Conteúdo

- Incerteza aleatória e epistêmica
- Intervalos de previsão
- Calibração
- Modelos bayesianos e ensembles
- Previsões probabilísticas

### Dois tipos de incerteza

**Incerteza aleatória** é o ruído intrínseco do processo gerador: a variância
de $$Y$$ dado $$x$$, o erro irredutível da aula 3.2. Não diminui com mais dados,
só com medições melhores, e pode depender de $$x$$ (heterocedástica),
$$\sigma^{2}(x)$$.

**Incerteza epistêmica** é a incerteza sobre o **modelo**, decorrente de ter
dados finitos. Ela **diminui** com mais dados e é grande em regiões pouco
povoadas do espaço de *features* ou fora da distribuição de treino.

A variância preditiva total decompõe-se nas duas, pela lei da variância total
aplicada ao posterior dos parâmetros:

$$
\operatorname{Var}(y_*\mid x_*,D)
=
\underbrace{\mathbb{E}_{\theta\mid D}\big[\operatorname{Var}(y_*\mid x_*,\theta)\big]}_{\text{aleatória}}
+
\underbrace{\operatorname{Var}_{\theta\mid D}\big[\mathbb{E}(y_*\mid x_*,\theta)\big]}_{\text{epistêmica}}.
$$

### Intervalos de previsão

Queremos $$[\ell(x_*),u(x_*)]$$ tal que
$$P\big(y_*\in[\ell(x_*),u(x_*)]\big)\ge 1-\alpha$$. As abordagens:

- **regressão quantílica**: ajustar diretamente os quantis condicionais com a
  perda *pinball* (aula 1.3);
- **intervalos bayesianos**: quantis da distribuição preditiva a posteriori
  (aula 8.4);
- **predição conforme**: usa um conjunto de calibração para construir
  intervalos com cobertura **garantida em amostra finita**, sem hipóteses sobre
  a distribuição, contanto que os dados sejam permutáveis.

### Calibração

Um classificador é **calibrado** se, entre os casos aos quais atribui
probabilidade $$0{,}8$$, cerca de $$80\%$$ de fato pertencem à classe. Mede-se
com o diagrama de confiabilidade e o erro de calibração esperado. Redes
profundas costumam ser **superconfiantes**; recalibra-se com escala de
temperatura, escala de Platt ou regressão isotônica, ajustadas num conjunto
separado.

### Estimativas práticas

- **Ensembles profundos**: treinar várias redes com sementes diferentes e
  agregar; costumam dar a melhor estimativa de incerteza epistêmica.
- **Dropout de Monte Carlo** e **última camada bayesiana**: mais baratos,
  qualidade menor.
- **Processos gaussianos**: incerteza epistêmica exata, mas custo cúbico em
  $$n$$.

### Em Astronomia

Os casos concretos: as **PDFs de redshift fotométrico**, cuja largura precisa
ser confiável para a inferência de populações a jusante; as probabilidades de
classificação usadas para selecionar amostras; e a **mudança de covariáveis**
entre o conjunto de treino (espectroscópico, brilhante) e o alvo (fotométrico,
mais fraco), que aumenta a incerteza epistêmica de um jeito que a validação
cruzada padrão não revela.
