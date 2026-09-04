---
title: "2.5 - Extinção e avermelhamento interestelar"
course: astro-obs
---

## A poeira entre nós e a fonte

Entre a fonte e o telescópio há gás e grãos de poeira que absorvem e espalham a luz. O efeito é seletivo em comprimento de onda: enfraquece mais o azul que o vermelho, então avermelha os objetos além de apagá-los. Corrigir isso é pré-requisito para quase qualquer análise fotométrica ou espectroscópica.

### Conteúdo

- Extinção total e a lei de extinção
- Avermelhamento e o excesso de cor
- A razão $$R_V$$
- Curvas de extinção
- Mapas de poeira e extinção 3D
- Procedimento de correção

## Extinção total e a lei de extinção

A poeira remove fótons da linha de visada, tanto por absorção quanto por espalhamento para fora do feixe. Em magnitudes, a atenuação na banda de comprimento de onda $$\lambda$$ é

$$
A_\lambda = m_\lambda^\text{obs} - m_\lambda^\text{intrínseco} = 2{,}5\,\log_{10}\!\left(\frac{F_\lambda^\text{intrínseco}}{F_\lambda^\text{obs}}\right) \ge 0.
$$

A dependência de $$A_\lambda$$ com $$\lambda$$ é a **lei (ou curva) de extinção**. Costuma-se normalizá-la pela extinção na banda $$V$$, $$A_\lambda/A_V$$, uma função que é razoavelmente universal na Galáxia, com variações associadas ao ambiente (denso versus difuso).

## Avermelhamento e o excesso de cor

Como a extinção é maior no azul, uma cor observada fica mais vermelha que a intrínseca. O **excesso de cor** quantifica isso:

$$
E(B-V) = (B-V)_\text{obs} - (B-V)_0 = A_B - A_V.
$$

O excesso é o que se mede diretamente (comparando a cor observada com a cor esperada para o tipo espectral), e é proporcional à coluna de poeira. Analogamente se definem $$E(V-I)$$, $$E(J-K)$$, etc., todos ligados entre si pela forma da curva de extinção.

## A razão $$R_V$$

O parâmetro que conecta o avermelhamento (mensurável) à extinção total (o que se quer) é

$$
R_V \equiv \frac{A_V}{E(B-V)}.
$$

Para o meio interestelar difuso da Galáxia, $$R_V \approx 3{,}1$$. Regiões densas, com grãos maiores, têm $$R_V$$ até $$\sim 5$$–$$6$$; a curva fica mais "cinza". Uma vez adotado $$R_V$$, toda a curva $$A_\lambda/A_V$$ fica determinada e $$A_V = R_V\,E(B-V)$$.

## Curvas de extinção

Características da curva galáctica média:

- **Infravermelho** ($$\lambda \gtrsim 1\ \mu\text{m}$$): $$A_\lambda \propto \lambda^{-\alpha}$$ com $$\alpha\approx 1{,}6$$–$$2$$, extinção baixa. Por isso o infravermelho "atravessa" a poeira: $$A_K \approx 0{,}11\,A_V$$.
- **Óptico-UV próximo**: subida suave e quase linear em $$1/\lambda$$.
- **Bump de 2175 \AA**: uma ampla feição de absorção no UV, atribuída a grãos carbonáceos, presente na Via Láctea e ausente ou fraca na Pequena Nuvem de Magalhães.
- **UV distante**: nova subida acentuada.

Parametrizações de uso corrente: Cardelli, Clayton & Mathis (CCM, 1989), Fitzpatrick (1999) e, mais recentemente, Fitzpatrick et al. (2019) e Gordon et al. (2023). Todas dão $$A_\lambda/A_V$$ como função de $$\lambda$$ e de $$R_V$$.

## Mapas de poeira e extinção 3D

Para uma fonte **fora** da Galáxia, a linha de visada atravessa toda a poeira do disco, e usa-se um **mapa 2D** da extinção galáctica em função de $$(l,b)$$: o clássico de Schlegel, Finkbeiner & Davis (SFD, 1998), baseado na emissão térmica da poeira em $$100\ \mu\text{m}$$, e recalibrações posteriores (Schlafly & Finkbeiner 2011). Esses mapas dão $$E(B-V)$$ integrado.

Para uma fonte **dentro** da Galáxia, só interessa a poeira **até a distância** da fonte. Mapas **3D** modernos (Bayestar/Pan-STARRS, `dustmaps`, Gaia + fotometria) fornecem $$E(B-V)$$ em função de $$(l,b,d)$$, construídos ajustando simultaneamente distância e avermelhamento de milhões de estrelas.

## Procedimento de correção

Para desavermelhar uma fotometria:

1. Estimar $$E(B-V)$$ na linha de visada: mapa 2D (extragaláctico) ou 3D (galáctico), ou o próprio excesso de cor se o tipo espectral for conhecido.
2. Adotar $$R_V$$ (3,1 salvo indicação em contrário) e uma parametrização da curva.
3. Calcular $$A_\lambda = \big(A_\lambda/A_V\big)\,R_V\,E(B-V)$$ para cada banda, idealmente com fotometria sintética que leve em conta a largura do filtro e o espectro da fonte (o $$A_\lambda$$ efetivo de uma banda larga depende ligeiramente da cor).
4. Subtrair: $$m_\lambda^0 = m_\lambda^\text{obs} - A_\lambda$$.

Erros comuns: aplicar o mapa SFD inteiro a uma estrela próxima (superextinção), esquecer a extinção em estudos de baixa latitude galáctica, e ignorar a poeira **interna** à galáxia-alvo, que é dependente de inclinação e muito mais incerta que a galáctica.
