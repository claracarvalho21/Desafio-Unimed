import { createContext } from 'react';
import type { ToastType } from './Toast';

export interface ToastContextType {
  showToast: (type: ToastType, message?: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);