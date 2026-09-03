---
title: 1.2 — Funções de perda e risco
course: ml
---

## Funções de perda e risco

Na aula anterior dissemos que aprender é escolher uma função de predição
$$f$$ que "erre pouco". Nesta aula tornamos essa ideia precisa: uma **função
de perda** define o que significa errar, o **risco** mede o erro médio sobre
todo o processo gerador, e o **preditor ótimo de Bayes** é o melhor que se pode
fazer: o alvo que todo algoritmo tenta alcançar.

### Conteúdo

- Função de perda
- Perda quadrática
- Perda absoluta
- Perda 0–1
- Log-loss
- Risco esperado
- Risco empírico
- Preditor ótimo de Bayes

### Função de perda

Uma **função de perda** é uma função

$$
L:\mathcal{Y}\times\mathcal{Y}\rightarrow\mathbb{R}_{\geq 0},
$$

onde $$L(y,\hat y)$$ é o custo de prever $$\hat y$$ quando o valor verdadeiro
é $$y$$. Em geral pede-se que $$L(y,y)=0$$ (não há custo quando se acerta) e
que $$L\geq 0$$. A escolha de $$L$$ não é um detalhe técnico: ela codifica
quais erros são toleráveis e quais são graves e, como veremos, determina
qual característica da distribuição de $$Y$$ o modelo vai aprender.

Do lado da regressão ($$Y$$ contínuo) as perdas mais comuns dependem apenas do
**resíduo** $$r = y-\hat y$$. Do lado da classificação ($$Y$$ categórico) a
perda depende de o rótulo estar certo ou errado, ou da probabilidade que o
modelo atribuiu ao rótulo correto.

### Perda quadrática

A **perda quadrática** (ou erro quadrático, $$L_2$$) é

$$
L(y,\hat y)=(y-\hat y)^2.
$$

É a escolha padrão em regressão. Como o resíduo entra ao quadrado, ela penaliza
**desproporcionalmente** os erros grandes: um erro de $$2$$ custa quatro vezes
mais do que um erro de $$1$$. Isso a torna sensível a *outliers* e a caudas
pesadas. Estatisticamente, minimizar a perda quadrática equivale a supor ruído
gaussiano de variância constante: a estimação por mínimos quadrados é a
máxima verossimilhança sob

$$
Y\mid X=x \;\sim\; \mathcal{N}\big(f(x),\,\sigma^2\big).
$$

### Perda absoluta

A **perda absoluta** ($$L_1$$) é

$$
L(y,\hat y)=\lvert y-\hat y\rvert.
$$

O resíduo entra linearmente, então erros grandes pesam menos do que na perda
quadrática: ela é **mais robusta** a *outliers*. O preço é que $$L$$ não é
diferenciável em $$r=0$$, o que complica um pouco a otimização. Ela corresponde
à máxima verossimilhança sob ruído de Laplace,

$$
p(y\mid x)\;\propto\;\exp\!\big(-\lvert y-f(x)\rvert/b\big).
$$

### Perda 0–1

Em classificação, a perda mais natural é a **perda 0–1**:

$$
L(y,\hat y)=\mathbf{1}[\,y\neq\hat y\,]
=
\begin{cases}
0, & \hat y = y,\\
1, & \hat y \neq y.
\end{cases}
$$

O risco associado é simplesmente a **probabilidade de classificar errado**.
É a métrica que de fato interessa em muitos problemas, mas é **não convexa** e
**não diferenciável** (constante por partes, com um salto). Otimizá-la
diretamente é um problema combinatório difícil, e por isso os algoritmos
minimizam *perdas substitutas* (do inglês *surrogate losses*) convexas, como
a log-loss abaixo, a *hinge loss* da SVM ou a exponencial do boosting, que
são tratáveis e cujo mínimo coincide (sob condições brandas) com o da 0–1.

### Log-loss

Quando o classificador produz **probabilidades** em vez de apenas um rótulo,
avaliamos essas probabilidades com a **log-loss** (entropia cruzada, ou
*negative log-likelihood*). Seja $$\hat p(x)$$ a distribuição de probabilidade
sobre as classes que o modelo prevê em $$x$$. No caso binário, com
$$y\in\{0,1\}$$ e $$\hat p=\hat p(x)=\hat P(Y=1\mid X=x)$$,

$$
L(y,\hat p)=-\big[\,y\log\hat p+(1-y)\log(1-\hat p)\,\big].
$$

No caso de $$K$$ classes, com $$\hat p_k$$ a probabilidade prevista para a
classe $$k$$,

$$
L(y,\hat p)=-\sum_{k=1}^{K}\mathbf{1}[\,y=k\,]\log\hat p_k=-\log\hat p_y.
$$

