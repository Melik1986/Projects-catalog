import './components/basket.js';
import './components/burger-menu.js';
import './components/location-menu.js';
import './components/catalog-cards.js';
import './components/catalog-filters.js';
import './components/accordion.js';
import { initDayProductsSlider } from './components/slider.js';
import './components/validate-contact.js'; // добавлен импорт валидации

document.addEventListener('DOMContentLoaded', () => {
  initDayProductsSlider();
});
