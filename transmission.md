---
layout: default
title: "Signal"
permalink: /transmission/
section: transmission
description: "Unauthorized transmission. Source unknown."
robots: noindex
---

<div class="transmission" id="transmission">
  <div class="transmission-scanlines" aria-hidden="true"></div>
  <div class="transmission-glyph" id="transmission-glyph" aria-hidden="true"></div>

  <p class="transmission-label">// incoming transmission — source: unresolved</p>

  <div class="transmission-clock" id="transmission-clock" aria-live="off">
    <span id="tc-h">00</span><span class="transmission-colon">:</span><span id="tc-m">00</span><span class="transmission-colon">:</span><span id="tc-s">00</span>
  </div>

  <p class="transmission-status" id="transmission-status">triangulating source…</p>

  <a href="{{ '/' | relative_url }}" class="transmission-return">&larr; return to the surface</a>
</div>

<script src="{{ '/assets/js/transmission.js' | relative_url }}" defer></script>
