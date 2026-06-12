// Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // Testimonial section
    (function () {
      const track = document.getElementById('testimonialTrack');
      const dots  = document.querySelectorAll('#testimonialDots .dot');
      const total = dots.length;
      let current = 0;
      let autoTimer = null;

      function goTo(index) {
        current = index;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => {
          d.classList.toggle('active', i === current);
          d.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });
      }

      function next() {
        goTo((current + 1) % total);
      }

      function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(next, 4500);
      }

      // Dot click
      dots.forEach(dot => {
        dot.addEventListener('click', function () {
          goTo(parseInt(this.dataset.index));
          startAuto(); // reset timer on manual click
        });
      });

      // Touch / swipe support
      let touchStartX = 0;
      track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
      track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          diff > 0 ? goTo((current + 1) % total) : goTo((current - 1 + total) % total);
          startAuto();
        }
      }, { passive: true });

      // Keyboard accessibility
      track.setAttribute('tabindex', '0');
      track.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { goTo((current + 1) % total); startAuto(); }
        if (e.key === 'ArrowLeft')  { goTo((current - 1 + total) % total); startAuto(); }
      });

      // Pause on hover
      track.addEventListener('mouseenter', () => clearInterval(autoTimer));
      track.addEventListener('mouseleave', startAuto);

      // Scroll-to-top
      const scrollBtn = document.getElementById('scrollTopBtn');
      window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
      });
      scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      scrollBtn.style.display = 'none';

      // Init
      goTo(0);
      startAuto();
    })();


    // Partner's Slider
    /* Sync partners dot active state with Bootstrap carousel */
(function () {
  var carousel = document.getElementById('partnersCarousel');
  if (!carousel) return;
  carousel.addEventListener('slide.bs.carousel', function (e) {
    document.querySelectorAll('.pcarousel-dot').forEach(function (dot, i) {
      dot.classList.toggle('active', i === e.to);
    });
  });
}());
