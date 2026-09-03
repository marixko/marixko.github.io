---
title: "5.3 — Dualidade e Kernel Trick"
course: ml
---

## Dualidade e kernel trick

Substituindo as condições de estacionariedade da aula anterior de volta no
Lagrangiano, obtemos uma formulação da SVM em que os dados aparecem **apenas
por produtos internos**. Trocar esse produto interno por uma função de *kernel*
transporta a SVM linear para espaços de *features* de dimensão altíssima, sem
custo extra.

### Conteúdo

- Otimização dual
- O kernel trick
- Kernels lineares, polinomiais e RBF
- Condição de Mercer

### A formulação dual

Da estacionariedade, $$w=\sum_i\alpha_i y_i x_i$$ e $$\sum_i\alpha_i y_i=0$$.
Substituindo em $$\mathcal{L}$$ e simplificando, o problema vira maximizar sobre
os multiplicadores:

$$
\max_{\alpha}\ \sum_{i=1}^{n}\alpha_i
-
\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}\alpha_i\alpha_j\,y_i y_j\,x_i^{\top}x_j
$$

sujeito a $$\alpha_i\ge 0$$ (e $$\alpha_i\le C$$ na margem flexível) e
$$\sum_i\alpha_i y_i=0$$. É novamente uma programação quadrática convexa, agora
em $$\alpha\in\mathbb{R}^{n}$$.

A previsão para um novo ponto também só usa produtos internos:

$$
f(x)=\sum_{i=1}^{n}\alpha_i y_i\,x_i^{\top}x+b,
$$

e a soma é efetivamente sobre os vetores de suporte.

### O kernel trick

Os dados entram **somente** através de $$x_i^{\top}x_j$$. Suponha que
quiséssemos primeiro mapear cada ponto por uma transformação não linear
$$\phi:\mathbb{R}^{p}\rightarrow\mathcal{F}$$ e depois aplicar a SVM linear em
$$\mathcal{F}$$. Precisaríamos apenas de
$$\phi(x_i)^{\top}\phi(x_j)$$. Uma **função de kernel** é justamente

$$
K(x,z)=\phi(x)^{\top}\phi(z),
$$

e se conseguimos calcular $$K$$ diretamente, nunca precisamos construir
$$\phi(x)$$, que pode ter dimensão infinita. Basta substituir todo
$$x_i^{\top}x_j$$ por $$K(x_i,x_j)$$ no problema dual e na previsão:

$$
f(x)=\sum_{i}\alpha_i y_i\,K(x_i,x)+b.
$$

### Condição de Mercer

Uma função simétrica $$K$$ é um *kernel* válido (isto é, existe algum $$\phi$$
tal que $$K(x,z)=\phi(x)^{\top}\phi(z)$$) se e somente se, para qualquer
conjunto finito de pontos, a matriz de Gram $$[K(x_i,x_j)]_{ij}$$ é **positiva
semidefinida**. Kernels válidos são fechados por soma, produto e escala
positiva, o que permite construir novos a partir dos básicos.

### Exemplos de kernels

**Linear.**

$$
K(x,z)=x^{\top}z.
$$

Recupera a SVM linear; $$\phi$$ é a identidade.

**Polinomial.**

$$
K(x,z)=(x^{\top}z+c)^{d}.
$$

O espaço de *features* contém todos os monômios de grau até $$d$$; $$c$$ pesa
os termos de grau menor.

**RBF (gaussiano).**

$$
K(x,z)=\exp\!\left(-\frac{\lVert x-z\rVert^{2}}{2\sigma^{2}}\right).
$$

O espaço de *features* correspondente é de **dimensão infinita**. O parâmetro
$$\sigma$$ (largura de banda) controla a escala: $$\sigma$$ pequeno dá
fronteiras muito flexíveis (risco de sobreajuste), $$\sigma$$ grande aproxima
um modelo linear. É o *kernel* de uso geral mais comum.

### Além da SVM

O mesmo argumento vale para qualquer método que dependa dos dados só por
produtos internos: a regressão *ridge* vira **regressão ridge com kernel**, e o
limite bayesiano dessa construção são os **processos gaussianos**. O *teorema
do representante* garante, de forma geral, que a solução de um problema
regularizado num espaço de Hilbert com *kernel* reprodutor tem a forma
$$f(\cdot)=\sum_i c_i K(x_i,\cdot)$$, ou seja, vive no espaço gerado pelos dados
de treino.
