// hooks/useHeader.ts
import { useState } from 'react';
import { useAppSelector } from '@/shared/lib/store';
import { useModal } from '@/shared/lib/hooks/useModal';
import type { HeaderState, HeaderActions } from '@/shared/types';

/**
 * Кастомный хук для управления состоянием компонента Header
 * Инкапсулирует всю логику управления модальными окнами и поиском
 */
export const useHeader = (): HeaderState & HeaderActions => {
  // Используем useModal для управления модальным окном авторизации
  const {
    isOpen: isAuthModalOpen,
    success: isAuthSuccess,
    openModal: openAuthModal,
    closeModal: closeAuthModal,
    showSuccess,
    closeWithSuccess,
  } = useModal();

  // Специфичная для Header логика
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const switchAuthMode = (): void => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const handleRegisterSuccess = (): void => {
    showSuccess();
  };

  const handleLoginSuccess = (): void => {
    closeAuthModal();
  };

  const handleSearchIconClick = (): void => {
    setMobileSearchOpen(!isMobileSearchOpen);
  };

  const closeMobileSearch = (): void => {
    setMobileSearchOpen(false);
  };

  return {
    // State
    isAuthModalOpen,
    isAuthSuccess,
    authMode,
    isMobileSearchOpen,
    // Actions
    openAuthModal,
    closeAuthModal,
    switchAuthMode,
    handleRegisterSuccess,
    handleLoginSuccess,
    handleSearchIconClick,
    closeMobileSearch,
    closeWithSuccess,
    // Derived state from Redux
    isAuth,
    user,
  };
};
