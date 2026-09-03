---
title: "3.1 - Fundamentos bayesianos"
course: met-comp
---

## Fundamentos bayesianos

Começa o Módulo 3. Até aqui, $$\theta$$ foi tratado como uma constante fixa e
desconhecida, e a probabilidade descrevia a variabilidade dos **dados**. A
abordagem bayesiana inverte isso: $$\theta$$ recebe uma distribuição de
probabilidade que representa a nossa **incerteza** sobre ele, e essa
distribuição é atualizada pelos dados.

### Conteúdo

- Probabilidade como grau de crença
- Prior, verossimilhança e posterior
- O teorema de Bayes revisitado
- A verossimilhança marginal
- Frequentista e bayesiano

## Probabilidade como grau de crença

No enfoque bayesiano, uma probabilidade pode quantificar o **grau de crença**
em uma afirmação, e não apenas a frequência de um evento repetível. Isso
permite falar em "a probabilidade de $$\theta$$ estar entre $$0{,}3$$ e
$$0{,}5$$", uma frase que não tem sentido no enfoque frequentista, onde
$$\theta$$ é fixo.

## Prior, verossimilhança e posterior

O modelo tem três ingredientes:

- a **distribuição a priori** $$p(\theta)$$, que expressa o que se sabe sobre
  $$\theta$$ **antes** de ver os dados;
- a **verossimilhança** $$p(D\mid\theta)$$, o modelo dos dados dado o
  parâmetro, a mesma das aulas anteriores;
- a **distribuição a posteriori** $$p(\theta\mid D)$$, que combina as duas e
  representa o que se sabe **depois** de ver os dados.

## O teorema de Bayes revisitado

A conexão entre elas é o teorema de Bayes da aula 1.4, aplicado a $$\theta$$:

$$
\boxed{
p(\theta\mid D)=\frac{p(D\mid\theta)\,p(\theta)}{p(D)}.
}
$$

Como o denominador $$p(D)$$ não depende de $$\theta$$, costuma-se escrever

$$
p(\theta\mid D)\ \propto\ p(D\mid\theta)\,p(\theta),
$$

isto é, **posterior é proporcional a verossimilhança vezes prior**. Toda a
inferência bayesiana sai do posterior: estimativas pontuais, intervalos,
previsões e comparações de modelos.

À medida que se acumulam dados, a verossimilhança domina o prior e o posterior
se concentra em torno do valor verdadeiro; com poucos dados, o prior tem peso
maior. Priors diferentes só levam a conclusões muito diferentes quando os dados
são poucos.

## A verossimilhança marginal

O denominador

$$
p(D)=\int p(D\mid\theta)\,p(\theta)\,d\theta
$$

é a **verossimilhança marginal** (ou evidência): a probabilidade dos dados
**média sobre todos os valores de $$\theta$$**, ponderada pelo prior. Ela
normaliza o posterior e, como veremos na aula 3.4, é a peça central da
comparação de modelos. Calcular essa integral é a principal dificuldade
computacional do enfoque bayesiano, e o que motiva os métodos do Módulo 4.

## Frequentista e bayesiano

| | Frequentista | Bayesiano |
| --- | --- | --- |
| $$\theta$$ | constante fixa | variável aleatória (incerteza) |
| Probabilidade | frequência de longo prazo | grau de crença |
| Resultado | estimativa pontual, IC, valor-p | distribuição a posteriori inteira |
| Interpretação do intervalo | $$95\%$$ dos intervalos contêm $$\theta$$ | $$95\%$$ de probabilidade de $$\theta$$ estar no intervalo |
| Precisa de prior? | não | sim |

Os dois enfoques costumam concordar numericamente quando há muitos dados e o
prior é pouco informativo. A escolha entre eles depende do problema: o
bayesiano é natural para incorporar conhecimento prévio e para propagar
incerteza; o frequentista, para garantias que valem **para qualquer** valor de
$$\theta$$.
