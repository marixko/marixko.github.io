---
title: "1.18 - Métodos de estimação"
course: met-comp
---

## Métodos de estimação

As aulas anteriores usaram estimadores específicos ($$\bar X$$ para a média,
$$S^{2}$$ para a variância, os mínimos quadrados para a regressão) sem explicar
de onde eles vêm. Esta aula apresenta os três métodos gerais que produzem
estimadores: os momentos, a máxima verossimilhança e os mínimos quadrados.

### Conteúdo

- Método dos momentos
- Método da máxima verossimilhança
- Propriedades da máxima verossimilhança
- Método dos mínimos quadrados
- Comparação entre os métodos

## Método dos momentos

O mais simples. Se o modelo tem $$k$$ parâmetros, escrevem-se os $$k$$
primeiros momentos teóricos em função deles,

$$
\mu_r'(\theta)=\mathbb{E}_\theta[X^{r}],\qquad r=1,\ldots,k,
$$

igualam-se aos momentos amostrais $$m_r'=\frac{1}{n}\sum_i X_i^{r}$$ e
resolve-se o sistema para $$\theta$$. Por exemplo, para
$$X\sim\text{Gama}(\alpha,\lambda)$$, de $$\mathbb{E}[X]=\alpha/\lambda$$ e
$$\operatorname{Var}(X)=\alpha/\lambda^{2}$$ obtêm-se
$$\hat\lambda=\bar X/S^{2}$$ e $$\hat\alpha=\bar X^{2}/S^{2}$$.

O método é fácil de aplicar e os estimadores são consistentes, mas em geral
**não são eficientes** e podem cair fora do espaço de parâmetros (por exemplo,
uma variância estimada negativa).

## Método da máxima verossimilhança

Dada a amostra $$x_1,\ldots,x_n$$, a **verossimilhança** é a probabilidade (ou
densidade) dos dados vista como função de $$\theta$$,

$$
\mathcal{L}(\theta)=\prod_{i=1}^{n}f_\theta(x_i),
$$

e o **estimador de máxima verossimilhança** (EMV) é o valor que a maximiza:

$$
\hat\theta_{\mathrm{MV}}=\arg\max_{\theta}\ \mathcal{L}(\theta)
=\arg\max_{\theta}\ \ell(\theta),
\qquad
\ell(\theta)=\sum_{i=1}^{n}\log f_\theta(x_i).
$$

Trabalha-se com a **log-verossimilhança** $$\ell$$, porque transforma o produto
em soma. Quando $$\ell$$ é diferenciável, $$\hat\theta_{\mathrm{MV}}$$ resolve a
equação do escore $$\ell'(\theta)=0$$.

Exemplos: para $$X_i\sim\mathcal{N}(\mu,\sigma^{2})$$,
$$\hat\mu_{\mathrm{MV}}=\bar X$$ e
$$\hat\sigma^{2}_{\mathrm{MV}}=\frac{1}{n}\sum_i(X_i-\bar X)^{2}$$ (com divisor
$$n$$, portanto viesado). Para $$X_i\sim\text{Bernoulli}(p)$$,
$$\hat p_{\mathrm{MV}}=\bar X$$. Para $$X_i\sim\text{Poisson}(\lambda)$$,
$$\hat\lambda_{\mathrm{MV}}=\bar X$$.

## Propriedades da máxima verossimilhança

Sob condições de regularidade, o EMV tem propriedades ótimas:

- **invariância**: se $$\hat\theta$$ é o EMV de $$\theta$$, então
  $$g(\hat\theta)$$ é o EMV de $$g(\theta)$$;
- **consistência**: $$\hat\theta_{\mathrm{MV}}\xrightarrow{P}\theta$$;
- **normalidade assintótica e eficiência**:

$$
\sqrt{n}\,(\hat\theta_{\mathrm{MV}}-\theta)\ \xrightarrow{d}\ \mathcal{N}\!\big(0,\ I(\theta)^{-1}\big),
$$

onde $$I(\theta)$$ é a informação de Fisher de uma observação (aula 1.11). O
EMV atinge a cota de Cramér-Rao no limite, e $$I(\hat\theta)^{-1}/n$$ fornece
os erros padrão aproximados.

Quando não há solução fechada, $$\ell$$ é maximizada numericamente (Newton,
BFGS) ou pelo algoritmo EM se houver variáveis latentes.

## Método dos mínimos quadrados

Quando o interesse é a **média condicional** $$\mathbb{E}[Y\mid x]=g(x;\theta)$$
e não a distribuição inteira, estima-se $$\theta$$ minimizando a soma dos
quadrados dos resíduos,

$$
\hat\theta_{\mathrm{MQ}}=\arg\min_{\theta}\ \sum_{i=1}^{n}\big(y_i-g(x_i;\theta)\big)^{2}.
$$

Não exige especificar a distribuição do erro, apenas $$\mathbb{E}[\varepsilon\mid
x]=0$$. Sob ruído gaussiano de variância constante, mínimos quadrados
**coincidem** com a máxima verossimilhança, e o teorema de Gauss-Markov
garante que, na regressão linear, é o estimador linear não viesado de menor
variância.

## Comparação entre os métodos

| Método | Precisa da distribuição? | Eficiência | Custo |
| --- | --- | --- | --- |
| Momentos | não | baixa | trivial |
| Máxima verossimilhança | sim | ótima (assintótica) | pode exigir otimização numérica |
| Mínimos quadrados | não (só a média condicional) | ótima sob erro gaussiano homoscedástico | fechado no caso linear |

Na prática, a máxima verossimilhança é o método padrão quando o modelo
probabilístico é conhecido; os mínimos quadrados dominam a regressão; e os
momentos servem como ponto de partida ou quando a verossimilhança é
intratável.
