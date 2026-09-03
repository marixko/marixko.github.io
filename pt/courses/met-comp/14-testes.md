---
title: "1.13 - Teste de hipóteses"
course: met-comp
---

## Teste de hipóteses

O intervalo de confiança da aula anterior descreve uma faixa de valores
plausíveis para o parâmetro. O teste de hipóteses responde a uma pergunta
binária: os dados são compatíveis com uma afirmação específica sobre o
parâmetro, ou a contradizem?

### Conteúdo

- Hipóteses nula e alternativa
- Estatística de teste e região de rejeição
- Erros do tipo I e do tipo II
- Nível de significância, poder e valor-p
- Testes para média, variância e proporção
- Relação com o intervalo de confiança

## Hipóteses nula e alternativa

A **hipótese nula** $$H_0$$ é a afirmação de referência, em geral de "nenhum
efeito" ou "nenhuma diferença", assumida verdadeira até que os dados a
contradigam. A **hipótese alternativa** $$H_1$$ é o que se quer demonstrar. Por
exemplo,

$$
H_0:\mu=\mu_0
\qquad\text{contra}\qquad
H_1:\mu\neq\mu_0
$$

no caso **bilateral**, ou $$H_1:\mu>\mu_0$$ (ou $$\mu<\mu_0$$) no caso
**unilateral**.

Os papéis não são simétricos: o teste protege $$H_0$$ e só a rejeita diante de
evidência forte. Por isso, "não rejeitar $$H_0$$" **não** é o mesmo que
"aceitar $$H_0$$": significa apenas que os dados não foram suficientes para
descartá-la.

## Estatística de teste e região de rejeição

Uma **estatística de teste** $$T$$ é uma função da amostra cuja distribuição
**sob $$H_0$$** é conhecida. A **região de rejeição** (ou região crítica)
$$\mathrm{RC}$$ é o conjunto de valores de $$T$$ para os quais decidimos
rejeitar $$H_0$$. A regra de decisão é: rejeitar $$H_0$$ se
$$T\in\mathrm{RC}$$.

## Erros do tipo I e do tipo II

Toda decisão pode errar de duas formas:

| | $$H_0$$ verdadeira | $$H_0$$ falsa |
| --- | --- | --- |
| **Rejeitar $$H_0$$** | erro do tipo I | decisão correta |
| **Não rejeitar $$H_0$$** | decisão correta | erro do tipo II |

As probabilidades desses erros são

$$
\alpha=P(\text{rejeitar }H_0\mid H_0\text{ verdadeira}),
\qquad
\beta=P(\text{não rejeitar }H_0\mid H_0\text{ falsa}).
$$

O valor $$\alpha$$ é o **nível de significância**, fixado pelo analista
(tipicamente $$0{,}05$$). O valor $$\beta$$ depende de quão falsa $$H_0$$
realmente é. O **poder** do teste é

$$
1-\beta=P(\text{rejeitar }H_0\mid H_1\text{ verdadeira}).
$$

Há um compromisso: diminuir $$\alpha$$ aumenta $$\beta$$, e vice-versa. A única
forma de reduzir os dois ao mesmo tempo é aumentar $$n$$. Fixado $$\alpha$$, a
região crítica é escolhida para maximizar o poder; para hipóteses simples, o
lema de Neyman-Pearson mostra que o teste da razão de verossimilhanças é o mais
poderoso.

## Valor-p

O **valor-p** é a probabilidade, calculada **sob $$H_0$$**, de obter uma
estatística de teste pelo menos tão contrária a $$H_0$$ quanto a observada:

$$
\text{valor-}p=P\big(T\ \text{tão ou mais extremo que }t_{\text{obs}}\ \big|\ H_0\big).
$$

A regra de decisão equivalente é: rejeitar $$H_0$$ se
$$\text{valor-}p\le\alpha$$. Um valor-p pequeno indica que os dados seriam
improváveis se $$H_0$$ fosse verdadeira.

Interpretação importante: o valor-p **não** é $$P(H_0\text{ verdadeira}\mid
\text{dados})$$. Ele mede a compatibilidade dos dados com $$H_0$$, não a
probabilidade de $$H_0$$.

## Teste para a média

