import React, { useEffect, useState } from 'react';

interface SpriteIconProps {
  id: string;
  className?: string;
}

// Кеш для загруженного спрайта
let spriteCache: string | null = null;
let spritePromise: Promise<string> | null = null;

const loadSprite = async (): Promise<string> => {
  if (spriteCache) {
    return spriteCache;
  }

  if (spritePromise) {
    return spritePromise;
  }

  spritePromise = fetch('/sprite.svg')
    .then((response) => response.text())
    .then((svg) => {
      spriteCache = svg;
      return svg;
    });

  return spritePromise;
};

const SpriteIcon: React.FC<SpriteIconProps> = ({ id, className }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadIcon = async () => {
      try {
        const sprite = await loadSprite();
        if (mounted) {
          setSvgContent(sprite);
          setIsLoaded(true);
        }
      } catch (error) {
        console.warn('Failed to load sprite:', error);
      }
    };

    // Загружаем спрайт только при первом использовании
    if (!spriteCache) {
      loadIcon();
    } else {
      setSvgContent(spriteCache);
      setIsLoaded(true);
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (!isLoaded || !svgContent) {
    // Fallback для иконок, которые не загрузились
    return (
      <svg className={className} aria-hidden="true" width="16" height="16">
        <rect width="16" height="16" fill="currentColor" opacity="0.3" />
      </svg>
    );
  }

  return (
    <svg className={className} aria-hidden="true">
      <use xlinkHref={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default SpriteIcon;
