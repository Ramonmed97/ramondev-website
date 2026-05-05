/* ===========================
   RAMONDEV PORTFOLIO
   script.js
=========================== */

/* ---- Scroll Reveal ---- */
const revealElements = document.querySelectorAll(
  '.service-card, .project-card, .section-title, .section-sub, .section-tag, .skill-tag, .journey-item'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => observer.observe(el));

/* ---- Smooth nav highlight ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

/* ---- Stat counter animation ---- */
function animateCounter(el, target, prefix, suffix, duration) {
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const raw = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
        statsObserver.unobserve(el);
        if (raw === 0) return;
        const prefix = text.match(/^[^0-9]*/)[0];
        const suffix = text.match(/[^0-9]*$/)[0];
        animateCounter(el, raw, prefix, suffix, 1200);
      }
    });
  },
  { threshold: 0.5 }
);

statNums.forEach(el => statsObserver.observe(el));

/* ---- Logo scroll to top ---- */
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Active nav link on click ---- */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => (l.style.color = ''));
    link.style.color = 'var(--accent)';
  });
});

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navEl = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  navMenu.style.top = navEl.getBoundingClientRect().height + 'px';
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});
