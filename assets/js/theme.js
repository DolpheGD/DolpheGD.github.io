(function () {
  "use strict";

  var KEY = "dolpheverse-theme";
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function saved() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function apply(theme) {
    if (theme === "dark" || theme === "light") {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function labelFor(theme) {
    if (theme === "dark") return { icon: "🌙", title: "Theme: dark — click for auto" };
    if (theme === "light") return { icon: "☀️", title: "Theme: light — click for dark" };
    return { icon: "🌗", title: "Theme: auto (matches your system) — click for light" };
  }

  function updateButton() {
    var l = labelFor(saved());
    btn.textContent = l.icon;
    btn.title = l.title;
  }

  updateButton();

  btn.addEventListener("click", function () {
    var t = saved();
    // Cycle: auto -> light -> dark -> auto
    var next = t === null ? "light" : t === "light" ? "dark" : null;
    try {
      if (next === null) {
        localStorage.removeItem(KEY);
      } else {
        localStorage.setItem(KEY, next);
      }
    } catch (e) {}
    apply(next);
    updateButton();
  });
})();
