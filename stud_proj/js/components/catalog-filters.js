const filterList = document.querySelector(".catalog-form");
if (!filterList) {
  window.getFilteredAndSortedProducts = () => [];
  window.renderFilteredProducts = () => {};
  window.updateFilterCounts = () => {};
  window.updateTypeCounts = () => {};
}

let products = [];
let typeCounts = {};

fetch("./data/data.json")
  .then((response) => {
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    return response.json();
  })
  .then((data) => {
    products = data;
    window.allProducts = data;
    renderFilteredProducts(products);
    updateTypeCounts();
    updateFilterCounts();
    renderFilteredProducts(products);
  })
  .catch((error) => {
    updateFilterCounts(true);
    renderFilteredProducts([]);
    console.error(error);
  });

function updateTypeCounts() {
  typeCounts = {};
  products.forEach((product) => {
    if (product.type) {
      if (Array.isArray(product.type)) {
        product.type.forEach((type) => {
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
      } else {
        typeCounts[product.type] = (typeCounts[product.type] || 0) + 1;
      }
    }
  });
}

function updateFilterCounts(error) {
  const checkboxes = filterList.querySelectorAll(
    '.custom-checkbox input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    const label = checkbox.closest(".custom-checkbox");
    let countSpan = label.querySelector(".custom-checkbox__count");
    if (!countSpan) {
      countSpan = document.createElement("span");
      countSpan.className = "custom-checkbox__count";
      label.appendChild(countSpan);
    }
    const type = checkbox.value;
    let count = error ? 0 : typeCounts[type] || 0;
    countSpan.textContent = count;
  });
}

function renderFilteredProducts(filtered, page = 1) {
  const catalogList = document.querySelector(".catalog__list");
  const pagination = document.querySelector(".catalog__pagination");
  if (!catalogList) return;
  catalogList.innerHTML = "";
  if (pagination) pagination.innerHTML = "";
  if (!filtered.length) {
    catalogList.innerHTML = "<li>Нет товаров по выбранным фильтрам</li>";
    return;
  }
  const cardsPerPage = 6;
  const totalPages = Math.ceil(filtered.length / cardsPerPage);
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const pageProducts = filtered.slice(start, end);
  pageProducts.forEach((product) => {
    if (window.createProductCard) {
      catalogList.insertAdjacentHTML(
        "beforeend",
        window.createProductCard(product)
      );
    }
  });
  // Пагинация
  if (filtered.length > cardsPerPage && pagination) {
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = "catalog__pagination-item";
      const btn = document.createElement("button");
      btn.className = "catalog__pagination-link";
      btn.textContent = i;
      if (i === page) btn.disabled = true;
      btn.addEventListener("click", () => {
        renderFilteredProducts(filtered, i);
        window.scrollTo({
          top: catalogList.offsetTop - 40,
          behavior: "smooth",
        });
      });
      li.appendChild(btn);
      pagination.appendChild(li);
    }
  }
  // Инициализация tippy.js для всех info-кнопок
  if (window.tippy) {
    document.querySelectorAll(".tooltip__btn").forEach((btn) => {
      const content = btn.parentElement.querySelector(".tooltip__content");
      if (content) {
        window.tippy(btn, {
          content: content.innerHTML,
          allowHTML: true,
          theme: "lightwhite",
        });
      }
    });
  }
}

function getFilteredAndSortedProducts() {
  const checkedTypes = Array.from(
    filterList.querySelectorAll(
      '.custom-checkbox input[type="checkbox"]:checked'
    )
  ).map((cb) => cb.value);
  const statusRadio = filterList.querySelector('input[name="status"]:checked');
  let filtered = products;
  if (checkedTypes.length > 0) {
    filtered = filtered.filter((product) =>
      checkedTypes.some((type) =>
        Array.isArray(product.type)
          ? product.type.includes(type)
          : product.type === type
      )
    );
  }
  if (statusRadio && statusRadio.value === "instock") {
    filtered = filtered.filter((product) => {
      const av = product.availability || {};
      return Object.values(av).some((count) => Number(count) > 0);
    });
  }
  const sortSelect = document.querySelector(".catalog__sort-select");
  let sortValue = sortSelect ? sortSelect.value : "";
  if (sortValue === "price-min") {
    filtered = filtered
      .slice()
      .sort((a, b) => (a.price?.new ?? 0) - (b.price?.new ?? 0));
  } else if (sortValue === "price-max") {
    filtered = filtered
      .slice()
      .sort((a, b) => (b.price?.new ?? 0) - (a.price?.new ?? 0));
  } else if (sortValue === "rating-max") {
    filtered = filtered
      .slice()
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }
  return filtered;
}

filterList.addEventListener("change", () => {
  const filtered = getFilteredAndSortedProducts();
  renderFilteredProducts(filtered, 1);
});

const sortSelect = document.querySelector(".catalog__sort-select");
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    const filtered = getFilteredAndSortedProducts();
    renderFilteredProducts(filtered, 1);
  });
}

const resetBtn = filterList.querySelector(".catalog-form__reset");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    setTimeout(() => {
      const filtered = getFilteredAndSortedProducts();
      renderFilteredProducts(filtered);
    }, 0);
  });
}
