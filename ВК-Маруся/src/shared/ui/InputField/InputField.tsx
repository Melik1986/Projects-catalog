import React from 'react';
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import styles from './InputField.module.scss';
import SpriteIcon from '../SpriteIcon/SpriteIcon';

export interface InputFieldProps<T extends FieldValues = FieldValues> {
  type: 'text' | 'email' | 'password';
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: string;
  icon?: string;
  showPassword?: boolean;
  togglePassword?: () => void;
  autoComplete?: string;
}

export const InputField = <T extends FieldValues = FieldValues>({
  type,
  name,
  placeholder,
  register,
  error,
  icon,
  showPassword,
  togglePassword,
  autoComplete,
}: InputFieldProps<T>): React.ReactElement => {
  const isPasswordField = type === 'password' && typeof togglePassword === 'function';

  return (
    <div className={styles['input-wrapper']}>
      <div className={styles['input-group']}>
        {icon && <SpriteIcon id={icon} className={styles.icon} />}
        <input
          {...register(name)}
          type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles['input--error'] : ''}`}
          autoComplete={autoComplete}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePassword}
            className={styles['eye-button']}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            tabIndex={-1}
          >
            <SpriteIcon id={showPassword ? 'eye-off' : 'eye'} className={styles['eye-icon']} />
          </button>
        )}
      </div>
      {error && <div className={styles['error-text']}>{error}</div>}
    </div>
  );
};
