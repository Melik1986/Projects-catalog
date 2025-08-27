/**
 * Cloudinary image utilities
 */
export interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'webp' | 'jpg' | 'png';
  dpr?: 'auto' | number;
}

export function optimizeCloudinaryImage(url: string, options: CloudinaryImageOptions = {}): string {
  if (!url) return '';
  if (!/^https?:\/\/cinemaguide\.skillbox\.cc\/.*\.(jpg|jpeg|png)$/i.test(url)) {
    return url;
  }
  const { width, height, quality = 'auto', format = 'webp', dpr = 'auto' } = options;
  const params = [
    `f_${format}`,
    `q_${quality}`,
    `dpr_${dpr}`,
    width && height ? `w_${width},h_${height},c_fill` : '',
  ]
    .filter(Boolean)
    .join(',');
  return `https://res.cloudinary.com/diooq2dwm/image/fetch/${params}/${encodeURIComponent(url)}`;
}

export function generateCloudinaryImageSrcSet(
  url: string,
  baseWidth: number,
  baseHeight: number,
): string {
  if (!url || !/^https?:\/\/cinemaguide\.skillbox\.cc\/.*\.(jpg|jpeg|png)$/i.test(url)) {
    return '';
  }
  const densities = [0.5, 1, 1.5, 2];
  return densities
    .map((density) => {
      const width = Math.round(baseWidth * density);
      const height = Math.round(baseHeight * density);
      const optimizedUrl = optimizeCloudinaryImage(url, { width, height });
      return `${optimizedUrl} ${density}x`;
    })
    .join(', ');
}

export const CLOUDINARY_SIZES = {
  movieCard: { width: 224, height: 336 },
  hero: { width: 400, height: 600 },
  searchDropdown: { width: 40, height: 60 },
  thumbnail: { width: 150, height: 225 },
} as const;
