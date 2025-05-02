"use client"
import React, { createContext, useContext, useState, ReactNode, MouseEvent } from "react";
import { Toast, ToastContextType } from "./types";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (
    type: "success" | "error" | "default",
    content: string,
    options?: {
      className?: string,
      lifeTime?: number,
      clickAction?: (event: MouseEvent<HTMLDivElement>) => void,
      isExitButton?: boolean,
      isByModal?: boolean,
    }
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      type: type ?? "default",
      content,
      className: options?.className,
      onClose: () => removeToast(id),
      lifeTime: options?.lifeTime,
      clickAction: options?.clickAction,
      isExitButton: options?.isExitButton ?? true,
      isByModal: options?.isByModal ?? false,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    {
      options?.lifeTime && options?.lifeTime !== -1 && (
        setTimeout(() => removeToast(id), newToast.lifeTime!)
      )
    }
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
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};