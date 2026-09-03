---
title: "2.4 - Testes de permutação"
course: met-comp
---

## Testes de permutação

Os testes de hipóteses clássicos derivam a distribuição da estatística sob
$$H_0$$ de suposições sobre a população (normalidade, variâncias iguais). O
teste de permutação constrói essa distribuição **diretamente dos dados**,
reembaralhando os rótulos, e não precisa de nenhuma dessas suposições.

### Conteúdo

- A hipótese de permutabilidade
- O algoritmo
- Exemplo: diferença de médias
- Valor-p de Monte Carlo
- Relação com bootstrap e testes clássicos

## A hipótese de permutabilidade

A ideia: se $$H_0$$ diz que dois grupos vêm da **mesma** distribuição, então os
rótulos de grupo são **intercambiáveis**. Qualquer reatribuição aleatória dos
rótulos aos mesmos valores numéricos é, sob $$H_0$$, tão provável quanto a
observada. Comparando a estatística real com as estatísticas de muitas
reatribuições, vê-se se o resultado observado é atípico.

## O algoritmo

Seja $$T$$ uma estatística que mede o efeito de interesse (uma diferença de
médias, uma correlação, uma razão $$F$$), e $$t_{\mathrm{obs}}$$ o seu valor
nos dados. Então:

1. embaralhar aleatoriamente os rótulos (ou, no caso pareado, trocar
   aleatoriamente o sinal de cada diferença);
2. recalcular a estatística, obtendo $$T^{*}$$;
3. repetir $$B$$ vezes.

A coleção $$T^{*}_1,\ldots,T^{*}_B$$ é a **distribuição de permutação** de
$$T$$ sob $$H_0$$.

## Exemplo: diferença de médias

Dois grupos, $$x_1,\ldots,x_{n_1}$$ e $$y_1,\ldots,y_{n_2}$$. A estatística é
$$T=\bar x-\bar y$$. Junta-se tudo num único vetor de $$n_1+n_2$$ valores; a
cada réplica, sorteiam-se $$n_1$$ deles para o "grupo 1" e o resto para o
"grupo 2", e recalcula-se $$\bar x^{*}-\bar y^{*}$$. Se
$$\lvert t_{\mathrm{obs}}\rvert$$ fica na cauda da distribuição de
$$\lvert T^{*}\rvert$$, rejeita-se $$H_0$$.

## Valor-p de Monte Carlo

Para um teste bilateral,

$$
\text{valor-}p=\frac{1+\#\{\,b:\ \lvert T^{*}_b\rvert\ge\lvert t_{\mathrm{obs}}\rvert\,\}}{B+1}.
$$

O $$+1$$ no numerador e no denominador inclui a configuração observada (que é
uma das permutações possíveis) e garante um valor-p sempre positivo. Se todas
as $$\binom{n_1+n_2}{n_1}$$ permutações fossem enumeradas, o teste seria
**exato**; com $$B$$ permutações aleatórias, é uma aproximação de Monte Carlo,
com erro que diminui à medida que $$B$$ cresce.

## Relação com bootstrap e testes clássicos

- **Permutação vs. bootstrap**: a permutação reamostra **sem reposição** e
  testa uma hipótese de igualdade de distribuições; o *bootstrap* reamostra
  **com reposição** e estima a incerteza de uma estimativa. São ferramentas
  para perguntas diferentes.
- **Permutação vs. teste $$t$$**: quando a normalidade vale, os dois dão
  praticamente o mesmo valor-p; quando não vale, a permutação continua válida.
- O teste de permutação é a escolha natural quando $$n$$ é pequeno, quando a
  estatística é não padrão, ou quando não se quer defender nenhuma suposição
  distribucional. O custo é apenas computacional.
