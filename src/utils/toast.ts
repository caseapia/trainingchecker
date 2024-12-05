import { useToast } from "@/components/Toast/context/ToastContext";

let toastLet: ReturnType<typeof useToast>

export const setToastInstance = (instance: ReturnType<typeof useToast>) => {
  toastLet = instance;
}

export const toast = {
  success: (content: string, options?: { icon?: React.ReactNode, title?: string, className?: string, }) => toastLet.addToast('success', content, options),
  error: (content: string, options?: { icon?: React.ReactNode, title?: string, className?: string, }) => toastLet.addToast('error', content, options),
  basic: (content: string, options?: { icon?: React.ReactNode, title?: string, className?: string, }) => toastLet.addToast('default', content, options),
  clear: () => toastLet.removeToast,
}