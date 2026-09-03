---
title: "5.2 — Support Vector Machines"
course: ml
---

## Support vector machines

A aula anterior reduziu a busca pelo hiperplano de margem máxima a um problema
de otimização com restrições. Esta aula resolve esse problema: apresenta a
formulação primal, a versão com folga para dados não separáveis, e as condições
de otimalidade que dão origem aos **vetores de suporte**.

### Conteúdo

- Otimização com restrições
- Lagrangiano
- Condições KKT
- Vetores de suporte

### O problema primal

Maximizar a margem equivale a minimizar $$\lVert w\rVert$$, e é conveniente
minimizar $$\tfrac{1}{2}\lVert w\rVert^{2}$$:

$$
\min_{w,b}\ \frac{1}{2}\lVert w\rVert^{2}
\qquad\text{sujeito a}\qquad
y_i(w^{\top}x_i+b)\ge 1,\quad i=1,\ldots,n.
$$

É um problema de programação **quadrática convexa** com restrições lineares,
então tem mínimo global único.

### Margem flexível

Dados reais raramente são perfeitamente separáveis. Introduz-se uma variável de
folga $$\xi_i\ge 0$$ por ponto, permitindo violações da margem:

$$
\min_{w,b,\xi}\ \frac{1}{2}\lVert w\rVert^{2}+C\sum_{i=1}^{n}\xi_i
\qquad\text{sujeito a}\qquad
y_i(w^{\top}x_i+b)\ge 1-\xi_i,\quad \xi_i\ge 0.
$$

O parâmetro $$C>0$$ controla o compromisso entre margem larga e poucos erros:
$$C$$ grande aproxima a margem rígida, $$C$$ pequeno tolera mais violações.
Eliminando $$\xi_i$$, o problema é equivalente a

$$
\min_{w,b}\ \sum_{i=1}^{n}\max\!\big(0,\ 1-y_i(w^{\top}x_i+b)\big)+\frac{1}{2C}\lVert w\rVert^{2},
$$

ou seja, **ERM com a perda de dobradiça** (*hinge loss*) e penalidade $$L_2$$.
A SVM é um caso da regularização das aulas anteriores.

### O Lagrangiano

Para tratar as restrições, formamos o Lagrangiano com multiplicadores
$$\alpha_i\ge 0$$ (caso da margem rígida):

$$
\mathcal{L}(w,b,\alpha)
=
\frac{1}{2}\lVert w\rVert^{2}
-
\sum_{i=1}^{n}\alpha_i\big[\,y_i(w^{\top}x_i+b)-1\,\big].
$$

### Condições KKT

No ótimo valem as condições de Karush-Kuhn-Tucker:

- **estacionariedade**:
  $$\nabla_w\mathcal{L}=0\Rightarrow w=\sum_i\alpha_i y_i x_i$$ e
  $$\nabla_b\mathcal{L}=0\Rightarrow\sum_i\alpha_i y_i=0$$;
- **viabilidade primal**: $$y_i(w^{\top}x_i+b)\ge 1$$;
- **viabilidade dual**: $$\alpha_i\ge 0$$;
- **folga complementar**:
  $$\alpha_i\big[\,y_i(w^{\top}x_i+b)-1\,\big]=0$$.

### Vetores de suporte

A folga complementar tem uma consequência forte. Se um ponto está **fora** da
margem, então $$y_i(w^{\top}x_i+b)>1$$ e a condição obriga $$\alpha_i=0$$: esse
ponto **não contribui** para $$w=\sum_i\alpha_i y_i x_i$$. Só os pontos **sobre**
a margem (ou, na versão flexível, dentro dela) têm $$\alpha_i>0$$. Esses são os
**vetores de suporte**, e a solução depende apenas deles. É por isso que a SVM
produz um modelo esparso, definido por um subconjunto pequeno dos dados. Na
próxima aula usamos a mesma estacionariedade para escrever o problema só em
função de produtos internos e chegar ao *kernel trick*.
