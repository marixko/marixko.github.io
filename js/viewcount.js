/* Lightweight page-view counter via counterapi.dev (v2).
 * Requires a free workspace registered at https://counterapi.dev
 * (slug set in WORKSPACE below). Public counters, no API key needed.
 * Elements: <span class="js-view-count" data-slug="..." [data-increment]
 *                 data-label="views"></span>  (start hidden)
 */
(function () {
  "use strict";
  var WORKSPACE = "marixko";
  var BASE = "https://api.counterapi.dev/v2/" + WORKSPACE + "/";

  function render(el, n) {
    var label = el.getAttribute("data-label") || "views";
    el.innerHTML =
      '<span class="middot-divider"></span> ' +
      n.toLocaleString() + " " + label;
    el.hidden = false;
  }

  var nodes = document.querySelectorAll(".js-view-count");
  Array.prototype.forEach.call(nodes, function (el) {
    var slug = el.getAttribute("data-slug");
    if (!slug) return;
    var increment = el.hasAttribute("data-increment");
    var url = BASE + encodeURIComponent(slug) + (increment ? "/up" : "");
    fetch(url, { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var n = j && j.data && j.data.up_count;
        if (typeof n === "number") render(el, n);
      })
      .catch(function () { /* offline / blocked: leave hidden */ });
  });
})();
