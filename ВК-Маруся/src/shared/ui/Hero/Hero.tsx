import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroContent from './HeroContent';
import HeroActions from './HeroActions';
import type { HeroProps, Movie } from '@/shared/types';
import styles from './Hero.module.scss';
import {
  optimizeCloudinaryImage,
  generateCloudinaryImageSrcSet,
  CLOUDINARY_SIZES,
} from '@/shared/lib/utils/cloudinary';

interface ExtendedHeroProps extends Omit<HeroProps, 'actions'> {
  actions: Omit<HeroProps['actions'], 'isFavorite' | 'onFavoriteClick'>;
  movie?: Movie;
  openAuthModal?: () => void;
  showActions?: boolean;
}

const Hero: React.FC<ExtendedHeroProps> = React.memo(
  ({ movieInfo, actions, movie, openAuthModal, buttonSize = 'default', showActions = false }) => {
    const { title, posterUrl } = movieInfo;
    const optimizedPosterUrl = posterUrl
      ? optimizeCloudinaryImage(posterUrl, CLOUDINARY_SIZES.hero)
      : '';
    const imgRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
      if (imgRef.current) {
        imgRef.current.setAttribute('fetchpriority', 'high');
      }
    }, [optimizedPosterUrl]);

    return (
      <>
        {/* Динамический preload для LCP изображения */}
        {optimizedPosterUrl && (
          <Helmet>
            <link rel="preload" as="image" href={optimizedPosterUrl} fetchPriority="high" />
          </Helmet>
        )}

        <section className={styles.hero}>
          <h2 className="visualhidden">{title}</h2>
          <div className={styles.hero__content}>
            <HeroContent movieInfo={movieInfo} />
            {actions && (
              <HeroActions
                actions={actions}
                movie={movie}
                openAuthModal={openAuthModal}
                buttonSize={buttonSize}
                showActions={showActions}
              />
            )}
          </div>

          <div className={styles.hero__picture}>
            {posterUrl && (
              <img
                ref={imgRef}
                src={optimizedPosterUrl}
                srcSet={generateCloudinaryImageSrcSet(
                  posterUrl,
                  CLOUDINARY_SIZES.hero.width,
                  CLOUDINARY_SIZES.hero.height,
                )}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={title}
                className={styles.hero__image}
                loading="eager"
                decoding="async"
                width={CLOUDINARY_SIZES.hero.width}
                height={CLOUDINARY_SIZES.hero.height}
              />
            )}
          </div>
        </section>
      </>
    );
  },
);

Hero.displayName = 'Hero';

export { Hero };
