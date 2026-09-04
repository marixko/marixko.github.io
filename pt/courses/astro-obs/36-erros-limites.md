---
title: "7.2 - Análise de erros, limites de detecção e limites superiores"
course: astro-obs
---

## O número e a sua incerteza

O curso começou dizendo que o produto de uma observação é um número com uma barra de erro honesta. Esta última aula trata de como obter essa barra de erro, o que significa "detecção", e o que relatar quando não se detecta nada.

### Conteúdo

- Erros estatísticos e sistemáticos
- Propagação e combinação de medidas
- Significância de uma detecção
- Limites superiores
- Completeza, confiabilidade e viés de seleção
- Viés de Malmquist e Eddington

## Erros estatísticos e sistemáticos

- **Estatístico**: flutuação aleatória que **diminui** com mais dados, como $$1/\sqrt{N}$$. Ruído de Poisson, ruído de leitura, ruído do céu.
- **Sistemático**: desvio que **não** melhora com mais dados. Erro de flat, de subtração de céu, de ponto de zero, do modelo de PSF, da calibração absoluta. Em fontes brilhantes, é o sistemático que fixa o piso de precisão (aula 3.5).

Um erro relatado deveria ter as duas componentes, separadas: `valor ± estatístico ± sistemático`. Ignorar a sistemática produz barras de erro pequenas demais e "tensões" que são só calibração.

## Propagação e combinação de medidas

Para uma função $$q(x_1,\dots,x_n)$$ de quantidades com covariância $$\Sigma$$, a variância propagada em primeira ordem é

$$
\sigma_q^2 = \sum_{i,j} \frac{\partial q}{\partial x_i}\frac{\partial q}{\partial x_j}\,\Sigma_{ij}.
$$

Os termos cruzados importam: magnitudes de bandas calibradas com o mesmo ponto de zero têm erros **correlacionados**, e a incerteza de uma **cor** é menor que a soma em quadratura ingênua.

Para combinar $$N$$ medidas independentes de uma mesma grandeza, a **média ponderada** pelo inverso da variância é ótima:

$$
\bar q = \frac{\sum_i q_i/\sigma_i^2}{\sum_i 1/\sigma_i^2}, \qquad
\sigma_{\bar q}^2 = \frac{1}{\sum_i 1/\sigma_i^2}.
$$

O **$$\chi^2$$ por grau de liberdade** dessa combinação diagnostica os erros: $$\chi^2/\text{dof} \approx 1$$ é consistente; $$\gg 1$$ indica variabilidade real ou erros subestimados (inflam-se então as barras, ou adiciona-se um termo de dispersão); $$\ll 1$$ indica erros superestimados ou correlacionados.

## Significância de uma detecção

"Detecção a $$5\sigma$$" significa que a probabilidade de o ruído sozinho produzir um sinal tão forte é a cauda de $$5\sigma$$ de uma gaussiana ($$\sim 3\times 10^{-7}$$). Mas:

- **Efeito de procurar em muitos lugares** (*look-elsewhere*): se você testou $$M$$ posições, frequências ou modelos independentes, a chance de um falso positivo em algum deles é $$\sim M$$ vezes maior. A significância "local" precisa ser corrigida pelo **fator de tentativas** para virar significância "global".
- **Ruído não gaussiano**: em regime de baixa contagem ou com sistemática, a cauda real é mais gorda que a gaussiana, e "$$5\sigma$$" calculado como (sinal)/(erro formal) engana.
- A significância robusta vem de **simulações** (injetar ruído puro e ver com que frequência aparece um sinal igual) ou de **razão de verossimilhança** com a distribuição de referência calibrada.

## Limites superiores

Quando a fonte **não é detectada**, ainda há informação: o fluxo é menor que algum valor. Relata-se um **limite superior**, não "zero". Pontos de cuidado:

- Distinguir "limite de $$3\sigma$$" (fluxo $$< 3\times$$ o ruído local na abertura) de um **intervalo de confiança** propriamente dito.
- No regime de **baixa contagem de Poisson**, usar a construção de **Feldman-Cousins** (ou Bayesiana com prior explícito), que trata de forma unificada o caso de detecção fraca e o de não detecção, sem os limites superiores "vazios" que a aproximação gaussiana produz quando o sinal medido é negativo por flutuação.
- **Empilhar** (*stacking*) as posições de muitos objetos não detectados individualmente pode dar uma detecção **média**, desde que a amostra seja bem definida e o fundo, controlado.

## Completeza, confiabilidade e viés de seleção

Todo catálogo tem dois números que se opõem:

- **Completeza**: fração das fontes reais que foram detectadas.
- **Confiabilidade** (ou pureza): fração das detecções que são fontes reais.

Baixar o limiar de detecção aumenta a completeza e diminui a pureza; a curva desse compromisso é uma **ROC**. Ambas dependem de magnitude, tamanho, brilho superficial e densidade local, e medem-se com **fontes artificiais** (aula 4.4). Nenhuma análise estatística de uma população é interpretável sem elas.

## Viés de Malmquist e Eddington

Dois vieses inevitáveis em amostras limitadas por fluxo:

- **Viés de Malmquist**: em cada distância, só se veem os objetos mais luminosos que o limite; a **luminosidade média** de uma amostra limitada por fluxo cresce artificialmente com a distância. Corrige-se modelando a função de luminosidade e o limite, ou usando amostras limitadas por **volume**.
- **Viés de Eddington**: quando a contagem de fontes cai íngreme com o fluxo (há muito mais fontes fracas que brilhantes), o erro fotométrico espalha mais fontes fracas para cima do que brilhantes para baixo, então **perto do limite** as fontes têm, em média, fluxo verdadeiro menor que o medido, e as contagens são infladas. O efeito depende do erro e da inclinação das contagens, e precisa ser corrigido antes de ajustar funções de luminosidade ou contagens de fontes.

## Relatar com honestidade

Um resultado observacional bem apresentado tem: o valor, o erro estatístico, o erro sistemático, o **termo dominante** do orçamento de erros, e as verificações de sanidade feitas (fotometria em duas aberturas, calibração com dois conjuntos de padrões, resultado estável a diferentes hipóteses de céu). O curso inteiro serviu para saber de onde vem cada uma dessas incertezas, do fóton na atmosfera ao número na tabela.
