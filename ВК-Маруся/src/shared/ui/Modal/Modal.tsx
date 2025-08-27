import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
}

const ModalComponent: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  className,
  closeOnBackdropClick = true,
}) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={closeOnBackdropClick ? onClose : undefined}>
      <div
        className={`${styles.modal}${className ? ' ' + className : ''}`}
        onClick={(e): void => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export const Modal = React.memo(ModalComponent);
