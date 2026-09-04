---
title: "1.2 - The celestial sphere and coordinate systems"
course: astro-obs
---

## The celestial sphere and coordinate systems

To point a telescope and to compare catalogs we need a precise way to say **where** an object is on the sky. Since distances do not enter this problem, we project everything onto a sphere of unit radius, the **celestial sphere**, and work with pairs of angles.

### Contents

- The celestial sphere and the reference circles
- Horizontal coordinates
- Equatorial coordinates
- Hour angle and sidereal time
- Ecliptic and galactic coordinates
- The astronomical triangle and airmass

## The celestial sphere and the reference circles

On the celestial sphere we define: the observer's **horizon**, the **zenith** (point overhead) and the **nadir**; the **celestial poles**, the extension of the Earth's rotation axis; the **celestial equator**, the projection of the terrestrial equator; and the **ecliptic**, the great circle the Sun travels in one year, tilted by $$\varepsilon\approx 23{,}44^\circ$$ with respect to the equator. The two points where the ecliptic crosses the equator are the **equinoxes**; the March equinox, or **vernal point** $$\gamma$$, is the origin of equatorial coordinates.

A **great circle** is the intersection of the sphere with a plane through its center; it is the shortest route between two points on the sphere. The **local meridian** is the great circle through the celestial poles and the zenith: an object is at its greatest altitude when it **crosses the meridian** (culmination).

## Horizontal coordinates

Anchored to the observer and the instant:

- **Altitude** $$h$$: angle above the horizon, from $$-90^\circ$$ to $$+90^\circ$$. The **zenith distance** is $$z = 90^\circ - h$$.
- **Azimuth** $$A$$: angle along the horizon, usually measured from North toward East.

These are the natural coordinates of an alt-azimuth mount and the ones that set the airmass and the refraction. The drawback: they change continuously with the Earth's rotation and depend on the observer's position.

## Equatorial coordinates

Anchored to the celestial sphere, nearly fixed for the stars:

- **Declination** $$\delta$$: angle with respect to the celestial equator, from $$-90^\circ$$ to $$+90^\circ$$. It is analogous to latitude.
- **Right ascension** $$\alpha$$: angle measured along the equator from the vernal point $$\gamma$$, in the direction of the Sun's annual motion. It is measured in **hours, minutes and seconds** ($$24^\text{h} = 360^\circ$$, so $$1^\text{h}=15^\circ$$).

The pair $$(\alpha,\delta)$$ of a star changes slowly (precession, proper motion), so a catalog always specifies the reference **epoch** and **equinox** (today the standard is the ICRS system, practically coincident with J2000).

## Hour angle and sidereal time

To relate $$(\alpha,\delta)$$ to $$(h,A)$$ we use the **hour angle** $$H$$: the angular distance, measured along the equator, between the local meridian and the object's hour circle. It grows with time at the Earth's rotation rate. The fundamental relation is

$$
H = \mathrm{LST} - \alpha,
$$

where $$\mathrm{LST}$$ is the **local sidereal time**, defined as the hour angle of the vernal point. At $$H=0$$ the object culminates; $$H<0$$ (east of the meridian) it is rising, $$H>0$$ setting. Sidereal time is the subject of the next lecture.

## The astronomical triangle and airmass

The **astronomical triangle** (or triangle of position) has vertices at the celestial pole, the zenith and the object. Its sides are $$90^\circ-\varphi$$ (the observer's colatitude), $$90^\circ-\delta$$ and $$90^\circ-h=z$$; the angles at the pole and zenith vertices are $$H$$ and $$360^\circ-A$$. Applying the **spherical law of cosines** to the side $$z$$:

$$
\sin h = \sin\varphi\,\sin\delta + \cos\varphi\,\cos\delta\,\cos H.
$$

This is the equation that converts $$(\alpha,\delta)$$ and the instant into altitude. From it follow practical consequences:

- The culmination altitude is $$h_\text{max} = 90^\circ - \lvert\varphi-\delta\rvert$$.
- An object is **circumpolar** (never sets) if $$\delta > 90^\circ - \varphi$$ (northern hemisphere) and **never rises** if $$\delta < -(90^\circ-\varphi)$$.
- The **airmass**, the thickness of atmosphere traversed in units of the zenith thickness, is approximately

$$
X \approx \sec z = \frac{1}{\sin h},
$$

valid up to $$z\approx 60^\circ$$ ($$X\approx 2$$). Near the horizon the curvature of the atmosphere matters and corrected formulas are used (Hardie, Young). The airmass controls the atmospheric extinction and the differential refraction, treated in lecture 1.5.

## Ecliptic and galactic coordinates

Two other systems, chosen for the convenience of the problem:

- **Ecliptic** $$(\lambda,\beta)$$: latitude and longitude measured from the ecliptic and the vernal point. Natural for Solar System objects and for the zodiacal light.
- **Galactic** $$(l,b)$$: longitude and latitude measured from the plane of the Milky Way, with origin toward the galactic center. Natural for galactic structure and for mapping interstellar extinction.

The conversion between any two systems is a rotation, applied with the same spherical-trigonometry formulas, and today it is embedded in libraries such as `astropy.coordinates`.
