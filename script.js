const copyButton = document.querySelector('.copy-email');
const copyStatus = document.getElementById('copy-status');
const copyIcon = copyButton.innerHTML;
let copyReset;
copyButton.addEventListener('click', async () => {
  clearTimeout(copyReset);
  try {
    await navigator.clipboard.writeText('gaowh623@gmail.com');
    copyStatus.textContent = 'Email address copied.';
    copyButton.setAttribute('aria-label', 'Email address copied');
    copyButton.title = 'Copied!';
    copyButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
    copyReset = setTimeout(() => {
      copyButton.setAttribute('aria-label', 'Copy email address');
      copyButton.title = 'Copy email address';
      copyButton.innerHTML = copyIcon;
      copyStatus.textContent = '';
    }, 2400);
  } catch {
    copyStatus.textContent = 'Please select and copy: gaowh623@gmail.com';
  }
});

const navLinks = [...document.querySelectorAll('.main-nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
function setActive(id) {
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let requestedSection = sections.find(section => `#${section.id}` === location.hash);
navLinks.forEach(link => link.addEventListener('click', () => {
  requestedSection = document.querySelector(link.getAttribute('href'));
  setActive(requestedSection.id);
}));
window.addEventListener('hashchange', () => {
  requestedSection = location.hash === '#top' ? sections[0] : sections.find(section => `#${section.id}` === location.hash);
  syncNavigation();
});
const resumeScrollTracking = () => { requestedSection = null; };
window.addEventListener('wheel', resumeScrollTracking, { passive: true });
window.addEventListener('touchmove', resumeScrollTracking, { passive: true });
window.addEventListener('keydown', event => {
  if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) resumeScrollTracking();
});
let ticking = false;
function syncNavigation() {
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) active = section;
  }
  if (window.scrollY > 10 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = sections.at(-1);
  setActive((requestedSection || active).id);
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(syncNavigation); }
}, { passive: true });
window.addEventListener('resize', syncNavigation);
syncNavigation();
document.getElementById('copyright-year').textContent = new Date().getFullYear();
