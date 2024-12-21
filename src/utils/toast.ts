import { useToast } from "@/components/Toast/context/ToastContext";

let toastLet: ReturnType<typeof useToast>

export const setToastInstance = (instance: ReturnType<typeof useToast>) => {
  toastLet = instance;
}

export const toast = {
  success: (content: string, options?: { title?: string, className?: string, lifeTime?: number }) => toastLet.addToast('success', content, options),
  error: (content: string, options?: { title?: string, className?: string, lifeTime?: number }) => toastLet.addToast('error', content, options),
  basic: (content: string, options?: { title?: string, className?: string, lifeTime?: number }) => toastLet.addToast('default', content, options),
  clear: () => toastLet.removeToast,
}