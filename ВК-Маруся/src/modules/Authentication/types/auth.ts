// Данные для авторизации
export interface AuthInfo {
  email: string;
  password: string;
}

// Данные для регистрации
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
}

// Успешный результат
export interface SuccessfulResult {
  result: boolean;
}

// Примечание: Используем ApiError из ./api.ts для унификации типов ошибок
