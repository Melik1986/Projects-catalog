/**
 * Утилиты для работы со временем
 */

/**
 * Форматирует время в секундах в формат MM:SS
 * @param time - время в секундах
 * @returns отформатированная строка времени
 */
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Вычисляет процент прогресса воспроизведения
 * @param currentTime - текущее время
 * @param duration - общая продолжительность
 * @returns процент от 0 до 100
 */
export const calculateProgress = (currentTime: number, duration: number): number => {
  return duration > 0 ? (currentTime / duration) * 100 : 0;
};

/**
 * Вычисляет время по клику на прогресс-баре
 * @param clickX - позиция клика по X
 * @param barWidth - ширина прогресс-бара
 * @param duration - общая продолжительность
 * @returns новое время для перемотки
 */
export const calculateTimeFromClick = (
  clickX: number,
  barWidth: number,
  duration: number,
): number => {
  return (clickX / barWidth) * duration;
};
