import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GlobalError } from '@/shared/types/errors';
import type { RootState } from '@/shared/lib/store';

interface ErrorState {
  globalError: GlobalError | null;
  errorHistory: GlobalError[];
}

const initialState: ErrorState = {
  globalError: null,
  errorHistory: [],
};

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<GlobalError>): void => {
      const error = {
        ...action.payload,
        timestamp: action.payload.timestamp || Date.now(),
      };

      state.globalError = error;

      // Добавляем в историю ошибок (максимум 10 последних)
      state.errorHistory.unshift(error);
      if (state.errorHistory.length > 10) {
        state.errorHistory = state.errorHistory.slice(0, 10);
      }
    },
    clearGlobalError: (state): void => {
      state.globalError = null;
    },
    clearErrorHistory: (state): void => {
      state.errorHistory = [];
    },
  },
});

export const { setGlobalError, clearGlobalError, clearErrorHistory } = errorSlice.actions;

// Селекторы
export const selectGlobalError = (state: RootState): GlobalError | null => state.errors.globalError;
export const selectErrorHistory = (state: RootState): GlobalError[] => state.errors.errorHistory;
export const selectHasCriticalError = (state: RootState): boolean =>
  state.errors.globalError?.category === 'critical';

export const selectHasActiveError = (state: RootState): boolean =>
  state.errors.globalError !== null;

export default errorSlice.reducer;
export type { ErrorState };
