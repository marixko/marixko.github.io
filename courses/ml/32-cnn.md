---
title: "8.2 - Convolutional Neural Networks"
course: ml
---

## Convolutional neural networks

A dense layer treats each *pixel* as an independent *feature*, which ignores the
spatial structure of the image and wastes too many parameters. The convolutional
network (CNN) replaces the full-matrix multiplication by a **convolution** with a
small filter, embedding two assumptions about natural signals: locality and
translation invariance.

### Contents

- Convolution
- Translation equivariance
- Parameter sharing
- Receptive fields
- Pooling
- CNNs as mathematical operators

### Convolution

The convolution of two functions is

$$
(f*g)(x)=\int f(\tau)\,g(x-\tau)\,d\tau,
$$

and its discrete version slides a **filter** (the *kernel*) over the signal,
computing at each position a weighted sum of the neighborhood. In a CNN, the
filter weights are learned.

### Parameter sharing

The same filter is applied at **all** positions of the input. A $$3\times 3$$
filter has $$9$$ weights, regardless of the image size, against the millions of
an equivalent dense layer. Fewer parameters means less variance and an inductive
bias suited to the problem.

### Translation equivariance

Convolution is **equivariant to translations**: shifting the input shifts the
output in the same way,

$$
T_s(f*g)=(T_sf)*g.
$$

A pattern learned in one corner of the image is recognized in any other. The
*pooling* operation, combined with depth, adds approximate **invariance**: the
response comes to depend little on the exact position of the pattern.

### Receptive fields and pooling

The **receptive field** of a unit is the region of the input that influences it.
It starts small (the size of the filter) and grows with depth, as successive
layers combine neighborhoods. *Pooling* (max or average) reduces the resolution,
which increases the receptive field, gives local invariance and lowers the cost.

### CNNs as mathematical operators

Each convolutional layer is a **linear, translation-equivariant** operator
followed by a pointwise nonlinearity. It is the same structure as the dense
layers (linear plus activation), with the matrix restricted to the class of
those that represent convolutions. Common variations: convolution with a stride
larger than $$1$$, dilated convolution (larger receptive field with no more
weights), $$1\times 1$$ convolution (channel mixing), residual connections and
batch normalization.

### Use

CNNs are the standard for data with grid structure and approximate
stationarity: images (galaxy morphology, deblending of overlapping sources, lens
detection), one-dimensional spectra and time series. The gain comes less from
capacity and more from the right **inductive bias** for the type of signal.