Para $$H_0:\mu=\mu_0$$:

- com $$\sigma$$ conhecido (ou $$n$$ grande), sob $$H_0$$,
  $$Z=\dfrac{\bar X-\mu_0}{\sigma/\sqrt{n}}\sim\mathcal{N}(0,1)$$;
  rejeita-se (bilateral) se $$\lvert Z\rvert>z_{\alpha/2}$$;
- com $$\sigma$$ desconhecido, sob $$H_0$$,
  $$T=\dfrac{\bar X-\mu_0}{S/\sqrt{n}}\sim t_{n-1}$$;
  rejeita-se se $$\lvert T\rvert>t_{n-1;\,\alpha/2}$$.

Nos testes unilaterais, a região crítica fica de um lado só, com $$z_{\alpha}$$
ou $$t_{n-1;\,\alpha}$$.

## Teste para a variância

Para $$H_0:\sigma^{2}=\sigma_0^{2}$$, com população normal, sob $$H_0$$,

$$
\frac{(n-1)S^{2}}{\sigma_0^{2}}\sim\chi^{2}_{n-1}.
$$

No caso bilateral, rejeita-se $$H_0$$ se o valor cai abaixo de
$$\chi^{2}_{n-1;\,1-\alpha/2}$$ ou acima de $$\chi^{2}_{n-1;\,\alpha/2}$$.

## Teste para uma proporção

Para $$H_0:p=p_0$$, com $$n$$ grande, sob $$H_0$$,

$$
Z=\frac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}\ \approx\ \mathcal{N}(0,1).
$$

Note que o erro padrão usa $$p_0$$, o valor da hipótese, e não $$\hat p$$.
Rejeita-se (bilateral) se $$\lvert Z\rvert>z_{\alpha/2}$$.

## Relação com o intervalo de confiança

Teste e intervalo são a mesma inferência. Um teste bilateral de
$$H_0:\theta=\theta_0$$ ao nível $$\alpha$$ rejeita $$H_0$$ **se e somente se**
$$\theta_0$$ está **fora** do intervalo de confiança de nível $$1-\alpha$$.
Construir o intervalo e verificar se ele contém $$\theta_0$$ é equivalente a
executar o teste.

## Cuidados

- **Significância estatística não é significância prática.** Com $$n$$ muito
  grande, diferenças minúsculas e irrelevantes tornam-se "significativas".
  Reporte também o tamanho do efeito.
- **Testes múltiplos** inflam a probabilidade de erro do tipo I: fazer $$m$$
  testes ao nível $$\alpha$$ pode dar uma taxa de falsos positivos bem maior
  que $$\alpha$$. Corrige-se com Bonferroni ou controlando a taxa de falsas
  descobertas (FDR).
- O nível $$\alpha=0{,}05$$ é uma convenção, não uma lei. Prefira relatar o
  valor-p e o intervalo de confiança a apenas "rejeitou" ou "não rejeitou".

## Tabela-resumo

| $$H_0$$ | Condições | Estatística sob $$H_0$$ | Rejeitar (bilateral) se |
| --- | --- | --- | --- |
| $$\mu=\mu_0$$ | $$\sigma$$ conhecido | $$\dfrac{\bar X-\mu_0}{\sigma/\sqrt{n}}\sim\mathcal{N}(0,1)$$ | $$\lvert Z\rvert>z_{\alpha/2}$$ |
| $$\mu=\mu_0$$ | $$\sigma$$ desconhecido | $$\dfrac{\bar X-\mu_0}{S/\sqrt{n}}\sim t_{n-1}$$ | $$\lvert T\rvert>t_{n-1;\alpha/2}$$ |
| $$\sigma^{2}=\sigma_0^{2}$$ | população normal | $$\dfrac{(n-1)S^{2}}{\sigma_0^{2}}\sim\chi^{2}_{n-1}$$ | fora de $$[\chi^{2}_{n-1;1-\alpha/2},\ \chi^{2}_{n-1;\alpha/2}]$$ |
| $$p=p_0$$ | $$n$$ grande | $$\dfrac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}\approx\mathcal{N}(0,1)$$ | $$\lvert Z\rvert>z_{\alpha/2}$$ |
