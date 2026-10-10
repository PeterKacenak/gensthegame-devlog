// SK / EN switch: remembers the reader's choice; Slovak by default.
(function () {
  var root = document.documentElement;
  var lang = "sk";
  try { lang = localStorage.getItem("devlog-lang") || lang; } catch (e) {}
  root.setAttribute("data-lang", lang);
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-set]");
    if (!b) return;
    var l = b.getAttribute("data-set");
    root.setAttribute("data-lang", l);
    try { localStorage.setItem("devlog-lang", l); } catch (e) {}
  });
})();
