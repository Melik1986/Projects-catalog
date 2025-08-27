import { API_URL } from '@/shared/lib/constants';

// Настройка глобальных переменных для тестов
beforeAll(() => {
  // Устанавливаем URL API для тестов
  process.env.VITE_API_URL = API_URL;

  // Мокаем fetch глобально
  global.fetch = jest.fn();

  // Мокаем localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  // Мокаем sessionStorage
  const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  });
});

// Очищаем моки после каждого теста
afterEach(() => {
  jest.clearAllMocks();
});

// Восстанавливаем все моки после всех тестов
afterAll(() => {
  jest.restoreAllMocks();
});
