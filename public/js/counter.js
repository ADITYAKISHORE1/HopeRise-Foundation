/* ============================================
   HopeRise — Animated Counter
   ============================================ */

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  if (!target) return;
  const duration = 2200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    el.textContent = target >= 1000 ? current.toLocaleString() : current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target >= 1000 ? target.toLocaleString() : target;
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll
          ? entry.target.querySelectorAll('.counter')
          : [entry.target];

        counters.forEach(c => {
          if (!c.dataset.animated) {
            c.dataset.animated = 'true';
            animateCounter(c);
          }
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Observe individual counters
  document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

  // Observe containers with counters
  document.querySelectorAll('.hero-stats, .impact-stats-grid').forEach(el => {
    counterObserver.observe(el);
  });
});
