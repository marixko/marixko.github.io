---
title: "1.15 - Análise de variância (ANOVA)"
course: met-comp
---

## Análise de variância

A aula anterior comparou duas médias. A análise de variância (ANOVA) compara
$$k\ge 2$$ médias de uma só vez, com um único teste, evitando a inflação do
erro do tipo I que resultaria de fazer todos os testes dois a dois.

### Conteúdo

- O problema das comparações múltiplas
- Modelo de um fator
- Decomposição da soma de quadrados
- A estatística F
- A tabela ANOVA
- Comparações múltiplas
- Hipóteses do modelo

## O problema das comparações múltiplas

Com $$k$$ grupos há $$\binom{k}{2}$$ pares. Testar todos ao nível $$\alpha$$
faz a probabilidade de **pelo menos** um falso positivo crescer muito acima de
$$\alpha$$: para $$k=5$$ são $$10$$ testes, e a taxa de erro global passa de
$$40\%$$. A ANOVA responde a uma única pergunta global: **todas** as médias são
iguais?

## Modelo de um fator

Temos $$k$$ grupos (os níveis de um fator), com $$n_i$$ observações no grupo
$$i$$ e $$N=\sum_i n_i$$ no total. O modelo é

$$
X_{ij}=\mu_i+\varepsilon_{ij},
\qquad
\varepsilon_{ij}\overset{\text{i.i.d.}}{\sim}\mathcal{N}(0,\sigma^{2}),
$$

ou, de forma equivalente, $$X_{ij}=\mu+\tau_i+\varepsilon_{ij}$$, onde
$$\tau_i$$ é o efeito do grupo $$i$$ (com $$\sum_i n_i\tau_i=0$$). A hipótese
testada é

$$
H_0:\mu_1=\mu_2=\cdots=\mu_k
$$

contra a alternativa de que ao menos duas médias diferem.

## Decomposição da soma de quadrados

Sejam $$\bar X_{i\cdot}$$ a média do grupo $$i$$ e $$\bar X_{\cdot\cdot}$$ a
média geral. Partindo da identidade

$$
X_{ij}-\bar X_{\cdot\cdot}
=
(\bar X_{i\cdot}-\bar X_{\cdot\cdot})+(X_{ij}-\bar X_{i\cdot}),
$$

elevando ao quadrado e somando sobre todas as observações, os termos cruzados
se anulam e resta

$$
\underbrace{\sum_{i,j}(X_{ij}-\bar X_{\cdot\cdot})^{2}}_{\mathrm{SQT}}
=
\underbrace{\sum_{i}n_i(\bar X_{i\cdot}-\bar X_{\cdot\cdot})^{2}}_{\mathrm{SQE}}
+
\underbrace{\sum_{i,j}(X_{ij}-\bar X_{i\cdot})^{2}}_{\mathrm{SQR}}.
$$

A soma de quadrados **total** (SQT) se separa na parte **entre grupos** (SQE),
que mede o quanto as médias dos grupos se afastam da média geral, e na parte
**dentro dos grupos** (SQR), que mede a dispersão residual. Os graus de
liberdade se somam da mesma forma:
$$N-1=(k-1)+(N-k)$$.

## A estatística F

Dividindo cada soma de quadrados pelos seus graus de liberdade, obtêm-se os
**quadrados médios**

$$
\mathrm{QME}=\frac{\mathrm{SQE}}{k-1},
\qquad
\mathrm{QMR}=\frac{\mathrm{SQR}}{N-k}.
$$

O quadrado médio residual estima $$\sigma^{2}$$ sempre,
$$\mathbb{E}[\mathrm{QMR}]=\sigma^{2}$$, enquanto

$$
\mathbb{E}[\mathrm{QME}]=\sigma^{2}+\frac{\sum_i n_i\tau_i^{2}}{k-1},
$$

que vale $$\sigma^{2}$$ sob $$H_0$$ e é maior sob $$H_1$$. A estatística de
teste compara os dois:

$$
\boxed{
F=\frac{\mathrm{QME}}{\mathrm{QMR}}\ \sim\ F_{\,k-1,\ N-k}\quad\text{sob }H_0.
}
$$

Rejeita-se $$H_0$$ se $$F>F_{k-1,\,N-k;\,\alpha}$$. O teste é **unilateral à
direita**: só valores grandes de $$F$$ (médias muito dispersas em relação ao
ruído) contradizem $$H_0$$. Para $$k=2$$, vale $$F=T^{2}$$ e a ANOVA coincide
com o teste $$t$$ de duas amostras com variâncias iguais.

## A tabela ANOVA

| Fonte de variação | Soma de quadrados | gl | Quadrado médio | F |
| --- | --- | --- | --- | --- |
| Entre grupos | $$\mathrm{SQE}$$ | $$k-1$$ | $$\mathrm{QME}$$ | $$\mathrm{QME}/\mathrm{QMR}$$ |
| Dentro dos grupos | $$\mathrm{SQR}$$ | $$N-k$$ | $$\mathrm{QMR}$$ | |
| Total | $$\mathrm{SQT}$$ | $$N-1$$ | | |

A fração da variabilidade explicada pelo fator é
$$R^{2}=\mathrm{SQE}/\mathrm{SQT}$$.

## Comparações múltiplas

Quando a ANOVA rejeita $$H_0$$, ela não diz **quais** grupos diferem. Para
isso, fazem-se comparações par a par controlando a taxa de erro do conjunto:

- **Tukey (HSD)**: intervalos simultâneos para todas as diferenças
  $$\mu_i-\mu_j$$, com controle exato da taxa de erro por família;
- **Bonferroni**: usa nível $$\alpha/m$$ em cada um dos $$m$$ testes;
  simples, porém conservador;
- **Scheffé**: para contrastes lineares gerais entre as médias.

## Hipóteses do modelo

A ANOVA supõe:

1. **independência** das observações;
2. **normalidade** dos resíduos (o teste é razoavelmente robusto a desvios
   moderados, sobretudo com grupos de tamanho parecido);
3. **homoscedasticidade**, isto é, a mesma variância $$\sigma^{2}$$ em todos os
   grupos (verificável com os testes de Levene ou de Bartlett). Quando falha,
   usa-se a ANOVA de Welch.

Se a normalidade falha gravemente, a alternativa não paramétrica é o teste de
**Kruskal-Wallis**.

## Além de um fator

Com dois ou mais fatores, a ANOVA de dois fatores decompõe a variabilidade em
efeitos principais de cada fator e no efeito de **interação** entre eles. A
mesma lógica de decomposição de somas de quadrados e de razões $$F$$ continua
valendo.
