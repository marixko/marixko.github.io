---
title: 2.1 — Regressão Linear e Mínimos Quadrados
course: ml
---

## Regressão linear e mínimos quadrados

Começa aqui a Parte II do curso, sobre modelos lineares. A regressão linear é
o primeiro modelo concreto, e é uma instância exata do que vimos até agora:
minimização do risco empírico com **perda quadrática** e um espaço de
hipóteses **linear**. Apesar da simplicidade, ela tem solução fechada, uma
leitura geométrica limpa e propriedades ótimas que servem de referência para
tudo o que vem depois.

### Conteúdo

- O modelo linear
- Mínimos quadrados ordinários
- Equações normais e solução fechada
- Interpretação geométrica: projeção ortogonal
- A matriz chapéu
- Propriedades do estimador (Gauss-Markov)

### O modelo linear

Temos $$n$$ observações e $$p$$ preditores (contando o intercepto). Empilhamos
as entradas na **matriz de desenho** $$X\in\mathbb{R}^{n\times p}$$, as
respostas em $$y\in\mathbb{R}^{n}$$ e os parâmetros em
$$\beta\in\mathbb{R}^{p}$$. O modelo é

$$
y=X\beta+\epsilon,
$$

ou, linha a linha, $$y_i=x_i^{\top}\beta+\epsilon_i$$. O termo "linear" se
refere aos **parâmetros**, não aos preditores: colunas de $$X$$ podem conter
$$x^2$$, $$\log x$$, interações ou qualquer transformação fixa das variáveis
originais. Uma coluna de $$1$$ representa o intercepto.

Para usar mínimos quadrados como estimador pontual basta supor
$$\mathbb{E}[\epsilon\mid X]=0$$. Para fazer inferência sobre $$\beta$$
acrescentamos $$\operatorname{Var}(\epsilon\mid X)=\sigma^{2}I_n$$, ou seja,
ruído de variância constante e não correlacionado.

### Mínimos quadrados ordinários

O estimador de **mínimos quadrados ordinários** (OLS) é o que minimiza a soma
dos quadrados dos resíduos:

$$
\hat\beta
=
\arg\min_{\beta}\;\frac{1}{n}\sum_{i=1}^{n}\big(y_i-x_i^{\top}\beta\big)^2
=
\arg\min_{\beta}\;\lVert y-X\beta\rVert_2^{2}.
$$

O fator $$1/n$$ não altera o minimizador, então trabalhamos com a soma. Isso é
literalmente ERM com $$L(y,\hat y)=(y-\hat y)^2$$ e
$$\mathcal{H}=\{x\mapsto x^{\top}\beta:\beta\in\mathbb{R}^{p}\}$$. A função
objetivo $$S(\beta)=\lVert y-X\beta\rVert^{2}$$ é uma quadrática convexa em
$$\beta$$, então o mínimo global está onde o gradiente se anula.

Vale a conexão com a aula anterior: se
$$\epsilon\mid X\sim\mathcal{N}(0,\sigma^{2}I)$$, então OLS coincide com a
**máxima verossimilhança**, porque a NLL gaussiana é o erro quadrático mais uma
constante.

### Equações normais e solução fechada

Expandindo a função objetivo,

$$
S(\beta)
=
(y-X\beta)^{\top}(y-X\beta)
=
y^{\top}y-2\beta^{\top}X^{\top}y+\beta^{\top}X^{\top}X\beta,
$$

e derivando em relação a $$\beta$$,

$$
\nabla_{\beta}S(\beta)
=
-2X^{\top}y+2X^{\top}X\beta
=
-2X^{\top}(y-X\beta).
$$

Igualando a zero, chegamos às **equações normais**:

$$
X^{\top}X\,\hat\beta=X^{\top}y.
$$

Quando $$X$$ tem posto de coluna completo (colunas linearmente independentes,
o que exige $$p\le n$$), a matriz $$X^{\top}X$$ é inversível e

$$
\boxed{\;\hat\beta=(X^{\top}X)^{-1}X^{\top}y\;}
$$

A Hessiana $$2X^{\top}X$$ é positiva definida nesse caso, o que confirma tratar-se
de um mínimo. Na prática **não se inverte** $$X^{\top}X$$: resolve-se o sistema
por decomposição de Cholesky, ou, de forma numericamente mais estável, aplica-se
uma decomposição QR ou SVD diretamente a $$X$$, evitando elevar o número de
condição ao quadrado.

