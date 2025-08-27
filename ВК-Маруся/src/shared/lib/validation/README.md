# Централизованная система валидации

Эта директория содержит централизованную систему валидации для всего приложения, основанную на библиотеке Zod.

## Структура

- `schemas.ts` - Все схемы валидации для форм, API и пользовательского ввода
- `index.ts` - Утилиты для работы с ошибками валидации

## Использование

### Валидация форм

```typescript
import { loginFormSchema, getValidationError } from '../validation';

const validation = loginFormSchema.safeParse(formData);
if (!validation.success) {
  const errorMessage = getValidationError(validation.error);
  setError(errorMessage);
  return;
}
```

### Валидация пользовательского ввода

```typescript
import { searchInputSchema, getValidationError } from '../validation';

const validation = searchInputSchema.safeParse(userInput);
if (!validation.success) {
  const errorMessage = getValidationError(validation.error);
  setValidationError(errorMessage);
  return;
}
```

## Доступные схемы

### Аутентификация

- `loginFormSchema` - Валидация формы входа
- `registerFormSchema` - Валидация формы регистрации

### Поиск

- `searchInputSchema` - Валидация поискового ввода
- `searchQuerySchema` - Валидация поискового запроса с параметрами
- `movieSearchParamsSchema` - Валидация параметров поиска фильмов

### API

- `favoritesBodySchema` - Валидация тела запроса для избранного

## Утилиты

- `getValidationError(error)` - Получает первую ошибку валидации в виде строки
- `formatValidationErrors(error)` - Форматирует все ошибки в объект
- `isValidationError(error)` - Проверяет, является ли ошибка ошибкой валидации Zod
- `createApiValidator(schema)` - Создает валидатор для API ответов
