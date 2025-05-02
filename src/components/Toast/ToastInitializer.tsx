"use client";
import { useToast } from "./context/ToastContext";
import { setToastInstance } from "@/utils/toast";

const ToastInitializer = () => {
  const toast = useToast();
  setToastInstance(toast);
  return null;
}

export default ToastInitializer;