### Interpretação geométrica: projeção ortogonal

Seja $$\hat y=X\hat\beta$$ o vetor de valores ajustados. As equações normais
podem ser reescritas como

$$
X^{\top}(y-X\hat\beta)=0,
$$

ou seja, o vetor de **resíduos** $$\hat\epsilon=y-\hat y$$ é ortogonal a todas
as colunas de $$X$$ e, portanto, a todo o **espaço coluna**
$$\operatorname{col}(X)$$. Isso identifica $$\hat y$$ como a **projeção
ortogonal** de $$y$$ sobre $$\operatorname{col}(X)$$: o ponto desse subespaço
mais próximo de $$y$$ na norma euclidiana. É a versão em dimensão finita da
ideia de que minimizar distância a um subespaço é o mesmo que projetar nele.

Da ortogonalidade entre $$\hat y$$ e $$\hat\epsilon$$ segue o teorema de
Pitágoras,

$$
\lVert y\rVert^{2}=\lVert\hat y\rVert^{2}+\lVert\hat\epsilon\rVert^{2},
$$

que, aplicado às variáveis centradas, dá a decomposição
$$\mathrm{SQT}=\mathrm{SQE}+\mathrm{SQR}$$ usada para definir o $$R^{2}$$.

### A matriz chapéu

Substituindo $$\hat\beta$$ em $$\hat y$$,

$$
\hat y=X\hat\beta=X(X^{\top}X)^{-1}X^{\top}y=P_X\,y,
\qquad
\boxed{\;P_X=X(X^{\top}X)^{-1}X^{\top}\;}
$$

$$P_X$$ é a **matriz chapéu** (por colocar o "chapéu" em $$y$$) ou matriz de
projeção. As suas propriedades traduzem a geometria da seção anterior:

- **simétrica**, $$P_X^{\top}=P_X$$;
- **idempotente**, $$P_X^{2}=P_X$$ (projetar de novo não muda nada);
- $$P_X X=X$$ e os autovalores são $$0$$ ou $$1$$;
- $$\operatorname{tr}(P_X)=p$$, a dimensão de $$\operatorname{col}(X)$$;
- $$I-P_X$$ projeta no complemento ortogonal, de modo que
  $$\hat\epsilon=(I-P_X)\,y$$.

Os elementos da diagonal $$h_{ii}$$ são chamados de **alavancagem** (*leverage*)
e medem quanto a observação $$i$$ influencia o próprio valor ajustado. Vale
$$0\le h_{ii}\le 1$$ e $$\sum_i h_{ii}=p$$; pontos com $$h_{ii}$$ alto merecem
atenção no diagnóstico do ajuste.

### Propriedades do estimador (Gauss-Markov)

Sob $$\mathbb{E}[\epsilon\mid X]=0$$, o estimador de OLS é **não viesado**:

$$
\mathbb{E}[\hat\beta\mid X]
=
(X^{\top}X)^{-1}X^{\top}\,\mathbb{E}[y\mid X]
=
(X^{\top}X)^{-1}X^{\top}X\beta
=
\beta.
$$

Acrescentando $$\operatorname{Var}(\epsilon\mid X)=\sigma^{2}I$$, a matriz de
covariância é

$$
\operatorname{Var}(\hat\beta\mid X)=\sigma^{2}\,(X^{\top}X)^{-1}.
$$

O **teorema de Gauss-Markov** afirma que, entre todos os estimadores que são
lineares em $$y$$ e não viesados, o de mínimos quadrados é o de menor
variância (é o *best linear unbiased estimator*, BLUE). O resultado não exige
normalidade do ruído. A variância de $$\sigma^{2}$$ é estimada sem viés por

$$
\hat\sigma^{2}=\frac{\lVert\hat\epsilon\rVert^{2}}{\,n-p\,}.
$$

Quando as colunas de $$X$$ são quase colineares, $$X^{\top}X$$ fica mal
condicionada e as entradas de $$(X^{\top}X)^{-1}$$ explodem, inflando
$$\operatorname{Var}(\hat\beta)$$. Esse é o problema que a regularização, tema
da próxima aula, vem resolver.
