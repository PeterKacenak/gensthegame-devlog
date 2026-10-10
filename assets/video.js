// YouTube "lite" player: shows the thumbnail; a click loads the real player.
// Opened straight from disk (file://) YouTube refuses to play (error 153), so the click opens youtube.com instead.
(function () {
  document.addEventListener("click", function (ev) {
    var box = ev.target.closest(".video-frame[data-yt]");
    if (!box || box.querySelector("iframe")) return;
    ev.preventDefault();
    var id = box.getAttribute("data-yt");
    if (location.protocol === "file:") {
      window.open("https://www.youtube.com/watch?v=" + id, "_blank", "noopener");
      return;
    }
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
    f.title = box.getAttribute("data-title") || "YouTube";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.referrerPolicy = "strict-origin-when-cross-origin";
    f.allowFullscreen = true;
    box.innerHTML = "";
    box.appendChild(f);
  });
})();
