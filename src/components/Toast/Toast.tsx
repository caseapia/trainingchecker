"use client";
import React from "react";
import { useToast } from "./context/ToastContext";
import styles from "./Toast.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import success from "@/public/assets/lotties/success.json";
import defaultNotify from "@/public/assets/lotties/defaultNotify.json";
import error from "@/public/assets/lotties/error.json";
import ToastAnimation from "./variant";

const Toast = () => {
  const { toasts, removeToast } = useToast();

  const getType = (type: any) => {
    switch (type) {
      case "success":
        return styles.success
      case "error":
        return styles.error
      default:
        return styles.default
    }
  }

  const handleClick = (toast: any) => {
    toast.clickAction(toast);
    removeToast(toast.id);
  }

  return (
    <div className={`${styles.ToastWrapper}`}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`${styles.Toast} ${getType(toast.type)} ${toast.className || ""} ${toast.clickAction ? styles.clickable : ""} ${toast.isByModal ? styles.ByModal : ""}`}
            onClick={toast.clickAction ? () => handleClick(toast) : undefined}
            initial={ToastAnimation.initial}
            animate={ToastAnimation.animate}
            exit={ToastAnimation.initial}
          >
            <section className={styles.IconContainer}>
              <Lottie
                animationData={toast.type === "success" ? success : toast.type === "error" ? error : defaultNotify}
                loop={false}
                style={{ height: "30px", width: "30px" }}
              />
            </section>
            <section className={styles.Body}>
              {toast.content && <div className={styles.Content}>{toast.content}</div>}
            </section>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
