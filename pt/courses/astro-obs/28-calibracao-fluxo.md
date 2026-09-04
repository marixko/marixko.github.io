---
title: "5.5 - Calibração em fluxo e espectrofotometria"
course: astro-obs
---

## De contagens por pixel a $$f_\lambda$$

Um espectro extraído está em contagens por pixel: mistura o espectro do objeto com a resposta do instrumento em função de $$\lambda$$. A calibração em fluxo remove essa resposta e devolve $$f_\lambda$$ em unidades físicas.

### Conteúdo

- A função de sensibilidade
- Aplicação e correção de extinção
- Perdas de fenda e espectrofotometria relativa versus absoluta
- Reescalonamento pela fotometria
- Precisão alcançável
- Artefatos

## A função de sensibilidade

A resposta total do sistema, $$S(\lambda)$$, converte fluxo em contagens:

$$
N(\lambda) = f_\lambda(\lambda)\, S(\lambda)\, t.
$$

Para medi-la, observa-se uma **estrela padrão espectrofotométrica** cujo $$f_\lambda^\text{tab}(\lambda)$$ é conhecido de forma absoluta (anãs brancas modeladas, subanãs quentes, as padrões do HST). Então

$$
S(\lambda) = \frac{N_\text{padrão}(\lambda)}{f_\lambda^\text{tab}(\lambda)\, t_\text{padrão}}.
$$

Como $$f_\lambda^\text{tab}$$ das padrões é tabelado em passos largos e é suave, ajusta-se uma curva suave (spline de baixo grau) a $$S(\lambda)$$, ignorando as linhas intrínsecas da estrela e as bandas telúricas (tratadas à parte, aula 5.4). A padrão deve ser observada com a **mesma configuração** (fenda, rede, ângulo) do alvo.

## Aplicação e correção de extinção

Com $$S(\lambda)$$ em mãos, o espectro do objeto vira

$$
f_\lambda^\text{obj}(\lambda) = \frac{N_\text{obj}(\lambda)}{S(\lambda)\, t_\text{obj}} \times 10^{\,0{,}4\,k(\lambda)\,[X_\text{obj} - X_\text{padrão}]},
$$

onde o último fator corrige a **extinção atmosférica diferencial** entre a massa de ar do objeto e a da padrão, usando uma curva de extinção $$k(\lambda)$$ do sítio (aula 1.5). Se a padrão e o alvo forem observados na mesma massa de ar, esse fator é 1.

## Perdas de fenda e espectrofotometria relativa versus absoluta

O problema central da espectrofotometria de fenda: a fração da luz que entra na fenda **depende de $$\lambda$$**, porque a dispersão atmosférica alonga a imagem da estrela verticalmente (azul acima, vermelho abaixo) e uma fenda estreita corta cores diferentes de forma diferente.

- **Espectrofotometria relativa** (a **forma** de $$f_\lambda$$ correta, a escala absoluta não): aceitável se a fenda do objeto e a da padrão forem estreitas e a geometria for parecida; o erro residual é a diferença de perdas cromáticas.
- **Espectrofotometria absoluta** (forma **e** escala corretas): exige fenda larga o suficiente para capturar toda a luz em todos os $$\lambda$$ ("fenda espectrofotométrica", $$\gtrsim 5''$$), ou o uso de um corretor de dispersão atmosférica, ou o alinhamento da fenda ao **ângulo paraláctico** (vertical) para que a dispersão fique ao longo da fenda.

## Reescalonamento pela fotometria

A técnica mais robusta para recuperar a escala absoluta: se existe **fotometria de banda larga** do objeto, integra-se o espectro calibrado pelas curvas de resposta dos filtros (fotometria sintética, aula 2.3), compara-se com as magnitudes medidas, e reescala-se o espectro (por um fator constante ou por um polinômio suave de baixo grau em $$\lambda$$) para casar. Isso combina a **forma** espectral bem medida com a **normalização** confiável da fotometria, e corrige de uma vez perdas de fenda, nuvens finas e erros de $$S(\lambda)$$ de larga escala.

## Precisão alcançável

Números típicos:

- **Relativa** (forma do contínuo, razões de linhas separadas por centenas de \AA): $$1$$–$$3\%$$ com cuidado.
- **Absoluta** (nível de $$f_\lambda$$): $$5$$–$$10\%$$ na maioria dos casos; $$\sim 2\%$$ em condições ideais com reescalonamento fotométrico.
- Razões de linhas **próximas** (Balmer decrement H$$\alpha$$/H$$\beta$$, separadas por $$\sim 1500\ \text{\AA}$$): melhores que a espectrofotometria absoluta, porque erros suaves de $$S(\lambda)$$ quase cancelam; é por isso que essas razões são bons medidores de extinção.

## Artefatos

- **Contaminação de segunda ordem**: em redes de baixa dispersão, luz de $$\lambda/2$$ na segunda ordem cai sobre $$\lambda$$ na primeira, adicionando um contínuo azul espúrio no vermelho. Bloqueia-se com filtro; se não, a padrão deve ter a mesma contaminação para cancelar aproximadamente.
- **Fringing** no vermelho, tratado no flat.
- **Buracos de telúrica mal corrigidos**, que deixam picos e vales espúrios exatamente onde a atmosfera absorve.
- **Erro de LSF**: se a resolução da padrão e do alvo diferir (fenda diferente, *seeing* diferente), $$S(\lambda)$$ tem estrutura fina errada perto das linhas da padrão.
