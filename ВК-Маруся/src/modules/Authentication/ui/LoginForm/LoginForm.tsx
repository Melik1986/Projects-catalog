import React from 'react';
import { useLoginForm, useLoginSubmit, usePasswordVisibility } from '@/modules/Authentication';
import { Button } from '@/shared/ui';
import { Logo } from '@/shared/ui/Logo/Logo';
import { InputField } from '@/shared/ui/InputField';
import type { LoginFormInputs } from '@/shared/lib/validation';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();
  const onSubmit = useLoginSubmit(onSuccess);
  const { showPassword, togglePassword } = usePasswordVisibility();

  return (
    <>
      <div className={styles['login-form__logo']}>
        <Logo variant="dark" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['login-form__form']}>
        <InputField<LoginFormInputs>
          type="email"
          name="email"
          placeholder="Электронная почта"
          register={register}
          error={errors.email?.message}
          icon="email"
          autoComplete="email"
        />
        <InputField<LoginFormInputs>
          type="password"
          name="password"
          placeholder="Пароль"
          register={register}
          error={errors.password?.message}
          icon="password"
          showPassword={showPassword}
          togglePassword={togglePassword}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="blue"
          className={styles['login-form__submit-btn']}
        >
          {isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
      </form>
      <button type="button" onClick={onSwitchMode} className={styles['login-form__switch-btn']}>
        Регистрация
      </button>
    </>
  );
};

LoginForm.displayName = 'LoginForm';
export default LoginForm;
