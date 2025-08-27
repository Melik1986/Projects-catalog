// Public API для модуля Authentication

// UI компоненты
export { LoginForm, RegisterForm, SuccessMessage } from './ui';

// Хуки
export {
  useLoginForm,
  useRegisterForm,
  useLoginSubmit,
  useRegisterSubmit,
  usePasswordVisibility,
} from './hooks/useAuthForms';

// Типы
export type { AuthInfo, RegisterData, SuccessfulResult } from './types/auth';
export type { UserProfile } from './types/user';

// Store (только actions и selectors, не внутренняя реализация)
export { loginUser, registerUser, logoutUser, checkAuthStatus } from './store/authSlice';
export { selectIsInitialized, selectIsAuthenticated, selectUser } from './store/authSlice';
export { default as authReducer } from './store/authSlice';
export { updateUserFavorites } from './store/userSlice';

// API (только основные функции)
export { AuthAPI } from './api/auth.api';
