import React from 'react';
import {
  useRegisterForm,
  useRegisterSubmit,
  usePasswordVisibility,
} from '@/modules/Authentication';
import { Button } from '@/shared/ui';
import { Logo } from '@/shared/ui/Logo/Logo';
import { InputField } from '@/shared/ui/InputField';
import type { RegisterFormInputs } from '@/shared/lib/validation';
import styles from './RegisterForm.module.scss';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchMode: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useRegisterForm();
  const onSubmit = useRegisterSubmit(onSuccess);
  const { showPassword, showConfirmPassword, togglePassword, toggleConfirmPassword } =
    usePasswordVisibility();

  return (
    <>
      <div className={styles['register-form__logo']}>
        <Logo variant="dark" />
      </div>
      <h2 className={styles['register-form__title']}>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['register-form__form']}>
        <InputField<RegisterFormInputs>
          type="email"
          name="email"
          placeholder="sample@domain.ru"
          register={register}
          error={errors.email?.message}
          icon="email"
          autoComplete="email"
        />
        <InputField<RegisterFormInputs>
          type="text"
          name="name"
          placeholder="Имя"
          register={register}
          error={errors.name?.message}
          icon="user"
          autoComplete="given-name"
        />
        <InputField<RegisterFormInputs>
          type="text"
          name="surname"
          placeholder="Фамилия"
          register={register}
          error={errors.surname?.message}
          icon="user"
          autoComplete="family-name"
        />
        <InputField<RegisterFormInputs>
          type="password"
          name="password"
          placeholder="Пароль"
          register={register}
          error={errors.password?.message}
          icon="password"
          showPassword={showPassword}
          togglePassword={togglePassword}
          autoComplete="new-password"
        />
        <InputField<RegisterFormInputs>
          type="password"
          name="confirmPassword"
          placeholder="Подтвердите пароль"
          register={register}
          error={errors.confirmPassword?.message}
          icon="password"
          showPassword={showConfirmPassword}
          togglePassword={toggleConfirmPassword}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="blue"
          className={styles['register-form__submit-btn']}
        >
          {isSubmitting ? 'Создание аккаунта...' : 'Создать аккаунт'}
        </Button>
      </form>
      <button type="button" onClick={onSwitchMode} className={styles['register-form__switch-btn']}>
        У меня есть пароль
      </button>
    </>
  );
};

RegisterForm.displayName = 'RegisterForm';
export default RegisterForm;
