(function () {
  "use strict";

  var THRESHOLD = 640;
  var btn = null;

  function ensureButton() {
    if (btn) return btn;
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.title = "Back to top";
    btn.textContent = "↑";
    btn.hidden = true;
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(btn);
    return btn;
  }

  function onScroll() {
    ensureButton().hidden = window.scrollY <= THRESHOLD;
  }

  document.addEventListener("DOMContentLoaded", function () {
    ensureButton();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  });
})();
