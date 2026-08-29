(function () {
  "use strict";

  var root = document.getElementById("declassify-game");
  if (!root) return;

  var img = document.getElementById("game-image");
  var excerptEl = document.getElementById("game-excerpt");
  var guessInput = document.getElementById("game-guess");
  var submitBtn = document.getElementById("game-submit");
  var titlesList = document.getElementById("game-titles");
  var feedbackEl = document.getElementById("game-feedback");
  var attemptsEl = document.getElementById("game-attempts");
  var streakEl = document.getElementById("game-streak");
  var bestEl = document.getElementById("game-best");
  var nextBtn = document.getElementById("game-next");

  var MAX_ATTEMPTS = 4;
  var BLUR_LEVELS = ["blur-4", "blur-3", "blur-2", "blur-1", "blur-0"];
  var BEST_KEY = "dolpheverse-declassify-best";

  var pool = [];
  var recentUrls = [];
  var current = null;
  var attemptsLeft = MAX_ATTEMPTS;
  var streak = 0;
  var best = 0;

  function loadBest() {
    try {
      var v = parseInt(localStorage.getItem(BEST_KEY), 10);
      return isNaN(v) ? 0 : v;
    } catch (e) {
      return 0;
    }
  }

  function saveBest(v) {
    try {
      localStorage.setItem(BEST_KEY, String(v));
    } catch (e) {}
  }

  function setBlur(level) {
    BLUR_LEVELS.forEach(function (cls) { img.classList.remove(cls); });
    img.classList.add(BLUR_LEVELS[level]);
  }

  function redactExcerpt(text, title) {
    if (!text) return "No further description on file.";
    var escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var re = new RegExp(escaped, "gi");
    return text.replace(re, "[REDACTED]");
  }

  function pickRound() {
    if (!pool.length) return;
    var choices = pool.filter(function (item) { return recentUrls.indexOf(item.url) === -1; });
    if (!choices.length) {
      recentUrls = [];
      choices = pool;
    }
    current = choices[Math.floor(Math.random() * choices.length)];
    recentUrls.push(current.url);
    if (recentUrls.length > Math.min(15, Math.floor(pool.length / 2))) recentUrls.shift();

    attemptsLeft = MAX_ATTEMPTS;
    attemptsEl.textContent = String(attemptsLeft);
    setBlur(0);
    img.src = current.preview;
    img.alt = "Redacted file scan";
    excerptEl.textContent = redactExcerpt(current.excerpt, current.title);
    feedbackEl.textContent = "";
    feedbackEl.className = "game-feedback";
    guessInput.value = "";
    guessInput.disabled = false;
    submitBtn.disabled = false;
    nextBtn.hidden = true;
    guessInput.focus();
  }

  function endRound(won) {
    setBlur(4);
    guessInput.disabled = true;
    submitBtn.disabled = true;
    nextBtn.hidden = false;
    if (won) {
      streak += 1;
      if (streak > best) {
        best = streak;
        saveBest(best);
      }
    } else {
      streak = 0;
    }
    streakEl.textContent = String(streak);
    bestEl.textContent = String(best);
  }

  function attempt() {
    if (!current || guessInput.disabled) return;
    var guess = guessInput.value.trim();
    if (!guess) return;
    if (guess.toLowerCase() === current.title.toLowerCase()) {
      feedbackEl.textContent = "DECLASSIFIED — this was " + current.title + ". View the full file →";
      feedbackEl.className = "game-feedback is-granted";
      feedbackEl.innerHTML =
        "DECLASSIFIED — this was <strong>" + current.title + "</strong>. " +
        '<a href="' + current.url + '">View the full file &rarr;</a>';
      endRound(true);
    } else {
      attemptsLeft -= 1;
      attemptsEl.textContent = String(Math.max(attemptsLeft, 0));
      if (attemptsLeft <= 0) {
        feedbackEl.textContent = "OUT OF ATTEMPTS — this was " + current.title + ".";
        feedbackEl.className = "game-feedback is-denied";
        feedbackEl.innerHTML =
          "OUT OF ATTEMPTS — this was <strong>" + current.title + "</strong>. " +
          '<a href="' + current.url + '">View the full file &rarr;</a>';
        endRound(false);
      } else {
        setBlur(MAX_ATTEMPTS - attemptsLeft);
        feedbackEl.textContent = "ACCESS DENIED — " + attemptsLeft + " attempt" + (attemptsLeft === 1 ? "" : "s") + " left.";
        feedbackEl.className = "game-feedback is-denied";
        guessInput.classList.remove("shake");
        void guessInput.offsetWidth;
        guessInput.classList.add("shake");
      }
    }
    guessInput.value = "";
    guessInput.focus();
  }

  best = loadBest();
  bestEl.textContent = String(best);

  var searchUrl = root.getAttribute("data-search-url");
  fetch(searchUrl)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      pool = (data || []).filter(function (item) { return item.preview; });
      if (!pool.length) {
        excerptEl.textContent = "No files available to declassify right now.";
        return;
      }
      var frag = document.createDocumentFragment();
      pool.forEach(function (item) {
        var opt = document.createElement("option");
        opt.value = item.title;
        frag.appendChild(opt);
      });
      titlesList.appendChild(frag);
      pickRound();
    })
    .catch(function () {
      excerptEl.textContent = "The archive index couldn't be reached. Try refreshing.";
    });

  submitBtn.addEventListener("click", attempt);
  guessInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") attempt();
  });
  nextBtn.addEventListener("click", pickRound);
})();
