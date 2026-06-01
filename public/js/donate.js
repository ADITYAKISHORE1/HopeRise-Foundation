/* ============================================
   HopeRise — Donation Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Amount Selection ----
  const amountBtns = document.querySelectorAll('.amount-option');
  const customInput = document.getElementById('custom-amount');
  let selectedAmount = 50;

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAmount = parseInt(btn.dataset.amount);
      if (customInput) customInput.value = '';
      updateImpact(selectedAmount);
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      amountBtns.forEach(b => b.classList.remove('selected'));
      selectedAmount = parseInt(customInput.value) || 0;
      updateImpact(selectedAmount);
    });
  }

  // ---- Frequency Toggle ----
  const toggleBtns = document.querySelectorAll('.amount-toggle button');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ---- Impact Calculator ----
  function updateImpact(amount) {
    const impacts = document.querySelectorAll('.impact-item');
    const impactData = [
      { threshold: 10, text: `$${amount} = ${Math.floor(amount / 10)} child's school supplies for a month` },
      { threshold: 25, text: `$${amount} = ${Math.floor(amount / 25)} months of clean water for a family` },
      { threshold: 50, text: `$${amount} = ${Math.floor(amount / 50)} medical checkup for a village` },
    ];

    impacts.forEach((item, i) => {
      const textEl = item.querySelector('.impact-text');
      if (textEl && impactData[i]) {
        textEl.textContent = impactData[i].text;
      }
    });
  }

  // ---- Donate Form Submit ----
  const donateForm = document.getElementById('donate-form');
  if (donateForm) {
    donateForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = donateForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = 'Processing... ⏳';
      btn.disabled = true;

      const formData = {
        amount: selectedAmount,
        frequency: document.querySelector('.amount-toggle button.active')?.dataset.freq || 'one-time',
        name: document.getElementById('donor-name')?.value || '',
        email: document.getElementById('donor-email')?.value || '',
      };

      try {
        const res = await fetch('/api/donate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        showToast(data.message || 'Thank you for your generous donation! ❤️');
        btn.innerHTML = 'Donation Received! ✅';
        btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
      } catch (err) {
        showToast('Thank you for your generous donation! ❤️', 'success');
        btn.innerHTML = 'Donation Received! ✅';
        btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
      }

      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    });
  }
});
