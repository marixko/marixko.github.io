---
title: "3.1 — Generalização"
course: ml
---

## Generalização

Começa aqui a Parte III do curso, sobre a teoria do aprendizado. A pergunta
central é a que separa aprendizado de máquina de mera interpolação: um modelo
ajustado a uma amostra vai funcionar bem em dados **novos**? Esta aula fixa o
vocabulário (os vários "erros"), define a lacuna de generalização e descreve o
fenômeno do sobreajuste.

### Conteúdo

- Erro de treino e erro de teste
- Risco populacional e risco empírico
- A lacuna de generalização
- Sobreajuste e subajuste
- Complexidade do modelo

### Os quatro erros

Seja $$\hat f$$ o modelo ajustado ao conjunto de treinamento $$D$$ e
$$L$$ a função de perda. Quatro quantidades aparecem o tempo todo:

- **Risco populacional** (ou erro de generalização):
  $$R(f)=\mathbb{E}_{(X,Y)\sim P}[L(Y,f(X))]$$. É o que queremos minimizar, e
  não podemos calcular.
- **Risco empírico** num conjunto de $$m$$ pontos:
  $$\hat R(f)=\frac{1}{m}\sum_{i=1}^{m}L(y_i,f(x_i))$$. É o que conseguimos
  calcular.
- **Erro de treino**: o risco empírico avaliado nos **mesmos** dados usados
  para ajustar $$\hat f$$.
- **Erro de teste**: o risco empírico avaliado num conjunto **independente**,
  que $$\hat f$$ nunca viu. É a nossa melhor estimativa de $$R(\hat f)$$.

### A lacuna de generalização

A diferença entre o desempenho real e o desempenho aparente é

$$
R(\hat f)-\hat R(\hat f),
$$

a **lacuna de generalização**. Para um modelo $$f$$ fixo, escolhido sem olhar
os dados, o erro de treino é um estimador não viesado de $$R(f)$$ e a lacuna
tende a zero. O problema é que $$\hat f$$ **é** escolhido a partir de $$D$$: o
ajuste persegue o ruído da amostra, então $$\hat R(\hat f)$$ é otimista e a
lacuna é positiva. Controlá-la é o objeto de toda a Parte III.

### Otimismo do erro de treino

O erro de treino quase sempre subestima $$R(\hat f)$$, e a subestimativa
cresce com a liberdade que o modelo tem para se adaptar. No limite, um modelo
suficientemente flexível pode atingir erro de treino **zero** decorando cada
ponto, sem ter aprendido nada sobre $$P$$. Por isso a seleção de modelos nunca
se baseia no erro de treino.

### Sobreajuste e subajuste

- **Subajuste** (*underfitting*): o modelo é rígido demais para capturar o
  padrão real. Erro de treino **e** erro de teste altos.
- **Sobreajuste** (*overfitting*): o modelo é flexível demais e ajusta o
  ruído. Erro de treino baixo, erro de teste alto, lacuna grande.
- O ponto de operação desejado fica entre os dois: erro de treino e de teste
  ambos baixos e próximos.

### Complexidade e a curva em U

À medida que aumentamos a **complexidade** do modelo (grau do polinômio,
profundidade da árvore, número de parâmetros, ou o inverso da força de
regularização), o erro de treino cai de forma monótona. O erro de teste, ao
contrário, costuma ter forma de **U**: primeiro cai, porque o modelo passa a
capturar o sinal, e depois volta a subir, porque passa a capturar o ruído. O
mínimo dessa curva é o nível de complexidade ideal para o tamanho de amostra
disponível.

Esse quadro clássico tem exceções conhecidas em modelos muito
sobreparametrizados (o fenômeno de *double descent*), mas a intuição central,
de que existe um compromisso entre ajustar os dados e generalizar, continua
sendo o fio condutor das próximas aulas. Como não temos acesso a $$R(\hat f)$$,
ele é estimado por um conjunto de teste ou por validação cruzada, tema da aula
3.6.
