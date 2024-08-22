---
title: TMS Motor Mapping Visualization - GSoC 24 @Invesalius
date: 2024-08-22T05:48:35.663Z
featured: true
link: https://github.com/invesalius/invesalius3/pull/825
image: https://gist.github.com/user-attachments/assets/dbbc2819-00c8-49b1-ac07-902155b2d5ba
description: Google Summer of Code 2024 Contribution to Invesalius
tags:
  - gsoc
  - opensource
fact: I didn't know anything about Transcranial Magnetic Stimulation (TMS)
  before this project
weight: 10
sitemap:
  weight: 0.1
---



This project introduces a new Motor Mapping Visualization feature to Invesalius, offering enhanced capabilities for visualizing and interacting with Motor Evoked Potential (MEP) data


## Features:
1. Heatmap visualization on brain surface based on Motor evoked potentials
2. Interactive MEP value adjustment and session persistence
3. 4 Customizable colormap ranges 
4. Brain surface selection
5. Modifiable gaussian parameters for surface and points interpolation
6. 10 Different colormaps to choose from

### Quick Runthrough
The following animation demonstrates the interactive workflow, allowing for real-time exploration of MEP data and visualization customization.




![Animation](https://github.com/user-attachments/assets/ca4e6f08-3e1b-4fb9-a17a-e1485081b167)

### Detailed Feature Screenshots

| Motor Mapping | Color Map Presets | 
| --- | --- |  
| ![motor map](https://github.com/user-attachments/assets/4ce3c72f-3e5f-482c-b378-7345a47f4892)|![colormap presets](https://github.com/user-attachments/assets/30f94d2b-ef7a-4fca-a89d-f2db3ac50149) |
|MEP Values and Toggle Button |Preferences  |
|![mep values and toggle button](https://github.com/user-attachments/assets/dc8a2765-7858-4448-8918-85c1695c8842)|![preferences](https://github.com/user-attachments/assets/5e4a3c54-6ac3-4d55-b7b1-ed825b817e60) |

## Challenges and Takeaways

* I have invested a good amount of time during the project start for developing understanding on the architecture of the VTK pipeline and the overall visualization logic in Invesalius. Most of that was done on my own, with a little push from my mentors to fill in the knowledge gaps I had. This really gave me a taste of open source and the need to be self reliant first and foremost before using any of the contributors' time.
* Before GSoC, I had basic knowledge on developing medical visualization software and the complexity it can reach. Through this project, I was able to use VTK and python effectively to build complex and modular logic for brain visualization.
* Being someone who uses python for everything, I love creating new programs/tools using Python. This project helped me learn a lot about working with pub-sub or event driven architecture in python and also taught me how to work with wxPython GUI framework which is used in many old python applications.
* My code quality has also improved, thanks to detailed reviews from mentors over the course of this project.

## Acknowledgements

I'd like to thank all my mentors for helping me throughout this project. A special shoutout to [Renan Matusda](https://github.com/rmatsuda) and [Victor Souza](https://github.com/vhosouza), for their comprehensive code reviews and guidance. It was an honor working with them.

Contributing to Invesalius has been amazing, and I am looking forward to contributing more in the future! I am glad to have worked with such amazing people. I am extremely thankful to Google Summer of Code for providing me with this opportunity to improve my programming skills and learn a lot about open-source development along the way.

## Pull Requests

https://github.com/invesalius/invesalius3/pull/825

## Future Work


* In future iterations, I plan to add a sliding gradient editor for more intuitive color customization and enhance the colorbar for improved range interpretation.
* The brain projection is not directly projected to the surface and is dependent on the height from the scalp as the point is generated at the coil's center position and not directly on the brain surface, increasing the visualization radius from preferences helps. But it is not ideal.