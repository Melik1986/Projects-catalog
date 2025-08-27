export interface MovieInfo {
  title: string;
  subtitle?: string;
  tmdbRating: number;
  releaseYear: number;
  genre: string;
  duration: string;
  posterUrl?: string;
}

export interface HeroActions {
  onTrailerClick: () => void;
  onInfoClick?: () => void;
  onRefreshClick?: () => void;
}

export interface HeroProps {
  movieInfo: MovieInfo;
  actions: HeroActions;
  buttonSize?: 'default' | 'wide';
}
