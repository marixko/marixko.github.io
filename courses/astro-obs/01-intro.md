---
title: "1.1 - Introduction to observational astronomy"
course: astro-obs
---

## What observational astronomy is

Almost everything we know about the Universe reached us as **light**, or, more recently, as a handful of cosmic rays, neutrinos and gravitational waves. Observational astronomy is the discipline that deals with how to collect that information, what it contains and how to turn it into numbers with controlled uncertainty. This lecture fixes the vocabulary and the structure of the course.

### Contents

- The information carried by light
- The signal chain
- From photon to number
- Observing from the ground and from space
- References and course organization

## The information carried by light

A beam of light reaching a detector carries, in principle, five kinds of information:

- **Direction**: where the photon comes from. It sets the position of the source on the sky and, with an imaging instrument, the spatial structure of the object.
- **Energy**: the wavelength $$\lambda$$ (or the frequency $$\nu=c/\lambda$$, or the energy $$E=h\nu$$). The distribution of received energy as a function of $$\lambda$$ is the **spectrum**, from which come temperature, chemical composition, density, velocity field and redshift.
- **Intensity**: how many photons per second, per unit area, per unit band. This is what **photometry** measures and what is converted into flux and luminosity.
- **Polarization**: the orientation of the electric field. It reveals magnetic fields, scattering and unresolved geometry.
- **Time of arrival**: how the signal varies. This is the domain of **time-series astronomy**: pulsars, eclipsing binaries, supernovae, transits, counterparts of transient events.

No instrument measures everything at once. Each observing technique is a choice about which of these axes to favor and which to sacrifice. A wide-field camera trades spectral resolution for area; a high-resolution spectrograph trades photons for detail in $$\lambda$$.

## The signal chain

The signal that gets recorded is the result of a sequence of transformations, each with its own transfer function and its own noise source:

$$
\text{source} \;\rightarrow\; \text{interstellar medium} \;\rightarrow\; \text{atmosphere} \;\rightarrow\; \text{telescope} \;\rightarrow\; \text{instrument} \;\rightarrow\; \text{detector} \;\rightarrow\; \text{raw data}.
$$

- The **source** emits a spectrum that is what we want to recover.
- The **interstellar medium** (and the intergalactic one) absorbs, reddens and shifts the lines.
- The **atmosphere** absorbs whole bands, blurs the image (*seeing*), refracts, adds its own emission and varies with time.
- The **telescope** collects a fraction of the wavefront, with a spatial response (the PSF) and losses from reflection and obstruction.
- The **instrument** selects the band (filters), disperses the light (gratings), defines the field.
- The **detector** converts photons into electrons with an efficiency $$<1$$ and adds read noise, dark current and nonlinearities.

Reducing data is, essentially, **inverting that chain**, step by step, until we recover an estimate of the physical quantity of interest with its error bar. Much of the course is the elaboration of each arrow.

## From photon to number

The end product of an observation is not a pretty picture: it is a **number with an uncertainty**, a flux, a magnitude, a radial velocity, a period, accompanied by an honest estimate of how well it is known. Two ideas organize this process:

- **Calibration**: relating the detector counts to absolute physical units, using reference sources (standard stars, lamps, the sky).
- **Error propagation**: keeping track of the uncertainty through every operation, from the Poisson noise of the photons to the uncertainty of the calibration.

A measurement with no error bar is unusable in research. Throughout the course, each technique comes with its signal-to-noise equation.

## Observing from the ground and from space

From the **ground** we have a large and cheap aperture, easy access for maintenance and instrument upgrades, but we suffer atmospheric absorption (which closes the ultraviolet, almost all of the mid-infrared and much of the submillimeter), the *seeing*, the sky emission and the finite length of the night.

From **space** we gain access to the whole spectrum, a stable diffraction-limited PSF and a dark sky with no atmospheric variability, at the cost of smaller apertures, expensive missions with no repair, and severe constraints on mass, power and telemetry.

Modern astronomy combines the two: wide-field ground-based surveys feed targets to space telescopes and to the large telescopes with adaptive optics.

## References and course organization

The course follows closely:

> Chromey, *To Measure the Sky*; Léna et al., *Observational Astrophysics*; Howell, *Handbook of CCD Astronomy*.

The sequence of lectures follows the signal chain: fundamentals of observation and the atmosphere (Module 1), flux and magnitudes (Module 2), telescopes and detectors (Module 3), imaging and photometry (Module 4), spectroscopy (Module 5), and finally the other bands of the spectrum, the time domain and the practice of a real night (Modules 6 and 7).
