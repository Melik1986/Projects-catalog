// accordion.js
document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll('.accordion__btn');
  accordions.forEach(btn => {
    btn.addEventListener('click', function () {
      const parent = btn.closest('.accordion__element');
      if (!parent) return;
      const isActive = btn.classList.toggle('accordion__btn--active');
      const content = parent.querySelector('.accordion__content');
      if (content) {
        content.style.display = isActive ? 'flex' : 'none';
      }
      // Скрываем другие открытые элементы
      if (isActive) {
        accordions.forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.classList.remove('accordion__btn--active');
            const otherParent = otherBtn.closest('.accordion__element');
            if (otherParent) {
              const otherContent = otherParent.querySelector('.accordion__content');
              if (otherContent) otherContent.style.display = 'none';
            }
          }
        });
      }
    });
  });
});