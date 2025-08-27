// Базовые типы для обработки ошибок API
export interface ApiError {
  code: number;
  type: string;
  message: string;
}

// Базовый интерфейс для ответов с ошибками (используется в схемах валидации)
export interface ApiResponse {
  code: number;
  type: string;
  message: string;
}

// Типы для пагинированных ответов (если понадобятся в будущем)
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
