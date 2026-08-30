---
layout: default
title: The Dolpheverse Lore
permalink: /
---

<p class="placeholder-note">(AI was not used in any part of writing this lore)</p>

<img src="/assets/images/image1.png" alt="Map of the Dolpheverse" style="border-radius: 12px; box-shadow: var(--card-shadow); margin: 0.5rem 0 1.5rem;">

# ⭐ The Dolpheverse ⭐

Lore for Dolphe's Geometry Dash level series — the mainline story, a full encyclopedia of characters and factions, and the side stories and artifacts that fill in the rest of the world.

{% assign top_factions = site.classified | where_exp: "i", "i.group_of == nil" %}
<div class="stats-strip">
  <div class="stat-tile">
    <span class="stat-number">{{ site.classified.size }}</span>
    <span class="stat-label">Classified Files</span>
  </div>
  <div class="stat-tile">
    <span class="stat-number">{{ site.chronicles.size }}</span>
    <span class="stat-label">Chronicle Entries</span>
  </div>
  <div class="stat-tile">
    <span class="stat-number">{{ site.data.timeline.count }}</span>
    <span class="stat-label">Timeline Events</span>
  </div>
  <div class="stat-tile">
    <span class="stat-number">{{ top_factions.size }}</span>
    <span class="stat-label">Major Factions</span>
  </div>
</div>

<div class="nav-card-grid">
  <a class="nav-card" href="/timeline/">
    <span class="nav-card-icon"><img src="/assets/chronicles/images/image8.png" alt="" style="width: 1.8rem; height: 1.8rem;"></span>
    <span class="nav-card-title">Series Timeline and Summary</span>
    <span class="nav-card-desc">A chronological account of the Dolpheverse, from the fall of Eris to the final convergence on Abyssnia. The mainline story picks up at Ocellios Lab, July 26, 109 IC, following a self-inserted [Player] escaping the lab.</span>
  </a>
  <a class="nav-card" href="/classified-files/">
    <span class="nav-card-icon">📁</span>
    <span class="nav-card-title">Cascade Classified Files</span>
    <span class="nav-card-desc">A complete encyclopedia of every character, location, faction, technology, and other miscellaneous details.</span>
  </a>
  <a class="nav-card" href="/chronicles/">
    <span class="nav-card-icon">📁</span>
    <span class="nav-card-title">Cascade Chronicles</span>
    <span class="nav-card-desc">A documentation of lore artifacts, stories, and historical records from all over the series.</span>
  </a>
</div>

## 🔗 Community & Resources

<div class="link-row">
  <a class="link-chip" href="{{ site.links.team_discord }}" target="_blank" rel="noopener"><span class="link-chip-icon">💬</span> Team Discord</a>
  <a class="link-chip" href="{{ site.links.lore_discord }}" target="_blank" rel="noopener"><span class="link-chip-icon">📖</span> Lore Discord</a>
  <a class="link-chip" href="{{ site.links.google_doc }}" target="_blank" rel="noopener"><span class="link-chip-icon">📄</span> Official Google Doc</a>
  <a class="link-chip" href="{{ site.links.youtube }}" target="_blank" rel="noopener"><span class="link-chip-icon">▶️</span> YouTube Channel</a>
  <a class="link-chip" href="{{ '/play/declassify/' | relative_url }}"><span class="link-chip-icon">🎮</span> Play Declassify</a>
</div>

<img src="/assets/images/image2.png" alt="Dolpheverse level order chart" style="border-radius: 0; box-shadow: var(--card-shadow); margin: 0.5rem 0 1rem;">

## ⭐ Recommended Play Order ⭐

🎥 = There is a separate prologue associated with this level. ▶️ = Watch on YouTube.

1. [Destruction Eruption](https://www.youtube.com/watch?v=WCLdr-MbTIo&list=PLv-GaackQWwpaykfI7mJrZbcfr85Mj3MQ&index=1){:target="_blank" rel="noopener"} ▶️
2. [Glacier 15](https://www.youtube.com/watch?v=37QdVq_O-lE&list=PLv-GaackQWwpaykfI7mJrZbcfr85Mj3MQ&index=3){:target="_blank" rel="noopener"} ▶️ &mdash; 🎥 [Prologue](https://www.youtube.com/watch?v=VT0BKNuGl2A&list=PLv-GaackQWwpaykfI7mJrZbcfr85Mj3MQ&index=2){:target="_blank" rel="noopener"} ▶️
3. [Operation Wastelands](https://www.youtube.com/watch?v=JsFct9DYb74&list=PLv-GaackQWwpaykfI7mJrZbcfr85Mj3MQ&index=4){:target="_blank" rel="noopener"} ▶️
4. [Mission Hellfire](https://www.youtube.com/watch?v=2RtfG_cAYsU&list=PLv-GaackQWwpaykfI7mJrZbcfr85Mj3MQ&index=5){:target="_blank" rel="noopener"} ▶️
5. [The Voidlands](https://www.youtube.com/watch?v=BqekYDDlJ1o&list=PLv-GaackQWwpaykfI7mJrZbcfr85Mj3MQ&index=6){:target="_blank" rel="noopener"} ▶️
6. [Ocellios](https://www.youtube.com/watch?v=YvojZF0C5DU&list=PLv-GaackQWwpaykfI7mJrZbcfr85Mj3MQ&index=7){:target="_blank" rel="noopener"} ▶️
7. [Project Novaform](https://www.youtube.com/watch?v=Q774LOEwW-I&list=PLv-GaackQWwpaykfI7mJrZbcfr85Mj3MQ&index=8){:target="_blank" rel="noopener"} ▶️
8. [Mk2](https://www.youtube.com/watch?v=3L24DaOQ7Gg&list=PLv-GaackQWwpaykfI7mJrZbcfr85Mj3MQ&index=9){:target="_blank" rel="noopener"} ▶️

**Notes:**
- The Voidlands will be replaced in the future.
