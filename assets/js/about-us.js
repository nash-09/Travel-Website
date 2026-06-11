(function () {
      const counters = document.querySelectorAll('.stat-number');
      const speed = 2000;

      function parseTarget(el) {
        const raw = el.textContent.replace(/[^0-9]/g, '');
        return parseInt(raw, 10);
      }

      function formatNumber(n, suffix) {
        if (n >= 1000) return n.toLocaleString('en-IN') + suffix;
        return n + suffix;
      }

      function animateCounter(el) {
        const suffix = el.textContent.replace(/[0-9,]/g, '');
        const target = parseTarget(el);
        const increment = Math.ceil(target / (speed / 16));
        let current = 0;

        const update = () => {
          current = Math.min(current + increment, target);
          el.textContent = formatNumber(current, suffix);
          if (current < target) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(el => observer.observe(el));
    })();