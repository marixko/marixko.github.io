---
title: 1.4 — Minimização do Risco Empírico
course: ml
---

## Minimização do risco empírico

Nas aulas anteriores definimos o preditor de Bayes $$f^{*}$$, o alvo ideal.
O problema é que ele depende de $$P(X,Y)$$, que não conhecemos: só temos uma
amostra finita. Esta aula trata do princípio prático que substitui o risco
verdadeiro pela sua versão amostral, e mostra que a máxima verossimilhança,
central em Estatística, é um caso particular desse mesmo princípio.

### Conteúdo

- Minimização do risco empírico (ERM)
- Risco populacional versus risco empírico
- Máxima verossimilhança como problema de aprendizado
- Log-verossimilhança
- Negative log-likelihood
- Relação entre Estatística e Machine Learning

### O princípio ERM

Como não podemos calcular o risco populacional

$$
R(f)=\mathbb{E}_{(X,Y)\sim P}\big[\,L(Y,f(X))\,\big],
$$

trocamos a esperança sob $$P$$ pela média sobre o conjunto de treinamento
$$D=\{(x_i,y_i)\}_{i=1}^{n}$$. Isso define o **risco empírico**

$$
\hat R_n(f)=\frac{1}{n}\sum_{i=1}^{n}L\big(y_i,f(x_i)\big),
$$

e o princípio de **minimização do risco empírico** (ERM) escolhe o preditor
que o torna menor dentro do espaço de hipóteses $$\mathcal{H}$$:

$$
\hat f=\arg\min_{f\in\mathcal{H}}\;\hat R_n(f).
$$

Quase todo algoritmo de aprendizado supervisionado é uma instância de ERM:
muda a perda $$L$$, muda a família $$\mathcal{H}$$ e muda o otimizador, mas a
estrutura é sempre essa. Quando $$\mathcal{H}$$ é parametrizado por
$$\theta$$, escrevemos $$f_\theta$$ e minimizamos em $$\theta$$.

### Risco populacional versus risco empírico

Para um $$f$$ **fixo**, escolhido sem olhar os dados, o risco empírico é um
estimador não viesado do risco populacional:

$$
\mathbb{E}\big[\hat R_n(f)\big]=R(f),
$$

e pela lei dos grandes números $$\hat R_n(f)\to R(f)$$ quando
$$n\to\infty$$, com flutuação de ordem $$1/\sqrt{n}$$ pelo teorema central do
limite.

O problema aparece quando o mesmo conjunto $$D$$ é usado para **escolher**
$$\hat f$$. Aí $$\hat f$$ passa a depender do ruído da amostra, e
$$\hat R_n(\hat f)$$ deixa de ser não viesado: ele é **otimista**, ou seja,
subestima sistematicamente $$R(\hat f)$$. A quantidade que controla o erro é o
desvio máximo sobre toda a classe,

$$
\sup_{f\in\mathcal{H}}\big\lvert\,\hat R_n(f)-R(f)\,\big\rvert,
$$

que cresce com a **capacidade** de $$\mathcal{H}$$ (número de parâmetros,
dimensão VC e conceitos afins que veremos adiante). Um $$\mathcal{H}$$ rico
consegue baixar $$\hat R_n$$ ajustando-se ao ruído, sem baixar $$R$$: é o
sobreajuste. Por isso $$R(\hat f)$$ é estimado num conjunto de teste
independente, e a diferença $$R(\hat f)-\hat R_n(\hat f)$$ é a **lacuna de
generalização**.

### Máxima verossimilhança como problema de aprendizado

Suponha que o modelo seja **probabilístico**: para cada $$\theta$$ ele define
uma densidade condicional $$p_\theta(y\mid x)$$. A **verossimilhança** dos
dados é a probabilidade de observar o conjunto de treinamento como função de
$$\theta$$. Supondo as observações independentes,

$$
\mathcal{L}(\theta)=\prod_{i=1}^{n}p_\theta(y_i\mid x_i),
$$

e o estimador de **máxima verossimilhança** é

