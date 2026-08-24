(function () {
  // Theme: default to system preference, allow session override (no storage)
  var root = document.documentElement;
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", prefersDark ? "dark" : "light");

  function paintToggleIcon() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.textContent = root.getAttribute("data-theme") === prefersDark ? "dark" : "light" ? "\u2600" : "\u263D";
  }
  paintToggleIcon();

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === prefersDark ? "dark" : "light" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        paintToggleIcon();
      });
    }

    // Mobile sidebar
    var menuBtn = document.getElementById("menuToggle");
    var sidebar = document.getElementById("sidebar");
    var scrim = document.getElementById("sidebarScrim");
    if (menuBtn && sidebar && scrim) {
      function close() { sidebar.classList.remove("open"); scrim.classList.remove("show"); }
      menuBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        scrim.classList.toggle("show");
      });
      scrim.addEventListener("click", close);
      sidebar.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    }

    // Active section highlight on scroll
    var links = document.querySelectorAll(".sidebar a[data-section]");
    var sections = document.querySelectorAll(".section[id]");
    if (links.length && sections.length) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.classList.remove("active"); });
            var match = document.querySelector('.sidebar a[data-section="' + entry.target.id + '"]');
            if (match) match.classList.add("active");
          }
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      sections.forEach(function (s) { obs.observe(s); });
    }
  });
})();
