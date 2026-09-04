---
title: "5.3 - Redução espectroscópica: calibração em comprimento de onda"
course: astro-obs
---

## Da imagem 2D ao espectro 1D

Um espectro bruto é uma imagem 2D com uma direção de dispersão e uma direção espacial, deformada pela óptica e sem escala de comprimento de onda. A redução extrai um espectro 1D e lhe atribui um eixo $$\lambda$$ confiável.

### Conteúdo

- Assinatura instrumental no 2D
- Traçado do espectro e extração
- Calibração em comprimento de onda
- Verificação com linhas de céu
- Reamostragem e correção baricêntrica
- Distorções geométricas

## Assinatura instrumental no 2D

As primeiras etapas são as da aula 4.1, com um detalhe:

- **Bias e dark**: iguais ao imageamento.
- **Flat espectral**: obtido com uma lâmpada de contínuo (quartzo). Ele corrige a resposta pixel a pixel **e** a modulação suave da eficiência (incluindo a função de blaze das ordens echelle). É preciso **normalizar** o flat pelo seu próprio contínuo suave antes de dividir, para não imprimir a forma espectral da lâmpada no dado nem apagar feições reais.
- **Luz espalhada**: luz que vaza entre as ordens ou ao redor da fenda; ajusta-se uma superfície suave nas regiões sem sinal e subtrai-se.
- **Raios cósmicos**: rejeitados por combinação de exposições ou por algoritmo de perfil.

## Traçado do espectro e extração

O espectro de uma fonte pontual não cai numa linha reta de pixels: ele **serpenteia** ao longo do detector por causa de distorções ópticas. O **traçado** (*trace*) ajusta, com um polinômio de baixo grau, a posição do centro do espectro em função da coluna de dispersão.

A **extração** soma os pixels na direção espacial em torno do traço. Duas formas:

- **Extração simples**: soma dentro de uma janela fixa, subtraindo o céu estimado nas bordas.
- **Extração ótima** (Horne 1986): pesa cada pixel pelo perfil espacial normalizado da fonte e pelo inverso da sua variância. Recupera $$\sim 10$$–$$70\%$$ mais S/N no regime de céu ou de ruído de leitura, e rejeita raios cósmicos residuais pelo desvio ao perfil.

## Calibração em comprimento de onda

Para transformar coluna de pixel em $$\lambda$$:

1. Observa-se uma **lâmpada de arco** (He-Ne-Ar, Th-Ar, Cu-Ar) cujo espectro de emissão tem linhas de comprimento de onda tabelado com alta precisão.
2. Extrai-se o arco com o **mesmo traço** do objeto.
3. Identificam-se as linhas e ajusta-se uma **solução de dispersão** $$\lambda(x)$$, em geral um polinômio de grau 3–5 (ou funções de Chebyshev; em echelle, uma solução 2D em pixel e número de ordem).
4. Avalia-se o **RMS dos resíduos**, que deve ser uma pequena fração do elemento de resolução (tipicamente $$\lesssim 0{,}1$$ pixel).

A solução do arco pode não valer exatamente para o objeto: entre a exposição do arco e a do alvo, o instrumento **flexiona** com a mudança de posição do telescópio e da temperatura, deslocando o espectro por frações de pixel a pixels inteiros. Arcos tomados imediatamente antes e depois do alvo, na mesma posição, minimizam isso.

## Verificação com linhas de céu

As **linhas de emissão do céu** (OH, [OI]) têm comprimento de onda conhecido e estão **no mesmo caminho óptico do objeto**, sem flexão diferencial. Comparar a posição medida dessas linhas com o valor de laboratório dá uma verificação independente do ponto de zero da calibração e permite um pequeno reajuste ($$\lambda$$-*shift*). É o padrão em espectroscopia no vermelho e no IR próximo, e é essencial para velocidades radiais de precisão moderada.

## Reamostragem e correção baricêntrica

Para combinar espectros ou compará-los com modelos costuma-se **reamostrar** o espectro para uma grade de $$\lambda$$ regular (linear ou logarítmica). Cada reamostragem **correlaciona** o ruído entre pixels vizinhos e degrada levemente a resolução; deve ser feita **uma vez só**, no fim, e com conservação de fluxo. Muitos códigos de análise preferem trabalhar na grade nativa e levar a solução $$\lambda(x)$$ junto.

A **correção baricêntrica** remove a componente da velocidade do observador (rotação da Terra $$\lesssim 0{,}5\ \text{km/s}$$, translação $$\lesssim 30\ \text{km/s}$$) projetada na linha de visada do alvo, no instante da observação:

$$
\lambda_\text{repouso} = \lambda_\text{obs}\left(1 - \frac{v_\text{bar}}{c}\right).
$$

Sem ela, a velocidade radial medida varia ao longo do ano por dezenas de km/s.

## Distorções geométricas

Além do traço curvo, o 2D tem duas deformações que importam:

- **Distorção S** (ou *S-distortion*): a direção espacial não é exatamente perpendicular à de dispersão; uma fonte estendida aparece inclinada.
- **Inclinação das linhas** (*tilt*): as linhas de igual $$\lambda$$ não são colunas verticais, mas ligeiramente inclinadas, e a inclinação varia ao longo do espectro.

Ignorar a inclinação das linhas degrada a resolução ao extrair fontes estendidas e estraga a subtração de céu. A redução moderna ajusta um mapa 2D completo $$\lambda(x,y)$$ a partir do arco e das linhas de céu, e faz a extração nesse referencial.
