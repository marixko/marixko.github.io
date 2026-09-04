---
title: "3.3 - O detector CCD: funcionamento"
course: astro-obs
---

## O detector que dominou a astronomia óptica

Desde os anos 1980, quase toda observação no óptico usa um **CCD** (*charge-coupled device*): um retângulo de silício que converte fótons em cargas, acumula essas cargas em uma grade de pixels e depois as transfere, uma a uma, para um amplificador de leitura. Entender o CCD é entender de onde vêm o sinal e o ruído dos dados.

### Conteúdo

- Do fóton ao elétron
- Coleta e transferência de carga
- Leitura, ganho e faixa dinâmica
- Nível de bias e corrente de escuro
- Eficiência quântica
- Defeitos e artefatos
- Modos de leitura

## Do fóton ao elétron

Um fóton com energia acima do *gap* do silício ($$\approx 1{,}1\ \text{eV}$$, ou seja, $$\lambda \lesssim 1{,}1\ \mu\text{m}$$) é absorvido e libera um par elétron-buraco. Um campo elétrico aplicado (a **zona de depleção**) separa as cargas e mantém os elétrons presos em um poço de potencial local, definido pela estrutura de eletrodos. Cada poço é um **pixel**. Durante a exposição, cada pixel acumula um número de elétrons proporcional ao número de fótons que o atingiram, multiplicado pela eficiência quântica.

## Coleta e transferência de carga

Terminada a exposição, os eletrodos são "clockados" em sequência, e os pacotes de carga marcham como um balde passando de mão em mão: linha a linha em direção ao registrador serial, e ao longo dele até o amplificador. A fração de carga entregue sem perda em cada transferência é a **eficiência de transferência de carga** (CTE); precisa ser $$> 0{,}99999$$, porque uma carga do canto oposto passa por milhares de transferências. CTE degradada (por dano de radiação no espaço, por exemplo) deixa um rastro de carga atrás das fontes brilhantes.

## Leitura, ganho e faixa dinâmica

O amplificador converte a carga de cada pixel em uma tensão, digitalizada por um conversor A/D em contagens (**ADU** ou *counts*). O **ganho** $$g$$ é o fator de conversão:

$$
N_{e^-} = g \times N_\text{ADU}, \qquad g \ \text{em}\ e^-/\text{ADU}.
$$

O ganho é escolhido para que o **poço cheio** (*full well*, $$\sim 10^5\ e^-$$) caiba na faixa do A/D (por exemplo 16 bits, $$65\,535$$ ADU). A **faixa dinâmica** é a razão entre o poço cheio e o ruído de leitura, tipicamente $$10^4$$–$$10^5$$. Acima do poço cheio o pixel **satura** e a resposta deixa de ser linear; a carga excedente vaza para os vizinhos ao longo da coluna (*blooming*).

## Nível de bias e corrente de escuro

Mesmo sem luz e com exposição zero, a leitura devolve um valor positivo, o **nível de bias**, um *pedestal* eletrônico que garante contagens não negativas. Estima-se com exposições de duração zero (*bias frames*) ou com a região de *overscan* (pixels lidos além da área fotossensível).

A agitação térmica também gera elétrons espúrios, a **corrente de escuro**, que se acumula linearmente com o tempo e depende exponencialmente da temperatura:

$$
N_D \propto T^{3/2}\, e^{-E_g/2kT}.
$$

Por isso os CCDs são resfriados a $$-100\ ^\circ\text{C}$$ a $$-120\ ^\circ\text{C}$$ (nitrogênio líquido ou refrigeradores criogênicos), reduzindo a corrente de escuro a poucos $$e^-$$ por pixel por hora, muitas vezes desprezível frente ao céu.

## Eficiência quântica

A **eficiência quântica** (QE) é a fração de fótons incidentes que produzem um elétron detectado. CCDs modernos, iluminados por trás (*back-illuminated*) e afinados, atingem QE $$> 90\%$$ entre $$0{,}5$$ e $$0{,}8\ \mu\text{m}$$, caindo no azul (absorção nas camadas superficiais) e no vermelho (o silício fica transparente). Chips espessos e dopados (*deep-depletion*) estendem a resposta para o vermelho ao custo de mais raios cósmicos. Comparado à emulsão fotográfica (QE $$\sim 1\%$$), o CCD foi um ganho de quase duas ordens de grandeza.

## Defeitos e artefatos

- **Pixels e colunas ruins**: pixels quentes (corrente de escuro alta), pixels mortos, colunas com carga presa. Mapeados e mascarados.
- **Raios cósmicos**: partículas que depositam carga em poucos pixels, deixando picos agudos e assimétricos. Removidos por combinação de várias exposições ou por algoritmos de rejeição (*L.A.Cosmic*).
- **Fringing**: interferência de linhas de emissão do céu no substrato fino do chip, gerando um padrão ondulado no vermelho e no IR próximo. Removido com um *mapa de fringe*.
- **Não linearidade**: perto do poço cheio a resposta se curva; caracteriza-se com uma sequência de *flats* de exposições crescentes.
- **Efeito de obturador**: obturadores mecânicos iluminam o centro por mais tempo que as bordas em exposições curtas, criando um gradiente que precisa ser mapeado.

## Modos de leitura

- **Binning**: somar $$k\times k$$ pixels no próprio chip antes de ler. Reduz o ruído de leitura por elemento e acelera a leitura, ao custo de resolução. Útil para fontes fracas subamostradas.
- **Windowing / região de interesse**: ler apenas parte do chip, para cadência rápida.
- **Frame transfer**: metade do chip é blindada; a imagem é deslocada para lá em milissegundos e lida enquanto a próxima exposição já começa, eliminando o tempo morto.
- **Drift scan / TDI**: clockar o chip na mesma taxa em que o céu se move, varrendo uma faixa contínua (usado em levantamentos como o SDSS original).
