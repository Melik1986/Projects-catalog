/**
 * HTTP клиент с унифицированными методами для API запросов
 * Основан на существующей baseApi логике с улучшенной типизацией
 */

import { http as httpClient } from './axiosConfig';

// Типы для параметров запросов
export type QueryParams = Record<string, string | number | boolean | undefined>;
export type RequestBody = Record<string, unknown> | FormData | string;

// Интерфейс для конфигурации запроса
export interface RequestConfig {
  params?: QueryParams;
  contentType?: string;
  language?: string;
}

/**
 * GET запрос
 */
export async function get<T = unknown>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { params } = config;
  const response = await httpClient.get<T>(endpoint, { params });
  return response.data;
}

/**
 * POST запрос
 */
export async function post<T = unknown>(
  endpoint: string,
  body?: RequestBody,
  config: RequestConfig = {},
): Promise<T> {
  const { params } = config;
  const response = await httpClient.post<T>(endpoint, body, { params });
  return response.data;
}

/**
 * PUT запрос
 */
export async function put<T = unknown>(
  endpoint: string,
  body?: RequestBody,
  config: RequestConfig = {},
): Promise<T> {
  const { params } = config;
  const response = await httpClient.put<T>(endpoint, body, { params });
  return response.data;
}

/**
 * DELETE запрос
 */
export async function del<T = unknown>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { params } = config;
  const response = await httpClient.delete<T>(endpoint, { params });
  return response.data;
}

/**
 * PATCH запрос
 */
export async function patch<T = unknown>(
  endpoint: string,
  body?: RequestBody,
  config: RequestConfig = {},
): Promise<T> {
  const { params } = config;
  const response = await httpClient.patch<T>(endpoint, body, { params });
  return response.data;
}

// Экспорт всех HTTP методов как объект
export const http = {
  get,
  post,
  put,
  del,
  patch,
} as const;

// Экспорт типов
export type HttpMethods = typeof http;
