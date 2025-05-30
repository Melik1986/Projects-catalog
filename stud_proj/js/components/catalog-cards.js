window.createProductCard = createProductCard;
function createProductCard(product) {
  return `
    <li class="catalog__item">
      <div class="product-card" data-id="${product.id}">
        <div class="product-card__visual">
          <img class="product-card__img" src="${product.image}" height="436" width="290" alt="Изображение товара">
          <div class="product-card__more">
            <a href="#" class="product-card__link btn btn--icon">
              <span class="btn__text">В корзину</span>
              <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-basket"></use>
              </svg>
            </a>
            <a href="#" class="product-card__link btn btn--secondary">
              <span class="btn__text">Подробнее</span>
            </a>
          </div>
        </div>
        <div class="product-card__info">
          <h2 class="product-card__title">${product.name}</h2>
          <span class="product-card__old">
            <span class="product-card__old-number">${product.price?.old ?? '-'}</span>
            <span class="product-card__old-add">₽</span>
          </span>
          <span class="product-card__price">
            <span class="product-card__price-number">${product.price?.new ?? '-'}</span>
            <span class="product-card__price-add">₽</span>
          </span>
          <div class="product-card__tooltip tooltip">
            <button class="tooltip__btn" aria-label="Показать подсказку">
              <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
              </svg>
            </button>
            <div class="tooltip__content">
              <span class="tooltip__text">Наличие товара по городам:</span>
              <ul class="tooltip__list">
                <li class="tooltip__item">
                  <span class="tooltip__text">Москва: <span class="tooltip__count">${product.availability?.moscow ?? '-'}</span></span>
                </li>
                <li class="tooltip__item">
                  <span class="tooltip__text">Оренбург: <span class="tooltip__count">${product.availability?.orenburg ?? '-'}</span></span>
                </li>
                <li class="tooltip__item">
                  <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${product.availability?.saintPetersburg ?? '-'}</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  `;
}
document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest('.product-card__link.btn--icon');
    if (btn && btn.querySelector('.btn__text') && btn.querySelector('.btn__text').textContent.trim() === 'В корзину') {
      e.preventDefault();
      const card = btn.closest('.product-card');
      if (!card) return;
      const id = card.dataset.id || card.getAttribute('data-id');
      if (!id) return;
      // Получаем массив товаров из глобального window (например, window.allProducts)
      const products = window.allProducts || [];
      const product = products.find(p => String(p.id) === String(id));
      console.log('[catalog-cards.js] Клик по кнопке В корзину, id:', id, 'product:', product);
      if (product && window.addToBasket) {
        window.addToBasket({
          id: product.id,
          name: product.name,
          price: product.price?.new || product.price,
          img: product.image || product.img
        });
      }
    }
  });
});