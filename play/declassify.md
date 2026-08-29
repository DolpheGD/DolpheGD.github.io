---
layout: default
title: "Declassify"
permalink: /play/declassify/
section: play
description: "A hidden file-guessing game buried in the Dolpheverse archive."
robots: noindex
---

<nav class="breadcrumb">
  <a href="{{ '/' | relative_url }}">Home</a>
  <span class="crumb-sep">/</span>
  <span>Declassify</span>
</nav>

<div class="game-declassify" id="declassify-game" data-search-url="{{ '/search.json' | relative_url }}">
  <span class="notfound-stamp game-top-stamp">EYES ONLY</span>
  <h1 class="page-title">Declassify</h1>
  <p class="game-intro">A file has come across your desk with the label torn off. Guess who — or what — it is from the redacted scan before you run out of attempts. Every round pulls from a real file already in the archive.</p>

  <div class="game-board">
    <div class="game-image-wrap">
      <img id="game-image" src="" alt="Redacted file scan" class="game-image blur-4">
      <span class="game-image-stamp">CLASSIFIED</span>
    </div>
    <div class="game-panel">
      <p class="game-excerpt" id="game-excerpt">Loading a file…</p>
      <div class="game-input-row">
        <input type="text" id="game-guess" list="game-titles" placeholder="Who — or what — is this?" autocomplete="off" spellcheck="false" disabled>
        <button type="button" id="game-submit" disabled>GUESS</button>
      </div>
      <datalist id="game-titles"></datalist>
      <p class="game-feedback" id="game-feedback" aria-live="polite"></p>
      <div class="game-stats">
        <span>Attempts left: <strong id="game-attempts">4</strong></span>
        <span>Streak: <strong id="game-streak">0</strong></span>
        <span>Best: <strong id="game-best">0</strong></span>
      </div>
      <button type="button" id="game-next" class="game-next" hidden>NEXT FILE &rarr;</button>
    </div>
  </div>
</div>

<script src="{{ '/assets/js/declassify-game.js' | relative_url }}" defer></script>
