import { favoritesApi } from '@/modules/Favorites';
import { AuthAPI } from '@/modules/Authentication';
import { movieApi } from '@/modules/MovieCatalog';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Мокаем http клиент из axiosConfig
jest.mock('../services/api/axiosConfig', () => ({
  http: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    head: jest.fn(),
    options: jest.fn(),
    request: jest.fn(),
    getUri: jest.fn(),
    defaults: {},
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  },
}));

// Мокаем Redux store
jest.mock('../app/store', () => ({
  store: {
    dispatch: jest.fn(),
  },
}));

// Мокаем errorSlice
jest.mock('../shared/lib/errors/slices/errorSlice', () => ({
  setGlobalError: jest.fn(),
}));

// Мокаем authSlice
jest.mock('../app/store/slices/authSlice', () => ({
  logout: jest.fn(),
}));

// Функция для создания AxiosError-подобного объекта
function createAxiosError(status: number, message: string, url?: string): AxiosError {
  const error = new Error(message) as AxiosError;
  error.isAxiosError = true;
  error.response = {
    status,
    data: { error: message },
    statusText: '',
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  };
  error.config = { url } as InternalAxiosRequestConfig;
  return error;
}

// Получаем мокированный http для использования в тестах
import { http as mockHttp } from '../shared/api/axiosConfig';

describe('Movies API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('moviesApi.searchMovies', () => {
    it('корректно возвращает список фильмов', async () => {
      const mockMovies = [
        {
          id: 1,
          title: 'Test Movie',
          originalTitle: 'Test Movie',
          language: 'en',
          releaseYear: 2023,
          releaseDate: '2023-01-01',
          genres: ['action'],
          plot: 'Test plot',
          runtime: 120,
          budget: null,
          revenue: null,
          homepage: '',
          status: 'released',
          posterUrl: 'https://example.com/poster.jpg',
          backdropUrl: null,
          trailerUrl: '',
          trailerYouTubeId: '',
          tmdbRating: 7.5,
          searchL: 'test movie',
          keywords: [],
          countriesOfOrigin: [],
          languages: [],
          cast: [],
          director: 'Test Director',
          production: null,
          awardsSummary: null,
        },
      ];

      (mockHttp.get as jest.Mock).mockResolvedValueOnce({ data: mockMovies });

      const result = await movieApi.getMovies({ title: 'test' });
      expect(result).toEqual(mockMovies);
    });

    it('корректно обрабатывает ошибку 404', async () => {
      const axiosError = createAxiosError(404, 'Not found', '/movies');
      (mockHttp.get as jest.Mock).mockRejectedValueOnce(axiosError);

      await expect(movieApi.getMovies({})).rejects.toMatchObject({
        isAxiosError: true,
        response: {
          status: 404,
          data: { error: 'Not found' },
        },
      });
    });
  });

  // Аналогично обновить другие describe для getTopMovies, authApi.register, login, favoritesApi.addToFavorites, используя mockedAxios.post или get
});

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authApi.register', () => {
    it('корректно выполняет регистрацию', async () => {
      const mockResponse = { result: true };
      const regData = {
        name: 'Test',
        surname: 'User',
        email: 'new@example.com',
        password: 'password',
      };

      (mockHttp.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      const result = await AuthAPI.register(regData);
      expect(result).toEqual(mockResponse);
    });

    it('корректно обрабатывает ошибку 409 (пользователь уже существует)', async () => {
      const axiosError = createAxiosError(409, 'Пользователь уже существует', '/register');
      (mockHttp.post as jest.Mock).mockRejectedValueOnce(axiosError);

      await expect(
        AuthAPI.register({
          name: 'Test',
          surname: 'User',
          email: 'existing@example.com',
          password: 'password',
        }),
      ).rejects.toMatchObject({
        isAxiosError: true,
        response: {
          status: 409,
          data: { error: 'Пользователь уже существует' },
        },
      });
    });
  });

  describe('authApi.login', () => {
    it('корректно выполняет авторизацию', async () => {
      const mockResponse = { result: true };
      const authData = { email: 'test@example.com', password: 'password' };

      (mockHttp.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

      const result = await AuthAPI.login(authData);
      expect(result).toEqual(mockResponse);
    });

    it('корректно обрабатывает ошибку авторизации', async () => {
      const axiosError = createAxiosError(401, 'Неверные данные', '/login');
      (mockHttp.post as jest.Mock).mockRejectedValueOnce(axiosError);

      await expect(
        AuthAPI.login({ email: 'test@example.com', password: 'wrong' }),
      ).rejects.toMatchObject({
        isAxiosError: true,
        response: {
          status: 401,
          data: { error: 'Неверные данные' },
        },
      });
    });
  });
});

describe('Favorites API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('favoritesApi.addToFavorites', () => {
    it('корректно добавляет фильм в избранное', async () => {
      const mockUser = {
        id: '1',
        name: 'Test',
        surname: 'User',
        email: 'test@example.com',
        favorites: [1, 2],
      };

      (mockHttp.post as jest.Mock).mockResolvedValueOnce({ data: mockUser });

      const result = await favoritesApi.addToFavorites('1');
      expect(result).toEqual(mockUser);
    });
  });
});
