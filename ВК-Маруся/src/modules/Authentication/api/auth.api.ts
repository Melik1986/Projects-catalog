import { http } from '../../../shared/api/axiosConfig';
import qs from 'qs';
import { authInfoSchema, registerDataSchema } from '@/shared/lib/validation/schemas';
import type {
  AuthInfo,
  RegisterData,
  SuccessfulResult,
  ApiError,
  UserProfile,
} from '@/shared/types';

export const AuthAPI = {
  login(data: AuthInfo): Promise<SuccessfulResult | ApiError> {
    // Валидация данных с помощью схемы
    try {
      authInfoSchema.parse(data);
    } catch {
      throw new Error('Некорректные данные для авторизации: email и пароль обязательны');
    }

    const formData = qs.stringify(data);
    // (dev-only console.log удалён)

    return http
      .post<SuccessfulResult | ApiError>('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => res.data);
  },

  logout(): Promise<SuccessfulResult> {
    return http.get<SuccessfulResult>('/auth/logout').then((res) => res.data);
  },

  register(data: RegisterData): Promise<SuccessfulResult | ApiError> {
    // Валидация данных с помощью схемы
    try {
      registerDataSchema.parse(data);
    } catch {
      throw new Error('Некорректные данные для регистрации: все поля обязательны для заполнения');
    }

    const formData = qs.stringify(data);
    // (dev-only console.log удалён)

    return http
      .post<SuccessfulResult | ApiError>('/user', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => res.data);
  },

  getProfile(): Promise<UserProfile> {
    return http.get<UserProfile>('/profile').then((res) => res.data);
  },
};
