document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.textContent = isOpen ? "✕" : "☰";
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        toggle.textContent = "☰";
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var button = form.querySelector("button[type=submit]");
      button.disabled = true;
      if (status) status.textContent = "Sending...";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            if (status) status.textContent = "Thanks — we'll get back to you within one business day.";
            form.reset();
          } else {
            if (status) status.textContent = "Something went wrong — please email us directly at hello@letaiwork.us instead.";
          }
        })
        .catch(function () {
          if (status) status.textContent = "Something went wrong — please email us directly at hello@letaiwork.us instead.";
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  }

  var year = document.querySelector("#year");
  if (year) {
    year.textContent = "2026";
  }
});
