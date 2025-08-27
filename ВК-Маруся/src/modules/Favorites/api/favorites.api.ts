import { http } from '../../../shared/api/axiosConfig';
import type { MovieList, UserProfile } from '@/shared/types';

export const favoritesApi = {
  getFavorites(): Promise<MovieList> {
    return http.get<MovieList>('/favorites').then((response) => response.data);
  },

  addToFavorites(movieId: string): Promise<UserProfile> {
    const formData = new URLSearchParams();
    formData.append('id', movieId);
    return http
      .post<UserProfile>('/favorites', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => response.data);
  },

  removeFromFavorites(movieId: string): Promise<UserProfile> {
    return http.delete<UserProfile>(`/favorites/${movieId}`).then((response) => response.data);
  },
};
