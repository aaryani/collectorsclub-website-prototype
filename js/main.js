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
    home:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/></svg>',
    grid:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    x:      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.1L8 21H5l7.4-8.5L4.6 3H11l4.5 5.6L17.5 3zm-1.1 16h1.7L8 4.8H6.2L16.4 19z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.4h3.1V21H3.4V8.4zM9 8.4h3v1.7h.05c.42-.8 1.45-1.65 3-1.65 3.2 0 3.8 2.1 3.8 4.9V21h-3.1v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9V8.4z"/></svg>'
  };
  $$("[data-icon]").forEach(el => { const k = el.getAttribute("data-icon"); if (ICONS[k]) el.innerHTML = ICONS[k]; });

  /* ---------- collection card artwork (inline SVG → CSS background) ---------- */
  const ART = {
    watch: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><radialGradient id='g' cx='50%' cy='42%' r='65%'><stop offset='0%' stop-color='%23262017'/><stop offset='100%' stop-color='%230b0b0d'/></radialGradient></defs><rect width='400' height='300' fill='url(%23g)'/><circle cx='200' cy='150' r='86' fill='%23121214' stroke='%23c9a24b' stroke-width='3'/><circle cx='200' cy='150' r='72' fill='none' stroke='%23433a26' stroke-width='1'/><g stroke='%23e8c87a' stroke-width='3' stroke-linecap='round'><line x1='200' y1='150' x2='200' y2='100'/><line x1='200' y1='150' x2='236' y2='168'/></g><circle cx='200' cy='150' r='5' fill='%23e8c87a'/><g stroke='%23c9a24b' stroke-width='2'><line x1='200' y1='78' x2='200' y2='90'/><line x1='272' y1='150' x2='260' y2='150'/><line x1='200' y1='222' x2='200' y2='210'/><line x1='128' y1='150' x2='140' y2='150'/></g><rect x='186' y='52' width='28' height='16' rx='3' fill='%231a1a1e' stroke='%23c9a24b'/><rect x='186' y='232' width='28' height='16' rx='3' fill='%231a1a1e' stroke='%23c9a24b'/></svg>`,
    car: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='cg' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='%23241d14'/><stop offset='100%' stop-color='%230b0b0d'/></linearGradient></defs><rect width='400' height='300' fill='url(%23cg)'/><path d='M40 196c0-8 8-14 22-18l46-40c10-9 24-14 40-14h70c20 0 38 8 54 22l40 30c16 3 28 9 28 20v14H40z' fill='%23141416' stroke='%23c9a24b' stroke-width='2.5'/><path d='M132 130c8-8 18-12 30-12h54c14 0 26 6 36 16l16 16H120z' fill='%231f1a12' stroke='%23433a26'/><circle cx='118' cy='196' r='30' fill='%230d0d0f' stroke='%23c9a24b' stroke-width='3'/><circle cx='118' cy='196' r='12' fill='%231a1a1e' stroke='%23e8c87a'/><circle cx='292' cy='196' r='30' fill='%230d0d0f' stroke='%23c9a24b' stroke-width='3'/><circle cx='292' cy='196' r='12' fill='%231a1a1e' stroke='%23e8c87a'/><ellipse cx='60' cy='150' rx='12' ry='6' fill='%23e8c87a' opacity='.7'/></svg>`,
    bag: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='bg' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='%23231d15'/><stop offset='100%' stop-color='%230b0b0d'/></linearGradient></defs><rect width='400' height='300' fill='url(%23bg)'/><path d='M150 110c0-22 14-38 50-38s50 16 50 38' fill='none' stroke='%23c9a24b' stroke-width='4'/><path d='M120 116h160l14 120H106z' fill='%23161616' stroke='%23c9a24b' stroke-width='2.5'/><path d='M120 116h160l3 26H117z' fill='%231f1a12'/><rect x='185' y='150' width='30' height='40' rx='5' fill='%231a1a1e' stroke='%23e8c87a' stroke-width='2'/><line x1='200' y1='150' x2='200' y2='190' stroke='%23e8c87a'/><circle cx='200' cy='168' r='4' fill='%23e8c87a'/></svg>`,
    art: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='%230b0b0d'/><rect x='96' y='52' width='208' height='196' rx='4' fill='%23161616' stroke='%23c9a24b' stroke-width='8'/><rect x='112' y='68' width='176' height='164' fill='%231b1812'/><circle cx='168' cy='120' r='26' fill='%23c9a24b' opacity='.85'/><path d='M112 232l52-70 34 34 30-40 60 76z' fill='%23433a26'/><path d='M112 232l52-70 34 34 30-40 60 76z' fill='none' stroke='%23e8c87a' stroke-width='1.5' opacity='.5'/></svg>`
  };
  $$("[data-art]").forEach(el => {
    const k = el.getAttribute("data-art");
    if (ART[k]) el.style.backgroundImage = `url("data:image/svg+xml,${ART[k]}")`;
  });

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
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.14 });
  $$(".reveal").forEach(el => io.observe(el));

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
  const chartIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting && !chartDrawn) { drawChart("1M"); chartDrawn = true; } });
  }, { threshold: 0.3 });
  if ($("#chart")) chartIO.observe($("#chart"));
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
      <p>A 90-second look at the world of our collectors. Video playback is mocked in this prototype.</p>`
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
