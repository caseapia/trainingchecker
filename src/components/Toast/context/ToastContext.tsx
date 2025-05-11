"use client"
import React, { createContext, useContext, useState, ReactNode, MouseEvent } from "react";
import { Toast, ToastContextType } from "./types";
import settings from "@/shared/consts/settings";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [queue, setQueue] = useState<Toast[]>([]);
  const MAX_VISIBLE: number = Number(settings.find(s => s.option === "TOASTS_MAX_VISIBLE")?.value);

  const addToast = (
    type: "success" | "error" | "default",
    content: string,
    options?: {
      className?: string,
      clickAction?: (event: MouseEvent<HTMLDivElement>) => void,
      isByModal?: boolean,
      lifeTime?: number,
    }
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      type: type ?? "default",
      content,
      className: options?.className,
      onClose: () => removeToast(id),
      clickAction: options?.clickAction,
      isByModal: options?.isByModal ?? false,
      lifeTime: options?.lifeTime ?? -1,
    };
    setToasts(prev => {
      if (prev.length < MAX_VISIBLE) {
        if (newToast.lifeTime && newToast.lifeTime !== -1) {
          setTimeout(() => removeToast(id), newToast.lifeTime!);
        }
        return [...prev, newToast];
      } else {
        setQueue(prevQueue => [...prevQueue, newToast]);
        return prev;
      }
    });
  };

  const removeToast = (id: string) => {
    setToasts(prev => {
      const newToasts = prev.filter(toast => toast.id !== id);
      if (queue.length > 0) {
        const [nextToast, ...restQueue] = queue;
        setQueue(restQueue);
        if (nextToast.lifeTime && nextToast.lifeTime !== -1) {
          setTimeout(() => removeToast(nextToast.id), nextToast.lifeTime!);
        }
        return [...newToasts, nextToast];
      }
      return newToasts;
    })
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