import type { Genre } from '../../types';

/**
 * Переводит жанр с английского на русский
 * @param genre - жанр на английском языке
 * @returns переведенный жанр на русском языке
 */
export const translateGenre = (genre: Genre): string => {
  const genreTranslations: Record<string, string> = {
    drama: 'Драма',
    comedy: 'Комедия',
    mystery: 'Детектив',
    family: 'Семейное',
    history: 'Историческое',
    thriller: 'Триллер',
    fantasy: 'Фантастика',
    adventure: 'Приключения',
  };

  return genreTranslations[genre] || genre;
};
