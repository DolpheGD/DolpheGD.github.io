(function () {
  "use strict";

  var buttons = document.querySelectorAll(".copy-link-btn");
  if (!buttons.length) return;

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = btn.getAttribute("data-copy-url");
      if (!url) return;

      var done = function () {
        var original = btn.textContent;
        btn.textContent = "✅";
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 1400);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () {
          fallbackCopy(url);
          done();
        });
      } else {
        fallbackCopy(url);
        done();
      }
    });
  });
})();
