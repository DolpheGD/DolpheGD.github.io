(function () {
  "use strict";

  var input = document.getElementById("terminal-code");
  var btn = document.getElementById("terminal-submit");
  var output = document.getElementById("terminal-output");
  if (!input || !btn || !output) return;

  // Purely cosmetic -- every destination here is already public. Finding
  // one of these is just a fun shortcut to a real file, not a real gate.
  var CODES = {
    "CASCADE": { msg: "ACCESS GRANTED — redirecting to the Team Cascade file…", url: "/classified-files/team-cascade/" },
    "GLACIER15": { msg: "ACCESS GRANTED — redirecting to the Glacier 15 file…", url: "/classified-files/geographic-locations/glacier-15/" },
    "REFENSE": { msg: "ACCESS GRANTED — redirecting to the Refense Doctrine…", url: "/chronicles/refense-doctrine/" },
    "XENDER": { msg: "ACCESS GRANTED — redirecting to the Xender Machines file…", url: "/classified-files/xender-machines/" },
    "DOLPHE": { msg: "ACCESS GRANTED — redirecting to Captain Dolphe's file…", url: "/classified-files/captains/dolphe/" },
    "MAINFRAME": { msg: "ACCESS GRANTED — booting a hidden program…", url: "/play/declassify/" }
  };

  function attempt() {
    var raw = input.value.trim().toUpperCase();
    if (!raw) return;
    var hit = CODES[raw];
    output.classList.remove("is-granted", "is-denied");
    if (hit) {
      output.textContent = hit.msg;
      output.classList.add("is-granted");
      input.disabled = true;
      btn.disabled = true;
      setTimeout(function () {
        window.location.href = hit.url;
      }, 900);
    } else {
      output.textContent = "ACCESS DENIED — invalid clearance code.";
      output.classList.add("is-denied");
      input.classList.remove("shake");
      // Force reflow so the shake animation can restart on repeated wrong guesses.
      void input.offsetWidth;
      input.classList.add("shake");
    }
  }

  btn.addEventListener("click", attempt);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") attempt();
  });
})();
