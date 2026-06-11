// Pagination active state
  document.querySelectorAll('.custom-pagination .page-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const item = this.closest('.page-item');
      if (item.classList.contains('disabled')) return;
      document.querySelectorAll('.custom-pagination .page-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Newsletter subscribe
  document.querySelector('.btn-subscribe').addEventListener('click', function() {
    const input = this.previousElementSibling;
    if (input.value && input.value.includes('@')) {
      this.textContent = '✓ Subscribed!';
      this.style.background = '#27ae60';
      input.value = '';
      setTimeout(() => {
        this.innerHTML = 'Subscribe <i class="bi bi-chevron-double-right"></i>';
        this.style.background = '';
      }, 3000);
    } else {
      input.style.borderColor = '#e03';
      setTimeout(() => input.style.borderColor = '', 1500);
    }
  });

  // Search
  document.querySelector('.search-input-wrap button').addEventListener('click', function() {
    const val = this.previousElementSibling.value.trim();
    if (val) alert('Searching for: ' + val);
  });
  document.querySelector('.search-input-wrap input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim()) alert('Searching for: ' + this.value.trim());
  });