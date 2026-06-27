const root = document.documentElement;
const progress = document.querySelector('.progress span');
const revealItems = document.querySelectorAll('.reveal');
const navLinks = [...document.querySelectorAll('.site-header nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const languageButton = document.querySelector('.language');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
let language = 'zh';

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

revealItems.forEach((item) => revealObserver.observe(item));

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${scrollable > 0 ? scrollY / scrollable : 0})`;

  let activeId = '';
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= innerHeight * 0.45) activeId = section.id;
  });
  navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${activeId}`));
}

addEventListener('scroll', updateScrollState, { passive: true });
addEventListener('resize', updateScrollState);
updateScrollState();

languageButton.addEventListener('click', () => {
  language = language === 'zh' ? 'en' : 'zh';
  root.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-zh][data-en]').forEach((element) => {
    element.textContent = element.dataset[language];
  });
  languageButton.textContent = language === 'zh' ? 'EN' : '中';
  languageButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
});

document.querySelectorAll('.image-open').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.querySelector('img')?.alt || '';
    lightboxCaption.textContent = button.dataset[language === 'zh' ? 'captionZh' : 'captionEn'];
    lightbox.showModal();
    document.body.classList.add('locked');
  });
});

function closeLightbox() {
  lightbox.close();
  document.body.classList.remove('locked');
  lightboxImage.src = '';
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener('close', () => document.body.classList.remove('locked'));
