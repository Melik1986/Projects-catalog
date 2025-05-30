// import { Swiper } from './vendor/swiper.js';
// import { createProductCard } from './components/catalog-cards.js';

export async function initDayProductsSlider() {
  const response = await fetch('./data/data.json');
  const data = await response.json();
  const goodsOfDay = data.filter(item => item.goodsOfDay);

  const list = document.querySelector('.day-products__list');
  list.innerHTML = '';

  goodsOfDay.forEach(product => {
    const li = document.createElement('li');
    li.classList.add('day-products__item', 'swiper-slide');
    li.innerHTML = window.createProductCard(product);
    list.appendChild(li);
  });

  // Используем глобальный Swiper
  new window.Swiper('.day-products__slider', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
    loop: false,
  });
}