---
title: "2.4 — Otimização para Machine Learning"
course: ml
---

## Otimização para Machine Learning

Até aqui tivemos sorte: OLS e *ridge* têm solução fechada. O *lasso*, a
regressão logística, os GLMs e as redes neurais não têm. Nesses casos
minimizamos a função objetivo $$J(\theta)$$, que é o risco empírico
(possivelmente penalizado), por métodos **iterativos**. Esta aula reúne as
ferramentas de cálculo que sustentam esses métodos e apresenta os dois
algoritmos de base: a descida de gradiente e a sua versão estocástica.

### Conteúdo

- Derivadas, gradiente e Jacobiana
- Hessiana
- Expansão de Taylor
- Descida de gradiente
- Descida de gradiente estocástica
- Métodos de segunda ordem

### Derivadas, gradiente e Jacobiana

Seja $$J:\mathbb{R}^{p}\rightarrow\mathbb{R}$$ a função a minimizar. O
**gradiente** reúne as derivadas parciais,

$$
\nabla J(\theta)
=
\Big(\frac{\partial J}{\partial\theta_1},\ \ldots,\ \frac{\partial J}{\partial\theta_p}\Big)^{\top},
$$

e aponta na direção de crescimento mais rápido de $$J$$; $$-\nabla J(\theta)$$
aponta na de decrescimento mais rápido. Num mínimo vale a condição de primeira
ordem $$\nabla J(\theta^{*})=0$$.

Para uma função vetorial $$F:\mathbb{R}^{p}\rightarrow\mathbb{R}^{m}$$, a
**Jacobiana** é a matriz $$m\times p$$

$$
\big[\mathbf{J}_F(\theta)\big]_{ij}=\frac{\partial F_i}{\partial\theta_j}.
$$

O gradiente de uma função escalar é a transposta da sua Jacobiana. A regra da
cadeia em forma matricial, $$\mathbf{J}_{F\circ G}=\mathbf{J}_F\,\mathbf{J}_G$$,
é exatamente o que a retropropagação (*backpropagation*) implementa.

### Hessiana

A **Hessiana** é a matriz $$p\times p$$ das segundas derivadas,

$$
\big[\nabla^{2}J(\theta)\big]_{ij}=\frac{\partial^{2}J}{\partial\theta_i\,\partial\theta_j},
$$

simétrica quando $$J$$ é duas vezes continuamente diferenciável. Ela descreve a
**curvatura**. Num ponto crítico: se $$\nabla^{2}J\succ 0$$ é um mínimo local,
se $$\nabla^{2}J\prec 0$$ é um máximo, se é indefinida é um ponto de sela.

Quando $$J$$ é **convexa**, $$\nabla^{2}J\succeq 0$$ em todo ponto e todo mínimo
local é global. É o caso de OLS, *ridge*, *lasso* e regressão logística, o que
torna a otimização muito mais simples. O número de condição
$$\kappa=\lambda_{\max}/\lambda_{\min}$$ da Hessiana governa a velocidade da
descida de gradiente: quanto maior $$\kappa$$, mais lenta a convergência.

### Expansão de Taylor

Perto de um ponto $$\theta$$,

$$
J(\theta+\Delta)
\approx
J(\theta)
+
\nabla J(\theta)^{\top}\Delta
+
\tfrac{1}{2}\,\Delta^{\top}\nabla^{2}J(\theta)\,\Delta.
$$

Truncando na primeira ordem,

$$
J(\theta+\Delta)\approx J(\theta)+\nabla J(\theta)^{\top}\Delta,
$$

obtemos o modelo linear que justifica a descida de gradiente. Mantendo o termo
quadrático, obtemos o modelo que justifica o método de Newton.

### Descida de gradiente

Do modelo linear, para diminuir $$J$$ basta caminhar na direção
$$-\nabla J$$. A iteração é

$$
\boxed{\;\theta_{t+1}=\theta_t-\eta\,\nabla J(\theta_t)\;}
$$

