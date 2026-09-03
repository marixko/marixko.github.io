---
title: "3.5 — Limites de Generalização"
course: ml
---

## Limites de generalização

Juntamos as peças das duas aulas anteriores. As desigualdades de concentração
davam um limite para a lacuna de generalização de uma classe **finita**; a
dimensão VC mede a capacidade de uma classe **infinita**. O resultado é um
limite da forma "risco verdadeiro menor ou igual a risco empírico mais um termo
de complexidade", que é a base teórica da regularização.

### Conteúdo

- Convergência uniforme
- Aprendizado PAC
- Limite para classe finita
- Limite VC
- Penalidades de complexidade
- Minimização estrutural do risco

### Convergência uniforme

Como $$\hat f$$ é escolhido a partir dos dados, não basta que
$$\hat R(f)\approx R(f)$$ para um $$f$$ fixo: precisamos que isso valha
**simultaneamente para todos** os $$f\in\mathcal{H}$$, ou seja, que

$$
\sup_{f\in\mathcal{H}}\big\lvert\hat R(f)-R(f)\big\rvert
$$

seja pequeno com alta probabilidade. Quando isso acontece, dizemos que
$$\mathcal{H}$$ tem a propriedade de **convergência uniforme**, e nesse caso o
minimizador do risco empírico é quase tão bom quanto o melhor elemento da
classe.

### O framework PAC

Um algoritmo aprende $$\mathcal{H}$$ no sentido **PAC** (*provavelmente
aproximadamente correto*) se, para quaisquer $$\epsilon,\delta\in(0,1)$$,
existe um tamanho de amostra $$n(\epsilon,\delta)$$ a partir do qual o modelo
devolvido tem risco a no máximo $$\epsilon$$ do melhor possível, com
probabilidade pelo menos $$1-\delta$$. "Aproximadamente" é o $$\epsilon$$,
"provavelmente" é o $$1-\delta$$.

### Limite para classe finita

Recuperando o resultado da aula 3.3: com perda em $$[0,1]$$, classe finita
$$\mathcal{H}$$ e probabilidade $$1-\delta$$, vale para todo $$f\in\mathcal{H}$$

$$
R(f)\ \le\ \hat R(f)+\sqrt{\frac{\log\lvert\mathcal{H}\rvert+\log(2/\delta)}{2n}}.
$$

### Limite VC

Para classes infinitas, a mesma estratégia (concentração mais *union bound*)
aplicada às dicotomias, com a função de crescimento controlada por
Sauer-Shelah, dá o **limite VC**. Com probabilidade $$1-\delta$$, para todo
$$f\in\mathcal{H}$$,

$$
R(f)\ \le\ \hat R(f)
+
O\!\left(\sqrt{\frac{d_{\mathrm{VC}}\,\log(n/d_{\mathrm{VC}})+\log(1/\delta)}{n}}\right).
$$

O papel de $$\log\lvert\mathcal{H}\rvert$$ passa a ser feito por
$$d_{\mathrm{VC}}\log n$$. A leitura: a lacuna de generalização é pequena quando
$$n\gg d_{\mathrm{VC}}$$, e a taxa continua sendo aproximadamente
$$1/\sqrt{n}$$.

### A forma geral

Todos esses resultados têm a mesma estrutura:

$$
R(f)\ \le\ \hat R(f)+\text{termo de complexidade},
$$

onde o termo de complexidade cresce com a capacidade da classe e decresce com
$$n$$. Ele é uma **penalidade de complexidade** derivada de primeiros
princípios, e explica por que penalizar modelos ricos (aula 2.3) melhora a
generalização: estamos, na prática, minimizando um limite superior do risco
verdadeiro em vez do risco empírico sozinho.

### Minimização estrutural do risco

A **minimização estrutural do risco** (SRM) transforma isso em método:
organiza-se uma sequência de classes aninhadas
$$\mathcal{H}_1\subset\mathcal{H}_2\subset\cdots$$ com capacidade crescente, e
escolhe-se a classe (e o modelo dentro dela) que minimiza a soma
$$\hat R(f)+\text{penalidade}(\mathcal{H}_k)$$. É a versão teórica da seleção de
modelos.

### O que os limites dizem na prática

Os limites VC costumam ser **numericamente frouxos**: o valor que preveem para
o risco é muitas vezes maior que $$1$$. O que eles capturam corretamente é a
**dependência qualitativa**: mais capacidade exige mais dados, e controlar a
capacidade controla a generalização. Limites mais apertados e sensíveis aos
dados (complexidade de Rademacher, limites baseados em margem) refinam a
constante, mas mantêm a mesma mensagem. A ferramenta prática para estimar
$$R(\hat f)$$ e escolher hiperparâmetros continua sendo a validação cruzada,
da próxima aula.
