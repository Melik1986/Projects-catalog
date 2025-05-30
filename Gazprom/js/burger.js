document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const header = document.querySelector('.header');
  const menu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (!burger || !header || !menu) {
    console.error('Не найдены необходимые элементы меню');
    return;
  }

  const toggleMenu = () => {
    const isOpen = header.classList.contains('header--open');
    
    // Переключаем классы
    header.classList.toggle('header--open');
    
    // Обновляем атрибуты доступности
    burger.setAttribute('aria-expanded', !isOpen);
    menu.setAttribute('aria-hidden', isOpen);
    
    // Блокируем/разблокируем прокрутку страницы
    body.style.overflow = !isOpen ? 'hidden' : '';
  };

  // Обработчик клика по бургеру
  burger.addEventListener('click', function(event) {
    event.preventDefault();
    toggleMenu();
  });

  // Закрытие по ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && header.classList.contains('header--open')) {
      toggleMenu();
    }
  });

  // Закрытие при клике на ссылку
  menu.addEventListener('click', function(event) {
    if (event.target.closest('.mobile-menu__link')) {
      toggleMenu();
    }
  });

  // Инициализация начального состояния
  menu.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  header.classList.remove('header--open');
});