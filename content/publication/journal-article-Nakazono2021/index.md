---
title: "On the discovery of stars, quasars, and galaxies in the Southern Hemisphere with S-PLUS DR2"
authors:
- Nakazono et al.
date: "2021-11-01"
doi: "10.1093/mnras/stab1835"

# Schedule page publish date (NOT publication's date).
publishDate: "2022-01-01"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["2"]

# Publication name and optional abbreviated publication name.
publication: MNRAS, 507, 5847-5868
# publication_short: In SQGTool

abstract: This paper provides a catalogue of stars, quasars, and galaxies for the Southern Photometric Local Universe Survey Data Release 2 (S-PLUS DR2) in the Stripe 82 region. We show that a 12-band filter system (5 Sloan-like and 7 narrow bands) allows better performance for object classification than the usual analysis based solely on broad bands (regardless of infrared information). Moreover, we show that our classification is robust against missing values. Using spectroscopically confirmed sources retrieved from the Sloan Digital Sky Survey DR16 and DR14Q, we train a random forest classifier with the 12 S-PLUS magnitudes + 4 morphological features. A second random forest classifier is trained with the addition of the W1 and W2 magnitudes from the Wide-field Infrared Survey Explorer (WISE). Forty-four per cent of our catalogue have WISE counterparts and are provided with classification from both models. We achieve 95.76 per cent (52.47 per cent) of quasar purity, 95.88 per cent (92.24 per cent) of quasar completeness, 99.44 per cent (98.17 per cent) of star purity, 98.22 per cent (78.56 per cent) of star completeness, 98.04 per cent (81.39 per cent) of galaxy purity, and 98.8 per cent (85.37 per cent) of galaxy completeness for the first (second) classifier, for which the metrics were calculated on objects with (without) WISE counterpart. A total of 2926 787 objects that are not in our spectroscopic sample were labelled, obtaining 335 956 quasars, 1347 340 stars, and 1243 391 galaxies. From those, 7.4 per cent, 76.0 per cent, and 58.4 per cent were classified with probabilities above 80 per cent. The catalogue with classification and probabilities for Stripe 82 S-PLUS DR2 is available for download.

# Summary. An optional shortened abstract.
summary: This paper provides a catalogue of stars, quasars, and galaxies for S-PLUS DR2 in the Stripe 82 region. We show that narrow-band photometry improve the classification performance. Moreover, we show that our classification is robust against missing values. The catalogue with classification and probabilities for Stripe 82 S-PLUS DR2 is available for download.
tags:
- S-PLUS
featured: true

links:
#- name: Custom Link
#  url: http://example.org
# url_pdf: http://eprints.soton.ac.uk/352095/1/Cushen-IMV2013.pdf
# url_code: '#'
# url_dataset: '#'
# url_poster: '#'
# url_project: ''
# url_slides: ''
# url_source: '#'
# url_video: '#'

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Image credit: Nakazono et al. 2022 (MNRAS)'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
# - internal-project

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
# slides: example
---

{{% alert note %}}
Click the *Cite* button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /alert %}}

{{% alert note %}}
Click the *Slides* button above to demo academia's Markdown slides feature.
{{% /alert %}}

<!-- YOUR_COMMENT_HERE 
# Supplementary notes can be added here, including [code and math](https://sourcethemes.com/academic/docs/writing-markdown-latex/).
# the folder could be journal-article, conference-paper or preprint
-->