---
layout: entry
title: "Lab process"
icon: "🔬"
order: 15
section: chronicles
group_of: "broskm"
description: "## [Introduction] This document is meant to streamline the process of creating in the tech/mech style. Setting rules for standards to keep things clean…"
---

## \[Introduction\]

This document is meant to streamline the process of creating in the tech/mech style. Setting rules for standards to keep things clean. This document will go over layer management, colors and glow, asset management, structures, triggers, bosses, and optimization. 

## \[Table of Contents\]

\[Layer  Management\]................................................\[2\]

\[Colors\]...........................................................\[X\]

\[Glow\].............................................................\[X\]

\[Asset Managment\]..................................................\[X\]

\[Structures\].......................................................\[X\]

\[Triggers\].........................................................\[X\]

\[Bosses\]...........................................................\[X\]

\[Otimization\]......................................................\[X\]

\[XXXXXXXXXXXXXXXXX\]................................................\[X\]

\[XXXXXXXXXXXXXXXXX\]................................................\[X\]

\[XXXXXXXXXXXXXXXXX\]................................................\[X\]

\[XXXXXXXXXXXXXXXXX\]................................................\[X\]

\[XXXXXXXXXXXXXXXXX\]................................................\[X\]

\[XXXXXXXXXXXXXXXXX\]................................................\[X\]

\[XXXXXXXXXXXXXXXXX\]................................................\[X\]

\[XXXXXXXXXXXXXXXXX\]................................................\[X\]

\[XXXXXXXXXXXXXXXXX\]................................................\[X\]

## \[Layer Management\]

The process for layer management will be explained here, In my opinion I have determined this set of rules on where to put things and how to organize decoration and everything else without creating a large mess, the table below will specify the things that go on Z layers, Objects have built in tileset rules (which is dumb) but this document accounts for that. The image below describes the object tilesets, Not affected by Z Order. You WILL need to use a different Z layer to bypass this.

This table lists Assets that should be on the different Z layers.

<table>
  <thead>
    <tr><th markdown="span">B5</th><th markdown="span">B4</th><th markdown="span">B3</th><th markdown="span">B2</th><th markdown="span">B1</th><th markdown="span">T1</th><th markdown="span">T2</th><th markdown="span">T3</th><th markdown="span">T4</th><th markdown="span">T5</th></tr>
  </thead>
  <tbody>
    <tr><td markdown="span">BG1</td><td markdown="span">BG2</td><td markdown="span">MG</td><td markdown="span">MG2</td><td markdown="span">Block Deco</td><td markdown="span">Block Deco2</td><td markdown="span">FG</td><td markdown="span">FG2</td><td markdown="span">Mask/FG</td><td markdown="span">HUD</td></tr>
    <tr><td markdown="span">GLOW B5</td><td markdown="span">BG1 Glow</td><td markdown="span">BG2 Glow</td><td markdown="span">MG Glow</td><td markdown="span">MG2 Glow</td><td markdown="span">Block Glow</td><td markdown="span">Block Glow2</td><td markdown="span">FG Glow</td><td markdown="span">FG Glow2</td><td markdown="span">MASK Glow</td></tr>
  </tbody>
</table>

It's important to note that Boss design behind the player should be made in the MG1/2 Z layers and not block design layers. Glow that goes behind any Deco needs to go in the same Z layer because that's how rob coded blending. 

In the next section we will go over what Z order will go best with each Z layer as well as what should go on different L layers. 

## \[Layer Management Continued\]
