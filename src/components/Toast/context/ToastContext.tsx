import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: string;
  content: string;
  className?: string;
  type?: 'success' | 'error' | 'default';
  title?: string;
  onClose: () => void;
  lifeTime?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (
    type: 'success' | 'error' | 'default', 
    content: string,
    options?: { title?: string, className?: string, lifeTime?: number, }
  ) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
      type: 'success' | 'error' | 'default', 
      content: string,
      options?: { title?: string, className?: string, lifeTime?: number, }
    ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      type,
      content,
      title: options?.title,
      className: options?.className,
      onClose: () => removeToast(id),
      lifeTime: options?.lifeTime
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    {options?.lifeTime && (
      setTimeout(() => removeToast(id), newToast.lifeTime!)
    )}
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};