export const SEO_CONFIG = {
  siteName: 'ВК Маруся',
  siteUrl: 'https://vk-marusia.ru',
  defaultTitle: 'ВК Маруся - Откройте для себя мир кино',
  defaultDescription:
    'Смотрите трейлеры лучших фильмов, читайте описания и находите свои любимые картины с ВК Маруся.',
  defaultKeywords: 'фильмы, кино, трейлеры, рейтинги, ВК Маруся',
  defaultImage: '/images/og-default.jpg',
  language: 'ru',
  locale: 'ru_RU',
  twitterHandle: '@vk_marusia',

  // Настройки для разных типов страниц
  pages: {
    home: {
      title: 'VK Marusya - Лучшие фильмы онлайн',
      description:
        'Откройте для себя мир кино с VK Marusya. Смотрите новинки, классику и популярные фильмы в высоком качестве.',
      keywords: 'фильмы онлайн, новинки кино, популярные фильмы, VK Marusya',
    },
    genres: {
      title: 'Жанры фильмов - VK Marusya',
      description:
        'Выберите жанр по душе: боевики, драмы, комедии, ужасы и многое другое на VK Marusya.',
      keywords: 'жанры фильмов, боевики, драмы, комедии, ужасы, триллеры',
    },
    search: {
      title: 'Поиск фильмов - VK Marusya',
      description: 'Найдите любимые фильмы по названию, жанру или актёрам на VK Marusya.',
      keywords: 'поиск фильмов, найти фильм, поиск по актёрам',
    },
    user: {
      title: 'Личный кабинет - VK Marusya',
      description: 'Управляйте своими избранными фильмами и настройками аккаунта.',
      keywords: 'личный кабинет, избранные фильмы, настройки аккаунта',
    },
    notFound: {
      title: 'Страница не найдена - 404 | VK Marusya',
      description:
        'Запрашиваемая страница не найдена. Вернитесь на главную страницу или воспользуйтесь навигацией.',
      keywords: '404, страница не найдена, ошибка, VK Marusya',
    },
    genre: {
      title: 'Фильмы жанра - VK Marusya',
      description: 'Смотрите лучшие фильмы выбранного жанра на VK Marusya.',
      keywords: 'фильмы жанра, кино по жанрам, VK Marusya',
    },
  },

  // Структурированные данные
  organization: {
    name: 'VK Marusya',
    url: 'https://vk-marusya.example.com',
    logo: 'https://vk-marusya.example.com/logo.png',
    sameAs: ['https://vk.com/vkmarusya', 'https://twitter.com/vkmarusya'],
  },

  // Настройки для Open Graph
  openGraph: {
    type: 'website',
    siteName: 'VK Marusya',
    locale: 'ru_RU',
  },

  // Настройки для Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@vkmarusya',
    creator: '@vkmarusya',
  },
};

// Типы для конфигурации
export type SEOPageType = keyof typeof SEO_CONFIG.pages;
export type SEOConfig = typeof SEO_CONFIG;
