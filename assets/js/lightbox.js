(function () {
  "use strict";

  var SELECTOR = ".entry-content img, .page-wrap img, .timeline-entry-image img";
  var SKIP_ANCESTOR_SELECTOR =
    ".nav-card-icon, .entry-icon, .section-card-icon, .hero-card-icon, " +
    ".search-result-icon, .site-brand-icon, .lightbox-overlay, " +
    "#declassify-game, .game-image, .game-image-wrap";

  var overlay = null;
  var imgEl = null;
  var captionEl = null;
  var lastFocused = null;

  function closest(el, selector) {
    if (el.closest) return el.closest(selector);
    // Minimal fallback, not expected to be needed in evergreen browsers.
    while (el) {
      if (el.matches && el.matches(selector)) return el;
      el = el.parentElement;
    }
    return null;
  }

  function buildOverlay() {
    overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.hidden = true;
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close image">&times;</button>' +
      '<img class="lightbox-image" alt="">' +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(overlay);

    imgEl = overlay.querySelector(".lightbox-image");
    captionEl = overlay.querySelector(".lightbox-caption");

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeLightbox();
    });
    overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  }

  function openLightbox(src, alt, triggerEl) {
    if (!overlay) buildOverlay();
    imgEl.src = src;
    imgEl.alt = alt || "";
    if (alt) {
      captionEl.textContent = alt;
      captionEl.hidden = false;
    } else {
      captionEl.textContent = "";
      captionEl.hidden = true;
    }
    overlay.hidden = false;
    document.body.classList.add("lightbox-open");
    lastFocused = triggerEl || document.activeElement;
    overlay.querySelector(".lightbox-close").focus();
  }

  function closeLightbox() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove("lightbox-open");
    imgEl.src = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.addEventListener("keydown", function (e) {
    if (overlay && !overlay.hidden && e.key === "Escape") closeLightbox();
  });

  document.addEventListener("DOMContentLoaded", function () {
    var imgs = document.querySelectorAll(SELECTOR);
    imgs.forEach(function (img) {
      if (closest(img, SKIP_ANCESTOR_SELECTOR)) return;
      if (img.closest("a")) return; // already a link -- don't hijack it
      img.classList.add("lightbox-trigger");
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "Enlarge image");
      img.addEventListener("click", function () {
        openLightbox(img.currentSrc || img.src, img.alt, img);
      });
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(img.currentSrc || img.src, img.alt, img);
        }
      });
    });
  });
})();
