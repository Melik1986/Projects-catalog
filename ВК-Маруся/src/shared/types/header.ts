// types/header.ts

/**
 * Профиль пользователя
 */
export interface UserProfile {
  email: string;
  name: string;
  surname: string;
  favorites: string[];
}

/**
 * Пропсы для компонента Header
 */
export interface HeaderProps {
  /** Функция обратного вызова для поиска */
  onSearch?: (query: string) => void;
  /** Дополнительный CSS класс */
  className?: string;
}

/**
 * Состояние хука useHeader
 */
export interface HeaderState {
  /** Открыто ли модальное окно авторизации */
  isAuthModalOpen: boolean;
  /** Показывается ли сообщение об успешной регистрации */
  isAuthSuccess: boolean;
  /** Режим авторизации: вход или регистрация */
  authMode: 'login' | 'register';
  /** Открыт ли поиск на мобильных устройствах */
  isMobileSearchOpen: boolean;
  /** Авторизован ли пользователь */
  isAuth: boolean;
  /** Данные пользователя */
  user: UserProfile | null;
}

/**
 * Действия хука useHeader
 */
export interface HeaderActions {
  /** Открыть модальное окно авторизации */
  openAuthModal: () => void;
  /** Закрыть модальное окно авторизации */
  closeAuthModal: () => void;
  /** Переключить режим авторизации */
  switchAuthMode: () => void;
  /** Обработать успешную регистрацию */
  handleRegisterSuccess: () => void;
  /** Обработать успешный вход */
  handleLoginSuccess: () => void;
  /** Закрыть модальное окно с успехом */
  closeWithSuccess: () => void;
  /** Обработать клик по иконке поиска */
  handleSearchIconClick: () => void;
  /** Закрыть мобильный поиск */
  closeMobileSearch: () => void;
}
