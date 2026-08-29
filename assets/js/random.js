(function () {
  "use strict";

  var trigger = document.getElementById("random-trigger");
  if (!trigger) return;

  var indexUrl = trigger.getAttribute("data-search-url");
  var indexData = null;
  var indexPromise = null;

  function loadIndex() {
    if (indexPromise) return indexPromise;
    indexPromise = fetch(indexUrl)
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load file index");
        return res.json();
      })
      .then(function (data) {
        indexData = data;
        return data;
      })
      .catch(function () {
        indexData = [];
        return [];
      });
    return indexPromise;
  }

  trigger.addEventListener("click", function () {
    trigger.disabled = true;
    loadIndex().then(function (data) {
      trigger.disabled = false;
      if (!data || !data.length) return;
      // Avoid re-landing on the exact page we're already on, when possible.
      var candidates = data.filter(function (item) {
        return item.url !== window.location.pathname;
      });
      var pool = candidates.length ? candidates : data;
      var pick = pool[Math.floor(Math.random() * pool.length)];
      if (pick && pick.url) window.location.href = pick.url;
    });
  });
})();
