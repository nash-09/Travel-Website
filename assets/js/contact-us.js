  /* ── Scroll Reveal ── */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    /* ── Form Validation & Submit ── */
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('successToast');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      // Simulate submission
      const btn = form.querySelector('.btn-send');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = 'Send Message <i class="bi bi-send-fill"></i>';
        form.reset();
        form.classList.remove('was-validated');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
      }, 1600);
    });