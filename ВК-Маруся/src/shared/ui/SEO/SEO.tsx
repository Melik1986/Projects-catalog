import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useSEO } from './hooks/useSEO';
import type { SEOProps } from '../../types';

const SEO: React.FC<SEOProps> = (props) => {
  const { title, description, keywords, image, url } = props;
  useSEO({ title, description, keywords });

  const seoMetaTags = {
    title: title || 'ВК Маруся',
    description: description || 'Лучшие фильмы и сериалы онлайн бесплатно',
    keywords: keywords || 'фильмы, сериалы, онлайн, vk, marusya',
    openGraph: {
      title: title || 'ВК Маруся',
      description: description || 'Лучшие фильмы и сериалы онлайн бесплатно',
      type: 'website',
      siteName: 'ВК Маруся',
      url: url || '',
      image: image || '',
    },
    twitterCard: {
      card: 'summary_large_image',
      title: title || 'ВК Маруся',
      description: description || 'Лучшие фильмы и сериалы онлайн бесплатно',
      image: image || '',
    },
    structuredData: null,
  };

  return (
    <Helmet>
      <title>{seoMetaTags.title}</title>
      <meta name="description" content={seoMetaTags.description} />
      <meta name="keywords" content={seoMetaTags.keywords} />

      {/* Open Graph теги */}
      <meta property="og:title" content={seoMetaTags.openGraph.title} />
      <meta property="og:description" content={seoMetaTags.openGraph.description} />
      <meta property="og:type" content={seoMetaTags.openGraph.type} />
      <meta property="og:site_name" content={seoMetaTags.openGraph.siteName} />
      {seoMetaTags.openGraph.url && <meta property="og:url" content={seoMetaTags.openGraph.url} />}
      {seoMetaTags.openGraph.image && (
        <meta property="og:image" content={seoMetaTags.openGraph.image} />
      )}

      {/* Twitter Card теги */}
      <meta name="twitter:card" content={seoMetaTags.twitterCard.card} />
      <meta name="twitter:title" content={seoMetaTags.twitterCard.title} />
      <meta name="twitter:description" content={seoMetaTags.twitterCard.description} />
      {seoMetaTags.twitterCard.image && (
        <meta name="twitter:image" content={seoMetaTags.twitterCard.image} />
      )}

      {/* Структурированные данные */}
      {seoMetaTags.structuredData && (
        <script type="application/ld+json">{JSON.stringify(seoMetaTags.structuredData)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
