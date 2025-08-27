import React from 'react';
import styles from './Button.module.scss';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'blue'
  | 'blueDisabled'
  | 'dark'
  | 'darkDisabled'
  | 'small';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={[
        styles.button,
        variant && variant in styles ? styles[variant as keyof typeof styles] : undefined,
        className,
        disabled && 'disabled' in styles ? styles.disabled : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