onde $$\eta>0$$ é a **taxa de aprendizado** (o tamanho do passo). Um $$\eta$$
pequeno demais converge devagar; grande demais faz o método oscilar ou
divergir. Para $$J$$ convexa com gradiente $$L$$-Lipschitz, qualquer
$$\eta\le 1/L$$ garante convergência, com taxa $$O(1/t)$$ em geral e linear se
$$J$$ é fortemente convexa. A convergência fica lenta quando a Hessiana é mal
condicionada, situação em que o gradiente ziguezagueia ao longo de vales
compridos e estreitos. As melhorias usuais são o **momento** (Polyak,
Nesterov) e as taxas adaptativas (AdaGrad, RMSProp, Adam).

### Descida de gradiente estocástica

Em aprendizado de máquina a função objetivo é uma média sobre os dados,

$$
J(\theta)=\frac{1}{n}\sum_{i=1}^{n}\ell_i(\theta),
\qquad
\ell_i(\theta)=L\big(y_i,f_\theta(x_i)\big),
$$

e calcular $$\nabla J$$ exige percorrer o conjunto inteiro, o que é caro para
$$n$$ grande. A **descida de gradiente estocástica** (SGD) troca o gradiente
completo por uma estimativa baseada em uma observação sorteada, ou num
*mini-lote* $$B_t$$:

$$
\theta_{t+1}=\theta_t-\eta_t\,\nabla\ell_{i_t}(\theta_t),
\qquad
i_t\sim\text{Uniforme}\{1,\ldots,n\}.
$$

Como $$\mathbb{E}\big[\nabla\ell_{i_t}(\theta)\big]=\nabla J(\theta)$$, o passo
usa um estimador **não viesado** do gradiente, mas com variância. As
consequências:

- cada passo é muito mais barato, o que permite escalar para $$n$$ enorme e
  para dados em fluxo;
- o ruído impede a convergência para um ponto exato, então usa-se passo
  decrescente (com $$\sum_t\eta_t=\infty$$ e $$\sum_t\eta_t^{2}<\infty$$) ou
  passo pequeno fixo, que converge para uma vizinhança do mínimo;
- em problemas não convexos, como redes neurais, esse mesmo ruído ajuda a
  escapar de selas e de mínimos locais rasos;
- o tamanho do *mini-lote* é um compromisso entre variância (lote grande) e
  custo por passo (lote pequeno), e lotes moderados aproveitam melhor a
  vetorização.

### Métodos de segunda ordem

Minimizando o modelo quadrático de Taylor em $$\Delta$$, a condição
$$\nabla J(\theta)+\nabla^{2}J(\theta)\,\Delta=0$$ dá o passo de **Newton**:

$$
\boxed{\;\theta_{t+1}=\theta_t-\big[\nabla^{2}J(\theta_t)\big]^{-1}\nabla J(\theta_t)\;}
$$

As suas vantagens são a convergência **quadrática** perto do ótimo, muito mais
rápida que a da descida de gradiente, e a invariância à escala das variáveis,
que elimina o problema do mau condicionamento. Os custos: cada passo exige
$$O(p^{3})$$ para resolver o sistema e $$O(p^{2})$$ de memória para a Hessiana,
o que o torna inviável para $$p$$ grande, e o método pode divergir longe do
ótimo quando a Hessiana não é positiva definida (daí as variantes amortecidas e
de região de confiança).

As alternativas práticas mantêm parte do ganho a um custo menor:

- **Gauss-Newton** e **Levenberg-Marquardt** para mínimos quadrados não
  lineares, que aproximam a Hessiana por $$\mathbf{J}^{\top}\mathbf{J}$$;
- métodos **quase-Newton** (BFGS e a versão de memória limitada L-BFGS), que
  constroem uma aproximação da inversa da Hessiana a partir dos gradientes
  observados, a custo $$O(p^{2})$$ ou $$O(p)$$; L-BFGS é o padrão para
  regressão logística e problemas convexos de porte médio;
- **IRLS** (mínimos quadrados iterativamente reponderados) para modelos
  lineares generalizados, que é o método de Newton com a Hessiana esperada
  (*Fisher scoring*).

Na prática: para funções objetivo convexas de dimensão moderada, L-BFGS ou
Newton convergem em poucas iterações; para redes neurais, com $$p$$ na casa dos
milhões, usa-se SGD com momento ou Adam.
