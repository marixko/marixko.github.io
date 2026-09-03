---
title: "5.1 — Classificação por Margem"
course: ml
---

## Classificação por margem

A Parte V trata das máquinas de vetores de suporte (SVM) e dos *kernels*. A
ideia de partida é geométrica: quando os dados são linearmente separáveis,
existem infinitos hiperplanos que os separam, e queremos escolher aquele que
fica o mais **longe possível** dos pontos das duas classes.

### Conteúdo

- Hiperplanos
- Separabilidade linear
- Margem
- Interpretação geométrica

### Hiperplanos

Um **hiperplano** em $$\mathbb{R}^{p}$$ é o conjunto

$$
\{\,x:\ w^{\top}x+b=0\,\},
$$

onde $$w$$ é um vetor **normal** ao hiperplano e $$b$$ um deslocamento. O
classificador linear associado é
$$\hat y=\operatorname{sign}(w^{\top}x+b)$$: o sinal de $$w^{\top}x+b$$ diz de
que lado do hiperplano o ponto está.

### Distância ao hiperplano

A distância de um ponto $$x$$ ao hiperplano é

$$
\frac{\lvert w^{\top}x+b\rvert}{\lVert w\rVert}.
$$

Para ver isso, projete: o ponto mais próximo do hiperplano na direção de $$x$$ é
$$x-t\,\frac{w}{\lVert w\rVert}$$ para algum $$t$$; impondo que ele satisfaça a
equação do hiperplano resulta $$t=(w^{\top}x+b)/\lVert w\rVert$$, cujo módulo é
a distância. A quantidade $$w^{\top}x+b$$ sem o valor absoluto é a distância
**com sinal**, positiva de um lado e negativa do outro.

### Separabilidade linear e margens

Os dados $$\{(x_i,y_i)\}$$ com $$y_i\in\{-1,+1\}$$ são **linearmente
separáveis** se existe $$(w,b)$$ tal que $$y_i(w^{\top}x_i+b)>0$$ para todo
$$i$$, isto é, todo ponto está do lado certo.

Define-se a **margem funcional** de um ponto como $$y_i(w^{\top}x_i+b)$$ e a
**margem geométrica** como

$$
\gamma_i=\frac{y_i(w^{\top}x_i+b)}{\lVert w\rVert},
$$

que é a distância com sinal do ponto ao hiperplano (positiva se classificado
corretamente). A margem de um hiperplano separador é a menor margem geométrica
sobre todos os pontos, $$\gamma=\min_i\gamma_i$$.

### O hiperplano de margem máxima

Entre todos os hiperplanos separadores, o de **margem máxima** é o que maximiza
$$\gamma$$. Ele é único, fica equidistante dos pontos mais próximos de cada
classe, e é o mais robusto a perturbações dos dados. A intuição de generalização
é a mesma da Parte III: uma margem grande corresponde a uma classe de funções
efetivamente menor, o que aperta os limites de generalização baseados em margem.

### Forma canônica

A margem geométrica não muda se reescalarmos $$(w,b)$$ por uma constante
positiva. Podemos então **fixar a escala** exigindo
$$\min_i y_i(w^{\top}x_i+b)=1$$. Com essa normalização, a margem geométrica é

$$
\gamma=\frac{1}{\lVert w\rVert},
$$

e maximizar a margem vira **minimizar $$\lVert w\rVert$$** sujeito a
$$y_i(w^{\top}x_i+b)\ge 1$$ para todo $$i$$. É exatamente o problema que a
próxima aula resolve.
