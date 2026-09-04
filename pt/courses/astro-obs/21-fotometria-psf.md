---
title: "4.4 - Fotometria de PSF e campos densos"
course: astro-obs
---

## Quando as estrelas se sobrepõem

Em um aglomerado globular, no bojo galáctico ou no centro de uma galáxia próxima, as aberturas de fontes vizinhas se superpõem e a fotometria de abertura falha. A solução é ajustar um **modelo da PSF** a todas as fontes ao mesmo tempo, separando as contribuições de cada uma.

### Conteúdo

- O princípio do ajuste de PSF
- Construção do modelo de PSF
- O laço de detecção, ajuste e subtração
- Vantagens e dificuldades
- Testes de estrelas artificiais
- Imagem de diferença

## O princípio do ajuste de PSF

Toda estrela do campo tem a **mesma forma** (a PSF), diferindo apenas em **posição** e **brilho**. Escreve-se a imagem como

$$
I(x,y) = \sum_{k} f_k \, \mathrm{PSF}(x - x_k,\, y - y_k) + b(x,y) + \text{ruído},
$$

e ajustam-se os parâmetros $$\{f_k, x_k, y_k\}$$ de todas as fontes (ou de grupos de fontes que se sobrepõem) minimizando o $$\chi^2$$ ponderado pelo ruído de cada pixel. Como o ajuste usa o perfil inteiro e pesa cada pixel pelo seu S/N, é **estatisticamente ótimo** e chega a limites mais fracos que a abertura.

## Construção do modelo de PSF

O modelo vem do próprio campo:

1. Selecionam-se **estrelas brilhantes, isoladas e não saturadas**, distribuídas pelo detector.
2. Ajusta-se um perfil analítico (gaussiana, Moffat, Penny) como primeira aproximação.
3. Guardam-se os **resíduos** (PSF real menos modelo analítico) em uma tabela (*lookup table*) que corrige as asas e as assimetrias.
4. Permite-se que a PSF **varie com a posição** no detector, ajustando os parâmetros e a tabela de resíduos como polinômios de baixo grau em $$(x,y)$$.

Códigos clássicos: **DAOPHOT/ALLSTAR** (Stetson), **DOLPHOT/HSTphot** (para o HST), e implementações modernas em `photutils` e `crowdsource`.

## O laço de detecção, ajuste e subtração

O procedimento é iterativo:

1. Detectar as fontes mais brilhantes.
2. Ajustar a PSF a elas (em grupos, para as que se sobrepõem).
3. **Subtrair** o modelo ajustado da imagem.
4. Rodar a detecção de novo na imagem subtraída: fontes fracas antes escondidas nas asas das brilhantes aparecem.
5. Repetir, adicionando fontes, até que a imagem residual seja compatível com ruído.

O resultado é um catálogo com posição, fluxo e incerteza de cada estrela, e uma imagem residual que serve de diagnóstico (halos, *deblending* mal feito e PSF errada aparecem nela).

## Vantagens e dificuldades

**Vantagens**: separa fontes misturadas, pesa cada pixel de forma ótima, alcança magnitudes mais fracas, e dá centroides melhores.

**Dificuldades**:

- **Erro no modelo de PSF** propaga direto para os fluxos; a PSF varia com posição, tempo, cor e desfoco.
- **Viés de aglomeração** (*crowding bias*): fontes não detectadas sob uma estrela medida somam luz e a deixam mais brilhante; o efeito é sistemático e depende da densidade.
- **Completeza**: perto do limite, uma fração das fontes não é detectada, e essa fração depende do brilho e do local.
- **Determinação do céu**: em campos muito densos quase não há "céu" livre de estrelas; erros aqui deslocam toda a fotometria.

## Testes de estrelas artificiais

A forma padrão de **calibrar erros e completeza** em campos densos é injetar **estrelas artificiais** (cópias da PSF, de magnitude e posição conhecidas) na imagem real, rodar todo o pipeline de detecção e fotometria, e comparar a saída com a entrada:

- a **fração recuperada** em função da magnitude é a curva de completeza;
- a diferença entre magnitude medida e injetada dá o **erro fotométrico real** (em geral maior que o erro formal) e o **viés** (fontes fracas tendem a ser medidas brilhantes demais).

Sem esse teste, uma função de luminosidade ou um diagrama cor-magnitude profundo não é interpretável.

## Imagem de diferença

Para medir fontes **variáveis** sobre um fundo complicado (microlente no bojo, supernovas em galáxias, variáveis em campos densos), usa-se a **fotometria de imagem de diferença**: constrói-se uma imagem de referência de alto S/N, degrada-se a PSF de cada nova imagem (ou da referência) para casar as duas com um núcleo de convolução, subtrai-se, e mede-se o fluxo **residual**, que é diretamente a variação de brilho. Algoritmos: Alard & Lupton (ISIS/HOTPANTS) e ZOGY. É a técnica que viabiliza os levantamentos de transientes e as curvas de luz de exoplanetas em campos ricos.
