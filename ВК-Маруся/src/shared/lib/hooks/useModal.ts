import { useState, useCallback } from 'react';

/**
 * Хук для управления состоянием модального окна
 * @returns объект с состоянием и методами управления модальным окном
 */
export const useModal = (): {
  isOpen: boolean;
  success: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  showSuccess: () => void;
  hideSuccess: () => void;
  closeWithSuccess: () => void;
} => {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const openModal = useCallback((): void => {
    setIsOpen(true);
    setSuccess(false);
  }, []);

  const closeModal = useCallback((): void => {
    setIsOpen(false);
    setSuccess(false);
  }, []);

  const toggleModal = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  const showSuccess = useCallback((): void => {
    setSuccess(true);
  }, []);

  const hideSuccess = useCallback((): void => {
    setSuccess(false);
  }, []);

  const closeWithSuccess = useCallback((): void => {
    setIsOpen(false);
    setSuccess(false);
  }, []);

  return {
    isOpen,
    success,
    openModal,
    closeModal,
    toggleModal,
    showSuccess,
    hideSuccess,
    closeWithSuccess,
  };
};
