(function () {
  "use strict";

  // The classic Konami code, sitewide -- purely a fun discovery path to the
  // hidden Declassify game. No effect on anything else on the page.
  var SEQUENCE = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  var pos = 0;

  function isTypingTarget(el) {
    var tag = el.tagName ? el.tagName.toLowerCase() : "";
    return tag === "input" || tag === "textarea" || el.isContentEditable;
  }

  function showToast() {
    if (document.getElementById("konami-toast")) return;
    var toast = document.createElement("div");
    toast.id = "konami-toast";
    toast.className = "konami-toast";
    toast.innerHTML =
      '🔓 <strong>Hidden protocol unlocked.</strong> ' +
      '<a href="/play/declassify/">Access the program &rarr;</a> ' +
      '<button type="button" class="konami-toast-close" aria-label="Dismiss">✕</button>';
    document.body.appendChild(toast);

    // A `filter` on body/html would create a new containing block and break
    // this toast's `position: fixed`, so the flash lives on its own
    // overlay element instead of the page root.
    var flash = document.createElement("div");
    flash.className = "konami-flash-overlay";
    document.body.appendChild(flash);
    setTimeout(function () {
      if (flash.parentNode) flash.remove();
    }, 650);

    toast.querySelector(".konami-toast-close").addEventListener("click", function () {
      toast.remove();
    });
    setTimeout(function () {
      if (toast.parentNode) toast.remove();
    }, 12000);
  }

  document.addEventListener("keydown", function (e) {
    if (isTypingTarget(e.target)) return;
    var key = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
    if (key === SEQUENCE[pos]) {
      pos += 1;
      if (pos === SEQUENCE.length) {
        pos = 0;
        showToast();
      }
    } else {
      pos = key === SEQUENCE[0] ? 1 : 0;
    }
  });
})();
