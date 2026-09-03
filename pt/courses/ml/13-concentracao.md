---
title: "3.3 — Desigualdades de Concentração"
course: ml
---

## Desigualdades de concentração

A lei dos grandes números diz que a média amostral converge para a média
verdadeira, mas não diz **a que velocidade**. As desigualdades de concentração
respondem a isso: elas limitam a probabilidade de uma média amostral estar
longe do seu valor esperado, para $$n$$ finito. São a ferramenta técnica por
trás de todos os limites de generalização.

### Conteúdo

- Lei dos grandes números
- Markov e Chebyshev
- Hoeffding
- O método de Chernoff
- Union bound
- Da concentração à generalização

### Da lei dos grandes números às taxas finitas

Sejam $$X_1,\ldots,X_n$$ independentes e identicamente distribuídas com média
$$\mu$$, e $$\hat\mu=\frac{1}{n}\sum_i X_i$$. A lei fraca garante
$$\hat\mu\xrightarrow{P}\mu$$. Queremos algo mais forte: um limite explícito
para $$P(\lvert\hat\mu-\mu\rvert\ge\epsilon)$$ em função de $$n$$ e
$$\epsilon$$.

### Markov e Chebyshev

Para uma variável **não negativa** $$Z\ge 0$$ e $$t>0$$, a desigualdade de
**Markov** diz

$$
P(Z\ge t)\le\frac{\mathbb{E}[Z]}{t}.
$$

Aplicando-a a $$Z=(W-\mathbb{E}W)^{2}$$ obtém-se a desigualdade de
**Chebyshev**,

$$
P\big(\lvert W-\mathbb{E}W\rvert\ge t\big)\le\frac{\operatorname{Var}(W)}{t^{2}}.
$$

Para a média amostral, $$\operatorname{Var}(\hat\mu)=\sigma^{2}/n$$, logo

$$
P\big(\lvert\hat\mu-\mu\rvert\ge\epsilon\big)\le\frac{\sigma^{2}}{n\,\epsilon^{2}}.
$$

É um limite correto, mas **polinomial** em $$n$$: para garantir probabilidade
$$\delta$$ de falha, precisamos de $$n\sim 1/(\delta\epsilon^{2})$$.

### Hoeffding

Quando as variáveis são **limitadas**, $$X_i\in[a,b]$$, obtém-se um limite
muito melhor. A desigualdade de **Hoeffding** afirma

$$
P\big(\lvert\hat\mu-\mu\rvert\ge\epsilon\big)
\le
2\exp\!\left(-\frac{2n\,\epsilon^{2}}{(b-a)^{2}}\right),
$$

e, no caso $$X_i\in[0,1]$$,

$$
P\big(\lvert\hat\mu-\mu\rvert\ge\epsilon\big)\le 2e^{-2n\epsilon^{2}}.
$$

A dependência em $$n$$ agora é **exponencial**: para falhar com probabilidade
$$\delta$$ basta $$n\sim\frac{1}{\epsilon^{2}}\log\frac{1}{\delta}$$. Invertendo,
com probabilidade $$1-\delta$$,

$$
\lvert\hat\mu-\mu\rvert\le\sqrt{\frac{\log(2/\delta)}{2n}}.
$$

### O método de Chernoff

Hoeffding é um caso do **método de Chernoff**: para qualquer $$s>0$$,

$$
P(Z\ge t)=P\big(e^{sZ}\ge e^{st}\big)\le e^{-st}\,\mathbb{E}[e^{sZ}],
$$

e minimiza-se o lado direito em $$s$$ usando a função geradora de momentos.
Variáveis cuja função geradora se comporta como a de uma gaussiana são ditas
**sub-gaussianas**, e para elas vale um limite do tipo de Hoeffding. É também
assim que se obtêm os limites de **Chernoff** para somas de Bernoulli.

### Union bound

Para uma coleção finita de eventos $$A_1,\ldots,A_M$$,

$$
P\Big(\bigcup_{j=1}^{M}A_j\Big)\le\sum_{j=1}^{M}P(A_j).
$$

Simples, mas é o que permite passar de "um modelo fixo" para "todos os modelos
de uma classe".

### Da concentração à generalização

Fixe um modelo $$f$$ e suponha a perda limitada em $$[0,1]$$. Cada
$$L(y_i,f(x_i))$$ é uma variável limitada de média $$R(f)$$, então Hoeffding dá

$$
P\big(\lvert\hat R(f)-R(f)\rvert\ge\epsilon\big)\le 2e^{-2n\epsilon^{2}}.
$$

Para uma classe **finita** $$\mathcal{H}$$ com $$M=\lvert\mathcal{H}\rvert$$
modelos, o *union bound* sobre os $$M$$ eventos dá

$$
P\Big(\max_{f\in\mathcal{H}}\lvert\hat R(f)-R(f)\rvert\ge\epsilon\Big)
\le
2M\,e^{-2n\epsilon^{2}}.
$$

Igualando o lado direito a $$\delta$$ e invertendo: com probabilidade
$$1-\delta$$, **para todo** $$f\in\mathcal{H}$$,

$$
R(f)\le\hat R(f)+\sqrt{\frac{\log M+\log(2/\delta)}{2n}}.
$$

Este é o primeiro limite de generalização do curso. O termo extra cresce com
$$\log M$$, uma medida grosseira da complexidade da classe, e decai como
$$1/\sqrt{n}$$. As próximas aulas substituem $$\log M$$ por uma medida de
capacidade que funciona também para classes infinitas.
