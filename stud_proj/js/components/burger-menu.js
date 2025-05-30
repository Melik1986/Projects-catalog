document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.main-menu');
  const openBtn = document.querySelector('.header__catalog-btn, .header__catalog-open, .header__catalog-trigger');
  const closeBtn = menu ? menu.querySelector('.main-menu__close') : null;
  
  // Попытка найти кнопку открытия по возможным классам
  let triggerBtn = openBtn;
  if (!triggerBtn) {
    triggerBtn = document.querySelector('[data-menu-open]');
  }

  if (triggerBtn && menu) {
    triggerBtn.addEventListener('click', function () {
      menu.classList.add('main-menu--active');
    });
  }

  if (closeBtn && menu) {
    closeBtn.addEventListener('click', function () {
      menu.classList.remove('main-menu--active');
    });
  }

  // Закрытие по клику вне меню (оверлей)
  menu && menu.addEventListener('click', function (e) {
    if (e.target === menu) {
      menu.classList.remove('main-menu--active');
    }
  });
});