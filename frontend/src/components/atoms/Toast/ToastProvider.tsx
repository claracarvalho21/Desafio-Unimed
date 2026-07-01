import React, { useState, useCallback } from 'react';
import type { ToastType } from './Toast';
import { Toast } from './Toast';
import { ToastContext } from './ToastContext';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((type: ToastType, message?: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message: message || '' }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};