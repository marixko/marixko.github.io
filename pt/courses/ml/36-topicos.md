---
title: "8.6 — Tópicos Atuais em Machine Learning"
course: ml
---

## Tópicos atuais em machine learning

Esta aula final é um panorama, sem demonstrações, das direções que dominam a
pesquisa hoje e do que elas significam para o uso científico. Cada um destes
temas é um curso em si.

### Conteúdo

- Modelos generativos
- Modelos de difusão
- Aprendizado auto-supervisionado e de representação
- Modelos de fundação
- Inferência baseada em simulação
- Mudança de distribuição
- Machine learning causal
- Machine learning científico

### Modelos generativos

Aprendem a distribuição $$p(x)$$ ou a amostrar dela. Os autoencoders
variacionais (VAE) otimizam um ELBO com um codificador e um decodificador; as
redes generativas adversariais (GAN) treinam um gerador contra um
discriminador; os *fluxos normalizadores* usam transformações invertíveis para
ter verossimilhança exata; os modelos autorregressivos fatoram
$$p(x)=\prod_t p(x_t\mid x_{<t})$$.

### Modelos de difusão

O estado da arte em geração de imagens. Um processo direto adiciona ruído
gaussiano aos dados em muitos passos; a rede aprende a **reverter** esse
processo, o que equivale a estimar o **escore** $$\nabla_x\log p(x)$$. Em
ciência começam a ser usados como *priors* aprendidos para problemas inversos e
como emuladores.

### Aprendizado auto-supervisionado e de representação

Aprender representações úteis a partir de dados **não rotulados**, resolvendo
tarefas-pretexto: prever partes mascaradas da entrada, ou aproximar
representações de duas visões do mesmo objeto e afastar as de objetos
diferentes (aprendizado contrastivo). As representações resultantes transferem
bem para tarefas com poucos rótulos.

### Modelos de fundação

Modelos grandes pré-treinados em dados amplos e depois adaptados a muitas
tarefas por ajuste fino ou por exemplos no contexto. São quase sempre
*transformers* em escala, e o seu comportamento segue **leis de escala** com o
número de parâmetros, de dados e de computação.

### Inferência baseada em simulação

Quando a verossimilhança é implícita, definida por um simulador caro, estima-se
o posterior com estimadores neurais de densidade, de razão ou por computação
bayesiana aproximada. É diretamente relevante para Astronomia e Física, onde os
modelos diretos são simuladores.

### Mudança de distribuição

Quando a distribuição de treino difere da de aplicação (mudança de covariáveis,
de rótulos, ou de conceito ao longo do tempo), o desempenho cai de formas que a
validação padrão não detecta. As respostas incluem reponderação por importância,
adaptação de domínio e treino robusto.

### Machine learning causal

Predição responde $$P(Y\mid X)$$; muitas perguntas científicas e de decisão
exigem $$P\big(Y\mid \operatorname{do}(X)\big)$$, o efeito de **intervir** em
$$X$$. Confundidores fazem as duas quantidades divergirem, e nenhum volume de
dados observacionais corrige isso sem hipóteses causais.

### Machine learning científico

Modelos que respeitam estrutura conhecida: redes informadas por física,
operadores neurais que aprendem soluções de equações diferenciais, emuladores
que substituem simulações caras, e arquiteturas que impõem simetrias e leis de
conservação. É a fronteira onde o aprendizado de máquina encontra o método
científico, e o ponto de chegada natural deste curso.
