// ===== Mayank Portfolio JS =====
(function () {
  const msScrollFill = document.getElementById("msScrollFill");
  const msYearNow = document.getElementById("msYearNow");
  const msThemeToggle = document.getElementById("msThemeToggle");

  // Year
  if (msYearNow) msYearNow.textContent = String(new Date().getFullYear());

  // Scroll progress
  const msUpdateProgress_8a7a = () => {
    const msScrollTop = window.scrollY || document.documentElement.scrollTop;
    const msDocHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const msPercent = msDocHeight > 0 ? (msScrollTop / msDocHeight) * 100 : 0;
    if (msScrollFill) msScrollFill.style.width = `${msPercent}%`;
  };
  window.addEventListener("scroll", msUpdateProgress_8a7a, { passive: true });
  msUpdateProgress_8a7a();

  // Reveal on scroll
  const msRevealTargets = Array.from(
    document.querySelectorAll(".ms-revealItem_a0d2"),
  );
  const msObs = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          entry.target.classList.add("ms-revealOn_55a1");
      }),
    { threshold: 0.12 },
  );
  msRevealTargets.forEach((el) => msObs.observe(el));

  // Theme toggle
  const msBody = document.body;
  const msSavedTheme = localStorage.getItem("msTheme");
  if (msSavedTheme === "lite") msBody.classList.add("ms-themeLite_2d50");

  if (msThemeToggle) {
    msThemeToggle.addEventListener("click", () => {
      msBody.classList.toggle("ms-themeLite_2d50");
      localStorage.setItem(
        "msTheme",
        msBody.classList.contains("ms-themeLite_2d50") ? "lite" : "dark",
      );
    });
  }

  // ===== Custom Cursor =====
  const dot = document.getElementById("msCursorDot");
  const ring = document.getElementById("msCursorRing");

  let mx = window.innerWidth / 2,
    my = window.innerHeight / 2;
  let rx = mx,
    ry = my;

  window.addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px)`;
    },
    { passive: true },
  );

  const msCursorLoop_1a0a = () => {
    // smooth follow for ring
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(msCursorLoop_1a0a);
  };
  requestAnimationFrame(msCursorLoop_1a0a);

  const msHoverTargets =
    "a, button, .ms-clickCard_1bd2, .ms-modalGallery_7a2f img";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(msHoverTargets))
      ring?.classList.add("ms-cursorHover_2a9b");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(msHoverTargets))
      ring?.classList.remove("ms-cursorHover_2a9b");
  });

  // ===== Modal logic =====
  const msShade = document.getElementById("msModalShade");
  const msModalCards = Array.from(
    document.querySelectorAll(".ms-modalCard_2f0a"),
  );
  const msDetailButtons = Array.from(document.querySelectorAll("[data-modal]"));
  const msCloseButtons = Array.from(document.querySelectorAll("[data-close]"));

  const msCloseAllModals_1a9d = () => {
    msModalCards.forEach((m) => (m.hidden = true));
    if (msShade) msShade.classList.remove("ms-modalShadeOn_73b1");
    document.body.style.overflow = "";
  };

  const msOpenModal_7c1e = (id) => {
    const modal = document.getElementById(id);
    if (!modal || !msShade) return;
    msCloseAllModals_1a9d();
    modal.hidden = false;
    msShade.classList.add("ms-modalShadeOn_73b1");
    document.body.style.overflow = "hidden";
  };

  msDetailButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // so card click doesn't trigger
      const id = btn.getAttribute("data-modal");
      if (id) msOpenModal_7c1e(id);
    });
  });

  msCloseButtons.forEach((btn) =>
    btn.addEventListener("click", msCloseAllModals_1a9d),
  );
  if (msShade) msShade.addEventListener("click", msCloseAllModals_1a9d);

  // ===== Lightbox (click screenshot => fullscreen) =====
  const msImagePreview = document.getElementById("msImagePreview");
  const msImagePreviewImg = document.getElementById("msImagePreviewImg");
  const msImagePreviewClose = document.getElementById("msImagePreviewClose");

  const msOpenPreview_1a2b = (src, alt) => {
    if (!msImagePreview || !msImagePreviewImg) return;
    msImagePreviewImg.src = src;
    msImagePreviewImg.alt = alt || "Project preview";
    msImagePreview.hidden = false;
  };

  const msClosePreview_7e1a = () => {
    if (!msImagePreview || !msImagePreviewImg) return;
    msImagePreview.hidden = true;
    msImagePreviewImg.src = "";
  };

  document.addEventListener("click", (e) => {
    const img = e.target.closest(".ms-modalGallery_7a2f img");
    if (img) {
      msOpenPreview_1a2b(img.src, img.alt);
      return;
    }

    // close preview if open and clicking outside image
    if (msImagePreview && !msImagePreview.hidden) {
      const clickedImage = e.target.closest("#msImagePreviewImg");
      const clickedClose = e.target.closest("#msImagePreviewClose");
      if (!clickedImage || clickedClose) msClosePreview_7e1a();
    }
  });

  msImagePreviewClose?.addEventListener("click", msClosePreview_7e1a);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (msImagePreview && !msImagePreview.hidden) msClosePreview_7e1a();
      else msCloseAllModals_1a9d();
    }
  });

  // ===== Click project card => go to project page =====
  const cards = Array.from(document.querySelectorAll(".ms-clickCard_1bd2"));
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const slug = card.getAttribute("data-project") || "project";
      // go to project.html with query string
      window.location.href = `project.html?project=${encodeURIComponent(slug)}`;
    });
  });
})();