$$
\hat\theta=\arg\max_{\theta}\;\prod_{i=1}^{n}p_\theta(y_i\mid x_i).
$$

### Log-verossimilhança

Trabalhar com o produto é ruim: ele gera números minúsculos (problemas
numéricos) e a sua derivada, pela regra do produto, é desajeitada. Como o
logaritmo é **estritamente crescente**, maximizar $$\mathcal{L}(\theta)$$ é o
mesmo que maximizar a **log-verossimilhança**

$$
\ell(\theta)=\log\mathcal{L}(\theta)=\sum_{i=1}^{n}\log p_\theta(y_i\mid x_i).
$$

O produto virou soma, o que torna a otimização e a análise assintótica muito
mais simples. O gradiente $$\nabla_\theta\ell(\theta)$$ é chamado de
**escore**, e $$\hat\theta$$ resolve $$\nabla_\theta\ell(\hat\theta)=0$$.

### Negative log-likelihood

Como otimizadores minimizam por convenção, trocamos o sinal e definimos a
**negative log-likelihood** (NLL):

$$
\mathrm{NLL}(\theta)=-\ell(\theta)=-\sum_{i=1}^{n}\log p_\theta(y_i\mid x_i).
$$

Dividindo por $$n$$, isso é **exatamente** um risco empírico com a função de
perda

$$
L(y,\theta;x)=-\log p_\theta(y\mid x).
$$

Ou seja, **máxima verossimilhança é ERM com a log-loss**. Cada escolha de
$$p_\theta$$ recupera uma perda familiar:

| Modelo $$p_\theta(y\mid x)$$ | $$-\log p_\theta(y\mid x)$$ | Perda equivalente |
| --- | --- | --- |
| $$\mathcal{N}\big(f_\theta(x),\sigma^2\big)$$ | $$\dfrac{(y-f_\theta(x))^2}{2\sigma^2}+\tfrac12\log(2\pi\sigma^2)$$ | erro quadrático (mínimos quadrados) |
| Bernoulli$$\big(\hat p_\theta(x)\big)$$ | $$-\big[y\log\hat p_\theta+(1-y)\log(1-\hat p_\theta)\big]$$ | log-loss binária |
| Categórica$$\big(\hat p_\theta(x)\big)$$ | $$-\log \hat p_{\theta,y}(x)$$ | entropia cruzada |
| Poisson$$\big(\lambda_\theta(x)\big)$$ | $$\lambda_\theta(x)-y\log\lambda_\theta(x)+\log y!$$ | perda de Poisson |

Assim, "supor ruído gaussiano" e "minimizar o erro quadrático" são a mesma
afirmação, vista de dois ângulos.

### Estatística e Machine Learning

O quadro que emerge é que **Estatística e aprendizado de máquina atacam o mesmo
problema**: estimar aspectos de $$P(Y\mid X)$$ a partir de uma amostra. O que
difere são as ênfases.

- A Estatística clássica foca no **parâmetro**: consistência de
  $$\hat\theta$$, distribuição assintótica, intervalos de confiança, testes de
  hipótese, e costuma supor que o modelo $$p_\theta$$ está correto.
- O aprendizado de máquina foca na **predição**: o objeto de interesse é
  $$R(\hat f)$$ em dados novos, $$\mathcal{H}$$ é escolhido pela sua capacidade
  de generalizar e não por ser "verdadeiro", e a escalabilidade do otimizador
  importa tanto quanto a estatística.

A ponte entre os dois lados é a **regularização**. Adicionar um termo de
penalização a favor de $$\theta$$ pequeno,

$$
\hat\theta=\arg\min_{\theta}\;\Big[\,-\sum_{i=1}^{n}\log p_\theta(y_i\mid x_i)\;-\;\log \pi(\theta)\,\Big],
$$

é, do lado estatístico, uma estimativa de **máximo a posteriori** com prior
$$\pi(\theta)$$ e, do lado de ML, um risco empírico penalizado que troca um
pouco de viés por menos variância. A penalização $$L_2$$ corresponde a um prior
gaussiano; a penalização $$L_1$$, a um prior de Laplace. Esse é o tema das
próximas aulas.
