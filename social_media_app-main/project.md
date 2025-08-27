# Анализ фронтенд кодовой базы: social_media_app-main (Snapgram)

## 📁 Структура проекта
- `src/_root/` — корневой лэйаут и страницы приложения
- `src/_auth/` — публичные страницы и формы аутентификации
- `src/components/` — UI: `forms/`, `shared/`, `ui/`
- `src/lib/` — API-слой (`appwrite`), React Query (`lib/react-query`)
- `src/context/` — контекст аутентификации
- `src/hooks/`, `src/types/` — вспомогательные абстракции и типы

Дерево (до 3 уровней):
- `src/`
  - `_root/` (RootLayout, pages)
  - `_auth/` (AuthLayout, forms)
  - `components/` (forms/shared/ui)
  - `lib/react-query/queries.ts`, `lib/appwrite/api.ts`
  - `context/AuthContext.tsx`

Организация: feature/layer-based — четкое разделение на auth, корневой слой, UI, lib, context.

## 🛠 Технологический стек
- **Фреймворк**: React 18.2, Vite 4.4
- **Язык**: TypeScript ^5
- **CSS**: Tailwind CSS 3.3 + PostCSS, `tailwind-merge`, `tailwindcss-animate`
- **Состояние**: React Query (@tanstack/react-query v4)
- **Формы/валидация**: `react-hook-form` + `zod`
- **Бэкенд SDK**: `appwrite`
- **Сборка/линтинг**: ESLint, Prettier, TS-ESLint

## 🏗 Архитектура
- Компонентная архитектура с выделением layout-слоев (`_root`, `_auth`).
- Разделение логики: хуки React Query, контекст пользователя, формы на R-H-F + Zod.
- Роутинг: React Router (`App.tsx`) с public/private routes через разные Layout.
- API-слой: `lib/appwrite/api.ts`; кэширование и инвалидация — через React Query.

Пример — React Query hooks:
```ts
// src/lib/react-query/queries.ts (фрагмент)
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] });
    },
  });
};
```

Пример — форма с валидацией Zod:
```tsx
// src/components/forms/PostForm.tsx (фрагмент)
const form = useForm<z.infer<typeof PostValidation>>({
  resolver: zodResolver(PostValidation),
  defaultValues: { caption: post?.caption || '', file: [], location: post?.location || '', tags: post ? post.tags.join(',') : '' },
});
const { mutateAsync: createPost } = useCreatePost();
const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
  const newPost = await createPost({ ...value, userId: user.id });
  if (!newPost) toast({ title: `${action} post failed. Please try again.` });
  navigate('/');
};
```

## 🎨 UI/UX и стилизация
- Tailwind утилитные классы + shadcn-подобные UI компоненты; Toaster для уведомлений.
- Адаптивность и тёмная тема легко расширяемы.
- Доступность: Radix UI улучшает a11y, но стоит проверить формы/фокус.

## ✅ Качество кода
- Строгий TS, ESLint + Prettier, Tailwind plugin; структурированные типы и валидаторы.
- Тесты: конфигурации не обнаружены.

## 🔧 Ключевые компоненты
- RootLayout/AuthLayout — разграничение доступа
- PostForm — создание/редактирование поста
- React Query `queries.ts` — кэширование, инвалидация

## 📋 Выводы и рекомендации
- Сильные стороны: грамотная архитектура, строгая типизация, React Query, валидация форм.
- Улучшения: добавить unit/E2E тесты, централизованный error boundary, метрики производительности.
- Уровень: middle.