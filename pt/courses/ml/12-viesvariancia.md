---
title: "3.2 — Decomposição Viés-Variância"
course: ml
---

## Decomposição viés-variância

A aula anterior descreveu a curva em U do erro de teste de forma qualitativa.
Aqui a tornamos quantitativa: para a perda quadrática, o erro esperado de um
modelo se separa em três partes, cada uma com um significado claro. Essa
decomposição é a linguagem padrão para falar de sobreajuste e subajuste.

### Conteúdo

- Viés
- Variância
- Erro irredutível
- Complexidade do modelo
- Subajuste e sobreajuste

### O experimento mental

Fixe um ponto $$x$$. Imagine sortear muitos conjuntos de treinamento $$D$$ do
mesmo processo gerador, ajustar um modelo $$\hat f_D$$ em cada um e olhar as
previsões $$\hat f_D(x)$$. Duas fontes de aleatoriedade entram no erro:

- o ruído da resposta, $$Y=f^{*}(x)+\varepsilon$$ com
  $$f^{*}(x)=\mathbb{E}[Y\mid x]$$ e $$\operatorname{Var}(\varepsilon)=\sigma^{2}$$;
- a variação de $$\hat f_D(x)$$ de um conjunto de treinamento para outro.

O objeto de estudo é o erro quadrático esperado sobre as duas,

$$
\mathbb{E}_{D,\,Y}\big[(Y-\hat f_D(x))^{2}\big].
$$

### Derivação

Escreva $$\bar f(x)=\mathbb{E}_D[\hat f_D(x)]$$, a previsão média. Some e
subtraia $$f^{*}(x)$$ e $$\bar f(x)$$ e expanda o quadrado. Os termos cruzados
se anulam, porque $$\varepsilon$$ tem média zero e é independente de $$D$$, e
porque $$\mathbb{E}_D[\hat f_D(x)-\bar f(x)]=0$$. Sobram três termos:

$$
\mathbb{E}_{D,\,Y}\big[(Y-\hat f_D(x))^{2}\big]
=
\underbrace{\sigma^{2}}_{\text{ruído}}
+
\underbrace{\big(\bar f(x)-f^{*}(x)\big)^{2}}_{\text{viés}^{2}}
+
\underbrace{\mathbb{E}_D\big[(\hat f_D(x)-\bar f(x))^{2}\big]}_{\text{variância}}.
$$

Em forma compacta,

$$
\boxed{\ \text{Erro}=\text{Viés}^{2}+\text{Variância}+\text{Ruído}\ }
$$

### Os três termos

- **Ruído** ($$\sigma^{2}$$): a variância intrínseca de $$Y$$ dado $$x$$. É o
  **erro irredutível**, o mesmo risco de Bayes da aula 1.3. Nenhum modelo o
  elimina.
- **Viés**: o quanto a previsão média $$\bar f(x)$$ erra o alvo $$f^{*}(x)$$.
  Mede o erro sistemático da família de modelos, o que ela não consegue
  representar mesmo com dados infinitos.
- **Variância**: o quanto $$\hat f_D(x)$$ oscila em torno da sua própria média
  quando o conjunto de treinamento muda. Mede a sensibilidade ao ruído da
  amostra.

### Complexidade e o compromisso

Aumentar a complexidade do modelo em geral **reduz o viés** (a família passa a
conter aproximações melhores de $$f^{*}$$) e **aumenta a variância** (há mais
liberdade para o ajuste seguir o ruído). O erro total é minimizado num ponto
intermediário, que é exatamente o fundo da curva em U da aula 3.1.

- Modelo simples demais: viés alto, variância baixa. É o **subajuste**.
- Modelo complexo demais: viés baixo, variância alta. É o **sobreajuste**.

### Ridge e vizinhos mais próximos como ilustração

- Na regressão *ridge*, aumentar $$\lambda$$ encolhe os coeficientes: o viés
  cresce e a variância cai. O $$\lambda$$ ótimo equilibra os dois, e sob
  colinearidade sempre existe um $$\lambda>0$$ com erro menor que OLS.
- Nos $$k$$ vizinhos mais próximos, $$k$$ pequeno dá viés baixo e variância
  alta (a previsão depende de poucos pontos ruidosos); $$k$$ grande faz o
  oposto, suavizando demais.

### Limitações da decomposição

A separação exata em três termos vale para a **perda quadrática**. Para a perda
0-1 existem decomposições análogas, mas elas não são aditivas de forma tão
limpa, e o efeito da variância sobre o erro de classificação é mais sutil. Além
disso, em modelos muito sobreparametrizados a variância pode voltar a **cair**
após o ponto de interpolação (*double descent*). Ainda assim, viés e variância
continuam sendo o vocabulário mais útil para diagnosticar por que um modelo vai
mal.
