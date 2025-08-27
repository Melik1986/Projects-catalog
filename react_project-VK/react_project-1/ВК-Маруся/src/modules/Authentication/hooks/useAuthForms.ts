import { useState, useCallback } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';

import { loginUser, registerUser } from '../store/authSlice';
import {
  loginFormSchema,
  registerFormSchema,
  type LoginFormInputs,
  type RegisterFormInputs,
  isValidationError,
  getValidationError,
} from '@/shared/lib/validation';
import { useErrorHandler } from '@/shared/lib/errors';
import type { AuthInfo, RegisterData } from '@/shared/types';
import type { AppDispatch } from '@/shared/lib/store';

// Хук для формы входа
export const useLoginForm = (): UseFormReturn<LoginFormInputs> => {
  return useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
  });
};

// Хук для формы регистрации
export const useRegisterForm = (): UseFormReturn<RegisterFormInputs> => {
  return useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onBlur',
  });
};

// Хук для обработки входа
export const useLoginSubmit = (
  onSuccess: () => void,
): ((data: LoginFormInputs) => Promise<void>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useErrorHandler();

  return useCallback(
    async (data: LoginFormInputs) => {
      try {
        const authData: AuthInfo = {
          email: data.email,
          password: data.password,
        };

        const result = await dispatch(loginUser(authData));
        if (loginUser.fulfilled.match(result)) {
          onSuccess();
        } else if (loginUser.rejected.match(result)) {
          // При rejectWithValue ошибка попадает в payload, а не в error
          let errorMessage =
            typeof result.payload === 'object' && result.payload && 'message' in result.payload
              ? result.payload.message
              : result.payload || result.error?.message || 'Ошибка входа';
          // Если ошибка 400 и текст неинформативный — подменяем на русский
          if (
            (result.payload &&
              typeof result.payload === 'object' &&
              'status' in result.payload &&
              (result.payload as any).status === 400) ||
            (typeof errorMessage === 'string' &&
              errorMessage.includes('Request failed with status code 400'))
          ) {
            errorMessage =
              'Неверный email или пароль. Проверьте введённые данные и попробуйте снова.';
          }
          showError(errorMessage);
        }
      } catch (error) {
        if (isValidationError(error)) {
          showError(getValidationError(error));
        } else {
          showError(error);
        }
      }
    },
    [dispatch, onSuccess, showError],
  );
};

// Хук для обработки регистрации
export const useRegisterSubmit = (
  handleRegisterSuccess: () => void,
): ((data: RegisterFormInputs) => Promise<void>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useErrorHandler();

  return useCallback(
    async (data: RegisterFormInputs) => {
      try {
        const registerData: RegisterData = {
          email: data.email,
          password: data.password,
          name: data.name,
          surname: data.surname,
        };

        const result = await dispatch(registerUser(registerData));
        if (registerUser.fulfilled.match(result)) {
          // Показываем сообщение об успешной регистрации
          handleRegisterSuccess();

          // После успешной регистрации выполняем автоматический вход в фоне
          const loginData: AuthInfo = {
            email: data.email,
            password: data.password,
          };

          await dispatch(loginUser(loginData));
        } else if (registerUser.rejected.match(result)) {
          // При rejectWithValue ошибка попадает в payload, а не в error
          const errorMessage =
            typeof result.payload === 'object' && result.payload && 'message' in result.payload
              ? result.payload.message
              : result.payload || result.error?.message || 'Ошибка регистрации';
          showError(errorMessage);
        }
      } catch (error) {
        if (isValidationError(error)) {
          showError(getValidationError(error));
        } else {
          showError(error);
        }
      }
    },
    [dispatch, handleRegisterSuccess, showError],
  );
};

// Хук для управления видимостью паролей
export const usePasswordVisibility = (): {
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
} => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = useCallback((): void => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPassword = useCallback((): void => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return {
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
  };
};
