---
title: "2.1 - Geração de números aleatórios"
course: met-comp
---

## Geração de números aleatórios

Começa aqui o Módulo 2, sobre métodos computacionais. Quase todo método
estatístico moderno (Monte Carlo, *bootstrap*, testes de permutação, MCMC)
precisa gerar amostras de distribuições de probabilidade. Tudo se apoia em uma
única primitiva: um gerador de números uniformes em $$(0,1)$$.

### Conteúdo

- Números pseudoaleatórios
- Transformação pela inversa
- Método da aceitação-rejeição
- Transformação de Box-Muller
- Amostragem de vetores e de distribuições discretas

## Números pseudoaleatórios

Um computador é determinístico, então os "números aleatórios" que ele produz
são na verdade uma sequência **pseudoaleatória**: gerada por uma recorrência
determinística a partir de uma **semente**, mas estatisticamente
indistinguível de uma sequência i.i.d. $$\text{Uniforme}(0,1)$$. Geradores
modernos (o Mersenne Twister, o PCG) têm período astronomicamente longo e
passam baterias de testes de aleatoriedade. Fixar a semente torna qualquer
simulação **reprodutível**.

A partir daqui, supomos disponível um fluxo $$U_1,U_2,\ldots$$ de uniformes
independentes, e o problema é transformá-lo em amostras da distribuição
desejada.

## Transformação pela inversa

O método básico, já visto na aula 1.6. Se $$X$$ tem FDA $$F$$ e queremos
amostrar de $$X$$, usamos a função quantil $$F^{-1}$$:

$$
\boxed{
U\sim\text{Uniforme}(0,1)\ \Longrightarrow\ X=F^{-1}(U)\ \text{tem FDA }F.
}
$$

Basta uma uniforme por amostra. Exemplos:

- **Exponencial$$(\lambda)$$**: $$F(x)=1-e^{-\lambda x}$$, logo
  $$X=-\frac{1}{\lambda}\log(1-U)$$ (ou $$-\frac{1}{\lambda}\log U$$, já que
  $$1-U$$ também é uniforme);
- **Discreta**: $$X=x_k$$ quando
  $$\sum_{j<k}p_j\le U<\sum_{j\le k}p_j$$.

A limitação é precisar de $$F^{-1}$$ em forma fechada ou numérica; para a
normal, por exemplo, $$F^{-1}$$ não é elementar.

## Método da aceitação-rejeição

Serve para qualquer densidade $$f$$ da qual sabemos avaliar o valor, mesmo sem
$$F^{-1}$$. Escolhe-se uma densidade **proposta** $$g$$, fácil de amostrar, e
uma constante $$M$$ tal que $$f(x)\le M\,g(x)$$ para todo $$x$$. O algoritmo:

1. amostrar $$Y$$ de $$g$$ e $$U$$ de $$\text{Uniforme}(0,1)$$;
2. se $$U\le\dfrac{f(Y)}{M\,g(Y)}$$, aceitar $$X=Y$$; caso contrário, repetir.

As amostras aceitas têm exatamente a densidade $$f$$. A probabilidade de
aceitação é $$1/M$$, então quanto mais $$g$$ "envelopa" $$f$$ de perto, mais
eficiente é o método.

## Transformação de Box-Muller

Um truque específico para a normal. Se $$U_1,U_2$$ são uniformes
independentes, então

$$
Z_1=\sqrt{-2\log U_1}\,\cos(2\pi U_2),
\qquad
Z_2=\sqrt{-2\log U_1}\,\operatorname{sen}(2\pi U_2)
$$

são duas $$\mathcal{N}(0,1)$$ independentes. Para obter
$$\mathcal{N}(\mu,\sigma^{2})$$, basta usar $$\mu+\sigma Z$$.

## Vetores e casos derivados

- **Normal multivariada** $$\mathcal{N}(\mu,\Sigma)$$: fatorar
  $$\Sigma=LL^{\top}$$ (decomposição de Cholesky), amostrar
  $$z\sim\mathcal{N}(0,I)$$ e devolver $$x=\mu+Lz$$.
- **Gama, qui-quadrado, $$t$$, $$F$$, Beta**: construídas a partir de somas,
  razões e quadrados de normais e exponenciais, seguindo as relações da aula
  1.9.
- **Amostragem sem reposição** e **permutações aleatórias**: o embaralhamento
  de Fisher-Yates, base dos métodos de reamostragem das próximas aulas.
