(function () {
  "use strict";

  var overlay = document.getElementById("search-overlay");
  if (!overlay) return;

  var trigger = document.getElementById("search-trigger");
  var closeBtn = document.getElementById("search-close");
  var input = document.getElementById("search-input");
  var resultsEl = document.getElementById("search-results");
  var searchUrl = overlay.getAttribute("data-search-url");

  var indexData = null;
  var indexPromise = null;
  var activeIndex = -1;
  var currentResults = [];

  var SECTION_LABELS = {
    "classified-files": "Classified Files",
    "chronicles": "Chronicles"
  };

  function loadIndex() {
    if (indexPromise) return indexPromise;
    indexPromise = fetch(searchUrl)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load search index");
        return res.json();
      })
      .then(function (data) {
        indexData = data;
        return data;
      })
      .catch(function (err) {
        indexData = [];
        resultsEl.innerHTML = '<p class="search-hint">Search is unavailable right now.</p>';
        return [];
      });
    return indexPromise;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function highlight(text, query) {
    var escaped = escapeHtml(text);
    if (!query) return escaped;
    var idx = escaped.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return escaped;
    return (
      escaped.slice(0, idx) +
      "<mark>" +
      escaped.slice(idx, idx + query.length) +
      "</mark>" +
      escaped.slice(idx + query.length)
    );
  }

  function snippetAround(text, query, radius) {
    var lower = text.toLowerCase();
    var idx = lower.indexOf(query.toLowerCase());
    if (idx === -1) return text.slice(0, radius * 2);
    var start = Math.max(0, idx - radius);
    var end = Math.min(text.length, idx + query.length + radius);
    var snippet = text.slice(start, end);
    if (start > 0) snippet = "…" + snippet;
    if (end < text.length) snippet = snippet + "…";
    return snippet;
  }

  function search(query) {
    if (!indexData) return [];
    var q = query.trim().toLowerCase();
    if (!q) return [];

    var scored = [];
    for (var i = 0; i < indexData.length; i++) {
      var item = indexData[i];
      var title = (item.title || "").toLowerCase();
      var excerpt = (item.excerpt || "").toLowerCase();
      var score = -1;

      if (title === q) score = 100;
      else if (title.indexOf(q) === 0) score = 80;
      else if (title.indexOf(q) !== -1) score = 60;
      else if (excerpt.indexOf(q) !== -1) score = 20;

      if (score >= 0) {
        scored.push({ item: item, score: score });
      }
    }

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.slice(0, 8).map(function (s) { return s.item; });
  }

  function render(query) {
    var results = search(query);
    currentResults = results;
    activeIndex = -1;

    if (!query.trim()) {
      resultsEl.innerHTML = '<p class="search-hint">Search across Classified Files and Chronicles. Start typing…</p>';
      return;
    }

    if (results.length === 0) {
      resultsEl.innerHTML = '<p class="search-hint">No results for “' + escapeHtml(query) + '”.</p>';
      return;
    }

    var html = '<ul class="search-result-list">';
    results.forEach(function (item, i) {
      var sectionLabel = SECTION_LABELS[item.section] || item.section || "";
      var titleHtml = highlight(item.title, query);
      var excerptText = item.excerpt || "";
      var excerptHtml = "";
      if (excerptText.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        excerptHtml = highlight(snippetAround(excerptText, query, 60), query);
      } else {
        excerptHtml = escapeHtml(excerptText.slice(0, 110));
      }
      html +=
        '<li>' +
        '<a class="search-result" href="' + item.url + '" data-result-index="' + i + '">' +
        '<span class="search-result-icon">' + (item.icon || "📄") + '</span>' +
        '<span class="search-result-body">' +
        '<span class="search-result-title-row">' +
        '<span class="search-result-title">' + titleHtml + '</span>' +
        '<span class="search-result-section">' + escapeHtml(sectionLabel) + '</span>' +
        '</span>' +
        '<span class="search-result-excerpt">' + excerptHtml + '</span>' +
        '</span>' +
        '</a>' +
        '</li>';
    });
    html += "</ul>";
    resultsEl.innerHTML = html;
  }

  function setActive(idx) {
    var links = resultsEl.querySelectorAll(".search-result");
    if (!links.length) return;
    if (idx < 0) idx = links.length - 1;
    if (idx >= links.length) idx = 0;
    activeIndex = idx;
    links.forEach(function (el, i) {
      el.classList.toggle("is-active", i === activeIndex);
    });
    links[activeIndex].scrollIntoView({ block: "nearest" });
  }

  function openSearch() {
    overlay.hidden = false;
    document.body.classList.add("search-open");
    loadIndex().then(function () {
      render(input.value);
    });
    setTimeout(function () { input.focus(); }, 0);
  }

  function closeSearch() {
    overlay.hidden = true;
    document.body.classList.remove("search-open");
  }

  if (trigger) {
    trigger.addEventListener("click", openSearch);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeSearch);
  }

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeSearch();
  });

  input.addEventListener("input", function () {
    render(input.value);
  });

  input.addEventListener("keydown", function (e) {
    var links = resultsEl.querySelectorAll(".search-result");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (links.length) setActive(activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (links.length) setActive(activeIndex - 1);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && links[activeIndex]) {
        window.location.href = links[activeIndex].getAttribute("href");
      } else if (links.length) {
        window.location.href = links[0].getAttribute("href");
      }
    } else if (e.key === "Escape") {
      closeSearch();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (overlay.hidden && e.key === "/" && !isTypingTarget(e.target)) {
      e.preventDefault();
      openSearch();
    } else if (!overlay.hidden && e.key === "Escape") {
      closeSearch();
    }
  });

  function isTypingTarget(el) {
    var tag = el.tagName ? el.tagName.toLowerCase() : "";
    return tag === "input" || tag === "textarea" || el.isContentEditable;
  }
})();
