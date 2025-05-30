document.addEventListener('DOMContentLoaded', function () {
  const cityBtn = document.querySelector('.location__city');
  const cityMenu = document.querySelector('.location__sublist');
  const cityName = document.querySelector('.location__city-name');
  const cityLinks = document.querySelectorAll('.location__sublink');

  if (!cityBtn || !cityMenu || !cityName || cityLinks.length === 0) return;

  function toggleMenu(forceClose = false) {
    if (forceClose) {
      cityBtn.classList.remove('location__city--active');
      cityMenu.style.display = '';
      return;
    }
    const isActive = cityBtn.classList.toggle('location__city--active');
    cityMenu.style.display = isActive ? 'block' : '';
  }

  cityBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (cityBtn.classList.contains('location__city--active')) {
      toggleMenu(true);
    } else {
      toggleMenu();
    }
  });

  cityLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      cityName.textContent = link.textContent;
      toggleMenu(true);
    });
  });

  document.addEventListener('click', function (e) {
    if (!cityBtn.contains(e.target) && cityBtn.classList.contains('location__city--active')) {
      toggleMenu(true);
    }
  });
});