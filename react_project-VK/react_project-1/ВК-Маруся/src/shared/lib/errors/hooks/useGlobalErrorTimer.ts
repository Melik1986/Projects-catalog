import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/store';
import { clearGlobalError } from '../slices/errorSlice';
import type { RootState } from '@/app/store';

const ERROR_DISPLAY_TIME = 5000;

export const useGlobalErrorTimer = (): void => {
  const dispatch = useAppDispatch();
  const globalError = useSelector((state: RootState) => state.errors.globalError);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (globalError) {
      timer = setTimeout(() => {
        dispatch(clearGlobalError());
      }, ERROR_DISPLAY_TIME);
    }
    return (): void => {
      if (timer) clearTimeout(timer);
    };
  }, [globalError, dispatch]);
};
