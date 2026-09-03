---
title: "2.5 — Regressão Logística"
course: ml
---

## Regressão logística

Este é o primeiro modelo de classificação do curso, e ele junta várias linhas
que já vimos: modela $$P(Y=1\mid x)$$ diretamente por meio de uma função de
ligação, é a máxima verossimilhança com a log-loss (aulas 1.2 e 1.4), e é um
problema de ERM **convexo** que se resolve com os métodos da aula 2.4.

### Conteúdo

- Classificação binária e o modelo
- Log-odds e a função logística
- Verossimilhança e entropia cruzada
- Gradiente e ajuste
- Fronteira de decisão
- Separabilidade e o caso multiclasse

### Classificação binária e o modelo

Temos $$Y\in\{0,1\}$$ e queremos estimar $$P(Y=1\mid X=x)$$. Um modelo linear
direto $$x^{\top}\beta$$ não serve, pois produz valores fora de $$[0,1]$$.
Passamos o índice linear por uma **função logística** (sigmoide):

$$
p(x)=P(Y=1\mid X=x)=\sigma\big(x^{\top}\beta\big),
\qquad
\sigma(z)=\frac{1}{1+e^{-z}}.
$$

A sigmoide leva $$\mathbb{R}$$ em $$(0,1)$$, é crescente, vale $$1/2$$ em
$$z=0$$, satisfaz $$\sigma(-z)=1-\sigma(z)$$ e tem derivada
$$\sigma'(z)=\sigma(z)\big(1-\sigma(z)\big)$$. O vetor $$x$$ inclui a coluna de
$$1$$ do intercepto. Em linguagem de modelos lineares generalizados, este é o
GLM com resposta Bernoulli e função de ligação logito.

### Log-odds e a função logística

Invertendo a relação, as **chances** (*odds*) são
$$p/(1-p)=e^{x^{\top}\beta}$$, e o **logito** (log das chances) é linear nos
preditores:

$$
\log\frac{P(Y=1\mid x)}{P(Y=0\mid x)}=x^{\top}\beta.
$$

Daí a interpretação dos coeficientes: aumentar $$x_j$$ em uma unidade,
mantendo os demais fixos, multiplica as chances por $$e^{\beta_j}$$. Um
$$\beta_j>0$$ significa que o preditor $$j$$ aumenta a probabilidade da classe
$$1$$.

### Verossimilhança e entropia cruzada

Cada observação é $$y_i\mid x_i\sim\text{Bernoulli}(p_i)$$ com
$$p_i=\sigma(x_i^{\top}\beta)$$. A verossimilhança é

$$
\mathcal{L}(\beta)=\prod_{i=1}^{n}p_i^{\,y_i}(1-p_i)^{\,1-y_i},
$$

e a *negative log-likelihood*, que é a **entropia cruzada** (a log-loss da aula
1.2), é

$$
J(\beta)=-\sum_{i=1}^{n}\big[\,y_i\log p_i+(1-y_i)\log(1-p_i)\,\big].
$$

Dividida por $$n$$, é o risco empírico. Não há solução fechada, mas
$$J(\beta)$$ é **convexa** em $$\beta$$ (a Hessiana é positiva semidefinida,
como se vê a seguir), então o mínimo global é único quando existe e os métodos
iterativos da aula 2.4 se aplicam sem risco de mínimos locais.

### Gradiente e ajuste

Usando $$\sigma'=\sigma(1-\sigma)$$ e a regra da cadeia, o gradiente tem forma
notavelmente simples:

$$
\nabla J(\beta)=\sum_{i=1}^{n}(p_i-y_i)\,x_i=X^{\top}(p-y),
$$

com $$p=\big(\sigma(x_1^{\top}\beta),\ldots,\sigma(x_n^{\top}\beta)\big)^{\top}$$.
Vale o paralelo com OLS, onde o gradiente é $$X^{\top}(X\beta-y)$$: o papel do
resíduo agora é feito por $$p_i-y_i$$. A Hessiana é

$$
\nabla^{2}J(\beta)=\sum_{i=1}^{n}p_i(1-p_i)\,x_i x_i^{\top}=X^{\top}WX,
\qquad
W=\operatorname{diag}\big(p_i(1-p_i)\big)\succeq 0,
$$

o que confirma a convexidade. O passo de Newton pode ser reescrito como
**mínimos quadrados iterativamente reponderados** (IRLS):

$$
\beta_{t+1}=(X^{\top}W_tX)^{-1}X^{\top}W_t\,z_t,
\qquad
z_t=X\beta_t+W_t^{-1}(y-p_t),
$$

ou seja, cada iteração é um WLS com pesos $$p_i(1-p_i)$$ e resposta de trabalho
$$z_t$$. Converge em poucas iterações. Para $$n$$ ou $$p$$ grandes, usa-se
L-BFGS ou SGD. Acrescentar $$\lambda\lVert\beta\rVert_2^{2}$$ ou
$$\lambda\lVert\beta\rVert_1$$ à função objetivo (regressão logística
regularizada) é comum e recomendado, sobretudo com dados quase separáveis.

### Fronteira de decisão

A regra de Bayes para a perda 0-1 (aula 1.3) classifica como $$1$$ quando
$$p(x)>1/2$$, isto é, quando $$x^{\top}\beta>0$$. A **fronteira de decisão**

$$
\{\,x:\ x^{\top}\beta=0\,\}
$$

é um **hiperplano**. É por isso que a regressão logística é um classificador
linear: a fronteira é linear ainda que a probabilidade seja uma função não
linear (sigmoide) de $$x$$.

Um limiar diferente de $$1/2$$ é usado quando as classes têm custos
assimétricos ou estão desbalanceadas: classificar como $$1$$ quando
$$p(x)>c$$ equivale a exigir $$x^{\top}\beta>\log\frac{c}{1-c}$$. Fronteiras
não lineares são obtidas expandindo $$x$$ com termos polinomiais, *kernels* ou
representações aprendidas, e aplicando a logística sobre as *features*
transformadas.

### Separabilidade e o caso multiclasse

Se os dados são **linearmente separáveis**, a máxima verossimilhança **não tem
solução finita**: é sempre possível diminuir $$J(\beta)$$ aumentando
$$\lVert\beta\rVert$$, empurrando as probabilidades para $$0$$ e $$1$$. Os
sinais são coeficientes que divergem e erros-padrão que explodem. Qualquer
regularização com $$\lambda>0$$ (ou parada antecipada) resolve o problema,
tornando o mínimo finito.

Para $$K$$ classes, generaliza-se com a função **softmax** (regressão logística
multinomial):

$$
P(Y=k\mid x)=\frac{e^{x^{\top}\beta_k}}{\sum_{l=1}^{K}e^{x^{\top}\beta_l}},
$$

cuja *negative log-likelihood* é a entropia cruzada categórica da aula 1.4. Por
identificabilidade, fixa-se um dos $$\beta_k$$ em zero ou usa-se regularização.
