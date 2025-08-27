export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  globals: {
    'import.meta': {
      env: {
        VITE_API_URL: 'https://cinemaguide.skillbox.cc',
        VITE_USE_MOCK_DATA: 'false'
      }
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^../api/cinemaApi$': '<rootDir>/src/__tests__/__mocks__/cinemaApi.ts',
    '^../api/moviesApi$': '<rootDir>/src/__tests__/__mocks__/moviesApi.ts',
    '\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$))',
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(test|spec).(ts|tsx|js)',
    '<rootDir>/src/**/?(*.)(test|spec).(ts|tsx|js)',
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/__tests__/__mocks__/'],
};