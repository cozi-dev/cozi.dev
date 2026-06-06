(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // theme toggle (initial theme is set inline in head to avoid FOUC)
    var root = document.documentElement;
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        localStorage.setItem("theme", next);
      });
    }

    // mobile nav
    var burger = document.querySelector(".nav-burger");
    var nav = document.querySelector(".site-nav");
    if (burger && nav) {
      burger.addEventListener("click", function () {
        nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", nav.classList.contains("is-open"));
      });
    }

    // copy buttons on code blocks
    document.querySelectorAll(".post-body .highlight").forEach(function (block) {
      var btn = document.createElement("button");
      btn.className = "code-copy";
      btn.type = "button";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        var code = block.querySelector("code");
        if (!code) return;
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(code.innerText).then(function () {
          btn.textContent = "Copied!";
          setTimeout(function () {
            btn.textContent = "Copy";
          }, 2000);
        }).catch(function () {});
      });
      block.appendChild(btn);
    });

    // copy permalink button (single post share row)
    var copyLink = document.querySelector(".copy-link");
    if (copyLink) {
      copyLink.addEventListener("click", function () {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(copyLink.dataset.url).then(function () {
          copyLink.textContent = "Copied!";
          setTimeout(function () {
            copyLink.textContent = "Copy link";
          }, 2000);
        }).catch(function () {});
      });
    }
  });
})();
