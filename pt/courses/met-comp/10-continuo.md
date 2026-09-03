---
title: 1.9 - Principais distribuições contínuas
course: met-comp
---

## Principais distribuições contínuas

Assim como fizemos com as discretas, catalogamos aqui as famílias contínuas
mais usadas. Algumas modelam quantidades diretamente (tempo, comprimento,
erro); outras, como a qui-quadrado, a $$t$$ e a $$F$$, surgem como
distribuições de estatísticas calculadas a partir de amostras normais, e serão
essenciais na parte de inferência.

### Conteúdo

- Uniforme
- Exponencial
- Gama
- Normal
- Qui-quadrado
- $$t$$ de Student
- $$F$$ de Snedecor
- Beta

## Uniforme

Todos os pontos de um intervalo $$[a,b]$$ são igualmente prováveis:

$$
f_X(x)=\frac{1}{b-a},\quad a\le x\le b,
\qquad
F_X(x)=\frac{x-a}{b-a},\quad a\le x\le b,
$$

$$
\mathbb{E}[X]=\frac{a+b}{2},
\qquad
\operatorname{Var}(X)=\frac{(b-a)^{2}}{12}.
$$

A Uniforme$$(0,1)$$ tem papel central na simulação: pelo método da inversa da
aula 1.6, aplicar a função quantil de qualquer distribuição a uma
Uniforme$$(0,1)$$ produz uma amostra daquela distribuição.

## Exponencial

Tempo até a ocorrência de um evento num processo em que os eventos acontecem
de forma independente a uma taxa média $$\lambda$$. Com suporte $$x>0$$,

$$
f_X(x)=\lambda e^{-\lambda x},
\qquad
F_X(x)=1-e^{-\lambda x},
$$

$$
\mathbb{E}[X]=\frac{1}{\lambda},
\qquad
\operatorname{Var}(X)=\frac{1}{\lambda^{2}}.
$$

É a única distribuição **contínua** com a propriedade de **falta de memória**,

$$
P(X>s+t\mid X>s)=P(X>t).
$$

Existe uma dualidade com a Poisson: se o número de eventos por unidade de tempo
é Poisson$$(\lambda)$$, então os intervalos entre eventos consecutivos são
Exponencial$$(\lambda)$$.

## Gama

Generaliza a exponencial. Para $$\alpha$$ inteiro, é o tempo até o
$$\alpha$$-ésimo evento, ou seja, a soma de $$\alpha$$ exponenciais
independentes. Com parâmetro de forma $$\alpha>0$$ e de taxa $$\lambda>0$$,

$$
f_X(x)=\frac{\lambda^{\alpha}}{\Gamma(\alpha)}\,x^{\alpha-1}e^{-\lambda x},
\qquad x>0,
$$

onde $$\Gamma(\alpha)=\int_{0}^{\infty}t^{\alpha-1}e^{-t}\,dt$$ é a função gama,
com $$\Gamma(n)=(n-1)!$$ para $$n$$ inteiro. Os momentos são

$$
\mathbb{E}[X]=\frac{\alpha}{\lambda},
\qquad
\operatorname{Var}(X)=\frac{\alpha}{\lambda^{2}}.
$$

O caso $$\alpha=1$$ recupera a exponencial. A soma de Gamas independentes com o
mesmo $$\lambda$$ é Gama.

## Normal

A distribuição mais importante da estatística. Escrevemos
$$X\sim\mathcal{N}(\mu,\sigma^{2})$$ e

$$
\boxed{
f_X(x)=\frac{1}{\sqrt{2\pi}\,\sigma}\exp\!\left(-\frac{(x-\mu)^{2}}{2\sigma^{2}}\right).
}
$$

Ela é simétrica em torno de $$\mu$$, unimodal, e

$$
\mathbb{E}[X]=\mu,
\qquad
\operatorname{Var}(X)=\sigma^{2}.
$$

**Padronização.** A transformação $$Z=(X-\mu)/\sigma$$ dá a **normal padrão**
$$\mathcal{N}(0,1)$$, cuja FDA é denotada por $$\Phi$$. Qualquer probabilidade
normal se reduz a $$\Phi$$. Da simetria, cerca de $$68\%$$, $$95\%$$ e
$$99{,}7\%$$ da massa ficam a menos de um, dois e três desvios padrão da média.

Toda combinação linear de normais independentes é normal. E, pelo **teorema
central do limite**, a soma (ou a média) de muitas variáveis independentes de
qualquer distribuição, com variância finita, é aproximadamente normal. Essa é a
razão de a normal aparecer em tantos contextos.

## Qui-quadrado

Soma de $$k$$ normais padrão ao quadrado:

$$
X=\sum_{i=1}^{k}Z_i^{2}\ \sim\ \chi^{2}_{k},
\qquad Z_i\sim\mathcal{N}(0,1)\ \text{independentes}.
$$

É um caso da Gama, com $$\alpha=k/2$$ e $$\lambda=1/2$$, e

$$
\mathbb{E}[X]=k,
\qquad
\operatorname{Var}(X)=2k.
$$

Aparece na distribuição da variância amostral de dados normais,
$$(n-1)S^{2}/\sigma^{2}\sim\chi^{2}_{n-1}$$, e é a base dos testes de aderência
e de independência.

