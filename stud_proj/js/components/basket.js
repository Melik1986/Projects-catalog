// basket.js
// Логика корзины: открытие/закрытие, добавление/удаление товаров, обновление счётчика

document.addEventListener('DOMContentLoaded', function () {
  const basketBtn = document.querySelector('.header__user-btn');
  const basket = document.querySelector('.basket');
  const basketList = document.querySelector('.basket__list');
  const basketEmptyBlock = document.querySelector('.basket__empty-block');
  const basketCount = document.querySelector('.header__user-count');
  const basketLink = document.querySelector('.basket__link');

  // Открытие/закрытие корзины
  if (basketBtn && basket) {
    basketBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      basket.classList.toggle('basket--active');
    });
    document.addEventListener('click', function (e) {
      if (!basket.contains(e.target) && !basketBtn.contains(e.target)) {
        basket.classList.remove('basket--active');
      }
    });
  }

  // Функция обновления счётчика
  function updateBasketCount() {
    const count = basketList.querySelectorAll('.basket__item').length;
    basketCount.textContent = count;
    if (count === 0) {
      basketEmptyBlock.style.display = '';
      if (basketLink) basketLink.style.display = 'none';
    } else {
      basketEmptyBlock.style.display = 'none';
      if (basketLink) basketLink.style.display = '';
    }
  }

  // Удаление товара из корзины
  basketList.addEventListener('click', function (e) {
    if (e.target.closest('.basket__item-close')) {
      const item = e.target.closest('.basket__item');
      if (item) {
        item.remove();
        updateBasketCount();
      }
    }
  });

  // Экспорт функции для добавления товара в корзину
  window.addToBasket = function (product) {
    console.log('[basket.js] addToBasket вызван с:', product);
    // Проверка на дублирование по id
    if (basketList.querySelector('[data-id="' + product.id + '"]')) return;
    const li = document.createElement('li');
    li.className = 'basket__item';
    li.setAttribute('data-id', product.id);
    li.innerHTML = `
      <div class="basket__img">
        <img src="${product.img}" alt="Фотография товара" height="60" width="60">
      </div>
      <span class="basket__name">${product.name}</span>
      <span class="basket__price">${product.price} руб</span>
      <button class="basket__item-close" type="button">
        <svg class="basket__icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
      </button>
    `;
    basketList.appendChild(li);
    updateBasketCount();
  };

  updateBasketCount();
});