/**
 * Утилиты для работы с куки авторизации
 */

/**
 * Проверяет наличие куки авторизации
 * @returns true если есть признаки авторизации
 */
export const hasAuthCookie = (): boolean => {
  // Проверяем наличие куки сессии или токена
  // Обычно серверы устанавливают куки с именами типа 'sessionid', 'auth-token', 'connect.sid' и т.д.
  const cookieNames = ['sessionid', 'connect.sid', 'auth-token', 'session', 'token'];

  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());

  return cookieNames.some((name) => cookies.some((cookie) => cookie.startsWith(`${name}=`)));
};

/**
 * Получает значение куки по имени
 * @param name - имя куки
 * @returns значение куки или null
 */
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

/**
 * Проверяет, есть ли любые куки (базовая проверка)
 * @returns true если есть хотя бы одна кука
 */
export const hasAnyCookies = (): boolean => {
  return document.cookie.length > 0;
};
