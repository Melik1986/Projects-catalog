import React from 'react';
import { Button } from '@/shared/ui';
import { Logo } from '../../../../shared/ui/Logo/Logo';
import styles from './SuccessMessage.module.scss';

interface SuccessMessageProps {
  onClose: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClose }) => {
  return (
    <>
      <Logo className={styles['success-message__logo']} />
      <div className={styles['success-message__content']}>
        <p className={styles['success-message__text']}>Регистрация завершена!</p>
        <p className={styles['success-message__text']}>Добро пожаловать в нашу команду!</p>
      </div>
      <Button variant="blue" onClick={onClose} className={styles['success-message__submit-btn']}>
        Закрыть
      </Button>
    </>
  );
};

export default SuccessMessage;