## $$t$$ de Student

Razão entre uma normal padrão e a raiz de uma qui-quadrado normalizada,
independentes:

$$
T=\frac{Z}{\sqrt{V/k}},
\qquad Z\sim\mathcal{N}(0,1),\quad V\sim\chi^{2}_{k}.
$$

É simétrica em torno de zero e tem **caudas mais pesadas** que a normal. Para
$$k>1$$, $$\mathbb{E}[T]=0$$; para $$k>2$$,
$$\operatorname{Var}(T)=k/(k-2)$$. Quando $$k\to\infty$$, a $$t$$ converge para
a $$\mathcal{N}(0,1)$$. É a distribuição usada na inferência sobre médias quando
a variância populacional é desconhecida.

## $$F$$ de Snedecor

Razão entre duas qui-quadrado normalizadas, independentes:

$$
F=\frac{V_1/k_1}{V_2/k_2},
\qquad V_i\sim\chi^{2}_{k_i}.
$$

Tem suporte $$(0,\infty)$$, é assimétrica à direita e, para $$k_2>2$$,
$$\mathbb{E}[F]=k_2/(k_2-2)$$. É usada para comparar variâncias e na análise de
variância. Valem as relações $$t_k^{2}=F_{1,k}$$ e
$$1/F_{k_1,k_2}\sim F_{k_2,k_1}$$.

## Beta

Distribuição em $$[0,1]$$, natural para modelar proporções e probabilidades.
Com parâmetros de forma $$\alpha,\beta>0$$,

$$
f_X(x)=\frac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)},
\qquad
B(\alpha,\beta)=\frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)},
$$

$$
\mathbb{E}[X]=\frac{\alpha}{\alpha+\beta},
\qquad
\operatorname{Var}(X)=\frac{\alpha\beta}{(\alpha+\beta)^{2}(\alpha+\beta+1)}.
$$

O formato é muito flexível: pode ser em U, em sino ou monótono. O caso
$$\alpha=\beta=1$$ é a Uniforme$$(0,1)$$.

## Tabela-resumo

| Distribuição | Suporte | $$f_X(x)$$ | $$\mathbb{E}[X]$$ | $$\operatorname{Var}(X)$$ |
| --- | --- | --- | --- | --- |
| Uniforme$$(a,b)$$ | $$[a,b]$$ | $$\dfrac{1}{b-a}$$ | $$\dfrac{a+b}{2}$$ | $$\dfrac{(b-a)^{2}}{12}$$ |
| Exponencial$$(\lambda)$$ | $$(0,\infty)$$ | $$\lambda e^{-\lambda x}$$ | $$1/\lambda$$ | $$1/\lambda^{2}$$ |
| Gama$$(\alpha,\lambda)$$ | $$(0,\infty)$$ | $$\dfrac{\lambda^{\alpha}}{\Gamma(\alpha)}x^{\alpha-1}e^{-\lambda x}$$ | $$\alpha/\lambda$$ | $$\alpha/\lambda^{2}$$ |
| Normal$$(\mu,\sigma^{2})$$ | $$\mathbb{R}$$ | $$\dfrac{1}{\sqrt{2\pi}\sigma}e^{-(x-\mu)^{2}/2\sigma^{2}}$$ | $$\mu$$ | $$\sigma^{2}$$ |
| Qui-quadrado$$(k)$$ | $$(0,\infty)$$ | Gama$$(k/2,\,1/2)$$ | $$k$$ | $$2k$$ |
| $$t$$ de Student$$(k)$$ | $$\mathbb{R}$$ | $$Z/\sqrt{V/k}$$ | $$0$$ $$(k>1)$$ | $$k/(k-2)$$ $$(k>2)$$ |
| $$F(k_1,k_2)$$ | $$(0,\infty)$$ | $$\dfrac{V_1/k_1}{V_2/k_2}$$ | $$\dfrac{k_2}{k_2-2}$$ $$(k_2>2)$$ | $$\dfrac{2k_2^{2}(k_1+k_2-2)}{k_1(k_2-2)^{2}(k_2-4)}$$ |
| Beta$$(\alpha,\beta)$$ | $$[0,1]$$ | $$\dfrac{x^{\alpha-1}(1-x)^{\beta-1}}{B(\alpha,\beta)}$$ | $$\dfrac{\alpha}{\alpha+\beta}$$ | $$\dfrac{\alpha\beta}{(\alpha+\beta)^{2}(\alpha+\beta+1)}$$ |

## Relações entre as distribuições

- A Exponencial é a Gama com $$\alpha=1$$; a soma de exponenciais independentes
  é Gama.
- A $$\chi^{2}_{k}$$ é a Gama$$(k/2,1/2)$$ e a soma de $$k$$ normais padrão ao
  quadrado.
- A $$t_k$$ é uma normal dividida pela raiz de uma $$\chi^{2}_k$$ normalizada, e
  $$t_k\to\mathcal{N}(0,1)$$ quando $$k\to\infty$$.
- A $$F$$ é a razão de duas $$\chi^{2}$$ normalizadas, e $$t_k^{2}=F_{1,k}$$.
- A Beta$$(1,1)$$ é a Uniforme$$(0,1)$$.
- A Normal é o limite (teorema central do limite) de somas de variáveis
  independentes com variância finita.
