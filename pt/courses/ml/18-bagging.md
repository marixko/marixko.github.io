---
title: "4.2 — Bootstrap e Bagging"
course: ml
---

## Bootstrap e bagging

A árvore da aula anterior tem variância alta. O *bagging* a reduz de um jeito
simples: ajustar muitas árvores em reamostragens dos dados e tirar a média. A
reamostragem em questão é o **bootstrap**, uma ferramenta estatística útil por
si só.

### Conteúdo

- Reamostragem bootstrap
- Distribuição amostral
- Bagging
- Redução de variância
- Predição de ensemble

### O bootstrap

O **bootstrap** estima a distribuição amostral de uma estatística reamostrando
os próprios dados. A partir do conjunto $$D$$ de $$n$$ pontos, sorteia-se $$n$$
pontos **com reposição**, formando um conjunto $$D^{*}$$; repete-se $$B$$
vezes. A variação da estatística entre os $$D^{*b}$$ aproxima a sua variação
entre amostras reais do processo gerador, sem precisar de fórmula analítica nem
de novos dados.

Num conjunto bootstrap, a probabilidade de um ponto específico **não** ser
sorteado é $$(1-1/n)^{n}\to e^{-1}\approx 0{,}368$$. Ou seja, cada $$D^{*b}$$
contém cerca de $$63{,}2\%$$ dos pontos distintos, e os demais ficam de fora
(*out-of-bag*).

### Bagging

*Bagging* é a sigla de *bootstrap aggregating*. O procedimento:

1. gerar $$B$$ conjuntos bootstrap $$D^{*1},\ldots,D^{*B}$$;
2. ajustar um modelo $$\hat f_b$$ em cada um;
3. agregar as previsões.

Para regressão, a agregação é a média:

$$
\hat f_{\mathrm{bag}}(x)=\frac{1}{B}\sum_{b=1}^{B}\hat f_b(x).
$$

Para classificação, usa-se o voto majoritário ou a média das probabilidades de
classe.

### Por que a média reduz a variância

Suponha que cada $$\hat f_b(x)$$ tenha variância $$\sigma^{2}$$ e que dois
modelos quaisquer tenham correlação $$\rho$$. A variância da média é

$$
\operatorname{Var}\!\left(\frac{1}{B}\sum_{b=1}^{B}\hat f_b(x)\right)
=
\rho\,\sigma^{2}+\frac{1-\rho}{B}\,\sigma^{2}.
$$

Quando $$B\to\infty$$, o segundo termo desaparece e sobra $$\rho\sigma^{2}$$. O
*bagging* elimina a parte $$\frac{1-\rho}{B}\sigma^{2}$$ da variância; o piso
$$\rho\sigma^{2}$$ depende de quão correlacionados são os modelos. O viés fica
praticamente inalterado, porque cada $$\hat f_b$$ tem o mesmo viés e a média
preserva a média.

### Quando o *bagging* ajuda

Da fórmula acima: o *bagging* ganha mais quando os modelos individuais têm
**variância alta** e são pouco correlacionados. Árvores profundas e não podadas
são o caso ideal: baixo viés, alta variância, e sensíveis o suficiente à
reamostragem para não ficarem todas iguais. Já em modelos estáveis, como a
regressão linear, o ganho é pequeno, e a média de ajustes lineares é
essencialmente um único ajuste.

O piso $$\rho\sigma^{2}$$ também aponta o próximo passo: se conseguirmos
**descorrelacionar** as árvores, reduzimos $$\rho$$ e baixamos o piso. É
exatamente o que as florestas aleatórias fazem.

### Estimativa out-of-bag

Como cerca de um terço dos pontos fica de fora de cada conjunto bootstrap, cada
ponto $$x_i$$ pode ser previsto usando apenas as árvores que **não** o viram no
treino. A média desses erros é a **estimativa out-of-bag** do risco, uma
validação praticamente gratuita, sem precisar de um conjunto separado.
