---
title: "4.3 - Diagnóstico de convergência"
course: met-comp
---

## Diagnóstico de convergência

O MCMC só produz amostras do posterior **depois** que a cadeia converge para a
sua distribuição estacionária, e mesmo então as amostras são correlacionadas.
Esta aula reúne as ferramentas para julgar se a cadeia rodou o suficiente e
para quantificar a precisão das estimativas que dela saem.

### Conteúdo

- Aquecimento e o gráfico de traço
- Autocorrelação e tamanho efetivo de amostra
- O erro de Monte Carlo da cadeia
- Múltiplas cadeias e a estatística $$\hat R$$
- Boas práticas

## Aquecimento e o gráfico de traço

As primeiras iterações dependem do ponto inicial e não representam o posterior.
Descartam-se essas iterações (o **aquecimento**). Para decidir quantas, olha-se
o **gráfico de traço**: o valor do parâmetro contra o número da iteração. Uma
cadeia bem misturada parece um "ruído estacionário" em torno de um nível
constante; tendências, patamares ou uma cadeia que ainda está "subindo"
indicam que o aquecimento foi curto ou que a cadeia não convergiu.

## Autocorrelação e tamanho efetivo de amostra

Amostras consecutivas de MCMC são correlacionadas. A **função de
autocorrelação** $$\rho_k$$ mede a correlação entre $$\theta^{(t)}$$ e
$$\theta^{(t+k)}$$; quanto mais devagar ela decai, mais redundantes são as
amostras. O **tamanho efetivo de amostra** resume isso:

$$
n_{\mathrm{eff}}=\frac{T}{1+2\sum_{k\ge 1}\rho_k},
$$

o número de amostras **independentes** equivalentes às $$T$$ amostras
correlacionadas da cadeia. Se $$T=10^{4}$$ mas $$n_{\mathrm{eff}}=200$$, a
cadeia carrega pouca informação e é preciso rodar mais, ou melhorar a proposta.

## O erro de Monte Carlo da cadeia

Como em qualquer Monte Carlo (aula 2.2), a estimativa de uma esperança a
posteriori tem um erro que decresce com a raiz do número de amostras, mas agora
com $$n_{\mathrm{eff}}$$ no lugar de $$T$$:

$$
\mathrm{ep}\big(\hat{\mathbb{E}}[h(\theta)\mid D]\big)\approx\frac{\hat\sigma_h}{\sqrt{n_{\mathrm{eff}}}}.
$$

Esse **erro de Monte Carlo** deve ser pequeno em relação ao desvio padrão a
posteriori de $$h(\theta)$$; caso contrário, a incerteza do relatório vem do
amostrador, não dos dados.

## Múltiplas cadeias e a estatística $$\hat R$$

O diagnóstico mais confiável é rodar **várias cadeias** a partir de pontos
iniciais dispersos e verificar se elas concordam. A estatística de
Gelman-Rubin $$\hat R$$ compara a variância **entre** cadeias com a variância
**dentro** de cada cadeia:

$$
\hat R\approx\sqrt{\frac{\text{variância combinada}}{\text{variância intra-cadeia}}}.
$$

Se as cadeias convergiram para a mesma distribuição, as duas variâncias
coincidem e $$\hat R\approx 1$$. Valores acima de cerca de $$1{,}01$$
indicam que as cadeias ainda não misturaram e que é cedo para usar as amostras.

## Boas práticas

- rodar **pelo menos quatro cadeias** de pontos iniciais diferentes;
- descartar a primeira metade de cada cadeia como aquecimento;
- reportar $$\hat R$$ e $$n_{\mathrm{eff}}$$ para **cada** quantidade de
  interesse, não só para os parâmetros;
- inspecionar visualmente os gráficos de traço e as densidades marginais das
  cadeias sobrepostas;
- lembrar que os diagnósticos podem **detectar** a não convergência, mas nunca
  **provar** a convergência: uma cadeia pode parecer estável por muito tempo e
  só depois descobrir outra região do posterior.
