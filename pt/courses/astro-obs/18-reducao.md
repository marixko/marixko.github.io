---
title: "4.1 - Redução de imagens: bias, dark e flat-field"
course: astro-obs
---

## Removendo a assinatura do instrumento

Uma imagem bruta não é o céu: é o céu multiplicado e somado por uma série de padrões do detector. A redução é o processo de desfazer essas operações na ordem certa, para chegar a uma imagem em unidades proporcionais aos fótons que chegaram.

### Conteúdo

- O modelo da imagem bruta
- Bias e overscan
- Corrente de escuro
- Flat-field
- Correção de fringe e máscara de defeitos
- Combinação de calibrações e ordem das operações

## O modelo da imagem bruta

Cada pixel $$(x,y)$$ de uma exposição de duração $$t$$ é, aproximadamente,

$$
I_\text{bruta}(x,y) = B(x,y) + D(x,y)\,t + F(x,y)\,\big[\,S_\text{céu}(x,y) + S_\text{fonte}(x,y)\,\big]\,t + \text{raios cósmicos},
$$

onde $$B$$ é o nível de bias (aditivo, independente do tempo), $$D$$ é a taxa de corrente de escuro por pixel, e $$F$$ é o **campo de resposta plana** (*flat-field*): um mapa multiplicativo da sensibilidade relativa de cada pixel, que reúne variações de QE pixel a pixel, vinhetação, poeira na óptica e padrão de iluminação. Resolver para $$S_\text{fonte}$$ é a redução.

## Bias e overscan

O **bias** é medido de duas formas complementares:

- **Bias frames**: exposições de duração zero com o obturador fechado. Combinam-se dezenas delas (mediana ou média com rejeição de outliers) em um **master bias**, que se subtrai de tudo.
- **Overscan**: colunas (ou linhas) virtuais lidas além da área fotossensível, que registram só o nível eletrônico. Servem para acompanhar **deriva** do bias ao longo da noite, ajustando um valor (ou um polinômio de baixo grau) por linha.

Na prática usam-se os dois: overscan para o nível global de cada frame, master bias para a estrutura bidimensional fina.

## Corrente de escuro

CCDs bem resfriados têm corrente de escuro desprezível em exposições de poucos minutos, e muitos pipelines a ignoram. Quando importa (arrays IR, exposições longas, chips quentes), mede-se com **dark frames**: exposições longas com o obturador fechado, já sem bias, combinadas em um **master dark**. Como a corrente de escuro é linear no tempo, o master dark é **escalado** para a duração de cada ciência antes de subtrair. Pixels quentes que variam de forma não linear são melhor tratados por máscara.

## Flat-field

O passo mais delicado. Precisa-se de uma imagem de um campo **uniformemente iluminado** para mapear $$F(x,y)$$. As opções:

- **Dome flat**: tela branca dentro da cúpula, iluminada por lâmpadas. Alto S/N, repetível, mas a distribuição espectral e angular da luz não é a do céu, o que deixa um erro de iluminação em larga escala.
- **Twilight flat**: o céu crepuscular, quase uniforme. Espectro mais próximo do céu noturno, mas a janela de brilho adequado dura minutos e o gradiente do céu precisa ser removido.
- **Sky flat** (*superflat*): a mediana de muitas imagens de ciência da noite, com as fontes mascaradas. Reproduz exatamente a iluminação real, mas exige muitos campos esparsos e limpos.

Uma estratégia comum: dome ou twilight para a estrutura de pequena escala (pixel a pixel, poeira), e um superflat ou uma **correção de iluminação** para o gradiente de larga escala. O master flat é normalizado pela sua mediana (fica em torno de 1), e a ciência (já sem bias e dark) é **dividida** por ele.

## Correção de fringe e máscara de defeitos

- **Fringe**: no vermelho e no IR próximo, linhas de emissão do céu interferem no substrato do chip e produzem um padrão ondulado que **não** escala com o flat (depende da intensidade das linhas, que varia). Constrói-se um **fringe frame** a partir de imagens de ciência (mediana, fontes mascaradas, contínuo removido) e subtrai-se um múltiplo ajustado dele.
- **Máscara de pixels ruins**: mapa estático de pixels quentes, mortos, colunas com carga presa e regiões vinhetadas, propagado por toda a redução para que esses pixels sejam ignorados, não corrigidos.
- **Raios cósmicos**: removidos por combinação de várias exposições (rejeição de outliers) ou, em imagem única, por algoritmos que exploram a assimetria do perfil (`L.A.Cosmic`).

## Combinação de calibrações e ordem das operações

Cada frame de calibração é combinado a partir de muitos individuais, com **rejeição de outliers** (*sigma-clipping* ou mediana) para eliminar raios cósmicos e variações. Mais frames, menos ruído injetado na ciência.

A **ordem** correta:

1. Subtrair overscan e master bias.
2. Subtrair master dark escalado (se aplicável).
3. Dividir pelo master flat normalizado.
4. Subtrair fringe (se aplicável).
5. Aplicar máscara de defeitos e rejeitar raios cósmicos.
6. Multiplicar pelo ganho para converter ADU em $$e^-$$, e dividir por $$t$$ se quiser $$e^-/\text{s}$$.

Erros comuns: fazer o flat antes do bias (o bias não é multiplicativo), usar flats de outra noite quando a poeira se moveu, e normalizar o flat por um valor que não seja robusto a fontes residuais.
