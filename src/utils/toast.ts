import { useToast } from "@/components/Toast/context/ToastContext";
import React, {MouseEvent} from "react";

let toastLet: ReturnType<typeof useToast>

export const setToastInstance = (instance: ReturnType<typeof useToast>) => {
  toastLet = instance;
}

export const toast = {
  success: (content: string, options?: {
    className?: string,
    lifeTime?: number,
    clickAction?: (e: MouseEvent<HTMLDivElement>) => void,
    isExitButton?: boolean,
    isByModal?: boolean;
  }) => toastLet.addToast('success', content, options),
  error: (content: string, options?: {
    className?: string,
    lifeTime?: number,
    clickAction?: (e: MouseEvent<HTMLDivElement>) => void,
    isExitButton?: boolean,
    isByModal?: boolean;
  }) => toastLet.addToast('error', content, options),
  basic: (content: string, options?: {
    className?: string,
    lifeTime?: number,
    clickAction?: (e: MouseEvent<HTMLDivElement>) => void,
    isExitButton?: boolean,
    isByModal?: boolean;
  }) => toastLet.addToast('default', content, options),
  clear: () => toastLet.removeToast,
}