// Click any article screenshot to open it big; arrows / swipe to browse, Esc or click to close.
(function () {
  var imgs = [], cur = 0, box, pic, cap;
  function build() {
    box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = '<button class="lb-prev" aria-label="Previous">&#8249;</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lb-next" aria-label="Next">&#8250;</button>' +
      '<button class="lb-close" aria-label="Close">&times;</button>';
    document.body.appendChild(box);
    pic = box.querySelector("img");
    cap = box.querySelector("figcaption");
    box.addEventListener("click", function (e) {
      if (e.target.closest(".lb-prev")) { show(cur - 1); return; }
      if (e.target.closest(".lb-next")) { show(cur + 1); return; }
      close();
    });
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
    });
  }
  function show(i) {
    cur = (i + imgs.length) % imgs.length;
    var img = imgs[cur];
    pic.src = img.currentSrc || img.src;
    pic.alt = img.alt;
    var fc = img.closest("figure") && img.closest("figure").querySelector("figcaption");
    cap.innerHTML = fc ? fc.innerHTML : "";
    box.classList.add("open");
    document.documentElement.classList.add("lb-lock");
  }
  function close() {
    box.classList.remove("open");
    document.documentElement.classList.remove("lb-lock");
  }
  document.addEventListener("DOMContentLoaded", function () {
    imgs = Array.prototype.slice.call(document.querySelectorAll("main figure img, .hero .shot img"));
    if (!imgs.length) return;
    build();
    imgs.forEach(function (img, i) {
      img.classList.add("zoomable");
      img.addEventListener("click", function () { show(i); });
    });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(cur - 1);
      else if (e.key === "ArrowRight") show(cur + 1);
    });
  });
})();
