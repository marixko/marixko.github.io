---
title: "3.1 - Telescópios: óptica, configurações e aberrações"
course: astro-obs
---

## O que um telescópio faz

Um telescópio tem duas funções: **coletar** luz (quanto maior a abertura, mais fótons) e **formar uma imagem** com o máximo de detalhe possível. Esta aula trata da óptica que realiza essas duas tarefas e dos defeitos que a limitam.

### Conteúdo

- Refratores e refletores
- Configurações ópticas
- Superfícies e distância focal
- Aberrações
- Limite de difração
- Óptica ativa e espelhos segmentados

## Refratores e refletores

Os primeiros telescópios usavam lentes (**refratores**). Lentes sofrem de **aberração cromática** (o índice de refração depende de $$\lambda$$, então cada cor foca num plano diferente), pesam muito, absorvem no UV e no IR, e só podem ser sustentadas pela borda. Acima de $$\sim 1\ \text{m}$$ tornam-se inviáveis: o maior refrator de pesquisa, o de Yerkes, tem $$1{,}02\ \text{m}$$ e é de 1897.

Todos os grandes telescópios modernos são **refletores**: um espelho côncavo não tem cromatismo, pode ser sustentado por trás e revestido com uma fina camada de alumínio ou prata. O desafio passa a ser mecânico e térmico: manter a forma de uma superfície de dezenas de metros quadrados com precisão de frações do comprimento de onda.

## Configurações ópticas

- **Foco primário** (*prime focus*): o detector fica no ponto focal do primário. Campo grande, mas o instrumento obstrui a abertura e o acesso é difícil. Usado em câmeras de levantamento.
- **Newtoniano**: um espelho plano a $$45^\circ$$ leva o foco para a lateral. Comum em telescópios amadores e pequenos.
- **Cassegrain**: um secundário convexo devolve a luz por um furo no primário, para trás. Compacto, com longa distância focal efetiva numa estrutura curta. É a base da maioria dos telescópios profissionais.
- **Ritchey-Chrétien**: variante do Cassegrain com primário e secundário **hiperbólicos**, que elimina a coma e dá um campo plano e nítido bem maior. É a configuração do HST, do VLT e de quase todos os telescópios de 4–10 m.
- **Nasmyth** e **coudé**: espelhos adicionais levam o foco para uma plataforma fixa na lateral da montagem (Nasmyth) ou para uma sala imóvel (coudé), permitindo instrumentos grandes e pesados que não podem se mover com o telescópio, como espectrógrafos de alta resolução.

## Superfícies e distância focal

Um espelho **esférico** é fácil de fabricar mas sofre de aberração esférica: raios que batem em zonas diferentes focam em pontos diferentes. Um **paraboloide** foca perfeitamente raios paralelos vindos do eixo, mas piora rápido fora do eixo. As configurações de dois espelhos escolhem pares de cônicas (parábola + hipérbole no Cassegrain clássico, hipérbole + hipérbole no RC) para corrigir mais de uma aberração ao mesmo tempo.

A **distância focal** $$f$$ do sistema determina o tamanho da imagem: dois pontos separados por um ângulo $$\theta$$ no céu ficam separados por $$f\theta$$ no plano focal. A razão $$f/D$$ (**razão focal**) governa a rapidez do sistema e o tamanho do campo, tema da próxima aula.

## Aberrações

Defeitos da imagem que sobram depois da difração, todos crescentes fora do eixo (exceto a esférica):

- **Aberração esférica**: superfície com curvatura errada; borra a imagem toda de forma simétrica.
- **Coma**: estrelas fora do eixo viram pequenos "cometas" apontando para fora do campo. É a aberração dominante do Cassegrain clássico e a razão do RC.
- **Astigmatismo**: o foco tangencial e o sagital não coincidem; a estrela vira um traço que gira 90° ao desfocar.
- **Curvatura de campo**: a superfície de melhor foco é curva, não plana; as bordas do detector ficam desfocadas. Corrige-se com uma lente de campo ou curvando o detector.
- **Distorção**: a escala de placa varia com a posição no campo; não borra, mas desloca, e precisa entrar na solução astrométrica.
- **Cromática**: só em elementos refrativos (corretores, ADC, janelas do dewar).

Placas ou lentes **corretoras** (Schmidt, Wynne) ampliam o campo utilizável de foco primário de poucos minutos para mais de um grau.

## Limite de difração

Mesmo perfeito, um telescópio de abertura circular $$D$$ espalha a luz de um ponto no **padrão de Airy**, com o primeiro anel escuro em

$$
\theta = 1{,}22\,\frac{\lambda}{D} \quad (\text{critério de Rayleigh}).
$$

Para $$\lambda = 550\ \text{nm}$$: $$0{,}14''$$ num telescópio de $$1\ \text{m}$$, $$0{,}014''$$ em $$10\ \text{m}$$. Do solo, sem óptica adaptativa, o *seeing* domina e essa resolução não é atingida (aula 1.6). A **obstrução central** do secundário reduz um pouco o pico e joga energia para os anéis, degradando o contraste em imagens de alto dinâmico (companheiras fracas).

## Óptica ativa e espelhos segmentados

Espelhos monolíticos acima de $$\sim 8\ \text{m}$$ envergam sob o próprio peso. As soluções:

- **Óptica ativa**: o primário é fino e flexível, apoiado sobre centenas de atuadores que corrigem, em escala de segundos a minutos, as deformações por gravidade e temperatura, guiados por um sensor de frente de onda que mede uma estrela do campo. Não confundir com óptica **adaptativa**, que corrige a atmosfera em milissegundos.
- **Espelhos segmentados**: o primário é um mosaico de dezenas a centenas de segmentos hexagonais (Keck, GTC, e os futuros ELT e TMT), cada um com atuadores de posição controlados em tempo real para manter os segmentos coplanares com precisão nanométrica.
