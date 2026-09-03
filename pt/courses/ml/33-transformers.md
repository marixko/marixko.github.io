---
title: "8.3 — Attention e Transformers"
course: ml
---

## Attention e transformers

A convolução impõe localidade: cada unidade só enxerga uma vizinhança fixa. O
mecanismo de **atenção** faz o oposto: cada elemento de uma sequência pode
consultar diretamente todos os outros, com pesos aprendidos. O *transformer* é
a arquitetura construída inteiramente sobre essa operação.

### Conteúdo

- Autoatenção
- Codificação posicional
- Atenção com múltiplas cabeças
- Transformers
- Complexidade computacional

### O mecanismo de atenção

A entrada é uma matriz $$X$$ com uma linha por elemento da sequência. Projeta-se
$$X$$ em três papéis, com matrizes aprendidas:

$$
Q=XW_Q,
\qquad
K=XW_K,
\qquad
V=XW_V,
$$

as **consultas**, as **chaves** e os **valores**. A saída é

$$
\operatorname{Attention}(Q,K,V)
=
\operatorname{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V.
$$

### Leitura

O produto $$QK^{\top}$$ mede a similaridade entre cada consulta e cada chave. O
*softmax* por linha transforma essas similaridades em pesos que somam $$1$$, e a
saída de cada posição é a **média ponderada dos vetores de valor**. A divisão
por $$\sqrt{d_k}$$ evita que os argumentos do *softmax* fiquem grandes demais e
saturem o gradiente.

### Autoatenção

Quando $$Q$$, $$K$$ e $$V$$ vêm da **mesma** sequência, temos **autoatenção**:
cada posição atende a todas as outras em um único passo, o que modela
dependências de longo alcance sem a propagação sequencial de uma rede
recorrente nem a janela limitada de uma convolução.

### Codificação posicional

A autoatenção é **equivariante a permutações**: ela não sabe a ordem dos
elementos. Injeta-se a ordem somando à entrada uma **codificação posicional**,
sinusoidal ou aprendida.

### Atenção com múltiplas cabeças

Em vez de uma única atenção, usam-se $$h$$ em paralelo, cada uma em um
subespaço projetado, e concatenam-se as saídas. Cabeças diferentes aprendem a
capturar relações diferentes.

### O bloco transformer

Um bloco combina autoatenção com múltiplas cabeças e uma pequena rede aplicada
posição a posição, cada uma envolvida por uma conexão residual e normalização
de camada. Empilham-se $$L$$ blocos.

### Complexidade computacional

A autoatenção compara todos os pares de posições, então o custo é
$$O(n^{2}d)$$ no comprimento $$n$$ da sequência. Esse gargalo quadrático motiva
as variantes de atenção esparsa e linear para sequências longas.

Os *transformers* são a espinha dorsal dos modelos de fundação da aula 8.6. Em
Astronomia começam a ser usados para curvas de luz, espectros e dados de
conjunto (nuvens de detecções sem ordem natural).
