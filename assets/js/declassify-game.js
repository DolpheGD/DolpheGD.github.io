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

  // Each pool entry is a *group*: one or more archive files that should
  // count as the same answer (e.g. "Bli" and "Corrupted Bli" -- guessing
  // either name is correct, and either one's image can come up).
  var pool = [];
  var recentKeys = [];
  var current = null; // { canonical, names: [...], member: {title,url,preview,excerpt} }
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

  var REDACT_STOPWORDS = ["the", "a", "an", "of", "and", "or", "in", "on", "at", "to", "is", "are", "mr", "ms"];

  // Blocking the exact title isn't enough -- a lot of these names are
  // multi-word ("Polo (Gaipolo)", "Daffy & Lake") and the description text
  // often calls the subject by just one piece of it. Redact every
  // meaningful word from every accepted name, not just the full strings.
  function redactionTerms(names) {
    var terms = [];
    names.forEach(function (name) {
      if (terms.indexOf(name) === -1) terms.push(name);
      var words = name.match(/[A-Za-z0-9']+/g) || [];
      words.forEach(function (w) {
        if (w.length >= 3 && REDACT_STOPWORDS.indexOf(w.toLowerCase()) === -1 && terms.indexOf(w) === -1) {
          terms.push(w);
        }
      });
    });
    // Longest first so multi-word names get fully swallowed before their
    // own pieces would otherwise leave partial "[REDACTED] Something" text.
    return terms.sort(function (a, b) { return b.length - a.length; });
  }

  function redactExcerpt(text, names) {
    if (!text) return "No further description on file.";
    var out = text;
    redactionTerms(names).forEach(function (term) {
      var escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      out = out.replace(new RegExp("\\b" + escaped + "\\b", "gi"), "[REDACTED]");
    });
    // Collapse "[REDACTED] [REDACTED]" runs left behind when both a full
    // name and its own component words matched back to back.
    out = out.replace(/(\[REDACTED\])(?:[\s,'-]*\[REDACTED\])+/g, "$1");
    return out;
  }

  function buildGroups(data) {
    var byKey = {};
    var order = [];
    data.filter(function (item) { return item.guessable && item.preview; }).forEach(function (item) {
      var key = item.game_alias_of || item.title;
      if (!byKey[key]) {
        byKey[key] = { canonical: key, members: [] };
        order.push(key);
      }
      byKey[key].members.push(item);
    });
    return order.map(function (k) { return byKey[k]; });
  }

  function pickRound() {
    if (!pool.length) return;
    var choices = pool.filter(function (g) { return recentKeys.indexOf(g.canonical) === -1; });
    if (!choices.length) {
      recentKeys = [];
      choices = pool;
    }
    var group = choices[Math.floor(Math.random() * choices.length)];
    recentKeys.push(group.canonical);
    if (recentKeys.length > Math.min(15, Math.floor(pool.length / 2))) recentKeys.shift();

    var member = group.members[Math.floor(Math.random() * group.members.length)];
    var names = [group.canonical];
    group.members.forEach(function (m) {
      if (names.indexOf(m.title) === -1) names.push(m.title);
    });
    current = { canonical: group.canonical, names: names, member: member };

    attemptsLeft = MAX_ATTEMPTS;
    attemptsEl.textContent = String(attemptsLeft);
    setBlur(0);
    img.src = member.preview;
    img.alt = "Redacted file scan";
    excerptEl.textContent = redactExcerpt(member.excerpt, names);
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
    var guess = guessInput.value.trim().toLowerCase();
    if (!guess) return;
    var isMatch = current.names.some(function (name) { return name.toLowerCase() === guess; });
    if (isMatch) {
      feedbackEl.className = "game-feedback is-granted";
      feedbackEl.innerHTML =
        "DECLASSIFIED — this was <strong>" + current.canonical + "</strong>. " +
        '<a href="' + current.member.url + '">View the full file &rarr;</a>';
      endRound(true);
    } else {
      attemptsLeft -= 1;
      attemptsEl.textContent = String(Math.max(attemptsLeft, 0));
      if (attemptsLeft <= 0) {
        feedbackEl.className = "game-feedback is-denied";
        feedbackEl.innerHTML =
          "OUT OF ATTEMPTS — this was <strong>" + current.canonical + "</strong>. " +
          '<a href="' + current.member.url + '">View the full file &rarr;</a>';
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
      pool = buildGroups(data || []);
      if (!pool.length) {
        excerptEl.textContent = "No files available to declassify right now.";
        return;
      }
      var frag = document.createDocumentFragment();
      pool.forEach(function (group) {
        var opt = document.createElement("option");
        opt.value = group.canonical;
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
