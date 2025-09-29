# Vercel Deployment Guide

## Проблемы и решения

### 1. Git Submodules Warning
**Проблема**: `Warning: Failed to fetch one or more git submodules`

**Решение**: 
- Проект не является submodule, это обычная папка в репозитории
- Vercel иногда ошибочно определяет структуру папок как submodule
- Используйте `vercel.json` конфигурацию для правильной настройки

### 2. Vercel Configuration Error
**Проблема**: `Свойство 'functions' нельзя использовать вместе со свойством 'builds'`

**Решение**:
- Удалена секция `functions` из `vercel.json`
- Оставлена только конфигурация `builds` для статической сборки
- Проект использует только фронтенд без API функций

**Альтернативная конфигурация**:
Если основная конфигурация не работает, используйте `vercel-minimal.json`:
```bash
# Переименуйте файл
mv vercel-minimal.json vercel.json
```

### 3. Build Optimization

**Текущие настройки**:
- Terser minification с безопасными опциями
- CSS и JS code splitting
- Gzip и Brotli compression
- PWA с оптимизированным кэшированием

**Рекомендации**:
- Установите переменные окружения в Vercel Dashboard
- Используйте `NODE_OPTIONS=--max-old-space-size=4096` для больших сборок
- Включите `NODE_ENV=production` для продакшн сборки

### 3. Environment Variables

Установите в Vercel Dashboard:
```
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=4096
VITE_APP_NAME=ВК Маруся
VITE_APP_DESCRIPTION=Кинопортал ВК Маруся
```

### 4. Build Commands

Vercel автоматически использует:
- `npm run build` для сборки
- `dist` как output directory

### 5. Performance Optimization

**Что оптимизировано**:
- Vendor chunk для лучшего кэширования
- Lazy loading для auth форм и модалок
- PWA с runtime caching
- Compression для всех статических файлов

**Размеры файлов**:
- Vendor: ~369KB (gzipped: ~117KB)
- Modules: ~33KB (gzipped: ~9KB)
- Pages: ~11KB (gzipped: ~3KB)
- CSS: ~32KB total (gzipped: ~8KB)

### 6. Troubleshooting

**Если сборка падает**:
1. Проверьте переменные окружения
2. Увеличьте `NODE_OPTIONS` memory limit
3. Отключите compression временно
4. Проверьте размеры файлов в `stats.html`

**Если PWA не работает**:
1. Проверьте `manifest.webmanifest`
2. Убедитесь что Service Worker регистрируется
3. Проверьте кэш в DevTools

## Команды для локального тестирования

```bash
# Установка зависимостей
npm install

# Сборка для продакшна
npm run build

# Предварительный просмотр
npm run preview

# Анализ бандла
npm run build:analyze
```
