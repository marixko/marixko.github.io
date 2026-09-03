---
title: "8.3 - Attention and Transformers"
course: ml
---

## Attention and transformers

Convolution imposes locality: each unit only sees a fixed neighborhood. The
**attention** mechanism does the opposite: each element of a sequence can query
all the others directly, with learned weights. The *transformer* is the
architecture built entirely on that operation.

### Contents

- Self-attention
- Positional encoding
- Multi-head attention
- Transformers
- Computational complexity

### The attention mechanism

The input is a matrix $$X$$ with one row per sequence element. $$X$$ is
projected into three roles, with learned matrices:

$$
Q=XW_Q,
\qquad
K=XW_K,
\qquad
V=XW_V,
$$

the **queries**, the **keys** and the **values**. The output is

$$
\operatorname{Attention}(Q,K,V)
=
\operatorname{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V.
$$

### Reading

The product $$QK^{\top}$$ measures the similarity between each query and each
key. The row-wise *softmax* turns those similarities into weights that sum to
$$1$$, and the output at each position is the **weighted average of the value
vectors**. Dividing by $$\sqrt{d_k}$$ keeps the *softmax* arguments from growing
too large and saturating the gradient.

### Self-attention

When $$Q$$, $$K$$ and $$V$$ come from the **same** sequence, we have
**self-attention**: each position attends to all the others in a single step,
which models long-range dependencies without the sequential propagation of a
recurrent network or the limited window of a convolution.

### Positional encoding

Self-attention is **equivariant to permutations**: it does not know the order of
the elements. The order is injected by adding a **positional encoding** to the
input, sinusoidal or learned.

### Multi-head attention

Instead of a single attention, $$h$$ are used in parallel, each in a projected
subspace, and the outputs are concatenated. Different heads learn to capture
different relations.

### The transformer block

A block combines multi-head self-attention with a small network applied
position by position, each wrapped by a residual connection and layer
normalization. $$L$$ blocks are stacked.

### Computational complexity

Self-attention compares all pairs of positions, so the cost is $$O(n^{2}d)$$ in
the sequence length $$n$$. This quadratic bottleneck motivates the sparse and
linear attention variants for long sequences.

*Transformers* are the backbone of the foundation models of lecture 8.6. In
Astronomy they are starting to be used for light curves, spectra and set data
(clouds of detections with no natural order).
