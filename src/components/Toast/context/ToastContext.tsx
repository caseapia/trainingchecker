import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: string;
  icon?: ReactNode;
  content: string;
  className?: string;
  type?: 'success' | 'error' | 'default';
  title?: string;
  onClose: () => void;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (
    type: 'success' | 'error' | 'default', 
    content: string,
    options?: { icon?: ReactNode, title?: string, className?: string, }
  ) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
      type: 'success' | 'error' | 'default', 
      content: string,
      options?: { icon?: ReactNode, title?: string, className?: string, }
    ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      type,
      content,
      icon: options?.icon,
      title: options?.title,
      className: options?.className,
      onClose: () => removeToast(id),
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
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