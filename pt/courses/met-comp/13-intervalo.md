---
title: "1.12 - Intervalo de confiança"
course: met-comp
---

## Intervalo de confiança

A estimação pontual da aula anterior devolve um único número, $$\hat\theta$$,
sem dizer quão perto ele está de $$\theta$$. O intervalo de confiança
acrescenta essa informação: em vez de um ponto, uma faixa de valores plausíveis
para o parâmetro, com um nível de confiança associado.

### Conteúdo

- A ideia e a interpretação
- Quantidade pivotal
- Intervalo para a média
- Intervalo para a variância
- Intervalo para uma proporção
- Determinação do tamanho da amostra

## A ideia e a interpretação

Um **intervalo de confiança** de nível $$1-\alpha$$ para $$\theta$$ é um par de
estatísticas $$[L,U]$$, calculadas a partir da amostra, tal que

$$
P(L\le\theta\le U)=1-\alpha
$$

**antes** de os dados serem observados. O valor $$1-\alpha$$ é o **nível de
confiança**, tipicamente $$0{,}90$$, $$0{,}95$$ ou $$0{,}99$$.

A interpretação exige cuidado. O que é aleatório é o **intervalo**, não
$$\theta$$, que é uma constante fixa (ainda que desconhecida). A afirmação
correta é: se repetíssemos o experimento muitas vezes, cerca de
$$100(1-\alpha)\%$$ dos intervalos construídos conteriam $$\theta$$. Depois de
calcular um intervalo concreto $$[\ell,u]$$, ele contém ou não contém
$$\theta$$, e não faz sentido falar em probabilidade; dizemos apenas "com
$$95\%$$ de confiança".

## Quantidade pivotal

O método padrão de construção usa uma **quantidade pivotal**: uma função
$$Q(X_1,\ldots,X_n;\theta)$$ que depende dos dados e de $$\theta$$, mas cuja
**distribuição não depende de $$\theta$$**. Escolhidos $$a$$ e $$b$$ com
$$P(a\le Q\le b)=1-\alpha$$, basta resolver a desigualdade
$$a\le Q\le b$$ isolando $$\theta$$.

## Intervalo para a média com variância conhecida

Amostra i.i.d. com média $$\mu$$ desconhecida e variância $$\sigma^{2}$$
conhecida (com população normal, ou com $$n$$ grande pelo teorema central do
limite). O pivô é

$$
Z=\frac{\bar X-\mu}{\sigma/\sqrt{n}}\sim\mathcal{N}(0,1).
$$

Denotando por $$z_{\alpha/2}$$ o valor com
$$P(-z_{\alpha/2}\le Z\le z_{\alpha/2})=1-\alpha$$, isola-se $$\mu$$ e obtém-se

$$
\boxed{
\bar X\ \pm\ z_{\alpha/2}\,\frac{\sigma}{\sqrt{n}}.
}
$$

A meia-largura $$z_{\alpha/2}\,\sigma/\sqrt{n}$$ é a **margem de erro**. Para
$$95\%$$, $$z_{\alpha/2}\approx 1{,}96$$.

## Intervalo para a média com variância desconhecida

Quando $$\sigma$$ não é conhecido, substituímos por $$S$$. O pivô passa a ser

$$
T=\frac{\bar X-\mu}{S/\sqrt{n}}\sim t_{n-1},
$$

exato se a população é normal e aproximado pelo teorema central do limite caso
contrário. O intervalo é

$$
\boxed{
\bar X\ \pm\ t_{n-1;\,\alpha/2}\,\frac{S}{\sqrt{n}}.
}
$$

O quantil $$t_{n-1;\alpha/2}$$ é maior que $$z_{\alpha/2}$$, então o intervalo
fica mais largo: é o preço de ter estimado $$\sigma$$. À medida que $$n$$
cresce, $$t_{n-1;\alpha/2}\to z_{\alpha/2}$$ e os dois intervalos coincidem.

## Intervalo para a variância

Para uma população normal, o pivô é

$$
\frac{(n-1)S^{2}}{\sigma^{2}}\sim\chi^{2}_{n-1}.
$$

Com $$\chi^{2}_{n-1;\,\alpha/2}$$ e $$\chi^{2}_{n-1;\,1-\alpha/2}$$ os quantis
correspondentes, isola-se $$\sigma^{2}$$:

$$
\left[\ \frac{(n-1)S^{2}}{\chi^{2}_{n-1;\,\alpha/2}}\ ,\ \frac{(n-1)S^{2}}{\chi^{2}_{n-1;\,1-\alpha/2}}\ \right].
$$

Ao contrário dos intervalos para a média, este é **assimétrico** em torno de
$$S^{2}$$, porque a distribuição $$\chi^{2}$$ é assimétrica.

## Intervalo para uma proporção

Seja $$X\sim\text{Binomial}(n,p)$$ e $$\hat p=X/n$$. Para $$n$$ grande, o
teorema central do limite dá

$$
\frac{\hat p-p}{\sqrt{p(1-p)/n}}\ \approx\ \mathcal{N}(0,1).
$$

Substituindo $$p$$ por $$\hat p$$ no erro padrão, chega-se ao intervalo de Wald

$$
\boxed{
\hat p\ \pm\ z_{\alpha/2}\,\sqrt{\frac{\hat p\,(1-\hat p)}{n}}.
}
$$

Essa aproximação é ruim quando $$p$$ está perto de $$0$$ ou de $$1$$, ou quando
$$n$$ é pequeno; nesses casos usam-se os intervalos de Wilson, de Agresti-Coull
ou o exato de Clopper-Pearson.

## Determinação do tamanho da amostra

O tamanho da amostra pode ser escolhido para atingir uma margem de erro alvo
$$E$$. Para a média com variância conhecida,

$$
E=z_{\alpha/2}\,\frac{\sigma}{\sqrt{n}}
\quad\Longrightarrow\quad
n=\left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^{2}.
$$

Para uma proporção, usando o pior caso $$\hat p=1/2$$, que maximiza
$$\hat p(1-\hat p)$$,

$$
n=\left(\frac{z_{\alpha/2}}{2E}\right)^{2}.
$$

Em ambos os casos, reduzir a margem de erro pela metade exige **quadruplicar**
o tamanho da amostra.

## Tabela-resumo

| Parâmetro | Condições | Pivô | Intervalo de $$1-\alpha$$ |
| --- | --- | --- | --- |
| $$\mu$$ | $$\sigma$$ conhecido | $$\dfrac{\bar X-\mu}{\sigma/\sqrt{n}}\sim\mathcal{N}(0,1)$$ | $$\bar X\pm z_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}$$ |
| $$\mu$$ | $$\sigma$$ desconhecido | $$\dfrac{\bar X-\mu}{S/\sqrt{n}}\sim t_{n-1}$$ | $$\bar X\pm t_{n-1;\alpha/2}\dfrac{S}{\sqrt{n}}$$ |
| $$\sigma^{2}$$ | população normal | $$\dfrac{(n-1)S^{2}}{\sigma^{2}}\sim\chi^{2}_{n-1}$$ | $$\left[\dfrac{(n-1)S^{2}}{\chi^{2}_{n-1;\alpha/2}},\ \dfrac{(n-1)S^{2}}{\chi^{2}_{n-1;1-\alpha/2}}\right]$$ |
| $$p$$ | $$n$$ grande | $$\dfrac{\hat p-p}{\sqrt{\hat p(1-\hat p)/n}}\approx\mathcal{N}(0,1)$$ | $$\hat p\pm z_{\alpha/2}\sqrt{\dfrac{\hat p(1-\hat p)}{n}}$$ |
