    (function () {
  'use strict';

  const track     = document.getElementById('heroTrack');
  const slides    = track.querySelectorAll('.hero-slide');
  const dots      = document.querySelectorAll('#heroDots .hero-dot');
  const prevBtn   = document.getElementById('heroPrev');
  const nextBtn   = document.getElementById('heroNext');
  const progressEl= document.getElementById('heroProgress');

  const TOTAL     = slides.length;
  const INTERVAL  = 5000;   // ms between auto-slides
  const FPS       = 60;

  let current     = 0;
  let autoTimer   = null;
  let progTimer   = null;
  let progStart   = null;
  let paused      = false;

  /* ── go to slide ─────────────────── */
  function goTo(index) {
    // Deactivate current
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + TOTAL) % TOTAL;

    // Activate new
    track.style.transform = `translateX(-${current * 100}%)`;
    slides[current].classList.add('is-active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  /* ── progress bar animation ──────── */
  function startProgress() {
    clearInterval(progTimer);
    progressEl.style.transition = 'none';
    progressEl.style.width = '0%';

    progStart = performance.now();

    progTimer = setInterval(() => {
      if (paused) return;
      const elapsed = performance.now() - progStart;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      progressEl.style.transition = 'none';
      progressEl.style.width = pct + '%';
    }, 1000 / FPS);
  }

  /* ── auto-advance ────────────────── */
  function startAuto() {
    clearInterval(autoTimer);
    startProgress();
    autoTimer = setInterval(() => {
      if (!paused) {
        goTo(current + 1);
        startProgress();
      }
    }, INTERVAL);
  }

  function resetAuto() {
    startAuto();
  }

  /* ── dot clicks ──────────────────── */
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      goTo(parseInt(this.dataset.index));
      resetAuto();
    });
  });

  /* ── arrow clicks ────────────────── */
  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  /* ── keyboard ────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAuto(); }
  });

  /* ── touch / swipe ───────────────── */
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAuto();
    }
  }, { passive: true });

  /* ── pause on hover ──────────────── */
  const banner = document.getElementById('heroBanner');
  banner.addEventListener('mouseenter', () => { paused = true; });
  banner.addEventListener('mouseleave', () => {
    paused = false;
    progStart = performance.now() - (parseFloat(progressEl.style.width) / 100 * INTERVAL);
  });

  /* ── init ─────────────────────────── */
  goTo(0);
  startAuto();
})();