A log-loss explode quando o modelo atribui probabilidade próxima de zero ao
rótulo que de fato ocorreu: ela pune tanto o erro quanto o **excesso de
confiança**. É um *proper scoring rule*: em valor esperado, é minimizada
exatamente quando $$\hat p(x)$$ é igual à distribuição condicional verdadeira
$$P(Y\mid X=x)$$. Isso a torna a perda adequada quando se quer um modelo
**bem calibrado**, e não apenas boas fronteiras de decisão.

### Risco esperado

Fixada a perda, a qualidade de uma função $$f$$ é o seu **risco esperado**
(também chamado risco populacional ou erro de generalização):

$$
R(f)=\mathbb{E}_{(X,Y)\sim P}\big[\,L\big(Y,f(X)\big)\,\big].
$$

É a média da perda sobre **todo** o processo gerador, não apenas sobre os dados
que temos. Usando a lei da esperança total, podemos condicionar em $$X$$:

$$
R(f)=\mathbb{E}_{X}\Big[\;\mathbb{E}_{Y\mid X}\big[\,L(Y,f(X))\,\big\vert\,X\,\big]\;\Big].
$$

Essa forma é importante: como o termo interno depende de $$f$$ apenas através do
valor $$f(x)$$, podemos **minimizar ponto a ponto**, escolhendo, para cada $$x$$,
o valor $$f(x)$$ que minimiza a perda esperada condicional. É isso que leva ao
preditor de Bayes, mais adiante.

### Risco empírico

Como $$P$$ é desconhecida, não podemos calcular $$R(f)$$. Substituímos a
esperança pela média sobre o conjunto de treinamento
$$D=\{(x_i,y_i)\}_{i=1}^{n}$$, obtendo o **risco empírico**:

$$
\hat R_n(f)=\frac{1}{n}\sum_{i=1}^{n}L\big(y_i,f(x_i)\big).
$$

Para um $$f$$ **fixo**, $$\hat R_n(f)$$ é um estimador não viesado de $$R(f)$$,
com $$\mathbb{E}[\hat R_n(f)]=R(f)$$, e pela lei dos grandes números
$$\hat R_n(f)\to R(f)$$ quando $$n\to\infty$$. O princípio de
**minimização do risco empírico** (ERM) escolhe

$$
\hat f=\arg\min_{f\in\mathcal{H}}\hat R_n(f).
$$

O cuidado: assim que $$\hat f$$ é escolhido **usando** os mesmos dados,
$$\hat R_n(\hat f)$$ deixa de ser não viesado e passa a ser **otimista**, ou
seja, subestima o risco verdadeiro. A diferença

$$
R(\hat f)-\hat R_n(\hat f)
$$

é a lacuna de generalização, e cresce com a riqueza de $$\mathcal{H}$$: é a
manifestação formal do sobreajuste. Por isso o risco é estimado em um conjunto
de teste independente.

### Preditor ótimo de Bayes

O **preditor de Bayes** $$f^{*}$$ é a função que minimiza $$R(f)$$ entre
**todas** as funções (mensuráveis), sem a restrição a um espaço de hipóteses:

$$
f^{*}=\arg\min_{f}R(f),
\qquad
R^{*}=R(f^{*}).
$$

$$R^{*}$$ é o **risco de Bayes**, o erro mínimo possível, devido apenas ao ruído
intrínseco de $$P(Y\mid X)$$. Nenhum modelo, por melhor que seja, consegue ir
abaixo dele. Minimizando ponto a ponto o risco condicional, obtém-se $$f^{*}$$
para cada perda:

| Perda | Preditor de Bayes $$f^{*}(x)$$ |
| --- | --- |
| Quadrática | $$\mathbb{E}[\,Y\mid X=x\,]$$ (média condicional) |
| Absoluta | mediana de $$Y\mid X=x$$ |
| 0–1 | $$\displaystyle\arg\max_{k}P(Y=k\mid X=x)$$ (classificador de Bayes) |
| Log-loss | a própria distribuição $$P(Y\mid X=x)$$ |

Para a perda 0–1, o risco de Bayes tem forma explícita:

$$
R^{*}=\mathbb{E}_{X}\Big[\,1-\max_{k}P(Y=k\mid X)\,\Big].
$$

Na prática nunca alcançamos $$f^{*}$$, e o erro de um modelo se decompõe em

$$
\underbrace{R(\hat f)-R^{*}}_{\text{excesso de risco}}
=
\underbrace{\big(R(f_{\mathcal{H}})-R^{*}\big)}_{\text{erro de aproximação}}
+
\underbrace{\big(R(\hat f)-R(f_{\mathcal{H}})\big)}_{\text{erro de estimação}},
$$

onde $$f_{\mathcal{H}}$$ é o melhor elemento de $$\mathcal{H}$$. O erro de
aproximação vem de $$\mathcal{H}$$ ser pequeno demais (viés); o erro de
estimação vem de ter dados de menos para encontrar o melhor $$f$$ em
$$\mathcal{H}$$ (variância). Esse é o **compromisso viés–variância** visto pela
lente do risco.
