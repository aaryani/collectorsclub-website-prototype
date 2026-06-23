/* =========================================================
   Crown & Chrone — interactions
   Vanilla JS, no dependencies, no backend.
   ========================================================= */
(function () {
  "use strict";

  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ---------- inline SVG icon set (resolution independent) ---------- */
  const ICONS = {
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>',
    chart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 19V5M4 19h16"/><path d="M8 16l3-4 3 2 4-6"/></svg>',
    crown:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8l3 4 5-7 5 7 3-4 1 11H3L4 8z"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8a2 2 0 012-2h12a2 2 0 012 2 2 2 0 000 4 2 2 0 010 4H6a2 2 0 01-2-2 2 2 0 000-4 2 2 0 010-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/></svg>',
    bell:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 004 0"/></svg>',
    members:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0111 0"/><path d="M16 5.5a3 3 0 010 5.6"/><path d="M17.5 19a5 5 0 00-3-4.6"/></svg>',
    diamond:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4l-3 5 6 11 6-11-3-5"/></svg>',
    gavel:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4l6 6-3 3-6-6z"/><path d="M11.5 6.5l-7 7 3 3 7-7"/><path d="M5 21h9"/></svg>',
    calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/></svg>',
    home:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/></svg>',
    grid:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    x:      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.1L8 21H5l7.4-8.5L4.6 3H11l4.5 5.6L17.5 3zm-1.1 16h1.7L8 4.8H6.2L16.4 19z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.4h3.1V21H3.4V8.4zM9 8.4h3v1.7h.05c.42-.8 1.45-1.65 3-1.65 3.2 0 3.8 2.1 3.8 4.9V21h-3.1v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9V8.4z"/></svg>'
  };
  $$("[data-icon]").forEach(el => { const k = el.getAttribute("data-icon"); if (ICONS[k]) el.innerHTML = ICONS[k]; });

  /* ---------- sticky nav ---------- */
  const nav = $("#nav");
  const onScroll = () => {
    nav.classList.toggle("is-stuck", window.scrollY > 30);
    toTop.classList.toggle("is-show", window.scrollY > 600);
  };

  /* ---------- mobile menu ---------- */
  const burger = $("#burger");
  const menu = $("#mobileMenu");
  const scrim = $("#scrim");
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    scrim.classList.toggle("is-open", open);
    scrim.hidden = !open;
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  scrim.addEventListener("click", () => setMenu(false));
  $$("#mobileMenu a").forEach(a => a.addEventListener("click", () => setMenu(false)));

  /* ---------- scroll reveal ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(el => io.observe(el));
    // Failsafe: reveal anything already in/above the viewport once loaded.
    const sweep = () => reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
    });
    window.addEventListener("load", sweep);
    setTimeout(sweep, 700);
  } else {
    reveals.forEach(el => el.classList.add("is-in"));
  }

  /* ---------- animated counters ---------- */
  const fmt = (n) => n >= 1000 ? n.toLocaleString("en-US") : String(n);
  function runCount(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const dur = 1600; const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.floor(eased * target)) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const statsIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$("[data-count]", e.target).forEach(runCount);
        statsIO.disconnect();
      }
    });
  }, { threshold: 0.4 });
  if ($("#stats")) statsIO.observe($("#stats"));

  /* ---------- market chart (animated SVG path) ---------- */
  const seriesByRange = {
    "1M": [60,58,64,62,70,68,74,80,78,86,90,100],
    "6M": [40,52,48,60,55,70,66,82,78,92,88,104],
    "1Y": [30,42,38,55,50,68,60,72,85,80,96,110],
    "5Y": [20,28,46,40,62,58,80,74,96,90,118,130]
  };
  const W = 600, H = 220, PAD = 14;
  function buildPath(data) {
    const max = Math.max(...data), min = Math.min(...data);
    const stepX = (W - PAD * 2) / (data.length - 1);
    const pts = data.map((v, i) => {
      const x = PAD + i * stepX;
      const y = H - PAD - ((v - min) / (max - min || 1)) * (H - PAD * 2);
      return [x, y];
    });
    // smooth-ish line
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    const area = d + ` L ${pts[pts.length - 1][0]} ${H} L ${pts[0][0]} ${H} Z`;
    return { line: d, area, last: pts[pts.length - 1] };
  }
  const chartLine = $("#chartLine"), chartArea = $("#chartArea"), chartDot = $("#chartDot");
  function drawChart(range) {
    if (!chartLine) return;
    const { line, area, last } = buildPath(seriesByRange[range]);
    chartArea.setAttribute("d", area);
    chartLine.setAttribute("d", line);
    chartDot.setAttribute("cx", last[0]);
    chartDot.setAttribute("cy", last[1]);
    const len = chartLine.getTotalLength();
    chartLine.style.transition = "none";
    chartLine.style.strokeDasharray = len;
    chartLine.style.strokeDashoffset = len;
    // force reflow then animate
    void chartLine.getBoundingClientRect();
    chartLine.style.transition = "stroke-dashoffset 1.4s cubic-bezier(.22,.61,.36,1)";
    chartLine.style.strokeDashoffset = "0";
  }
  let chartDrawn = false;
  const ensureChart = () => { if (!chartDrawn) { drawChart("1M"); chartDrawn = true; } };
  if ($("#chart")) {
    if ("IntersectionObserver" in window) {
      const chartIO = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) ensureChart(); });
      }, { threshold: 0.25 });
      chartIO.observe($("#chart"));
    }
    // Failsafe: guarantee the chart is drawn even if the observer never fires.
    window.addEventListener("load", () => setTimeout(ensureChart, 900));
  }
  $$(".market__range button").forEach(b => b.addEventListener("click", () => {
    $$(".market__range button").forEach(x => x.classList.remove("is-active"));
    b.classList.add("is-active");
    drawChart(b.textContent.trim());
  }));

  /* ---------- modals ---------- */
  const modal = $("#modal"), modalBody = $("#modalBody");
  let lastFocus = null;
  const MODALS = {
    join: `
      <p class="eyebrow">By Invitation</p>
      <h3>Become a Member</h3>
      <p>Apply to join Crown &amp; Chrone. We review every application personally — this demo simply collects your interest.</p>
      <form class="modal__form js-fake">
        <input type="text" placeholder="Full name" required />
        <input type="email" placeholder="Email address" required />
        <input type="text" placeholder="What do you collect?" />
        <button type="submit" class="btn btn--gold btn--block">Request Invitation</button>
        <p class="modal__note">No account is created — this is a design prototype.</p>
      </form>`,
    signin: `
      <p class="eyebrow">Members</p>
      <h3>Sign In</h3>
      <p>Welcome back to the club. Authentication isn&rsquo;t wired up in this design prototype.</p>
      <form class="modal__form js-fake">
        <input type="email" placeholder="Email address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" class="btn btn--gold btn--block">Enter the Club</button>
        <p class="modal__note">Demo only — no credentials are stored.</p>
      </form>`,
    video: `
      <p class="eyebrow">The Film</p>
      <h3>Inside Crown &amp; Chrone</h3>
      <div class="modal__video"><span class="modal__play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span></div>
      <p>A 90-second look at the world of our collectors. Video playback is mocked in this prototype.</p>`,
    search: `
      <p class="eyebrow">Explore</p>
      <h3>Search the Collection</h3>
      <p>Find watches, cars, handbags and market data across Crown &amp; Chrone. Search is mocked in this design prototype.</p>
      <form class="modal__form js-fake">
        <input type="search" placeholder="Try &ldquo;Patek Philippe&rdquo; or &ldquo;Ferrari 250&rdquo;" autofocus />
        <button type="submit" class="btn btn--gold btn--block">Search</button>
      </form>`
  };
  function openModal(key) {
    if (!MODALS[key]) return;
    lastFocus = document.activeElement;
    modalBody.innerHTML = MODALS[key];
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const f = modal.querySelector("input, button");
    if (f) f.focus();
    wireFakeForms();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function wireFakeForms() {
    $$(".js-fake", modal).forEach(form => form.addEventListener("submit", (e) => {
      e.preventDefault();
      modalBody.innerHTML = `
        <div class="modal__ok">
          <div class="check">&#10003;</div>
          <h3>Thank You</h3>
          <p>Your interest has been noted. In the full product, you&rsquo;d hear from our membership team shortly.</p>
          <button class="btn btn--gold btn--block js-modal-close">Close</button>
        </div>`;
      $$(".js-modal-close", modal).forEach(b => b.addEventListener("click", closeModal));
    }));
  }
  document.addEventListener("click", (e) => {
    const opener = e.target.closest(".js-modal");
    if (opener) { e.preventDefault(); setMenu(false); openModal(opener.dataset.modal); return; }
    if (e.target.closest(".js-modal-close")) { closeModal(); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (!modal.hidden) closeModal(); setMenu(false); }
  });

  /* ---------- newsletter (demo) ---------- */
  const newsForm = $("#newsForm");
  if (newsForm) newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    $("#newsMsg").textContent = "Thank you — you're on the list (demo).";
    newsForm.reset();
  });

  /* ---------- mobile tab bar active state ---------- */
  const tabLinks = $$(".tabbar a");
  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = "#" + e.target.id;
        tabLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
      }
    });
  }, { threshold: 0.5 });
  ["#hero", "#collections", "#market"].forEach(sel => { const el = $(sel); if (el) sectionIO.observe(el); });

  /* ---------- back to top ---------- */
  const toTop = $("#toTop");
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
