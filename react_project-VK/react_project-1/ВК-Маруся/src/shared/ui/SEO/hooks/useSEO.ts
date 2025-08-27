import { useEffect } from 'react';

import type { SEOProps } from '../../../types';

/**
 * Хук для управления SEO мета-тегами страницы
 * @param title - Заголовок страницы
 * @param description - Описание страницы
 * @param keywords - Ключевые слова
 */
export const useSEO = ({ title, description, keywords }: SEOProps): void => {
  useEffect(() => {
    document.title = title || 'ВК Маруся';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || '');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || '');
    }
  }, [title, description, keywords]);
};
