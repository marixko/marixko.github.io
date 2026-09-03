---
title: "3.3 - Estimação bayesiana"
course: met-comp
---

## Estimação bayesiana

O posterior $$p(\theta\mid D)$$ contém tudo o que se sabe sobre $$\theta$$.
Esta aula mostra como extrair dele os objetos práticos: uma estimativa
pontual, um intervalo, e uma previsão para novas observações.

### Conteúdo

- Estimativas pontuais a posteriori
- Intervalos de credibilidade
- Distribuição preditiva a posteriori
- Comparação com a inferência frequentista

## Estimativas pontuais a posteriori

Se for preciso resumir o posterior em um número, a escolha depende da função de
perda (aula de decisão do módulo de ML):

- a **média a posteriori** $$\mathbb{E}[\theta\mid D]$$ minimiza a perda
  quadrática esperada;
- a **mediana a posteriori** minimiza a perda absoluta;
- a **moda a posteriori** (o **MAP**, *maximum a posteriori*),

$$
\hat\theta_{\mathrm{MAP}}=\arg\max_{\theta}\ p(\theta\mid D)
=\arg\max_{\theta}\ \big[\log p(D\mid\theta)+\log p(\theta)\big],
$$

minimiza a perda 0-1 e corresponde à máxima verossimilhança **penalizada** pelo
prior. Com prior uniforme, o MAP coincide com o EMV.

Para um posterior simétrico e unimodal, as três coincidem; para posteriores
assimétricos (comum com poucos dados), elas diferem, e a média costuma ser a
mais robusta.

## Intervalos de credibilidade

O análogo bayesiano do intervalo de confiança. Um **intervalo de
credibilidade** de nível $$1-\alpha$$ é qualquer região $$C$$ com

$$
P(\theta\in C\mid D)=\int_{C}p(\theta\mid D)\,d\theta=1-\alpha.
$$

Duas construções usuais:

- **de caudas iguais**: entre os quantis $$\alpha/2$$ e $$1-\alpha/2$$ do
  posterior;
- **HPD** (*highest posterior density*): a menor região que acumula
  $$1-\alpha$$ de probabilidade, formada pelos valores de $$\theta$$ de maior
  densidade a posteriori.

A interpretação é a que se gostaria de dar ao intervalo de confiança, mas que
só é correta aqui: "há $$95\%$$ de probabilidade de $$\theta$$ estar neste
intervalo, dados os dados observados".

## Distribuição preditiva a posteriori

Para prever uma nova observação $$\tilde X$$, não se usa um valor único de
$$\theta$$; integra-se sobre toda a incerteza a posteriori:

$$
\boxed{
p(\tilde x\mid D)=\int p(\tilde x\mid\theta)\,p(\theta\mid D)\,d\theta.
}
$$

É uma média das previsões de cada $$\theta$$, ponderada pela credibilidade de
$$\theta$$. A preditiva é **mais dispersa** que $$p(\tilde x\mid\hat\theta)$$,
porque incorpora a incerteza sobre o parâmetro além do ruído dos dados.

Exemplo (Beta-Binomial da aula 3.2): observados $$x$$ sucessos em $$n$$
tentativas com prior $$\text{Beta}(\alpha,\beta)$$, a probabilidade preditiva
de sucesso na próxima tentativa é

$$
P(\tilde X=1\mid D)=\mathbb{E}[\theta\mid D]=\frac{\alpha+x}{\alpha+\beta+n}.
$$

## Comparação com a inferência frequentista

| Objeto | Frequentista | Bayesiano |
| --- | --- | --- |
| Estimativa pontual | EMV, momentos, mínimos quadrados | média / mediana / moda (MAP) a posteriori |
| Intervalo | de confiança ($$1-\alpha$$ dos intervalos contêm $$\theta$$) | de credibilidade ($$1-\alpha$$ de probabilidade para $$\theta$$) |
| Previsão | $$p(\tilde x\mid\hat\theta)$$ (plug-in) | $$p(\tilde x\mid D)$$ (integra a incerteza) |

Com muitos dados e prior pouco informativo, as estimativas e os intervalos dos
dois enfoques ficam numericamente próximos; a diferença principal permanece na
interpretação e no fato de o bayesiano entregar a **distribuição inteira**, não
apenas um resumo.
