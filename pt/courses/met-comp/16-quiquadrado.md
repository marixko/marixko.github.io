---
title: "1.16 - Testes qui-quadrado"
course: met-comp
---

## Testes qui-quadrado

Os testes anteriores tratam de parâmetros numéricos: médias, variâncias,
proporções. O teste qui-quadrado lida com dados **categóricos**: contagens
distribuídas por categorias, e a associação entre duas variáveis categóricas em
uma tabela.

### Conteúdo

- A estatística qui-quadrado de Pearson
- Teste de aderência
- Teste de independência
- Teste de homogeneidade
- Condições de validade
- Medidas de associação

## A estatística qui-quadrado de Pearson

Os dados são organizados em células, cada uma com uma frequência **observada**
$$O_i$$ e uma frequência **esperada** $$E_i$$ calculada sob $$H_0$$. A
estatística de teste é

$$
\chi^{2}=\sum_{i}\frac{(O_i-E_i)^{2}}{E_i}.
$$

Ela soma as discrepâncias relativas entre o observado e o esperado. Sob $$H_0$$,
e desde que os $$E_i$$ não sejam pequenos demais, $$\chi^{2}$$ tem
aproximadamente distribuição $$\chi^{2}_{\nu}$$, com $$\nu$$ dependendo do
teste. O teste é sempre **unilateral à direita**: só valores grandes de
$$\chi^{2}$$ indicam afastamento de $$H_0$$.

## Teste de aderência

Testa se os dados provêm de uma distribuição especificada, com probabilidades
$$p_1,\ldots,p_c$$ nas $$c$$ categorias. Com $$n$$ observações no total, as
frequências esperadas são $$E_i=n\,p_i$$, e

$$
\chi^{2}=\sum_{i=1}^{c}\frac{(O_i-n\,p_i)^{2}}{n\,p_i}\ \sim\ \chi^{2}_{\,c-1-m},
$$

onde $$m$$ é o número de parâmetros da distribuição **estimados a partir dos
próprios dados**. Cada parâmetro estimado consome um grau de liberdade.

Dois exemplos: testar se um dado é honesto usa $$c=6$$, $$p_i=1/6$$, $$m=0$$ e
$$\nu=5$$; testar se contagens seguem uma Poisson com $$\lambda$$ estimado da
amostra usa $$m=1$$.

## Teste de independência

Numa **tabela de contingência** $$r\times c$$, cruzam-se duas variáveis
categóricas, com $$O_{ij}$$ observações na célula $$(i,j)$$ e total $$n$$. A
hipótese é

$$
H_0:\ \text{as duas variáveis são independentes}.
$$

Sob $$H_0$$, a probabilidade de uma célula é o produto das probabilidades
marginais, estimadas pelos totais de linha e de coluna:

$$
E_{ij}=\frac{(\text{total da linha }i)\times(\text{total da coluna }j)}{n}.
$$

A estatística é

$$
\chi^{2}=\sum_{i=1}^{r}\sum_{j=1}^{c}\frac{(O_{ij}-E_{ij})^{2}}{E_{ij}}\ \sim\ \chi^{2}_{\,(r-1)(c-1)}.
$$

Os graus de liberdade $$(r-1)(c-1)$$ resultam de $$rc$$ células, menos $$1$$
pelo total fixo, menos $$(r-1)+(c-1)$$ pelas probabilidades marginais
estimadas.

## Teste de homogeneidade

Tem exatamente a mesma estatística, os mesmos $$E_{ij}$$ e os mesmos graus de
liberdade do teste de independência, mas o desenho amostral é outro: em vez de
uma amostra única classificada por duas variáveis, há $$r$$ amostras
independentes (uma por linha, com tamanhos fixados de antemão), e testa-se se a
distribuição pelas $$c$$ categorias é **a mesma** nas $$r$$ populações. Na
prática, o cálculo é idêntico.

## Casos especiais

- Numa tabela $$2\times 2$$, $$\nu=1$$. Para amostras pequenas, aplica-se a
  **correção de continuidade de Yates** ou usa-se o **teste exato de Fisher**.
- O teste $$\chi^{2}$$ de independência numa tabela $$2\times 2$$ é equivalente
  ao teste $$Z$$ de duas proporções da aula 1.14: vale $$\chi^{2}=Z^{2}$$.
- O **teste da razão de verossimilhanças**,
  $$G^{2}=2\sum_i O_i\log(O_i/E_i)$$, é uma alternativa assintoticamente
  equivalente à estatística de Pearson.

## Condições de validade

- as observações devem ser **independentes** e devem ser **contagens**;
  aplicar o teste sobre porcentagens, médias ou a mesma unidade contada duas
  vezes invalida o resultado;
- as frequências **esperadas** precisam ser grandes o suficiente. A regra usual
  é todos os $$E_i\ge 5$$; tolera-se que até $$20\%$$ das células tenham
  $$E_i$$ entre $$1$$ e $$5$$, mas nenhuma abaixo de $$1$$. Quando a regra
  falha, agrupam-se categorias ou usa-se um teste exato.

## Medidas de associação

Rejeitar $$H_0$$ indica que existe associação, mas não diz **quão forte**. Uma
medida é o **$$V$$ de Cramér**,

$$
V=\sqrt{\frac{\chi^{2}}{n\,\min(r-1,\,c-1)}}\ \in[0,1],
$$

que vale $$0$$ sob independência perfeita e $$1$$ sob associação perfeita. Para
tabelas $$2\times 2$$, usa-se também o coeficiente $$\phi=\sqrt{\chi^{2}/n}$$.
