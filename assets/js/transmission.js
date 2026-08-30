(function () {
  "use strict";

  var root = document.getElementById("transmission");
  if (!root) return;

  var hEl = document.getElementById("tc-h");
  var mEl = document.getElementById("tc-m");
  var sEl = document.getElementById("tc-s");
  var clockEl = document.getElementById("transmission-clock");
  var statusEl = document.getElementById("transmission-status");

  var PHRASES = [
    "triangulating source…",
    "signal acquired.",
    "decrypting fragment…",
    "the void listens back.",
    "convergence protocol: standby.",
    "some frequencies were never meant to be heard.",
    "cross-referencing archive…",
    "they are still counting.",
    "[DATA CORRUPTED]",
    "do not respond."
  ];

  var GLITCH_WINDOW_MS = 8000;
  var LOST_DURATION_MS = 3200;
  var phraseIndex = 0;
  var target = nextUtcMidnight();
  var state = "counting"; // "counting" | "glitching" | "lost"
  var lostAt = 0;

  function nextUtcMidnight() {
    var now = new Date();
    var next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
    return next.getTime();
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  function randDigits(n) {
    var out = "";
    for (var i = 0; i < n; i++) out += Math.floor(Math.random() * 10);
    return out;
  }

  function renderTime(h, m, s) {
    hEl.textContent = h;
    mEl.textContent = m;
    sEl.textContent = s;
  }

  function cyclePhrase() {
    if (state !== "counting") return;
    phraseIndex = (phraseIndex + 1) % PHRASES.length;
    statusEl.textContent = PHRASES[phraseIndex];
  }

  function tick() {
    var now = Date.now();

    if (state === "lost") {
      if (now - lostAt >= LOST_DURATION_MS) {
        state = "counting";
        target = nextUtcMidnight();
        clockEl.classList.remove("is-glitching", "is-lost");
        statusEl.classList.remove("is-lost");
      }
      return;
    }

    var remaining = target - now;

    if (remaining <= 0) {
      state = "lost";
      lostAt = now;
      clockEl.classList.remove("is-glitching");
      clockEl.classList.add("is-lost");
      renderTime("--", "--", "--");
      statusEl.textContent = "[ SIGNAL LOST ]";
      statusEl.classList.add("is-lost");
      root.classList.add("transmission-flash");
      setTimeout(function () { root.classList.remove("transmission-flash"); }, 350);
      return;
    }

    if (remaining <= GLITCH_WINDOW_MS) {
      if (!clockEl.classList.contains("is-glitching")) {
        clockEl.classList.add("is-glitching");
        statusEl.classList.add("is-lost");
        statusEl.textContent = "[ SIGNAL DEGRADING ]";
      }
      // Scramble digits harder the closer it gets to zero.
      renderTime(randDigits(2), randDigits(2), randDigits(2));
      return;
    }

    var totalSeconds = Math.floor(remaining / 1000);
    var h = Math.floor(totalSeconds / 3600);
    var m = Math.floor((totalSeconds % 3600) / 60);
    var s = totalSeconds % 60;
    renderTime(pad(h), pad(m), pad(s));
  }

  statusEl.textContent = PHRASES[0];
  setInterval(tick, 300);
  setInterval(cyclePhrase, 5000);
})();
